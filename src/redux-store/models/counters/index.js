import cacheUtils from "utils/cache-utils";
import countersProvider from "data-access/counters-provider";

export default {
  state: {},
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getAllCounters: async (payload, state) => {
      let listCounters = await cacheUtils.read("DATA_COUNTERS", "", [], false);
      dispatch.counters.updateData({ listCounters });
      countersProvider
        .search()
        .then((s) => {
          let data = s?.data || [];
          if (JSON.stringify(listCounters) !== JSON.stringify(data)) {
            dispatch.counters.updateData({ listCounters: data });
            cacheUtils.save("DATA_COUNTERS", "", data, false);
          }
        });
    }
  })
};
