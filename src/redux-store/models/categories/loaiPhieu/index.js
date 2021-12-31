import cacheUtils from "utils/cache-utils";
import loaiPhieuProvider from "data-access/categories/dm-loai-phieu-provider.js";
import orderBy from "lodash/orderBy";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";

export default {
  state: {
    listloaiPhieu: [],
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
    onSizeChange: ({ size }, state) => {
      dispatch.loaiPhieu.updateData({
        size,
        page: 0,
      });
      dispatch.loaiPhieu.onSearch({ page: 0, size });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.loaiPhieu.updateData(newState);
      let size = payload.size || state.loaiPhieu.size || 10;
      // let page = state.goiDichVu.page || 0;
      const sort = combineSort(
        payload.dataSortColumn || state.loaiPhieu.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.loaiPhieu.dataSearch || {};

      loaiPhieuProvider
        .search({ page, size, sort, ...dataSearch })
        .then((s) => {
          dispatch.loaiPhieu.updateData({
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
          dispatch.loaiPhieu.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    onSizeChangeTongHop: ({ size }, state) => {
      dispatch.loaiPhieu.updateData({
        size,
        page: 0,
      });
      dispatch.loaiPhieu.onSearchTongHop({ page: 0, size });
    },
    onSearchTongHop: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.loaiPhieu.updateData(newState);
      let size = payload.size || state.loaiPhieu.size || 10;
      // let page = state.goiDichVu.page || 0;
      const sort = combineSort(
        payload.dataSortColumn || state.loaiPhieu.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.loaiPhieu.dataSearch || {};

      loaiPhieuProvider
        .searchBaoCao({ page, size, sort, ...dataSearch })
        .then((s) => {
          dispatch.loaiPhieu.updateData({
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
          dispatch.loaiPhieu.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.loaiPhieu.dataSortColumn,
        ...payload,
      };
      dispatch.loaiPhieu.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.loaiPhieu.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.loaiPhieu.dataSearch || {}),
        ...payload,
      };
      dispatch.loaiPhieu.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.loaiPhieu.onSearch({
        page: 0,
        dataSearch,
      });
    },

    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            loaiPhieuProvider
              .update(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu báo cáo!");

                let data = (state.loaiPhieu.listData || []).map((item) => {
                  if (item.id === s.data?.id) {
                    s.data.index = item.index;
                    return s.data;
                  }
                  return item;
                });
                dispatch.loaiPhieu.updateData({
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
            loaiPhieuProvider
              .create(payload)
              .then((s) => {
                message.success("Thêm mới thành công dữ liệu báo cáo!");
                dispatch.loaiPhieu.updateData({
                  currentItem: null,
                  dataSortColumn: {
                    createdAt: 2,
                  },
                });
                dispatch.loaiPhieu.onSearch({
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
        dispatch.loaiPhieu.updateData({ listAllData: list });
      }
      return new Promise((resolve, reject) => {
        loaiPhieuProvider
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
                dispatch.loaiPhieu.updateData({ listAllData: data });
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
        loaiPhieuProvider
          .delete(id)
          .then((s) => {
            console.log("s: ", s);
            message.success("Xóa bản ghi thành công");
            dispatch.loaiPhieu.updateData({
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
