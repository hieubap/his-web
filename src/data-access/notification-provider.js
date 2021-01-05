import { combineUrlParams } from "utils";
import { client, medicinePath } from "client/request";
import {
  NOTIFICATION_SEARCH,
  NOTIFICATION_SET_READ,
  NOTIFICATION_GET_TOTAL,
} from "client/api";
export default {
  search: ({ page = 0, size = 20, sort = "thoiGian,desc", ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${medicinePath}${NOTIFICATION_SEARCH}`, {
            page: page + "",
            size,
            sort,
            ...payload,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getTotalUnread: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${medicinePath}${NOTIFICATION_GET_TOTAL}`, payload)
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  setRead: (id) => {
    return new Promise((resolve, reject) => {
      (id
        ? client.put(`${medicinePath}${NOTIFICATION_SET_READ}/${id}`)
        : client.put(`${medicinePath}${NOTIFICATION_SET_READ}`)
      )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s.data);
          else {
            reject(s?.data);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
