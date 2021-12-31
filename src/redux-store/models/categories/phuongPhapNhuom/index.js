import phuongPhapNhuomProvider from "data-access/categories/dm-phuong-phap-nhom-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";

export default {
  state: {
    listMethodDyeing: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    listDataTongHop: []
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getListMethodDyeing: async (payload = {}, state) => {
      try {
        const response = await phuongPhapNhuomProvider.search(payload);
        let {
          data: listMethodDyeing,
          totalElements,
          message: messageInfo,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.phuongPhapNhuom.getListMethodDyeing({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.phuongPhapNhuom.updateData({
          listMethodDyeing,
          totalElements,
          page,
          size,
        });
      } catch (err) {
        message.error(err?.message.toString());
        return Promise.reject(err);
      }
    },
    createOrEdit: async (payload = {}, state) => {
      try {
        let response = {};
        if (payload.id) {
          response = await phuongPhapNhuomProvider.put(payload);
          dispatch.phuongPhapNhuom.updateData({
            dataEditDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu phương pháp nhuộm!");
        } else {
          response = await phuongPhapNhuomProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu phương pháp nhuộm!");
        }
      } catch (err) {
        message.error(err?.message.toString());
        return Promise.reject(err);
      }
    },
    onDelete: async (payload, state) => {
      const {
        phuongPhapNhuom: { page, size },
      } = state;
      const response = await phuongPhapNhuomProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.phuongPhapNhuom.getListMethodDyeing({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
    getDataTongHop: ({ page = 0, size = 10, ...payload }, state) => {
      phuongPhapNhuomProvider.searchTongHop({
        page: 0,
        size,
      }).then((s) => {
        dispatch.phuongPhapNhuom.updateData({
         listDataTongHop : s?.data
        });
      });
    },
  }),
};
