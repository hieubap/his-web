import cacheUtils from "utils/cache-utils";
import quanHamProvider from "data-access/categories/quan-ham-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import orderBy from "lodash/orderBy";

export default {
  state: {
    listQuanHam: [],
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
    getListAllQuanHam: (payload, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          let listAllQuanHam = await cacheUtils.read(
            "",
            "DATA_ALL_QUAN_HAM",
            [],
            false
          );
          dispatch.quanHam.updateData({ listAllQuanHam });
          quanHamProvider.searchAll().then((s) => {
            let { data } = s;
            data = orderBy(data, "ten", "asc");
            if (JSON.stringify(data) !== JSON.stringify(listAllQuanHam)) {
              cacheUtils.save("", "DATA_ALL_QUAN_HAM", data, false);
              dispatch.quanHam.updateData({
                listAllQuanHam: data,
              });
            }
          });
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      });
    },
    getListQuanHam: async (payload = {}, state) => {
      try {
        const response = await quanHamProvider.search(payload);
        let {
          data: listQuanHam,
          totalElements,
          message: messageInfo,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.quanHam.getListQuanHam({
            page: page - 1,
            size,
          });
        }

        return dispatch.quanHam.updateData({
          listQuanHam,
          totalElements,
          page,
          size,
        });
      } catch (err) {
        message.error(err?.message.toString());
        return Promise.reject(err);
      }
    },
    createOrEdit: async (payload = {}, state) => {
      try {
        let response = {};
        if (payload.id) {
          response = await quanHamProvider.put(payload);
          dispatch.quanHam.updateData({ dataEditDefault: response.data });
          message.success("Cập nhật thành công dữ liệu quân hàm!");
        } else {
          response = await quanHamProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu quân hàm!");
        }
      } catch (err) {
        message.error(err?.message.toString());
        return Promise.reject(err);
      }
    },
    onDelete: async (payload, state) => {
      const {
        quanHam: { page, size },
      } = state;
      const response = await quanHamProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.quanHam.getListQuanHam({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
