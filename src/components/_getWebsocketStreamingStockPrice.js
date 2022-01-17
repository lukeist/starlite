import { api_key_websocket } from "../api";

const streamingStockPrice = (symbol) => {
  const socket = new WebSocket(`wss://ws.finnhub.io${api_key_websocket}`);
  // Connection opened -> Subscribe
  socket.addEventListener("open", function (event) {
    socket.send(JSON.stringify({ type: "subscribe", symbol }));
  });
  // Listen for messages
  const stockPrice = socket.addEventListener("message", function (event) {
    const str = event.data;
    const currentStockPrice = str.substring(
      str.indexOf(`"p"`) + 4,
      str.indexOf(`,"s"`)
    );
    // console.log(
    //   "Message from server ",
    //   str.substring(str.indexOf(`"p"`) + 4, str.indexOf(`,"s"`))
    // );
    return currentStockPrice;
  });
  // Unsubscribe
  var unsubscribe = function (symbol) {
    socket.send(JSON.stringify({ type: "unsubscribe", symbol: symbol }));
  };
  return stockPrice;
};

export default streamingStockPrice;

// const streamingStockPrice = (symbol) => {
//   //   const socket = new WebSocket(`wss://ws.finnhub.io${api_key_websocket}`);
//   //   // Connection opened -> Subscribe
//   //   socket.addEventListener("open", function (event) {
//   //     socket.send(JSON.stringify({ type: "subscribe", symbol }));
//   //   });

//   //   // Listen for messages
//   //   socket.addEventListener("message", function (event) {
//   //     const str = event.data;
//   //     const fourCharacterAfterP = 4;
//   //     const currentPriceFromStr = str.substring(
//   //       str.indexOf(`"p"`) + fourCharacterAfterP,
//   //       str.indexOf(`,"s"`)
//   //     );
//   //     return currentPriceFromStr;

//   //     //   console.log("Message from server ", currentPriceFromStr);
//   //   });

//   //   // Unsubscribe
//   //   var unsubscribe = function (symbol) {
//   //     socket.send(JSON.stringify({ type: "unsubscribe", symbol: symbol }));
//   //   };
//   const socket = new WebSocket(`wss://ws.finnhub.io${api_key_websocket}`);
//   // Connection opened -> Subscribe
//   socket.addEventListener("open", function (event) {
//     socket.send(JSON.stringify({ type: "subscribe", symbol }));
//   });
//   // Listen for messages
//   const stockPrice = socket.addEventListener("message", function (event) {
//     const str = event.data;
//     const currentStockPrice = str.substring(
//       str.indexOf(`"p"`) + 4,
//       str.indexOf(`,"s"`)
//     );
//     console.log(
//       "Message from server ",
//       str.substring(str.indexOf(`"p"`) + 4, str.indexOf(`,"s"`))
//     );
//     return currentStockPrice;
//   });
//   // Unsubscribe
//   var unsubscribe = function (symbol) {
//     socket.send(JSON.stringify({ type: "unsubscribe", symbol: symbol }));
//   };
//   return stockPrice;
// };

// export default streamingStockPrice;
