const PanelBuySellStockFormSell = ({
  setTotalCost,
  setQuantity,
  setCurrentBalance,
  currentBalanceAction,
  positions,
  buyAction,
  dispatch,
  firstBuyAction,
  symbol,
  stockPriceChange,
  currentBalance,
  showPopupNotEnoughMoney,
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
  quantity,
}) => {
  const PanelBuySellStockFormSubmit = (e) => {
    e.preventDefault();
    setTotalCost(0);
    setQuantity(0);
    const balanceAfterBuy = currentBalance - totalCost;
    setCurrentBalance(balanceAfterBuy);
    dispatch(currentBalanceAction(balanceAfterBuy));

    if (positions.some((position) => position.symbol === symbol)) {
      // BUYING WHEN THERE IS ALREADY SOME POSITIONS
      dispatch(buyAction(symbol, quantity));
    } else {
      // BUYING WHEN THERE IS NO POSITION YET
      dispatch(firstBuyAction(symbol, quantity));
    }
  };

  return (
    <form
      className={stockPriceChange < 0 ? "stonk-down" : "stonk-up"}
      action=""
      onSubmit={
        currentBalance > totalCost
          ? PanelBuySellStockFormSubmit
          : showPopupNotEnoughMoney
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
            quantity={quantity}
            setQuantity={setQuantity}
            totalCost={totalCost}
            setTotalCost={setTotalCost}
          />
        ) : (
          <PanelBuySellStockShares
            stockCurrentPrice={stockCurrentPrice}
            quantity={quantity}
            setQuantity={setQuantity}
            setTotalCost={setTotalCost}
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
