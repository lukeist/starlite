import { useSelector } from "react-redux";
import FavStock from "./FavStock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCaretSquareRight } from "@fortawesome/free-regular-svg-icons";
import { faCaretSquareRight } from "@fortawesome/free-solid-svg-icons";
const Trade = ({ company }) => {
  return (
    <div className="trade-list">
      <div className="trade-header">
        <h4>Buy {company.ticker}</h4>
        <FontAwesomeIcon className="more-icon" icon={faCaretSquareRight} />
      </div>
      <hr />
      <div className="trade-items">
        <form action="">
          <div className="trade-info">
            <label className="trade-label" for="quantity">
              Quantity
            </label>
            <input
              className="trade-input"
              type="text"
              id="quantity"
              name="quantity"
            />
            <label className="trade-label" for="amount">
              Amount
            </label>
            <input
              className="trade-input"
              type="text"
              id="amount"
              name="amount"
              placeholder="$0.00"
            />
          </div>
          <hr />
          <div></div>
          <div className="trade-submit">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Trade;
