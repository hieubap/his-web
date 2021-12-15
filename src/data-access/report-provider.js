import client from "../utils/client-utils";
import constants from "../resources/strings";

export default {
  getById(id) {
    let url = constants.api.checkIn + "/" + id;
    return client.requestApi("get", url, {});
  },
  search({page,size,tuNgay, denNgay, khuVucCheckInId, khuVucCheckOutId, donViId, doiTuongIds, hoVaTen, maKhach, soCanCuoc, soDienThoai}) {
    let url = constants.api.checkIn + "/tong-hop?sort=ngayCheckIn,desc";
    if (page!==null&&page!==undefined) url += "&page=" + page
    if (size!==null&&size!==undefined) url += "&size=" + size
    if (tuNgay) url += "&tuNgay=" + tuNgay
    if (denNgay) url += "&denNgay=" + denNgay
    if (khuVucCheckInId) url += "&khuVucCheckInId=" + khuVucCheckInId
    if (khuVucCheckOutId) url += "&khuVucCheckOutId=" + khuVucCheckOutId
    if (donViId) url += "&donViId=" + donViId
    if (doiTuongIds) url += "&doiTuongIds=" + doiTuongIds;
    if (hoVaTen) url += "&hoVaTen=" + hoVaTen;
    if (maKhach) url += "&ma=" + maKhach;
    if (soCanCuoc) url += "&soCanCuoc=" + soCanCuoc;
    if (soDienThoai) url += "&soDienThoai=" + soDienThoai;
    return client.requestApi("get", url, {});
  },
  report(tuNgay, denNgay, khuVucCheckInId, khuVucCheckOutId, donViId, doiTuongIds) {
    let url = constants.api.report + "?";
    if (tuNgay) url += "tuNgay=" + tuNgay + "&";
    if (denNgay) url += "denNgay=" + denNgay + "&";
    if (khuVucCheckInId) url += "khuVucCheckInId=" + khuVucCheckInId + "&";
    if (khuVucCheckOutId) url += "khuVucCheckOutId=" + khuVucCheckOutId + "&";
    if (donViId) url += "donViId=" + donViId + "&";
    if (doiTuongIds) url += "doiTuongIds=" + doiTuongIds;
    return client.requestApiFiles("get", url, {});
  },
  delete(id) {
    let url = constants.api.checkIn + "/" + id;
    return client.requestApi("delete", url, {});
  },
  searchKhuVuc(donViId) {
    let url = constants.api.khuVuc + "?page=0&sort=ten,asc&active=true";
    if (donViId) url += "&donViId=" + donViId
    return client.requestApi("get", url, {});
  },
  searchBoCauHoi(donViId, doiTuongId, khuVucId) {
    let url = constants.api.bocauhoi + "?page=0&sort=ten,asc&active=true";
    if (donViId) url += "&donViId=" + donViId
    if (khuVucId) url += "&khuVucId=" + khuVucId;
    if (doiTuongId) url += "&doiTuongId=" + doiTuongId;
    return client.requestApi("get", url, {});
  },
  searchDoiTuong(donViId, khuVucId) {
    let url = constants.api.doiTuong + "?page=0&sort=ten,asc&active=true";
    if (donViId) url += "&donViId=" + donViId
    if (khuVucId) url += "&khuVucId=" + khuVucId
    return client.requestApi("get", url, {});
  },
  searchDonVi() {
    let url = constants.api.donVi + "?page=0&sort=ten,asc&active=true";
    return client.requestApi("get", url, {});
  },
  getByIdDonVi(id) {
    let url = constants.api.donVi + "/" + id;
    return client.requestApi("get", url, {});
  },
  searchNgheNghiep() {
    let url = constants.api.ngheNghiep + "?page=0&sort=ten,asc&active=true";
    return client.requestApi("get", url, {});
  },
  searchRoles() {
    let url = constants.api.roles + "?page=0&sort=ten,asc";
    return client.requestApi("get", url, {});
  }
};
