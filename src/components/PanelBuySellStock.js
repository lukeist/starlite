import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretSquareRight } from "@fortawesome/free-solid-svg-icons";
import { showPopUpAction } from "../store/actions/isPopUpListsAction";

const PanelBuySellStock = ({ company, stockPriceChange }) => {
  const dispatch = useDispatch();

  const showPopUpList = () => {
    dispatch(showPopUpAction());
  };
  // const fav = useSelector((state) => state.entities.stockFavorites);
  // const favCurrentStock = fav.filter(
  //   (stock) => stock.symbol === company.ticker
  // );
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
              <label className="trade-label" htmlFor="quantity">
                Quantity
              </label>
              <input
                className="input-name trade-input"
                type="text"
                id="quantity"
                name="quantity"
              />
              <label className="trade-label" htmlFor="amount">
                Amount
              </label>
              <input
                className="input-name trade-input"
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
        {/* {favCurrentStock.length === 1 ? ( // if the stock is already in the array => unwatch it */}
        {/* <button onClick={removeFavHandler}>Unwatch {company.ticker}</button> */}
        {/* ) : ( */}
        {/* <button onClick={addFavHandler}>Watch {company.ticker}</button> */}
        {/* )} */}
        <button onClick={showPopUpList}>Watch {company.ticker}</button>
      </div>
    </div>
  );
};

export default PanelBuySellStock;
