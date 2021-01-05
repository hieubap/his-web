import { message } from "antd";
import { combineFields } from "utils/editor-utils";
import { get } from "lodash";
import editorProvider from "data-access/editor-provider";

export default {
  state: {
    loading: false,
    id: "",
    props: {
      value: "",
      name: "",
      api: "",
      fontSize: "3",
    },
    lines: [],
    components: [],
    chunkComponent: {},
    block: {},
    line: {},
    component: {},
    fields: [],
    inputList: [],
    type: "",
  }, // initial state
  reducers: {
    // handle state changes with pure functions
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },

    updateFormProps(state, payload) {
      return {
        ...state,
        props: {
          ...payload,
        },
      };
    },

    // manage lines
    updateLine(state, payload) {
      const newLines = state.lines.map((line) =>
        line.key === payload.key ? payload : line
      );
      return { ...state, lines: newLines };
    },
    addLine(state, payload) {
      return { ...state, lines: [...state.lines, payload] };
    },
    removeLine(state, payload) {
      return {
        ...state,
        lines: state.lines.filter((item) => item.key !== payload.key),
        line: {},
        block: {},
        components: state.components.filter(
          (item) => item.parent !== payload.key
        ),
      };
    },

    // manage components
    updateComponents(state, payload) {
      const newItems = state.components.map((item) =>
        item.key === payload.key ? payload : item
      );
      return { ...state, components: newItems };
    },
    addComponent(state, payload) {
      return { ...state, components: [...state.components, payload] };
    },
    addTypeComponent(state, payload) {
      return { ...state, type: payload };
    },
    removeComponent(state, payload) {
      return {
        ...state,
        components: state.components.filter((item) => item.key !== payload.key),
        block: {},
        component: {},
      };
    },
    pasteLayout(state, payload) {
      return { ...state, ...payload };
    },
    focusLine(state, payload) {
      return { ...state, line: payload };
    },
    focusBlock(state, payload) {
      return { ...state, block: payload };
    },
    focusComponent(state, payload) {
      return { ...state, component: payload };
    },
  },
  effects: (dispatch) => ({
    convertData: (data) => {
      if (data.data) {
        let components = data.data.components || [];
        console.log("components", JSON.stringify(components));

        components = components.map((item) => {
          if (item.name === "GroupCheck" && item.props?.checkList) {
            item.props.checkList = item.props?.checkList.map((item2) => {
              item2.labelValue = item2.label;
              return item2;
            });
          }
          return item;
        });

        let obj = {
          id: data.data.id,
          props: {
            value: data.data.value,
            name: data.data.name,
            api: data.data.api,
            fontSize: data.data.config ? data.data.config.fontSize : "3",
            layoutType: data.data.config
              ? data.data.config.layoutType
              : "default",
            tenTieuChi: data.data.tenTieuChi,
            apiTieuChi: data.data.apiTieuChi,
          },
          lines: data.data.layout || [],
          components: components,
          chunkComponent: get(data, "data.layout", []).reduce(
            (res, next) => ({
              ...res,
              [next.key]: get(data, "data.components", []).filter(
                (item) => item.lineKey === next.key
              ),
            }),
            {}
          ),
          block: {},
          line: {},
        };
        dispatch.config.updateData(obj);
        return obj;
      }
    },
    updateConfigForm: ({ formInfo, ...payload }, rootState) => {
      const { config } = rootState;
      const { id, properties } = payload;

      if (id) {
        let components = payload.components
          .filter((item) => !!item)
          .map((item) => {
            let props = properties.key === item.key ? properties : item.props;
            return {
              ...item,
              value: item.value,
              content: "",
              props: {
                ...item.props,
                ...props,
                checkList:
                  item.props && item.props.checkList
                    ? item.props.checkList.map((check) => {
                        const list = props.checkList || [];
                        const obj = list.find((i) => i.key === check.key) || {};
                        return {
                          ...check,
                          ...obj,
                          label: check && check.labelValue,
                        };
                      })
                    : [],
              },
            };
          });
        const data = {
          id: payload.id,
          value: formInfo.value,
          name: formInfo.name,
          api: formInfo.api,
          tenTieuChi: formInfo.tenTieuChi,
          apiTieuChi: formInfo.apiTieuChi,
          layout: payload.lines,
          components: components,
          config: {
            fontSize: config.props?.fontSize || "3",
            layoutType: payload.layoutType,
          },
        };
        editorProvider
          .updateConfigForm({ id, data })
          .then((s) => {
            dispatch.config.convertData(s);
            message.success(s?.message || "Cập nhật form thành công");
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      }
    },

    createConfigForm: (payload) => {
      const data = {
        value: payload.value,
        name: payload.name,
        api: payload.api,
        layout: [],
        components: [],
        config: {
          fontSize: "3",
        },
      };
      editorProvider
        .createConfigForm({ data })
        .then((s) => {
          dispatch.config.convertData(s);
          dispatch.listing.addNew(s.data);
          message.success(s?.message || "Tạo form thành công!");
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau!");
        });
    },

    getJsonTemplate: (payload) => {
      return new Promise((resolve, reject) => {
        editorProvider
          .getJsonTemplate(payload)
          .then((s) => {
            const fields = combineFields(s?.data, []);
            dispatch.config.updateData({ fields: Object.keys(fields) });
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },

    getConfigById: (payload = "", rootState) => {
      return new Promise((resolve, reject) => {
        dispatch.config.updateData({
          loading: true,
        });
        editorProvider
          .getConfigById(payload)
          .then(async (s) => {
            const data = await dispatch.config.convertData(s);
            dispatch.config.getJsonTemplate(get(data, "props.api", ""));
            dispatch.config.updateData({
              loading: false,
            });
          })
          .catch((e) => {
            dispatch.config.updateData({
              loading: false,
            });
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
  }),
};
