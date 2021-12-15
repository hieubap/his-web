import { message } from "antd";
import dvKyThuatProvider from "data-access/nb-dv-ky-thuat-provider";
import nbDvKhamProvider from "data-access/nb-dv-kham-provider";
import nbDvVatTuProvider from "data-access/nb-dv-vat-tu-provider";

export default {
  state: {
    dsDvKt: [],
    lichSuKham: [],
    totalElements: null,
    totalElementDvKt: null,
    selectedMaHs: null,
    pageDv: 1,
    sizeDv: 10,
    pageTVTHC: 1,
    sizeTVTHC: 10,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getDvKt: (payload = {}, state) => {
      dvKyThuatProvider
        .getDsDichVu({
          page: payload.page || 0,
          size: payload.size || 9999,
          ...payload,
        })
        .then((s) => {
          dispatch.hoSoBenhAn.updateData({
            dsDvKt: s?.data || [],
            pageDv: 1,
            totalElementDvKt: (s?.data || []).length,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
        });
    },
    getLichSuKham: (payload = {}, state) => {
      nbDvKhamProvider
        .getDsDichVuChiDinhKham({
          size: payload.size || 9999,
          ...payload,
        })
        .then((s) => {
          const mapObj = {};
          (s?.data || []).forEach((item) => {
            mapObj[item.maHoSo] = item;
          });

          dispatch.hoSoBenhAn.updateData({
            lichSuKham: Object.keys(mapObj).map((item) => mapObj[item]),
            selectedMaHs: Object.keys(mapObj)[0],
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
        });
    },
    getListDichVuVatTu: (payload) => {
      return new Promise((resolve, reject) => {
        nbDvVatTuProvider
          .search({ ...payload, size: 9999 })
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              dispatch.hoSoBenhAn.updateData({
                listDvVatTu: data,
              });
              resolve(s);
            } else {
              reject(s);
              message.error(s?.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
  }),
};
