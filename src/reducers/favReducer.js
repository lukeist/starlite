// const initState = [];

const favReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_FAV":
      return state.findIndex((s) => {
        // find index of an object => to check if this object is in state
        return s.symbol === action.payload.symbol;
      }) > -1
        ? //   state.indexOf({
          //     symbol: action.payload.symbol,
          //     quote: action.payload.quote,
          //   }) > -1
          [...state] // if object is already in state => return state
        : [
            ...state,
            { symbol: action.payload.symbol, quote: action.payload.quote }, // if not, return state with new object
          ];

    default:
      return state;
  }
};

export default favReducer;
