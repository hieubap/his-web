import cacheUtils from "utils/cache-utils";
import quyenKyProvider from "data-access/categories/dm-quyen-ky-provider";
import orderBy from "lodash/orderBy";
import { message } from "antd";

import baoCaoProvider from "data-access/categories/dm-bao-cao-provider";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";

export default {
  state: {
    listQuyenKy: [],
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
    getQuyenKy: ({ page = 0, ...payload }, state) => {
      console.log("payload: ", payload);
      console.log("page: ", page);
      return new Promise(async (resolve, reject) => {
        quyenKyProvider
          .searchBaoCao({ page, ...payload })
          .then((s) => {
            console.log("s: ", s);
            if (s?.code === 0) {
              dispatch.quyenKy.updateData({
                listQuyenKy: s?.data,
              });
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },

    onSizeChange: ({ size }, state) => {
      dispatch.quyenKy.updateData({
        size,
        page: 0,
      });
      dispatch.quyenKy.onSearch({ page: 0, size });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.quyenKy.updateData(newState);
      let size = payload.size || state.quyenKy.size || 10;
      // let page = state.goiDichVu.page || 0;
      const sort = combineSort(
        payload.dataSortColumn || state.quyenKy.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.quyenKy.dataSearch || {};

      quyenKyProvider
        .search({ page, size, sort, ...dataSearch })
        .then((s) => {
          dispatch.quyenKy.updateData({
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
          dispatch.quyenKy.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.quyenKy.dataSortColumn,
        ...payload,
      };
      delete dataSortColumn.createdAt;
      dispatch.quyenKy.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.quyenKy.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.quyenKy.dataSearch || {}),
        ...payload,
      };
      dispatch.quyenKy.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.quyenKy.onSearch({
        page: 0,
        dataSearch,
      });
    },

    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            quyenKyProvider
              .update(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu báo cáo!");

                let data = (state.quyenKy.listData || []).map((item) => {
                  if (item.id === s.data?.id) {
                    s.data.index = item.index;
                    return s.data;
                  }
                  return item;
                });
                dispatch.quyenKy.updateData({
                  currentItem: null,
                  listData: data,
                });
                resolve();
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject();
              });
          } else {
            quyenKyProvider
              .create(payload)
              .then((s) => {
                message.success("Thêm mới thành công dữ liệu báo cáo!");
                dispatch.quyenKy.updateData({
                  currentItem: null,
                  dataSortColumn: {
                    createdAt: 2,
                  },
                });
                dispatch.quyenKy.onSearch({
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
    getAll: async ({ page = 0, size, active = true, ...payload }, state) => {
      let userId = state.auth.auth?.id;
      let list = [];
      if (!size && page === 0) {
        list = await cacheUtils.read(userId, `DATA_QUYEN_KY`, [], false);
        dispatch.quyenKy.updateData({ listAllData: list });
      }
      return new Promise((resolve, reject) => {
        quyenKyProvider
          .search({
            page,
            size: size || 99999,
            sort: "ten,asc",
            active,
            ...payload,
          })
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              if (JSON.stringify(data) !== JSON.stringify(list)) {
                dispatch.quyenKy.updateData({ listAllData: data });
                if (!size && page === 0)
                  cacheUtils.save(userId, `DATA_QUYEN_KY`, data, false);
              }
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
    delete: (id) => {
      return new Promise((resolve, reject) => {
        quyenKyProvider
          .delete(id)
          .then((s) => {
            console.log("s: ", s);
            message.success("Xóa bản ghi thành công");
            dispatch.quyenKy.updateData({
              currentItem: null,
              listData: s.data,
            });
            resolve();
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject();
          });
      });
    },
  }),
};
