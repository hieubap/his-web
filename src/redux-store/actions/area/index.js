import areaProvider from "@data-access/area-provider";
import snackbar from "@utils/snackbar-utils";
import stringUtils from "mainam-react-native-string-utils";
import { Modal } from "antd";
import translate from '../../../translations';
const { confirm } = Modal;

function updateData(data) {
  return dispatch => {
    dispatch({
      type: "AREA-UPDATE-DATA",
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
      let searchMa = action === "ma" ? item : getState().area.searchMa
      let searchTen = action === "ten" ? item : getState().area.searchTen
      let searchActive = action === "active" ? item : getState().area.searchActive
      let searchCreatedAt = action === "createdAt" ? item : getState().area.searchCreatedAt
      let searchDonViId = action === "donViId" ? item : getState().area.searchDonViId
      dispatch(
        updateData({
          searchMa: searchMa,
          searchTen: searchTen,
          searchCreatedAt: searchCreatedAt,
          searchActive: searchActive,
          searchDonViId: searchDonViId
        })
      );
    }
    setTimeout(() => {
      dispatch(gotoPage(0));
    }, 500)
  };
}

function gotoPage(page) {
  return (dispatch, getState) => {
    dispatch(updateData({ page: page }));
    let size = getState().area.size || 10;
    let ma = getState().area.searchMa
    let ten = getState().area.searchTen
    ten = encodeURIComponent(ten)
    let createdAt = getState().area.searchCreatedAt ? new Date(getState().area.searchCreatedAt).format("YYYY-MM-dd") : null
    let active = getState().area.searchActive
    let donViId = getState().area.searchDonViId
    areaProvider.search(page, size, ma, ten, createdAt, active, donViId).then(s => {
      if (s && s.code === 0) {
        dispatch(
          updateData({
            total: s.totalElements || size,
            data: s.data || []
          })
        );
      }
    });
  };
}
function loadListArea() {
  return (dispatch, getState) => {
    areaProvider.search(0, 2000).then(s => {
      switch (s.code) {
        case 0:
          dispatch(
            updateData({
              area: s.data,
              total: s.totalElements,
            })
          );
          break;
        default:
      }
    });
  };
}
function createOrEdit() {
  return (dispatch, getState) => {
    let intl = getState().Intl.locale
    let dataTranslate = translate[intl]
    return new Promise((resolve, reject) => {
      let id = getState().area.id;
      let ten = getState().area.ten;
      let ma = getState().area.ma;
      let donViId = getState().area.donViId;
      let ghiChu = getState().area.ghiChu;
      let active = getState().area.active;
      areaProvider.createOrEdit(id, ten, ma, ghiChu, donViId, active).then(s => {
        if (s.code == 0) {
          dispatch(
            updateData({
              id: "",
              ten: "",
              ma: "",
              donViId: "",
              ghiChu: "",
              showCreateOrEdit: false,
              active: false
            })
          );
          if (!id) {
            snackbar.show((dataTranslate.messages || {}).themmoikhuvucthanhcong, "success");
          } else {
            snackbar.show((dataTranslate.messages || {}).capnhatkhuvucthanhcong, "success");
          }
          dispatch(gotoPage(0));
          resolve(s.data);
        } else if (s.code === 1602) {
          snackbar.show((dataTranslate.messages || {}).tenkhuvuctontai, "danger");
        } else if (s.code === 1603) {
          snackbar.show((dataTranslate.messages || {}).makhuvuctontai, "danger");
        } else {
          if (!id) {
            snackbar.show(s.message || (dataTranslate.messages || {}).themmoikhuvucthatbai, "danger");
          } else {
            snackbar.show(s.message || (dataTranslate.messages || {}).capnhatkhuvucthatbai, "danger");
          }
          reject();
        }
      }).catch(e => {
        snackbar.show((dataTranslate.messages || {}).themmoikhuvucthatbai, "danger");
        reject();
      });
    });
  };
}
function onDeleteItem(item) {
  return (dispatch, getState) => {
    let intl = getState().Intl.locale
    let dataTranslate = translate[intl]
    return new Promise((resolve, reject) => {
      confirm({
        title: (dataTranslate.messages || {}).oki,
        content: (dataTranslate.messages || {}).bancomuonxoakhuvuc,
        okText: (dataTranslate.messages || {}).xoa,
        okType: "danger",
        cancelText: (dataTranslate.messages || {}).huy,
        onOk() {
          areaProvider
            .delete(item.id)
            .then(s => {
              if (s.code == 0) {
                snackbar.show((dataTranslate.messages || {}).xoakhuvucthanhcong, "success");
                dispatch(gotoPage(0));
                resolve();
              } else {
                snackbar.show((dataTranslate.messages || {}).xoakhuvucthatbat, "danger");
                reject();
              }
            })
            .catch(e => {
              snackbar.show((dataTranslate.messages || {}).xoakhuvucthatbat, "danger");
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
  loadListArea,
  gotoPage,
  onSearch,
  onSizeChange,
  onDeleteItem,
};
