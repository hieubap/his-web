import postProvider from "@data-access/post-provider";
import snackbar from "@utils/snackbar-utils";
import { Modal } from "antd";
import translate from '../../../translations';

const { confirm } = Modal;

function updateData(data) {
  return dispatch => {
    dispatch({
      type: "PORT-UPDATE-DATA",
      data: data
    });
  };
}
function onSizeChange(size) {
  return (dispatch, getState) => {
    dispatch(
      updateData({
        size: size
      })
    );
    dispatch(gotoPage(0));
  };
}

function onSearch(item, action) {
  return (dispatch, getState) => {
    if (item === undefined && action === undefined) {
    } else {
      let searchMa = action === "ma" ? item : getState().post.searchMa
      let searchDonViId = action === "donViId" ? item : getState().post.searchDonViId
      let searchKhuVucId = action === "khuVucId" ? item : getState().post.searchKhuVucId
      let searchDoiTuongId = action === "doiTuongId" ? item : getState().post.searchDoiTuongId
      let searchTen = action === "ten" ? item : getState().post.searchTen
      let searchActive = action === "active" ? item : getState().post.searchActive
      let searchCreatedAt = action === "createdAt" ? item : getState().post.searchCreatedAt
      dispatch(
        updateData({
          searchMa: searchMa,
          searchDonViId: searchDonViId,
          searchKhuVucId: searchKhuVucId,
          searchDoiTuongId: searchDoiTuongId,
          searchTen: searchTen,
          searchCreatedAt: searchCreatedAt,
          searchActive: searchActive
        })
      );
    }
    setTimeout(() => {
      dispatch(gotoPage(0));
    }, 500)
  };
}

