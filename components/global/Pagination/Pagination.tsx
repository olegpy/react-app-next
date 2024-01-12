import {ReactNode, FC, useEffect, useState} from "react";
import {Button, FormControl, InputLabel, MenuItem, Select, Grid} from "@mui/material";
import {SelectChangeEvent} from "@mui/material/Select";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

type PaginationDataT = {
  startIndex: number,
  endIndex: number
};
type PaginationT = {
  children: ReactNode,
  itemsLength: number,
  onPagination: (paginationData: PaginationDataT) => void
};

const Pagination: FC<PaginationT> = ({children, itemsLength, onPagination}) => {
  const amountOfPages: number[] = [5, 10, 15];
  const DEFAULT_PAGE: number = 1;

  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(Math.ceil(itemsLength / pageSize));
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const updatePagination = () => {
      // Calculate the start and end index of the items to be displayed
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      onPagination({startIndex, endIndex});

      // Calculate the total amount of pages
      const newTotalPages = Math.ceil(itemsLength / pageSize);
      setTotalPages(newTotalPages);
      setCurrentPage(newTotalPages < currentPage ? newTotalPages : currentPage);

      // Calculate the page numbers to be displayed
      setPageNumbers([]);
      const pageNumberPages: number[] = Array.from({ length: totalPages }, (_, index) => index + 1);
      setPageNumbers(pageNumberPages);
    };

    updatePagination();
  }, [onPagination, totalPages, currentPage, pageSize, itemsLength]);

  const getButtonStyle = (currentPage: number, page: number): string => {
    return currentPage === page ? 'lightgray' : 'transparent';
  };


  return (
    <Grid style={{ width: '100%' }}>
      <Grid item>{children}</Grid>
      <Grid style={{ margin: '15px', paddingLeft: '5px', paddingRight: '5px', display: 'flex', alignItems: 'center' }}>
        <Grid item xs={10} data-testid="ItemsListPagination">
          <Button
            variant="outlined"
            style={{ background: getButtonStyle(currentPage, DEFAULT_PAGE) }}
            disabled={currentPage === DEFAULT_PAGE}
            onClick={() => handlePageChange(1)}
          >
            <KeyboardDoubleArrowLeftIcon />
          </Button>
          <Button
            variant="outlined"
            style={{ background: getButtonStyle(currentPage, DEFAULT_PAGE) }}
            disabled={currentPage === DEFAULT_PAGE}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <KeyboardArrowLeftIcon />
          </Button>
          {pageNumbers.map((number, index) => (
            <Button
              variant={number === currentPage ? 'contained' : 'outlined'}
              key={index}
              data-testid={`page-${index + 1}`}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </Button>
          ))}
          <Button
            variant="outlined"
            style={{ background: getButtonStyle(currentPage, totalPages) }}
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <KeyboardArrowRightIcon />
          </Button>
          <Button
            variant="outlined"
            style={{ background: getButtonStyle(currentPage, totalPages) }}
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            <KeyboardDoubleArrowRightIcon />
          </Button>
        </Grid>

        <Grid item xs={2}>
          <FormControl fullWidth data-testid="FormControlItemsListSelect">
            <InputLabel id="book-size-label" style={{ color: 'black' }}>Page Size</InputLabel>
            <Select
              labelId="book-size-label"
              id="book-size-select"
              value={pageSize}
              label="Page Size"
              style={{ background: 'white' }}
              onChange={(e: SelectChangeEvent<number>) => handlePageSizeChange(Number(e.target.value))}
            >
              {amountOfPages.map((number) => (
                <MenuItem key={number} value={number}>
                  {number}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Pagination;