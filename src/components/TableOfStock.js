import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindowClose,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";

export const TableofStockHeader = () => {
  return (
    <div className="table-header">
      <ul className="table-column">
        <li className="table-left">Name</li>
        <li className="table-right">Symbol</li>
        <li className="table-right">Price</li>
        <li className="table-mid">Today</li>
        <li className="table-right">Market Cap</li>
        <li className="table-x"></li>
      </ul>
    </div>
  );
};

export const TableOfStock = ({ list }) => {
  return (
    <Link className="table-item" to={`/stocks/${list.symbol}`}>
      <hr />
      <ul className="table-column">
        <li className="table-left">{list.companyName}</li>
        <li className="table-right">{list.symbol}</li>
        <li className="table-right">{list.stockCurrentPrice}</li>
        <li className="table-mid">
          {list.stockPercentChange > 0 ? (
            <FontAwesomeIcon className="sort-icon stonk-up" icon={faSortUp} />
          ) : (
            <FontAwesomeIcon
              className="sort-icon stonk-down"
              icon={faSortDown}
            />
          )}{" "}
          {list.stockPercentChange > 0
            ? `+` + list.stockPercentChange
            : list.stockPercentChange}
          %
        </li>
        <li className="table-right">{list.marketCap}</li>
        <li className="table-x">
          <FontAwesomeIcon
            // onClick={pressfaWindowClose}
            className="exit-icon"
            icon={faWindowClose}
            alt="Remove Stonk From List"
          />
        </li>
      </ul>
    </Link>
  );
};
