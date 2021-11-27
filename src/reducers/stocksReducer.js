const initState = {
  quote: {},
  company: {},
  companyNews: [],
  basicFinancials: {},
  stockActive: false,
};

const stocksReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_STOCKS":
      return {
        ...state,
        company: action.payload.company,
        quote: action.payload.quote,
        basicFinancials: action.payload.basicFinancials,
        companyNews: action.payload.companyNews,
        stockActive: action.payload.stockActive,
      };
    default:
      return { ...state };
  }
};

export default stocksReducer;
