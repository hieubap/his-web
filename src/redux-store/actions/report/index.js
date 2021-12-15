import reportProvider from "@data-access/report-provider";
import ttHanhChinhProvider from "@data-access/tt-hanh-chinh-provider";
import snackbar from "@utils/snackbar-utils";
import stringUtils from "mainam-react-native-string-utils";
import moment from "moment";
import { Modal } from "antd";
import translate from "../../../translations";
const { confirm } = Modal;

function updateData(data) {
  return (dispatch) => {
    dispatch({
      type: "REPORT-UPDATE-DATA",
      data: data,
    });
  };
}

function onSizeChange(size) {
  return (dispatch, getState) => {
    dispatch(
      updateData({
        size: size,
      })
    );
    dispatch(gotoPage(0));
  };
}

function gotoPage(page) {
  return (dispatch, getState) => {
    let intl = getState().Intl.locale;
    let dataTranslate = translate[intl];
    dispatch(updateData({ page: page }));
    let tuNgay =
      (getState().report.tuNgay &&
        moment(getState().report.tuNgay).format("YYYY-MM-DDTHH:mm:ss")) ||
      moment(new Date()).format("YYYY-MM-DDT00:00:00");
    let denNgay =
      (getState().report.denNgay &&
        moment(getState().report.denNgay).format("YYYY-MM-DDTHH:mm:ss")) ||
      moment(new Date()).format("YYYY-MM-DDT23:59:59");
    let khuVucCheckInId = getState().report.searchKhuVucCheckInId;
    let khuVucCheckOutId = getState().report.khuVucCheckOutId;
    let donViId = getState().report.searchDonViId;
    let doiTuongIds = getState().report.doiTuongIds;
    let hoVaTen = getState().report.hoVaTen || "";
    hoVaTen = encodeURIComponent(hoVaTen);
    let maKhach = getState().report.maKhach || "";
    let soCanCuoc = getState().report.soCanCuoc || "";
    let soDienThoai = getState().report.soDienThoai || "";
    let size = getState().report.size || 10;
    return new Promise((resolve, reject) => {
      reportProvider
        .search(
          {page,size,
          tuNgay,
          denNgay,
          khuVucCheckInId,
          khuVucCheckOutId,
          donViId,
          doiTuongIds,
          hoVaTen:hoVaTen.trim(),
          maKhach:maKhach.trim(),
          soCanCuoc:soCanCuoc.trim(),
          soDienThoai:soDienThoai.trim()
          }
        )
        .then((s) => {
          if (s && s.code === 0) {
            dispatch(
              updateData({
                total: s.totalElements || 0,
                data: s.data || [],
              })
            );
            resolve(s.data);
          } else {
            snackbar.show(
              s && s.message
                ? s.message
                : (dataTranslate.messages || {}).xayraloi,
              "danger"
            );
          }
        });
    });
  };
}
function searchKhuVucTarget(donViId) {
  return (dispatch, getState) => {
    dispatch(updateData({ donViId: donViId }));
    return new Promise((resolve, reject) => {
      var tongKhuVuc = [];
      donViId &&
        donViId.length &&
        donViId.forEach((item) => {
          // Tạo vòng lặp lấy dữ liệu từng donViId gộp chung thành 1 mảng
          reportProvider
            .searchKhuVuc(item)
            .then((s) => {
              if (s && s.code === 0) {
                let tungKhuVuc = s.data;
                tongKhuVuc.push(tungKhuVuc);
                dispatch(
                  updateData({
                    dataKhuVucBase: tongKhuVuc || [],
                  })
                );
                resolve(s.data || []);
              } else {
                reject();
              }
            })
            .then((s) => {
              let dataKhuVucBase = getState().report.dataKhuVucBase;
              let newDataKhuVucBase = dataKhuVucBase.reduce((begin, value) => {
                // làm phẳng mảng
                return begin.concat(value);
              }, []);
              let data = newDataKhuVucBase.map((item, index) => {
                // biến đổi về dạng dữ liệu cần sử d
                return {
                  key: index,
                  id: item.id,
                  ten: item.donVi.ten + " - " + item.ten,
                };
              });
              dispatch(
                updateData({
                  dataKhuVucTarget: data || [],
                })
              );
            });
        });
    });
  };
}
function searchKhuVuc(donViId) {
  return (dispatch, getState) => {
    dispatch(updateData({ donViId: donViId }));
    return new Promise((resolve, reject) => {
      reportProvider.searchKhuVuc(donViId).then((s) => {
        if (s && s.code === 0) {
          dispatch(
            updateData({
              dataKhuVuc: s.data || [],
            })
          );
          resolve(s.data || []);
        } else {
          reject();
        }
      });
    });
  };
}
function searchNgheNghiep() {
  return (dispatch, getState) => {
    reportProvider.searchNgheNghiep().then((s) => {
      if (s && s.code === 0) {
        dispatch(
          updateData({
            dataNgheNghiep: s.data || [],
          })
        );
      }
    });
  };
}
function searchDoiTuong(donViId, khuVucId, checkin) {
  return (dispatch, getState) => {
    dispatch(
      updateData({
        donViId: donViId,
        khuVucId: khuVucId,
      })
    );
    return new Promise((resolve, reject) => {
      reportProvider
        .searchDoiTuong(donViId, khuVucId)
        .then((s) => {
          if (s && s.code === 0) {
            if (checkin) {
              resolve(s);
            } else {
              let data =
                s.data &&
                s.data.length &&
                s.data.map((item) => {
                  item.checked = true;
                  return item;
                });
              dispatch(
                updateData({
                  dataDoiTuong: data || [],
                })
              );
              resolve(data);
            }
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  };
}
function searchDonVi(boCauHoi) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      reportProvider.searchDonVi().then((s) => {
        if (s && s.code === 0) {
          if (boCauHoi) {
            let auth = getState().auth.auth;
            let rolesLogin =
              auth &&
              auth.authorities &&
              auth.authorities.length &&
              auth.authorities.find(
                (option) => option === "ROLE_admin_ivisitor"
              );
            if (rolesLogin) {
              dispatch(updateData({ dataDonVi: s.data || [] }));
            } else {
              let data =
                s.data &&
                s.data.find((item) => {
                  return item.id === (auth ? auth.donViId : null);
                });
              dispatch(updateData({ dataDonVi: data ? [data] : [] }));
            }
            resolve(s.data || []);
          } else {
            dispatch(
              updateData({
                dataDonVi: s.data || [],
              })
            );
            resolve(s.data || []);
          }
        } else {
          reject();
        }
      });
    });
  };
}
function searchRoles() {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      reportProvider.searchRoles().then((s) => {
        if (s && s.code === 0) {
          dispatch(
            updateData({
              dataRoles: s.data || [],
            })
          );
          resolve(s.data);
        }
      });
    });
  };
}
function onSort(key, value) {
  return (dispatch, getState) => {
    dispatch(
      updateData({
        sort: {
          key,
          value,
        },
      })
    );
    dispatch(gotoPage(0));
  };
}
function loadReportDetail(id) {
  return (dispatch, getState) => {
    let intl = getState().Intl.locale;
    let dataTranslate = translate[intl];
    return new Promise((resolve, reject) => {
      reportProvider
        .getById(id)
        .then((s) => {
          if (s && s.code == 0 && s.data) {
            dispatch(
              updateData({
                id: s.data.id,
                ttHanhChinh: s.data.ttHanhChinh,
                ngayCheckIn: s.data.ngayCheckIn,
                anhDaiDien: s.data.anhDaiDien,
                khuVucCheckInId: s.data.khuVucCheckInId,
                donViId: s.data.donViId,
                donVi: s.data.donVi,
                doiTuong: s.data.doiTuong,
                anhCanCuoc: s.data.anhCanCuoc,
                khaiBaoYTe: s.data.khaiBaoYTe,
                boCauHoi: s.data.khaiBaoYTe && s.data.khaiBaoYTe.boCauHoi,
                thongTinDoiTuongLienHe: s.data.thongTinDoiTuongLienHe,
                phanLoai: s.data.phanLoai,
              })
            );
            resolve(s);
            return;
          }
          snackbar.show(
            (dataTranslate.messages || {}).thongbaodetail,
            "danger"
          );
          reject(s);
        })
        .catch((e) => {
          snackbar.show(
            e && e.message
              ? e.message
              : (dataTranslate.messages || {}).xayraloi,
            "danger"
          );
          reject(e);
        });
    });
  };
}
function searchBoCauHoi(donViId, doiTuongId, KhuVucId) {
  return (dispatch, getState) => {
    dispatch(updateData({ donViId, doiTuongId, KhuVucId }));
    reportProvider.searchBoCauHoi(donViId, doiTuongId, KhuVucId).then((s) => {
      if (s && s.code === 0) {
        dispatch(
          updateData({
            dataBoCauHoi: s.data || [],
          })
        );
      }
    });
  };
}
function getByIdDonVi(id) {
  return (dispatch, getState) => {
    let intl = getState().Intl.locale;
    let dataTranslate = translate[intl];
    return new Promise((resolve, reject) => {
      reportProvider
        .getByIdDonVi(id)
        .then((s) => {
          if (s && s.code == 0 && s.data) {
            dispatch(
              updateData({
                donViTen: s.data.ten,
                // donViId: s.data.donViId,
                // khuVucId: s.data.khuVucCheckInId,
              })
            );
            resolve(s);
            return;
          }
          snackbar.show(
            (dataTranslate.messages || {}).thongbaodetail,
            "danger"
          );
          reject(s);
        })
        .catch((e) => {
          snackbar.show(
            e && e.message
              ? e.message
              : (dataTranslate.messages || {}).xayraloi,
            "danger"
          );
          reject(e);
        });
    });
  };
}
function searchKhoaTarget(donViId) {
  return (dispatch, getState) => {
    dispatch(updateData({ donViId: donViId }));
    return new Promise((resolve, reject) => {
      var tongKhoa = [];
      donViId &&
        donViId.length &&
        donViId.forEach((item) => {
          // Tạo vòng lặp lấy dữ liệu từng donViId gộp chung thành 1 mảng
          ttHanhChinhProvider
            .getAllKhoa(item)
            .then((s) => {
              if (s && s.data) {
                let tungKhoa = s.data;
                tongKhoa.push(tungKhoa);
                dispatch(
                  updateData({
                    dataKhoaBase: tongKhoa || [],
                  })
                );
                resolve(s.data || []);
              } else {
                reject();
              }
            })
            .then((s) => {
              let dataKhoaBase = getState().report.dataKhoaBase;
              let newDataKhoaBase = dataKhoaBase.reduce((begin, value) => {
                // làm phẳng mảng
                return begin.concat(value);
              }, []);
              let data = newDataKhoaBase.map((item, index) => {
                // biến đổi về dạng dữ liệu cần sử d
                return {
                  key: index,
                  id: item.id,
                  ten: item.ten,
                };
              });
              dispatch(
                updateData({
                  dataKhoaTarget: data || [],
                })
              );
            });
        });
    });
  };
}

function searchKhoa(donViId) {
  return (dispatch, getState) => {
    dispatch(updateData({ donViId: donViId }));
    return new Promise((resolve, reject) => {
      ttHanhChinhProvider.getAllKhoa(donViId)
      .then((s) => {
        if (s && s.data) {
          dispatch(
            updateData({
              dataKhoa: s.data || [],
            })
          );
          resolve(s.data || []);
        } else {
          reject();
        }
      });
    });
  };
}

export default {
  updateData,
  gotoPage,
  onSizeChange,
  onSort,
  searchKhuVuc,
  searchDoiTuong,
  searchDonVi,
  searchNgheNghiep,
  searchRoles,
  loadReportDetail,
  getByIdDonVi,
  searchBoCauHoi,
  searchKhuVucTarget,
  searchKhoaTarget,
  searchKhoa,
};
