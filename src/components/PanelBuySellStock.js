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
import { useSelector } from "react-redux";
// import { PanelBuySellStockFormSubmit } from "./PanelBuySellStock-FormSubmit";
import { buyAction, firstBuyAction } from "../store/actions/tradeAction";
import currentBalanceAction from "../store/actions/currentBalanceAction";
import PopupNotEnoughMoney from "../components/PanelBuySellStock-PopupNotEnoughMoney";
import PanelBuySellStockFormSell from "./PanelBuySellStock-FormSell";

const PanelBuySellStock = ({
  company,
  stockPriceChange,
  stockCurrentPrice,
}) => {
  const shares = "Shares";
  const dollars = "Dollars";
  const symbol = company.ticker;
  const [isSelect, setIsSelect] = useState(false);
  const [notEnoughMoney, setNotEnoughMoney] = useState(false);
  const [optionSelected, setOptionSelected] = useState(shares);
  const [isPopupSubmit, setIsPopupSubmit] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const { positions, buyingPower } = useSelector((state) => state.portfolio);
  const [currentBalance, setCurrentBalance] = useState(buyingPower.balance);
  const buyingPowerWithDecimal =
    ((currentBalance + Number.EPSILON) * 100) / 100;
  const buyingPowerWithCommas = buyingPowerWithDecimal
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ","); //How to print a number with commas as thousands separators in JavaScript https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript

  const buyingPowerWithCommasSlicedFromDecimalPoint =
    buyingPowerWithCommas.slice(0, buyingPowerWithCommas.indexOf(".") + 3); // to prevent a bug that makes buyingPower looks like this: $144,918.85,000,000,003

  const exitPopUpShadow = (e) => {
    const element = e.target;
    if (element.classList.contains("popup-shadow")) {
      setIsSelect(false);
      setIsPopupSubmit(false);
      setNotEnoughMoney(false);
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
  const showPopupNotEnoughMoney = (e) => {
    e.preventDefault();
    setNotEnoughMoney(true);
  };

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
    <div className="trade-list">
      {isPopupSubmit && (
        <div onClick={exitPopUpShadow} className="popup-shadow"></div>
      )}
      {isPopupSubmit && <PopupSubmit />}

      {notEnoughMoney && (
        <div onClick={exitPopUpShadow} className="popup-shadow"></div>
      )}
      {notEnoughMoney && <PopupNotEnoughMoney />}
      <div className="trade-panel">
        <div className="trade-header">
          <h4>Buy {symbol}</h4>
          {/* <FontAwesomeIcon className="more-icon" icon={faCaretSquareRight} /> */}
        </div>
        <hr />
        {/* <button onClick={() => console.log(currentBalance)}></button> */}
        <div className="trade-items">
          <PanelBuySellStockFormSell
            setTotalCost={setTotalCost}
            setQuantity={setQuantity}
            currentBalance={currentBalance}
            totalCost={totalCost}
            setCurrentBalance={setCurrentBalance}
            dispatch={dispatch}
            currentBalanceAction={currentBalanceAction}
            positions={positions}
            buyAction={buyAction}
            symbol={symbol}
            quantity={quantity}
            firstBuyAction={firstBuyAction}
            stockPriceChange={stockPriceChange}
            showPopupNotEnoughMoney={showPopupNotEnoughMoney}
            isSelect={isSelect}
            clickSelectHandler={clickSelectHandler}
            optionSelected={optionSelected}
            FontAwesomeIcon={FontAwesomeIcon}
            faAngleDown={faAngleDown}
            exitPopUpShadow={exitPopUpShadow}
            sharesSelectedHandler={sharesSelectedHandler}
            shares={shares}
            dollarsSelectedHandler={dollarsSelectedHandler}
            dollars={dollars}
            PanelBuySellStockDollars={PanelBuySellStockDollars}
            stockCurrentPrice={stockCurrentPrice}
            PanelBuySellStockShares={PanelBuySellStockShares}
          />
          <form
            className={stockPriceChange < 0 ? "stonk-down" : "stonk-up"}
            action=""
            onSubmit={
              currentBalance > totalCost
                ? PanelBuySellStockFormSubmit
                : showPopupNotEnoughMoney
              // (
              //   dispatch,
              //   symbol,
              //   stockCurrentPrice,
              //   quantity,
              //   positions,
              //   currentBalance,
              //   setCurrentBalance,
              //   totalCost
              // )
            }
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
        </div>
        <hr />
        <div
          className={
            stockPriceChange < 0
              ? "trade-panel-buying-power stonk-down"
              : "trade-panel-buying-power stonk-up"
          }
        >
          <span className="trade-panel-buying-power-txt">
            $
            {buyingPowerWithCommas.indexOf(".") < 0
              ? buyingPowerWithCommas
              : buyingPowerWithCommasSlicedFromDecimalPoint}{" "}
            buying power available
          </span>
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
        <button onClick={showPopUpList}>Watch {symbol}</button>
      </div>
    </div>
  );
};

export default PanelBuySellStock;
