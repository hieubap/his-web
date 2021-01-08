import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { QMS } from "client/api";

export default {
    // trạng thái: MOI(10), DANG_TIEP_DON(20), BO_QUA(30), DA_TIEP_DON(40)
    search: ({ page = 0, size = 20, trangThai, quayTiepDonId, sort = "createdAt,desc", active = true, ...payload }) => {
        return new Promise((resolve, reject) => {
            client.get(
                combineUrlParams(`${dataPath}${QMS}`, {
                    page: page + "",
                    size,
                    trangThai,
                    quayTiepDonId,
                    sort,
                    active,
                    ...payload,
                })
            ).then((s) => {
                if (s?.data?.code === 0) resolve(s?.data)
                else reject(s?.data);
            }).catch((e) => reject(e));
        });
    },
};
