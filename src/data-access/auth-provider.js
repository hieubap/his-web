import { combineUrlParams } from "utils";
import {
  client,
  medicinePath,
  patientPath,
  masterDataPath,
} from "client/request";
import { SSO_LOGIN, USER_INFO, USERS } from "client/api";
export default {
  login: ({ code, deviceToken, redirectURI }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${medicinePath}${SSO_LOGIN}`, {
          code,
          deviceToken,
          redirectURI,
        })
        .then((s) => {
          if (s?.data?.code === 0 && s?.data?.data) {
            resolve(s?.data);
          } else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getDetail: () => {
    return new Promise((resolve, reject) => {
      client
        .get(`${patientPath}${USER_INFO}`)
        .then((s) => {
          if (s?.data?.code === 0 && s?.data?.data) {
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
  getInfo: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${masterDataPath}${USERS}/${id}`)
        .then((s) => {
          if (s?.data?.code === 0 && s?.data?.data) {
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
  search: ({ page, size, active, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${masterDataPath}${USERS}`, {
            page,
            size,
            active,
            ...payload,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0 && s?.data?.data) {
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
