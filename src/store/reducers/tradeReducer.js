import decimalConverter from "../../components/_getDecimal";
const initStateQuickStart = [
  {
    symbol: "GME",
    companyName: "GameStop Corp",
    quantity: 1368,
  },
  {
    symbol: "TSLA",
    companyName: "Tesla Inc",
    quantity: 211,
  },
  {
    symbol: "AAPL",
    companyName: "Apple Inc",
    quantity: 231,
  },
  {
    symbol: "MSFT",
    companyName: "Microsoft Corp",
    quantity: 320,
  },
  {
    symbol: "AMZN",
    companyName: "Amazon.com Inc",
    quantity: 409,
  },
  {
    symbol: "GOOGL",
    companyName: "Alphabet Inc",
    quantity: 428,
  },
  {
    symbol: "RBLX",
    companyName: "Roblox Corp",
    quantity: 312,
  },
  {
    symbol: "FB",
    companyName: "Meta Platforms Inc",
    quantity: 246,
  },
  {
    symbol: "OXY",
    companyName: "Occidental Petroleum Corp",
    quantity: 950,
  },
  {
    symbol: "ABNB",
    companyName: "Airbnb Inc",
    quantity: 950,
  },
  {
    symbol: "SQ",
    companyName: "Block Inc",
    quantity: 350,
  },
  {
    symbol: "COIN",
    companyName: "Coinbase Global Inc",
    quantity: 279,
  },
  {
    symbol: "BABA",
    companyName: "Alibaba Group Holding Ltd",
    quantity: 220,
  },
  {
    symbol: "CCL",
    companyName: "Carnival Corp",
    quantity: 1203,
  },
];
const initState = [
  // {
  //   symbol: "",
  //   quantity: 0,
  // },
];

const tradeReducer = (state = initState, action) => {
  const index = state.findIndex(
    (stock) => stock.symbol === action.payload.symbol
  );
  switch (action.type) {
    case "BUY_STOCK_FROM_ZERO_POSITION":
      const firstQuantityAfterBuyParseFloat = decimalConverter(
        action.payload.quantity,
        10000
      );

      return [
        ...state,
        {
          symbol: action.payload.symbol,
          companyName: action.payload.companyName,
          quantity: firstQuantityAfterBuyParseFloat,
        },
      ];
    case "BUY_STOCK_FROM_SOME_POSITIONS":
      // const indexBuy = state.findIndex(
      //   (stock) => stock.symbol === action.payload.symbol
      // );
      const totalQuantityAfterBuyParseFloat = decimalConverter(
        parseFloat(state[index].quantity) + action.payload.quantity,
        10000
      );
      // Math.round(
      //   (parseFloat(state[index].quantity) +
      //     action.payload.quantity +
      //     Number.EPSILON) *
      //     10000
      // ) / 10000;
      state[index].quantity = totalQuantityAfterBuyParseFloat;
      return state;
    case "SELL_POSITION":
      // const indexSell = state.findIndex(
      //   (stock) => stock.symbol === action.payload.symbol
      // );
      const quantityAfterSellParseFloat = decimalConverter(
        parseFloat(state[index].quantity) + action.payload.quantity,
        10000
      );
      // Math.round(
      //   (parseFloat(state[index].quantity) +
      //     action.payload.quantity +
      //     Number.EPSILON) *
      //     10000
      // ) / 10000;
      // quantityAfterSellParseFloat === 0
      //   ? // REMOVE ITEM IF NO POSITION LEFT
      //     (state = state.filter(
      //       (item) => item.quantity !== state[indexSell].quantity
      //     ))
      //   :
      state[index].quantity = quantityAfterSellParseFloat;
      return state;

    case "SELL_POSITION_ALL":
      // const indexSellAll = state.findIndex(
      //   (stock) => stock.symbol === action.payload.symbol
      // );
      state = state.filter((item) => item.quantity !== state[index].quantity);
      return state;

    case "GET_SAMPLE":
      return initStateQuickStart;
    default:
      return state;
  }
};

export default tradeReducer;
