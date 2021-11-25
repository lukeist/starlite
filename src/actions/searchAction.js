import { symbolLookupData } from "../api";
import axios from "axios";

export const searchAction = (terms) => async (dispatch) => {
  const symbolLookup = await axios.get(symbolLookupData(terms));
  dispatch({
    type: "FETCH_SEARCH",
    payload: {
      result: symbolLookup.data.result,
    },
  });
};
