import cacheUtils from "utils/cache-utils";
import loaiDoiTuongProvider from "data-access/categories/loai-doi-tuong-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import orderBy from "lodash/orderBy";

export default {
  state: {
    listLoaiDoiTuong: [],
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
    getListAllLoaiDoiTuong: (payload, state) => {
      return new Promise(async (resolve, reject) => {
        let userId = state.auth.auth?.id;
        let listAllLoaiDoiTuong = await cacheUtils.read(
          userId,
          `DATA_LOAI_DOI_TUONG_${payload?.doiTuong}`,
          [],
          false
        );
        dispatch.loaiDoiTuong.updateData({ listAllLoaiDoiTuong });
        loaiDoiTuongProvider
          .searchAll({ doiTuong: payload?.doiTuong })
          .then((s) => {
            let { data } = s;
            data = orderBy(data, "ten", "asc");
            if (JSON.stringify(data) !== JSON.stringify(listAllLoaiDoiTuong)) {
              dispatch.loaiDoiTuong.updateData({ listAllLoaiDoiTuong: data });
              cacheUtils.save(
                userId,
                `DATA_LOAI_DOI_TUONG_${payload?.doiTuong}`,
                data,
                false
              );
            }
          });
      });
    },
    getListLoaiDoiTuong: async (payload = {}, state) => {
      try {
        const response = await loaiDoiTuongProvider.search(payload);
        let {
          data: listLoaiDoiTuong,
          totalElements,
          message: messageInfo,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.loaiDoiTuong.getListLoaiDoiTuong({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.loaiDoiTuong.updateData({
          listLoaiDoiTuong,
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
          response = await loaiDoiTuongProvider.put(payload);
          dispatch.loaiDoiTuong.updateData({
            dataEditDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu loại đối tượng!");
        } else {
          response = await loaiDoiTuongProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu loại đối tượng!");
        }
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    onDelete: async (payload, state) => {
      const {
        loaiDoiTuong: { page, size },
      } = state;
      const response = await loaiDoiTuongProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.loaiDoiTuong.geListBiopsyPosition({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
    getAllListTypeTarget: async (payload = {}, state) => {
      const {
        loaiDoiTuong: { page, size },
      } = state;
      const response = await loaiDoiTuongProvider.search(payload);
      let {
        code,
        data,
        totalElements,
        message: messageInfo,
        pageNumber,
        numberOfElements,
      } = response;
      if (code !== 0) throw new Error(messageInfo);

      if (page > 0 && numberOfElements === 0) {
        return dispatch.loaiDoiTuong.geListBiopsyPosition({
          page: page - 1,
          size,
        });
      }

      const listLoaiDoiTuong = data.map((item) => {
        return { ...item, action: item };
      });

      return dispatch.loaiDoiTuong.updateData({
        listLoaiDoiTuong,
        totalElements,
        page: pageNumber,
      });
    },
  }),
};
