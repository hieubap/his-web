import unitProvider from "@data-access/unit-provider";
import snackbar from "@utils/snackbar-utils";
import stringUtils from "mainam-react-native-string-utils";
import moment from "moment";
import { Modal } from "antd";
import translate from "../../../translations";
const { confirm } = Modal;

function updateData(data) {
  return (dispatch) => {
    dispatch({
      type: "UNIT-UPDATE-DATA",
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

function onSearch(item, action) {
  return (dispatch, getState) => {
    if (item === undefined && action === undefined) {
    } else {
      let searchMa = action === "ma" ? item : getState().unit.searchMa;
      let searchTen = action === "ten" ? item : getState().unit.searchTen;
      let searchActive =
        action === "active" ? item : getState().unit.searchActive;
      let searchCreatedAt =
        action === "createdAt" ? item : getState().unit.searchCreatedAt;
      dispatch(
        updateData({
          searchMa: searchMa,
          searchTen: searchTen,
          searchCreatedAt: searchCreatedAt,
          searchActive: searchActive,
        })
      );
    }
    setTimeout(() => {
      dispatch(gotoPage(0));
    }, 500);
  };
}

function gotoPage(page) {
  return (dispatch, getState) => {
    dispatch(updateData({ page: page }));
    let size = getState().unit.size || 10;
    let ma = getState().unit.searchMa;
    let ten = getState().unit.searchTen;
    ten = encodeURIComponent(ten);
    let createdAt = getState().unit.searchCreatedAt
      ? new Date(getState().unit.searchCreatedAt).format("YYYY-MM-dd")
      : null;
    let active = getState().unit.searchActive;
    unitProvider.search(page, size, ma, ten, createdAt, active).then((s) => {
      if (s && s.code === 0) {
        let data =
          s.data && s.data.length
            ? s.data.sort((a, b) => {
                var nameA = a.ten.toUpperCase();
                var nameB = b.ten.toUpperCase();
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
                return 0;
              })
            : [];
        dispatch(
          updateData({
            total: s.totalElements || size,
            data: data || [],
          })
        );
      }
    });
  };
}
function createOrEdit() {
  return (dispatch, getState) => {
    let intl = getState().Intl.locale;
    let dataTranslate = translate[intl];
    return new Promise((resolve, reject) => {
      let id = getState().unit.id;
      let ten = getState().unit.ten;
      let ma = getState().unit.ma;
      let logo = getState().unit.logo;
      let ghiChu = getState().unit.ghiChu;
      let active = getState().unit.active;
      unitProvider
        .createOrEdit(id, ten, ma, ghiChu, logo, active)
        .then((s) => {
          if (s.code == 0) {
            dispatch(
              updateData({
                id: "",
                ten: "",
                ma: "",
                logo: "",
                ghiChu: "",
                showCreateOrEdit: false,
                active: false,
              })
            );
            if (!id) {
              snackbar.show(
                (dataTranslate.messages || {}).themmoidonvithanhcong,
                "success"
              );
            } else {
              snackbar.show(
                (dataTranslate.messages || {}).capnhatdonvithanhcong,
                "success"
              );
            }
            dispatch(gotoPage(0));
            resolve(s.data);
          } else if (s.code === 1602) {
            snackbar.show(
              (dataTranslate.messages || {}).tendonvitontai,
              "danger"
            );
          } else if (s.code === 1603) {
            snackbar.show(
              (dataTranslate.messages || {}).madonvitontai,
              "danger"
            );
          } else {
            if (!id) {
              snackbar.show(
                s.message || (dataTranslate.messages || {}).themmoidonvithatbai,
                "danger"
              );
            } else {
              snackbar.show(
                s.message || (dataTranslate.messages || {}).capnhatdonvithatbai,
                "danger"
              );
            }
            reject();
          }
        })
        .catch((e) => {
          snackbar.show(
            (dataTranslate.messages || {}).themmoidonvithatbai,
            "danger"
          );
          reject();
        });
    });
  };
}
function onDeleteItem(item) {
  return (dispatch, getState) => {
    let intl = getState().Intl.locale;
    let dataTranslate = translate[intl];
    return new Promise((resolve, reject) => {
      confirm({
        title: (dataTranslate.messages || {}).oki,
        content: (dataTranslate.messages || {}).bancomuonxoadonvi,
        okText: (dataTranslate.messages || {}).xoa,
        okType: "danger",
        cancelText: (dataTranslate.messages || {}).huy,
        onOk() {
          unitProvider
            .delete(item.id)
            .then((s) => {
              if (s.code == 0) {
                snackbar.show(
                  (dataTranslate.messages || {}).xoadonvithanhcong,
                  "success"
                );
                dispatch(gotoPage(0));
                resolve();
              } else {
                snackbar.show(
                  (dataTranslate.messages || {}).xoadonvithatbat,
                  "danger"
                );
                reject();
              }
            })
            .catch((e) => {
              snackbar.show(
                (dataTranslate.messages || {}).xoadonvithatbat,
                "danger"
              );
              reject();
            });
        },
        onCancel() {
          reject();
        },
      });
    });
  };
}
export default {
  updateData,
  createOrEdit,
  gotoPage,
  onSearch,
  onSizeChange,
  onDeleteItem,
};
