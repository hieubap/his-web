import client from "../utils/client-utils";
import constants from "../resources/strings";

export default {
  search(page, size, donViId, khuVucId, soDienThoai) {
    let url = constants.api.checkIn;
    // url += "?page=" + (page === 0 ? 0 : page ? page - 1 : 0);
    // url += "&size=" + (size || 10);
    if (donViId) url += "?donViId=" + donViId;
    if (khuVucId) url += "&khuVucCheckInId=" + khuVucId;
    if (soDienThoai) url += "&soDienThoai=" + soDienThoai;
    return client.requestApi("get", url, {});
  },
};
