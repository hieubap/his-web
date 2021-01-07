export default {
  state: { }, 
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    setCurrentFuction: (payload, state) => {
      dispatch.application.updateData({
        currentFunction: payload,
      });
    },
  }),
};
