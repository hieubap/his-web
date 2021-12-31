import viTriChanThuongProvider from "data-access/categories/dm-vi-tri-chan-thuong-provider";
import { message } from "antd";
import cacheUtils from "utils/cache-utils";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import orderBy from "lodash/orderBy";

export default {
  state: {
    listViTriTranThuong: [],
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
    getListAllViTriTranThuong: (payload, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          let listAllViTriTranThuong = await cacheUtils.read(
            "",
            "DATA_ALL_VI_TRI_TRAN_THUONG",
            [],
            false
          );
          dispatch.viTriChanThuong.updateData({ listAllViTriTranThuong });
          viTriChanThuongProvider.searchAll().then((s) => {
            let { data } = s;
            data = orderBy(data, "ten", "asc");
            if (
              JSON.stringify(data) !== JSON.stringify(listAllViTriTranThuong)
            ) {
              cacheUtils.save("", "DATA_ALL_VI_TRI_TRAN_THUONG", data, false);
              dispatch.viTriChanThuong.updateData({
                listAllViTriTranThuong: data,
              });
            }
          });
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      });
    },

    getListViTriTranThuong: async (payload = {}, state) => {
      try {
        const response = await viTriChanThuongProvider.search(payload);
        let {
          data: listViTriTranThuong,
          totalElements,
          message: messageInfo,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.viTriChanThuong.getListViTriTranThuong({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.viTriChanThuong.updateData({
          listViTriTranThuong,
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
          response = await viTriChanThuongProvider.put(payload);
          dispatch.viTriChanThuong.updateData({
            dataEditDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu vị trí chấn thương!");
        } else {
          response = await viTriChanThuongProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu vị trí chấn thương!");
        }
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    onDelete: async (payload, state) => {
      const {
        viTriChanThuong: { page, size },
      } = state;
      const response = await viTriChanThuongProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.viTriChanThuong.getListViTriTranThuong({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
