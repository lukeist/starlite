import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import FavList from "./FavList";
import { createListAction } from "../store/actions/createListAction";

const PanelAddRemoveEditLists = ({ company }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [listName, setListName] = useState("");

  const dispatch = useDispatch();
  const listState = useSelector((state) => state.entities.stockLists);
  const getInput = (e) => {
    console.log(e.target.value);
    setListName(e.target.value);
  };

  const addNewListHandler = (e) => {
    e.preventDefault();
    setIsAdding(false);
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

  return (
    <div className="popup-shadow">
      <div className="lists-panel">
        <div className="lists-header">
          <h3>Add {company.ticker} to List</h3>
          <FontAwesomeIcon className="exit-icon" icon={faWindowClose} />
        </div>
        <hr />
        {!isAdding ? (
          <div className="createlist-container">
            <div
              onClick={() => setIsAdding(true)}
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
              <input onChange={getInput} type="text" />
              <div>
                <button onClick={() => setIsAdding(false)}>Cancel</button>
                <input type="submit" value="Create List" />
              </div>
            </form>
          </div>
        )}
        <div className="lists-container">
          <ul>
            {listState.map((list) => (
              <FavList list={list} company={company} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default PanelAddRemoveEditLists;
