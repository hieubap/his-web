import axios from "axios";
import { combineUrlParams } from "utils";
import { getState, dispatch } from "redux-store/stores";
import * as rax from "retry-axios";
const dataPath = "/api/his/v1";
const patientPath = "/api/patient/v1";
export const authPath = "/auth/oauth";
export const originUrl = window.location.origin;
const search = window.location.search;

export const HOST = (() => {
  const dataHost = [];
  for (let i = 0; i < 20; i++) {
    if (process.env["REACT_APP_HOST_" + i])
      dataHost.push(process.env["REACT_APP_HOST_" + i]);
    if (window.location.host === process.env["REACT_APP_URL_" + i]) {
      return process.env["REACT_APP_HOST_" + i];
    }
  }
  return process.env["REACT_APP_HOST"] || dataHost[0];
})();

export const PRINT_HOST = process.env.REACT_APP_SETTING_PRINT;

const getRedirect = () => {
  return window.location.origin;
};
export const accountUrl = combineUrlParams(`${getRedirect()}/login`, {
  // client_id: "isofh",
  // response_type: "code",
  redirect_uri: getRedirect(),
  state: (() => {
    const queryString = decodeURIComponent(search);
    let urlParams = Object.fromEntries(new URLSearchParams(queryString));
    delete urlParams.access_token;
    let url = combineUrlParams(`${window.location.pathname}`, {
      ...urlParams,
    });
    url = encodeURIComponent(url);
    return url;
  })(),
});
const client = axios.create({
  baseURL: `${HOST}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
});
client.defaults.raxConfig = {
  instance: client,
  // statusCodesToRetry: [[401]],
  shouldRetry: (err) => {
    if (err?.response?.status === 401) return true;
    return false;
  },
  onRetryAttempt: (err) => {
    return new Promise((resolve, reject) => {
      const cfg = rax.getConfig(err);
      const onRefreshToken = dispatch.auth.onRefreshToken;
      console.log(`Retry attempt #${cfg.currentRetryAttempt}`);
      onRefreshToken()
        .then((s) => {
          resolve(s);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  retryDelay: 2000,
};
const interceptorId = rax.attach(client);
client.interceptors.request.use(async (config) => {
  try {
    if (config.url == "/api/his/v1/auth/refresh") return config;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const access_token = urlParams.get("access_token");
    if (config.url?.indexOf("blob:") == 0) config.baseURL = "";
    let state = getState();
    let token = state.auth.auth?.access_token;

    if (access_token !== undefined && access_token !== null) {
      token = access_token;
    }
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: "Bearer " + token,
      };
    }

    return config;
  } catch (error) {
    return Promise.reject(error);
  }
});

client.interceptors.response.use(
  (response) => {
    if (response.data.code === 401) {
      localStorage.clear();
      window.location.href =
        "/login?redirect=" + encodeURIComponent(accountUrl);
      return Promise.reject();
    }
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.clear();
      window.location.href =
        "/login?redirect=" + encodeURIComponent(accountUrl);
    } else {
      try {
        if (error?.response?.data?.message) {
          error.message = error.response.data.message;
        } else {
          error.message = "Đang cập nhật hệ thống";
        }
      } catch (error) {}
    }
    return Promise.reject(error);
  }
);

export { client, dataPath, patientPath };
