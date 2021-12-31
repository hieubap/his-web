import tiepDonProvider from "data-access/tiepdon-provider";
import { message } from "antd";
import moment from "moment";

export default {
  state: {
    nbDiaChi: {},
    requiredNguoiGioiThieu: false,
    // validateData: {
    //   checkMaThe: true,
    // },
    theBaoHiem: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
    clearData(state, payload = {}) {
      return { ...payload };
    },
  },
  effects: (dispatch) => ({
    onSetCapCuu: (payload, state) => {
      const { capCuu } = state.tiepDon;
      const { quayTiepDonId } = state.goiSo;
      const { dataMA_KHOA_CAP_CUU } = state.thietLap;
      const { listAllQuayTiepDonTaiKhoan = [] } = state.quayTiepDon;
      let newCapCuu = false;
      let khoa = listAllQuayTiepDonTaiKhoan?.find(
        (x) => x.id == quayTiepDonId
      )?.khoa;
      if (dataMA_KHOA_CAP_CUU && dataMA_KHOA_CAP_CUU === khoa?.ma) {
        newCapCuu = true;
      } else {
        newCapCuu = false;
      }
      if (capCuu != newCapCuu)
        dispatch.tiepDon.updateData({
          capCuu: newCapCuu,
        });
    },
    onCheckIsKhamCapCuu: (payload, state) => {
      const { capCuu, dangKyKhamCc } = state.tiepDon;
      const { quayTiepDonId } = state.goiSo;
      const { dataMA_KHOA_CAP_CUU } = state.thietLap;
      const { listAllQuayTiepDonTaiKhoan = [] } = state.quayTiepDon;
      if (!capCuu || !dataMA_KHOA_CAP_CUU) {
        dispatch.tiepDon.updateData({
          dangKyKhamCc: false,
        });
        return;
      }
      let khoa = listAllQuayTiepDonTaiKhoan?.find(
        (x) => x.id == quayTiepDonId
      )?.khoa;
      if (dangKyKhamCc != !(!khoa?.ma || khoa?.ma != dataMA_KHOA_CAP_CUU)) {
        dispatch.tiepDon.updateData({
          dangKyKhamCc: !(!khoa?.ma || khoa?.ma != dataMA_KHOA_CAP_CUU),
        });
      }
    },
    onSaveData: ({ data = {}, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        const selectedAddress = state.tiepDon.selectedAddress;
        if (selectedAddress === false) {
          message.error("Địa chỉ hành chính không có trong hệ thống");
          reject(false);
          return;
        }
        dispatch.tiepDon.updateData({
          checkValidate: false,
          requiredNguoiGioiThieu: false,
        });
        const { listAllQuayTiepDonTaiKhoan = [] } = state.quayTiepDon;
        const { quayTiepDonId } = state.goiSo;
        const quayTiepDon = listAllQuayTiepDonTaiKhoan?.find(
          (item) => item.id == quayTiepDonId
        );

        const {
          maHoSo,
          loaiDoiTuongId,
          loaiKcb,
          uuTien,
          danTocId,
          nbMienPhi,
          maNb,
          nbLaySo = {},
          anhDaiDien,
          covid,
          soBaoHiemXaHoi,
          chiNamSinh,
          ngheNghiepId,
          tuoi,
          thangTuoi,
          capCuu,
          dangKyKhamCc,
        } = state.tiepDon;

        tiepDonProvider
          .onSaveData({
            data: {
              ...data,
              khoaId: quayTiepDon?.khoaId,
              maHoSo,
              maNb,
              loaiDoiTuongId,
              loaiKcb,
              uuTien,
              danTocId,
              nbMienPhi,
              nbLaySoId: nbLaySo?.id,
              anhDaiDien,
              covid,
              soBaoHiemXaHoi,
              chiNamSinh,
              ngheNghiepId,
              tuoi,
              thangTuoi,
              capCuu,
              dangKyKhamCc: dangKyKhamCc,
              quayTiepDonId,
            },
            ...payload,
          })
          .then((s) => {
            if (s?.code === 0) {
              dispatch.tiepDon.updateData({
                nbLaySo: s.data?.nbLaySo,
              });
              resolve(s);
            } else {
              resolve(s);
              if (s?.code !== 7950 && s?.code !== 7920)
                message.error(s?.message);
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    searchSoThe: (payload, state) => {
      return new Promise((resolve, reject) => {
        tiepDonProvider.searchSoThe(payload).then((s) => {
          if (s.code === 0 && s.data) {
            let data = s.data || {};
            let obj = {
              maThe: data.maThe,
              mucHuong: data.mucHuong,
              tuNgay: data.tuNgay,
              denNgay: data.denNgay,
              noiDangKyId: data.noiDangKyId,
              noiGioiThieuId: data.noiGioiThieuId,
              thoiGianDu5Nam: data.thoiGianDu5Nam,
              thoiGianMienDongChiTra: data.thoiGianMienDongChiTra,
              giayChuyenTuyen: data.giayChuyenTuyen,
              henKhamLai: data.henKhamLai,
              mienDongChiTra: data.mienDongChiTra,
              dangGiuThe: data.dangGiuThe,
              maKetQua: data.maKetQua,
              boQuaTheLoi: data.boQuaTheLoi,
              noiGioiThieu: data.noiGioiThieu,
              noiDangKy: data.noiDangKy,
            };
            dispatch.tiepDon.updateData({ nbTheBaoHiem: obj });
            resolve(obj);
          } else {
            reject(s);
            message.error(s?.message);
          }
        });
      });
    },
    searchMaNbTiepDon: (payload, state) => {
      return new Promise((resolve, reject) => {
        tiepDonProvider
          .kiemTraThanhToan(payload)
          .then((s) => {
            if (
              s.code == 0 ||
              s.code == 7925 ||
              s.code == 7924 ||
              s.code == 7922
            )
              resolve(s);
            else {
              if (s.message) {
                message.error(s.message);
              }
              dispatch.tiepDon.updateDetail(s.data);
            }
          })
          .catch((e) => {
            message.error(e.message || "Không tìm thấy thông tin bệnh nhân");
          });
      });
    },
    getDetail: (id, state) => {
      return new Promise((resolve, reject) => {
        tiepDonProvider
          .getDetail(id)
          .then((s) => {
            if (s.code === 0 && s.data) {
              dispatch.tiepDon.updateDetail(s.data);
              resolve(s);
            } else {
              reject(s);
              message.error(s?.message);
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    giamDinhThe: (payload, state) => {
      return new Promise((resolve, reject) => {
        tiepDonProvider.giamDinhThe(payload).then((s) => {
          if (s.code === 0 && s.data) {
            resolve(s);
          } else {
            resolve(s);
          }
        });
      }).catch((e) => {
        dispatch.tiepDon.updateData({ loadingNotification: false });
        message.error(e?.message);
      });
    },
    hienThiThongTinThe: (data, state) => {
      const listAllTheBaoHiem = state.theBaoHiem.listAllTheBaoHiem || [];
      const nbTheBaoHiem = state.tiepDon.nbTheBaoHiem;
      const doiTuong = state.tiepDon.doiTuong;
      const auth = state.auth.auth;
      if (data) {
        dispatch.goiSo.updateData({
          daThanhToan: true,
          messageChuaThanhToan: "",
        });
        if (!data?.boQuaTheLoi) {
          let gtTheTu = data?.gtTheTu && data?.gtTheTu.split("/");
          let gtTheDen = data?.gtTheDen && data?.gtTheDen.split("/");
          let ngaySinh = data?.ngaySinh && data?.ngaySinh.split("/");
          let date =
            ngaySinh?.length === 3
              ? moment(`${ngaySinh[2]}/${ngaySinh[1]}/${ngaySinh[0]}`)
              : "";
          let mucHuong = data?.maThe?.substr(0, 3);

          let dataCheck = listAllTheBaoHiem?.find(
            (item) => item.ma == mucHuong
          );
          const newState = {
            nbTheBaoHiem: {
              ...nbTheBaoHiem,
              tuNgay:
                gtTheTu?.length === 3 &&
                moment(`${gtTheTu[2]}/${gtTheTu[1]}/${gtTheTu[0]}`),
              denNgay:
                gtTheDen?.length === 3 &&
                moment(`${gtTheDen[2]}/${gtTheDen[1]}/${gtTheDen[0]}`),
              noiDangKyId: data?.noiDangKy?.id,
              noiDangKy: data?.noiDangKy,
              maThe: data?.maThe,
              thoiGianDu5Nam: moment(data?.thoiGianDu5Nam),
              boQuaTheLoi: data?.boQuaTheLoi,
              mucHuong: dataCheck?.mucHuong,
            },
          };
          if (doiTuong != 2) {
            //nếu đang không là đối tượng bảo hiểm
            dispatch.loaiDoiTuong.getListAllLoaiDoiTuong({ doiTuong: 2 }); //search lại list loại đối tượng
            newState.doiTuong = 2; //set đối tượng =2 là bảo hiểm
            newState.loaiDoiTuongId = null; //loại đối tượng = null để người dùng chọn lại loại đối tương
          } else {
            //ngược lại thì giữ nguyên đối tượng và loại đối tượng hiện tại
          }
          dispatch.information.getMaNbByMaBhyt(data?.maThe);
          //update lại các thông tin
          // let diaChi = (data?.diaChi || "").split(", ");
          // const soNha = diaChi.length > 3 ? diaChi[0] : "";
          // diaChi =
          //   diaChi.length > 3 ? diaChi.slice(1, 4).join(", ") : diaChi.join(", ");
          dispatch.tiepDon.updateData({
            ...newState,
            // nbDiaChi: {
            //   diaChi: diaChi,
            //   soNha: soNha,
            //   quocGiaId: dataMacDinh?.quocGia?.id,
            // },
            soBaoHiemXaHoi: data?.soBaoHiemXaHoi,
            ngaySinh: {
              date,
              str: date && date?.format("DD/MM/YYYY"),
            },
            tenNb: data?.hoTen,
            gioiTinh: data?.gioiTinh == "Nam" ? 1 : 2,
            tuoi: date?._d?.getAge(),
            checkFormBhyt: true,
            checkNoiGioiThieu:
              auth?.benhVien?.id === data?.noiDangKy?.id ? false : true,
          });
        } else {
          let obj = {
            ...nbTheBaoHiem,
            boQuaTheLoi: data?.boQuaTheLoi,
          };
          dispatch.tiepDon.updateData({ nbTheBaoHiem: obj });
        }
      }
    },
    kiemTraThanhToan: (payload, state) => {
      return new Promise((resolve, reject) => {
        tiepDonProvider
          .kiemTraThanhToan(payload)
          .then((s) => {
            dispatch.tiepDon.updateDetail(s.data);
            resolve(s);
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    macDinh: (id, state) => {
      return new Promise((resolve, reject) => {
        tiepDonProvider
          .macDinh()
          .then((s) => {
            let nbDiaChi = state.tiepDon.nbDiaChi || {};
            nbDiaChi.quocGiaId = s?.data?.quocGia?.id;
            if (s?.code === 0) {
              if (id) {
                dispatch.tiepDon.updateData({
                  dataMacDinh: s?.data || {},
                });
              } else {
                let doiTuong = s?.data?.doiTuong;
                dispatch.loaiDoiTuong.getListAllLoaiDoiTuong({
                  doiTuong: doiTuong,
                });
                dispatch.tiepDon.updateData({
                  doiTuong: doiTuong,
                  loaiDoiTuongId: s?.data?.loaiDoiTuong?.id,
                  quocTichId: s?.data?.quocTich?.id,
                  danTocId: s?.data?.danToc?.id,
                  nbDiaChi: { ...nbDiaChi },
                  dataMacDinh: s?.data || {},
                });
              }
            }
            resolve(s);
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    updateDetail: (payload, state) => {
      let data = payload || {};
      let doiTuong = data.doiTuong;
      if (doiTuong)
        dispatch.loaiDoiTuong.getListAllLoaiDoiTuong({ doiTuong: doiTuong });
      let selectedAddress = false;
      if (data.nbDiaChi) {
        selectedAddress = !!(
          data.nbDiaChi.tinhThanhPhoId && data.nbDiaChi.diaChi
        );
      }
      dispatch.tiepDon.updateData({
        id: data.id,
        maHoSo: data.maHoSo,
        anhDaiDien: data.anhDaiDien,
        maNb: data.maNb,
        tenNb: data.tenNb,
        loaiKcb: data.loaiKcb,
        gioiTinh: data.gioiTinh,
        ngaySinh: data.ngaySinh && {
          str: data.chiNamSinh
            ? moment(data.ngaySinh).format("YYYY")
            : moment(data.ngaySinh).format("DD/MM/YYYY"),
          date: data.ngaySinh,
        },
        chiNamSinh: data.chiNamSinh,
        thangTuoi: data.thangTuoi,
        tuoi: data.tuoi,
        soDienThoai: data.soDienThoai,
        khoaId: data.khoaId,
        khoaTiepDonId: data.khoaTiepDonId,
        quocTichId: data.quocTichId,
        ngheNghiepId: data.ngheNghiepId,
        soBaoHiemXaHoi: data.soBaoHiemXaHoi,
        email: data.email,
        danTocId: data.danTocId,
        doiTuong: doiTuong,
        loaiDoiTuongId: data.loaiDoiTuongId,
        uuTien: data.uuTien,
        capCuu: data.capCuu,
        nbQuanNhan: data.nbQuanNhan,
        nbDiaChi: data.nbDiaChi,
        nbGiayToTuyThan: data.nbGiayToTuyThan,
        nbMienPhi: data.nbMienPhi,
        nbNguoiBaoLanh: data.nbNguoiBaoLanh,
        nbTheBaoHiem: data.nbTheBaoHiem,
        nbCapCuu: data.nbCapCuu,
        nbChanDoan: data.nbChanDoan,
        stt: data.stt,
        checkNgaySinh: true,
        nbNguonNb: data?.nbNguonNb,
        hangThe: data?.hangThe,
        hangTheId: data?.hangTheId,
        covid: data.covid,
        selectedAddress,
      });
    },
    resetData: (payload, state) => {
      dispatch.loaiDoiTuong.getListAllLoaiDoiTuong({
        doiTuong: state.tiepDon?.dataMacDinh?.doiTuong?.id || 1,
      });
      dispatch.tiepDon.clearData({
        dataMacDinh: state.tiepDon?.dataMacDinh,
        quocTichId: state.tiepDon?.dataMacDinh?.quocTich?.id,
        loaiDoiTuongId: state.tiepDon?.dataMacDinh?.loaiDoiTuong?.id,
        doiTuong: state.tiepDon?.dataMacDinh?.doiTuong?.id || 1,
        nbDiaChi: { quocGiaId: state.tiepDon?.dataMacDinh?.quocGia?.id },
        ...payload,
      });
    },
    loadNguoiBenh: (payload, state, ignoreCheckCardInsurance) => {
      let data = payload || {};
      if (data.maTheBhyt && !ignoreCheckCardInsurance) {
        dispatch.tiepDon
          .giamDinhThe({
            hoTen: data.tenNb,
            ngaySinh: data.ngaySinh,
            maThe: data.maTheBhyt,
          })
          .then((res) => {
            const { data = {} } = res;
            const noiDangKy = (state.benhVien.listAllBenhVien || []).find(
              (item) => item.ma == data?.maDKBDMoi
            );
            let day5nam = data?.ngayDu5Nam && data?.ngayDu5Nam.split("/");
            if (day5nam && day5nam.length === 3) {
              day5nam = `${day5nam[2]}/${day5nam[1]}/${day5nam[0]}`;
            }
            let mucHuong = data?.maThe?.substr(0, 3);
            let dataCheck = state.theBaoHiem?.listAllTheBaoHiem?.find(
              (item) => item.ma == mucHuong
            );
            dispatch.tiepDon.updateData({
              loadingNotification: false,
              doiTuong: 2,
              loaiDoiTuongId: null,
              theBaoHiem: data,
              nbTheBaoHiem: {
                ...data,
                tuNgay: moment(data.gtTheTu, "DD/MM/YYYY"),
                denNgay: moment(data.gtTheDen, "DD/MM/YYYY"),
                noiDangKyId: noiDangKy?.id,
                noiDangKy: noiDangKy,
                thoiGianDu5Nam: moment(day5nam),
                mucHuong: dataCheck?.mucHuong,
                soBaoHiemXaHoi: data?.maSoBHXH,
              },
            });
          })
          .catch((e) => {
            dispatch.tiepDon.updateData({
              doiTuong: 2,
              loaiDoiTuongId: null,
              loadingNotification: false,
            });
            message.error("Lấy thông tin thẻ bảo hiểm thất bại");
          });
      }
      let doiTuong = data?.doiTuong || 1;
      let doiTuongMacDinh = state.tiepDon?.dataMacDinh?.doiTuong;
      if (doiTuong && doiTuong !== doiTuongMacDinh) {
        dispatch.loaiDoiTuong.getListAllLoaiDoiTuong({ doiTuong: doiTuong });
        dispatch.tiepDon.updateData({ loaiDoiTuongId: null });
      }
      let tuoi = data?.ngaySinh && moment(data?.ngaySinh)?._d?.getAge();
      let thangTuoi =
        tuoi <= 3 && data?.ngaySinh
          ? moment().diff(moment(data?.ngaySinh), "months")
          : null;
      dispatch.loaiDoiTuong.getListAllLoaiDoiTuong({ doiTuong });
      dispatch.tiepDon.updateData({
        loadingNotification: !!data?.maThe || !!data?.maTheBhyt,
        anhDaiDien: data?.anhDaiDien,
        nbLaySo: data,
        stt: data?.stt,
        doiTuong: doiTuong ? doiTuong : doiTuongMacDinh,
        tenNb: data?.tenNb,
        maNb: data?.maNb,
        uuTien: data?.uuTien,
        covid: data?.covid,
        nbTheBaoHiem: {
          ...state.tiepDon?.nbTheBaoHiem,
          maThe: data?.maThe || data?.maTheBhyt,
        },
        soDienThoai: data?.soDienThoai,
        ngaySinh: {
          date: data?.ngaySinh,
          str: data?.ngaySinh && moment(data?.ngaySinh).format("DD/MM/YYYY"),
        },
        tuoi: tuoi,
        thangTuoi: thangTuoi,
        gioiTinh: data?.gioiTinh,
        nbDiaChi: {
          ...state.tiepDon?.nbDiaChi,
          soNha: data?.soNha,
          xaPhuongId: data?.xaPhuongId,
          xaPhuong: data?.xaPhuong,
          quanHuyenId: data?.quanHuyenId,
          quanHuyen: data?.quanHuyen,
          tinhThanhPhoId: data?.tinhThanhPhoId,
          tinhThanhPho: data?.tinhThanhPho,
        },
      });
    },
  }),
};
