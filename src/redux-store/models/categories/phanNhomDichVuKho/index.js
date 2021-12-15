import phanNhomDichVuKhoProvider from "data-access/categories/dm-phan-nhom-dich-vu-kho-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
export default {
  state: {
    listGroupMedicine: [],
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
    getListGroupMedicine: async (payload = {}, state) => {
      try {
        const response = await phanNhomDichVuKhoProvider.search(payload);
        let {
          code,
          data: listGroupMedicine,
          totalElements,
          message: messageInfo,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.phanNhomDichVuKho.getListGroupMedicine({
            page: page - 1,
            size,
          });
        }

        listGroupMedicine = listGroupMedicine.map((item, index) => ({
          ...item,
          stt: page * size + index + 1,
        }));
        dispatch.phanNhomDichVuKho.updateData({
          listGroupMedicine,
          totalElements,
          page,
          size,
        });
        return response;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    getListGroupMedicineTongHop: async (payload = {}, state) => {
      try {
        const response = await phanNhomDichVuKhoProvider.searchTongHop(payload);
        let {
          code,
          data: listGroupMedicine,
          totalElements,
          message: messageInfo,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.phanNhomDichVuKho.getListGroupMedicineTongHop({
            page: page - 1,
            size,
          });
        }

        listGroupMedicine = listGroupMedicine.map((item, index) => ({
          ...item,
          stt: page * size + index + 1,
        }));
        dispatch.phanNhomDichVuKho.updateData({
          listGroupMedicine,
          totalElements,
          page,
          size,
        });
        return response;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    createOrEdit: async (payload = {}, state) => {
      try {
        let response = {};
        if (payload.id) {
          response = await phanNhomDichVuKhoProvider.put(payload);
          dispatch.phanNhomDichVuKho.updateData({
            dataEditDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu phân nhóm thuốc!");
        } else {
          response = await phanNhomDichVuKhoProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu phân nhóm thuốc!");
        }
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
  }),
};
