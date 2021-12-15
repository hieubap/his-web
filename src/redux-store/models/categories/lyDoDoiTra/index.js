import lyDoDoiTraProvider from "data-access/categories/dm-ly-do-doi-tra-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";

export default {
  state: {
    listLyDo: [],
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
    getListLyDo: async (payload = {}, state) => {
      try {
        const response = await lyDoDoiTraProvider.search(payload);
        let {
          code,
          data: listLyDo,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.lyDoDoiTra.getListLyDo({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.lyDoDoiTra.updateData({
          listLyDo,
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
          response = await lyDoDoiTraProvider.put(payload);
          dispatch.lyDoDoiTra.updateData({
            dataEditDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu lý do đổi trả DV!");
        } else {
          response = await lyDoDoiTraProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu lý do đổi trả DV!");
        }
        return response?.data;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },
    onDelete: async (payload, state) => {
      const {
        lyDoDoiTra: { page, size },
      } = state;
      const response = await lyDoDoiTraProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.lyDoDoiTra.getListLyDo({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
