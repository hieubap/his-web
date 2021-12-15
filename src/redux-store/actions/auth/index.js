import constants from "@strings";
import snackbar from "@utils/snackbar-utils";
import clientUtils from "@utils/client-utils";
import userProvider from "@data-access/user-provider";
import cacheProvider from "@data-access/datacache-provider";
import translate from "../../../translations";

function onLogin(username, password) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let intl = getState().Intl.locale;
      let dataTranslate = translate[intl];
      if (!username || !password) {
        snackbar.show("Vui lòng nhập tài khoản và mật khẩu", "danger");
        return;
      }
      userProvider
        .login(username, password)
        .then((res) => {
          switch (res.code) {
            case 0:
              snackbar.show("Đăng nhập thành công", "success");
              dispatch(
                updateData({
                  auth: res.data,
                  detail: null,
                })
              );
              cacheProvider.save("AUTH", "", res.data);
              clientUtils.auth = `${res.data.token_type} ${res.data.access_token}`;
              resolve(res.data);
              break;
            default:
              snackbar.show(res.message, "danger");
              break;
          }
          reject("Đăng nhập không thành công");
        })
        .catch((e) => {
          snackbar.show((dataTranslate.messages || {}).error503, "danger");
          reject(e);
        });
    });
  };
}
function updateData(data) {
  return (dispatch) => {
    dispatch({
      type: "AUTH-UPDATE-DATA",
      data: data,
    });
  };
}
function onLogout() {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      dispatch(
        updateData({
          auth: null,
          detail: null,
        })
      );
      cacheProvider.save("AUTH", "", null);
      clientUtils.auth = null;
      setTimeout(() => {
        resolve();
      }, 500);
    });
  };
}
export default {
  onLogin,
  onLogout,
  updateData
};
