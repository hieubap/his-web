import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { KHO_QUYET_DINH_THAU } from "client/api";

export default {
  searchAll: () => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${KHO_QUYET_DINH_THAU}`, {
            active: true,
            page: 0,
            sort: "quyetDinhThau,asc"
          })
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  search: ({ page = 0, sort, size = 10, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${KHO_QUYET_DINH_THAU}`, {
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

  searchId: ({ id, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${KHO_QUYET_DINH_THAU}/${id}`)
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
        .post(`${dataPath}${KHO_QUYET_DINH_THAU}`, params)
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
        .put(`${dataPath}${KHO_QUYET_DINH_THAU}/${id}`, rest)
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
        .delete(`${dataPath}${KHO_QUYET_DINH_THAU}/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  complete: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${KHO_QUYET_DINH_THAU}/hoan-thanh/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  undoComplete: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${KHO_QUYET_DINH_THAU}/huy-hoan-thanh/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  verify: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${KHO_QUYET_DINH_THAU}/duyet/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  undoVerify: (id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${KHO_QUYET_DINH_THAU}/huy-duyet/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

};
