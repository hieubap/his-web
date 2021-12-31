import { message } from "antd";
import cacheUtils from "utils/cache-utils";
import danhMucQuyenProvider from "data-access/categories/dm-quyen-provider";
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
    onGetAll: async (payload, state) => {
      let listAllData = await cacheUtils.read("DM_QUYEN", "", [], false);
      dispatch.quyen.updateData({ listAllData });
      danhMucQuyenProvider.search({ size: 9999, ...payload }).then((s) => {
        let data = (s?.data || []).map((item) => ({
          ...item,
          tenNhomTinhNang: item?.nhomTinhNang?.ten,
        }));
        if (JSON.stringify(data) !== JSON.stringify(listAllData)) {
          dispatch.quyen.updateData({ listAllData: data });
          cacheUtils.save("DM_QUYEN", "", data, false);
        }
      });
    },
    onSizeChange: (size, state) => {
      dispatch.quyen.updateData({
        size,
        page: 0,
      });
      dispatch.quyen.onSearch({ page: 0, size });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let size = payload.size || state.quyen.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.quyen.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.quyen.dataSearch || {};

      danhMucQuyenProvider
        .search({ page, size, sort, ...dataSearch })
        .then((s) => {
          dispatch.quyen.updateData({
            listData: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            }),
            totalElements: s?.totalElements || 0,
            page,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.quyen.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.quyen.dataSortColumn,
        ...payload,
      };
      delete dataSortColumn.createdAt;
      dispatch.quyen.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.quyen.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.quyen.dataSearch || {}),
        ...payload,
      };
      dispatch.quyen.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.quyen.onSearch({
        page: 0,
        dataSearch,
      });
    },

    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            danhMucQuyenProvider
              .update(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu quyền!");
                dispatch.quyen.onSearch({
                  page: 0,
                });
                resolve();
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject();
              });
          } else {
            danhMucQuyenProvider
              .create(payload)
              .then((s) => {
                message.success("Thêm mới thành công dữ liệu quyền!");
                dispatch.quyen.updateData({
                  dataSortColumn: {
                    createdAt: 2,
                  },
                });
                dispatch.quyen.onSearch({
                  page: 0,
                  dataSortColumn: {
                    createdAt: 2,
                  },
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
