import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { DM_THUOC_CHI_DINH_NGOAI } from "client/api";

export default {
  search: ({ page = 0, active, sort, size = 1000, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_THUOC_CHI_DINH_NGOAI}`, {
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
  searchTongHop: ({ page = 0, active, sort, size = 1000, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_THUOC_CHI_DINH_NGOAI}/tong-hop`, {
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
  // tongHop: (payload) => {
  //   return new Promise((resolve, reject) => {
  //     client
  //       .get(
  //         combineUrlParams(`${dataPath}${DM_THUOC_CHI_DINH_NGOAI}/tong-hop`)
  //       )
  //       .then((s) => {
  //         if (s?.data?.code === 0) resolve(s?.data);
  //         else reject(s?.data);
  //       })
  //       .catch((e) => reject(e));
  //   });
  // },
  create: (params) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${DM_THUOC_CHI_DINH_NGOAI}`, params)
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
        .patch(`${dataPath}${DM_THUOC_CHI_DINH_NGOAI}/${id}`, rest)
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
        .delete(`${dataPath}${DM_THUOC_CHI_DINH_NGOAI}/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
