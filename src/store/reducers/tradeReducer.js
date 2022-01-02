const initState = [
  // {
  //   symbol: "",
  //   quantity: 0,
  // },
];

const tradeReducer = (state = initState, action) => {
  switch (action.type) {
    case "BUY_STOCK_FROM_ZERO_POSITION":
      const firstQuantityAfterBuyParseFloat =
        Math.round(
          (parseFloat(action.payload.quantity) + Number.EPSILON) * 10000
        ) / 10000;
      return [
        ...state,
        {
          symbol: action.payload.symbol,
          quantity: firstQuantityAfterBuyParseFloat,
        },
      ];
    case "BUY_STOCK_FROM_SOME_POSITIONS":
      const indexBuy = state.findIndex(
        (stock) => stock.symbol === action.payload.symbol
      );
      const totalQuantityAfterBuyParseFloat =
        Math.round(
          (parseFloat(state[indexBuy].quantity) +
            parseFloat(action.payload.quantity) +
            Number.EPSILON) *
            10000
        ) / 10000;
      state[indexBuy].quantity = totalQuantityAfterBuyParseFloat;
      return state;
    case "SELL_POSITION":
      const indexSell = state.findIndex(
        (stock) => stock.symbol === action.payload.symbol
      );
      const quantityAfterSellParseFloat =
        Math.round(
          (parseFloat(state[indexSell].quantity) -
            parseFloat(action.payload.quantity) +
            Number.EPSILON) *
            10000
        ) / 10000;
      quantityAfterSellParseFloat === 0
        ? // REMOVE ITEM IF NO POSITION LEFT
          (state = state.filter(
            (item) => item.quantity !== state[indexSell].quantity
          ))
        : (state[indexSell].quantity = quantityAfterSellParseFloat);
      return state;

    default:
      return state;
  }
};

export default tradeReducer;
