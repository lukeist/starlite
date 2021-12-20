import { useDispatch } from "react-redux";
import { removeListAction } from "../store/actions/listAction";

const DeleteList = ({ setIsDeletingList, list }) => {
  const dispatch = useDispatch();

  const deleteListHandler = () => {
    dispatch(removeListAction(list.id));
    setIsDeletingList(false);
  };

  const exitPopUpDeleteList = (e) => {
    const element = e.target;
    if (element.classList.contains("popup-shadow")) {
      setIsDeletingList(false);
    }
  };

  return (
    <div onClick={exitPopUpDeleteList} className="popup-shadow">
      <form
        onSubmit={deleteListHandler}
        action=""
        className="lists-panel confirm-list"
      >
        <div>
          <p className="confirm-txt">
            Are you sure you want to delete "
            <span className="confirm-listname">{list.listName}</span>
            "?
          </p>
        </div>
        <div className="confirm-buttons">
          <input
            className="confirm-button delete-input"
            type="submit"
            value="Delete List"
          />
          <button
            type="button"
            className="confirm-button delete-button"
            onClick={() => setIsDeletingList(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteList;
