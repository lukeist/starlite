const initState = {
  general: [],
  crypto: [],
};

const newsReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_NEWS_GENERAL":
      return {
        ...state,
        general: action.payload.general,
      };
    case "FETCH_NEWS_CRYPTO":
      return {
        ...state,
        crypto: action.payload.crypto,
      };
    default:
      return { ...state };
  }
};

export default newsReducer;
