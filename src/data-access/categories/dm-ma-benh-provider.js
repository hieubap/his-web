import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { DM_MA_BENH } from "client/api";

export default {
  search: ({ page = 0, active, sort, size = 2000, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_MA_BENH}`, {
            page: page + "",
            active,
            sort,
            size,
            ...payload,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  searchAll: (payload = {}) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_MA_BENH}/tong-hop`, {
            active: true,
            ...payload,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  post: (params) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${DM_MA_BENH}`, params)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  put: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${DM_MA_BENH}/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${DM_MA_BENH}/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
