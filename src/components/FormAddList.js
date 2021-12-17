import { useDispatch } from "react-redux";
import { isNotAddingList } from "../store/actions/isAddingListAction";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { createListAction } from "../store/actions/listAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";

const FormAddList = () => {
  const [listName, setListName] = useState("");
  const dispatch = useDispatch();
  const addNewListHandler = (e) => {
    e.preventDefault();
    dispatch(isNotAddingList());
    const listId = uuidv4();
    dispatch(createListAction(listName, listId));
  };
  const getInput = (e) => {
    console.log(e.target.value);
    setListName(e.target.value);
  };

  return (
    <form
      onSubmit={addNewListHandler}
      className="createlist-form"
      action=""
      id="form-addlist"
    >
      <div className="input-items">
        <button type="button" className="input-emoji">
          <FontAwesomeIcon className="emoji-icon" icon={faRocket} />
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
        />
      </div>
      <div className="form-buttons">
        <input className="form-button" type="submit" value="Create List" />
        <button
          className="form-button"
          type="button"
          onClick={() => dispatch(isNotAddingList())}
        >
          {/* the <button> tag defaults to type="submit". If you change it to type="button" => Forms mishandle submit for Enter key: https://github.com/facebook/react/issues/2093 */}
          Cancel
        </button>
      </div>
    </form>
  );
};
export default FormAddList;
