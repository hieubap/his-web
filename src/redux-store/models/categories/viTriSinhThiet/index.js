import viTriSinhThietProvider from "data-access/categories/dm-vi-tri-sinh-thiet-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";

export default {
  state: {
    listBiopsyPosition: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    listDataTongHop: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getListBiopsyPosition: async (payload = {}, state) => {
      try {
        const response = await viTriSinhThietProvider.search(payload);
        let {
          data: listBiopsyPosition,
          totalElements,
          message: messageInfo,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.viTriSinhThiet.geListBiopsyPosition({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.viTriSinhThiet.updateData({
          listBiopsyPosition,
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
          response = await viTriSinhThietProvider.put(payload);
          dispatch.viTriSinhThiet.updateData({
            dataEditDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu vị trí sinh thiết!");
        } else {
          response = await viTriSinhThietProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu vị trí sinh thiết!");
        }
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    onDelete: async (payload, state) => {
      const {
        viTriSinhThiet: { page, size },
      } = state;
      const response = await viTriSinhThietProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.viTriSinhThiet.geListBiopsyPosition({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
    getDataTongHop: ({ page = 0, size = 10, ...payload }, state) => {
      viTriSinhThietProvider
        .searchTongHop({
          page: 0,
          size,
        })
        .then((s) => {
          dispatch.viTriSinhThiet.updateData({
            listDataTongHop: s?.data,
          });
        });
    },
  }),
};
