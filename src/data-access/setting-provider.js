import client from "../utils/client-utils";
import constants from "../resources/strings";

export default {
  search(donViId) {
    if (donViId) {
      let url = constants.api.thietlap + "?donViId=" + donViId;
      return client.requestApi("get", url, {});
    }
  },
  createOrEdit(params) {
    let url = constants.api.thietlap;
    return client.requestApi("put", url, params);
  },
  getValue(configs, configName, defaultValue) {
    try {
      let config = (configs && configs.length && configs.find((x) => (x && x.maThietLap) == configName)) || {};
      if (config) return config.giaTri;
      return defaultValue;
    } catch (error) {
      return defaultValue;
    }
  },
};
