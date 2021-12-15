import chuyenKhoaProvider from "data-access/categories/dm-chuyen-khoa-provider";
import { message } from "antd";
import cacheUtils from "utils/cache-utils";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";

export default {
  state: {
    listChuyenKhoa: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    currentChuyenKhoa: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    searchChuyenKhoa: async (payload = {}, state) => {
      try {
        const response = await chuyenKhoaProvider.search(payload);
        let {
          code,
          data: listChuyenKhoa,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.chuyenKhoa.searchChuyenKhoa({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.chuyenKhoa.updateData({
          listChuyenKhoa,
          totalElements,
          page,
          size,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    searchTongHop: async (payload = {}, state) => {
      try {
        const response = await chuyenKhoaProvider.searchTongHop(payload);
        let {
          code,
          data: listChuyenKhoa,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.chuyenKhoa.searchTongHop({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.chuyenKhoa.updateData({
          listChuyenKhoa,
          totalElements,
          page,
          size,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    getListTongHopChuyenKhoa: async (payload = {}, state) => {
      let listAllChuyenKhoa = await cacheUtils.read(
        "DATA_SPECIALIST",
        "",
        [],
        false
      );
      dispatch.chuyenKhoa.updateData({ listAllChuyenKhoa });
      chuyenKhoaProvider
        .searchTongHop({ page: "0", active: true })
        .then((s) => {
          let data = (s?.data || []).map((item, index) => {
            const { ma, ten, id } = item;
            return {
              ma,
              ten,
              id,
            };
          });
          if (JSON.stringify(data) !== JSON.stringify(listAllChuyenKhoa)) {
            dispatch.chuyenKhoa.updateData({ listAllChuyenKhoa: data });
            cacheUtils.save("DATA_SPECIALIST", "", data, false);
          }
        });
    },
    getListChuyenKhoa: async (payload = {}, state) => {
      let listAllChuyenKhoa = await cacheUtils.read(
        "DATA_SPECIALIST",
        "",
        [],
        false
      );
      dispatch.chuyenKhoa.updateData({ listAllChuyenKhoa });
      chuyenKhoaProvider.search({ page: "0", active: true }).then((s) => {
        let data = (s?.data || []).map((item, index) => {
          const { ma, ten, id } = item;
          return {
            ma,
            ten,
            id,
          };
        });
        if (JSON.stringify(data) !== JSON.stringify(listAllChuyenKhoa)) {
          dispatch.chuyenKhoa.updateData({ listAllChuyenKhoa: data });
          cacheUtils.save("DATA_SPECIALIST", "", data, false);
        }
      });
    },
    getListChuyenKhoaTongHop: async (payload = {}, state) => {
      let listAllChuyenKhoa = await cacheUtils.read(
        "DATA_SPECIALIST",
        "",
        [],
        false
      );
      dispatch.chuyenKhoa.updateData({ listAllChuyenKhoa });
      chuyenKhoaProvider
        .searchTongHop({ page: "0", active: true })
        .then((s) => {
          let data = (s?.data || []).map((item, index) => {
            const { ma, ten, id } = item;
            return {
              ma,
              ten,
              id,
            };
          });
          if (JSON.stringify(data) !== JSON.stringify(listAllChuyenKhoa)) {
            dispatch.chuyenKhoa.updateData({ listAllChuyenKhoa: data });
            cacheUtils.save("DATA_SPECIALIST", "", data, false);
          }
        });
    },
    createOrEdit: async (payload = {}, state) => {
      let response = {};
      try {
        if (payload.id) {
          response = await chuyenKhoaProvider.put(payload);
          dispatch.chuyenKhoa.updateData({
            dataEditDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu chuyên khoa!");
        } else {
          response = await chuyenKhoaProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu chuyên khoa!");
        }
        return response?.data;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },
    onDelete: async (payload, state) => {
      const {
        chuyenKhoa: { page, size },
      } = state;
      const response = await chuyenKhoaProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.chuyenKhoa.searchChuyenKhoa({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
    getById: (payload = {}, state) => {
      chuyenKhoaProvider
        .getById(payload)
        .then((s) => {
          dispatch.chuyenKhoa.updateData({ currentChuyenKhoa: s?.data });
        })
        .catch((e) =>
          dispatch.chuyenKhoa.updateData({ currentChuyenKhoa: {} })
        );
    },
  }),
};
