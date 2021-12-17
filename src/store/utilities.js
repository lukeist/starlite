import { combineReducers } from "redux";
import isAddingListReducer from "./reducers/isAddingListReducer";
import popUpListsReducer from "./reducers/popUpListsReducer";

const utilitiesReducer = combineReducers({
  popUpFavLists: popUpListsReducer,
  isAddingList: isAddingListReducer,
});

export default utilitiesReducer;
