import { combineUrlParams } from "utils";
import { client, formPath } from "client/request";
import { JSON_TEMPLATE, forms, FORM_SIGN_STATUS } from "client/api";
export default {
  onSaveForm: ({ id, api, ...payload }) => {
    return new Promise((resolve, reject) => {
      let request = id
        ? client.put(`${formPath}${api}/${id}`, {
            id,
            api,
            ...payload,
          })
        : client.post(`${formPath}${api}`, {
            id,
            api,
            ...payload,
          });

      request
        .then((res) => {
          if (res?.data?.code === 0) {
            resolve(res?.data);
          } else reject(res?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  searchFormDataEMR: ({ api, payload = {} }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${formPath}${api}`, {
            ...payload,
          })
        )
        .then((res) => {
          if (res?.data?.code === 0) {
            resolve(res?.data);
          } else reject(res?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getFormDataEMR: ({ api, nbHsBaId }) => {
    return new Promise((resolve, reject) => {
      if (!nbHsBaId)
        resolve({
          data: {},
        });
      else
        client
          .get(combineUrlParams(`${formPath}${api}/${nbHsBaId}`))
          .then((res) => {
            if (res?.data?.code === 0) {
              resolve(res?.data);
            } else reject(res?.data);
          })
          .catch((e) => {
            reject(e);
          });
    });
  },
  getFormDataHIS: ({ api, patientDocument, recordId }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${formPath}${api}/his`, {
            patientDocument: patientDocument,
            recordId: recordId,
          })
        )
        .then((res) => {
          if (res?.data?.code === 0) {
            resolve(res?.data);
          } else reject(res?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getJsonTemplate: (api) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${formPath}${api}${JSON_TEMPLATE}`)
        .then((res) => {
          if (res?.data?.code === 0) {
            resolve(res?.data);
          } else reject(res?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  getConfigForm: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${formPath}${forms}/${payload}`)
        .then((res) => {
          if (res?.data?.code === 0) {
            resolve(res?.data);
          } else reject(res?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  updateConfigForm: ({ id, data }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${formPath}${forms}/${id}`, data)
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
  createConfigForm: ({ data }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${formPath}${forms}`, data)
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
  getConfigById: (payload) => {
    return new Promise((resolve, reject) => {
      client
        .get(`${formPath}${forms}/${payload || ""}`)
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
  getAllCriterials: ({ api, patientDocument }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${formPath}${api}`, {
            patientDocument: patientDocument,
          })
        )
        .then((res) => {
          if (res?.data?.code === 0) {
            resolve(res?.data);
          } else reject(res?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  updateFileSignStatus: ({ formId, nbHoSoBaId, trangThai }) => {
    return new Promise((resolve, reject) => {
      client
        .put(
          combineUrlParams(`${formPath}${FORM_SIGN_STATUS}`, {
            formId,
            nbHoSoBaId,
          }),
          {
            trangThai: trangThai,
          }
        )
        .then((res) => {
          if (res?.data?.code === 0) {
            resolve(res?.data);
          } else reject(res?.data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
};
