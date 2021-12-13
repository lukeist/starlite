// const initState = [];

const createListReducer = (state = [], action) => {
  const tickersArray = [];
  switch (action.type) {
    case "CREATE_LIST":
      return [
        ...state,
        {
          listName: action.payload.listName,
          id: action.payload.id,
          //   emoji: action.payload.emoji,
          tickers: tickersArray,
        },
      ];
    //   case 'EDIT_LIST':
    //       return
    case "REMOVE_LIST":
      return state.filter((list) => list.id !== action.payload.id);

    case "ADD_TICKER_TO_LIST":
      // remove the list out of lists
      // const stateWithoutCurrentList = state.filter(
      //   (list) => list.id !== action.payload.id
      // );
      // // take the list and modify its tickers
      // const currentList = state.filter((list) => list.id === action.payload.id);
      // currentList.tickers = ["111", "222"];
      // return new lists with the modified list inside
      return state;
    // [...state, stateWithoutCurrentList.push(currentList)];
    case "REMOVE_TICKER_FROM_LIST":
      return state;
    // [
    //   ...state,
    //   {
    //     tickers: tickersArray.filter(
    //       (ticker) => ticker !== action.payload.symbol
    //     ),
    //   },
    // ];
    default:
      return state;
  }
};

export default createListReducer;
