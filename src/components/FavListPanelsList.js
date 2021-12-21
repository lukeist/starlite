import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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
import { Link } from "react-router-dom";

const FavListPanelsList = ({ list }) => {
  const [showingStocks, setShowingStocks] = useState(true);
  const [popUpEditList, setPopUpEditList] = useState(false);
  const [isRenamingList, setIsRenamingList] = useState(false);
  const [isDeletingList, setIsDeletingList] = useState(false);
  // const dispatch = useDispatch();
  // const { isDeletingList, popupRenamingList } = useSelector(
  //   (state) => state.utilities.PopUpEditingList
  // );

  const exitPopUpListEdit = (e) => {
    const element = e.target;
    if (element.classList.contains("listedit-shadow")) {
      setPopUpEditList(false);
    }
  };

  const popUpConfirmRename = () => {
    setPopUpEditList(false);
    setIsRenamingList(true);
  };

  const popUpConfirmDelete = () => {
    setPopUpEditList(false);
    setIsDeletingList(true);
  };
  return (
    <div className="list-container">
      <div className="list-header">
        <Link to={`/lists/${list.id}`}>
          <div className="list-info">
            <h4 className="list-emoji">{list.emoji}</h4>
            <div className="list-name">
              <h4>{list.listName}</h4>
            </div>
          </div>
        </Link>
        <div className="list-details">
          <FontAwesomeIcon
            onClick={() => setPopUpEditList(true)}
            className="facog-hide"
            icon={faCog}
          />

          {/* // click anywhere to exit pop up  edit list cog*/}
          {popUpEditList && (
            <div onClick={exitPopUpListEdit} className="listedit-shadow"></div>
          )}

          {popUpEditList && (
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
      {/* {popupRenamingList ? <RenameList list={list} /> : ""} */}
      {isRenamingList && (
        <RenameList
          isRenamingList={isRenamingList}
          setIsRenamingList={setIsRenamingList}
          list={list}
        />
      )}
      {/* delete list alert / confirmation */}
      {isDeletingList && (
        <DeleteList setIsDeletingList={setIsDeletingList} list={list} />
      )}

      {/* list all chosen stocks */}
      {showingStocks && (
        <div className="list-stocks">
          {list.tickers.map((stock) => (
            <FavListPanelsTicker key={stock.symbol} stock={stock} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavListPanelsList;