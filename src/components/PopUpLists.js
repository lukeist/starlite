import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { hidePopUpAction } from "../store/actions/popUpListsAction";
import { isAddingList } from "../store/actions/isAddingListAction";
import PopUpAddedList from "./PopUpAddedList";
import FormAddList from "./FormAddList";

const PopUpAddRemoveEditLists = ({ quote, company }) => {
  const isAddingNewList = useSelector((state) => state.utilities.isAddingList);
  const dispatch = useDispatch();
  const stockLists = useSelector((state) => state.entities.stockLists);

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
              onClick={() => dispatch(isAddingList())}
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
          <div className="createlist-form-popup">
            <FormAddList />
          </div>
        )}
        <div className="lists-container">
          <ul>
            {stockLists.map((list) => (
              <PopUpAddedList
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
