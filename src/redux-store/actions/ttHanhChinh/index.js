import ttHanhChinhProvider from "@data-access/tt-hanh-chinh-provider";
import fileProvider from "@data-access/file-provider";
import snackbar from "@utils/snackbar-utils";
import translate from "../../../translations";
import moment from "moment";

function updateData(data) {
  return (dispatch) => {
    dispatch({
      type: "TT-HANH-CHINH-UPDATE-DATA",
      data: data,
    });
  };
}
function clearData() {
  return {
    type: "TT_HANH_CHINH_CLEAR_DATA",
  };
}
function updateDataPost(data) {
  return dispatch => {
    dispatch({
      type: "PORT-UPDATE-DATA",
      data: data
    });
  };
}
function uploadFile(fileName) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      fileProvider.uploadFile(fileName).then(s => {
        if (s && s.code === 0) {
          dispatch(
            updateData({
              anhDaiDien: s.data,
              isUploadingAvatar: false
            })
          )
          resolve(s)
        }
      }).catch((e) => {
        reject(e)
      });
    });
  };
}

function onSearch(value, name) {
  return (dispatch, getState) => {
    if (name === undefined && value === undefined) {
    } else {
      dispatch(
        updateData({
          searchName: name,
          searchValue: value,
        })
      );
    }
    dispatch(gotoPage(0));
  };
}

function gotoPage(page) {
  return (dispatch, getState) => {
    let intl = getState().Intl.locale;
    let dataTranslate = translate[intl];
    dispatch(
      updateData({
        page: page,
        checkSearch: false,
      })
    );
    let size = getState().ttHanhChinh.size;
    let maKhachHang = getState().ttHanhChinh.maKhachHang;
    ttHanhChinhProvider
      .search(page, size, maKhachHang)
      .then((s) => {
        if (s && s.code === 0) {
          dispatch(
            updateData({
              total: s.totalElements || size,
              data: s.data || [],
              checkSearch: false,
            })
          );
          if (!s.data) {
            dispatch(
              updateData({
                checkSearch: true,
              })
            );
          }
        } else {
          updateData({
            checkSearch: true,
          });
        }
      })
      .catch((e) => {
        snackbar.show((dataTranslate.messages || {}).timkiemthatbai, "danger");
      });
  };
}

