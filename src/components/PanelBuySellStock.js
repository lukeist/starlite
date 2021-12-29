import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretSquareRight,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { showPopUpAction } from "../store/actions/isPopUpListsAction";
import { useState } from "react";
import PanelBuySellStockDollars from "./PanelBuySellStock-Dollars";
import PanelBuySellStockShares from "./PanelBuySellStock-Shares";
import PopupSubmit from "./PanelBuySellStock-PopupSubmit";

const PanelBuySellStock = ({
  company,
  stockPriceChange,
  stockCurrentPrice,
}) => {
  const shares = "Shares";
  const dollars = "Dollars";
  const [isSelect, setIsSelect] = useState(false);
  const [optionSelected, setOptionSelected] = useState(shares);
  const [isPopupSubmit, setIsPopupSubmit] = useState(false);

  const exitPopUpShadow = (e) => {
    const element = e.target;
    if (element.classList.contains("popup-shadow")) {
      setIsSelect(false);
    }
  };
  const clickSelectHandler = () => {
    setIsSelect(true);
  };

  const sharesSelectedHandler = () => {
    setOptionSelected(shares);
    setIsSelect(!isSelect);
  };

  const dollarsSelectedHandler = () => {
    setOptionSelected(dollars);
    setIsSelect(false);
  };

  const dispatch = useDispatch();
  const showPopUpList = () => {
    dispatch(showPopUpAction());
    document.body.style.overflow = "hidden";
    // document.body.style.paddingRight = "0.4rem";
  };
  // const fav = useSelector((state) => state.entities.stockFavorites);
  // const favCurrentStock = fav.filter(
  //   (stock) => stock.symbol === company.ticker
  // );
  const submitTradeForm = (e) => {
    e.preventDefault();
    setIsPopupSubmit(true);
  };
  return (
    <div className="trade-list">
      {isPopupSubmit && (
        <div onClick={exitPopUpShadow} className="popup-shadow"></div>
      )}
      {isPopupSubmit && <PopupSubmit />}

      <div className="trade-panel">
        <div className="trade-header">
          <h4>Buy {company.ticker}</h4>
          {/* <FontAwesomeIcon className="more-icon" icon={faCaretSquareRight} /> */}
        </div>
        <hr />
        <div className="trade-items">
          <form
            className={stockPriceChange < 0 ? "stonk-down" : "stonk-up"}
            action=""
            onSubmit={submitTradeForm}
          >
            <div className="trade-info-container">
              <div className="trade-info">
                {/* <label className="trade-label" htmlFor="quantity">
                Quantity
              </label>
              <input
                className="input-name trade-input"
                type="text"
                id="quantity"
                name="quantity"
              /> */}
                <label className="trade-label" htmlFor="investment-type">
                  Invest In
                </label>

                <button
                  className={
                    isSelect
                      ? "investment-type-selected"
                      : "investment-type-select"
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
                    {/* <li className="investment-type-option">{optionSelected}</li> */}
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
                />
              ) : (
                <PanelBuySellStockShares
                  stockCurrentPrice={stockCurrentPrice}
                />
              )}
            </div>
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
