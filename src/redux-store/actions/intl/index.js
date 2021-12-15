function updateData(data) {
  return dispatch => {
    dispatch({
      type: "INTL-DATA",
      data: data
    });
  };
}
export default {
  updateData
};
