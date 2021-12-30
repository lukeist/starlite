import { useState } from "react";
import currentBalanceAction from "../store/actions/currentBalanceAction";
import { buyAction, firstBuyAction } from "../store/actions/tradeAction";

export const PanelBuySellStockFormSubmit = (
  dispatch,
  symbol,
  stockPrice,
  quantity,
  positions,
  currentBalance,
  setCurrentBalance,
  totalTrade
) => {
  if (positions.some((position) => position.symbol === symbol)) {
    // BUYING WHEN THERE IS ALREADY SOME POSITIONS

    dispatch(buyAction(symbol, quantity));

    setCurrentBalance(currentBalance - totalTrade);
    dispatch(currentBalanceAction(currentBalance));
  } else {
    // BUYING WHEN THERE IS NO POSITION YET
    dispatch(firstBuyAction);
  }
  dispatch();
};
