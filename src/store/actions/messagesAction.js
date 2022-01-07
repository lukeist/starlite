import { v4 as uuidv4 } from "uuid";
export const tradeMessagesAction =
  (symbol, stockPrice, quantity, cost, buy, time) => (dispatch) => {
    dispatch({
      type: "TRADE_MESSAGE",
      payload: {
        id: uuidv4(),
        symbol,
        stockPrice,
        quantity,
        cost,
        buy,
        time,
      },
    });
  };
