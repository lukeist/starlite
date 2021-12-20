import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { renameListAction } from "../store/actions/listAction";
import Emojis from "../components/Emojis";

const List = () => {
  const location = useLocation();
  const startPositionOfListIdInLocationPathname = 7; // for example: location.pathname = /lists/1d9fa494-8a3f-4951-a99b-e3d27576aae9
  const listId = location.pathname.slice(
    startPositionOfListIdInLocationPathname
  );
  const { stockLists } = useSelector((state) => state.entities);
  const filterListfromListsToArray = stockLists.filter(
    (list) => list.id === listId
  );
  const firstListInArrayIndex = 0;
  const currentList = filterListfromListsToArray[firstListInArrayIndex];

  const [listName, setListName] = useState(currentList.listName);
  const [emoji, setEmoji] = useState(currentList.emoji);
  const [emojiActive, setEmojiActive] = useState(false);

  const dispatch = useDispatch();

  const editListHandler = () => {
    // e.preventDefault();
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

  return (
    <div className="home">
      {/* {stockActive ? ( */}
      <div className="home-body">
        <div className="list-body">
          <div className="list-header">
            <form
              //   onSubmit={editListHandler}

              className="createlist-form"
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
                />
              </div>

              {emojiActive && (
                <div className="picker-emoji favlistpanel-emoji popuplists-emoji list-emoji">
                  <Emojis setEmoji={setEmoji} />
                </div>
              )}
              {emojiActive && (
                <div onClick={exitPopUpEmoji} className="emoji-shadow"></div>
              )}
            </form>
          </div>
          {}
        </div>
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
