import { useState } from "react";

const PanelBuySellStockShares = ({
  stockCurrentPrice,
  tradeQuantity,
  setTradeQuantity,
  setTotalCost,
  totalCostToString,
  setToTalCostToString,
  isBuying,
  stockPriceChange,
}) => {
  // const [totalCostToString, setToTalCostToString] = useState("0.00");

  const maxInputLength = 9; // only 9 digits allow in input
  const estCostHandler = (e) => {
    const getNumberOfShares = e.target.value;
    // const getNumberOfSharesParseFloat =
    //   Math.round(parseFloat(getNumberOfShares + Number.EPSILON) * 10000) /
    //   10000;
    const getEstimateCost =
      Math.round(
        (getNumberOfShares * stockCurrentPrice + Number.EPSILON) * 100 //to be more specific and to ensure things like 1.005 round correctly, use Number.EPSILON : https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
      ) / 100;
    setTradeQuantity(getNumberOfShares);
    setTotalCost(getEstimateCost);

    const getEstimateCostToString = getEstimateCost
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Display large numbers with commas https://stackoverflow.com/questions/27761543/how-do-i-display-large-numbers-with-commas-html

    // LIMIT input TO ONLY $999,999,999
    if (getNumberOfShares.length < maxInputLength + 1) {
      getNumberOfShares > 0
        ? setToTalCostToString(getEstimateCostToString)
        : setToTalCostToString("0.00");
    }
  };
  const limitNumberToTen = (number) => {
    return parseFloat(number.toString().slice(0, maxInputLength));
  };
  return (
    <div>
      <div className="trade-info">
        <label className="trade-label" htmlFor="tradeQuantity-shares">
          Shares
        </label>
        <input
          type="number"
          min="0"
          //   onInput="validity.valid||(value='')"
          required
          onChange={estCostHandler}
          className="input-name trade-input"
          id="tradeQuantity-shares"
          name="tradeQuantity-shares"
          placeholder="0"
          value={
            tradeQuantity === 0
              ? ""
              : tradeQuantity.length > maxInputLength
              ? limitNumberToTen(tradeQuantity)
              : tradeQuantity
          }
        />
      </div>
      <div className="trade-info">
        <span className="market-price">Market Price</span>
        <span className="market-price-result">${stockCurrentPrice}</span>
      </div>
      <hr className="trade-hr-line" />
      <div className="trade-info">
        <span className="estimate">Estimate Cost</span>
        <span className="estimate-result">${totalCostToString}</span>
      </div>
    </div>
  );
};
export default PanelBuySellStockShares;
