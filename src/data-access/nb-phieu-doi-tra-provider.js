import { message } from "antd";
import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { NB_PHIEU_THU } from "client/api";
import { NB_PHIEU_THU_PHIEU_THU } from "client/api";
import { NB_PHIEU_DOI_TRA, PHIEU_NB_PHIEU_DOI_TRA } from "../client/api";

export default {
  search: ({ page = 0, active, sort, size = 1000, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_PHIEU_DOI_TRA}`, {
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

  getStatistical: (params) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_PHIEU_DOI_TRA}`, params))
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getChiTietPhieuDoiTra: ({ id }) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${PHIEU_NB_PHIEU_DOI_TRA}/${id}`))
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  confirmPhieuDoiTra: ({ id }) => {
    return new Promise((resolve, reject) => {
      client
        .post(
          combineUrlParams(
            `${dataPath}${PHIEU_NB_PHIEU_DOI_TRA}/xac-nhan/${id}`
          )
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
