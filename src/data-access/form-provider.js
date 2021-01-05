import { combineUrlParams } from "utils";
import { client, formPath } from "client/request";
import { forms, FORM_CATALOG } from "client/api";
export default {
  getAllForm: ({ page = "0", ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${formPath}${forms}`, {
            page: page + "",
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
  createForm: ({ ten, ma, active, editor, hsdd, formId, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${formPath}${FORM_CATALOG}`, {
          ten,
          ma,
          active,
          editor,
          hsdd,
          formId,
          ...payload,
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
  updateForm: ({ id, ...payload }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${formPath}${FORM_CATALOG}/${id}`, payload)
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
  deleteForm: (id) => {
    return new Promise((resolve, reject) => {
      client
        .delete(`${formPath}${FORM_CATALOG}/${id}`)
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
  search: ({
    page = "0",
    ma = "",
    ten = "",
    timKiem = "",
    active,
    loaiHoSoBaId,
    size,
    sort = "ten",
  }) => {
    return new Promise((resolve, reject) => {
      client
        .get(
          combineUrlParams(`${formPath}${FORM_CATALOG}`, {
            ma,
            ten,
            timKiem,
            page: page + "",
            size: size,
            sort,
            active,
            loaiHoSoBaId,
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
};
