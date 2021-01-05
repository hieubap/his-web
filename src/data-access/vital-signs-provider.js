import { combineUrlParams } from "utils";
import { client, patientPath, vitalSignPath } from "client/request";
import {
  PATIENT_LIST,
  VITAL_SIGNS,
  VITAL_SIGNS_CATEGORY,
  VITAL_SIGNS_SURGERY,
} from "client/api";
export default {
  getPatientVitalSigns: ({ patientDocument }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${patientPath}${PATIENT_LIST}`, {
            maHoSo: patientDocument,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0 && s?.data?.data) {
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
  getDataVitalSigns: ({ patientDocument }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${vitalSignPath}${VITAL_SIGNS}`, {
            page: "0",
            patientDocument,
            sort: "actDate,id",
          })
        )
        .then((s) => {
          if (s?.data?.code === 0 && s?.data?.data) {
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
  onCreate: ({
    temperature,
    pulse,
    weight,
    bpSystolic,
    bpDiastolic,
    respiratory,
    resuscitationMask,
    nursing,
    actDate,
    patientDocument,
    medicalRecordNo,
    patientName,
    birthday,
    bed,
    room,
    gender,
    diagnostic,
    chiSoKhac,
    ...payload
  }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${vitalSignPath}${VITAL_SIGNS}`, {
          temperature,
          pulse,
          weight,
          bpSystolic,
          bpDiastolic,
          respiratory,
          resuscitationMask,
          nursing,
          actDate,
          patientDocument,
          medicalRecordNo,
          patientName,
          birthday,
          bed,
          room,
          gender,
          diagnostic,
          chiSoKhac,
          ...payload,
        })
        .then((s) => {
          if (s?.data?.code === 0 && s?.data?.data) {
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
  onUpdate: ({
    id,
    temperature,
    pulse,
    weight,
    bpSystolic,
    bpDiastolic,
    respiratory,
    resuscitationMask,
    nursing,
    actDate,
    patientDocument,
    medicalRecordNo,
    patientName,
    birthday,
    bed,
    room,
    gender,
    diagnostic,
    chiSoKhac,
    ...payload
  }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${vitalSignPath}${VITAL_SIGNS}/${id}`, {
          temperature,
          pulse,
          weight,
          bpSystolic,
          bpDiastolic,
          respiratory,
          resuscitationMask,
          nursing,
          actDate,
          patientDocument,
          medicalRecordNo,
          patientName,
          birthday,
          bed,
          room,
          gender,
          diagnostic,
          chiSoKhac,
          ...payload,
        })
        .then((s) => {
          if (s?.data?.code === 0 && s?.data?.data) {
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
  deleteCategory: (id) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${vitalSignPath}${VITAL_SIGNS_CATEGORY}/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s.data);
          reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  searchCategory: ({
    page = 0,
    size = 10,
    sort = "ten",
    active = "true",
    ...payload
  }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${vitalSignPath}${VITAL_SIGNS_CATEGORY}`, {
            page: page === 0 ? "0" : page,
            size,
            active,
            sort,
            ...payload,
          })
        )
        .then((s) => {
          if (s?.data?.code === 0) resolve(s.data);
          reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  updateCategory: ({ id, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${vitalSignPath}${VITAL_SIGNS_CATEGORY}/${id}`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s.data);
          reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  createCategory: ({ ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${vitalSignPath}${VITAL_SIGNS_CATEGORY}`, payload)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s.data);
          reject(s?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  updateSurgery: ({ id, bacSy, phuongPhapPhauThuat }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${vitalSignPath}${VITAL_SIGNS_SURGERY}/${id}`, {
          bacSy,
          phuongPhapPhauThuat,
        })
        .then((s) => {
          if (s?.data?.code === 0) {
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
  deleteSurgery: (id) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${vitalSignPath}${VITAL_SIGNS_SURGERY}/${id}`)
        .then((s) => {
          if (s?.data?.code === 0) {
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
  createSurgery: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${vitalSignPath}${VITAL_SIGNS_SURGERY}`, payload)
        .then((s) => {
          if (s?.data?.code === 0) {
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
