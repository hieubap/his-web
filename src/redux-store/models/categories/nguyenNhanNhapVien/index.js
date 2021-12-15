import nguyenNhanNhapVienProvider from "data-access/categories/dm-nguyen-nhan-nhap-vien-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import cacheUtils from "utils/cache-utils";
import orderBy from "lodash/orderBy";
export default {
  state: {
    listNguyenNhanNhapVien: [],
    listAllNguyenNhanNhapVien: [],
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
    getListAllNguyenNhanNhapVien: () => {
      return new Promise(async (resolve, reject) => {
        try {
          let listAllNguyenNhanNhapVien = await cacheUtils.read(
            "",
            "DATA_ALL_NGUYEN_NHAN_NHAP_VIEN",
            [],
            false
          );
          dispatch.nguyenNhanNhapVien.updateData({ listAllNguyenNhanNhapVien });
          nguyenNhanNhapVienProvider.searchAll().then((s) => {
            let { data } = s;
            data = orderBy(data, "ten", "asc");
            if (
              JSON.stringify(data) !== JSON.stringify(listAllNguyenNhanNhapVien)
            ) {
              cacheUtils.save(
                "",
                "DATA_ALL_NGUYEN_NHAN_NHAP_VIEN",
                data,
                false
              );
              dispatch.nguyenNhanNhapVien.updateData({
                listAllNguyenNhanNhapVien: data,
              });
            }
          });
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      });
    },
    getListNguyenNhanNhapVien: async (payload = {}, state) => {
      try {
        const response = await nguyenNhanNhapVienProvider.search(payload);
        let {
          data: listNguyenNhanNhapVien,
          totalElements,
          message: messageInfo,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.nguyenNhanNhapVien.getListNguyenNhanNhapVien({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.nguyenNhanNhapVien.updateData({
          listNguyenNhanNhapVien,
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
          response = await nguyenNhanNhapVienProvider.put(payload);
          dispatch.nguyenNhanNhapVien.updateData({
            dataEditDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu nguyên nhân nhập viện!");
        } else {
          response = await nguyenNhanNhapVienProvider.post(payload);
          message.success("Thêm mới thành công dữ liệu nguyên nhân nhập viện");
        }
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    onDelete: async (payload, state) => {
      const {
        thoiGianCapCuu: { page, size },
      } = state;
      const response = await nguyenNhanNhapVienProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.nguyenNhanNhapVien.getListNguyenNhanNhapVien({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
