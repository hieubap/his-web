import dichVuCap3TongHopProvider from "data-access/categories/dm-dich-vu-cap3-tong-hop-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
export default {
  state: {
    listData: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    dataSortColumn: { active: 2 },
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getData: ({ page = 0, size = 10, ...payload }, state) => {
      dispatch.dichVuTongHop.updateData({
        page: 0,
        size,
        ...payload,
      });
      dispatch.dichVuTongHop.onSearch({
        page: 0,
        size,
        ...payload,
      });
    },
    onSizeChange: ({ size }, state) => {
      dispatch.dichVuTongHop.updateData({
        size,
        page: 0,
      });
      dispatch.dichVuTongHop.onSearch({
        page: 0,
        size,
      });
    },

    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.dichVuTongHop.updateData(newState);
      let size = payload.size || state.dichVuTongHop.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.dichVuTongHop.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.dichVuTongHop.dataSearch || {};
      dichVuCap3TongHopProvider
        .search({
          page,
          size,
          sort,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.dichVuTongHop.updateData({
            listData: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            }),
            isLoading: false,
            totalElements: s?.totalElements || 0,
            page,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.dichVuTongHop.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },

    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.dichVuTongHop.dataSortColumn,
        ...payload,
      };
      dispatch.dichVuTongHop.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.dichVuTongHop.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.dichVuTongHop.dataSearch || {}),
        ...payload,
      };
      dispatch.dichVuTongHop.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.dichVuTongHop.onSearch({
        page: 0,
        dataSearch,
      });
    },
  }),
};
