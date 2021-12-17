import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import FavListPanelsList from "./FavListPanelsList";
import { useDispatch } from "react-redux";
import { isAddingList } from "../store/actions/isAddingListAction";
import FormAddList from "./FormAddList";
import Emojis from "./Emojis";

const FavListPanel = () => {
  const dispatch = useDispatch();
  const stockLists = useSelector((state) => state.entities.stockLists);
  const isAddingNewList = useSelector((state) => state.utilities.isAddingList);

  return (
    <div className="fav-list">
      <div className="fav-header">
        <h4>Watching</h4>
        <Emojis />
        <FontAwesomeIcon
          onClick={() => dispatch(isAddingList())}
          className="fav-icon"
          icon={faPlusSquare}
        />
      </div>
      <hr />
      {isAddingNewList ? <FormAddList /> : ""}
      <div className="fav-items">
        {stockLists.map((list) => (
          <FavListPanelsList key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
};

export default FavListPanel;
