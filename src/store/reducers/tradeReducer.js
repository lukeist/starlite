const initState = [
  // {
  //   symbol: "",
  //   quantity: 0,
  // },
];

const tradeReducer = (state = initState, action) => {
  switch (action.type) {
    case "BUY_STOCK_FROM_ZERO_POSITION":
      const firstQuantityParseFloat =
        Math.round(
          (parseFloat(action.payload.quantity) + Number.EPSILON) * 10000
        ) / 10000;
      return [
        ...state,
        {
          symbol: action.payload.symbol,
          quantity: firstQuantityParseFloat,
        },
      ];
    case "BUY_STOCK_FROM_SOME_POSITIONS":
      const index = state.findIndex(
        (stock) => stock.symbol === action.payload.symbol
      );
      const totalQuantityParseFloat =
        Math.round(
          (parseFloat(state[index].quantity) +
            parseFloat(action.payload.quantity) +
            Number.EPSILON) *
            10000
        ) / 10000;
      state[index].quantity = totalQuantityParseFloat;
      return state;
    case "SELL_STOCK":
      return state;

    default:
      return state;
  }
};

export default tradeReducer;
