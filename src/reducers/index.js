import { combineReducers } from "redux";
import createListReducer from "./createListReducer";
import favReducer from "./favReducer";
import newsReducer from "./newsReducer";
import searchReducer from "./searchReducer";
import stocksReducer from "./stocksReducer";

const rootReducer = combineReducers({
  stocks: stocksReducer,
  news: newsReducer,
  search: searchReducer,
  fav: favReducer,
  list: createListReducer,
});

export default rootReducer;
