import { combineUrlParams } from "utils";
import { client, medicinePath } from "client/request";
import {
  MEDICINELIST,
  MEDICINE_SUMMARY_REPORT,
  MEDICINE_DETAIL_REPORT,
} from "client/api";
export default {
  searchDrug: ({
    page = "0",
    patientHistoryId,
    loaiThuoc,
    khoaId,
    active = true,
    sort = "tenThuongMai",
    ngayThucHien,
    ...payload
  }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${medicinePath}${MEDICINELIST}`, {
            page: page + "",
            patientHistoryId,
            loaiThuoc,
            khoaId,
            active,
            sort,
            ngayThucHien,
            ...payload,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0) {
            resolve(s?.data);
          } else {
            reject(s?.data);
          }
        })
        .catch((e) => reject(e));
    });
  },
  allocationDrug: ({ ids = [] }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${medicinePath}${MEDICINELIST}`, {
          ids,
        })
        .then((s) => {
          if (s?.data?.code === 0) {
            resolve(s?.data);
          } else {
            reject(s?.data);
          }
        })
        .catch((e) => reject(e));
    });
  },
  getDetail: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${medicinePath}${MEDICINELIST}/${id}`))
        .then((s) => {
          if (s?.data?.code === 0) {
            resolve(s?.data);
          } else {
            reject(s?.data);
          }
        })
        .catch((e) => reject(e));
    });
  },
  getSummaryReport: ({ tuNgay, denNgay, khoaIds, phongIds, trangThai }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${medicinePath}${MEDICINE_SUMMARY_REPORT}`, {
            tuNgay,
            denNgay,
            khoaIds,
            phongIds,
            trangThai,
          })
        )
        .then((s) => {
          if (s?.data?.code == 0 && s?.data?.data) {
            resolve(s?.data);
          } else {
            reject(s?.data);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getDetailReport: ({ tuNgay, denNgay, khoaIds, phongIds, trangThai }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${medicinePath}${MEDICINE_DETAIL_REPORT}`, {
            tuNgay,
            denNgay,
            khoaIds,
            phongIds,
            trangThai,
          })
        )
        .then((s) => {
          if (s?.data?.code == 0 && s?.data?.data) {
            resolve(s?.data);
          } else {
            reject(s?.data);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
