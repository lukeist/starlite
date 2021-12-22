import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { renameListAction } from "../store/actions/listAction";
import Emojis from "../components/Emojis";
import { TableOfStock, TableofStockHeader } from "../components/TableOfStock";
import FavListPanel from "../components/FavListPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faEraser } from "@fortawesome/free-solid-svg-icons";
import DeleteList from "../components/FavList-DeleteList";
import { useEffect } from "react";

const List = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const startPositionOfListIdInLocationPathname = 7; // for example: location.pathname = /lists/1d9fa494-8a3f-4951-a99b-e3d27576aae9
  const listId = location.pathname.slice(
    startPositionOfListIdInLocationPathname
  );
  // const listId = stringFromBrowser.slice(stringFromBrowser.indexOf("?"), 1);

  const { stockLists } = useSelector((state) => state.entities);
  const filterListfromListsToArray = stockLists.filter(
    (list) => list.id === listId
  );
  const firstListInArrayIndex = 0;

  const [currentList, setCurrentList] = useState(
    filterListfromListsToArray[firstListInArrayIndex]
  );
  const [listName, setListName] = useState(currentList.listName);
  const [emoji, setEmoji] = useState(currentList.emoji);

  //////////////// PUT LiST TO STATE WHEN CLICK ON LIST PANEL's ITEM on LIST PAGE
  useEffect(() => {
    // useEffect only when pathname has /lists/xxx, not /stocks/xxx or anything else
    if (location.pathname.includes("lists")) {
      const listFromBrowser = filterListfromListsToArray[firstListInArrayIndex];
      setCurrentList(listFromBrowser);
      setListName(listFromBrowser.listName);
      setEmoji(listFromBrowser.emoji);
    }
  }, [location]);

  const [emojiActive, setEmojiActive] = useState(false);
  const [cogDelete, setCogDelete] = useState(false);
  const [isDeletingList, setIsDeletingList] = useState(false);

  const editListHandler = (e) => {
    e.preventDefault();
    currentList.emoji = emoji;
    currentList.listName = listName;
    dispatch(renameListAction(listName, emoji, listId));
  };
  const getInput = (e) => {
    setListName(e.target.value);
  };
  const exitPopUpEmoji = (e) => {
    const element = e.target;
    if (element.classList.contains("emoji-shadow")) {
      setEmojiActive(false);
      editListHandler();
    }
  };
  const exitPopUpCogDelete = (e) => {
    const element = e.target;
    if (element.classList.contains("listedit-shadow")) {
      setCogDelete(false);
    }
  };
  const popUpConfirmDelete = () => {
    setCogDelete(false);
    setIsDeletingList(true);
  };
  return (
    <div className="home">
      {/* {stockActive ? ( */}
      <div className="home-body">
        <div className="list-body">
          <div className="list-header">
            <form
              onSubmit={editListHandler}
              className="listpage-form"
              action=""
              id="form-addlist"
            >
              <div className="input-items">
                <button
                  onClick={() => setEmojiActive(!emojiActive)}
                  type="button"
                  className="input-emoji"
                >
                  {emoji}
                </button>
                <div className="input-group">
                  <input
                    className="input-name"
                    placeholder="List Name"
                    onKeyDown={
                      (e) => (e.key === 27 ? () => console.log(e) : "") // Press ESC to exit Pop-up
                    }
                    onChange={getInput}
                    type="text"
                    minLength="1"
                    maxLength="68"
                    required
                    value={listName}
                    onBlur={editListHandler}
                    required
                  />
                  <FontAwesomeIcon
                    onClick={() => setCogDelete(true)}
                    className="deletelist-icon"
                    icon={faCog}
                  />
                  {cogDelete && (
                    <div className="lists-edit cog-retransform">
                      <div onClick={popUpConfirmDelete} className="list-edit">
                        <FontAwesomeIcon
                          className="edit-icon"
                          icon={faEraser}
                        />
                        <span>Delete List</span>
                      </div>
                      <div
                        onClick={exitPopUpCogDelete}
                        className="listedit-shadow cog-shadow"
                      ></div>
                    </div>
                  )}
                </div>
                <p className="input-sub">
                  {currentList.tickers.length > 1
                    ? currentList.tickers.length + ` items`
                    : currentList.tickers.length + ` item`}
                </p>
              </div>
              {emojiActive && (
                <div onClick={exitPopUpEmoji} className="emoji-shadow"></div>
              )}
              {emojiActive && (
                <div className="picker-emoji list-emoji">
                  <Emojis setEmoji={setEmoji} />
                </div>
              )}
            </form>
          </div>

          {currentList.length > 0 ? (
            <div>
              <div className="table-row">
                <TableofStockHeader />
                {currentList.tickers.map((list) => (
                  <TableOfStock key={list.symbol} list={list} />
                ))}
              </div>
              <div className="fav-container">
                <FavListPanel />
                {/* </div> */}
              </div>
            </div>
          ) : (
            <h4>This list is empty, like your life.</h4>
          )}
        </div>
        <div className="fav-container">
          <FavListPanel />
          {/* </div> */}
        </div>
        {/* delete list alert / confirmation */}
        {isDeletingList && (
          <DeleteList
            setIsDeletingList={setIsDeletingList}
            list={currentList}
          />
        )}
      </div>

      {/* ) : (
        <div>
          <div class="blobs">
            <div class="blob-center"></div>
            <div class="blob"></div>
            <div class="blob"></div>
            <div class="blob"></div>
            <div class="blob"></div>
            <div class="blob"></div>
            <div class="blob"></div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
              <filter id="goo">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="10"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                  result="goo"
                />
                <feBlend in="SourceGraphic" in2="goo" />
              </filter>
            </defs>
          </svg>
        </div>
      )} */}
    </div>
  );
};
export default List;
