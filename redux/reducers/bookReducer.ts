import {Book} from '@/types/books';

const initialState: {
  books: Book[],
  book: Partial<Book>,
} = {
  books: [],
  book: {}
};

const bookReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_BOOKS':
      const { books } = action.payload;

      return {
        ...state,
        books: [...books ],
      };
    case 'EDIT_BOOK':
      const { book:editedBook } = action.payload;

      return {
        ...state,
        book: editedBook || {}
      };
    case 'UPDATE_BOOK':
      const { book:updatedBook } = action.payload;

      const updatedBooks = state.books.map((book) =>
        book.id === updatedBook.id ? updatedBook : book
      );

      return {
        ...state,
        books: updatedBooks,
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

