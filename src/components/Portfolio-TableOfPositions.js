import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindowClose,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { removeTickerFromListAction } from "../store/actions/listAction";

export const TableofPositionsHeader = () => {
  return (
    <div className="list-page-table-header">
      <div className="table-header">
        <ul className="table-column">
          <li className="table-left">Equities</li>
          <li className="table-right">Price (Change)</li>
          <li className="table-right">Quantity</li>
          <li className="table-mid">Market Value (Day Change)</li>
          <li className="table-right">Cost & Gain/Loss Per Share</li>
          <li className="table-right">Total Gain/Loss</li>
        </ul>
        {/* <div className="table-x">Total Gain/Loss</div> */}
      </div>
      <hr />
    </div>
  );
};
//////////////////////////////////////////////////////////////////////////////////////////////
export const TableOfPositions = ({
  stock,
  currentList,
  setPopupAfterDeleteStock,
  setStockInPopupAfterDeleteStock,
}) => {
  const dispacht = useDispatch();

  const removeStockFromList = () => {
    // another solution (PopUpAddedList.js) but gotto find index of current ticker: currentList.tickers.splice(indexOfCurrentTicker, 1);
    currentList.tickers = currentList.tickers.filter(
      (stockInCurrentList) => stockInCurrentList.symbol !== stock.symbol
    );
    dispacht(removeTickerFromListAction(stock.symbol, currentList.id));
    setPopupAfterDeleteStock(true);
    setStockInPopupAfterDeleteStock(stock.symbol);
    setTimeout(() => {
      setPopupAfterDeleteStock(false);
    }, 2500);
  };
  return (
    <div ref="stock" className="list-page-table-item">
      <div className="table-item">
        <ul className="table-column">
          <li className="table-left">{stock.companyName}</li>
          <li className="table-right">{stock.symbol}</li>
          <li className="table-right">${stock.stockCurrentPrice}</li>
          <li className="table-mid">
            {stock.stockPercentChange > 0
              ? `+` + stock.stockPercentChange
              : stock.stockPercentChange}
            %
          </li>
          <li className="table-right">{stock.marketCap}</li>
        </ul>
        <div className="table-x"></div>
      </div>
      <hr />
    </div>
  );
};
