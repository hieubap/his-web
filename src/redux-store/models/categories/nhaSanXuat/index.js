import nhaSanXuatProvider from "data-access/categories/dm-nha-san-xuat-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";

export default {
  state: {
    listNhaSanXuat: [],
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
    getListNhaSanXuat: async (payload = {}, state) => {
      try {
        const response = await nhaSanXuatProvider.search(payload);
        let {
          code,
          data,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;
        if (payload?.loaiNhaSanXuat === 10) {
          dispatch.nhaSanXuat.updateData({
            listNSX: data || [],
          });
        } else if (payload?.loaiNhaSanXuat === 20) {
          dispatch.nhaSanXuat.updateData({
            listNCC: data || [],
          });
        }
        return dispatch.nhaSanXuat.updateData({
          listNhaSanXuat: data,
          totalElements,
          page,
          size,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    getListTongHopNhaSanXuat: async (payload = {}, state) => {
      try {
        const response = await nhaSanXuatProvider.searchTongHop(payload);
        let {
          code,
          data,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;
        if (payload?.loaiNhaSanXuat === 10) {
          dispatch.nhaSanXuat.updateData({
            listNSX: data || [],
          });
        } else if (payload?.loaiNhaSanXuat === 20) {
          dispatch.nhaSanXuat.updateData({
            listNCC: data || [],
          });
        }
        return dispatch.nhaSanXuat.updateData({
          listNhaSanXuat: data,
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
          response = await nhaSanXuatProvider.put(payload);
          dispatch.nhaSanXuat.updateData({
            dataEditDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu NSX/ NCC!");
        } else {
          response = await nhaSanXuatProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu NSX/ NCC!");
        }
        return response?.data;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },
    onDelete: async (payload, state) => {
      const {
        nhaSanXuat: { page, size },
      } = state;
      const response = await nhaSanXuatProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.nhaSanXuat.getListNhaSanXuat({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
    getDetail: async (id, state) => {
      return new Promise((resolve, reject) => {
        nhaSanXuatProvider
          .detail(id)
          .then((s) => {
            if (s?.code == 0) resolve(s?.data);
            else reject(s);
          })
          .catch((e) => {
            console.log(e);
            reject(e);
          });
      });
    },
  }),
};
