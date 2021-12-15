import nbDichVuXN from "data-access/nb-dv-xet-nghiem-provider";
import phongProvider from "data-access/categories/dm-phong-provider";
import { TRANG_THAI_HHSH_GPB, TRANG_THAI_LAY_MAU_BN } from "constants/index";
import { message } from "antd";

export default {
  state: {
    listNoiLayBenhPham: [],
    listNbTiepTheo: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getPhongLayMau: (payload = {}, state, paramCheck) => {
      phongProvider
        .getPhongTheoTaiKhoan(payload)
        .then((s) => {
          let data = s?.data || [];
          dispatch.xetNghiem.updateData({
            listNoiLayBenhPham: data,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.xetNghiem.updateData({
            listNoiLayBenhPham: [],
          });
          dispatch.nbXetNghiem.onSizeChange({
            size: 10,
          });
        });
    },
    updateKetQuaXetNghiem: (payload, state) => {
      return new Promise((resolve, reject) => {
        nbDichVuXN
          .updateXN(payload)
          .then((res) => {
            message.success("Cập nhật kết quả thành công");
            resolve(res?.data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    getDsNguoiBenhQms: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        nbDichVuXN
          .getDsNguoiBenhQms(payload)
          .then((s) => {
            let data = s?.data || [];
            dispatch.xetNghiem.updateData({
              listNbTiepTheo: data,
            });
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
  }),
};

