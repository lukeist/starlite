import { useState } from "react";
import { useDispatch } from "react-redux";
import { editListAction } from "../store/actions/listAction";

const RenameList = ({ list, setPopUpRenameList }) => {
  const dispatch = useDispatch();
  const [listName, setListName] = useState(list.listName);

  const getInput = (e) => {
    e.preventDefault();
    const element = e.target.value;
    setListName(element);
  };
  const renameListHandler = () => {
    list.listName = listName;
    dispatch(editListAction(listName, list.id));
    setPopUpRenameList(false);
  };

  const cancelRenameListHandler = () => {
    setPopUpRenameList(false);
    setListName(list.listName);
  };

  const exitPopUpRenameList = (e) => {
    const element = e.target;
    if (element.classList.contains("popup-shadow")) {
      setPopUpRenameList(false);
      setListName(list.listName);
    }
  };
  return (
    <div onClick={exitPopUpRenameList} className="popup-shadow">
      <form
        onSubmit={renameListHandler}
        action=""
        className="lists-panel confirm-list"
      >
        <p className="confirm-txt">Enter a new name for this list:</p>
        <input
          className="name-input"
          onChange={getInput}
          type="text"
          value={listName}
        />
        <div className="confirm-buttons">
          <input className="confirm-button" type="submit" value="Save" />
          <button
            className="confirm-button"
            onClick={cancelRenameListHandler}
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default RenameList;
