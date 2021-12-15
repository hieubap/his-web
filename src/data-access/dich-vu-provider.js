import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import {
  NB_DV_KY_THUAT,
  DM_DV_KY_THUAT,
  DM_DICH_VU,
  PHIEU_KHAM_BENH,
  PHIEU_KHAM_XET_NGHIEM,
  PHIEU_KHAM_CDHA,
  CAM_KET_DIEU_TRI_COVID,
  GIU_THE_BHYT,
  VONG_TAY_NGUOI_BENH,
} from "client/api";

export default {
  searchDichVuKyThuat: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_DV_KY_THUAT}`, {
            sort: "ma",
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

  searchDvTiepDon: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_DV_KY_THUAT}/tiep-don`, {
            sort: "ma",
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
  search: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${DM_DICH_VU}`, {
            sort: "ma",
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
  createMore: (payload) => {
    return new Promise((resolve, reject) => {
      if (payload?.id) {
        client
          .patch(`${dataPath}${NB_DV_KY_THUAT}`, payload?.data)
          .then((s) => {
            if (s?.data?.code === 0) resolve(s?.data);
            else reject(s?.data);
          })
          .catch((e) => reject(e));
      } else {
        client
          .post(`${dataPath}${NB_DV_KY_THUAT}`, payload?.data)
          .then((s) => {
            resolve(s.data);
          })
          .catch((e) => {
            reject(e);
          });
      }
    });
  },
  searchNbDvKyThuat: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_DV_KY_THUAT}`, payload))
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  tamTinhTien: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_DV_KY_THUAT}/tinh-tien`, payload)
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  deleteDvKyThuat: (id) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${dataPath}${NB_DV_KY_THUAT}/${id}`, {})
        .then((s) => {
          resolve(s.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getPhieuKhamBenh: (id, payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${PHIEU_KHAM_BENH}`, { ...payload, nbDotDieuTriId: id }))
        .then((s) => {
          resolve(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getPhieuXetNghiem: (id, payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${PHIEU_KHAM_XET_NGHIEM}`, { ...payload, nbDotDieuTriId: id }))
        .then((s) => {
          resolve(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getPhieuCdha: (id, payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${PHIEU_KHAM_CDHA}`, { ...payload, nbDotDieuTriId: id }))
        .then((s) => {
          resolve(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getCamKetDieuTriCovid: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${CAM_KET_DIEU_TRI_COVID}/${id}`, {})
        .then((s) => {
          resolve(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getPhieuGiuTheBHYT: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${GIU_THE_BHYT}/${id}`, {})
        .then((s) => {
          resolve(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  getVongTayNguoiBenh: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${dataPath}${VONG_TAY_NGUOI_BENH}/${id}`, {})
        .then((s) => {
          resolve(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
