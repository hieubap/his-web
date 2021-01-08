import qmsProvider from "data-access/qms-provider";

export default {
  state: {},
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: () => ({
    getQms: (payload, state) => {
      return new Promise((resolve, reject) => {
        qmsProvider
          .search(payload)
          .then((s) => {
            let data = s?.data || [];
            resolve(data);
          })
          .catch((e) => reject(e));
      });
    }
  })
};