const initState = [];

const tradeMessagesReducer = (state = initState, action) => {
  switch (action.type) {
    case "TRADE_MESSAGE":
      return [
        ...state,
        {
          id: action.payload.id,
          symbol: action.payload.symbol,
          quantity: action.payload.quantity,
          price: action.payload.price,
          buy: action.payload.buy,
        },
      ];

    default:
      return state;
  }
};

export default tradeMessagesReducer;
