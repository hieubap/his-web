import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { KHO_PHIEU_NHAP_XUAT } from "client/api";

export default {
  searchDonThuoc: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${KHO_PHIEU_NHAP_XUAT}/don-thuoc/${id}`))
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e))
    })
  },
  searchAll: ({ page = 0, sort, size = 10,...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${KHO_PHIEU_NHAP_XUAT}/don-thuoc`, {
            page: page + "",
            sort,
            size,
            ...payload,
          }))
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e))
    })
  },
  // post: (params) => {
  //   return new Promise((resolve, reject) => {
  //     client
  //       .post(`${dataPath}${KHO_PHIEU_NHAP_XUAT}/don-thuoc-ngoai-vien`, params)
  //       .then((s) => {
  //         if (s?.data?.code === 0) resolve(s?.data);
  //         else reject(s?.data);
  //       })
  //       .catch((e) => reject(e));
  //   });
  // },
  put: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${KHO_PHIEU_NHAP_XUAT}/don-thuoc/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  postThanhToan: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${KHO_PHIEU_NHAP_XUAT}/duyet/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};

