import { v4 as uuidv4 } from "uuid";
export const tradeMessagesAction =
  (symbol, quantity, price, buy) => (dispatch) => {
    dispatch({
      type: "TRADE_MESSAGE",
      payload: {
        id: uuidv4(),
        symbol,
        quantity,
        price,
        buy,
      },
    });
  };
