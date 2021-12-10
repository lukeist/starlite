export const createListAction = (listName, id) => (dispatch) => {
  dispatch({
    type: "CREATE_LIST",
    payload: {
      listName,
      id,
      //   emoji,
    },
  });
};

export const editListAction = (listName, id) => (dispatch) => {
  dispatch({
    type: "EDIT_LIST",
    payload: {
      listName,
      id,
      // emoji,}
    },
  });
};

export const removeListAction = (id) => (dispatch) => {
  dispatch({
    type: "REMOVE_LIST",
    payload: {
      id,
    },
  });
};

export const addTickerToListAction = (symbol, id) => (dispatch) => {
  dispatch({
    type: "ADD_TICKER_TO_LIST",
    payload: {
      symbol,
      id,
    },
  });
};

export const removeTickerFromListAction = (symbol, id) => (dispatch) => {
  dispatch({
    type: "REMOVE_TICKER_FROM_LIST",
    payload: {
      symbol,
      id,
    },
  });
};
