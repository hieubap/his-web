import client from "../utils/client-utils";
import constants from "../resources/strings";

export default {
  search(page, size, ma, ten, createdAt, active) {
    let url = constants.api.donVi + "?sort=createdAt,desc";
    url += "&page=" + (page === 0 ? 0 : page ? page - 1 : 0);
    url += "&size=" + (size || 10);
    if (ma) url += "&ma=" + ma;
    if (ten) url += "&ten=" + ten;
    if (createdAt) url += "&createdAt=" + createdAt;
    if (active !== undefined) url += "&active=" + active;
    return client.requestApi("get", url, {});
  },
  delete(id) {
    let url = constants.api.donVi + "/" + id;
    return client.requestApi("delete", url, {});
  },
  createOrEdit(id, ten, ma, ghiChu, logo, active) {
    if (!id) {
      let url = constants.api.donVi;
      return client.requestApi("post", url, {
        ten,
        ma,
        ghiChu,
        logo,
        active
      });
    } else {
      let url = constants.api.donVi + "/" + id;
      return client.requestApi("put", url, {
        ten,
        ma,
        ghiChu,
        logo,
        active
      });
    }
  },
};
