import cacheUtils from "utils/cache-utils";
import nguoiGioiThieuProvider from "data-access/categories/dm-nguoi-gioi-thieu-provider";
import { message } from "antd";
import { SIZE_DEFAULT, PAGE_DEFAULT } from "constants/index";
import { SORT_DEFAULT } from "constants/page/therapyConstant";
import orderBy from "lodash/orderBy";

export default {
  state: {
    listNguoiGioiThieu: [],
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
        let listAllNguoiGioiThieu = await cacheUtils.read(
          "",
          "DATA_ALL_NGUOI_GIOI_THIEU",
          [],
          false
        );
        dispatch.nguoiGioiThieu.updateData({ listAllNguoiGioiThieu });
        const response = await nguoiGioiThieuProvider.searchAll({
          page,
          size,
          ...payload,
          active: true,
        });
        let { data } = response;
        data = orderBy(data, "ten", "asc");
        if (JSON.stringify(data) !== JSON.stringify(listAllNguoiGioiThieu)) {
          cacheUtils.save("", "DATA_ALL_NGUOI_GIOI_THIEU", data, false);
          return dispatch.nguoiGioiThieu.updateData({
            listAllNguoiGioiThieu: data,
          });
        }
        return dispatch.nguoiGioiThieu.updateData({
          listAllNguoiGioiThieu,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    search: async (payload = {}, state) => {
      try {
        const response = await nguoiGioiThieuProvider.search(payload);
        let {
          data: listNguoiGioiThieu,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.nguoiGioiThieu.search({
            ...payload,
            pageNumber: page - 1,
            pageSize: size,
          });
        }
        return dispatch.nguoiGioiThieu.updateData({
          listNguoiGioiThieu,
          totalElements,
          pageNumber: page,
          pageSize: size,
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
          response = await nguoiGioiThieuProvider.update(payload);
          dispatch.nguoiGioiThieu.updateData({
            dataEditTinhDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu người giới thiệu!");
        } else {
          dispatch.nguoiGioiThieu.updateData({
            dataSort: {
              createdAt: 2,
            },
          });
          response = await nguoiGioiThieuProvider.create(payload);
          message.success("Thêm mới thành công dữ liệu người giới thiệu!");
        }
        return response?.data;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },
  }),
};
