import dmLoaiCapCuuProvider from "data-access/categories/dm-loai-cap-cuu-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import cacheUtils from "utils/cache-utils";
import orderBy from "lodash/orderBy";
export default {
  state: {
    listLoaiCapCuu: [],
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
    getListAllLoaiCapCuu: (payload, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          let listAllLoaiCapCuu = await cacheUtils.read(
            "",
            "DATA_ALL_LOAI_CAP_CUU",
            [],
            false
          );
          dispatch.loaiCapCuu.updateData({ listAllLoaiCapCuu });
          dmLoaiCapCuuProvider.searchAll().then((s) => {
            let { data } = s;
            data = orderBy(data, "ten", "asc");
            if (JSON.stringify(data) !== JSON.stringify(listAllLoaiCapCuu)) {
              cacheUtils.save("", "DATA_ALL_LOAI_CAP_CUU", data, false);
              dispatch.loaiCapCuu.updateData({
                listAllLoaiCapCuu: data,
              });
            }
          });
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      });
    },
    getListLoaiCapCuu: async (payload = {}, state) => {
      try {
        const response = await dmLoaiCapCuuProvider.search(payload);
        let {
          code,
          data: listLoaiCapCuu,
          totalElements,
          message: messageInfo,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (code !== 0) throw new Error(messageInfo);

        if (page > 0 && numberOfElements === 0) {
          return dispatch.loaiCapCuu.getListLoaiCapCuu({
            page: page - 1,
            size,
          });
        }

        return dispatch.loaiCapCuu.updateData({
          listLoaiCapCuu,
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
      try {
        let response = {};
        if (payload.id) {
          response = await dmLoaiCapCuuProvider.put(payload);
          dispatch.loaiCapCuu.updateData({
            dataEditDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu loại cấp cứu");
        } else {
          response = await dmLoaiCapCuuProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu loại cấp cứu");
        }
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    onDelete: async (payload, state) => {
      const {
        loaiCapCuu: { page, size },
      } = state;
      const response = await dmLoaiCapCuuProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.loaiCapCuu.getListLoaiCapCuu({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
