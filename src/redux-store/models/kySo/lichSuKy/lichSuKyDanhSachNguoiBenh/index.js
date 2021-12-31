import thuocProvider from "data-access/kho/thuoc-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
// import tiepDonProvider from "data-access/tiepdon-provider";
import nbDotDieuTriProvider from "data-access/nb-dot-dieu-tri-provider";
export default {
  state: {
    listData: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSortColumn: {},
    dataSearch: {},
    chiTiet: true,
    // dsTrangThai: [10], // trạng thái tạo mới , mặc định
    dsKhoId: []
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch,state) => ({
    searchByParams: ({ page = 0, ...payload }, state) => {
      const obj = {
        ...payload
      }
      dispatch.lichSuKyDanhSachNguoiBenh.updateData({
        page: 0,
        dataSearch : {...state.lichSuKyDanhSachNguoiBenh.dataSearch , ...payload},
        ...obj,
      });
      dispatch.lichSuKyDanhSachNguoiBenh.getList({ ...obj })
    },
    onSizeChange: ({ dataSearch, tongHop,...rest }) => {
      dispatch.lichSuKyDanhSachNguoiBenh.updateData({
        page: 0,
        // dataSearch: dataSearch || {},
        ...rest,
      });
      if(tongHop){
        dispatch.lichSuKyDanhSachNguoiBenh.getListTongHop({ ...rest });
      } else {
        dispatch.lichSuKyDanhSachNguoiBenh.getList({ ...rest });
      }
    },
    getList: ({ page = 0, dataSortColumn, ...payload }, state) => {
      let size = payload?.size || state.lichSuKyDanhSachNguoiBenh.size || 10;
      const sort = combineSort(
        dataSortColumn || state.lichSuKyDanhSachNguoiBenh.dataSortColumn || {}
      );
      const dataSearch = {
        ...state.lichSuKyDanhSachNguoiBenh.dataSearch,
        ...payload,
      }
      nbDotDieuTriProvider
        .searchNBDotDieuTri({
          page, size,
          sort,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.lichSuKyDanhSachNguoiBenh.updateData({
            listData: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            }),
            totalElements: s?.totalElements || 0,
            page,
            size,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
        });
    },
    getListTongHop: ({ page = 0, dataSortColumn, ...payload }, state) => {
      let size = payload?.size || state.lichSuKyDanhSachNguoiBenh.size || 10;
      const sort = combineSort(
        dataSortColumn || state.lichSuKyDanhSachNguoiBenh.dataSortColumn || {}
      );
      const dataSearch = {
        ...state.lichSuKyDanhSachNguoiBenh.dataSearch,
        ...payload,
      }
      nbDotDieuTriProvider
        .searchNBDotDieuTriTongHop({
          page, size,
          sort,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.lichSuKyDanhSachNguoiBenh.updateData({
            listData: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            }),
            totalElements: s?.totalElements || 0,
            page,
            size,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
        });
    },
    searchThuocByParams: ({ page = 0, ...payload }, state) => {
      const obj = {
        ...payload
      }
      dispatch.lichSuKyDanhSachNguoiBenh.updateData({
        page: 0,
        ...obj,
      });
      dispatch.lichSuKyDanhSachNguoiBenh.getList({ ...obj })
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.lichSuKyDanhSachNguoiBenh.dataSortColumn,
        ...payload,
      };
      dispatch.lichSuKyDanhSachNguoiBenh.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.lichSuKyDanhSachNguoiBenh.getList({
        page: 0,
        dataSortColumn,
      });
    },
    postTaoMoi: ({ ...payload }, state) => {
      return new Promise((resolve, reject) => {
        thuocProvider
          .post(payload)
          .then((s) => {
            dispatch.thuocChiTiet.updateData({
              infoPatient: s?.data,
              nguoiBenhId: s?.data.phieuXuatId
            })
            return resolve(s?.data)
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
          });
      })
    },
  })
};
