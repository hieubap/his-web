import nbHoaDonDienTu from "data-access/nb-hoa-don-dien-tu-provider";
import utils from "data-access/utils-provider";
import cacheUtils from "utils/cache-utils";
import { message } from "antd";
import { PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import { reject } from "lodash";

export default {
  state: {
    listData: [],
    chuaThanhToan: 0,
    daThanhToan: 0,
    tongSo: 0,
    totalElements: 0,
    page: PAGE_DEFAULT,
    size: 10,
    dataSearch: {},
    dataSortColumn: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getStatistical: (dataSearch) => {
      nbHoaDonDienTu
        .getStatistical(dataSearch)
        .then((s) => {
          dispatch.dsHoaDonDienTu.updateData(s.data);
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
        });
    },
    onSizeChange: ({ size }, state) => {
      dispatch.dsHoaDonDienTu.updateData({
        size,
        page: 0,
      });
      dispatch.dsHoaDonDienTu.onSearch({
        page: 0,
        size,
      });
    },

    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.dsHoaDonDienTu.updateData(newState);
      let size = payload?.size || state.dsHoaDonDienTu?.size;
      const sort = combineSort(
        payload?.dataSortColumn || state.dsHoaDonDienTu?.dataSortColumn || {}
      );
      const dataSearch =
        payload?.dataSearch || state?.dsHoaDonDienTu?.dataSearch || {};
      return new Promise((resolve, reject) => {
        nbHoaDonDienTu
          .search({ page, size, sort, ...dataSearch })
          .then((s) => {
            dispatch.dsHoaDonDienTu.updateData({
              listData: s.data,
              totalElements: s?.totalElements || 0,
              page,
            });
            resolve(s.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            dispatch.dsHoaDonDienTu.updateData({
              listData: [],
              isLoading: false,
            });
          });
      });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.dsHoaDonDienTu.dataSortColumn,
        ...payload,
      };
      dispatch.dsHoaDonDienTu.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.dsHoaDonDienTu.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.dsHoaDonDienTu.dataSearch || {}),
        ...payload,
      };
      dispatch.dsHoaDonDienTu.updateData({
        page: 0,
        dataSearch: dataSearch,
      });
      dispatch.dsHoaDonDienTu.onSearch({
        page: 0,
        dataSearch,
      });
    },
    getDsDichVu: ({ id }) => {
      return new Promise((resolve, reject) => {
        nbHoaDonDienTu
          .getDsDichVu({ nbDotDieuTriId: id })
          .then((s) => {
            resolve(s);
          })
          .catch((s) => {
            reject("");
          });
      });
    },
  }),
};
