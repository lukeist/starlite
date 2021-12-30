import { combineReducers } from "redux";
import entitiesReducer from "./entities";
import portfolioReducer from "./portfolio";
import utilitiesReducer from "./utilities";
const rootReducer = combineReducers({
  entities: entitiesReducer,
  utilities: utilitiesReducer,
  portfolio: portfolioReducer,
});

export default rootReducer;
