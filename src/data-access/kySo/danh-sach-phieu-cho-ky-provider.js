import { combineUrlParams } from "utils";
import { client, dataPath } from "client/request";
import { DANH_SACH_PHIEU_CHO_KY } from "client/api";

export default {
    search: ({ page = 0, sort, size = 10, ...payload }) => {
        return new Promise((resolve, reject) => {
            client
                .get(
                    combineUrlParams(`${dataPath}${DANH_SACH_PHIEU_CHO_KY}`, {
                        trangThai : 10,
                        page: page + "",
                        sort,
                        size,
                        ...payload,
                    })
                )
                .then((s) => {
                    if (s?.data?.code === 0) resolve(s?.data);
                    else reject(s?.data);
                })
                .catch((e) => reject(e));
        });
    },
    searchWithPhieuMoiNhat: ({ page = 0, sort, size = 10, ...payload }) => {
        return new Promise((resolve, reject) => {
            client
                .get(
                    combineUrlParams(`${dataPath}${DANH_SACH_PHIEU_CHO_KY}`, {
                        phieuMoiNhat : true,
                        page: page + "",
                        sort,
                        size,
                        ...payload,
                    })
                )
                .then((s) => {
                    if (s?.data?.code === 0) resolve(s?.data);
                    else reject(s?.data);
                })
                .catch((e) => reject(e));
        });
    },
    post: ({ page = 0, sort, size = 10, ...payload }) => {
        return new Promise((resolve, reject) => {
            client
            .post(`${dataPath}${DANH_SACH_PHIEU_CHO_KY}`, payload)
                // .post(
                //     combineUrlParams(`${dataPath}${DANH_SACH_PHIEU_CHO_KY}/don-thuoc`, {
                //         // page: page + "",
                //         // sort,
                //         // size,
                //         payload,
                //     }))
                .then((s) => {
                    if (s?.data?.code === 0) resolve(s?.data);
                    else reject(s?.data);
                })
                .catch((e) => reject(e))
        })
    },
    sign: ({ page = 0, sort, size = 10, ...payload }) => {
        return new Promise((resolve, reject) => {
            client
            .post(`${dataPath}${DANH_SACH_PHIEU_CHO_KY}`, payload)
                .then((s) => {
                    if (s?.data?.code === 0) resolve(s?.data);
                    else reject(s?.data);
                })
                .catch((e) => reject(e))
        })
    },
    // search: ({ page = 0, sort, size = 10, theoLo = false,...payload }) => {
    //   const pathEndPoint = theoLo ? "theo-lo" : "tong-hop"
    //   return new Promise((resolve, reject) => {
    //     client
    //       .get(
    //         combineUrlParams(`${dataPath}${TON_KHO}/${pathEndPoint}`, {
    //           page: page + "",
    //           sort,
    //           size,
    //           ...payload,
    //         }))
    //       .then((s) => {
    //         if (s?.data?.code === 0) resolve(s?.data);
    //         else reject(s?.data);
    //       })
    //       .catch((e) => reject(e))
    //   })
    // },
    // post: (params) => {
    //   return new Promise((resolve, reject) => {
    //     client
    //       .post(`${dataPath}${DANH_SACH_PHIEU_CHO_KY}/don-thuoc-ngoai-vien`, params)
    //       .then((s) => {
    //         if (s?.data?.code === 0) resolve(s?.data);
    //         else reject(s?.data);
    //       })
    //       .catch((e) => reject(e));
    //   });
    // },
    // put: ({ id, ...rest }) => {
    //   return new Promise((resolve, reject) => {
    //     client
    //       .put(`${dataPath}${DANH_SACH_PHIEU_CHO_KY}/${id}`, rest)
    //       .then((s) => {
    //         if (s?.data?.code === 0) resolve(s?.data);
    //         else reject(s?.data);
    //       })
    //       .catch((e) => reject(e));
    //   });
    // },
    // delete: (id) => {
    //   return new Promise((resolve, reject) => {
    //     client
    //       .delete(`${dataPath}${DANH_SACH_PHIEU_CHO_KY}/${id}`)
    //       .then((s) => {
    //         if (s?.data?.code === 0) resolve(s?.data);
    //         else reject(s?.data);
    //       })
    //       .catch((e) => reject(e));
    //   });
    // },
    // detail: (id) => {
    //   return new Promise((resolve, reject) => {
    //     client
    //       .get(`${dataPath}${DANH_SACH_PHIEU_CHO_KY}/${id}`)
    //       .then((s) => {
    //         if (s?.data?.code === 0) resolve(s?.data);
    //         else reject(s?.data);
    //       })
    //       .catch((e) => reject(e));
    //   });
    // },
    // approved: (id) => {
    //   return new Promise((resolve, reject) => {
    //     client
    //       .post(`${dataPath}${DANH_SACH_PHIEU_CHO_KY}/duyet/${id}`)
    //       .then((s) => {
    //         if (s?.data?.code === 0) resolve(s?.data);
    //         else reject(s?.data);
    //       })
    //       .catch((e) => reject(e));
    //   });
    // },
    // unApproved: (id) => {
    //   return new Promise((resolve, reject) => {
    //     client
    //       .post(`${dataPath}${DANH_SACH_PHIEU_CHO_KY}/huy-duyet/${id}`)
    //       .then((s) => {
    //         if (s?.data?.code === 0) resolve(s?.data);
    //         else reject(s?.data);
    //       })
    //       .catch((e) => reject(e));
    //   });
    // },
    // sendApproved: (id) => {
    //   return new Promise((resolve, reject) => {
    //     client
    //       .post(`${dataPath}${DANH_SACH_PHIEU_CHO_KY}/gui-duyet/${id}`)
    //       .then((s) => {
    //         if (s?.data?.code === 0) resolve(s?.data);
    //         else reject(s?.data);
    //       })
    //       .catch((e) => reject(e));
    //   });
    // },
    // unSendApproved: (id) => {
    //   return new Promise((resolve, reject) => {
    //     client
    //       .post(`${dataPath}${DANH_SACH_PHIEU_CHO_KY}/huy-gui-duyet/${id}`)
    //       .then((s) => {
    //         if (s?.data?.code === 0) resolve(s?.data);
    //         else reject(s?.data);
    //       })
    //       .catch((e) => reject(e));
    //   });
    // },
    // kiemTraSoHoaDon: (payload) => {
    //   return new Promise((resolve, reject) => {
    //     client
    //       .post(`${dataPath}${DANH_SACH_PHIEU_CHO_KY}/so-hoa-don/${payload?.id}`, { soHoaDon: payload?.soHoaDon })
    //       .then((s) => {
    //         if (s?.data?.code === 0) resolve(s?.data);
    //         else reject(s?.data);
    //       })
    //       .catch((e) => reject(e));
    //   });
    // }
};

