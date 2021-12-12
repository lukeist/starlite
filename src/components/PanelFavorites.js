import { useSelector } from "react-redux";
import FavStock from "./FavStock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import FavListInHomePanel from "./FavListInHomePanel";
import { v4 as uuidv4 } from "uuid";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { createListAction } from "../store/actions/listAction";

const PanelFavorites = () => {
  const dispatch = useDispatch();
  const stockLists = useSelector((state) => state.entities.stockLists);
  const [isAddingNewList, setIsAddingNewList] = useState(false);
  const [listName, setListName] = useState("");

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
  return (
    <div className="fav-list">
      <div className="fav-header">
        <h4>Watching</h4>
        <FontAwesomeIcon
          onClick={() => setIsAddingNewList(true)}
          className="fav-icon"
          icon={faPlusSquare}
        />
      </div>
      <hr />
      {isAddingNewList ? (
        <form
          onSubmit={addNewListHandler}
          className="createlist-form"
          action=""
          onKeyDown={
            (e) => (e.key === 27 ? () => console.log(e) : "") // Press ESC to exit
          }
        >
          <input onChange={getInput} type="text" />
          <div>
            <button type="button" onClick={() => setIsAddingNewList(false)}>
              {/* the <button> tag defaults to type="submit". If you change it to type="button" => Forms mishandle submit for Enter key: https://github.com/facebook/react/issues/2093 */}
              Cancel
            </button>
            <input type="submit" value="Create List" />
          </div>
        </form>
      ) : (
        ""
      )}
      <div className="fav-items">
        {/* {fav.map((stock) => (
          <FavStock stock={stock} id={stock.symbol} />
        ))} */}

        {stockLists.map((list) => (
          <FavListInHomePanel key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
};

export default PanelFavorites;
