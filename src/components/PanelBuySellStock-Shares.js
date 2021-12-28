import { useState } from "react";

const PanelBuySellStockShares = ({ stockCurrentPrice }) => {
  const [estimateCost, setEstimateCost] = useState(0);
  const estCostHandler = (e) => {
    const getNumberOfShares = e.target.value;
    const getEstimateCost = getNumberOfShares * stockCurrentPrice;
    const getEstimateCostToString = getEstimateCost
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Display large numbers with commas https://stackoverflow.com/questions/27761543/how-do-i-display-large-numbers-with-commas-html
    if (getNumberOfShares > 0) {
      setEstimateCost(getEstimateCostToString);
    } else {
      setEstimateCost(0);
    }
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
