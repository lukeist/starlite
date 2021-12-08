import { combineReducers } from "redux";
import createListReducer from "./reducers/createListReducer";
import favReducer from "./reducers/favReducer";
import newsReducer from "./reducers/newsReducer";
import searchReducer from "./reducers/searchReducer";
import stocksReducer from "./reducers/stocksReducer";

const entitiesReducer = combineReducers({
  search: searchReducer,
  news: newsReducer,
  stock: stocksReducer,
  stockFavorites: favReducer,
  stockLists: createListReducer,
});

export default entitiesReducer;
