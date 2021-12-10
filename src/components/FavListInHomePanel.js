import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFavAction, removeFavAction } from "../store/actions/favAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faSquare,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import {
  addTickerToListAction,
  removeTickerFromListAction,
} from "../store/actions/listAction";
import FavListInHomePanelsTickers from "./FavListInHomePanelsTickers";
const FavListInHomePanel = ({ list }) => {
  return (
    <div
      key={list.id}
      //   onClick={() => addStockToList(list.id)}
      className="lists-container"
    >
      <div className="list-header">
        <FontAwesomeIcon className="select-icon" icon={faRocket} />
        <h4>{list.listName}</h4>
        <div className="testt">
          <h4></h4>
          <FontAwesomeIcon className="arrow-icon" icon={faArrowUp} />
        </div>
      </div>
      <div>
        {list.tickers.map((stock) => (
          <FavListInHomePanelsTickers key={list.id} stock={stock} />
        ))}
      </div>
    </div>
  );
};

export default FavListInHomePanel;
