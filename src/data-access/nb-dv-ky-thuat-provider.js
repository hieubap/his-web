import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { DM_DV_KY_THUAT, NB_DV_KY_THUAT, NB_SO_PHIEU_CLS } from "client/api";

export default {
  searchDMDichVuNgoaiTru: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_DV_KY_THUAT}/ngoai-tru`, payload)
        )
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  tamTinhTien: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_KY_THUAT}/tinh-tien`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getDsDichVu: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_DV_KY_THUAT}`, payload))
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getNBSoPhieuCLS: ({ page = 0, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_SO_PHIEU_CLS}`, {
            page,
            ...payload,
          })
        )
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  onDeleteDichVu: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${NB_DV_KY_THUAT}/${payload.id}`)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
