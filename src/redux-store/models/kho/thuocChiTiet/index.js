import thuocChiTietProvider from "data-access/kho/thuoc-chi-tiet-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import tiepDonProvider from "data-access/tiepdon-provider";
import tonKhoProvider from "data-access/kho/kho-ton-kho-provider";
import danhSachPhuongThucTtProvider from "data-access/categories/dm-phuong-thuc-tt-provider";
import phieuNhapXuatProvider from "data-access/kho/phieu-nhap-xuat-provieder";
export default {
  state: {
    infoPatient: {},
    isAdvised: false,
    nguoiBenhId: null,
    dsThuocEdit: [],
    selectedDonThuoc: {},
    listAllDichVuTonKho: [],
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataSearch: {},
    totalElements: null,
    // search table
    pageDvSearch: PAGE_DEFAULT,
    sizeDvSearch: PAGE_SIZE,
    dataSearchDv: {},
    totalElementsDvSearch: null,

    dsThuocTamThoi: [],
    // dataSortColumn: { active: 2 },
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    searchDonThuoc: async (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          thuocChiTietProvider
            .searchDonThuoc(payload)
            .then((s) => {
              if (s?.code === 0) {
                (s?.data.dsThuoc || []).forEach((item, index) => {
                  // item.index = page * size + index + 1;
                  item.index = index + 1;
                  return item;
                });
                dispatch.thuocChiTiet.updateData({
                  infoPatient: s?.data,
                  nguoiBenhId: payload,
                });
                // message.success("Thêm mới thành công dữ liệu đơn thuốc");
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
    onSearch: async (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          thuocChiTietProvider
            .searchAll(payload)
            .then((s) => {
              if (s?.code === 0) {
                // dispatch.thuocChiTiet.updateData({
                //   infoPatient: s?.data
                // })
                // message.success("Thêm mới thành công dữ liệu đơn thuốc");
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
    changesDonThuoc: async ({ statusDelete = false, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        try {
          thuocChiTietProvider
            .put(payload)
            .then((s) => {
              if (s?.code === 0) {
                // if (statusDelete) {
                (s?.data.dsThuoc || []).forEach((item, index) => {
                  // item.index = page * size + index + 1;
                  item.index = index + 1;
                  return item;
                });
                dispatch.thuocChiTiet.updateData({
                  infoPatient: s?.data,
                });
                // }
                // message.success("Cập nhật thành công dữ liệu đơn thuốc");
                resolve(s?.data);
              } else {
                message.error(s?.message || "Xảy ra lỗi vui lòng thử lại sau");
                reject(s?.message || "Xảy ra lỗi vui lòng thử lại sau");
              }
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi vui lòng thử lại sau");
              reject(e?.message || "Xảy ra lỗi vui lòng thử lại sau");
            });
          // }
        } catch (error) {
          message.error(error?.message.toString());
          return Promise.reject(error);
        }
      });
    },
    onSearchListDichVuTonKho: ({ dataSearchDv, ...rest }) => {
      dispatch.thuocChiTiet.updateData({
        page: 0,
        dataSearchDv,
        // ...rest,
      });
      return dispatch.thuocChiTiet.onSearchAllDichVuTonKho({ ...rest });
    },
    onSearchAllDichVuTonKho: ({ page = 0, ...payload }, state) => {
      console.log("payload: ", payload);
      let size = payload?.sizeDvSearch || state.thuocChiTiet.sizeDvSearch || 10;
      // const sort = combineSort(
      //   payload.dataSortColumn || state.kho.dataSortColumn || {}
      // );
      // const dataSearch =
      //   payload.dataSearchDv || state.thuocChiTiet.dataSearchDv || {};

      return new Promise(async (resolve, reject) => {
        // let listAllDichVuTonKho = await cacheUtils.read(
        //   "",
        //   "DATA_ALL_LIST_DICH_VU_TON_KHO",
        //   [],
        //   false
        // );
        // dispatch.thuocChiTiet.updateData({ isLoading: true, listAllDichVuTonKho });
        tonKhoProvider
          .searchAll({ page, size, ...payload })
          .then(async (s) => {
            const { data: listAllDichVuTonKho } = s;
            // await cacheUtils.save(
            //   "",
            //   "DATA_ALL_LIST_DICH_VU_TON_KHO",
            //   listAllDichVuTonKho,
            //   false
            // );
            dispatch.thuocChiTiet.updateData({
              listAllDichVuTonKho,
              isLoading: false,
            });
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message?.toString());
            dispatch.thuocChiTiet.updateData({
              listAllDichVuTonKho: [],
              isLoading: false,
            });
            reject(e);
          });
      });
    },
    getPhuongThucTT: (payload) => {
      danhSachPhuongThucTtProvider
        .search(payload)
        .then((s) => {
          dispatch.thuocChiTiet.updateData({
            dsPhuongThucTt: s.data,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
        });
    },
    postThanhToan: ({ ...rest }, state) => {
      return new Promise((resolve, reject) => {
        thuocChiTietProvider
          .postThanhToan(rest)
          .then((s) => {
            message.success("Thanh toán đơn thuốc thành công");
            let cloneInfoPatient = { ...state.thuocChiTiet.infoPatient };
            cloneInfoPatient.phieuXuat = s?.data;
            cloneInfoPatient.phieuThu.thanhToan = true; // BE chỉ trả về phiếu xuất

            dispatch.thuocChiTiet.searchDonThuoc(
              state.thuocChiTiet.nguoiBenhId
            );

            // dispatch.thuocChiTiet.updateData({
            //   infoPatient: cloneInfoPatient || {},
            // });

            // dispatch.danhSachPhieuThu.onSearch({
            //   dataSearch: { nbDotDieuTriId },
            // });

            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    updateGhiChuDonThuocById: ({ ...rest }, state) => {
      return new Promise((resolve, reject) => {
        phieuNhapXuatProvider
          .updateGhiChuDonThuocById(rest)
          .then((s) => {
            message.success("Cập nhật ghi chú thành công")
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
  }),
};
