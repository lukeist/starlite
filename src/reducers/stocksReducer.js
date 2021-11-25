const initState = {
  quote: {},
  companyNews: [],
  basicFinancials: {},
  search: [],
};

const stocksReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_STOCKS":
      return {
        ...state,
        quote: action.payload.quote,
        companyNews: action.payload.companyNews,
        basicFinancials: action.payload.basicFinancials,
      };
    default:
      return { ...state };
  }
};

export default stocksReducer;
