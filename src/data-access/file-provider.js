import { client, dataPath } from "client/request";
import {
  DM_CHUYEN_KHOA,
  DM_KHOA,
  NB_DOT_DIEU_TRI,
  NB_THE_BAO_HIEM,
  DM_NHAN_VIEN,
  DM_BENH_VIEN,
  DM_HANG_THE,
  DM_HUONG_DAN_SU_DUNG,
} from "client/api";

export default {
  upload: (file, type) => {
    let url = "";
    if (type === "chuyenKhoa") {
      url += `${dataPath}${DM_CHUYEN_KHOA}/tai-len/logo`;
    } else if (type === "khoa") {
      url += `${dataPath}${DM_KHOA}/tai-len/logo`;
    } else if (type === "anhDaiDien") {
      url += `${dataPath}${NB_DOT_DIEU_TRI}/tai-len/anh-dai-dien`;
    } else if (type === "giayChuyenTuyen") {
      url += `${dataPath}${NB_THE_BAO_HIEM}/tai-len/giay-chuyen-tuyen`;
    } else if (type === "giayHenKham") {
      url += `${dataPath}${NB_THE_BAO_HIEM}/tai-len/giay-hen-kham`;
    } else if (type === "nhanVien") {
      url += `${dataPath}${DM_NHAN_VIEN}/tai-len/anh-dai-dien`;
    } else if (type === "benhVien") {
      url += `${dataPath}${DM_BENH_VIEN}/tai-len/logo`;
    } else if (type === "anhMatTruoc") {
      url += `${dataPath}${NB_DOT_DIEU_TRI}/tai-len/anh-can-cuoc`;
    } else if (type === "anhMatSau") {
      url += `${dataPath}${NB_DOT_DIEU_TRI}/tai-len/anh-can-cuoc`;
    } else if (type === "hangThe") {
      url += `${dataPath}${DM_HANG_THE}/tai-len/icon`;
    } else if (type === "anhKyNhanVien") {
      url += `${dataPath}${DM_NHAN_VIEN}/tai-len/anh-ky`;
    } else if (type === "huongDanSuDung") {
      url += `${dataPath}${DM_HUONG_DAN_SU_DUNG}/tai-len/hdsd`;
    }

    const formData = new FormData();
    formData.append("file", file);
    return new Promise((resolve, reject) => {
      client
        .post(url, formData)
        .then((s) => {
          resolve(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
