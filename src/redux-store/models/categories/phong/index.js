import cacheUtils from "utils/cache-utils";
import phongProvider from "data-access/categories/dm-phong-provider";
import { message } from "antd";
import orderBy from "lodash/orderBy";
export default {
  state: {
    listAllPhong: [],
    listRoom: [],
    totalElements: null,
    page: 0,
    size: 10,
    dataEditDefault: {},
    dataSearch: {},
    currentRoom: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getListAllPhong: (payload = {}, state) => {
      return new Promise(async (resolve, reject) => {
        const { loaiPhong } = payload;
        try {
          let listAllPhong = await cacheUtils.read(
            loaiPhong,
            "DATA_ALL_PHONG",
            [],
            false
          );
          dispatch.phong.updateData({ listAllPhong });
          phongProvider.searchAll(payload).then((s) => {
            let { data } = s;
            data = orderBy(data, "ten", "asc");
            if (JSON.stringify(data) !== JSON.stringify(listAllPhong)) {
              cacheUtils.save(loaiPhong, "DATA_ALL_PHONG", data, false);
              dispatch.phong.updateData({
                listAllPhong: data,
              });
            }
          });
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      });
    },
    getListPhong: async (payload = {}, state) => {
      try {
        const response = await phongProvider.search(payload);
        let {
          data: listRoom,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.phong.getListPhong({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.phong.updateData({
          listRoom,
          totalElements,
          page,
          size,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    getListPhongTongHop: async (payload = {}, state) => {
      try {
        const response = await phongProvider.searchAll(payload);
        let {
          data: listRoom,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.phong.getListPhongTongHop({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.phong.updateData({
          listRoom,
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
          response = await phongProvider.put(payload);
          dispatch.phong.updateData({
            dataEditDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu phòng!");
        } else {
          response = await phongProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu phòng!");
        }
        return response?.data;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },
    onDelete: async (payload, state) => {
      const {
        phong: { page, size },
      } = state;
      const response = await phongProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.phong.getListPhong({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
    getById: (payload = {}, state) => {
      phongProvider
        .getById(payload)
        .then((s) => {
          dispatch.phong.updateData({ currentRoom: s?.data });
        })
        .catch((e) => dispatch.phong.updateData({ currentRoom: {} }));
    },
  }),
};
