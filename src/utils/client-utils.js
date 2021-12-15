import axios from "axios";
import crosstab from "crosstab";
const getServerUrl = () => {
  const domain = window.location.origin;
  switch (domain) {
    case "http://localhost:3000": // test
    case "http://localhost:3001": // test
    case "http://localhost:3002": // test
    case "http://10.0.0.94:2197":
      return "https://api-ivisitor-test.isofh.vn";
      break;
    case "https://10.0.0.94:2197": // test
      return "http://10.0.0.93:2182";
      break;
    case "https://dhy0-demo.isofh.vn": // test
      return "https://api-ivisitor-test.isofh.vn";
      break;
    case "https://ivisitor-test.isofh.vn": // test
      return "https://api-ivisitor-test.isofh.vn";
      break;
    case "http://123.24.206.9:2399": //
      return "http://123.24.206.9:2182";
    case "http://34.87.148.212:2399": // production
      return "http://34.87.148.212:2182";
    case "https://ivisitor.vn": // production
      return "https://api.ivisitor.vn";
    default:
      if (domain.indexOf("ivisitor.vn") >= 0) {
        return "https://api.ivisitor.vn";
      }
      return "https://api.ivisitor.vn";
  }
};
const server_url = getServerUrl();

String.prototype.absoluteUrl =
  String.prototype.absolute ||
  function (defaultValue) {
    var _this = this.toString();
    if (_this == "")
      if (defaultValue != undefined) return defaultValue;
      else return _this;
    if (_this.startsWith("http") || _this.startsWith("blob")) {
      return _this;
    }
    if (
      _this.endsWith(".jpg") ||
      _this.endsWith(".png") ||
      _this.endsWith(".JPG") ||
      _this.endsWith(".PNG") ||
      _this.endsWith(".gif")
    ) {
      return (_this + "").resolveResource();
    }
    if (
      !_this.endsWith(".jpg") ||
      !_this.endsWith(".png") ||
      _this.endsWith(".JPG") ||
      _this.endsWith(".PNG") ||
      !_this.endsWith(".gif")
    ) {
      return defaultValue;
    }
    return server_url + _this + "";
  };
String.prototype.absoluteFileUrl =
  String.prototype.absoluteFileUrl ||
  function (defaultValue) {
    var _this = this.toString();
    if (_this == "")
      if (defaultValue != undefined) return defaultValue;
      else return _this;
    if (_this.startsWith("http") || _this.startsWith("blob")) {
      return _this;
    }
    return server_url + "/api/visitor/v1/files/" + _this + "";
  };

String.prototype.getServiceUrl =
  String.prototype.absolute ||
  function (defaultValue) {
    if (this == "")
      if (defaultValue != undefined) return defaultValue;
      else return this;
    if (this.startsWith("http") || this.startsWith("blob")) {
      return this;
    }
    return server_url + this;
  };

export default {
  auth: "",
  serverApi: server_url,
  async uploadFile(url, file) {
    let token = "";
    if (!this.auth) {
      token = await window.googleReCaptchaProps.executeRecaptcha("call_api");
    }
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: this.auth || (token ? "Captcha " + token : ""),
        "Accept-Language": this.intl,
      },
    };
    return axios.post(url.getServiceUrl(), formData, config);
  },
  requestApi(methodType, url, body) {
    return new Promise(async (resolve, reject) => {
      let token = "";
      if (!this.auth) {
        token = await window.googleReCaptchaProps.executeRecaptcha("call_api");
      }
      var dataBody = "";
      if (!body) body = {};
      dataBody = JSON.stringify(body);
      this.requestFetch(
        methodType,
        url && url.indexOf("http") == 0 ? url : url,
        {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: this.auth || (token ? "Captcha " + token : ""),
          "Accept-Language": this.intl,
        },
        dataBody
      )
        .then((s) => {
          s.json()
            .then((val) => {
              resolve(val);
            })
            .catch((e) => {
              reject(e);
            });
        })
        .catch((e) => {
          if (e && e.status === 401) {
            localStorage.clear();
            crosstab &&
              crosstab.broadcast("message", {
                event: "ivisitor_logout",
              });
          }
          reject(e);
        });
    });
  },
  requestApiFiles(methodType, url, body) {
    return new Promise(async (resolve, reject) => {
      let token = "";
      if (!this.auth) {
        token = await window.googleReCaptchaProps.executeRecaptcha("call_api");
      }
      var dataBody = "";
      if (!body) body = {};
      dataBody = JSON.stringify(body);
      this.requestFetch(
        methodType,
        url && url.indexOf("http") == 0 ? url : url,
        {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: this.auth || (token ? "Captcha " + token : ""),
          "Accept-Language": this.intl,
        },
        dataBody
      )
        .then((s) => {
          s.blob().then((blob) => {
            let blobUrl = URL.createObjectURL(blob);
            resolve(blobUrl);
          });
        })
        .catch((e) => {
          if (e && e.status === 401) {
            localStorage.clear();
            crosstab &&
              crosstab.broadcast("message", {
                event: "ivisitor_logout",
              });
          }
          reject(e);
        });
    });
  },
  requestFetch(methodType, url, headers, body) {
    return new Promise((resolve, reject) => {
      let fetchParam = {
        method: methodType,
        headers,
      };
      if (methodType.toLowerCase() !== "get") {
        fetchParam.body = body;
      }
      return fetch(url.getServiceUrl(), fetchParam)
        .then((json) => {
          if (!json.ok) {
            reject(json);
          } else resolve(json);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  requestService(url) {
    return new Promise(function (resolve, reject) {
      axios
        .get(server_url + url)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },
};
