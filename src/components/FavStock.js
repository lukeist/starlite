import { useSelector } from "react-redux";

const FavStock = () => {
  const stocks = useSelector((state) => state.stocks);
  return (
    <div className="fav-stock">
      {/* <p>{stocks.company.ticker}</p>
      <div>
        <dt>{stocks.quote.c}</dt>
        <dd>{stocks.qutoe.dp}</dd>
      </div> */}
      <p>GME</p>
      <p>Fancy Graphs</p>
      <div className="fav-quote">
        <dt>$200.50</dt>
        <dd>-5.33%</dd>
      </div>
    </div>
  );
};

export default FavStock;
