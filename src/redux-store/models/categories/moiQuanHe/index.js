import moiQuanHeProvider from "data-access/categories/dm-moi-quan-he-provider";
import { message } from "antd";
import cacheUtils from "utils/cache-utils";
import orderBy from "lodash/orderBy";
export default {
  state: {
    listQuanHe: [],
    listAllQuanHe: [],
    dataSearch: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getListAllQuanHe: (payload, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          let listAllQuanHe = await cacheUtils.read(
            "",
            "DATA_ALL_QUAN_HE",
            [],
            false
          );
          dispatch.moiQuanHe.updateData({ listAllQuanHe });
          moiQuanHeProvider.searchAll().then((s) => {
            let { data } = s;
            data = orderBy(data, "ten", "asc");
            if (JSON.stringify(data) !== JSON.stringify(listAllQuanHe)) {
              cacheUtils.save("", "DATA_ALL_QUAN_HE", data, false);
              dispatch.moiQuanHe.updateData({
                listAllQuanHe: data,
              });
            }
          });
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      });
    },

    getListQuanHe: async (payload = {}, state) => {
      try {
        const response = await moiQuanHeProvider.search(payload);
        let {
          code,
          data: listQuanHe,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;
        if (page > 0 && numberOfElements === 0) {
          return dispatch.moiQuanHe.getListQuanHe({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.moiQuanHe.updateData({
          listQuanHe,
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
          response = await moiQuanHeProvider.put(payload);
          dispatch.moiQuanHe.updateData({
            dataEditDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu mối quan hệ!");
        } else {
          response = await moiQuanHeProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu mối quan hệ!");
        }
        return response?.data;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },
    onDelete: async (payload, state) => {
      const {
        moiQuanHe: { page, size },
      } = state;
      const response = await moiQuanHeProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.moiQuanHe.getListQuanHe({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
