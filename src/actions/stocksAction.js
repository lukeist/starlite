import axios from "axios";
import {
  quoteData,
  companyNewsData3Days,
  companyNewsData7Days,
  companyNewsDataToday,
  basicFinancialsData,
} from "../api";

export const stocksAction = (symbol) => async (dispatch) => {
  //fetch axios
  const quote = await axios.get(quoteData(symbol));
  const companyNewsToday = await axios.get(companyNewsDataToday(symbol));
  const companyNews7Days = await axios.get(companyNewsData7Days(symbol));
  const basicFinancials = await axios.get(basicFinancialsData(symbol));
  dispatch({
    type: "FETCH_STOCKS",
    payload: {
      quote: quote.data,
      companyNews: companyNews7Days.data,
      basicFinancials: basicFinancials.data.metric,
    },
  });
};
