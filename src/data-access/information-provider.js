import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { NB_THONG_TIN } from "client/api";

export default {
    searchTrungThongTin: (payload) => {
        return new Promise((resolve, reject) => {
            client.get(
                combineUrlParams(`${dataPath}${NB_THONG_TIN}/trung-thong-tin`, payload)
            ).then((s) => {
                if (s?.data?.code === 0) resolve(s?.data)
                else reject(s?.data);
            }).catch((e) => reject(e));
        });
    },
    search: ({ page = 0, sort, size = 10, ...payload }) => {
        return new Promise((resolve, reject) => {
            client
                .get(
                    combineUrlParams(`${dataPath}${NB_THONG_TIN}`, {
                        page: page + "",
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
