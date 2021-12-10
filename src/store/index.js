import { combineReducers } from "redux";
import entitiesReducer from "./entities";
import utilitiesReducer from "./utilities";
const rootReducer = combineReducers({
  entities: entitiesReducer,
  utilities: utilitiesReducer,
});

export default rootReducer;
