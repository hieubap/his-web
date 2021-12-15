import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { DM_LOAI_BAO_CAO } from "client/api";

export default {
  get: () => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_LOAI_BAO_CAO}`)
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  searchBaoCao: ({ page = 0, sort, size = 500, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_LOAI_BAO_CAO}/tong-hop`, {
            page: page + "",
            sort,
            // size,
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
  search: ({ page = 0, active, sort, size = 1000, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_LOAI_BAO_CAO}`, {
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
  create: (params) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${DM_LOAI_BAO_CAO}`, params)
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
        .patch(`${dataPath}${DM_LOAI_BAO_CAO}/${id}`, rest)
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
        .delete(`${dataPath}${DM_LOAI_BAO_CAO}/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  upload: (file, type) => {
    const formData = new FormData();
    formData.append("file", file);
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${DM_LOAI_BAO_CAO}/tai-len/mau-bao-cao`, formData)
        .then((s) => {
          resolve(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
