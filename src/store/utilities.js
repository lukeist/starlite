import { combineReducers } from "redux";
import isAddingListReducer from "./reducers/isAddingListReducer";
import isEditingListReducer from "./reducers/isEditingListReducer";
import isPopUpListsReducer from "./reducers/isPopUpListsReducer";

const utilitiesReducer = combineReducers({
  PopUpFavLists: isPopUpListsReducer,
  PopUpAddingList: isAddingListReducer,
  PopUpEditingList: isEditingListReducer,
});

export default utilitiesReducer;
