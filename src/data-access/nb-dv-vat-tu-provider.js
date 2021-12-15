import { client, dataPath } from "client/request";
import { NB_DV_VAT_TU } from "client/api";
import { combineUrlParams } from "utils";

export default {
  search: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DV_VAT_TU}`, payload)
        )
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  post: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_VAT_TU}`, payload)
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
        .post(`${dataPath}${NB_DV_VAT_TU}/tinh-tien`, payload)
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
        .delete(`${dataPath}${NB_DV_VAT_TU}/${id}`)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  themThongTin: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .patch(`${dataPath}${NB_DV_VAT_TU}/them-thong-tin`, payload)
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
        .delete(`${dataPath}${NB_DV_VAT_TU}`, {
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
 
};
