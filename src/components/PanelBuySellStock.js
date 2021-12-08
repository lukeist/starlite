import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCaretSquareRight } from "@fortawesome/free-regular-svg-icons";
import { faCaretSquareRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { addFavAction, removeFavAction } from "../actions/favAction";
const PanelBuySellStock = ({ company, stockPriceChange }) => {
  const dispatch = useDispatch();
  const addFavHandler = () => {
    dispatch(addFavAction(company.ticker));
  };
  const removeFavHandler = () => {
    dispatch(removeFavAction(company.ticker));
  };
  const favArray = useSelector((state) => state.fav);
  const favCurrentStock = favArray.filter(
    (stock) => stock.symbol === company.ticker
  );
  return (
    <div className="trade-list">
      <div className="trade-panel">
        <div className="trade-header">
          <h4>Buy {company.ticker}</h4>
          <FontAwesomeIcon className="more-icon" icon={faCaretSquareRight} />
        </div>
        <hr />
        <div className="trade-items">
          <form
            className={stockPriceChange < 0 ? "stonk-down" : "stonk-up"}
            action=""
          >
            <div className="trade-info">
              <label className="trade-label" for="quantity">
                Quantity
              </label>
              <input
                className="trade-input"
                type="text"
                id="quantity"
                name="quantity"
              />
              <label className="trade-label" for="amount">
                Amount
              </label>
              <input
                className="trade-input"
                type="text"
                id="amount"
                name="amount"
                placeholder="$0.00"
              />
            </div>
            <hr />
            <div></div>
            <div className="trade-submit">
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
      <div
        className={
          stockPriceChange < 0 ? "fav-add stonk-down" : "fav-add stonk-up"
        }
      >
        {favCurrentStock.length === 1 ? ( // if the stock is already in the array => unwatch it
          <button onClick={removeFavHandler}>Unwatch {company.ticker}</button>
        ) : (
          <button onClick={addFavHandler}>Watch {company.ticker}</button>
        )}
      </div>
    </div>
  );
};

export default PanelBuySellStock;
