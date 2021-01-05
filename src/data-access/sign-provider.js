import { client, signerPath, scanPath } from "client/request";
import { combineUrlParams } from "utils";
import {
  PATIENT_SIGN,
  SIGN_FILE,
  FILE,
  SIGN,
  DOCUMENTS_SCAN,
  HISTORY,
  USER,
} from "client/api";
export default {
  generateFileToSign: ({
    file,
    maBieuMau,
    maHoSo,
    chuKySo = 1,
    soPhieu,
    tenFile,
  }) => {
    return new Promise((resolve, reject) => {
      const dataForm = new FormData();

      dataForm.append("maBieuMau", maBieuMau);
      dataForm.append("maHoSo", maHoSo);
      dataForm.append("chuKySo", chuKySo);
      dataForm.append("soPhieu", soPhieu);
      dataForm.append("file", file);
      dataForm.append("tenFile", tenFile);
      // dataForm.append("anhKy", anhKy);
      dataForm.append("user", "hubot");
      for (const name in file) {
        dataForm.append(name, file[name]);
      }
      client
        .post(`${signerPath}${PATIENT_SIGN}`, dataForm, {
          headers: { "Content-Type": undefined },
        })
        .then((s) => {
          if (s?.data?.code === 0) {
            resolve(s?.data);
          } else reject(s?.data);
        })
        .catch(reject);
    });
  },
  getHistory: ({ page = 0, size = 999, sort = "id,desc", ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${signerPath}${HISTORY}`, {
            page,
            size,
            sort,
            ...payload,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0) {
            resolve(s?.data);
          } else reject(s?.data);
        })
        .catch(reject);
    });
  },
  signPatient: ({ id, anhKyBase64, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${signerPath}${SIGN_FILE}`, {
          id,
          anhKyBase64,
          ...payload,
        })
        .then((s) => {
          if (s?.data?.code === 0) {
            resolve(s?.data);
          } else reject(s?.data);
        })
        .catch(reject);
    });
  },
  signDigital: ({
    file,
    maBieuMau,
    maHoSo,
    chuKySo = 1,
    soPhieu,
    tenFile,
    ...payload
  }) => {
    return new Promise((resolve, reject) => {
      const dataForm = new FormData();
      dataForm.append("maBieuMau", maBieuMau);
      dataForm.append("maHoSo", maHoSo);
      dataForm.append("chuKySo", chuKySo);
      dataForm.append("soPhieu", soPhieu);
      dataForm.append("file", file);
      dataForm.append("tenFile", tenFile);
      // dataForm.append("anhKy", anhKy);
      dataForm.append("user", "hubot");
      for (const name in file) {
        dataForm.append(name, file[name]);
      }
      client
        .post(`${signerPath}${SIGN}`, dataForm, {
          headers: { "Content-Type": undefined },
        })
        .then((s) => {
          if (s?.data?.code == 0) {
            resolve(s?.data);
          } else {
            reject(s?.data);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getFileSign: ({ prefix, url = "" }) => {
    let file = "";
    if (url.indexOf("blob:") == 0) {
      file = url;
    } else {
      if (prefix) file = `${prefix}${FILE}/${url}`;
      else {
        file = `${FILE}/${url}`;
      }
    }

    console.log(file);
    return client.get(file, {
      responseType: "arraybuffer",
    });
  },
  getOriginFile: ({ maHoSo, maBieuMau }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${scanPath}${DOCUMENTS_SCAN}`, {
            maHoSo,
            maBieuMau,
          })
        )
        .then((s) => {
          if (s?.data?.code == 0 && s?.data?.data?.length) {
            resolve(s?.data?.data[0]);
          } else {
            reject(s?.data);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getUserSignImage: ({ userId }) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${signerPath}${USER}/${userId}/anh-ky`, {}))
        .then((s) => {
          if (s?.data?.code == 0) {
            resolve(s?.data);
          } else {
            reject(s?.data);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
