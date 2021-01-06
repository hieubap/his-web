import { HOST } from "client/request";
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
    onLogin: ({ code, deviceToken, redirectURI }) => {
      dispatch.auth.updateData({
        auth: null,
      });
      return new Promise((resolve, reject) => {
        authProvider
          .login({
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
    onLogout: () => {
      localStorage.removeItem("auth");
      dispatch.auth.updateData({
        auth: null,
      });
      dispatch.patient.updateData({
        patient: null,
        patients: [],
      });
      setTimeout(() => {
        let redirect = `${HOST}auth/logout?redirect_uri=${window.location.origin}`;
        console.log(redirect);
        window.location.href = redirect;
      }, 1000);
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
  }),
};
