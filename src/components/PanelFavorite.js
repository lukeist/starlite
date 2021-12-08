import FavStock from "./FavStock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCaretSquareRight } from "@fortawesome/free-regular-svg-icons";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
const PanelFavorite = () => {
  const fav = useSelector((state) => state.fav);
  return (
    <div className="fav-list">
      <div className="fav-header">
        <h4>Watching</h4>
        <FontAwesomeIcon className="fav-icon" icon={faPlusSquare} />
      </div>
      <hr />
      <div className="fav-items">
        {fav.map((stock) => (
          <FavStock stock={stock} id={stock.symbol} />
        ))}
      </div>
    </div>
  );
};

export default PanelFavorite;
