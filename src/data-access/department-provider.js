import { combineUrlParams } from "utils";
import { client, masterDataPath } from "client/request";
import { DEPARTMENTS } from "client/api";
export default {
  search: ({ page = "0", active = true, sort = "name", ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${masterDataPath}${DEPARTMENTS}`, {
            page: page + "",
            active,
            sort,
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
