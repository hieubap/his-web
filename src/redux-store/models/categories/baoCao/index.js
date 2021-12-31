import { message } from "antd";
import baoCaoProvider from "data-access/categories/dm-bao-cao-provider";
import baoCaoChanKyProvider from "data-access/categories/dm-bao-cao-chan-ky-provider";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import cacheUtils from "utils/cache-utils";
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
    onSizeChange: ({ size }, state) => {
      dispatch.baoCao.updateData({
        size,
        page: 0,
      });
      dispatch.baoCao.onSearch({ page: 0, size });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.baoCao.updateData(newState);
      let size = payload.size || state.baoCao.size || 10;
      // let page = state.goiDichVu.page || 0;
      const sort = combineSort(
        payload.dataSortColumn || state.baoCao.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.baoCao.dataSearch || {};

      baoCaoProvider
        .search({ page, size, sort, ...dataSearch })
        .then((s) => {
          dispatch.baoCao.updateData({
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
          dispatch.baoCao.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    // onSearch2: ({ page = 0, ...payload }, state) => {
    //   let newState = { isLoading: true, page };
    //   dispatch.baoCao.updateData({dataSearch: {...state.baoCao.}});
    //   let size = payload.size || state.baoCao.size || 10;
    //   const sort = combineSort(
    //     payload.dataSortColumn || state.baoCao.dataSortColumn || {}
    //   );
    //   const dataSearch = payload.dataSearch || state.baoCao.dataSearch || {};

    //   baoCaoProvider
    //     .search({ page, size, sort, ...dataSearch })
    //     .then((s) => {
    //       dispatch.baoCao.updateData({
    //         listData: (s?.data || []).map((item, index) => {
    //           item.index = page * size + index + 1;
    //           return item;
    //         }),
    //         isLoading: false,
    //         totalElements: s?.totalElements || 0,
    //         page,
    //       });
    //     })
    //     .catch((e) => {
    //       message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
    //       dispatch.baoCao.updateData({
    //         listData: [],
    //         isLoading: false,
    //       });
    //     });
    // },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.baoCao.dataSortColumn,
        ...payload,
      };
      dispatch.baoCao.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.baoCao.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.baoCao.dataSearch || {}),
        ...payload,
      };
      dispatch.baoCao.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.baoCao.onSearch({
        page: 0,
        dataSearch,
      });
    },

    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            baoCaoProvider
              .update(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu báo cáo!", 20);

                let data = (state.baoCao.listData || []).map((item) => {
                  if (item.id === s.data?.id) {
                    s.data.index = item.index;
                    return s.data;
                  }
                  return item;
                });
                dispatch.baoCao.updateData({
                  currentItem: null,
                  listData: data,
                  dataEditDefault: { ...state.baoCao.dataEditDefault, payload },
                });
                resolve();
              })
              .catch((e) => {
                console.log(e.message);
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject();
              });
          } else {
            baoCaoProvider
              .create(payload)
              .then((s) => {
                message.success("Thêm mới thành công dữ liệu báo cáo!", 20);
                dispatch.baoCao.updateData({ currentItem: null });
                dispatch.baoCao.onSearch({
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
        list = await cacheUtils.read(userId, `DATA_BAO_CAO`, [], false);
        dispatch.baoCao.updateData({ listAllData: list });
      }
      return new Promise((resolve, reject) => {
        baoCaoProvider
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
                dispatch.baoCao.updateData({ listAllData: data });
                if (!size && page === 0)
                  cacheUtils.save(userId, `DATA_BAO_CAO`, data, false);
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
    getAllTongHop: async (
      { page = 0, size, active = true, ...payload },
      state
    ) => {
      let userId = state.auth.auth?.id;
      let list = [];
      if (!size && page === 0) {
        list = await cacheUtils.read(userId, `DATA_BAO_CAO`, [], false);
        dispatch.baoCao.updateData({ listAllData: list });
      }
      return new Promise((resolve, reject) => {
        baoCaoProvider
          .searchTongHop({
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
                dispatch.baoCao.updateData({ listAllData: data });
                if (!size && page === 0)
                  cacheUtils.save(userId, `DATA_BAO_CAO`, data, false);
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
    createThietLapChanKy: async (payload, state) => {
      return new Promise((resolve, reject) => {
        baoCaoChanKyProvider
          .create(payload)
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              dispatch.baoCao.updateData({
                dataChanKy: data,
              });
              message.success("Thêm mới thành công dữ liệu thiết lập chân ký!");
              return resolve(s);
            } else {
              message.error(s?.message);
              return reject(s);
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            return reject(e);
          });
      });
    },
    patchThietLapChanKy: async (payload, state) => {
      return new Promise((resolve, reject) => {
        baoCaoChanKyProvider
          .patch(payload)
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              message.success("Cập nhật thành công dữ liệu thiết lập chân ký!");
              dispatch.baoCao.updateData({
                dataChanKy: data,
              });
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
    getByBaoCaoId: async (id, state) => {
      return new Promise((resolve, reject) => {
        baoCaoChanKyProvider
          .getByBaoCaoId(id)
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              dispatch.baoCao.updateData({
                dataChanKy: data,
              });
              return resolve(s);
            } else {
              dispatch.baoCao.updateData({
                dataChanKy: null,
              });
              return reject(s);
              // message.error(
              //   s?.message == "Network Error"
              //     ? "Đang cập nhật hệ thống"
              //     : s?.message || "Xảy ra lỗi, vui lòng thử lại sau"
              // );
            }
          })
          .catch((e) => {
            dispatch.baoCao.updateData({
              dataChanKy: null,
            });
            return reject(e);
            // message.error(e?.message);
          });
      });
    },
    tongHop: async (id, state) => {
      return new Promise((resolve, reject) => {
        baoCaoProvider
          .tongHop()
          .then((s) => {
            if (s?.code === 0) {
              let data = s?.data || [];
              dispatch.baoCao.updateData({
                listPhieu: data,
              });
              return resolve(s);
            } else {
              return reject(s);
              // message.error(
              //   s?.message == "Network Error"
              //     ? "Đang cập nhật hệ thống"
              //     : s?.message || "Xảy ra lỗi, vui lòng thử lại sau"
              // );
            }
          })
          .catch((e) => {
            return reject(e);
          });
      });
    },
  }),
};
