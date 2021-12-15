import client from "../utils/client-utils";
import constants from "../resources/strings";
import datacacheProvider from "./datacache-provider";
import clientUtils from "../utils/client-utils";

export default {
  login(username, password, captcha) {
    let object = {
      username: username,
      password: password,
      captcha,
    };
    return new Promise((resolve, reject) => {
      clientUtils
        .requestApi("post", constants.api.login, object)
        .then((x) => {
          resolve(x);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getById(id) {
    let url = constants.api.users + "/" + id;
    return client.requestApi("get", url, {});
  },
  search(
    page,
    size,
    username,
    donViId,
    khuVucId,
    roleIds,
    trangThai,
    createdAt,
    dangNhapGanNhat
  ) {
    let url = constants.api.users + "?sort=createdAt,desc";
    url += "&page=" + (page === 0 ? 0 : page ? page - 1 : 0);
    url += "&size=" + (size || 10);
    if (username) url += "&username=" + username;
    if (donViId) url += "&donViId=" + donViId;
    if (khuVucId) url += "&khuVucId=" + khuVucId;
    if (roleIds) url += "&roleId=" + roleIds;
    if (trangThai) url += "&trangThai=" + trangThai;
    if (createdAt) url += "&createdAt=" + createdAt;
    if (dangNhapGanNhat) url += "&dangNhapGanNhat=" + dangNhapGanNhat;
    return client.requestApi("get", url, {});
  },
  delete(id) {
    let url = constants.api.users + "/" + id;
    return client.requestApi("delete", url, {});
  },
  reset(id) {
    let url = constants.api.users + "/reset-password/" + id;
    return client.requestApi("put", url, {});
  },
  lock(id, trangThai) {
    let url;
    if (trangThai === 10) {
      url = constants.api.users + "/unlock/" + id;
    } else {
      url = constants.api.users + "/lock/" + id;
    }
    return client.requestApi("put", url, {});
  },
  changePassword(id, password, newPassword) {
    let url = constants.api.users + "/change-password/" + id;
    return client.requestApi("put", url, {
      password,
      newPassword,
    });
  },
  createOrEdit(
    id,
    username,
    donViId,
    khuVucId,
    roleIds,
    ghiChu,
    dangNhapGanNhat,
    trangThai
  ) {
    if (!id) {
      let url = constants.api.users;
      return client.requestApi("post", url, {
        username,
        donViId,
        khuVucId,
        roleIds,
        ghiChu,
        dangNhapGanNhat,
        trangThai,
      });
    } else {
      let url = constants.api.users + "/" + id;
      return client.requestApi("put", url, {
        username,
        donViId,
        khuVucId,
        roleIds,
        ghiChu,
        dangNhapGanNhat,
        trangThai,
      });
    }
  },
};
