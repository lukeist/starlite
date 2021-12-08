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

export const editListAction = (id, listName) => (dispatch) => {
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
