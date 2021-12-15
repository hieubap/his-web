import nbPhieuThuProvider from "data-access/nb-phieu-thu-provider";
import danhSachPhuongThucTtProvider from "data-access/categories/dm-phuong-thuc-tt-provider";
import nbPhieuThuThanhToanProvider from "data-access/nb-phieu-thu-thanh-toan-provider";
import nbTachPhieuThuProvider from "data-access/nb-tach-phieu-thu-provider";
import { message } from "antd";
import printProvider from "data-access/print-provider";

export default {
  state: {
    dsDichVu: [],
    dsPhieuThu: [],
    chiTietPhieuThu: {},
    thongTinBenhNhan: {},
    thongTinPhieuThu: {},
    dsPhuongThucTt: [],
    tienThanhToanDv: 0,
    tienDaNhan: 0,
    infoPrice: {},
    formPhieuThu: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getThongTinPhieuThu: (id) => {
      nbPhieuThuProvider
        .searchById(id)
        .then((s) => {
          dispatch.thuNgan.updateData({
            thongTinPhieuThu: s.data,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
        });
    },
    postPhieuThuThanhToan: ({ nbDotDieuTriId, ...rest }, state) => {
      return new Promise((resolve, reject) => {
        nbPhieuThuThanhToanProvider
          .post(rest)
          .then((s) => {
            message.success("Thanh toán phiếu thu thành công");

            dispatch.thuNgan.updateData({
              thongTinPhieuThu: s?.data || {},
            });

            dispatch.danhSachPhieuThu.onSearch({
              dataSearch: { nbDotDieuTriId },
              nbDotDieuTriId,
            });

            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    getPhuongThucTT: (payload) => {
      danhSachPhuongThucTtProvider
        .search(payload)
        .then((s) => {
          dispatch.thuNgan.updateData({
            dsPhuongThucTt: s.data,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
        });
    },
    getPhuongThucTTTongHop: (payload) => {
      danhSachPhuongThucTtProvider
        .searchTongHop(payload)
        .then((s) => {
          dispatch.thuNgan.updateData({
            dsPhuongThucTt: s.data,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
        });
    },
    tachPhieuThu: (payload) => {
      const { nbDotDieuTriId, ...rest } = payload;
      return new Promise((resolve, reject) => {
        nbTachPhieuThuProvider
          .post(rest)
          .then((s) => {
            message.success("Chuyển phiếu thu thành công");
            dispatch.danhSachPhieuThu.onSearch({
              page: 0,
              size: 20,
              dataSearch: { nbDotDieuTriId },
            });
            dispatch.danhSachDichVu.searchAll({
              nbDotDieuTriId,
              phieuThuId: payload.id,
            });
            dispatch.danhSachDichVu.onSizeChange({
              size: 10,
              nbDotDieuTriId,
              phieuThuId: payload.id,
            });
            resolve(s);
          })
          .catch((e) => {
            message.error(
              e?.code == 9210
                ? "Vui lòng chọn ít nhất 1 dịch vụ để chuyển phiếu thu"
                : e?.message || "Xảy ra lỗi, vui lòng thử lại sau"
            );
            reject(e);
          });
      });
    },

    getFormPhieuThu: (id) => {
      return new Promise((resolve, reject) => {
        nbPhieuThuProvider
          .getFormPhieuThu(id)
          .then((s) => {
            dispatch.thuNgan.updateData({
              formPhieuThu: s.data,
            });
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    printPhieuThu: (id) => {
      dispatch.thuNgan
        .getFormPhieuThu(id)
        .then((res) => {
          printProvider
            .printPdf(res)
            .then(() => {
              console.info("Print success");
            })
            .catch((err) => {
              message.error(err?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            });
        })
        .catch((e) => {});
    },
  }),
};
