import { message } from "antd";
import vaiTroProvider from "data-access/categories/dm-vai-tro-provider";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";

export default {
  state: {
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    listData: [],
    dataSortColumn: { active: 2, ma: 1, updatedOn: 2 },
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: (size, state) => {
      dispatch.adminVaiTroHeThong.updateData({
        size,
        page: 0,
      });
      dispatch.adminVaiTroHeThong.onSearch({ page: 0, size });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.adminVaiTroHeThong.updateData(newState);
      let size = payload.size || state.adminVaiTroHeThong.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.adminVaiTroHeThong.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.adminVaiTroHeThong.dataSearch || {};

      vaiTroProvider
        .search({ page, size, sort, active: true, ...dataSearch })
        .then((s) => {
          dispatch.adminVaiTroHeThong.updateData({
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
          dispatch.adminVaiTroHeThong.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    onSearchTongHop: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.adminVaiTroHeThong.updateData(newState);
      let size = payload.size || state.adminVaiTroHeThong.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.adminVaiTroHeThong.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.adminVaiTroHeThong.dataSearch || {};

      vaiTroProvider
        .searchTongHop({ page, size, sort, active: true, ...dataSearch })
        .then((s) => {
          dispatch.adminVaiTroHeThong.updateData({
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
          dispatch.adminVaiTroHeThong.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.adminVaiTroHeThong.dataSortColumn,
        ...payload,
      };
      delete dataSortColumn.createdAt;
      dispatch.adminVaiTroHeThong.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.adminVaiTroHeThong.onSearch({
        page: 0,
        dataSortColumn,
      });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.adminVaiTroHeThong.dataSearch || {}),
        ...payload,
      };
      dispatch.adminVaiTroHeThong.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.adminVaiTroHeThong.onSearch({
        page: 0,
        dataSearch,
      });
    },

    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            vaiTroProvider
              .update(payload)
              .then((s) => {
                message.success(
                  "Cập nhật thành công dữ liệu vai trò hệ thống!"
                );
                dispatch.adminVaiTroHeThong.onSearch({
                  page: 0,
                });
                resolve();
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject();
              });
          } else {
            vaiTroProvider
              .create(payload)
              .then((s) => {
                message.success(
                  "Thêm mới thành công dữ liệu vai trò hệ thống!"
                );
                dispatch.adminVaiTroHeThong.updateData({
                  dataSortColumn: {
                    createdAt: 2,
                  },
                });
                dispatch.adminVaiTroHeThong.onSearch({
                  page: 0,
                });
                resolve();
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject();
              });
          }
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
  }),
};
