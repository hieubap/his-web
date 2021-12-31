import nbDotDieuTriProvider from "data-access/nb-dot-dieu-tri-provider";
import { message } from "antd";
import resolve from "resolve";

const initialState = {
  data: {},
  thongTinBenhNhan: {},
  dataNBDotDieuTri: [],
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
      dispatch.nbDotDieuTri.updateData(initialState);
    },
    thongTinTongTienNB: ({ id }, state) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .thongTinTongTienNB(id)
          .then((s) => {
            dispatch.nbDotDieuTri.updateData({
              data: s.data,
            });
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    getThongTinNBDotDieuTri: (nbDotDieuTriId) => {
      if (!nbDotDieuTriId) {
        dispatch.nbDotDieuTri.updateData({
          thongTinBenhNhan: {},
        });
        return;
      }
      nbDotDieuTriProvider
        .getThongTinNBDotDieuTri(nbDotDieuTriId)
        .then((s) => {
          dispatch.nbDotDieuTri.updateData({
            thongTinBenhNhan: s?.data,
          });
          resolve(s);
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.nbDotDieuTri.updateData({
            thongTinBenhNhan: [],
          });
        });
    },
    getThongTinNBTheoNbThongTinId: (nbThongTinId) => {
      if (!nbThongTinId) {
        dispatch.nbDotDieuTri.updateData({
          thongTinBenhNhan: {},
        });
        return;
      }
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .getThongTinNBTheoNbThongTinId(nbThongTinId)
          .then((s) => {
            dispatch.hoSoBenhAn.updateData({
              nbDotDieuTriId: s?.data[0].id,
              selectedMaHs: s?.data[0].maHoSo,
              lichSuKham: s?.data,
              soDotDieuTri: s?.data?.length,
            });
            resolve(s?.data[0]);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            dispatch.nbDotDieuTri.updateData({
              thongTinBenhNhan: [],
            });
            reject(e);
          });
      });
    },
    searchNBDotDieuTri: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .searchNBDotDieuTri(payload)
          .then((s) => {
            dispatch.nbDotDieuTri.updateData({
              dataNBDotDieuTri: s?.data,
            });
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            dispatch.nbDotDieuTri.updateData({
              dataNBDotDieuTri: [],
            });
          });
      });
    },
    searchNBDotDieuTriTongHop: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .searchNBDotDieuTriTongHop(payload)
          .then((s) => {
            dispatch.nbDotDieuTri.updateData({
              dataNBDotDieuTri: s?.data,
            });
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            dispatch.nbDotDieuTri.updateData({
              dataNBDotDieuTri: [],
            });
          });
      });
    },
    onUpdate: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbDotDieuTriProvider
          .capNhatDotDieuTri(payload)
          .then((s) => {
            if (s?.code === 0) {
              dispatch.nbDotDieuTri.updateData({
                thongTinBenhNhan: s.data,
              });
              resolve(s);
            } else {
              resolve(s);
              if (s?.code !== 7950 && s?.code !== 7920)
                message.error(s?.message);
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
  }),
};
