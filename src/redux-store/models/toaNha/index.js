import cacheUtils from "utils/cache-utils";
import toaNhaProvider from "data-access/categories/dm-toa-nha-provider";
import { Modal, message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
export default {
  state: {
    listToaNha: [],
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
    getListToaNha: async (payload = {}, state) => {
      let listAllToaNha = await cacheUtils.read("DATA_TOA_NHA", "", [], false);
      dispatch.toaNha.updateData({ listAllToaNha });
      toaNhaProvider.searchAll({ page: "0", active: true }).then((s) => {
        let data = (s?.data || []).map((item, index) => {
          const { ma, ten, id } = item;
          return {
            ma,
            ten,
            id,
          };
        });
        if (JSON.stringify(data) !== JSON.stringify(listAllToaNha)) {
          dispatch.toaNha.updateData({ listAllToaNha: data });
          cacheUtils.save("DATA_TOA_NHA", "", data, false);
        }
      });
    },
    searchToaNha: async (payload = {}, state) => {
      try {
        const response = await toaNhaProvider.search(payload);
        let {
          code,
          data: listToaNha,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.toaNha.searchToaNha({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.toaNha.updateData({
          listToaNha,
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
          response = await toaNhaProvider.put(payload);
          dispatch.toaNha.updateData({
            dataEditDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu tòa nhà!");
        } else {
          response = await toaNhaProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu tòa nhà!");
        }
        return response?.data;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },
    onDelete: async (payload, state) => {
      const {
        toaNha: { page, size },
      } = state;
      const response = await toaNhaProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.toaNha.searchToaNha({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
