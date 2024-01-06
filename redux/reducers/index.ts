import { combineReducers } from "redux";
import BooksReducer from "./bookReducer";

const rootReducer = combineReducers({
  books: BooksReducer,
});

export default rootReducer;