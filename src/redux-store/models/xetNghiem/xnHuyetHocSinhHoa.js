import nbDichVuXN from "data-access/nb-dv-xet-nghiem-provider";
import { combineSort } from "utils";
import { message } from "antd";

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
      dispatch.xnHuyetHocSinhHoa.updateData(initialState);
    },
    updateKetQuaXetNghiem: (payload, state) => {
      nbDichVuXN
        .updateXN(payload)
        .then((res) => {
          message.success("Cập nhật dịch vụ thành công!");
        })
        .catch((e) => {
          message.error(e?.message || "Có lỗi xảy ra vui lòng thử lại!");
        });
    },
    getTongHopDichVuXN: (payload, state) => {
      const nbDotDieuTriId =
        payload.nbDotDieuTriId || state.xnHuyetHocSinhHoa?.nbDotDieuTriId;
      const sort = combineSort(
        payload.dataSortColumnDSDV ||
          state.xnHuyetHocSinhHoa.dataSortColumnDSDV ||
          {}
      );
      const currentDsTrangThai =
        payload.dataSearchDSDV?.dsTrangThai ||
        state.xnHuyetHocSinhHoa.dsTrangThai;
      const dataSearch =
        payload.dataSearchDSDV || state.xnHuyetHocSinhHoa.dataSearchDSDV || {};
      const dsNhomDichVuCap2Id = state?.xnHuyetHocSinhHoa.dsNhomDichVuCap2Id || null;
      return new Promise((resolve, reject) => {
        nbDichVuXN
          .getTongHopDichVuXN({
            sort,
            ...dataSearch,
            nbDotDieuTriId,
            dsNhomDichVuCap2Id,
            ...(currentDsTrangThai?.length
              ? { dsTrangThai: currentDsTrangThai }
              : {}),
          })
          .then((s) => {
            dispatch.xnHuyetHocSinhHoa.updateData({
              listServices: s?.data || [],
            });
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            dispatch.xnHuyetHocSinhHoa.updateData({
              listServices: [],
            });
          });
      });
    },

    onChangeInputSearchDSDV: (payload, state) => {
      const dataSearchDSDV = {
        nbDotDieuTriId: state.xnHuyetHocSinhHoa.nbDotDieuTriId,
        ...(state.xnHuyetHocSinhHoa.dataSearchDSDV || {}),
        ...payload,
      };
      dispatch.xnHuyetHocSinhHoa.updateData({
        dataSearchDSDV,
        dsTrangThai: payload?.dsTrangThai,
      });
      dispatch.xnHuyetHocSinhHoa.getTongHopDichVuXN({ dataSearchDSDV });
    },
    onSortChangeDSDV: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.xnHuyetHocSinhHoa.dataSortColumnDSDV,
        ...payload,
      };
      dispatch.xnHuyetHocSinhHoa.updateData({
        dataSortColumnDSDV: dataSortColumn,
      });
      dispatch.xnHuyetHocSinhHoa.getTongHopDichVuXN({
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
                message.success("Cập nhật kết quả thành công");
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
              if (s.code === 0) {
                message.success(
                  status === "accept"
                    ? "Duyệt kết quả thành công"
                    : "Hủy duyệt kết quả thành công"
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
    getTongHopDichVu: (payload, state) => {
      const nbDotDieuTriId =
        payload.nbDotDieuTriId || state.xnHuyetHocSinhHoa?.nbDotDieuTriId;
      const sort = combineSort(
        payload.dataSortColumnDSDV ||
          state.xnHuyetHocSinhHoa.dataSortColumnDSDV ||
          {}
      );
      const currentDsTrangThai =
        payload.dataSearch || state.xnHuyetHocSinhHoa.dsTrangThai;
      return new Promise((resolve, reject) => {
        nbDichVuXN
          .getTongHopDichVuXN({
            nbDotDieuTriId,
            sort,
            ...payload,
            ...(currentDsTrangThai.length
              ? { dsTrangThai: currentDsTrangThai }
              : {}),
          })
          .then((s) => {
            resolve(s?.data[0]?.nbDotDieuTriId);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
    getPhieuKetQua: (payload, state) => {
      const nbDotDieuTriId =
        payload.nbDotDieuTriId || state.xnHuyetHocSinhHoa?.nbDotDieuTriId;

      const currentDsTrangThai =
        payload.dataSearch || state.xnHuyetHocSinhHoa.dsTrangThai;
      const dsNhomDichVuCap2Id = state?.xnHuyetHocSinhHoa.dsNhomDichVuCap2Id || null;
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