function createOrEdit() {
  return (dispatch, getState) => {
    let intl = getState().Intl.locale;
    let dataTranslate = translate[intl];
    let ngaySinh = getState().ttHanhChinh.ngaySinh;
    let arr = ngaySinh.split("/");
    let date = "";
    if (arr && arr.length === 3) {
      date = arr[2] + "-" + arr[1] + "-" + arr[0];
    }
    return new Promise((resolve, reject) => {
      let id = getState().ttHanhChinh.id;
      let hoVaTen = getState().ttHanhChinh.hoVaTen && getState().ttHanhChinh.hoVaTen.trim();
      let soCanCuoc = getState().ttHanhChinh.soCanCuoc && getState().ttHanhChinh.soCanCuoc.trim();
      let gioiTinh = getState().ttHanhChinh.gioiTinh;
      let quocTichId = getState().ttHanhChinh.quocTichId;
      let tinhThanhPhoId = getState().ttHanhChinh.tinhThanhPhoId;
      let quanHuyenId = getState().ttHanhChinh.quanHuyenId;
      let xaPhuongId = getState().ttHanhChinh.xaPhuongId;
      let soNha = getState().ttHanhChinh.soNha;
      let soDienThoai = getState().ttHanhChinh.soDienThoai && getState().ttHanhChinh.soDienThoai.trim();
      let sdtNguoiBaoHo = getState().ttHanhChinh.sdtNguoiBaoHo && getState().ttHanhChinh.sdtNguoiBaoHo.trim();
      let qr = getState().ttHanhChinh.qr;
      let ma = getState().ttHanhChinh.ma;
      let ngheNghiepId = getState().ttHanhChinh.ngheNghiepId;
      let nguoiBaoHo = getState().ttHanhChinh.nguoiBaoHo;
      ttHanhChinhProvider
        .createOrEdit(
          id,
          hoVaTen,
          soCanCuoc,
          date,
          parseInt(gioiTinh ? gioiTinh : 1),
          parseInt(quocTichId ? quocTichId : 22),
          tinhThanhPhoId,
          quanHuyenId,
          xaPhuongId,
          soNha,
          soDienThoai,
          sdtNguoiBaoHo,
          qr,
          ma,
          ngheNghiepId,
          nguoiBaoHo
        )
        .then((s) => {
          if (s.code == 0) {
            // let a = s.data.ngaySinh ? moment(s.data.ngaySinh).format("DD/MM/YYYY") : null
            let arr = s.data.ngaySinh && s.data.ngaySinh.split("-");
            let date = "";
            if (arr && arr.length === 3) {
              date = arr[2] + "/" + arr[1] + "/" + arr[0];
            }
            dispatch(
              updateData({
                qr: s.data.qr,
                gioiTinh: s.data.gioiTinh.toString(),
                quocTichId: s.data.quocTichId,
                ngaySinh: date,
                ma: s.data.ma,
                id: s.data.id,
                hoVaTen: s.data.hoVaTen,
                soCanCuoc: s.data.soCanCuoc,
                quocTichId: s.data.quocTichId,
                tinhThanhPhoId: s.data.tinhThanhPhoId,
                quanHuyenId: s.data.quanHuyenId,
                xaPhuongId: s.data.xaPhuongId,
                soNha: s.data.soNha,
                soDienThoai: s.data.soDienThoai,
                sdtNguoiBaoHo: s.data.sdtNguoiBaoHo,
                ngheNghiepId: s.data.ngheNghiepId,
                nguoiBaoHo: s.data.nguoiBaoHo,
              })
            );
            if (!id) {
              snackbar.show(
                (dataTranslate.messages || {}).themthanhcong,
                "success"
              );
            } else {
              snackbar.show(
                (dataTranslate.messages || {}).capnhatthanhcong,
                "success"
              );
            }
            resolve(s.data);
          } else {
            if (!id) {
              snackbar.show(
                s.message || (dataTranslate.messages || {}).themmoithatbai,
                "danger"
              );
            } else {
              snackbar.show(
                s.message || (dataTranslate.messages || {}).capnhatthatbai,
                "danger"
              );
            }
            reject();
          }
        })
        .catch((e) => {
          snackbar.show(
            (dataTranslate.messages || {}).themmoithatbai,
            "danger"
          );
          reject();
        });
    });
  };
}
function checkin(checkClick) {
  return (dispatch, getState) => {
    let intl = getState().Intl.locale;
    let dataTranslate = translate[intl];
    let data = getState().ttHanhChinh;
    // let config = getState().setting.data || [];
    // let temp;
    let arr = (data.ngaySinh || "").split("/");
    let date = "";
    if (arr && arr.length === 3) {
      date = arr[2] + "-" + arr[1] + "-" + arr[0];
    }
    let ttHanhChinh = {
      hoVaTen: data.hoVaTen && data.hoVaTen.trim(),
      soCanCuoc: data.soCanCuoc && data.soCanCuoc.trim(),
      ngaySinh: date,
      gioiTinh: parseInt(data.gioiTinh ? data.gioiTinh : 1),
      quocTichId: parseInt(data.quocTichId ? data.quocTichId : 22),
      tinhThanhPhoId: data.tinhThanhPhoId,
      quanHuyenId: data.quanHuyenId,
      xaPhuongId: data.xaPhuongId,
      soNha: data.soNha && data.soNha.trim(),
      soDienThoai: data.soDienThoai && data.soDienThoai.trim(),
      sdtNguoiBaoHo: data.sdtNguoiBaoHo && data.sdtNguoiBaoHo.trim(),
      qr: data.qr,
      ma: data.ma,
      ngheNghiepId: data.ngheNghiepId,
      nguoiBaoHo: data.nguoiBaoHo && data.nguoiBaoHo.trim(),
      anhDaiDien: data.anhDaiDien,
      otp: getState().phone.otpCode,
      // laSoDienThoaiNguoiThan: data.laSoDienThoaiNguoiThan ? data.laSoDienThoaiNguoiThan : false
    };
    var checkInDate = (checkClick) ? new Date() : data.ngayCheckIn;
    // console.log(checkClick)
    // var checkInDate = data.ngayCheckIn;
    let obj = {
      donViId: data.donViId,
      doiTuongId: data.doiTuongId,
      thongTinDoiTuongLienHe: data.thongTinDoiTuongLienHe,
      trangThai: data.trangThai,
      phanLoai: data.phanLoai || 0,
      ttHanhChinh: ttHanhChinh,
      anhDaiDien: data.anhDaiDien,
      anhCanCuoc: data.anhCanCuoc,
      ngayCheckIn: checkInDate,
      khuVucCheckInId: data.khuVucId
    };
    return new Promise((resolve, reject) => {
      ttHanhChinhProvider.checkin(obj).then((s) => {
        if (s.code == 0) {
          dispatch(
            updateData({
              ttHanhChinh: s.data.ttHanhChinh,
              checkin: s.data,
              ngayCheckIn: s.data.ngayCheckIn,
              ma: s.data.ttHanhChinh && s.data.ttHanhChinh.ma,
              qr: s.data.ttHanhChinh && s.data.ttHanhChinh.qr,
              hoVaTen: s.data.ttHanhChinh && s.data.ttHanhChinh.hoVaTen,
            })
          );
          resolve(s);
        } else {
          reject();
          snackbar.show(s.message || (dataTranslate.messages || {}).checkin_khong_thanh_cong, "danger");
        }
      }).catch((e) => {
        dispatch(updateData({ checkButtonSubmit: false }))
        snackbar.show(e.message || (dataTranslate.messages || {}).checkin_khong_thanh_cong, "danger");
      });
    });
  };
}
function khaiBaoYTe(obj, id) {
  return (dispatch, getState) => {
    let intl = getState().Intl.locale;
    let dataTranslate = translate[intl];
    return new Promise((resolve, reject) => {
      ttHanhChinhProvider.khaiBaoYTe(obj, id).then((s) => {
        if (s.code == 0) {
          let checkin = getState().ttHanhChinh.checkin
          checkin.trangThai = 20;
          dispatch(
            updateData({
              checkin: { ...checkin },
            })
          );
          snackbar.show((dataTranslate.messages || {}).khai_bao_thanh_cong, "success");
          resolve(s);
        } else {
          reject(s);
          snackbar.show(s.message || (dataTranslate.messages || {}).khai_bao_khong_thanh_cong, "danger");
        }
      }).catch((e) => {
        
        // snackbar.show(e.message || (dataTranslate.messages || {}).khai_bao_khong_thanh_cong, "danger");
      });
    });
  };
}
function getAllKhoa(id) {
  return (dispatch) => {
    ttHanhChinhProvider.getAllKhoa(id).then((s) => {
      switch (s.code) {
        case 0:
          let khoa = s.data || [];
          khoa.sort((a, b) => Number(a.ten) - Number(b.ten))
          dispatch(
            updateData({
              listDepartment: khoa,
            })
          );
          break;
      }
    });
  };
}
function searchInfo(ma, qrCode, otp, upload) {
  return (dispatch, getState) => {
    let intl = getState().Intl.locale;
    let dataTranslate = translate[intl];
    return new Promise((resolve, reject) => {
      if (qrCode && qrCode.length > 15 || upload) {
        ttHanhChinhProvider.searchQr(qrCode, upload).then((s) => {
          if (s.code == 0) {
            let data = s.data || {}
            let arr = data.ngaySinh && data.ngaySinh.split("-");
            let date = "";
            if (arr && arr.length === 3) {
              date = arr[2] + "/" + arr[1] + "/" + arr[0];
            }
            dispatch(
              updateData({
                ttHanhChinh: s.data,
                checkin: null,
                id: data.id,
                idCheck: data.id,
                hoVaTen: data.hoVaTen,
                soCanCuoc: data.soCanCuoc,
                ngaySinh: date,
                ngheNghiepId: data.ngheNghiepId,
                nguoiBaoHo: data.nguoiBaoHo,
                gioiTinh: (data.gioiTinh && data.gioiTinh.toString()) || "1",
                soDienThoai: data.soDienThoai,
                sdtNguoiBaoHo: data.sdtNguoiBaoHo,
                quocTichId: data.quocTichId || 22,
                quanHuyenId: data.quanHuyenId,
                soNha: data.soNha,
                tinhThanhPhoId: data.tinhThanhPhoId,
                quanHuyenId: data.quanHuyenId,
                xaPhuongId: data.xaPhuongId,
                anhDaiDien: getState().ttHanhChinh.anhDaiDien ? getState().ttHanhChinh.anhDaiDien : data.anhDaiDien,
                ma: data.ma,
                // qr: data.qr,
                // laSoDienThoaiNguoiThan: data.laSoDienThoaiNguoiThan
              })
            );
            //snackbar.show("Quét mã thành công", "success");
            resolve(s.data);
          } else {
            reject(s);
            snackbar.show(s.message || (dataTranslate.messages || {}).thongbaodetail, "danger");
          }
        });
      } else {
        dispatch(updateData({ showPopupData: false }));
        ttHanhChinhProvider.searchInfo(ma ? ma : qrCode, otp).then((s) => {
          if (s.code == 0) {
            if (s && s.data && s.data.length === 1) {
              let dataPost = s.data[0] || {};
              let data = dataPost.ttHanhChinh || {};
              let arr = data.ngaySinh && data.ngaySinh.split("-");
              let date = "";
              if (arr && arr.length === 3) {
                date = arr[2] + "/" + arr[1] + "/" + arr[0];
              }
              debugger;
              dispatch(
                updateData({
                  ttHanhChinh: s.data.ttHanhChinh,
                  checkin: dataPost,
                  id: dataPost.id,
                  idCheck: data.id,
                  hoVaTen: data.hoVaTen,
                  soCanCuoc: data.soCanCuoc,
                  ngaySinh: date,
                  ngheNghiepId: data.ngheNghiepId,
                  nguoiBaoHo: data.nguoiBaoHo,
                  gioiTinh: (data.gioiTinh && data.gioiTinh.toString()) || "1",
                  soDienThoai: data.soDienThoai,
                  sdtNguoiBaoHo: data.sdtNguoiBaoHo,
                  quocTichId: data.quocTichId || 22,
                  quanHuyenId: data.quanHuyenId,
                  soNha: data.soNha,
                  tinhThanhPhoId: data.tinhThanhPhoId,
                  quanHuyenId: data.quanHuyenId,
                  xaPhuongId: data.xaPhuongId,
                  anhDaiDien: getState().ttHanhChinh.anhDaiDien ? getState().ttHanhChinh.anhDaiDien : dataPost.anhDaiDien,
                  ma: data.ma,
                  // qr: data.qr,
                  // ngayCheckIn: dataPost.ngayCheckIn,
                  doiTuongId: dataPost.doiTuongId,
                  doiTuongMa: dataPost.doiTuong && dataPost.doiTuong.ma,
                  thongTinDoiTuongLienHe: dataPost.thongTinDoiTuongLienHe,
                  answer: dataPost.khaiBaoYTe && dataPost.khaiBaoYTe.traLoi,
                  // donViId: dataPost.donViId,
                  // khuVucId: dataPost.khuVucCheckInId,
                  // laSoDienThoaiNguoiThan: data.laSoDienThoaiNguoiThan
                  phanLoai: dataPost.phanLoai
                })
              );
              let ma = dataPost.ttHanhChinh && dataPost.ttHanhChinh.ma;
              if (ma) {
                dispatch(historyCheckin({ma: ma, page: 0}));
              }
              let donViId = getState().ttHanhChinh.donViId;
              let ngayDen = dataPost.ngayCheckIn && moment(dataPost.ngayCheckIn).format("YYYYMMDD");
              let nowDate = moment(new Date()).format("YYYYMMDD");
              if ((donViId === dataPost.donViId) && dataPost.trangThai != 30) {
                let obj = s.data[0] && s.data[0].ttHanhChinh;
                obj.dataPost = s.data[0];
                obj.checkQuestion = true
                obj.boCauHoiId = s.data[0] && s.data[0].khaiBaoYTe && s.data[0].khaiBaoYTe.boCauHoiId
                resolve(obj);
              } else {
                dispatch(
                  updateData({
                    doiTuongId: '',
                    doiTuongMa: '',
                    answer: [],
                    thongTinDoiTuongLienHe: "",
                    idCheck: ""
                  })
                );
                resolve(s.data[0] && s.data[0].ttHanhChinh);
              }
            } else {
              dispatch(
                updateData({
                  showPopupData: true,
                  dataHistory: s.data
                })
              );
            }
          } else {
            reject(s);
            snackbar.show(s.message || (dataTranslate.messages || {}).thongbaodetail, "danger");
          }
        });
      }
    });
  };
}
function historyCheckin(payload={}) {
  return (dispatch, getState) => {
    let intl = getState().Intl.locale
    let dataTranslate = translate[intl]
    return new Promise((resolve, reject) => {
      ttHanhChinhProvider.historyCheckin(payload).then(s => {
        if (s && s.code == 0 && s.data) {
          dispatch(
            updateData({
              dataHistory: s.data,
            })
          );
          resolve(s);
          return;
        }
        snackbar.show((dataTranslate.messages || {}).thongbaodetail, "danger");
        reject(s);
      })
        .catch(e => {
          snackbar.show(
            e && e.message ? e.message : (dataTranslate.messages || {}).xayraloi,
            "danger"
          );
          reject(e);
        });
    });
  };
}
export default {
  createOrEdit,
  updateData,
  updateDataPost,
  gotoPage,
  onSearch,
  uploadFile,
  checkin,
  getAllKhoa,
  khaiBaoYTe,
  clearData,
  searchInfo,
  historyCheckin
};
