import axios from "axios";
import { quoteData } from "../api";
export const favAction = (symbol) => async (dispatch) => {
  // const general = await axios.get(marketNewsGeneralData);
  // const crypto = await axios.get(marketNewsCryptoData);
  const quote = await axios.get(quoteData(symbol));

  dispatch({
    type: "FETCH_FAV",
    payload: {
      symbol,
      quote: quote.data,
    },
  });
};
