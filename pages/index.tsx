import {FC, useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {setBooks, deleteBook, editBook} from "@/redux/actions/bookActions";
import { Grid, Typography, Button, Box } from '@mui/material';
import Layout from "@/components/global/Layout/Layout";
import {Book} from "@/types/books";
import apiUrl from "@/utils/apiUrl";
import BookItem from "@/components/Book/BookItem/BookItem";
import BookEditForm from "@/components/Book/BookEditForm/BookEditForm";
import Pagination from "@/components/global/Pagination/Pagination";

export const getServerSideProps = async () => {
  const res = await fetch(`${apiUrl()}/api/books`)
  const books: Book[] = await res.json();

  return { props: { books } };
}

interface BooksProps {
  books: Book[];
}

const Home: FC<BooksProps> = ({books})  => {
  const dispatch = useDispatch();
  const bookList = useSelector((state: { books: { books: Book[] } }) => state.books.books);

  const [handleBooks, setHandleBooks] = useState<Book[]>(bookList);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isEditForm, setIsEditForm] = useState<boolean>(false);

  useEffect(() => {
    setHandleBooks(bookList);
  }, [bookList]);

  useEffect(() => {
    dispatch(setBooks(books));
  }, [dispatch, books]);

  const handleOnAddBook = () => {
    setIsFormOpen(true);
  };

  const handleOnRemoveClick = (book: Book) => {
    dispatch(deleteBook(book));
  };

  const handleOnEditClick = (book: Book) => {
    setIsFormOpen(true);
    setIsEditForm(true);
    dispatch(editBook(book));
  };

  const handleOnCloseForm = () => {
    setIsFormOpen(false);
    setIsEditForm(false);
    dispatch(editBook());
  };

  type PaginationDataT = {
    startIndex: number,
    endIndex: number
  };

  const handleOnPagination = (response: PaginationDataT) => {
    const {startIndex, endIndex} = response;
    setHandleBooks(bookList.slice(startIndex, endIndex));
  }

  return(
    <Layout title="About Page">
      <Grid container>
        <Grid item xs={12} margin="0 15px">
          <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
            <Typography variant="h1" align="center">
              Book List
            </Typography>
            <Button variant="contained" color="primary" onClick={handleOnAddBook}>
              Add Book
            </Button>
          </Box>
        </Grid>
        {handleBooks.length === 0 && <div>No Books</div>}
        {handleBooks.length > 0 && (
          <Pagination itemsLength={bookList.length} onPagination={handleOnPagination}>
            <Box
              display="flex"
              flexWrap="wrap"
              justifyContent="flex-start"
              margin="0 15px"
            >
              {handleBooks.map((book, index) => (
                <Grid item key={book.id} xs={12} sm={6} md={4} lg={3} style={{ flex: '1 0 30%', padding: '0 5px 5px' }}>
                  <BookItem
                    book={book}
                    onEditClick={handleOnEditClick}
                    onRemoveClick={handleOnRemoveClick}
                  />
                </Grid>
              ))}
            </Box>
          </Pagination>
        )}
      </Grid>
      <BookEditForm onOpen={isFormOpen} onClose={handleOnCloseForm} editForm={isEditForm}></BookEditForm>
    </Layout>
  );
};

export default Home;