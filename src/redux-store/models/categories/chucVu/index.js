import cacheUtils from "utils/cache-utils";
import chucVuProvider from "data-access/categories/dm-chuc-vu-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import orderBy from "lodash/orderBy";

export default {
  state: {
    listChucVu: [],
    listAllChucVu: [],
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
    getListAllChucVu: () => {
      return new Promise(async (resolve, reject) => {
        try {
          let listAllChucVu = await cacheUtils.read(
            "",
            "DATA_ALL_CHUC_VU",
            [],
            false
          );
          dispatch.chucVu.updateData({ listAllChucVu });
          chucVuProvider.searchAll().then((s) => {
            let { data } = s;
            data = orderBy(data, "ten", "asc");
            if (JSON.stringify(data) !== JSON.stringify(listAllChucVu)) {
              cacheUtils.save("", "DATA_ALL_CHUC_VU", data, false);
              dispatch.chucVu.updateData({
                listAllChucVu: data,
              });
            }
          });
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      });
    },
    getListChucVu: async (payload = {}, state) => {
      try {
        const response = await chucVuProvider.search(payload);
        let {
          code,
          data: listChucVu,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.chucVu.getListChucVu({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.chucVu.updateData({
          listChucVu,
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
          response = await chucVuProvider.put(payload);
          dispatch.chucVu.updateData({
            dataEditDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu chức vụ!");
        } else {
          response = await chucVuProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu chức vụ!");
        }
        return response?.data;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },
    onDelete: async (payload, state) => {
      const {
        chucVu: { page, size },
      } = state;
      const response = await chucVuProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.chucVu.getListChucVu({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
