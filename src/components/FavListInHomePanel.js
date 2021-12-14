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
  removeListAction,
  removeTickerFromListAction,
} from "../store/actions/listAction";
import FavListInHomePanelsTickers from "./FavListInHomePanelsTickers";
import { useSelector } from "react-redux";
import {
  hidePopUpAction,
  showPopUpAction,
} from "../store/actions/popUpListsAction";
const FavListInHomePanel = ({ list }) => {
  const [showingStocks, setShowingStocks] = useState(true);
  const [popUpEditList, setPopUpEditList] = useState(false);
  const [popUpDeleteList, setPopUpDeleteList] = useState(false);
  const { popUpFavLists } = useSelector((state) => state.utilities);
  const dispatch = useDispatch();
  const exitPopUpListEdit = (e) => {
    const element = e.target;
    if (element.classList.contains("listedit-shadow")) {
      setPopUpEditList(false);
    }
  };

  const popUpConfirmDelete = () => {
    setPopUpEditList(false);
    dispatch(showPopUpAction());
  };
  const deleteList = () => {
    console.log(list.id);
    dispatch(removeListAction(list.id));
    dispatch(hidePopUpAction());
  };

  const exitPopUpLists = (e) => {
    const element = e.target;
    if (element.classList.contains("popup-shadow")) {
      dispatch(hidePopUpAction());
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
            onClick={() => setPopUpEditList(true)}
            className="facog-hide"
            icon={faCog}
          />

          {/* // click anywhere to exit pop up */}
          {popUpEditList ? (
            <div onClick={exitPopUpListEdit} className="listedit-shadow"></div>
          ) : (
            ""
          )}

          {popUpEditList ? (
            <ul className="lists-edit">
              <li className="list-edit">
                <FontAwesomeIcon className="edit-icon" icon={faPen} />
                <span>Edit List</span>
              </li>
              <li className="list-edit">
                <FontAwesomeIcon className="edit-icon" icon={faServer} />
                <span>Rearrange Lists</span>
              </li>
              <li onClick={popUpConfirmDelete} className="list-edit">
                <FontAwesomeIcon className="edit-icon" icon={faEraser} />
                <span>Delete List</span>
              </li>
            </ul>
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

      {/* delete list alert / confirmation */}
      {popUpFavLists ? (
        <div onClick={exitPopUpLists} className="popup-shadow">
          <form
            onSubmit={deleteList}
            action=""
            className="lists-panel delete-list"
          >
            <div>
              <p className="deleteconfirm-txt">
                Are you sure you want to delete "
                <span className="deleteconfirm-listname">{list.listName}</span>
                "?
              </p>
            </div>
            <div className="deleteconfirm-buttons">
              <input
                className="deleteconfirm-button"
                type="submit"
                value="Delete List"
              />
              <button
                className="deleteconfirm-button"
                onClick={() => dispatch(hidePopUpAction())}
                type="button"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}

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
