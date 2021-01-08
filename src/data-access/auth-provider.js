import { client, dataPath, patientPath } from "client/request";
import { SSO_LOGIN, USER_INFO } from "client/api";

export default {
  login: ({ code, deviceToken, redirectURI }) => {
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
};
