import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import FavListInPopUp from "./FavListInPopUp";
import { createListAction } from "../store/actions/listAction";
import { hidePopUpAction } from "../store/actions/popUpListsAction";

const PopUpAddRemoveEditLists = ({ quote, company }) => {
  const [isAddingNewList, setIsAddingNewList] = useState(false);

  const [listName, setListName] = useState("");

  const dispatch = useDispatch();
  const stockLists = useSelector((state) => state.entities.stockLists);
  const getInput = (e) => {
    console.log(e.target.value);
    setListName(e.target.value);
  };

  const addNewListHandler = (e) => {
    e.preventDefault();
    setIsAddingNewList(false);
    const listId = uuidv4();
    dispatch(createListAction(listName, listId));
  };

  // generate all the emojis and append them in to a single select dropdown https://stackoverflow.com/questions/39871916/is-it-possible-to-generate-all-the-emojis-and-append-to-the-select-dropdown
  // const emojOptions = () => {
  //   const emojRange = [
  //     [128513, 128591],
  //     [9986, 10160],
  //     [128640, 128704],
  //   ];
  //   var newOption;
  //   for (var i = 0; i < emojRange.length; i++) {
  //     var range = emojRange[i];
  //     for (var x = range[0]; x < range[1]; x++) {
  //       newOption = document.createElement("option");
  //       newOption.value = x;
  //       newOption.innerHTML = "&#" + x + ";";
  //       mySelect.appendChild(newOption);
  //     }
  //   }
  // };

  const exitPopUpLists = (e) => {
    const element = e.target;
    if (element.classList.contains("popup-shadow")) {
      dispatch(hidePopUpAction());
    }
  };
  return (
    <div onClick={exitPopUpLists} className="popup-shadow">
      <div
        onKeyDown={
          (e) => (e.key === 27 ? console.log("asdfasdf") : "") // Press ESC to exit Pop-up
        }
        className="lists-panel"
      >
        <div className="lists-header">
          <h3>Add {company.ticker} to List</h3>
          <FontAwesomeIcon
            onClick={() => dispatch(hidePopUpAction())}
            className="exit-icon"
            icon={faWindowClose}
          />
        </div>
        <hr />
        {!isAddingNewList ? (
          <div className="createlist-container">
            <div
              onClick={() => setIsAddingNewList(true)}
              className="createlist-button"
            >
              <div></div>
              <FontAwesomeIcon
                className="createlist-icon"
                icon={faPlusSquare}
              />
              <h3>Create New List</h3>
            </div>
          </div>
        ) : (
          <div>
            <form
              onSubmit={addNewListHandler}
              className="createlist-form"
              action=""
            >
              <input
                onKeyDown={
                  (e) => (e.key === 27 ? () => console.log(e) : "") // Press ESC to exit Pop-up
                }
                onChange={getInput}
                type="text"
              />
              <div>
                <button type="button" onClick={() => setIsAddingNewList(false)}>
                  {/* the <button> tag defaults to type="submit". If you change it to type="button" => Forms mishandle submit for Enter key: https://github.com/facebook/react/issues/2093 */}
                  Cancel
                </button>
                <input type="submit" value="Create List" />
              </div>
            </form>
          </div>
        )}
        <div className="lists-container">
          <ul>
            {stockLists.map((list) => (
              <FavListInPopUp
                key={list.id}
                list={list}
                quote={quote}
                company={company}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default PopUpAddRemoveEditLists;
