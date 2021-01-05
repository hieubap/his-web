import { combineUrlParams } from "utils";
import { client, formPath, masterDataPath } from "client/request";
import { RECORD_TYPE, MEDICAL_RECORD_TYPE } from "client/api";
export default {
  search: ({ page = "0", size = 10, sort = "name", ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${masterDataPath}${MEDICAL_RECORD_TYPE}`, {
            page: page + "",
            size,
            sort,
            ...payload,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0) {
            resolve(s.data);
          } else {
            reject(s?.data);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getRecordTypeByPatientDocument: ({ maHoSo }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${formPath}${RECORD_TYPE}`, {
            patientDocument: maHoSo,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0) {
            resolve(s.data);
          } else {
            reject(s?.data);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  onCreate: ({ ten, ma, loaiBa, mauBaId, active, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${formPath}${RECORD_TYPE}`, {
          ten,
          ma,
          loaiBa,
          mauBaId,
          active,
          ...payload,
        })
        .then((s) => {
          if (s?.data?.code === 0) {
            resolve(s.data);
          } else {
            reject(s?.data);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
