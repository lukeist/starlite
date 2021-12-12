import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFavAction, removeFavAction } from "../store/actions/favAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faSortDown,
  faAngleDown,
  faAngleUp,
  faCog,
  faPen,
  faServer,
  faEraser,
} from "@fortawesome/free-solid-svg-icons";
import {
  addTickerToListAction,
  removeTickerFromListAction,
} from "../store/actions/listAction";
import FavListInHomePanelsTickers from "./FavListInHomePanelsTickers";
const FavListInHomePanel = ({ list }) => {
  const [showingStocks, setShowingStocks] = useState(true);
  const [showingPopUpListEdit, setShowingPopUpListEdit] = useState(false);
  const exitPopUpListEdit = (e) => {
    const element = e.target;
    if (element.classList.contains("listedit-shadow")) {
      setShowingPopUpListEdit(false);
    }
  };
  return (
    <div
      key={list.id}
      //   onClick={() => addStockToList(list.id)}
      className="list-container"
    >
      <div className="list-header">
        <FontAwesomeIcon className="emoji-icon" icon={faRocket} />
        <h4>{list.listName}</h4>
        <div className="list-details">
          <FontAwesomeIcon
            onClick={() => setShowingPopUpListEdit(true)}
            className="facog-hide"
            icon={faCog}
          />

          {showingPopUpListEdit ? (
            <div onClick={exitPopUpListEdit} className="listedit-shadow">
              <ul className="list-edit">
                <li>
                  <FontAwesomeIcon className="edit-icon" icon={faPen} />
                  <span>Edit List</span>
                </li>
                <li>
                  <FontAwesomeIcon className="edit-icon" icon={faServer} />
                  <span>Rearrange Lists</span>
                </li>
                <li>
                  <FontAwesomeIcon className="edit-icon" icon={faEraser} />
                  <span>Delete List</span>
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}

          {!showingStocks ? (
            <FontAwesomeIcon
              onClick={() => setShowingStocks(!showingStocks)}
              className={!showingStocks ? "faangle-down" : "faangle-faded"}
              icon={faAngleDown}
            />
          ) : (
            <FontAwesomeIcon
              onClick={() => setShowingStocks(!showingStocks)}
              className={showingStocks ? "faangle-up" : "faangle-faded"}
              icon={faAngleUp}
            />
          )}
        </div>
      </div>
      {showingStocks ? (
        <div className="list-stocks">
          {list.tickers.map((stock) => (
            <FavListInHomePanelsTickers key={stock.symbol} stock={stock} />
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FavListInHomePanel;
