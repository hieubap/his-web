import { combineUrlParams } from "utils";
import { client, scanPath } from "client/request";
import { DOCUMENTS_SCAN } from "client/api";
export default {
  searchDocument: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${scanPath}${DOCUMENTS_SCAN}`, payload))
        .then((s) => {
          if (s?.data?.code === 0) {
            resolve(s?.data);
          } else {
            reject(s?.data);
          }
        })
        .catch((e) => reject(e));
    });
  },
  uploadDocument: ({
    maHoSo,
    maBieuMau,
    soPhieu,
    file,
    moTa,
    ngayThucHien,
  }) => {
    return new Promise((resolve, reject) => {
      const dataForm = new FormData();
      if (file) {
        dataForm.append("file", file);
        for (const name in file) {
          dataForm.append(name, file[name]);
        }
      }
      dataForm.append("maHoSo", maHoSo);
      dataForm.append("maBieuMau", maBieuMau);
      dataForm.append("soPhieu", soPhieu);
      dataForm.append("user", "hubot");
      dataForm.append("moTa", moTa);
      dataForm.append("ngayThucHien", ngayThucHien);

      client
        .post(`${scanPath}${DOCUMENTS_SCAN}`, dataForm, {
          headers: { "Content-Type": undefined },
        })
        .then((s) => {
          if (s?.data?.code === 0) {
            resolve(s?.data);
          } else {
            reject(s?.data);
          }
        })
        .catch((e) => reject(e));
    });
  },
  updateDocument: ({ id, active, ngayThucHien, moTa }) => {
    return new Promise((resolve, reject) => {
      client
        .patch(`${scanPath}${DOCUMENTS_SCAN}/${id}`, {
          active,
          ngayThucHien,
          moTa,
        })
        .then((s) => {
          if (s?.data?.code === 0) {
            resolve(s?.data);
          } else {
            reject(s?.data);
          }
        })
        .catch((e) => reject(e));
    });
  },
};
