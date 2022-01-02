import { sellAction } from "../store/actions/tradeAction";

const PanelBuySellStockFormSell = ({
  setTotalCost,
  setTradeQuantity,
  setCurrentBalance,
  currentBalanceAction,
  dispatch,
  symbol,
  stockPriceChange,
  currentBalance,
  clickSelectHandler,
  FontAwesomeIcon,
  faAngleDown,
  exitPopUpShadow,
  isSelect,
  sharesSelectedHandler,
  shares,
  dollarsSelectedHandler,
  optionSelected,
  dollars,
  PanelBuySellStockDollars,
  totalCost,
  PanelBuySellStockShares,
  stockCurrentPrice,
  tradeQuantity,
  isBuying,
  setIsBuying,
  quantityOfCurrentStock,
  totalCostToString,
  setToTalCostToString,
  showPopupNotEnoughShare,
  isTradeQuantityGreaterThanQuantityOfCurrentStock,
  setIsTradeQuantityGreaterThanQuantityOfCurrentStock,
}) => {
  const PanelBuySellStockFormSubmit = (e) => {
    e.preventDefault();

    const balanceAfterSell = currentBalance + totalCost;
    console.log(tradeQuantity);
    console.log(quantityOfCurrentStock.toString());
    // tradeQuantity === quantityOfCurrentStock
    if (tradeQuantity === quantityOfCurrentStock.toString()) {
      setIsBuying(true);
    }

    // SELL POSITION
    if (tradeQuantity > quantityOfCurrentStock) {
      setIsTradeQuantityGreaterThanQuantityOfCurrentStock(true);
    } else {
      setIsTradeQuantityGreaterThanQuantityOfCurrentStock(false);
      setTotalCost(0);
      setTradeQuantity(0);
      setToTalCostToString("0.00");
      setCurrentBalance(balanceAfterSell);
      dispatch(sellAction(symbol, tradeQuantity));
      dispatch(currentBalanceAction(balanceAfterSell));
    }
  };

  return (
    <form
      className={stockPriceChange < 0 ? "stonk-down" : "stonk-up"}
      action=""
      onSubmit={
        currentBalance > totalCost
          ? PanelBuySellStockFormSubmit
          : showPopupNotEnoughShare
      }
    >
      <div className="trade-info-container">
        <div className="trade-info">
          <label className="trade-label" htmlFor="investment-type">
            Sell In
          </label>

          <button
            className={
              isSelect ? "investment-type-selected" : "investment-type-select"
            }
            type="button"
            id="investment-type"
            name="investment-type"
            onClick={clickSelectHandler}
          >
            <span>{optionSelected}</span>
            {<FontAwesomeIcon className="more-icon" icon={faAngleDown} />}
          </button>
          {isSelect && (
            <div onClick={exitPopUpShadow} className="popup-shadow"></div>
          )}
          {isSelect && (
            <ul
              className="investment-type-options"
              name="investment-type"
              id="investment-type"
            >
              <hr />
              <li
                onClick={sharesSelectedHandler}
                className="investment-type-option"
                value="shares"
              >
                {shares}
              </li>
              <hr />
              <li
                onClick={dollarsSelectedHandler}
                className="investment-type-option"
                value="dollars"
              >
                {dollars}
              </li>
            </ul>
          )}
        </div>
        {optionSelected === dollars ? (
          <PanelBuySellStockDollars
            stockCurrentPrice={stockCurrentPrice}
            tradeQuantity={tradeQuantity}
            setTradeQuantity={setTradeQuantity}
            totalCost={totalCost}
            setTotalCost={setTotalCost}
            isTradeQuantityGreaterThanQuantityOfCurrentStock={
              isTradeQuantityGreaterThanQuantityOfCurrentStock
            }
            isBuying={isBuying}
            stockPriceChange={stockPriceChange}
            quantityOfCurrentStock={quantityOfCurrentStock}
          />
        ) : (
          <PanelBuySellStockShares
            stockCurrentPrice={stockCurrentPrice}
            tradeQuantity={tradeQuantity}
            setTradeQuantity={setTradeQuantity}
            totalCost={totalCost}
            setTotalCost={setTotalCost}
            totalCostToString={totalCostToString}
            setToTalCostToString={setToTalCostToString}
            isTradeQuantityGreaterThanQuantityOfCurrentStock={
              isTradeQuantityGreaterThanQuantityOfCurrentStock
            }
            isBuying={isBuying}
            stockPriceChange={stockPriceChange}
            quantityOfCurrentStock={quantityOfCurrentStock}
          />
        )}
      </div>
      <div className="trade-submit">
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
};
export default PanelBuySellStockFormSell;
