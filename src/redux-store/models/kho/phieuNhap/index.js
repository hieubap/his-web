import phieuNhapXuatProvider from "data-access/kho/phieu-nhap-xuat-provieder";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT, LOAI_CHIET_KHAU } from "constants/index";
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
    kiemTraSoHoaDon: (payload, state) => {
      return new Promise((resolve, reject) => {
        phieuNhapXuatProvider
          .kiemTraSoHoaDon(payload)
          .then(s => {
            const { code, data, _ } = s;
            dispatch.phieuNhap.updateData({
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
    getById: (id, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          let thongTinPhieuNhap = {};
          let dsAllNhapXuatChiTiet = [];
          const res1 = await phieuNhapXuatProvider.detail(id);
          if (res1?.code == 0) {
            thongTinPhieuNhap = {
              ...res1?.data,
              ngayHoaDon: res1?.data?.ngayHoaDon ?
                moment(res1?.data?.ngayHoaDon) :
                undefined
            };
            dsAllNhapXuatChiTiet = thongTinPhieuNhap?.dsNhapXuatChiTiet;
            dsAllNhapXuatChiTiet = dsAllNhapXuatChiTiet?.map((item, index) => ({
              ...item,
              ...item?.loNhap,
              ...item?.dichVu,
              detachId: item?.dichVu?.ma +
                "_" + item?.giaNhapSauVat +
                "_" + item?.loNhap?.soLo +
                "_" + item?.dichVu?.xuatXuId,
              loaiChietKhau: item?.tienChietKhau == "" ||
                item?.tienChietKhau == null ||
                item?.tienChietKhau == undefined ?
                LOAI_CHIET_KHAU.PHAN_TRAM :
                LOAI_CHIET_KHAU.TIEN,
            }));
          }
          dispatch.phieuNhap.updateData({
            thongTinPhieuNhap,
            dsAllNhapXuatChiTiet,
          })
          resolve(res1?.data);
        } catch (error) {
          message.error(error?.message?.toString());
          reject(error);
        }
      });
    },
  }),
};
