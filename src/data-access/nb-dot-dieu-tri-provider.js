import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { NB_DOT_DIEU_TRI } from "client/api";

export default {
  thongTinTongTienNB: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DOT_DIEU_TRI}/tong-tien/${id}`, {})
        )
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getThongTinNBDotDieuTri: (nbDotDieuTriId) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(
            `${dataPath}${NB_DOT_DIEU_TRI}/${nbDotDieuTriId}`,
            {}
          )
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getThongTinNBTheoNbThongTinId: (nbThongTinId) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DOT_DIEU_TRI}/tong-hop`, {
            nbThongTinId,
            page: 0,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  searchNBDotDieuTri: ({
    page = 0,
    active = true,
    sort,
    size = 500,
    ...payload
  }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DOT_DIEU_TRI}`, {
            page: page + "",
            active,
            sort,
            size,
            ...payload,
          })
        )
        .then((s) => {
          if (s.data.code === 0) {
            resolve(s.data);
          } else {
            reject(s?.data);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  searchNBDotDieuTriTongHop: ({ page = 0, sort, size = 500, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DOT_DIEU_TRI}/tong-hop`, {
            page: page + "",
            sort,
            size,
            ...payload,
          })
        )
        .then((s) => {
          if (s.data.code === 0) {
            resolve(s.data);
          } else {
            reject(s?.data);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  capNhatDotDieuTri: (data) => {
    return new Promise((resolve, reject) => {
      client
        .patch(`${dataPath}${NB_DOT_DIEU_TRI}/${data.id}`, data)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
