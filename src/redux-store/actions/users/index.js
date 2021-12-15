import usersProvider from "@data-access/user-provider";
import snackbar from "@utils/snackbar-utils";
import stringUtils from "mainam-react-native-string-utils";
import moment from "moment";
import { Modal } from "antd";
import translate from '../../../translations';
const { confirm } = Modal;

function updateData(data) {
  return dispatch => {
    dispatch({
      type: "USERS-UPDATE-DATA",
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
      let searchUsername = action === "username" ? item : getState().users.searchUsername
      let searchDonViId = action === "donViId" ? item : getState().users.searchDonViId
      let searchKhuVucId = action === "khuVucId" ? item : getState().users.searchKhuVucId
      let searchRoleId = action === "roleIds" ? item : getState().users.searchRoleId
      let searchTrangThai = action === "trangThai" ? item : getState().users.searchTrangThai
      let searchCreatedAt = action === "createdAt" ? item : getState().users.searchCreatedAt
      let searchDangNhapGanNhat = action === "dangNhapGanNhat" ? item : getState().users.searchDangNhapGanNhat
      dispatch(
        updateData({
          searchUsername: searchUsername,
          searchDonViId: searchDonViId,
          searchKhuVucId: searchKhuVucId,
          searchRoleId: searchRoleId,
          searchTrangThai: searchTrangThai,
          searchCreatedAt: searchCreatedAt,
          searchDangNhapGanNhat: searchDangNhapGanNhat
        })
      );
    }
    dispatch(gotoPage(0));
  };
}
function gotoPage(page) {
  return (dispatch, getState) => {
    dispatch(updateData({ page: page }));
    let size = getState().users.size || 10;
    let username = getState().users.searchUsername
    username = encodeURIComponent(username)
    let donViId = getState().users.searchDonViId
    let khuVucId = getState().users.searchKhuVucId
    let roleIds = getState().users.searchRoleId
    let trangThai = getState().users.searchTrangThai
    let createdAt = getState().users.searchCreatedAt ? new Date(getState().users.searchCreatedAt).format("YYYY-MM-dd") : null
    let dangNhapGanNhat = getState().users.searchDangNhapGanNhat ? new Date(getState().users.searchDangNhapGanNhat).format("YYYY-MM-dd") : null
    usersProvider.search(page, size, username, donViId, khuVucId, roleIds, trangThai, createdAt, dangNhapGanNhat).then(s => {
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
function loadUsersDetail(id) {
  return (dispatch, getState) => {
    let intl = getState().Intl.locale
    let dataTranslate = translate[intl]
    return new Promise((resolve, reject) => {
      usersProvider
        .getById(id)
        .then(s => {
          if (s && s.code == 0 && s.data) {
            let roleIds = s.data.roles && s.data.roles.length && s.data.roles.map(item => {
              return item.id
            })
            dispatch(
              updateData({
                id: s.data.id,
                username: s.data.username,
                donViId: s.data.donViId,
                khuVucId: s.data.khuVucId,
                roleIds: roleIds,
                ghiChu: s.data.ghiChu,
                dangNhapGanNhat: s.data.dangNhapGanNhat,
                trangThai: s.data.trangThai
              })
            );
            resolve(s.data);
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

function onSort(key, value) {
  return (dispatch, getState) => {
    dispatch(
      updateData({
        sort: {
          key,
          value
        }
      })
    );
    dispatch(gotoPage(0));
  };
}


function createOrEdit() {
  return (dispatch, getState) => {
    let intl = getState().Intl.locale
    let dataTranslate = translate[intl]
    return new Promise((resolve, reject) => {
      let id = getState().users.id;
      let username = getState().users.username;
      let donViId = getState().users.donViId;
      let khuVucId = getState().users.khuVucId;
      let roleIds = getState().users.roleIds;
      let ghiChu = getState().users.ghiChu;
      let dangNhapGanNhat = getState().users.dangNhapGanNhat;
      let trangThai = getState().users.trangThai;
      usersProvider.createOrEdit(id, username, donViId, khuVucId, roleIds, ghiChu, dangNhapGanNhat, trangThai).then(s => {
        if (s.code == 0) {
          dispatch(
            updateData({
              id: "",
              username: "",
              donViId: "",
              khuVucId: "",
              roleIds: "",
              ghiChu: "",
              dangNhapGanNhat: "",
              trangThai: false
            })
          );
          if (!id) {
            snackbar.show((dataTranslate.messages || {}).themmoitaikhoanthanhcong, "success");
          } else {
            snackbar.show((dataTranslate.messages || {}).capnhattaikhoanthanhcong, "success");
          }
          dispatch(gotoPage(0));
          resolve(s.data);
        } else if (s.code === 1500) {
          snackbar.show((dataTranslate.messages || {}).taikhoantontai, "danger");
        } else {
          if (!id) {
            snackbar.show(s.message || (dataTranslate.messages || {}).themmoitaikhoanthatbai, "danger");
          } else {
            snackbar.show(s.message || (dataTranslate.messages || {}).capnhattaikhoanthatbai, "danger");
          }
          reject();
        }
      }).catch(e => {
        snackbar.show((dataTranslate.messages || {}).themmoitaikhoanthatbai, "danger");
        reject();
      });
    });
  };
}
function changePassword() {
  return (dispatch, getState) => {
    let intl = getState().Intl.locale
    let dataTranslate = translate[intl]
    return new Promise((resolve, reject) => {
      let id = getState().users.id ? getState().users.id : (getState().auth && getState().auth.auth && getState().auth.auth.id);
      let password = getState().users.changePassword;
      let newPassword = getState().users.newPassword;
      usersProvider.changePassword(id, password, newPassword).then(s => {
        if (s.code == 0) {
          snackbar.show((dataTranslate.messages || {}).thaydoimatkhauthanhcong, "success");
          dispatch(
            updateData({
              id: "",
              password: "",
              newPassword: "",
              changePassword: "",
              showChangePass: false
            })
          );
          resolve(s.data);
        } else {
          snackbar.show(s.message || (dataTranslate.messages || {}).thaydoimatkhauthatbai, "danger");
          reject();
        }
      }).catch(e => {
        snackbar.show((dataTranslate.messages || {}).thaydoimatkhauthatbai, "danger");
        reject();
      });
    });
  };
}

function changeStatus(item) {
  return (dispatch, getState) => {
    let intl = getState().Intl.locale
    let dataTranslate = translate[intl]
    return new Promise((resolve, reject) => {
      confirm({
        title: (dataTranslate.messages || {}).xacnhan,
        content: item.trangThai === 10 ?
          (dataTranslate.messages || {}).banmuonmokhoa :
          (dataTranslate.messages || {}).banmuonkhoa,
        okText: (dataTranslate.messages || {}).oki,
        okType: "danger",
        cancelText: (dataTranslate.messages || {}).no,
        onOk() {
          usersProvider
            .lock(item.id, item.trangThai)
            .then(s => {
              if (s.code == 0) {
                snackbar.show(s.data.trangThai === 0 ? (dataTranslate.messages || {}).mokhoathanhcong :
                  (dataTranslate.messages || {}).khoathanhcong, "success");
                resolve();
              } else {
                snackbar.show(s.message || (s.data.trangThai === 0 ? (dataTranslate.messages || {}).mokhoathatbai :
                  (dataTranslate.messages || {}).khoathatbai), "danger");
                reject();
              }
            })
            .catch(e => {
              snackbar.show(item.trangThai === 10 ? (dataTranslate.messages || {}).mokhoathatbai :
                (dataTranslate.messages || {}).khoathatbai, "danger");
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
function resetPassword(item) {
  return (dispatch, getState) => {
    let intl = getState().Intl.locale
    let dataTranslate = translate[intl]
    return new Promise((resolve, reject) => {
      confirm({
        title: (dataTranslate.messages || {}).xacnhan,
        content: (dataTranslate.messages || {}).bancomuonreset,
        okText: (dataTranslate.messages || {}).oki,
        okType: "danger",
        cancelText: (dataTranslate.messages || {}).no,
        onOk() {
          usersProvider
            .reset(item.id)
            .then(s => {
              if (s.code == 0) {
                snackbar.show((dataTranslate.messages || {}).lammoimatkhau, "success");
                dispatch(gotoPage(0));
                resolve();
              } else {
                snackbar.show(s.message || (dataTranslate.messages || {}).lammoimatkhauthatbai, "danger");
                reject();
              }
            })
            .catch(e => {
              snackbar.show((dataTranslate.messages || {}).lammoimatkhauthatbai, "danger");
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
  createOrEdit,
  updateData,
  gotoPage,
  onSearch,
  onSizeChange,
  onSort,
  loadUsersDetail,
  changeStatus,
  resetPassword,
  changePassword
};
