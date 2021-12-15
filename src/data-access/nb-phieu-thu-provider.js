import { message } from "antd";
import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { NB_PHIEU_THU } from "client/api";
import { NB_PHIEU_THU_PHIEU_THU } from "client/api";

export default {
  searchById: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_PHIEU_THU}/${id}`, {}))
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  put: ({ id, ...rest }) => {
    return new Promise((resolve, reject) => {
      client
        .put(`${dataPath}${NB_PHIEU_THU}/${id}`, rest)
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
  addOrUpdateDiscount: (payload, id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_PHIEU_THU}/mien-giam/${id}`, payload)
        .then((s) => {
          if (s?.data?.code === 0) {
            resolve(s?.data);
            message.success("Thêm mới thành công dữ liệu miễn giảm!");
          } else {
            message.error(s?.data?.message.toString());
            reject(s?.data);
          }
        })
        .catch((e) => reject(e));
    });
  },

  addOrUpdateVoucher: (payload, id) => {
    return new Promise((resolve, reject) => {
      client
        .post(`${dataPath}${NB_PHIEU_THU}/giam-gia/${id}`, payload)
        .then((s) => {
          if (s?.data?.code === 0) {
            resolve(s?.data);
            message.success("Thêm mới thành công dữ liệu giảm giá!");
          } else {
            message.error(s?.data?.message.toString());
            reject(s?.data);
          }
        })
        .catch((e) => reject(e));
    });
  },

  getFormPhieuThu: (id) => {
    return new Promise((resolve, reject) => {
      client
        .get(combineUrlParams(`${dataPath}${NB_PHIEU_THU_PHIEU_THU}/${id}`, {}))
        .then((s) => {
          if (s?.data?.code === 0) resolve(s?.data);
          else reject(s?.data);
        })
        .catch((e) => reject(e));
    });
  },
};
