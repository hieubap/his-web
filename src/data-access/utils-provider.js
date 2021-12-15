import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { UTILS } from "client/api";

export default {
    search: ({ name = "", ...payload }) => {
        return new Promise((resolve, reject) => {
            client.get(
                combineUrlParams(`${dataPath}${UTILS}`, {
                    name,
                    ...payload,
                })
            ).then((s) => {
                if (s?.data?.code === 0) resolve(s?.data)
                else reject(s?.data);
            }).catch((e) => reject(e));
        });
    },
};
