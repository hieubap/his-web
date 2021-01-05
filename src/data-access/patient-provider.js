import { combineUrlParams } from "utils";
import { client, patientPath, dataPath } from "client/request";
import {
  PATIENT_LIST,
  PATIENT_HISTORIES,
  PATIENT_MEDICINE,
  AVATAR,
} from "client/api";
export default {
  searchPatient: ({ page = "0", size = 10, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${patientPath}${PATIENT_LIST}`, {
            page: page + "",
            size,
            ...payload,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  searchEmrPatient: ({ page = "0", size = 10, patientValue, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${dataPath}${PATIENT_HISTORIES}`, {
            page: page + "",
            size,
            patientValue,
            ...payload,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s.data);
          else reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  searchDrugPatient: ({
    page,
    size,
    timKiem = "",
    khoaId,
    active = true,
    sort = "maHoSo,desc",
    ...payload
  }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${patientPath}${PATIENT_MEDICINE}`, {
            page,
            size,
            timKiem,
            khoaId,
            active,
            sort,
            ...payload,
          })
        )
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
  uploadAvatar: ({ id, fileUpload }) => {
    return new Promise((resolve, reject) => {
      const dataForm = new FormData();
      dataForm.append("file", fileUpload);
      for (const name in fileUpload) {
        dataForm.append(name, fileUpload[name]);
      }
      dataForm.append("id", id);
      dataForm.append("user", "hubot");
      client
        .post(`${patientPath}${AVATAR}`, dataForm, {
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
};
