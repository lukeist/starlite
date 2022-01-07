const initState = [];

const tradeMessagesReducer = (state = initState, action) => {
  switch (action.type) {
    case "TRADE_MESSAGE":
      return [
        {
          id: action.payload.id,
          symbol: action.payload.symbol,
          stockPrice: action.payload.stockPrice,
          quantity: action.payload.quantity,
          cost: action.payload.cost,
          buy: action.payload.buy,
          time: action.payload.time,
        },
        ...state,
      ];

    default:
      return state;
  }
};

export default tradeMessagesReducer;
