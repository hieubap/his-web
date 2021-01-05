import { HOST } from "client/request";
import { message } from "antd";
import authProvider from "data-access/auth-provider";
export default {
  state: {
    auth: (() => {
      try {
        let data = localStorage.getItem("auth") || "";
        // let data = `{"access_token":"eyJhbGciOiJSUzI1NiJ9.eyJpZCI6MTAwMzM3MCwidXNlcl9uYW1lIjoibWluaHB2IiwiZnVsbF9uYW1lIjoidGVzdCBNb21vIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9Jc29maEFkbWluIiwiUk9MRV9Jc29maFVzZXIiXSwianRpIjoiODRlNTllOWQtYTk3Ny00NTA5LTllYTAtM2Q4M2ZlZTY2MzBjIiwiZGVwYXJ0bWVudElkcyI6W10sImlhdCI6MTU5ODkyODkzNywiZXhwIjoxNTk4OTM2MTM3fQ.U26ynq7me4AloadMPjJd9_SVJHKp5cyQ5saFS_t7NdrJCpyePTZQT64LmkO9LSofeCQN8PF1thcwJSvYXJlE5d_PGuZFzT3xSRENCg6Q2snac2g8Bfxuc-onDz-lrw3dKeWi3ymwDI6ngivQvixJg6cWqUIDyzZqvIsQICAd_CzEi5dWd2YtG9VVCDrQ2TUGG3XVZ7YlwV9VArD26gXq36UXK_KzZX-CRBMDva9dHjUEYVFs7gucUVyxYB50KAOqeVPgm3LbNsooZE4FVHaAruMGYd3TcWJI4_gaKP5n3zUPyEMJ2r8eGur72kFIXHKenjAQr826oWdNuOL0vUu_Jw","full_name":"test Momo","expiration":"2020-09-01T11:55:37.348+0700","departments":[],"departmentIds":[],"id":1003370,"token_type":"bearer","expires_in":7200,"email":null,"authorities":["ROLE_IsofhAdmin","ROLE_IsofhUser"],"username":"minhpv"}`;
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
            dispatch.department.getAllDepartments();
            dispatch.patientRoom.getAllNursing();
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
