import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { KHO_TON_KHO } from "client/api";

export default {
  searchAll: ({ page = 0, sort, size = 500, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(
          `${dataPath}${KHO_TON_KHO}/tong-hop`,
          {
            page: page + "",
            sort,
            size,
            ...payload,
          }
        ))
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e))
    })
  },
  search: ({ page = 0, sort, size = 10, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${KHO_TON_KHO}`, {
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
        .post(`${dataPath}${KHO_TON_KHO}`, params)
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
        .put(`${dataPath}${KHO_TON_KHO}/${id}`, rest)
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
        .delete(`${dataPath}${KHO_TON_KHO}/${id}`)
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
        .get(`${dataPath}${KHO_TON_KHO}/${id}`)
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
        .post(`${dataPath}${KHO_TON_KHO}/duyet/${id}`)
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
        .post(`${dataPath}${KHO_TON_KHO}/huy-duyet/${id}`)
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
        .post(`${dataPath}${KHO_TON_KHO}/gui-duyet/${id}`)
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
        .post(`${dataPath}${KHO_TON_KHO}/huy-gui-duyet/${id}`)
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
        .post(`${dataPath}${KHO_TON_KHO}/so-hoa-don/${payload?.id}`, { soHoaDon: payload?.soHoaDon })
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  }
};

