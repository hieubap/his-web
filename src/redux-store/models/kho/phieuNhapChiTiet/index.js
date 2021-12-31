import phieuNhapXuatChiTietProvider from "data-access/kho/phieu-nhap-xuat-chi-tiet-provieder";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";
import moment from "moment";
import { LOAI_CHIET_KHAU } from "constants/index";

export default {
  state: {
    listPhieuNhapChiTiet: [],
    dsNhapXuatChiTiet: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSortColumn: { active: 2 },
    dataSearch: {},
    phieuNhapXuatId: null,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ dataSearch, ...rest }) => {
      dispatch.phieuNhapChiTiet.updateData({
        page: 0,
        dataSearch,
        ...rest,
      });
      dispatch.phieuNhapChiTiet.onSearch({ ...rest });
    },
    getListPhieuNhapChiTiet: ({ page = 0, ...payload }, state) => {
      let size = payload.size || state.phieuNhapChiTiet.size || 20;
      const sort = combineSort(
        payload.dataSortColumn || state.phieuNhapChiTiet.dataSortColumn || {}
      );
      const phieuNhapXuatId = payload.phieuNhapXuatId || state.phieuNhapChiTiet.phieuNhapXuatId || null;
      const dataSearch =
        payload.dataSearch || state.phieuNhapChiTiet.dataSearch || {};

      return new Promise((resolve, reject) => {
        phieuNhapXuatChiTietProvider
          .search({ phieuNhapXuatId, page, size, sort, ...dataSearch })
          .then((s) => {
            let listPhieuNhapChiTiet = (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            });
            dispatch.phieuNhapChiTiet.updateData({
              listPhieuNhapChiTiet,
              totalElements: s?.totalElements || 0,
              page,
              size,
              phieuNhapXuatId,
              dataSearch,
            });
            resolve(listPhieuNhapChiTiet);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi vui lòng thử lại");
            reject(e);
          });
      });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.phieuNhapChiTiet.dataSearch || {}),
        ...payload,
      };
      dispatch.phieuNhapChiTiet.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.phieuNhapChiTiet.onSearch({
        page: 0,
        dataSearch,
      });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.phieuNhapChiTiet.dataSortColumn,
        ...payload,
      };
      dispatch.phieuNhapChiTiet.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.phieuNhapChiTiet.onSearch({
        page: 0,
        dataSortColumn,
      });
    },
    onSearch: ({ page = 0, size = 20, ...payload }, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          let dsNhapXuatChiTiet = [],
            promises = [];
          const listPhieuNhapChiTiet = await dispatch.phieuNhapChiTiet.getListPhieuNhapChiTiet({
            page,
            size,
            ...payload,
          });
          dsNhapXuatChiTiet = listPhieuNhapChiTiet?.map((item, index) => {
            if (item?.loNhap?.quyetDinhThauChiTietId) {
              promises = [
                ...promises,
                dispatch.quyetDinhThauChiTiet.getDetail(item?.loNhap?.quyetDinhThauChiTietId),
              ];
            }
            return ({
              ...item,
              ...item?.loNhap,
              ...item?.dichVu,
              ngaySanXuat: item?.loNhap?.ngaySanXuat ?
                moment(item?.loNhap?.ngaySanXuat) :
                undefined,
              ngayHanSuDung: item?.loNhap?.ngayHanSuDung ?
                moment(item?.loNhap?.ngayHanSuDung) :
                undefined,
              id: item?.id,
              detachId: item?.dichVu?.ma +
                "_" + item?.giaNhapSauVat +
                "_" + item?.loNhap?.soLo +
                "_" + item?.dichVu?.xuatXuId,
              loaiChietKhau: item?.tienChietKhau == "" ||
                item?.tienChietKhau == null ||
                item?.tienChietKhau == undefined ?
                LOAI_CHIET_KHAU.PHAN_TRAM :
                LOAI_CHIET_KHAU.TIEN,
            });
          });
          if (promises?.length > 0) {
            let responses = await Promise.all(promises);
            responses = responses?.filter(item => item?.id);
            dsNhapXuatChiTiet = dsNhapXuatChiTiet?.map((item, index) => {
              const chiTietThau = responses?.find((item2, index2) =>
                item2?.id == item?.quyetDinhThauChiTietId &&
                item2?.dichVuId == item?.dichVuId
              );
              return ({
                ...item,
                chiTietThau,
              });
            });
          }
          dispatch.phieuNhapChiTiet.updateData({
            dsNhapXuatChiTiet,
          });
          resolve(dsNhapXuatChiTiet);
        } catch (error) {
          message.error(error?.message?.toString());
          reject(error);
        }
      });
    },
  }),
};
