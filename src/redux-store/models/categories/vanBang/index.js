import vanBangProvider from "data-access/categories/dm-van-bang-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";

export default {
  state: {
    listVanBang: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    searchVanBang: async (payload = {}, state) => {
      try {
        const response = await vanBangProvider.search(payload);
        let {
          code,
          data: listVanBang,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.vanBang.searchVanBang({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.vanBang.updateData({
          listVanBang,
          totalElements,
          page,
          size,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    searchVanBangTongHop: async (payload = {}, state) => {
      try {
        const response = await vanBangProvider.searchTongHop(payload);
        let {
          code,
          data: listVanBang,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.vanBang.searchVanBangTongHop({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.vanBang.updateData({
          listVanBang,
          totalElements,
          page,
          size,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    createOrEdit: async (payload = {}, state) => {
      let response = {};
      try {
        if (payload.id) {
          response = await vanBangProvider.put(payload);
          dispatch.vanBang.updateData({
            dataEditDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu VB chuyên môn!");
        } else {
          response = await vanBangProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu VB chuyên môn!");
        }
        return response?.data;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },
    onDelete: async (payload, state) => {
      const {
        vanBang: { page, size },
      } = state;
      const response = await vanBangProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.vanBang.searchVanBang({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
