import loaiBenhProvider from "data-access/categories/dm-loai-benh-provider";
import { message } from "antd";
import { SORT_DEFAULT } from "constants/page/therapyConstant";
import cacheUtils from "utils/cache-utils";
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
    dataSort: SORT_DEFAULT,
    listAllData: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSearch: async (payload = {}, state) => {
      try {
        const response = await loaiBenhProvider.search(payload);
        let {
          data: listData,
          totalElements: total,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.loaiBenh.onSearch({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.loaiBenh.updateData({
          listData,
          total,
          page,
          size,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    onSearchTongHop: async (payload = {}, state) => {
      try {
        const response = await loaiBenhProvider.searchTongHop(payload);
        let {
          data: listData,
          totalElements: total,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.loaiBenh.onSearchTongHop({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.loaiBenh.updateData({
          listData,
          total,
          page,
          size,
        });
      } catch (err) {
        message.error(
          err?.message.toString() == "Network Error"
            ? "Đang cập nhật hệ thống"
            : err?.message.toString() || "Xảy ra lỗi, vui lòng thử lại sau"
        );
        return Promise.reject(err);
      }
    },
    getData: (payload, state) => {
      const {
        loaiBenh: { page, size, dataSearch, dataSort },
      } = state;
      dispatch.loaiBenh.updateData({
        page,
        size,
        ...dataSearch,
        dataSort,
        ...payload,
      });
      dispatch.loaiBenh.onSearch({
        page,
        size,
        ...dataSearch,
        sort: combineSort(dataSort),
        ...payload,
      });
    },
    createOrEdit: async (payload = {}, state) => {
      let response = {};
      try {
        if (payload.id) {
          response = await loaiBenhProvider.put(payload);
          message.success("Cập nhật thành công dữ liệu loại bệnh!");
          dispatch.loaiBenh.getData({});
        } else {
          response = await loaiBenhProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu loại bệnh!");
          dispatch.loaiBenh.getData({
            page: 0,
          });
        }
        return response?.data;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },
    onDelete: async (payload, state) => {
      const {
        loaiBenh: { page, size },
      } = state;
      const response = await loaiBenhProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.loaiBenh.onSearch({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
    getAll: async ({ page = 0, size, active = true, ...payload }, state) => {
      let userId = state.auth.auth?.id;
      let list = [];
      if (!size && page === 0) {
        list = await cacheUtils.read(userId, `DATA_LOAI_BENH`, [], false);
        dispatch.loaiBenh.updateData({ listAllData: list });
      }
      return new Promise((resolve, reject) => {
        loaiBenhProvider
          .search({
            page,
            size: size || 99999,
            sort: "ten,asc",
            active,
            ...payload,
          })
          .then((s) => {
            if (s?.code === 0) {
              let data = (s?.data || []).map((item, index) => {
                const { ma, ten, id } = item;
                return {
                  ma,
                  ten,
                  id,
                };
              });
              if (JSON.stringify(data) !== JSON.stringify(list)) {
                dispatch.loaiBenh.updateData({ listAllData: data });
                if (!size && page === 0)
                  cacheUtils.save(userId, `DATA_LOAI_BENH`, data, false);
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
    getAllTongHop: async ({ page = 0, size, active = true, ...payload }, state) => {
      let userId = state.auth.auth?.id;
      let list = [];
      if (!size && page === 0) {
        list = await cacheUtils.read(userId, `DATA_LOAI_BENH_TONG_HOP`, [], false);
        dispatch.loaiBenh.updateData({ listAllData: list });
      }
      return new Promise((resolve, reject) => {
        loaiBenhProvider
          .searchTongHop({
            page,
            size: size || 99999,
            sort: "ten,asc",
            active,
            ...payload,
          })
          .then((s) => {
            if (s?.code === 0) {
              let data = (s?.data || []).map((item, index) => {
                const { ma, ten, id } = item;
                return {
                  ma,
                  ten,
                  id,
                };
              });
              if (JSON.stringify(data) !== JSON.stringify(list)) {
                dispatch.loaiBenh.updateData({ listAllData: data });
                if (!size && page === 0)
                  cacheUtils.save(userId, `DATA_LOAI_BENH_TONG_HOP`, data, false);
              }
              resolve(s);
            } else {
              reject(s);
              message.error(
                s?.message == "Network Error"
                  ? "Đang cập nhật hệ thống"
                  : s?.message || "Xảy ra lỗi, vui lòng thử lại sau"
              );
            }
          })
          .catch((e) => {
            reject(e);
            message.error(
              e?.message == "Network Error"
                ? "Đang cập nhật hệ thống"
                : e?.message || "Xảy ra lỗi, vui lòng thử lại sau"
            );
          });
      });
    },
  }),
};
