import axios from "axios";
import { marketNewsGeneralData, marketNewsCryptoData } from "../api";

export const newsAction = () => async (dispatch) => {
  const general = await axios.get(marketNewsGeneralData);
  const crypto = await axios.get(marketNewsCryptoData);
  dispatch({
    type: "FETCH_NEWS_GENERAL",
    payload: {
      general: general.data,
    },
  });
  dispatch({ type: "FETCH_NEWS_CRYPTO", payload: { crypto: crypto.data } });
};
