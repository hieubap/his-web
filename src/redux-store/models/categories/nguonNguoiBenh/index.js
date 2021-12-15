import cacheUtils from "utils/cache-utils";
import nguonNguoiBenhProvider from "data-access/categories/dm-nguon-nguoi-benh-provider";
import { message } from "antd";
import { SIZE_DEFAULT, PAGE_DEFAULT } from "constants/index";
import { SORT_DEFAULT } from "constants/page/therapyConstant";
import orderBy from "lodash/orderBy";

export default {
  state: {
    listAllNguonNguoiBenh: [],
    listNguonNguoiBenh: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: SIZE_DEFAULT,
    dataSearch: {},
    dataSort: SORT_DEFAULT,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    searchAll: async ({ page = 0, size = 9999, ...payload }, state) => {
      try {
        let listAllNguonNguoiBenh = await cacheUtils.read(
          "",
          "DATA_ALL_NGUON_NGUOI_BENH",
          [],
          false
        );
        dispatch.nguonNguoiBenh.updateData({
          listAllNguonNguoiBenh,
        });
        const response = await nguonNguoiBenhProvider.searchAll({
          page,
          size,
          ...payload,
        });
        let { data } = response;
        data = orderBy(data, "ten", "asc");
        if (JSON.stringify(data) !== JSON.stringify(listAllNguonNguoiBenh)) {
          cacheUtils.save("", "DATA_ALL_NGUON_NGUOI_BENH", data, false);
          return dispatch.nguonNguoiBenh.updateData({
            listAllNguonNguoiBenh: data,
          });
        }
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    search: async (payload = {}, state) => {
      try {
        const response = await nguonNguoiBenhProvider.search(payload);
        let {
          data: listNguonNguoiBenh,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.nguonNguoiBenh.search({
            ...payload,
            page: page - 1,
            size: size,
          });
        }

        return dispatch.nguonNguoiBenh.updateData({
          listNguonNguoiBenh,
          totalElements,
          page,
          size,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    searchTongHop: async (payload = {}, state) => {
      try {
        const response = await nguonNguoiBenhProvider.searchAll(payload);
        let {
          data: listNguonNguoiBenh,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.nguonNguoiBenh.searchTongHop({
            ...payload,
            page: page - 1,
            size: size,
          });
        }

        return dispatch.nguonNguoiBenh.updateData({
          listNguonNguoiBenh,
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
          response = await nguonNguoiBenhProvider.put(payload);
          dispatch.nguonNguoiBenh.updateData({
            dataEditTinhDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu nguồn người bệnh!");
        } else {
          dispatch.nguonNguoiBenh.updateData({
            dataSort: {
              createdAt: 2,
            },
          });
          response = await nguonNguoiBenhProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu nguồn người bệnh!");
        }
        return response?.data;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },
  }),
};
