import {Book} from '@/types/books';

export const setBooks = (books: Book[]) => ({
  type: 'SET_BOOKS',
  payload: {books},
});

export const editBook = (book?: Book) => ({
  type: 'EDIT_BOOK',
  payload: { book: book || {} },
});

export const updateBook = (book: Book) => ({
  type: 'UPDATE_BOOK',
  payload: {book},
});

export const deleteBook = (book: Book) => ({
  type: 'DELETE_BOOK',
  payload: {book},
});