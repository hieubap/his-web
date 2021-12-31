import { client, dataPath } from "client/request";
import { NB_DV_THUOC } from "client/api";
import { combineUrlParams } from "utils";

export default {
  search: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DV_THUOC}`, payload)
        )
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  post: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_THUOC}`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  tamTinhTien: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_THUOC}/tinh-tien`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  onDeleteDichVu: (id) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${NB_DV_THUOC}/${id}`)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  themThongTin: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .patch(`${dataPath}${NB_DV_THUOC}/them-thong-tin`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    }); 
  },
  onDeleteAll: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${NB_DV_THUOC}`, {
          data: payload
        })
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getDonChiDinh: ({
    nbDotDieuTriId,
    soPhieuId,
    phieuNhapXuatId,
    ...payload
  }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${NB_DV_THUOC}/don-thuoc`, {
            nbDotDieuTriId,
            soPhieuId,
            phieuNhapXuatId,
            ...payload,
          })
        )
        .then((s) => {
          if (s?.data?.code == 0) resolve(s.data);
          reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
