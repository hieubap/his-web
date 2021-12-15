import suppliesGroupProvider from "data-access/categories/nhom-dich-vu-kho-cap-1-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";

export default {
  state: {
    listSuppliesGroup: [],
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
    getListSuppliesGroup: async (payload = {}, state) => {
      payload = { ...payload };
      try {
        const response = await suppliesGroupProvider.search(payload);
        let {
          data: listSuppliesGroup,
          totalElements,
          message: messageInfo,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.nhomHoatChat.getListSuppliesGroup({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.nhomHoatChat.updateData({
          listSuppliesGroup,
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
      payload = { ...payload, loaiDichVu: 110 };
      let response = {};
      try {
        if (payload.id) {
          response = await suppliesGroupProvider.put(payload);
          dispatch.nhomHoatChat.updateData({
            dataEditDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu nhóm hóa chất!");
        } else {
          response = await suppliesGroupProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu nhóm hóa chất!");
        }
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    onDelete: async (payload, state) => {
      const {
        nhomHoatChat: { page, size },
      } = state;
      const response = await suppliesGroupProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.thoiGianCapCuu.getListSuppliesGroup({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
