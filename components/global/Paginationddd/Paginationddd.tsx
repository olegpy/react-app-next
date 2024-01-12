import {useState, useEffect, FC} from 'react';
import {Book} from "@/types/books";
import { Button, Select, MenuItem, FormControl, InputLabel, Grid, Box } from '@mui/material';

type PaginationT = {
  books: Book[];
};

const Paginationddd: FC<PaginationT> = ({books}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(Math.ceil(books.length / pageSize));
  const [currentItems, setCurrentItems] = useState<Book[]>([]);

  const amountOfPages: number[] = [5,10,15];

  useEffect(() => {
    const updatePagination = () => {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const newTotalPages = Math.ceil(books.length / pageSize);
      const newCurrentItems = books.slice(startIndex, endIndex);

      setTotalPages(newTotalPages);
      setCurrentItems(newCurrentItems);
    };

    updatePagination();
  }, [books, currentPage, pageSize]);


  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };


  return (
    <Grid container>
      <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" margin="0 15px" gap={4}>
        <select onChange={(e) => handlePageSizeChange(Number(e.target.value))} value={pageSize}>
          {amountOfPages.map(
            (number) => (
              <option key={number} value={number}>{number}</option>
            )
          )}
          <option></option>
        </select>
        <FormControl fullWidth>
          <InputLabel id="page-size-label">Page Size</InputLabel>
          <Select
            labelId="page-size-label"
            id="page-size"
            value={pageSize}
            label="Age"
            style={{ background: 'lightblue' }}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        display="flex"
           flexWrap="wrap"
           justifyContent="flex-start"
           margin="0 15px"
           padding="5px" // Initial padding for each item
        >
        {currentItems.map((book, index) => (
          <li key={index}>{book.name}</li>
        ))}
      </Box>
      <div>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </Grid>
  );
};

export default Paginationddd;