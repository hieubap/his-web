import duongDungProvider from "data-access/categories/dm-duong-dung-provider";
import { message } from "antd";

export default {
  state: {
    listDuongDung: [],
    totalElements: null,
    page: 0,
    size: 10,
    dataEditDefault: {},
    dataSearch: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    searchDuongDung: async (payload = {}, state) => {
      try {
        const response = await duongDungProvider.search(payload);
        let {
          data: listDuongDung,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.duongDung.searchDuongDung({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.duongDung.updateData({
          listDuongDung,
          totalElements,
          page,
          size,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    searchDuongDungTongHop: async (payload = {}, state) => {
      try {
        const response = await duongDungProvider.searchTongHop(payload);
        let {
          data: listDuongDung,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.duongDung.searchDuongDungTongHop({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.duongDung.updateData({
          listDuongDung,
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
          response = await duongDungProvider.put(payload);
          dispatch.duongDung.updateData({
            dataEditDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu đường dùng!");
        } else {
          response = await duongDungProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu đường dùng!");
        }
        return response?.data;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },
    onDelete: async (payload, state) => {
      const {
        duongDung: { page, size },
      } = state;
      const response = await duongDungProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.duongDung.searchDuongDung({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
