import { client, dataPath, patientPath } from "client/request";
import {
  SSO_LOGIN,
  USER_INFO,
  AUTH_LOGIN,
  AUTH_REFRESH,
  DM_TAI_KHOAN,
} from "client/api";

export default {
  login: ({ taiKhoan, matKhau }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${AUTH_LOGIN}`, {
          taiKhoan,
          matKhau,
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
  loginSSO: ({ code, deviceToken, redirectURI }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${SSO_LOGIN}`, {
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
  refreshToken: ({ refreshToken }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${AUTH_REFRESH}`, {
          refreshToken,
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
  changePassword: ({ matKhauCu, matKhauMoi, taiKhoan }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${DM_TAI_KHOAN}/doi-mat-khau`, {
          matKhauCu,
          matKhauMoi,
          taiKhoan,
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
};
