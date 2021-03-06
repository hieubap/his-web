import phanLoaiThuocProvider from "data-access/categories/dm-phan-loai-thuoc-provider";
import { message } from "antd";
export default {
  state: {},
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getListPhanLoaiThuoc: async (payload = {}, state) => {
      try {
        const response = await phanLoaiThuocProvider.search({
          sort: "active,desc&createdAt,desc&ma,asc",
          ...payload,
        });
        let {
          data: listPhanLoaiThuoc,
          totalElements,
          message: messageInfo,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.phanLoaiThuoc.getListPhanLoaiThuoc({
            ...payload,
            page: page - 1,
            size,
          });
        }

        dispatch.phanLoaiThuoc.updateData({
          listPhanLoaiThuoc,
          totalElements,
          page,
          size,
        });
        return response;
      } catch (err) {
        return err;
      }
    },
    getListPhanLoaiThuocTongHop: async (payload = {}, state) => {
      try {
        const response = await phanLoaiThuocProvider.searchTongHop({
          sort: "active,desc&createdAt,desc&ma,asc",
          ...payload,
        });
        let {
          data: listPhanLoaiThuoc,
          totalElements,
          message: messageInfo,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.phanLoaiThuoc.getListPhanLoaiThuocTongHop({
            ...payload,
            page: page - 1,
            size,
          });
        }

        dispatch.phanLoaiThuoc.updateData({
          listPhanLoaiThuoc,
          totalElements,
          page,
          size,
        });
        return response;
      } catch (err) {
        return err;
      }
    },
    createOrEdit: async (payload = {}, state) => {
      let response = {};
      try {
        if (payload.id) {
          response = await phanLoaiThuocProvider.put(payload);
          dispatch.phanLoaiThuoc.updateData({
            dataEditDefault: response.data,
          });
          message.success("C???p nh???t th??nh c??ng d??? li???u ph??n lo???i thu???c!");
        } else {
          response = await phanLoaiThuocProvider.post(payload);
          message.success("Th??m m???i th??nh c??ng d??? li???u ph??n lo???i thu???c!");
        }
        return response?.data;
      } catch (err) {
        if (payload.id) {
          message.success(
            err.message.toString() ||
              "C???p nh???t kh??ng th??nh c??ng d??? li???u ph??n lo???i thu???c!"
          );
        } else {
          message.success(
            err.message.toString() ||
              "Th??m m???i kh??ng th??nh c??ng d??? li???u ph??n lo???i thu???c!"
          );
        }
        return Promise.reject();
      }
    },
    onDelete: async (payload, state) => {
      const {
        khoa: { page, size },
      } = state;
      const response = await phanLoaiThuocProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("X??a b???n ghi th??nh c??ng");
        dispatch.phanLoaiThuoc.getListPhanLoaiThuoc({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
