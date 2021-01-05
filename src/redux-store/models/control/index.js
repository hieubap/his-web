// handle copy form and component

export default {
  state: {
    keyPress: null,
    form: {
      lines: [],
      components: [],
    },
    resizer: false,
    component: {},
  }, // initial state
  reducers: {
    fillComponentResource(state, payload) {
      return { ...state, component: payload };
    },
    fillForm(state, payload) {
      return { ...state, form: payload };
    },
    showResizer(state, payload) {
      return { ...state, resizer: payload };
    },
    setKeyPress(state, payload) {
      return { ...state, keyPress: payload }
    }
  },
  effects: dispatch => ({})
}