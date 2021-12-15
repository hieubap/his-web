import client from "../utils/client-utils";
import constants from "../resources/strings";

export default {
    search(page, size) {
        let url = constants.api.quocGia + "?";
        url += "page=" + (page || 0);
        url += "&size=" + (size || 9999) + "&sort=ten,asc&active=true"
        return client.requestApi("get", url, {});
    },
    searchTinhTp(page, size) {
        let url = constants.api.tinhTP + "?";
        url += "page=" + (page || 0);
        url += "&size=" + (size || 9999) + "&sort=ten,asc&active=true"
        return client.requestApi("get", url, {});
    },
    searchQuanHuyen(tinhThanhPhoId, page, size) {
        let url = constants.api.quanHuyen + "?";
        url += "tinhThanhPhoId=" + (tinhThanhPhoId || "");
        url += "&page=" + (page || 0);
        url += "&size=" + (size || 9999) + "&sort=ten,asc&active=true"
        return client.requestApi("get", url, {});
    },
    searchXaPhuong(quanHuyenId, page, size) {
        let url = constants.api.xaPhuong + "?";
        url += "quanHuyenId=" + (quanHuyenId || "");
        url += "&page=" + (page || 0);
        url += "&size=" + (size || 9999) + "&sort=ten,asc&active=true"
        return client.requestApi("get", url, {});
    }
};
