import khoaProvider from "data-access/categories/dm-khoa-provider";
import { message } from "antd";
import cacheUtils from "utils/cache-utils";
import orderBy from "lodash/orderBy";
export default {
  state: {
    listKhoa: [],
    listAllKhoa: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getListAllKhoa: (payload, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          let listAllKhoa = await cacheUtils.read(
            "",
            "DATA_ALL_KHOA",
            [],
            false
          );
          dispatch.khoa.updateData({ listAllKhoa });
          khoaProvider.searchAll().then((s) => {
            let { data } = s;
            data = orderBy(data, "ten", "asc");
            if (JSON.stringify(data) !== JSON.stringify(listAllKhoa)) {
              cacheUtils.save("", "DATA_ALL_KHOA", data, false);
              dispatch.khoa.updateData({
                listAllKhoa: data,
              });
            }
          });
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      });
    },
    getListKhoa: async (payload = {}, state) => {
      const response = await khoaProvider.search({
        ...payload,
      });
      let {
        code,
        data: listKhoa,
        totalElements,
        message: messageInfo,
        pageNumber: page,
        pageSize: size,
        numberOfElements,
      } = response;

      if (code !== 0) throw new Error(messageInfo);

      if (page > 0 && numberOfElements === 0) {
        return dispatch.khoa.getListKhoa({
          ...payload,
          page: page - 1,
          size,
        });
      }

      return dispatch.khoa.updateData({
        listKhoa,
        totalElements,
        page,
        size,
      });
    },
    getListKhoaTongHop: async (payload = {}, state) => {
      const response = await khoaProvider.searchAll({
        sort: "active,desc&createdAt,desc&ma,asc",
        ...payload,
      });
      let {
        code,
        data: listKhoa,
        totalElements,
        message: messageInfo,
        pageNumber: page,
        pageSize: size,
        numberOfElements,
      } = response;

      if (code !== 0) throw new Error(messageInfo);

      if (page > 0 && numberOfElements === 0) {
        return dispatch.khoa.getListKhoaTongHop({
          ...payload,
          page: page - 1,
          size,
        });
      }

      return dispatch.khoa.updateData({
        listKhoa,
        totalElements,
        page,
        size,
      });
    },
    createOrEdit: async (payload = {}, state) => {
      let response = {};
      try {
        if (payload.id) {
          response = await khoaProvider.put(payload);
          dispatch.khoa.updateData({
            dataEditDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu khoa!");
        } else {
          response = await khoaProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu khoa!");
        }
        return response?.data;
      } catch (err) {
        if (payload.id) {
          message.error(
            err.message.toString() || "Cập nhật không thành công dữ liệu khoa!"
          );
        } else {
          message.error(
            err.message.toString() || "Thêm mới không thành công dữ liệu khoa!"
          );
        }
        return Promise.reject();
      }
    },
    onDelete: async (payload, state) => {
      const {
        khoa: { page, size },
      } = state;
      const response = await khoaProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.khoa.getListKhoa({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
