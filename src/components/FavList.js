import { useState } from "react";
import { useDispatch } from "react-redux";
import { addFavAction, removeFavAction } from "../store/actions/favAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faSquare,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
const FavList = ({ company, list }) => {
  const symbol = company.ticker;
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();

  const addStockToList = (listId) => {
    if (isChecked) {
      setIsChecked(!isChecked);
      dispatch(removeFavAction(symbol, listId));
    } else {
      setIsChecked(!isChecked);
      dispatch(addFavAction(symbol, listId));
    }
  };
  return (
    <li
      key={list.id}
      onClick={() => addStockToList(list.id)}
      className="lists-button"
    >
      {!isChecked ? (
        <FontAwesomeIcon className="check-icon" icon={faSquare} />
      ) : (
        <FontAwesomeIcon className="check-icon" icon={faCheckSquare} />
      )}
      <FontAwesomeIcon className="select-icon" icon={faRocket} />
      <h4>{list.listName}</h4>
    </li>
  );
};

export default FavList;
