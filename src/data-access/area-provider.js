import client from "../utils/client-utils";
import constants from "../resources/strings";

export default {
  search(page, size, ma, ten, createdAt, active, donViId) {
    let url = constants.api.khuVuc + "?sort=donVi.ten,asc&sort=ten,asc";
    url += "&page=" + (page === 0 ? 0 : page ? page - 1 : 0);
    url += "&size=" + (size || 10);
    if (ma) url += "&ma=" + ma;
    if (donViId) url += "&donViId=" + donViId;
    if (ten) url += "&ten=" + ten;
    if (createdAt) url += "&createdAt=" + createdAt;
    if (active !== undefined) url += "&active=" + active;
    return client.requestApi("get", url, {});
  },
  delete(id) {
    let url = constants.api.khuVuc + "/" + id;
    return client.requestApi("delete", url, {});
  },
  createOrEdit(id, ten, ma, ghiChu, donViId, active) {
    if (!id) {
      let url = constants.api.khuVuc;
      return client.requestApi("post", url, {
        ten,
        ma,
        ghiChu,
        donViId,
        active
      });
    } else {
      let url = constants.api.khuVuc + "/" + id;
      return client.requestApi("put", url, {
        ten,
        ma,
        ghiChu,
        donViId,
        active
      });
    }
  },
};
