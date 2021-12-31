import nbDichVuXN from "data-access/nb-dv-xet-nghiem-provider";
import { combineSort } from "utils";
import { message } from "antd";

export default {
  state: {
    nbDotDieuTriId: null,
    listServices: [],
    infoDichVu: {},
    dataSearchDSDV: {},
    dataSortColumnDSDV: {},
    dsTrangThai: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getTongHopDichVuXN: (payload, state) => {
      const nbDotDieuTriId =
        payload.nbDotDieuTriId || state.xnGiaiPhauBenhViSinh?.nbDotDieuTriId;
      const sort = combineSort(
        payload.dataSortColumnDSDV ||
          state.xnGiaiPhauBenhViSinh.dataSortColumnDSDV ||
          {}
      );
      const dsTrangThai =
        payload.dataSearchDSDV?.dsTrangThai ||
        state.xnGiaiPhauBenhViSinh.dsTrangThai;
      const dataSearch =
        payload.dataSearchDSDV || state.xnGiaiPhauBenhViSinh.dataSearchDSDV || {};
        const dsNhomDichVuCap2Id = state?.xnGiaiPhauBenhViSinh.dsNhomDichVuCap2Id || null; 
      return new Promise((resolve, reject) => {
        nbDichVuXN
          .getTongHopDichVuXN({
            nbDotDieuTriId,
            sort,
            dsNhomDichVuCap2Id,
            ...dataSearch,
            ...(dsTrangThai.length ? { dsTrangThai } : {}),
          })
          .then((s) => {
            dispatch.xnGiaiPhauBenhViSinh.updateData({
              listServices: s?.data || [],
            });
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            dispatch.xnGiaiPhauBenhViSinh.updateData({
              listServices: [],
            });
          });
      });
    },
    onChangeInputSearchDSDV: (payload, state) => {
      const dataSearchDSDV = {
        nbDotDieuTriId: state.layMauXN.nbDotDieuTriId,
        ...(state.layMauXN.dataSearchDSDV || {}),
        ...payload,
      };
      dispatch.xnGiaiPhauBenhViSinh.updateData({
        dataSearchDSDV,
        dsTrangThai: payload?.dsTrangThai,
      });
      dispatch.xnGiaiPhauBenhViSinh.getTongHopDichVuXN({ dataSearchDSDV });
    },
    onSortChangeDSDV: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.layMauXN.dataSortColumnDSDV,
        ...payload,
      };
      dispatch.xnGiaiPhauBenhViSinh.updateData({
        dataSortColumnDSDV: dataSortColumn,
      });
      dispatch.xnGiaiPhauBenhViSinh.getTongHopDichVuXN({
        dataSortColumnDSDV: dataSortColumn,
      });
    },
    xacNhanKetQua: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          nbDichVuXN
            .xacNhanKetQua(payload)
            .then((s) => {
              if (s.code === 0) {
                message.success(
                  payload?.status === "accept"
                    ? "Có kết quả thành công"
                    : "Hủy có kết quả thành công"
                );
              } else {
                message.error(s?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              }
              resolve(s);
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              reject(e);
            });
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
    capNhatKetQua: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          nbDichVuXN
            .capNhatKetQua(payload)
            .then((s) => {
              if (s.code === 0) {
                message.success(
                  payload?.status
                    ? "Có kết quả thành công"
                    : "Hủy có kết quả thành công"
                );
              } else {
                message.error(s?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              }
              resolve(s);
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              reject(e);
            });
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
    duyetKetQua: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          const { status } = payload;
          nbDichVuXN
            .duyetKetQua(payload)
            .then((s) => {
              message.success(
                status === "accept"
                  ? "Duyệt kết quả thành công"
                  : "Hủy duyệt kết quả thành công"
              );
              resolve(s);
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              reject(e);
            });
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
    xacNhanTiepNhanMau: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          nbDichVuXN
            .xacNhanTiepNhanMau(payload)
            .then((s) => {
              if (s.code === 0) {
                message.success(
                  payload?.status === "accept"
                    ? "Tiếp nhận mẫu thành công!"
                    : "Hủy tiếp nhận mẫu thành công"
                );
              } else {
                message.error(s?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              }
              resolve(s);
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              reject(e);
            });
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
    getPhieuKetQua: (payload, state) => {
      const nbDotDieuTriId =
        payload.nbDotDieuTriId || state.xnGiaiPhauBenhViSinh?.nbDotDieuTriId;

      const currentDsTrangThai =
        payload.dataSearch || state.xnGiaiPhauBenhViSinh.dsTrangThai;
        const dsNhomDichVuCap2Id = state?.xnGiaiPhauBenhViSinh.dsNhomDichVuCap2Id || null; 
      return new Promise((resolve, reject) => {
        nbDichVuXN
          .getPhieuKetQua({
            nbDotDieuTriId,
            dsNhomDichVuCap2Id,
            ...payload,
            ...(currentDsTrangThai.length
              ? { dsTrangThai: currentDsTrangThai }
              : {}),
          })
          .then((s) => {
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
  }),
};
