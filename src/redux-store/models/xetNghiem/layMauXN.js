import nbDichVuXN from "data-access/nb-dv-xet-nghiem-provider";
import { combineSort } from "utils";
import { message } from "antd";
import resolve from "resolve";

const initialState = {
  nbDotDieuTriId: null,
  listServices: [],
  dataSearch: {},
  dataSortColumn: {},
  listBNXetNghiem: [],
  dataSearchDSDV: {},
  dataSortColumnDSDV: {},
  dsTrangThai: [],
};

export default {
  state: initialState,
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    resetData: () => {
      dispatch.layMauXN.updateData(initialState);
    },
    getTongHopDichVuXN: (payload, state) => {
      const nbDotDieuTriId =
        payload.nbDotDieuTriId || state.layMauXN?.nbDotDieuTriId;
      const currentDsTrangThai = state.layMauXN.dsTrangThai;
      const sort = combineSort(
        payload.dataSortColumnDSDV || state.layMauXN.dataSortColumnDSDV || {}
      );
      const dataSearch =
        payload.dataSearchDSDV || state.layMauXN.dataSearchDSDV || {};
      return new Promise((resolve, reject) => {
        nbDichVuXN
          .getTongHopDichVuXN({
            sort,
            ...dataSearch,
            nbDotDieuTriId,
            ...(currentDsTrangThai.length
              ? { dsTrangThai: currentDsTrangThai }
              : {}),
          })
          .then((s) => {
            dispatch.layMauXN.updateData({
              listServices: s?.data || [],
            });
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            dispatch.layMauXN.updateData({
              listServices: [],
            });
            reject(e);
          });
      });
    },
    xacNhanlayMau: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          nbDichVuXN
            .xacNhanlayMau(payload)
            .then((s) => {
              if (s.code === 0) {
                message.success(
                  payload?.status === "accept"
                    ? "Lấy mẫu thành công!"
                    : "Hủy mẫu thành công"
                );
                resolve(s);
              } else {
                message.error(s?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              }
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
    onChangeInputSearchDSDV: (payload, state) => {
      const dataSearchDSDV = {
        nbDotDieuTriId: state.layMauXN.nbDotDieuTriId,
        ...(state.layMauXN.dataSearchDSDV || {}),
        ...payload,
      };

      dispatch.layMauXN.updateData({ dataSearchDSDV });
      dispatch.layMauXN.getTongHopDichVuXN({ dataSearchDSDV });
    },
    onSortChangeDSDV: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.layMauXN.dataSortColumnDSDV,
        ...payload,
      };
      dispatch.layMauXN.updateData({
        dataSortColumnDSDV: dataSortColumn,
      });
      dispatch.layMauXN.getTongHopDichVuXN({
        dataSortColumnDSDV: dataSortColumn,
      });
    },
    tiepNhan: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          nbDichVuXN
            .tiepNhan(payload)
            .then((s) => {
              if (s?.code == 0) {
                message.success(
                  s?.message ||
                    "Đã tiếp nhận DV của người bệnh, vui lòng lấy mẫu!"
                );
                resolve(s);
              } else {
                reject(s);
              }
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
    postNbTiepTheo: (payload = {}, state) => {
      const { phongLayMauId, nbTiepTheoId } = payload;
      return new Promise((resolve, reject) => {
        try {
          nbDichVuXN
            .postNbTiepTheo({ nbTiepTheoId }, phongLayMauId)
            .then((s) => {
              if (s?.code == 0) {
                resolve(s);
              } else {
                reject(s);
              }
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
    boQua: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          nbDichVuXN
            .boQua(payload)
            .then((s) => {
              if (s?.code == 0) {
                resolve(s);
              } else {
                reject(s);
              }
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
  }),
};
