import cacheUtils from "utils/cache-utils";
import nguoiDaiDienProvider from "data-access/categories/dm-nguoi-dai-dien-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import orderBy from "lodash/orderBy";

export default {
  state: {
    listNguoiDaiDien: [],
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
    getListAllNguoiDaiDien: (payload, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          let listAllNguoiDaiDien = await cacheUtils.read(
            "",
            "DATA_ALL_NGUOI_DAI_DIEN",
            [],
            false
          );
          dispatch.nguoiDaiDien.updateData({ listAllNguoiDaiDien });
          nguoiDaiDienProvider.searchAll().then((s) => {
            let { data } = s;
            data = orderBy(data, "ten", "asc");
            if (JSON.stringify(data) !== JSON.stringify(listAllNguoiDaiDien)) {
              cacheUtils.save("", "DATA_ALL_NGUOI_DAI_DIEN", data, false);
              dispatch.nguoiDaiDien.updateData({
                listAllNguoiDaiDien: data,
              });
            }
          });
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      });
    },
    getListNguoiDaiDien: async (payload = {}, state) => {
      try {
        const response = await nguoiDaiDienProvider.search(payload);
        let {
          data: listNguoiDaiDien,
          totalElements,
          message: messageInfo,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.nguoiDaiDien.geListBiopsyPosition({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.nguoiDaiDien.updateData({
          listNguoiDaiDien,
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
          response = await nguoiDaiDienProvider.put(payload);
          dispatch.nguoiDaiDien.updateData({
            dataEditDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu người đại diện!");
        } else {
          response = await nguoiDaiDienProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu người đại diện!");
        }
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    onDelete: async (payload, state) => {
      const {
        nguoiDaiDien: { page, size },
      } = state;
      const response = await nguoiDaiDienProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.nguoiDaiDien.getListNguoiDaiDien({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
