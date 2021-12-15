import client from "../utils/client-utils";
import constants from "../resources/strings";
import datacacheProvider from "./datacache-provider";
import clientUtils from "../utils/client-utils";

export default {
  getById(id) {
    let url = constants.api.post + "/" + id;
    return client.requestApi("get", url, {});
  },
  getByIdSetPost(id) {
    let url = constants.api.bocauhoi + "/" + id;
    return client.requestApi("get", url, {});
  },
  search(page, size, ma, donViId, khuVucId, doiTuongId, ten, createdAt, active) {
    let url = constants.api.bocauhoi + "?sort=createdAt,desc";
    url += "&page=" + (page === 0 ? 0 : page ? page - 1 : 0);
    url += "&size=" + (size || 10);
    if (ma) url += "&ma=" + ma;
    if (donViId) url += "&donViId=" + donViId;
    if (khuVucId) url += "&khuVucId=" + khuVucId;
    if (doiTuongId) url += "&doiTuongId=" + doiTuongId;
    if (ten) url += "&ten=" + ten;
    if (createdAt) url += "&createdAt=" + createdAt;
    if (active !== undefined) url += "&active=" + active;
    return client.requestApi("get", url, {});
  },
  searchAll(donVi, khuVuc, doiTuong) {
    let url = constants.api.bocauhoi + `?active=true&donViId=${donVi ? donVi : ""}&doiTuongId=${doiTuong ? doiTuong : ""}&khuVucId=${khuVuc ? khuVuc : ""}`;
    return client.requestApi("get", url, {});
  },
  delete(id) {
    let url = constants.api.post + "/" + id;
    return client.requestApi("delete", url, {});
  },
  deleteSetPost(id) {
    let url = constants.api.bocauhoi + "/" + id;
    return client.requestApi("delete", url, {});
  },
  createOrEdit(id, loaiCauHoi, soThuTu, noiDung, goiY, batBuoc, boCauHoiId, nhieuDong, chonNhieu, cauTraLoi, cauHoiChiTiet, trls) {
    if (!id) {
      let url = constants.api.post;
      return client.requestApi("post", url, {
        loaiCauHoi,
        soThuTu,
        noiDung,
        goiY,
        batBuoc,
        boCauHoiId,
        nhieuDong,
        chonNhieu,
        cauTraLoi,
        cauHoiChiTiet,
        trls
      });
    } else {
      let url = constants.api.post + "/" + id;
      return client.requestApi("put", url, {
        loaiCauHoi,
        soThuTu,
        noiDung,
        goiY,
        batBuoc,
        boCauHoiId,
        nhieuDong,
        chonNhieu,
        cauTraLoi,
        cauHoiChiTiet,
        trls
      });
    }
  },
  createOrEditSetPost(id, ma, ten, donViId, khuVucIds, doiTuongIds, active, trls) {
    if (!id) {
      let url = constants.api.bocauhoi;
      return client.requestApi("post", url, {
        ma,
        ten,
        donViId,
        khuVucIds,
        doiTuongIds,
        active,
        trls
      });
    } else {
      let url = constants.api.bocauhoi + "/" + id;
      return client.requestApi("put", url, {
        ma,
        ten,
        donViId,
        khuVucIds,
        doiTuongIds,
        active,
        trls
      });
    }
  },
};
