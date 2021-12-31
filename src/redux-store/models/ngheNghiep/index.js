import ngheNghiepProvider from "data-access/categories/dm-nghe-nghiep-provider";
import { message } from "antd";
import cacheUtils from "utils/cache-utils";
import orderBy from "lodash/orderBy";
export default {
  state: {
    listNgheNghiep: [],
    listAllNgheNghiep: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getListAllNgheNghiep: (payload, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          let listAllNgheNghiep = await cacheUtils.read(
            "",
            "DATA_ALL_NGHE_NGHIEP",
            [],
            false
          );
          dispatch.ngheNghiep.updateData({ listAllNgheNghiep });
          ngheNghiepProvider.searchAll().then((s) => {
            let { data } = s;
            data = orderBy(data, "ten", "asc");
            if (JSON.stringify(data) !== JSON.stringify(listAllNgheNghiep)) {
              cacheUtils.save("", "DATA_ALL_NGHE_NGHIEP", data, false);
              dispatch.ngheNghiep.updateData({
                listAllNgheNghiep: data,
              });
            }
            resolve();
          });
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      });
    },
    getListNgheNghiep: async (payload = {}, state) => {
      try {
        const response = await ngheNghiepProvider.search(payload);
        let {
          code,
          data: listNgheNghiep,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.ngheNghiep.getListNgheNghiep({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.ngheNghiep.updateData({
          listNgheNghiep,
          totalElements,
          page,
          size,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    getListNgheNghiepTongHop: async (payload = {}, state) => {
      try {
        const response = await ngheNghiepProvider.searchTongHop(payload);
        let {
          code,
          data: listNgheNghiep,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.ngheNghiep.getListNgheNghiepTongHop({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.ngheNghiep.updateData({
          listNgheNghiep,
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
          response = await ngheNghiepProvider.put(payload);
          dispatch.ngheNghiep.updateData({
            dataEditDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu nghề nghiệp!");
        } else {
          response = await ngheNghiepProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu nghề nghiệp!");
        }
        return response?.data;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },
    onDelete: async (payload, state) => {
      const {
        ngheNghiep: { page, size },
      } = state;
      const response = await ngheNghiepProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.ngheNghiep.getListNgheNghiep({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
