import { client, scanPath, formPath } from "client/request";
import { combineUrlParams } from "utils";
import { DOCUMENTS_SCAN, FILE_SCAN } from "client/api";
import { message } from "antd";
import scanProvider from "data-access/scan-provider";
import pdfUtils from "utils/pdf-utils";
import fileUtils from "utils/file-utils";
export default {
  state: {
    medicalRecordScan: [],
    isLoadingDoccumentScan: false,
    fileScan: "",
  }, // initial state
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },

  effects: (dispatch) => ({
    onSizeChange: ({ size = 10, ma = "", ten = "", active, loaiHoSoBaId }) => {
      dispatch.scan.updateData({
        size,
        page: 0,
        data: [],
      });
      dispatch.scan.onSearch({
        page: 0,
        reset: true,
        ma,
        ten,
        active,
        loaiHoSoBaId,
      });
    },
    onSearch: async (
      { page, patientDocument = "", formId = "", reset = false },
      state
    ) => {
      let newState = { isLoading: true };
      if (reset) newState.data = [];
      dispatch.scan.updateData(newState);
      let size = state.scan.size || 10;
      scanProvider
        .searchDocument({
          maHoSo: patientDocument,
          dmBieuMauId: formId,
          page: page + "",
          size: size,
          sort: "createdAt,desc",
        })
        .then((s) => {
          dispatch.scan.updateData({
            isLoading: false,
            data: s?.data || [],
            page,
            total: s?.totalElements || 0,
          });
        })
        .catch((e) => {
          dispatch.scan.updateData({
            isLoading: false,
          });
          message.error(
            e?.message || "Tải danh sách biểu mẫu không thành công"
          );
        });
    },
    uploadScan: ({ isPdf, file, ngayThucHien, moTa = "", ...payload }) => {
      return new Promise((resolve, reject) => {
        if (!payload.maHoSo) {
          message.error("Không tồn tại thông tin bệnh nhân");
          return;
        }
        const getBase64 = (file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              resolve(reader.result);
            };
            reader.onerror = (error) => reject(error);
          });
        };

        const upload = (file) => {
          scanProvider
            .uploadDocument({
              maHoSo: payload.maHoSo,
              maBieuMau: payload.maBieuMau,
              soPhieu: payload.soPhieu,
              file: file,
              ngayThucHien,
              moTa: moTa.trim(),
            })
            .then((s) => {
              dispatch.scan.updateData({
                isLoadingCreate: false,
              });
              dispatch.documents.getFiles(payload.maHoSo);
              resolve(s);
              message.success(
                s?.data?.message || "Thêm mới biểu mẫu thành công"
              );
              return;
            })
            .catch((e) => {
              dispatch.scan.updateData({
                isLoadingCreate: false,
              });
              message.error(e?.message || "Thêm mới biểu mẫu không thành công");
              reject(e);
            });
        };
        let files = [];
        if (!file || !file.length) {
          message.error("Vui lòng chọn file upload");
          return;
        }
        dispatch.scan.updateData({
          isLoadingCreate: true,
        });

        if (!isPdf) {
          files = file.map((item, index) => {
            return getBase64(item.file);
          });
          Promise.all(files)
            .then((s) => {
              console.log(s);
              files = s;
              let html = `<html><body> 
            <style>
            @media print {
              .image {page-break-after: always;}
            }
            </style>           
            ${s
              .map((item) => {
                return `<div class="image"><img src="${item}" style="max-width: 100%;"/></div>`;
              })
              .join("")}
            </body></html>`;
              pdfUtils
                .htmlToPdf(html, {
                  format: "A4",
                  margin: {
                    // top: "0px",
                  },
                })
                .then((s) => {
                  fileUtils
                    .urltoFile(
                      window.URL.createObjectURL(s),
                      "file.pdf",
                      "application/pdf"
                    )
                    .then(function (file) {
                      upload(file);
                    })
                    .catch((e) => {
                      dispatch.scan.updateData({
                        isLoadingCreate: false,
                      });
                      message.error(e?.message);
                    });
                })
                .catch((e) => {
                  dispatch.scan.updateData({
                    isLoadingCreate: false,
                  });
                  message.error(e?.message);
                });
            })
            .catch((e) => {
              dispatch.scan.updateData({
                isLoadingCreate: false,
              });
              message.error(e?.message);
            });
        } else {
          upload(file[0].file);
        }

        return;
      });
    },
    updateScanFile: ({ id, moTa = "", ngayThucHien, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.scan.updateData({
          isLoadingCreate: true,
        });
        scanProvider
          .updateDocument({
            id,
            moTa: moTa.trim(),
            ngayThucHien,
            ...payload,
          })
          .then((s) => {
            let data = state.scan.data || [];
            data = data.map((item) => {
              if (item.id == id) {
                return { ...item, moTa, ngayThucHien, ...payload };
              }
              return item;
            });
            dispatch.scan.updateData({
              data: [...data],
              isLoadingCreate: false,
            });
            resolve(s);
            message.success(s?.data?.message || "Cập nhật biểu mẫu thành công");
            return;
          })
          .catch((e) => {
            dispatch.scan.updateData({
              isLoadingCreate: false,
            });
            message.error(e?.message || "Cập nhật biểu mẫu không thành công");
            reject(e);
          });
      });
    },
    getFileScan: (payload, rootState) => {
      return new Promise((resolve, reject) => {
        fileUtils
          .getFromUrl({
            prefix: scanPath,
            url: payload,
          })
          .then((s) => {
            const blob = new Blob([new Uint8Array(s)], {
              type: "application/pdf",
            });
            const blobUrl = window.URL.createObjectURL(blob);
            resolve(blobUrl);
          })
          .catch((e) => {
            console.log(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
  }),
};
