import { message } from "antd";
import recordTypeProvider from "data-access/record-type-provider";
import medicalRecordProvider from "data-access/medical-record-provider";

export default {
  state: {
    template: [],
    templateName: "",
    files: [],
    dataDocument: {},
  }, // initial state
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getRecordTypeByPatientDocument: (maHoSo) => {
      return new Promise((resolve, reject) => {
        recordTypeProvider
          .getRecordTypeByPatientDocument({ maHoSo: maHoSo })
          .then((s) => {
            if (s?.data) {
              let data = (s.data?.dsBieuMau || [])
                .filter((item) => item.active)
                .sort((a, b) => a.stt - b.stt);
              dispatch.documents.updateData({
                template: data,
                templateName: s.data.ten || "",
                dataDocument: s.data || {},
              });
              resolve();
            } else {
              message.error("Không tồn tại loại hồ sơ bệnh án");
              reject();
            }
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject();
          });
      });
    },
    getFiles: (payload) => {
      return new Promise((resolve, reject) => {
        medicalRecordProvider
          .getFiles({
            maHoSo: payload,
          })
          .then((s) => {
            dispatch.documents.updateData({
              files: (s.data || []).sort((a, b) => a.stt - b.stt),
            });
          })
          .catch((e) => {
            console.log(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
    deleteFile: ({ api, nbHsBaId, ...payload }) => {
      medicalRecordProvider
        .deleteFile({ api, nbHsBaId })
        .then((s) => {
          message.success("Xoá thành công bản ghi!");
          dispatch.documents.getFiles(payload.patientDocument);
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
        });
    },
  }),
};
