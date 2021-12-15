import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { DM_THIET_LAP } from "client/api";
import { TACH_GOP_PHIEU_XN } from "client/api";
import { TACH_GOP_PHIEU_DVKT } from "client/api";

export default {
  search: ({ page = 0, active, sort, size = 1000, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_THIET_LAP}`, {
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
  searchAll: ({ page = 0, active, sort, size = 1000, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_THIET_LAP}/tong-hop`, {
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
  getGiaTri: ({ ma, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_THIET_LAP}/gia-tri`, {
            ma,
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
        .post(`${dataPath}${DM_THIET_LAP}`, params)
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
        .patch(`${dataPath}${DM_THIET_LAP}/${id}`, rest)
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
        .delete(`${dataPath}${DM_THIET_LAP}/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  get: ({ page = 0, active, sort, size = 1000, path, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_THIET_LAP}${path}`, {
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

  tachGopPhieuXN: (params) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${TACH_GOP_PHIEU_XN}`, params)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },

  getTachGopPhieuXN: () => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${TACH_GOP_PHIEU_XN}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getTachGopPhieuDVKT: () => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${TACH_GOP_PHIEU_DVKT}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  tachGopPhieuDVKT: (params) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${TACH_GOP_PHIEU_DVKT}`, params)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getBenhVien: () => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${DM_THIET_LAP}/benh-vien`))
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  tichDiem: async (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${DM_THIET_LAP}/tich-diem`, {
          ...payload,
        })
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getTichDiem: async (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${DM_THIET_LAP}/tich-diem`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getPhieuIn: async (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${DM_THIET_LAP}/phieu-in`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  postPhieuIn: async (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${DM_THIET_LAP}/phieu-in`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
