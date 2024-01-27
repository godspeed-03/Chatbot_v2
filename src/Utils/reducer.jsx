const reducer = (state, action) => {
  switch (action.type) {
    case "Get_Photos":
      return {
        ...state,
        photo: action.payload.photo,
      };

    // case "remove_post":
    //   return {
    //     ...state,
    //     photo: state.photo.filter((item) => {
    //       return item.id !== action.payload;
    //     }),
    //   };

    case "Searchpost":
      return {
        ...state,
        query: action.payload,
      };

    case "UserName":
      return {
        ...state,
        UserName: action.payload,
      };
  }
  return state;
};

export default reducer;
