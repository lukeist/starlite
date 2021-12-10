import { combineReducers } from "redux";
import popUpListsReducer from "./reducers/popUpListsReducer";

const utilitiesReducer = combineReducers({
  popUpFavLists: popUpListsReducer,
});

export default utilitiesReducer;
