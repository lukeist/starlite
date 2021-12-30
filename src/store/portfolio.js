import { combineReducers } from "redux";
import currentBalanceReducer from "./reducers/currentBalanceReducer";
import tradeReducer from "./reducers/tradeReducer";

const portfolioReducer = combineReducers({
  buyingPower: currentBalanceReducer,
  positions: tradeReducer,
});

export default portfolioReducer;
