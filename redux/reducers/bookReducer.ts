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
    default:
      return state;
  }
};

export default bookReducer;

