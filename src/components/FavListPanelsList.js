import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faAngleDown,
  faAngleUp,
  faCog,
  faPen,
  faServer,
  faEraser,
} from "@fortawesome/free-solid-svg-icons";
import FavListPanelsTicker from "./FavListPanelsTicker";
import DeleteList from "./FavList-DeleteList";
import RenameList from "./FavList-RenameList";
import Emojis from "./Emojis";

const FavListPanelsList = ({ list }) => {
  const [showingStocks, setShowingStocks] = useState(true);
  const [popUpEditList, setPopUpEditList] = useState(false);
  const [popUpDeleteList, setPopUpDeleteList] = useState(false);
  const [popUpRenameList, setPopUpRenameList] = useState(false);

  const exitPopUpListEdit = (e) => {
    const element = e.target;
    if (element.classList.contains("listedit-shadow")) {
      setPopUpEditList(false);
    }
  };

  const popUpConfirmRename = () => {
    setPopUpEditList(false);
    setPopUpRenameList(true);
  };

  const popUpConfirmDelete = () => {
    setPopUpEditList(false);
    setPopUpDeleteList(true);
  };
  return (
    <div
      key={list.id}
      //   onClick={() => addStockToList(list.id)}
      className="list-container"
    >
      <div className="list-header">
        <div className="list-name">
          {/* <FontAwesomeIcon className="emoji-icon" icon={faRocket} /> */}
          <Emojis />
          <h4>{list.listName}</h4>
        </div>
        <div className="list-details">
          <FontAwesomeIcon
            onClick={() => setPopUpEditList(true)}
            className="facog-hide"
            icon={faCog}
          />

          {/* // click anywhere to exit pop up  edit list cog*/}
          {popUpEditList ? (
            <div onClick={exitPopUpListEdit} className="listedit-shadow"></div>
          ) : (
            ""
          )}

          {popUpEditList ? (
            <ul className="lists-edit">
              <li onClick={popUpConfirmRename} className="list-edit">
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

      {/* edit list name alert / confirmation */}
      {popUpRenameList ? (
        <RenameList list={list} setPopUpRenameList={setPopUpRenameList} />
      ) : (
        ""
      )}

      {/* delete list alert / confirmation */}
      {popUpDeleteList ? (
        <DeleteList list={list} setPopUpDeleteList={setPopUpDeleteList} />
      ) : (
        ""
      )}

      {showingStocks ? (
        <div className="list-stocks">
          {list.tickers.map((stock) => (
            <FavListPanelsTicker key={stock.symbol} stock={stock} />
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FavListPanelsList;
