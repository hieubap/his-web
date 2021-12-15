import { message } from "antd";
import thuocKeNgoaiProvider from "data-access/categories/thuoc-ke-ngoai-provider";
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
    onSizeChange: ({ size, ...payload }, state) => {
      dispatch.thuocKeNgoai.updateData({
        size,
        page: 0,
      });
      return dispatch.thuocKeNgoai.onSearch({ page: 0, size, ...payload });
    },
    onSearch: (
      {
        page = 0,
        ten,
        khoaChiDinhId,
        boChiDinhId,
        isListAll,
        active,
        ...payload
      },
      state
    ) => {
      let newState = { isLoading: true, page };
      dispatch.thuocKeNgoai.updateData(newState);
      let size = payload.size || state.thuocKeNgoai.size || 10;
      // let page = state.goiDichVu.page || 0;
      const sort = combineSort(
        payload.dataSortColumn || state.thuocKeNgoai.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.thuocKeNgoai.dataSearch || {};
      return new Promise((resolve, reject) => {
        thuocKeNgoaiProvider
          .search({
            page,
            size,
            sort,
            ten,
            khoaChiDinhId,
            boChiDinhId,
            active,
            ...dataSearch,
          })
          .then((s) => {
            if (isListAll) {
              let list = (s?.data || []).map((item, index) => {
                item.index = page * size + index + 1;
                item.key = index;
                item.uniqueKey = `${item.id}-${item.dichVuId}`;
                return item;
              });
              dispatch.thuocKeNgoai.updateData({
                listAllData: list,
              });
              return resolve(list);
            } else {
              dispatch.thuocKeNgoai.updateData({
                listData: (s?.data || []).map((item, index) => {
                  item.index = page * size + index + 1;
                  return item;
                }),
                isLoading: false,
                totalElements: s?.totalElements || 0,
                page,
              });
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            dispatch.thuocKeNgoai.updateData({
              listData: [],
              isLoading: false,
            });
          });
      });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.thuocKeNgoai.dataSortColumn,
        ...payload,
      };
      delete dataSortColumn.createdAt;
      dispatch.thuocKeNgoai.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.thuocKeNgoai.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.thuocKeNgoai.dataSearch || {}),
        ...payload,
      };
      dispatch.thuocKeNgoai.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.thuocKeNgoai.onSearch({
        page: 0,
        dataSearch,
      });
    },

    createOrEdit: (options = {}, state) => {
      const { turnOfErrorMessage, ...payload } = options;
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            thuocKeNgoaiProvider
              .update(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu thuốc kê ngoài!");

                let data = (state.thuocKeNgoai.listData || []).map((item) => {
                  if (item.id === s.data?.id) {
                    s.data.index = item.index;
                    return s.data;
                  }
                  return item;
                });
                dispatch.thuocKeNgoai.updateData({
                  currentItem: null,
                  listData: data,
                  dataEditDefault: {
                    ...state.thuocKeNgoai.dataEditDefault,
                    ...payload,
                  },
                });
                return resolve(s);
              })
              .catch((e) => {
                !turnOfErrorMessage &&
                  message.error(
                    e?.message == "Network Error"
                      ? "Đang cập nhật hệ thống"
                      : e?.message || "Xảy ra lỗi, vui lòng thử lại sau",
                    3
                  );
                return reject(e?.message);
              });
          } else {
            thuocKeNgoaiProvider
              .create(payload)
              .then((s) => {
                message.success("Thêm mới thành công dữ liệu thuốc kê ngoài!");
                dispatch.thuocKeNgoai.updateData({
                  currentItem: null,
                  dataSortColumn: {
                    createdAt: 2,
                    ...state.thuocKeNgoai.dataSortColumn,
                  },
                });
                dispatch.thuocKeNgoai.onSearch({
                  page: 0,
                });
                return resolve(s);
              })
              .catch((e) => {
                !turnOfErrorMessage &&
                  message.error(
                    e?.message == "Network Error"
                      ? "Đang cập nhật hệ thống"
                      : e?.message || "Xảy ra lỗi, vui lòng thử lại sau",
                    3
                  );
                return reject(e?.message);
              });
          }
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
    getAllTongHop: async (
      { page = 0, size, active = true, ...payload },
      state
    ) => {
      let userId = state.auth.auth?.id;
      let list = [];
      if (!size && page === 0) {
        list = await cacheUtils.read(
          userId,
          `DATA_THUOC_CHI_DINH_NGOAI`,
          [],
          false
        );
        dispatch.thuocKeNgoai.updateData({ listAllData: list });
      }
      return new Promise((resolve, reject) => {
        thuocKeNgoaiProvider
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
                dispatch.thuocKeNgoai.updateData({ listAllData: data });
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
    // tongHop: async (id, state) => {
    //   return new Promise((resolve, reject) => {
    //     thuocKeNgoaiProvider
    //       .tongHop()
    //       .then((s) => {
    //         if (s?.code === 0) {
    //           let data = s?.data || [];
    //           dispatch.thuocKeNgoai.updateData({
    //             listPhieu: data
    //           })
    //           return resolve(s);
    //         } else {
    //           return reject(s);
    //           // message.error(
    //   s?.message == "Network Error"
    //     ? "Đang cập nhật hệ thống"
    //     : s?.message || "Xảy ra lỗi, vui lòng thử lại sau"
    // );
    //         }
    //       })
    //       .catch((e) => {
    //         return reject(e);
    //       });
    //   });
    // },
  }),
};
