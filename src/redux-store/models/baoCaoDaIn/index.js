import baoCaoDaInProvider from "data-access/bao-cao-da-in-provider";
import cacheUtils from "utils/cache-utils";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import orderBy from "lodash/orderBy";

export default {
  state: {
    listAllData: [],
    listData: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getBcDsNbKhamChiTiet: (payload, state) => {
      return new Promise((resolve, reject) => {
        baoCaoDaInProvider
          .getBcDsNbKhamChiTiet(payload)
          .then((s) => {
            if (s?.code == 0 && s?.data) {
              resolve(s?.data);
            }
            reject(s);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    getBc01: (payload, state) => {
      return new Promise((resolve, reject) => {
        baoCaoDaInProvider
          .getBc01(payload)
          .then((s) => {
            if (s?.code == 0 && s?.data) {
              resolve(s?.data);
            }
            reject(s);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
  }),
};
