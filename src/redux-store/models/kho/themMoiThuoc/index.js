import themMoiThuocProvider from "data-access/kho/them-moi-thuoc-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import tiepDonProvider from "data-access/tiepdon-provider";

export default {
  state: {},
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
    resetModel(state) {
      return {};
    },
  },
  effects: (dispatch) => ({
    createOrEdit: async (payload = {}, state) => {
      let response = {};
      return new Promise((resolve, reject) => {
        try {
          // if (payload.id) {
          //   quyetDinhThauProvider
          //     .put(payload)
          //     .then((s) => {
          //       if (s?.code === 0) {
          //         dispatch.quyetDinhThau.updateData({
          //           dataEditDefault: response.data,
          //         });
          //       }
          //       message.success("Cập nhật thành công dữ liệu quyết định thầu");
          //     })
          //     .catch((e) => {
          //       message.error(e?.message || "Xảy ra lỗi vui lòng thử lại sau");
          //     });
          // } else {
          themMoiThuocProvider
            .post(payload)
            .then((s) => {
              if (s?.code === 0) {
                message.success("Thêm mới thành công dữ liệu đơn thuốc");
                (s?.data.dsThuoc || []).forEach((item, index) => {
                  // item.index = page * size + index + 1;
                  item.index = index + 1;
                  return item;
                });
                dispatch.thuocChiTiet.updateData({
                  infoPatient: s?.data,
                  nguoiBenhId: s?.data.phieuXuatId,
                });
                resolve(s?.data);
              }
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi vui lòng thử lại sau");
            });
          // }
        } catch (error) {
          message.error(error?.message.toString());
          return Promise.reject(error);
        }
      });
    },
    macDinh: (id, state) => {
      return new Promise((resolve, reject) => {
        tiepDonProvider
          .macDinh()
          .then((s) => {
            let nbDiaChi = state.themMoiThuoc?.nbDotDieuTri?.nbDiaChi || {};
            nbDiaChi.quocGiaId = s?.data?.quocGia?.id;
            if (s?.code === 0) {
              if (id) {
                dispatch.themMoiThuoc.updateData({
                  dataMacDinh: s?.data || {},
                });
              } else {
                let doiTuong = s?.data?.doiTuong;
                dispatch.loaiDoiTuong.getListAllLoaiDoiTuong({
                  doiTuong: doiTuong,
                });
                dispatch.themMoiThuoc.updateData({
                  nbDotDieuTri: {
                    nbDiaChi: {
                      ...nbDiaChi,
                      quocTichId: s?.data?.quocTich?.id,
                    },
                    // doiTuong: doiTuong,
                    // loaiDoiTuongId: s?.data?.loaiDoiTuong?.id,
                    // quocTichId: s?.data?.quocTich?.id,
                    // danTocId: s?.data?.danToc?.id,
                    // nbDiaChi: { ...nbDiaChi },
                    // dataMacDinh: s?.data || {},
                  },
                });
              }
            }
            resolve(s);
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
  }),
};
