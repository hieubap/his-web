import client from "../utils/client-utils";
import constants from "../resources/strings";
import fileProvider from "@data-access/file-provider";
import { combineUrlParams } from "@utils";
export default {
  search(page, size, maKhachHang) {
    let url = constants.api.ttHanhChinh + "?";
    url += "page=" + (page || 0) + "&";
    url += "size=" + (size || 10);
    if (maKhachHang) url += "&ma=" + maKhachHang
    return client.requestApi("get", url, {});
  },
  delete(id) {
    let url = constants.api.ttHanhChinh + "/" + id;
    return client.requestApi("delete", url, {});
  },
  createOrEdit(id, hoVaTen, soCanCuoc, ngaySinh, gioiTinh, quocTichId, tinhThanhPhoId, quanHuyenId, xaPhuongId, soNha, soDienThoai, sdtNguoiBaoHo, qr, ma, ngheNghiepId, nguoiBaoHo) {
    let url = constants.api.ttHanhChinh;
    return client.requestApi("post", url, {
      hoVaTen, soCanCuoc, ngaySinh, gioiTinh, quocTichId, tinhThanhPhoId, quanHuyenId, xaPhuongId, soNha, soDienThoai, sdtNguoiBaoHo, qr, ma, ngheNghiepId, nguoiBaoHo
    });
  },
  checkin(body) {
    let url = constants.api.checkIn
    return client.requestApi("post", url, body);
  },
  khaiBaoYTe(body, id) {
    let url = constants.api.khaiBaoYTe
    if (id) {
      return client.requestApi("put", url + "/" + id, body);
    } else {
      return client.requestApi("post", url, body);
    }
  },
  getAllKhoa(id) {
    return client.requestApi("get", constants.api.khoa + `?page=0&active=true&donViId=${id}`, {});
  },
  searchInfo(ma, otp) {
    return client.requestApi("get", constants.api.checkIn + '?sort=id,desc&timKiem=' + ma + (otp ? "&otp=" + otp : ""));
  },
  historyCheckin(payload={}) {
    const {sort = "id,desc",
  page, ...rest} = payload;
    const url  = combineUrlParams(constants.api.checkIn,{sort, page,...rest})
    return client.requestApi("get", url);
  },
  searchQr(qrcode, upload) {
    if (upload) {
      return fileProvider.uploadFile(upload, constants.api.ttHanhChinh + "/anh-qr-code");
    } else {
      return client.requestApi("post", constants.api.ttHanhChinh + "/qr-code", { qr: qrcode });
    }
  }
};
