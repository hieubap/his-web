import nbDvHoanProvider from "data-access/nb-dv-hoan-provider";
import { message } from "antd";

export default {
  state: {
    listDvKho: [],
    loaiDichVu: null,
    listLoaiDichVu: [],
    listDvTonKho: [],
    neededUpdateRecord: [],
    listGoiDv: [],
    listDvVatTu: [],
    listDanhSachPhong: []
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },

  effects: (dispatch) => ({
    traDichVu: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvHoanProvider
          .traDichVu(payload)
          .then((s) => {
            if (s?.code == 0) {
              message.success("Hoàn dịch vụ thành công");
              resolve(s);
            } else {
              message.error(s?.message);
              reject(s);
            }
          })
          .catch((e) => {
            message.error(e.message || "Hoàn dịch vụ thất bại");
            reject(e);
          });
      });
    },
    doiDichVu: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvHoanProvider
          .doiDichVu(payload)
          .then((s) => {
            if (s?.code == 0) {
              message.success("Hoàn dịch vụ thành công");
              resolve(s);
            } else {
              message.error(s?.message);
              reject(s);
            }
          })
          .catch((e) => {
            message.error(e.message || "Hoàn dịch vụ thất bại");
            reject(e);
          });
      });
    },
  }),
};
