import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { stocksAction } from "../actions/stocksAction";

const FavStock = ({ stock }) => {
  // const favSymbol = useSelector((state) => state.fav);
  const stockActive = useSelector((state) => state.stocks.stockActive);
  const dispatch = useDispatch();
  return (
    <Link to={`/stocks/${stock.symbol}`}>
      {stockActive && (
        <div
          onClick={() => dispatch(stocksAction(stock.symbol))}
          className={stock.quote.dp > 0 ? "fav-stock green" : "fav-stock red"}
        >
          {/* <p>{stocks.company.ticker}</p>
      <div>
        <dt>{stocks.quote.c}</dt>
        <dd>{stocks.qutoe.dp}</dd>
      </div> */}
          <p>{stock.symbol}</p>
          <p>Fancy Graphs</p>
          <div className="fav-quote">
            <dt>${stock.quote.c}</dt>
            <dd>{stock.quote.dp}%</dd>
          </div>
        </div>
      )}
    </Link>
  );
};

export default FavStock;
