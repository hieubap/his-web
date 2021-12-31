import mauKetQuaCDHAProvider from "data-access/categories/mau-ket-qua-cdha-tdcn-pt-tt-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import { SORT_DEFAULT } from "constants/page/therapyConstant";
import cacheUtils from "utils/cache-utils";
export default {
  state: {
    listData: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    dataSortColumn: SORT_DEFAULT,
    listDataTongHop: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getData: ({ page = 0, size = 10, ...payload }, state) => {
      dispatch.mauKetQuaCDHA.updateData({
        page: 0,
        size,
      });
      dispatch.mauKetQuaCDHA.onSearch({
        page: 0,
        size,
      });
    },

    onSizeChange: ({ size }, state) => {
      dispatch.mauKetQuaCDHA.updateData({
        size,
        page: 0,
      });
      dispatch.mauKetQuaCDHA.onSearch({
        page: 0,
        size,
      });
    },

    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.mauKetQuaCDHA.updateData(newState);
      let size = payload.size || state.mauKetQuaCDHA.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.mauKetQuaCDHA.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.mauKetQuaCDHA.dataSearch || {};
      mauKetQuaCDHAProvider
        .search({
          page,
          size,
          sort,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.mauKetQuaCDHA.updateData({
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
          dispatch.mauKetQuaCDHA.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },

    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.mauKetQuaCDHA.dataSortColumn,
        ...payload,
      };
      delete dataSortColumn.createdAt;
      dispatch.mauKetQuaCDHA.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.mauKetQuaCDHA.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.mauKetQuaCDHA.dataSearch || {}),
        ...payload,
      };
      dispatch.mauKetQuaCDHA.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.mauKetQuaCDHA.onSearch({
        page: 0,
        dataSearch,
      });
    },

    createOrEdit: ({ ...payload }, state) => {
      const {
        mauKetQuaCDHA: { dataSortColumn },
      } = state;
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            mauKetQuaCDHAProvider
              .update(payload)
              .then((s) => {
                message.success(
                  "Cập nhật thành công dữ liệu mẫu kết quả xét nghiệm!"
                );

                let data = (state.mauKetQuaCDHA.listData || []).map((item) => {
                  if (item.id === s.data?.id) {
                    s.data.index = item.index;
                    return s.data;
                  }
                  return item;
                });
                dispatch.mauKetQuaCDHA.updateData({
                  currentItem: null,
                  listData: data.sort((a, b) => b.active - a.active),
                  dataSortColumn,
                });
                resolve(s.data);
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject(e);
              });
          } else {
            mauKetQuaCDHAProvider
              .create(payload)
              .then((s) => {
                message.success(
                  "Thêm mới thành công dữ liệu mẫu kết quả chẩn hình ảnh!"
                );
                dispatch.mauKetQuaCDHA.updateData({
                  currentItem: null,
                  dataSortColumn: { createdAt: 2 },
                });
                dispatch.mauKetQuaCDHA.onSearch({
                  page: 0,
                });
                resolve(s?.data);
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject(e);
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
        list = await cacheUtils.read(userId, `DATA_MAU_KET_QUA_CDHA`, [], false);
        dispatch.mauKetQuaCDHA.updateData({ listAllData: list });
      }
      return new Promise((resolve, reject) => {
        mauKetQuaCDHAProvider
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
                dispatch.mauKetQuaCDHA.updateData({ listAllData: data });
                if (!size && page === 0)
                  cacheUtils.save(userId, `DATA_MAU_KET_QUA_CDHA`, data, false);
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
    getDataTongHop: ({ page = 0, size = 10, ...payload }, state) => {
      mauKetQuaCDHAProvider
        .searchTongHop({
          page: 0,
          size,
        })
        .then((s) => {
          dispatch.mauKetQuaCDHA.updateData({
            listDataTongHop: s?.data,
          });
        });
    },
  }),
};
