import { combineUrlParams } from "utils";
import { client, formPath } from "client/request";
import { COMMON_CONFIG } from "client/api";
export default {
  search: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${formPath}${COMMON_CONFIG}`, {
            ...payload,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0) {
            resolve(s?.data);
          } else {
            reject(s?.data);
          }
        })
        .catch((e) => reject(e));
    });
  },
};
