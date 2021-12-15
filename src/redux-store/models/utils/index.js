import cacheUtils from "utils/cache-utils";
import utilsProvider from "data-access/utils-provider";

export default {
  state: {},
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getUtils: async (payload, state) => {
      let userId = state.auth.auth?.id;
      let dataCache = await cacheUtils.read(
        userId,
        `DATA_UTILS_${payload.name}`,
        [],
        false
      );
      dispatch.utils.updateData({ [`list${payload.name}`]: dataCache });
      utilsProvider.search({ name: "", ...payload }).then((s) => {
        let data = (s?.data || []).map((item) => ({
          id: item.value,
          ten: item.name,
        }));
        if (JSON.stringify(data) !== JSON.stringify(dataCache)) {
          dispatch.utils.updateData({ [`list${payload.name}`]: data });
          cacheUtils.save(userId, `DATA_UTILS_${payload.name}`, data, false);
        }
      });
    },
  }),
};
