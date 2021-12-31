import { HOST, accountUrl } from "client/request";
import { message } from "antd";
import authProvider from "data-access/auth-provider";

export default {
  state: {
    auth: (() => {
      try {
        let data = localStorage.getItem("auth") || "";
        if (data) return JSON.parse(data);
      } catch (error) {
        console.log(error);
      }
      return null;
    })(),
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onLoginSSO: ({ code, deviceToken, redirectURI }) => {
      dispatch.auth.updateData({
        auth: null,
      });
      return new Promise((resolve, reject) => {
        authProvider
          .loginSSO({
            code,
            deviceToken,
            redirectURI,
          })
          .then((s) => {
            localStorage.setItem("auth", JSON.stringify(s?.data));
            dispatch.auth.updateData({
              auth: s?.data,
            });
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Đăng nhập không thành công");
            reject(e);
            if (e?.code === 628) dispatch.auth.onLogout();
          });
      });
    },
    onLogin: ({ taiKhoan, matKhau }) => {
      dispatch.auth.updateData({
        auth: null,
      });
      return new Promise((resolve, reject) => {
        authProvider
          .login({
            taiKhoan,
            matKhau,
          })
          .then((s) => {
            localStorage.setItem("auth", JSON.stringify(s?.data));
            localStorage.setItem("checkLogin", true);
            dispatch.auth.updateData({
              auth: s?.data,
            });
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Đăng nhập không thành công");
            reject(e);
            if (e?.code === 628) dispatch.auth.onLogout();
          });
      });
    },
    onLogout: () => {
      localStorage.removeItem("auth");
      dispatch.auth.updateData({
        auth: null,
      });
      window.location.href =
        "/logout" + "?redirect=" + encodeURIComponent(window.location.href);
    },
    onRefreshToken: (payload, state) => {
      return new Promise((resolve, reject) => {
        if (!state.auth.doRefeshToken) {
          // nếu đang không có request nào request refresh token thì thực hiện
          if (
            state.auth.refreshTime && //trong trường hợp refresh thực hiện gần đây khoảng 5p thì resolve true luôn
            new Date() - state.auth.refreshTime < 5 * 60000
          ) {
            resolve(true);
            return;
          }
          //ngược lại thì đánh dấu là đang request refresh
          dispatch.auth.updateData({ doRefeshToken: true });
          const refreshToken = state.auth.auth?.refresh_token;
          authProvider
            .refreshToken({ refreshToken })
            .then((s) => {
              localStorage.setItem("auth", JSON.stringify(s?.data));
              localStorage.setItem("checkLogin", true);
              //sau khi request xong thì lưu lại thời gian refresh token và đánh dấu là đã hoàn thành đồng thời cập nhật lại auth
              dispatch.auth.updateData({
                auth: s?.data,
                doRefeshToken: false,
                refreshTime: new Date(),
              });
              //resolve true
              resolve(s?.data);
            })
            .catch((e) => {
              //nếu có exception thì reject và đánh dấu là đã hoàn thành
              reject(e);
              dispatch.auth.updateData({
                doRefeshToken: false,
              });
            });
        } else {
          // ngược lại thì chờ tiếp 2s rồi thực hiện
          setTimeout(() => {
            dispatch.auth
              .onRefreshToken()
              .then((s) => {
                resolve(s);
              })
              .catch((e) => {
                reject(e);
              });
          }, 2000);
        }
        //refresh token
      });
    },
    loadWithToken: (token) => {
      return new Promise((resolve, reject) => {
        authProvider
          .getDetail()
          .then((s) => {
            let auth = s?.data || {};
            auth.access_token = token;
            dispatch.auth.updateData({
              auth: auth,
            });
            resolve(auth);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    changePassword: ({ matKhauCu, matKhauMoi, taiKhoan }) => {
      return new Promise((resolve, reject) => {
        authProvider
          .changePassword({
            matKhauCu,
            matKhauMoi,
            taiKhoan,
          })
          .then((s) => {
            console.log(s);
            if (s?.code == 0) {
              resolve(s);
            } else {
              message.error(s?.message);
              resolve({});
            }
          })
          .catch((e) => {
            message.error(e?.message);
            resolve({});
          });
      });
    },
  }),
};
