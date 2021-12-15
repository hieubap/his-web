import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { DM_NHAN_VIEN } from "client/api";

export default {
  searchAll: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_NHAN_VIEN}/tong-hop`, {
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
  search: ({ page = 0, sort, size = 500, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_NHAN_VIEN}`, {
            page: page + "",
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
  searchId: (id) => {
    return new Promise((resolve, reject) => {
      client.get(`${dataPath}${DM_NHAN_VIEN}/${id}`).then((s) => {
        if (s?.data?.code === 0) resolve(s?.data);
        else reject(s?.data);
      });
    });
  },
  post: (params) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${DM_NHAN_VIEN}`, params)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  put: ({ id, ...rest }) => {
    console.log(rest);
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${DM_NHAN_VIEN}/${id}`, rest)
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
        .delete(`${dataPath}${DM_NHAN_VIEN}/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
