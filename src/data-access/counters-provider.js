import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { COUNTERS } from "client/api";

export default {
    search: () => {
        return new Promise((resolve, reject) => {
            client.get(
                combineUrlParams(`${dataPath}${COUNTERS}`, {
                    page: 0,
                    active: true,
                    sort: "ten,asc"
                })
            ).then((s) => {
                if (s?.data?.code === 0) resolve(s?.data)
                else reject(s?.data);
            }).catch((e) => reject(e));
        });
    },
};
