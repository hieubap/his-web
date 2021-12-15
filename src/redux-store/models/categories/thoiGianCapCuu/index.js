import thoiGianCapCuuProvider from "data-access/categories/dm-thoi-gian-cap-cuu-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import cacheUtils from "utils/cache-utils";
import orderBy from "lodash/orderBy";

export default {
  state: {
    listThoiGianCapCuu: [],
    listAllThoiGianCapCuu: [],
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
    getListAllThoiGianCapCuu: (payload, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          let listAllThoiGianCapCuu = await cacheUtils.read(
            "",
            "DATA_ALL_THOI_GIAN_CAP_CUU",
            [],
            false
          );
          dispatch.thoiGianCapCuu.updateData({ listAllThoiGianCapCuu });
          thoiGianCapCuuProvider.searchAll().then((s) => {
            let { data } = s;
            data = orderBy(data, "ten", "asc");
            if (
              JSON.stringify(data) !== JSON.stringify(listAllThoiGianCapCuu)
            ) {
              cacheUtils.save("", "DATA_ALL_THOI_GIAN_CAP_CUU", data, false);
              dispatch.thoiGianCapCuu.updateData({
                listAllThoiGianCapCuu: data,
              });
            }
          });
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      });
    },
    getListThoiGianCapCuu: async (payload = {}, state) => {
      try {
        const response = await thoiGianCapCuuProvider.search(payload);
        let {
          code,
          data: listThoiGianCapCuu,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.thoiGianCapCuu.getListThoiGianCapCuu({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.thoiGianCapCuu.updateData({
          listThoiGianCapCuu,
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
          response = await thoiGianCapCuuProvider.put(payload);
          dispatch.thoiGianCapCuu.updateData({
            dataEditDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu thời gian cấp cứu!");
        } else {
          response = await thoiGianCapCuuProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu thời gian cấp cứu!");
        }
        return response?.data;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },
    onDelete: async (payload, state) => {
      const {
        thoiGianCapCuu: { page, size },
      } = state;
      const response = await thoiGianCapCuuProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.thoiGianCapCuu.getListThoiGianCapCuu({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
