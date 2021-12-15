import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { NB_DICH_VU } from "client/api";

export default {
  search: ({ page = 0, active, sort, size = 10, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DICH_VU}`, {
            page: page + "",
            active,
            sort,
            size,
            ...payload,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
