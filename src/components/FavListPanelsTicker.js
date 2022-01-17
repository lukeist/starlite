import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { api_key_websocket, quoteDataWebSocket } from "../api";
import { stocksAction } from "../store/actions/stocksAction";
import decimalConverter from "./_getDecimal";
import streamingStockPrice from "./_getWebsocketStreamingStockPrice";

const FavListPanelsTicker = ({ stock }) => {
  ///////////////////////////////////////////////////  streaming price using websocket

  const [stockPrice, setStockPrice] = useState("");

  // useEffect(() => {
  //   // setStockPrice(streamingStockPrice("BINANCE:BTCUSDT"));
  //   const websocket = new WebSocket(`wss://ws.finnhub.io${api_key_websocket}`);

  //   websocket.onopen = () => {
  //     console.log("connected");
  //   };
  // }, [stockPrice]);

  // useEffect(() => {
  //   // Connection opened -> Subscribe
  //   socket.addEventListener("open", function (event) {
  //     socket.send(JSON.stringify({ type: "subscribe", symbol: stock.symbol }));

  //     // Listen for messages
  //     socket.addEventListener("message", function (event) {
  //       const str = event.data;
  //       const fourCharacterAfterP = 4;
  //       const currentPriceFromStr = str.substring(
  //         str.indexOf(`"p"`) + fourCharacterAfterP,
  //         str.indexOf(`,"s"`)
  //       );
  //       setStockPrice(currentPriceFromStr);
  //       console.log("Message from server ", currentPriceFromStr);
  //     });
  //   });
  //   // Unsubscribe
  //   var unsubscribe = function (symbol) {
  //     socket.send(JSON.stringify({ type: "unsubscribe", symbol: symbol }));
  //   };
  // }, []);

  ///////////////////////////////////////////////////
  const dispatch = useDispatch();
  const stockCurrentPrice = stock.stockCurrentPrice;
  const stockPercentChange = decimalConverter(stock.stockPercentChange, 100);

  return (
    <Link to={`/stocks/${stock.symbol}`}>
      <div className="fav-item">
        <div
          onClick={() => dispatch(stocksAction(stock.symbol))}
          className="fav-stock"
        >
          <li className="fav-symbol">{stock.symbol}</li>
          <li
            className={
              stockPercentChange > 0
                ? "fav-graph stonk-up"
                : "fav-graph stonk-down"
            }
          >
            Fancy Graphs
          </li>
          <li className="fav-quote">
            <dt>${stockPrice}</dt>
            {stockPercentChange < 0 ? (
              <dd className="stonk-down">{stockPercentChange}%</dd>
            ) : (
              <dd className="stonk-up">+{stockPercentChange}%</dd>
            )}
          </li>
        </div>
      </div>
    </Link>
  );
};

export default FavListPanelsTicker;
