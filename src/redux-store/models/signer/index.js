import { client, signerPath, scanPath } from "client/request";
import { HISTORY } from "client/api";
import { combineUrlParams } from "utils";
import signProvider from "data-access/sign-provider";
import { message } from "antd";
export default {
  state: {
    fileSigned: "",
    historySigned: [],
    fileName: "",
  }, // initial state
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    generateFileSignForPatient: (
      { file, maBieuMau, maHoSo, chuKySo = 1, soPhieu, tenFile, ...payload },
      state
    ) => {
      return new Promise((resolve, reject) => {
        signProvider
          .generateFileToSign({
            file,
            maBieuMau,
            maHoSo,
            chuKySo,
            soPhieu,
            tenFile,
          })
          .then((s) => {
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
    signPatient: (
      {
        id,
        anhKyBase64,
        soPhieu,
        maBieuMau,
        formId, //sử dụng để update trạng thái ký cho fileEditor
        nbHoSoBaId, //sử dụng để update trạng thái ký cho fileEditor
        ...payload
      },
      state
    ) => {
      return new Promise((resolve, reject) => {
        dispatch.signer.updateData({
          isSigning: true,
        });
        signProvider
          .signPatient({
            id,
            anhKyBase64,
            ...payload,
          })
          .then((s) => {
            message.success(s?.message || "Ký thành công");
            let patient = state.patient.patient;
            dispatch.signer.getHistorySigned({
              soPhieu,
              maHoSo: patient?.maHoSo,
              maBieuMau,
            });
            dispatch.signer.updateData({
              isSigning: false,
            });
            dispatch.signer.loadFileSigned({
              prefix: signerPath,
              url: s.data?.fileSauKy,
            });
            if (formId && nbHoSoBaId)
              dispatch.files.updateFileSignStatus({
                maHoSo: patient?.maHoSo,
                formId,
                nbHoSoBaId,
                trangThai: "Da_Ky",
              });
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Ký không thành công");
            dispatch.signer.updateData({
              isSigning: false,
            });
            reject(e);
          });
      });
    },
    getHistorySigned: (payload) => {
      return new Promise((resolve, reject) => {
        signProvider
          .getHistory({
            page: "0",
            size: 999,
            sort: "id,desc",
            ...payload,
          })
          .then((s) => {
            let histories = s.data;
            let obj = {};
            let arr = [];
            if (histories) {
              histories = histories
                .filter((item) => {
                  return item.trangThai === 0;
                })
                .sort(function (itema, itemb) {
                  return itema.ngayKy < itemb.ngayKy ? 1 : -1;
                });

              histories.forEach((item) => {
                if (item.trangThai !== 0) return;
                if (!obj[item.tenFile]) {
                  obj[item.tenFile] = [];
                }
                obj[item.tenFile].push(item);
              });

              let keys = Object.keys(obj);
              keys.forEach((key) => {
                arr.push(obj[key]);
              });
            }
            if (!payload.soPhieu) {
              arr = [];
            }
            dispatch.signer.updateData({
              historySigned: arr,
            });
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    signDigital: (
      {
        file,
        maBieuMau,
        maHoSo,
        chuKySo = 1,
        soPhieu,
        tenFile,
        formId, //sử dụng để update trạng thái ký cho fileEditor
        nbHoSoBaId, //sử dụng để update trạng thái ký cho fileEditor
        ...payload
      },
      state
    ) => {
      return new Promise((resolve, reject) => {
        signProvider
          .signDigital({
            file,
            maBieuMau,
            maHoSo,
            chuKySo,
            soPhieu,
            tenFile,
          })
          .then((s) => {
            message.success(s?.message || "Ký thành công");
            let patient = state.patient.patient;
            dispatch.signer.getHistorySigned({
              soPhieu,
              maHoSo: patient?.maHoSo,
              maBieuMau,
            });
            dispatch.signer.updateData({
              isSigning: false,
            });
            dispatch.signer.loadFileSigned({
              prefix: signerPath,
              url: s.data?.fileSauKy,
            });
            if (formId && nbHoSoBaId)
              dispatch.files.updateFileSignStatus({
                maHoSo: patient?.maHoSo,
                formId,
                nbHoSoBaId,
                trangThai: "Da_Ky",
              });
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },

    loadFileSigned: ({ prefix, url }, rootState) => {
      return new Promise((resolve, reject) => {
        if (!url) {
          reject();
        } else
          signProvider
            .getFileSign({ prefix, url })
            .then((s) => {
              dispatch.signer.updateData({
                fileSigned: s.data,
              });
              resolve(s);
            })
            .catch((e) => {
              reject(e);
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            });
      });
    },
    getOriginFile: (payload) => {
      return new Promise((resolve, reject) => {
        signProvider
          .getOriginFile(payload)
          .then((s) => {
            dispatch.signer.loadFileSigned({
              prefix: scanPath,
              url: s.duongDan,
            });
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    getUserSignImage: (payload) => {
      return new Promise((resolve, reject) => {
        signProvider
          .getUserSignImage({ userId: payload })
          .then((s) => {
            resolve(s.data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
  }),
};
