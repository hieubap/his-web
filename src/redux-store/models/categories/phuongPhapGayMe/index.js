import methodAnesthesiaProvider from "data-access/categories/dm-phuong-phap-gay-me-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";

export default {
  state: {
    listMethodAnesthesia: [],
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
    getListMethodAnesthesia: async (payload = {}, state) => {
      try {
        const response = await methodAnesthesiaProvider.search(payload);
        let {
          data: listMethodAnesthesia,
          totalElements,
          message: messageInfo,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.phuongPhapGayMe.getListMethodAnesthesia({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.phuongPhapGayMe.updateData({
          listMethodAnesthesia,
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
      try {
        let response = {};
        if (payload.id) {
          response = await methodAnesthesiaProvider.put(payload);
          dispatch.phuongPhapGayMe.updateData({
            dataEditDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu phương pháp gây mê!");
        } else {
  
          response = await methodAnesthesiaProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu phương pháp gây mê!");
        }
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    onDelete: async (payload, state) => {
      const {
        phuongPhapGayMe: { page, size },
      } = state;
      const response = await methodAnesthesiaProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.phuongPhapGayMe.getListMethodAnesthesia({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
