import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { DISTRICTS, ZONES } from "client/api";

export default {
    searchDistricts: ({ page, active, sort, size = 2000, ...payload }) => {
        return new Promise((resolve, reject) => {
            client.get(
                combineUrlParams(`${dataPath}${DISTRICTS}`, {
                    page: page + "",
                    active,
                    sort,
                    size,
                    ...payload,
                })
            ).then((s) => {
                if (s?.data?.code === 0) resolve(s?.data)
                else reject(s?.data);
            }).catch((e) => reject(e));
        });
    },
    searchZones: () => {
        return new Promise((resolve, reject) => {
            client.get(
                combineUrlParams(`${dataPath}${ZONES}`, {
                    page: 0,
                    active: true,
                    sort: "ten,asc",
                    size: 2000
                })
            ).then((s) => {
                if (s?.data?.code === 0) resolve(s?.data)
                else reject(s?.data);
            }).catch((e) => reject(e));
        });
    },
};
