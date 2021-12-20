import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFavAction, removeFavAction } from "../store/actions/favAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faSquare,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import {
  addTickerToListAction,
  removeTickerFromListAction,
} from "../store/actions/listAction";
const PopUpAddedList = ({ company, list, quote }) => {
  const stockCurrentPrice = quote.c;
  const stockPercentChange = Math.round(quote.dp * 100) / 100;
  const stock = {
    symbol: company.ticker,
    stockCurrentPrice,
    stockPercentChange,
  };
  const dispatch = useDispatch();

  const indexOfCurrentList = list.tickers.findIndex(
    (x) => x.symbol === company.ticker
  );
  ////////////////////// don't understand why this works for adding/removing item to/from array then dispatching
  const addStockToList = (listId) => {
    if (indexOfCurrentList > -1) {
      list.tickers.splice(indexOfCurrentList, 1);
      dispatch(removeTickerFromListAction(stock, listId));
    } else {
      list.tickers.push(stock);
      dispatch(addTickerToListAction(stock, listId));
    }
  };

  return (
    <li
      key={list.id}
      onClick={() => addStockToList(list.id)}
      className="lists-button"
    >
      {indexOfCurrentList > -1 ? (
        <FontAwesomeIcon className="check-icon" icon={faCheckSquare} />
      ) : (
        <FontAwesomeIcon className="check-icon" icon={faSquare} />
      )}
      <h4 className="list-emoji">{list.emoji}</h4>{" "}
      <div className="list-name">
        <h4>{list.listName}</h4>
      </div>
    </li>
  );
};

export default PopUpAddedList;
