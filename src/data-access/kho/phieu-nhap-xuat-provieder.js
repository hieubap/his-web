import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { KHO_PHIEU_NHAP_XUAT } from "client/api";

export default {
  search: ({ page = 0, sort, size = 10, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${KHO_PHIEU_NHAP_XUAT}`, {
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
  post: (params) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${KHO_PHIEU_NHAP_XUAT}`, params)
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
        .put(`${dataPath}${KHO_PHIEU_NHAP_XUAT}/${id}`, rest)
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
        .delete(`${dataPath}${KHO_PHIEU_NHAP_XUAT}/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  detail: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${KHO_PHIEU_NHAP_XUAT}/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  approved: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${KHO_PHIEU_NHAP_XUAT}/duyet/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  unApproved: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${KHO_PHIEU_NHAP_XUAT}/huy-duyet/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  sendApproved: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${KHO_PHIEU_NHAP_XUAT}/gui-duyet/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  unSendApproved: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${KHO_PHIEU_NHAP_XUAT}/huy-gui-duyet/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  kiemTraSoHoaDon: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${KHO_PHIEU_NHAP_XUAT}/so-hoa-don/${payload?.id}`, { ...payload })
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  updateGhiChuDonThuocById: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${KHO_PHIEU_NHAP_XUAT}/don-thuoc/ghi-chu/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};

