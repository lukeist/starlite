import { combineReducers } from "redux";
import newsReducer from "./newsReducer";
import searchReducer from "./searchReducer";
import stocksReducer from "./stocksReducer";
const rootReducer = combineReducers({
  stocks: stocksReducer,
  news: newsReducer,
  search: searchReducer,
});

export default rootReducer;