function gotoPage(page, donVi, khuVuc, doiTuong, maKhach) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch(updateData({ page: page }));
      let size = getState().post.size || 10;
      let ma = maKhach ? maKhach : getState().post.searchMa
      let donViId = donVi ? donVi : getState().post.searchDonViId
      let khuVucId = khuVuc ? khuVuc : getState().post.searchKhuVucId
      let doiTuongId = doiTuong ? doiTuong : getState().post.searchDoiTuongId
      let ten = getState().post.searchTen
      ten = encodeURIComponent(ten ? ten : "")
      let createdAt = getState().post.searchCreatedAt ? new Date(getState().post.searchCreatedAt).format("YYYY-MM-dd") : null
      let active = getState().post.searchActive
      postProvider.search(page, size, ma, donViId, khuVucId, doiTuongId, ten, createdAt, active).then(s => {
        if (s && s.code === 0) {
          let questions = getState().post.data || {};
          questions[getState().ttHanhChinh.khuVucId + "_" + getState().ttHanhChinh.doiTuongId] = s.data && s.data[0];
          dispatch(
            updateData({
              total: s.totalElements || size,
              data: s.data || [],
              questions: questions,
              dataQuestions: s.data && s.data[0]
            })
          );
          resolve(questions);
        } else {
          reject();
        }
      }).catch((e) => { reject(e); });
    });
  };
}
function searchAllQuestions(donVi, khuVuc, doiTuong) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      postProvider.searchAll(donVi, khuVuc, doiTuong).then(s => {
        if (s && s.code === 0) {
          let questions = getState().post.questions || {};
          questions[khuVuc + "_" + doiTuong] = s.data;
          dispatch(
            updateData({
              questions: questions,
              dataQuestions: s.data
            })
          );
          resolve(questions);
        }
      }).catch((e) => {
        reject(e);
      });
    });
  };
}
function loadListPost() {
  return (dispatch, getState) => {
    postProvider.search(0, 2000).then(s => {
      switch (s.code) {
        case 0:
          dispatch(
            updateData({
              post: s.data,
              total: s.totalElements,
            })
          );
          break;
        default:
      }
    });
  };
}
function loadSetPostDetail(id) {
  return (dispatch, getState) => {
    let intl = getState().Intl.locale
    let dataTranslate = translate[intl]
    return new Promise((resolve, reject) => {
      postProvider
        .getByIdSetPost(id)
        .then(s => {
          if (s && s.code == 0 && s.data) {
            dispatch(
              updateData({
                boCauHoiId: s.data.id,
                dataPost: s.data.cauHoi,
                ma: s.data.ma,
                ten: s.data.ten,
                donViId: s.data.donViId,
                khuVucId: s.data.khuVucId,
                doiTuongId: s.data.doiTuongId,
                active: s.data.active,
                doiTuong: s.data.doiTuong,
                donVi: s.data.donVi,
                khuVuc: s.data.khuVuc,
                // trlsPost: [],
                // trls: s.data.trls
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
function createOrEditSetPost() {
  return (dispatch, getState) => {
    let intl = getState().Intl.locale
    let dataTranslate = translate[intl]
    return new Promise((resolve, reject) => {
      let id = getState().post.boCauHoiId;
      let ma = getState().post.ma.trim();
      let ten = getState().post.ten.trim();
      let donViId = getState().post.donViId;
      let khuVucIds = getState().post.khuVucIds;
      let doiTuongIds = getState().post.doiTuongIds;
      let active = getState().post.active
      let trls = getState().post.trls && getState().post.trls.length && getState().post.trls.filter(item => {
        return item.ten
      }).map(item => {
        return {
          language: item.language,
          ten: item.ten
        }
      });
      postProvider.createOrEditSetPost(id, ma, ten, donViId, khuVucIds, doiTuongIds, active, trls).then(s => {
        if (s.code == 0) {
          if (!id) {
            snackbar.show((dataTranslate.messages || {}).themmoibocauhoithanhcong, "success");
          } else {
            snackbar.show((dataTranslate.messages || {}).capnhatbocauhoithanhcong, "success");
          }
          dispatch(loadListPost());
          resolve(s.data);
        } else {
          if (!id) {
            snackbar.show(s.message || (dataTranslate.messages || {}).themmoibocauhoithatbai, "danger");
          } else {
            snackbar.show(s.message || (dataTranslate.messages || {}).capnhatbocauhoithatbai, "danger");
          }
          reject();
        }
      }).catch(e => {
        snackbar.show((dataTranslate.messages || {}).themmoibocauhoithatbai, "danger");
        reject();
      });
    });
  };
}
function createOrEdit() {
  return (dispatch, getState) => {
    let intl = getState().Intl.locale
    let dataTranslate = translate[intl]
    return new Promise((resolve, reject) => {
      let id = getState().post.id;
      let loaiCauHoi = getState().post.loaiCauHoi;
      let soThuTu = getState().post.soThuTu;
      let noiDung = getState().post.noiDung;
      let batBuoc = getState().post.batBuoc ? getState().post.batBuoc : false;
      let nhieuDong = loaiCauHoi === 3 ? getState().post.nhieuDong ? getState().post.nhieuDong : false : null;
      let chonNhieu = loaiCauHoi === 4 ? getState().post.chonNhieu ? getState().post.chonNhieu : false : null;
      let boCauHoiId = getState().post.boCauHoiId;
      let goiY = getState().post.goiY ? getState().post.goiY : "";
      let cauTraLoi = (loaiCauHoi === 4 || loaiCauHoi === 5) ? getState().post.cauTraLoi : null
      let cauHoiChiTiet = loaiCauHoi === 5 ? getState().post.cauHoiChiTiet : null
      let trls = getState().post.trlsPost && getState().post.trlsPost.length ? getState().post.trlsPost.map(item => {
        return {
          language: item.language,
          noiDung: item.noiDung,
          goiY: item.goiY,
          cauTraLoi: item.cauTraLoi && item.cauTraLoi.length ? item.cauTraLoi.map(option => {
            return ({
              noiDung: option.noiDungtrls ? option.noiDungtrls : option.ma ? option.noiDung : null,
              ma: option.ma,
            })
          }) : [],
          cauHoiChiTiet: item.cauHoiChiTiet && item.cauHoiChiTiet.length ? item.cauHoiChiTiet.map(option1 => {
            return ({
              noiDung: option1.noiDungtrls ? option1.noiDungtrls : option1.ma ? option1.noiDung : null,
              ma: option1.ma,
            })
          }) : [],
        }
      }) : [];
      postProvider.createOrEdit(id, loaiCauHoi, soThuTu, noiDung, goiY, batBuoc, boCauHoiId, nhieuDong, chonNhieu, cauTraLoi, cauHoiChiTiet, trls).then(s => {
        if (s.code == 0) {
          dispatch(
            updateData({
              id: "",
              loaiCauHoi: "",
              soThuTu: "",
              noiDung: "",
              goiY: "",
              batBuoc: false,
              nhieuDong: false,
              chonNhieu: false,
              cauTraLoi: [],
              dataShow: {},
              dataShowLanguage: {},
              cauHoiChiTiet: [],
              trlsPost: []
            })
          );
          if (!id) {
            snackbar.show((dataTranslate.messages || {}).themmoicauhoithanhcong, "success");
          } else {
            snackbar.show((dataTranslate.messages || {}).capnhatcauhoithanhcong, "success");
          }
          // dispatch(loadListPost());
          resolve(s.data);
        } else {
          if (!id) {
            snackbar.show(s.message || (dataTranslate.messages || {}).themmoicauhoithatbai, "danger");
          } else {
            snackbar.show(s.message || (dataTranslate.messages || {}).capnhatcauhoithatbai, "danger");
          }
          reject();
        }
      }).catch(e => {
        snackbar.show((dataTranslate.messages || {}).themmoicauhoithatbai, "danger");
        reject();
      });
    });
  };
}
function onDeleteItem(item) {
  return (dispatch, getState) => {
    let intl = getState().Intl.locale
    let dataTranslate = translate[intl]
    let content = (dataTranslate.messages || {}).bancomuonxoabocauhoi
    return new Promise((resolve, reject) => {
      confirm({
        title: (dataTranslate.messages || {}).oki,
        content: `${content} ${item.ten}?`,
        okText: (dataTranslate.messages || {}).xoa,
        okType: "danger",
        cancelText: (dataTranslate.messages || {}).huy,
        onOk() {
          postProvider
            .deleteSetPost(item.id)
            .then(s => {
              if (s.code == 0) {
                snackbar.show((dataTranslate.messages || {}).xoabocauhoithanhcong, "success");
                // dispatch(gotoPage(0));
                let data = getState().post.data || [];
                let index = data.findIndex(x => x.id === item.id);
                if (index !== -1);
                data.splice(index, 1);
                dispatch(
                  updateData({
                    data: [...data]
                  })
                );
                resolve();
              } else {
                snackbar.show((dataTranslate.messages || {}).xoabocauhoithatbat, "danger");
                reject();
              }
            })
            .catch(e => {
              snackbar.show((dataTranslate.messages || {}).xoabocauhoithatbat, "danger");
              reject();
            });
        },
        onCancel() {
          reject();
        }
      });
    });
  };
}
function onDelete(item, boCauHoiId) {
  return (dispatch, getState) => {
    let intl = getState().Intl.locale
    let dataTranslate = translate[intl]
    return new Promise((resolve, reject) => {
      confirm({
        title: (dataTranslate.messages || {}).oki,
        content: (dataTranslate.messages || {}).bancomuonxoacauhoi,
        okText: (dataTranslate.messages || {}).xoa,
        okType: "danger",
        cancelText: (dataTranslate.messages || {}).huy,
        onOk() {
          postProvider
            .delete(item.id)
            .then(s => {
              if (s.code == 0) {
                snackbar.show((dataTranslate.messages || {}).xoacauhoithanhcong, "success");
                // dispatch(loadSetPostDetail(boCauHoiId));
                let data = getState().post.dataPost || [];
                let index = data.findIndex(x => x.id === item.id);
                if (index !== -1);
                data.splice(index, 1);
                dispatch(
                  updateData({
                    dataPost: [...data]
                  })
                );
                resolve();
              } else {
                snackbar.show((dataTranslate.messages || {}).xoacauhoithatbat, "danger");
                reject();
              }
            })
            .catch(e => {
              snackbar.show((dataTranslate.messages || {}).xoacauhoithatbat, "danger");
              reject();
            });
        },
        onCancel() {
          reject();
        }
      });
    });
  };
}
export default {
  updateData,
  createOrEdit,
  loadListPost,
  createOrEditSetPost,
  loadSetPostDetail,
  gotoPage,
  onSearch,
  onSizeChange,
  onDeleteItem,
  onDelete,
  searchAllQuestions
};