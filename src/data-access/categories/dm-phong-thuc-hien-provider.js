import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { DM_DV_PHONG } from "client/api";

export default {
  search: ({ page = 0, active = true, sort, size = 1000, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_DV_PHONG}`, {
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
  searchNotPagination: ({ active = true, sort, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_DV_PHONG}`, {
            active,
            sort,
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
  create: (params) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${DM_DV_PHONG}`, params)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  update: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${DM_DV_PHONG}/${id}`, rest)
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
        .delete(`${dataPath}${DM_DV_PHONG}/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getDanhSachPhong: ({ payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_DV_PHONG}`, {
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
};
