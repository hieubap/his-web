const reducer = (state = {}, action) => {
  let newState = { ...state };
  switch (action.type) {
    case "TT-HANH-CHINH-UPDATE-DATA":
      newState = { ...state, ...(action.data || {}) };
      return newState;
    case "TT_HANH_CHINH_CLEAR_DATA":
      return {};
    default:
      return state;
  }
};
export default reducer;
