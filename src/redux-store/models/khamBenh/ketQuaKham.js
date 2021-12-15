import dichVuXNProvider from "data-access/nb-dv-xet-nghiem-provider";
import nbDvCLSProvider from "data-access/nb-dv-cdha-tdcn-pt-tt-provider";
import { message } from "antd";
import cacheUtils from "utils/cache-utils";

export default {
  state: {
    dsKetQuaXN: [],
    dsKetQuaDichVuCLS: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },

  effects: (dispatch) => ({
    getDsKetQuaXN: (payload, state) => {
      return new Promise((resolve, reject) => {
        const payload = {
          chiDinhTuDichVuId: state.khamBenh.infoNb?.id,
          nbDotDieuTriId: state.khamBenh.infoNb?.nbDotDieuTriId,
          chiDinhTuLoaiDichVu: 10,
        };
        dichVuXNProvider
          .getTongHopDichVuXN(payload)
          .then((s) => {
            if (s.code === 0) {
              dispatch.ketQuaKham.updateData({
                dsKetQuaXN: s.data,
              });
              resolve(s);
            } else {
              reject(s);
              message.error(s.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    getDsKetQuaDichVuCLS: (payload, state) => {
      return new Promise((resolve, reject) => {
        const payload = {
          chiDinhTuDichVuId: state.khamBenh.infoNb?.id,
          nbDotDieuTriId: state.khamBenh.infoNb?.nbDotDieuTriId,
          chiDinhTuLoaiDichVu: 10,
        };
        nbDvCLSProvider
          .getTongHopDichVuCLS(payload)
          .then((s) => {
            if (s.code === 0) {
              dispatch.ketQuaKham.updateData({
                dsKetQuaDichVuCLS: s.data,
              });
              resolve(s);
            } else {
              reject(s);
              message.error(s.message);
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
