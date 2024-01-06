import {Book} from '@/types/books';

const initialState: {
  books: Book[],
} = {
  books: [],
};

const bookReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_BOOKS':
      const { books } = action.payload;

      return {
        ...state,
        books: [...books ],
      };
    case 'DELETE_BOOK':
      const { book:deletedBook } = action.payload;

      const refreshedBooks = state.books.filter(({id}) => id !== deletedBook.id);
      return {
        ...state,
        books: refreshedBooks,
      };
    default:
      return state;
  }
};

export default bookReducer;

