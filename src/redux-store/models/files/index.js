import { combineFields } from "utils/editor-utils";
import { message } from "antd";
import editorProvider from "data-access/editor-provider";
import commonConfigProvider from "data-access/common-config-provider";
import cacheUtils from "utils/cache-utils";

export default {
  state: {
    isFormDataLoading: false,
    isFileLoading: false,
    isSaveFormLoading: false,
    list: [],
    jsonTemplate: [],
    file: {},
    fileData: {},
    fileDataHIS: {},
    listForm: [],
    fileTemplate: {},
  }, // initial state
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getConfigForm: (payload, state) => {
      return new Promise(async (resolve, reject) => {
        dispatch.files.updateData({
          isFileLoading: true,
          file: {
            components: [],
          },
          signStatus: {},
        });
        let userId = state.auth.auth?.id;
        let file = await cacheUtils.read(
          userId,
          "EDITOR_FILE_" + payload,
          null,
          false
        );
        let list = state.files.list || [];
        if (file) {
          list.push(file);
          dispatch.files.updateData({
            file,
            list: [...list],
            isFileLoading: false,
          });
        }

        editorProvider
          .getConfigForm(payload)
          .then((s) => {
            cacheUtils.save(userId, "EDITOR_FILE_" + payload, s?.data, false);
            list.push(s?.data);
            list = list.filter((item, index, self) => {
              return self.findIndex((item2) => item2.id === item.id) === index;
            });
            dispatch.files.updateData({
              isFileLoading: false,
              file: s?.data,
              list: [...list],
            });
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            dispatch.files.updateData({
              isFileLoading: false,
            });
          });
      });
    },
    getCommonConfig: ({ name }, state) => {
      return new Promise(async (resolve, reject) => {
        let config = await cacheUtils.read(
          null,
          "COMMON_CONFIG_" + name,
          null,
          false
        );

        let commonConfig = state.files.commonConfig || {};
        if (config) {
          commonConfig[name] = config;
          dispatch.files.updateData({
            licommonConfigst: { ...commonConfig },
          });
        }
        commonConfigProvider.search({ ma: name }).then((s) => {
          cacheUtils.save(null, "COMMON_CONFIG_" + name, s?.data, false);
          commonConfig[name] = s?.data;
          dispatch.files.updateData({
            commonConfig: { ...commonConfig },
          });
        });
      });
    },
    getJsonTemplate: (api, state) => {
      return new Promise(async (resolve, reject) => {
        let userId = state.auth.auth?.id;
        let template = await cacheUtils.read(
          userId,
          "EDITOR_TEMPLATE_" + api,
          {},
          false
        );
        dispatch.department.updateData(template);
        editorProvider.getJsonTemplate(api).then((s) => {
          const fields = combineFields(s?.data);
          let template = {
            jsonTemplate: Object.keys(fields),
            fileTemplate: s?.data,
          };
          dispatch.files.updateData(template);
          cacheUtils.save(userId, "EDITOR_TEMPLATE_" + api, template, false);
        });
      });
    },

    onSaveForm: (payload, state) => {
      return new Promise((resolve, reject) => {
        dispatch.files.updateData({ isSaveFormLoading: true });
        editorProvider
          .onSaveForm(payload)
          .then((s) => {
            message.success(s?.message || "Lưu thông tin thành công!");
            dispatch.documents.getFiles(payload.patientDocument);
            dispatch.files.updateData({
              isSaveFormLoading: false,
              fileData: combineFields(s?.data),
            });
            resolve(s?.data);
          })
          .catch((e) => {
            dispatch.files.updateData({ isSaveFormLoading: false });
            message.error(e?.message || "Lưu thông tin không thành công!");
            reject(e);
          });
      });
    },
    getFormData: ({ ...payload }) => {
      return new Promise((resolve, reject) => {
        dispatch.files.updateData({
          isFormDataLoading: true,
          fileData: {},
          fileDataHIS: {},
        });
        let promise = [
          editorProvider.getFormDataEMR({
            api: payload.file.api,
            nbHsBaId: payload.nbHsBaId,
            patientDocument: payload.patientDocument,
          }),
          editorProvider.getFormDataHIS({
            api: payload.file.api,
            patientDocument: payload.patientDocument,
            recordId: payload.recordId,
          }),
        ];
        Promise.all(promise)
          .then((values) => {
            dispatch.files.updateData({
              isFormDataLoading: false,
              fileData: combineFields(values[0]?.data),
              fileDataHIS: combineFields(values[1]?.data),
            });
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            dispatch.files.updateData({
              isFormDataLoading: false,
            });
          });
      });
    },
    getAllCriterials: ({ api, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        if (!api) {
          message.error("Chưa khai báo api danh sách tiêu chí");
          return;
        }
        dispatch.files.updateData({
          isLoadingCriterial: true,
          criterials: [],
        });
        editorProvider
          .getAllCriterials({ api, ...payload })
          .then((s) => {
            dispatch.files.updateData({
              isLoadingCriterial: false,
              criterials: s?.data || [],
            });
          })
          .catch((e) => {
            dispatch.files.updateData({
              isLoadingCriterial: false,
            });
          });
      });
    },
    updateFileSignStatus: ({ maHoSo, formId, nbHoSoBaId, trangThai }) => {
      return new Promise((resolve, reject) => {
        editorProvider
          .updateFileSignStatus({ formId, nbHoSoBaId, trangThai })
          .then((s) => {
            dispatch.documents.getFiles(maHoSo);
          })
          .catch((e) => {
            message.error(e.message || "Không thể cập nhật trạng thái ký");
          });
      });
    },
    setSignStatus: (
      { componentId, block, signLevel, currentLevel, props, ...payload },
      state
    ) => {
      return new Promise((resolve, reject) => {
        let signStatus = state.files.signStatus || {};
        let status = signStatus[componentId] || {};
        if (status.block == block) {
          resolve();
        } else {
          status.block = block;
          status.signLevel = signLevel;
          status.currentLevel = currentLevel;
          signStatus[componentId] = status;
          dispatch.files.updateData({
            signStatus: { ...signStatus },
          });
          resolve();
        }
      });
    },

    checkAllowSign: ({ level, values = {}, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        let signComponent = state.files.file.components
          .filter((item) => {
            if (
              item.type === "electronicSignature" &&
              level > (item.props?.levelSign || 1) &&
              item.props?.fieldName &&
              !values[item.props?.fieldName + "_chuKy"]
            ) {
              return true;
            }
            return false;
          })
          .sort((a, b) => {
            return a.props?.levelSign > b.props?.levelSign ? 1 : -1;
          });
        if (signComponent.length > 0) {
          reject(
            "Vui lòng ký " +
              (signComponent[0].props.signer
                ? signComponent[0].props.signer
                : "cấp " + (signComponent[0].props.levelSign || 1)) +
              " trước"
          );
          return;
        }
        resolve(true);
      });
    },
    checkAllowClearSign: ({ level, values = {}, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        let signComponent = state.files.file.components
          .filter((item) => {
            if (
              item.type === "electronicSignature" &&
              level < (item.props?.levelSign || 1) &&
              item.props?.fieldName &&
              values[item.props?.fieldName + "_chuKy"]
            ) {
              return true;
            }
            return false;
          })
          .sort((a, b) => {
            return a.props?.levelSign > b.props?.levelSign ? -1 : 1;
          });
        if (signComponent.length > 0) {
          reject(
            "Vui lòng huỷ ký " +
              (signComponent[0].props.signer
                ? signComponent[0].props.signer
                : "cấp " + (signComponent[0].props.levelSign || 1)) +
              " trước"
          );
          return;
        }

        resolve(true);
        return;
      });
    },
    clearCurrentFile: () => {
      dispatch.files.updateData({
        file: {},
      });
    },
  }),
};
