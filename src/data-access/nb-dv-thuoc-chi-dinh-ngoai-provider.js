import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { NB_DV_THUOC_CHI_DINH_NGOAI } from "client/api";

export default {
  search: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DV_THUOC_CHI_DINH_NGOAI}`, payload)
        )
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  postBatch: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_THUOC_CHI_DINH_NGOAI}/batch`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  onDeleteAll: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${NB_DV_THUOC_CHI_DINH_NGOAI}/batch`, {
          data: payload
        })
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  onDeleteDichVu: (id) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${NB_DV_THUOC_CHI_DINH_NGOAI}/${id}`)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  updateRecordById: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${NB_DV_THUOC_CHI_DINH_NGOAI}/${payload.id}`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  // getDsDichVu: (payload) => {
  //   return new Promise((resolve, reject) => {
  //     client
  //       .get(combineUrlParams(`${dataPath}${NB_DV_KY_THUAT}`, payload))
  //       .then((s) => {
  //         resolve(s.data);
  //       })
  //       .catch((e) => {
  //         reject(e);
  //       });
  //   });
  // },
  // getNBSoPhieuCLS: ({ page = 0, ...payload }) => {
  //   return new Promise((resolve, reject) => {
  //     client
  //       .get(
  //         combineUrlParams(`${dataPath}${NB_SO_PHIEU_CLS}`, {
  //           page,
  //           ...payload,
  //         })
  //       )
  //       .then((s) => {
  //         resolve(s.data);
  //       })
  //       .catch((e) => {
  //         reject(e);
  //       });
  //   });
  // },
  // onDeleteDichVu: (payload) => {
  //   return new Promise((resolve, reject) => {
  //     client
  //       .delete(`${dataPath}${NB_DV_KY_THUAT}/${payload.id}`)
  //       .then((s) => {
  //         resolve(s.data);
  //       })
  //       .catch((e) => {
  //         reject(e);
  //       });
  //   });
  // },
};
