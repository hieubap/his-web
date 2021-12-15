import { client, dataPath } from "client/request";
import { NB_DV_HOAN } from "client/api";
import { combineUrlParams } from "utils";

export default {
  traDichVu: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_HOAN}/tra-dich-vu`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  doiDichVu: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_HOAN}/doi-dich-vu`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
