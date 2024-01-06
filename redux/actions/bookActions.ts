import {Book} from '@/types/books';

export const setBooks = (books: Book[]) => ({
  type: 'SET_BOOKS',
  payload: {books},
});

export const deleteBook = (book: Book) => ({
  type: 'DELETE_BOOK',
  payload: {book},
});