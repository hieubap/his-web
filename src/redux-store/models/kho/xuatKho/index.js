import phieuNhapXuatProvider from "data-access/kho/phieu-nhap-xuat-provieder";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";

export default {
  state: {
    listPhieuXuat: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSortColumn: { active: 2 },
    dataSearch: {},
    chiTiet: true,
    isTrungSoHoaDon: false,
    hoaDonBiTrung: {},
    thongTinPhieuNhap: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ dataSearch, page = 0, ...rest }) => {
      dispatch.xuatKho.updateData({
        page,
        dataSearch,
        ...rest,
      });
      dispatch.xuatKho.getListPhieuXuat({ page, ...rest });
    },
    getListPhieuXuat: ({ page = 0, ...payload }, state) => {
      let size = payload.size || state.xuatKho.size || 10;
      const sort = combineSort(
        payload.sort
          ? { [payload.sort.key]: payload.sort.value }
          : state.xuatKho.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.xuatKho.dataSearch || {};

      phieuNhapXuatProvider
        .search({
          //   nhapKho: true,
          loaiNhapXuat: 20,
          page,
          size,
          sort,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.xuatKho.updateData({
            listPhieuXuat: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            }),
            totalElements: s?.totalElements || 0,
            page,
            size,
            sort: payload.sort,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
          dispatch.xuatKho.updateData({
            sort: payload.sort,
          });
        });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.xuatKho.dataSearch || {}),
        ...payload,
      };
      dispatch.xuatKho.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.xuatKho.getListPhieuXuat({
        page: 0,
        dataSearch,
      });
    },
    kiemTraSoHoaDon: (payload, state) => {
      return new Promise((resolve, reject) => {
        phieuNhapXuatProvider
          .kiemTraSoHoaDon(payload)
          .then((s) => {
            const { code, data, message } = s;
            dispatch.xuatKho.updateData({
              isTrungSoHoaDon: code == 0 ? false : true,
              //TODO: update hoa don bi trung
              hoaDonBiTrung: { ...data },
            });
            if (code != 0) {
              message.warning(`Trùng số hóa đơn ${payload?.soHoaDon}`);
            }
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message?.toString());
            return reject(e);
          });
      });
    },
  }),
};
