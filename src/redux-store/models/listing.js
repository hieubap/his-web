import { client, formPath } from "client/request";
import { forms } from "client/api";

export default {
  state: {
    list: [],
  }, // initial state
  reducers: {
    // handle state changes with pure functions
    init(state, payload) {
      return { ...state, list: payload };
    },
    addNew(state, payload) {
      return { ...state, list: [...state.list, payload] };
    },
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    async fetchDocument(payload, rootState) {
      dispatch.listing.updateData({
        isLoadingFile: true,
      });
      const data = await client
        .get(`${formPath}${forms}?page=0`)
        .then((res) => res.data);
      dispatch.listing.updateData({
        isLoadingFile: false,
      });
      dispatch.listing.init(
        data.data.map((item) => ({
          id: item.id,
          active: item.active,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          createdBy: item.createdBy,
          updatedBy: item.updatedBy,
          value: item.value,
          name: item.name,
          api: item.api,
        }))
      );
    },
  }),
};
