import { useState } from "react";

const PanelBuySellStockShares = ({
  stockCurrentPrice,
  quantity,
  setQuantity,
  setTotalCost,
}) => {
  const [estimateCost, setEstimateCost] = useState(0);
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
    setQuantity(getNumberOfShares);
    setTotalCost(getEstimateCost);

    const getEstimateCostToString = getEstimateCost
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Display large numbers with commas https://stackoverflow.com/questions/27761543/how-do-i-display-large-numbers-with-commas-html

    if (getNumberOfShares.length < maxInputLength + 1) {
      getNumberOfShares > 0
        ? setEstimateCost(getEstimateCostToString)
        : setEstimateCost(0);
    }
  };
  const limitNumberToTen = (number) => {
    return parseFloat(number.toString().slice(0, maxInputLength));
  };
  return (
    <div>
      <div className="trade-info">
        <label className="trade-label" htmlFor="quantity-shares">
          Shares
        </label>
        <input
          type="number"
          min="0"
          //   onInput="validity.valid||(value='')"
          required
          onChange={estCostHandler}
          className="input-name trade-input"
          id="quantity-shares"
          name="quantity-shares"
          placeholder="0"
          value={
            quantity === 0
              ? ""
              : quantity.length > maxInputLength
              ? limitNumberToTen(quantity)
              : quantity
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
        <span className="estimate-result">${estimateCost}</span>
      </div>
    </div>
  );
};
export default PanelBuySellStockShares;
