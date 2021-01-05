import { combineUrlParams } from "utils";
import { client, medicinePath, masterDataPath } from "client/request";
import { ROOMS_MANAGERS, ROOMS } from "client/api";
export default {
  search: ({
    page = "0",
    active = true,
    khoa,
    userId,
    sort = "name",
    ...payload
  }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${medicinePath}${ROOMS_MANAGERS}`, {
            page: page + "",
            active,
            khoa,
            userId,
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
  searchAdminRoom: ({
    page = "0",
    active = true,
    sort = "name",
    ...payload
  }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${masterDataPath}${ROOMS}`, {
            page: "0",
            sort: "name",
            active: true,
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
