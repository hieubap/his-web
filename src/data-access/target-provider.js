import client from "../utils/client-utils";
import constants from "../resources/strings";

export default {
  getById(id) {
    let url = constants.api.doiTuong + "/" + id;
    return client.requestApi("get", url, {});
  },
  search(page, size, ma, ten, createdAt, active, donViId, khuVucId, thongTienLienQuan) {
    let url = constants.api.doiTuong + "?sort=ten,asc";
    url += "&page=" + (page === 0 ? 0 : page ? page - 1 : 0);
    url += "&size=" + (size || 10);
    if (ma) url += "&ma=" + ma;
    if (donViId) url += "&donViId=" + donViId;
    if (ten) url += "&ten=" + ten;
    if (createdAt) url += "&createdAt=" + createdAt;
    if (khuVucId) url += "&khuVucId=" + khuVucId;
    if (thongTienLienQuan) url += "&thongTienLienQuan=" + thongTienLienQuan;
    if (active) url += "&active=" + active;
    return client.requestApi("get", url, {});
  },
  delete(id) {
    let url = constants.api.doiTuong + "/" + id;
    return client.requestApi("delete", url, {});
  },
  createOrEdit(id, ten, ma, ghiChu, donViIds, active, thongTienLienQuan, khuVucIds, trls) {
    if (!id) {
      let url = constants.api.doiTuong;
      return client.requestApi("post", url, {
        ten,
        ma,
        ghiChu,
        donViIds,
        active,
        thongTienLienQuan,
        khuVucIds,
        trls,
      });
    } else {
      let url = constants.api.doiTuong + "/" + id;
      return client.requestApi("put", url, {
        ten,
        ma,
        ghiChu,
        donViIds,
        active,
        thongTienLienQuan,
        khuVucIds,
        trls
      });
    }
  },
};
