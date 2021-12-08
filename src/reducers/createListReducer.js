// const initState = [];

const createListReducer = (state = [], action) => {
  switch (action.type) {
    case "CREATE_LIST":
      return [
        ...state,
        {
          listName: action.payload.listName,
          id: action.payload.id,
          //   emoji: action.payload.emoji,
        },
      ];
    //   case 'EDIT_LIST':
    //       return
    case "REMOVE_LIST":
      return state.filter((id) => id !== action.payload.id);
    default:
      return state;
  }
};

export default createListReducer;
