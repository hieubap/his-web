import phieuNhapXuatProvider from "data-access/kho/phieu-nhap-xuat-provieder";
import phieuNhapXuatChiTietProvider from "data-access/kho/phieu-nhap-xuat-chi-tiet-provieder";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import moment from "moment";

export default {
  state: {
    listPhieuNhap: [],
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
    clearPhieuNhap(state, payload = {}) {
      return { ...state, thongTinPhieuNhap: {}, dsNhapXuatChiTiet: [] };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ dataSearch, ...rest }) => {
      dispatch.nhapKho.updateData({
        page: 0,
        dataSearch,
        ...rest,
      });
      dispatch.nhapKho.getListPhieuNhap({ rest });
    },
    getListPhieuNhap: ({ page = 0, ...payload }, state) => {
      let size = payload.size || state.nhapKho.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.nhapKho.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.nhapKho.dataSearch || {};

      phieuNhapXuatProvider
        .search({ page, size, sort, ...dataSearch })
        .then((s) => {
          dispatch.nhapKho.updateData({
            listPhieuNhap: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            }),
            totalElements: s?.totalElements || 0,
            page,
            size,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
        });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.nhapKho.dataSearch || {}),
        ...payload,
      };
      dispatch.nhapKho.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.nhapKho.getListPhieuNhap({
        page: 0,
        dataSearch,
      });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.nhapKho.dataSortColumn,
        ...payload,
      };
      dispatch.nhapKho.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.nhapKho.getListPhieuNhap({
        page: 0,
        dataSortColumn,
      });
    },
    kiemTraSoHoaDon: (payload, state) => {
      return new Promise((resolve, reject) => {
        phieuNhapXuatProvider
          .kiemTraSoHoaDon(payload)
          .then(s => {
            const { code, data, _ } = s;
            dispatch.nhapKho.updateData({
              isTrungSoHoaDon: code == 0 ? false : true,
              //TODO: update hoa don bi trung
              hoaDonBiTrung: { ...data },
            });
            if (code != 0) {
              message.warning(`Trùng số hóa đơn ${payload?.soHoaDon}`);
            }
            resolve(s);
          })
          .catch(e => {
            if (!payload.ngayHoaDon) {
              message.warning(`Trùng số hóa đơn ${payload?.soHoaDon}`);
            }
            else {
              message.error(e?.message?.toString());
            }
            return reject(e);
          });
      });
    },
    getDetail: (id, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          let thongTinPhieuNhap = {};
          const res1 = await phieuNhapXuatProvider.detail(id);
          if (res1?.code == 0) {
            thongTinPhieuNhap = {
              ...res1?.data,
              ngayHoaDon: res1?.data?.ngayHoaDon ?
                moment(res1?.data?.ngayHoaDon) :
                undefined
            };
          }
          await dispatch.nhapKhoChiTiet.onSearchDetailPhieuNhap({
            phieuNhapXuatId: thongTinPhieuNhap.id,
            page: 0
          });
          dispatch.nhapKho.updateData({
            thongTinPhieuNhap,
          })
          resolve();
        } catch (error) {
          message.error(error?.message?.toString());
          reject(error);
        }
      });
    },
  }),
};
