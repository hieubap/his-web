import cacheUtils from "utils/cache-utils";
import phongThucHienProvider from "data-access/categories/dm-phong-thuc-hien-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import orderBy from "lodash/orderBy";

export default {
  state: {
    listAllDichVuPhong: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    dataSortColumn: { active: 2 },
    listDanhSachPhong: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getListAllDichVuPhong: ({ active = true, page = 0, size = 99999 }) => {
      return new Promise(async (resolve, reject) => {
        try {
          let listAllDichVuPhong = await cacheUtils.read(
            "",
            "DATA_DICH_VU_PHONG",
            [],
            false
          );
          dispatch.phongThucHien.updateData({ listAllDichVuPhong });
          phongThucHienProvider
            .search({ active })
            .then((s) => {
              let { data } = s;
              data = orderBy(data, "ten", "asc");
              if (JSON.stringify(data) !== JSON.stringify(listAllDichVuPhong)) {
                cacheUtils.save("", "DATA_DICH_VU_PHONG", data, false);
                dispatch.phongThucHien.updateData({
                  listAllDichVuPhong: data,
                });
              }
              resolve(data);
            })
            .catch((e) => {
              reject(e);
            });
        } catch (e) {
          reject(e);
        }
      });
    },
    getData: (
      { dichVuId, page = 0, size = 10, soPhieuId, nbDotDieuTriId, active , dataSortColumn, ...payload },
      state
    ) => {
      dispatch.phongThucHien.updateData({
        page: 0,
        size,
        dichVuId,
        soPhieuId,
        listData: [],
        totalElements: null,
      });
      if (nbDotDieuTriId) {
        return dispatch.phongThucHien.onSearchNotPagination({
          dichVuId,
          soPhieuId,
          nbDotDieuTriId,
        });
      }
      dispatch.phongThucHien.onSearch({
        page: 0,
        size,
        dichVuId,
        soPhieuId,
        nbDotDieuTriId,
        active,
        dataSortColumn
      });
    },

    onSizeChange: ({ size , active , dataSortColumn}, state) => {
      dispatch.phongThucHien.updateData({
        size,
        page: 0,
        dataSortColumn
      });
      dispatch.phongThucHien.onSearch({
        page: 0,
        size,
        active
      });
    },

    getListPhongTheoDichVu: ({ ...payload }, state) => {
      phongThucHienProvider
        .getDanhSachPhong({
          payload,
        })
        .then((s) => {
          dispatch.phongThucHien.updateData({
            listDanhSachPhong: s?.data,
            isLoading: false,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.phongThucHien.updateData({
            listDanhSachPhong: [],
            isLoading: false,
          });
        });
    },
    onSearchNotPagination: (
      { soPhieuId, nbDotDieuTriId, ...payload },
      state
    ) => {
      let newState = { isLoading: true };
      dispatch.phongThucHien.updateData(newState);
      // let page = state.phongThucHien.page || 0;
      const sort = combineSort(
        payload.dataSortColumn || state.phongThucHien.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.phongThucHien.dataSearch || {};

      const dichVuId = payload.hasOwnProperty("dichVuId")
        ? payload.dichVuId
        : state.phongThucHien.dichVuId;

      phongThucHienProvider
        .searchNotPagination({
          sort,
          dichVuId,
          soPhieuId,
          nbDotDieuTriId,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.phongThucHien.updateData({
            listData: (s?.data || []).map((item, index) => {
              item.index = index + 1;
              return item;
            }),
            isLoading: false,
            totalElements: s?.totalElements || 0,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.phongThucHien.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },

    onSearch: ({ page = 0, soPhieuId, nbDotDieuTriId, active,...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.phongThucHien.updateData(newState);
      let size = payload.size || state.phongThucHien.size || 10;
      // let page = state.phongThucHien.page || 0;
      const sort = combineSort(
        payload.dataSortColumn || state.phongThucHien.dataSortColumn || {}
        );
        console.log('state.phongThucHien.dataSortColumn: ', state.phongThucHien.dataSortColumn);
        console.log('payload.dataSortColumn: ', payload.dataSortColumn);
        console.log('sort: ', sort);
      const dataSearch =
        payload.dataSearch || state.phongThucHien.dataSearch || {};

      const dichVuId = payload.hasOwnProperty("dichVuId")
        ? payload.dichVuId
        : state.phongThucHien.dichVuId;

      phongThucHienProvider
        .search({
          page,
          size,
          sort,
          dichVuId,
          soPhieuId,
          nbDotDieuTriId,
          active,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.phongThucHien.updateData({
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
          dispatch.phongThucHien.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },

    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.phongThucHien.dataSortColumn,
        ...payload,
      };
      dispatch.phongThucHien.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.phongThucHien.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.phongThucHien.dataSearch || {}),
        ...payload,
      };
      dispatch.phongThucHien.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.phongThucHien.onSearch({
        page: 0,
        dataSearch,
      });
    },

    createOrEdit: ({ ...payload }, state) => {
      const {
        phongThucHien: { dataSortColumn },
      } = state;
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            phongThucHienProvider
              .update(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu phòng thực hiện!");

                let data = (state.phongThucHien.listData || []).map((item) => {
                  if (item.id === s.data?.id) {
                    s.data.index = item.index;
                    return s.data;
                  }
                  return item;
                });
                dispatch.phongThucHien.updateData({
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
            phongThucHienProvider
              .create(payload)
              .then((s) => {
                message.success("Thêm mới thành công dữ liệu phòng thực hiện!");
                dispatch.phongThucHien.updateData({
                  currentItem: null,
                  dataSortColumn: { active: 2 },
                });
                dispatch.phongThucHien.onSearch({
                  page: 0,
                  dataSortColumn: { active: 2 },
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
  }),
};
