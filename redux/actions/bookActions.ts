import {Book} from '@/types/books';

export const setBooks = (books: Book[]) => ({
  type: 'SET_BOOKS',
  payload: {books},
});