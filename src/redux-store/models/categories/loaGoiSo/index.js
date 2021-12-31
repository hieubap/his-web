import loaGoiSoProvider from "data-access/categories/dm-loa-goi-so-provider";
import { message } from "antd";
import cacheUtils from "utils/cache-utils";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import orderBy from "lodash/orderBy";

export default {
  state: {
    listLoaGoiSo: [],
    listAllLoaGoiSo: [],
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
    getListAllLoaGoiSo: (payload, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          let listAllLoaGoiSo = await cacheUtils.read(
            "",
            "DATA_ALL_LOA_GOI_SO",
            [],
            false
          );
          dispatch.loaGoiSo.updateData({ listAllLoaGoiSo });
          loaGoiSoProvider.searchAll().then((s) => {
            let { data } = s;
            data = orderBy(data, "ten", "asc");
            if (JSON.stringify(data) !== JSON.stringify(listAllLoaGoiSo)) {
              cacheUtils.save("", "DATA_ALL_LOA_GOI_SO", data, false);
              dispatch.loaGoiSo.updateData({
                listAllLoaGoiSo: data,
              });
            }
          });
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      });
    },
    getListLoaGoiSo: async (payload = {}, state) => {
      try {
        const response = await loaGoiSoProvider.search(payload);
        let {
          code,
          data: listLoaGoiSo,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.loaGoiSo.getListLoaGoiSo({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.loaGoiSo.updateData({
          listLoaGoiSo,
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
          response = await loaGoiSoProvider.put(payload);
          dispatch.loaGoiSo.updateData({
            dataEditDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu loa gọi số!");
        } else {
          response = await loaGoiSoProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu loa gọi số!");
        }
        return response?.data;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },
    onDelete: async (payload, state) => {
      const {
        loaGoiSo: { page, size },
      } = state;
      const response = await loaGoiSoProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.loaGoiSo.getListLoaGoiSo({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
