import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import T from "prop-types";
import TextEdit from "cores/TextEdit";
import { Main } from "./styled";
import { Button, message } from "antd";
import { connect } from "react-redux";
import ModalPatientSign from "pages/files/components/ModalPatientSign";
import fileUtils from "utils/file-utils";
import renderHTML from "react-render-html";
import { checkComponentDisable } from "utils/editor-utils";

const ElectronicSignature = forwardRef(({ textTransform, ...props }, ref) => {
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const {
    mode,
    component,
    form,
    formChange,
    init,
    focusing,
    hideLabelDots,
  } = props;
  const buttonSign = "Xác nhận ký";
  const buttonSignRef = useRef(null);
  const refModalPatientSign = useRef(null);
  const itemProps = component.props || {};
  const getValue = (id) => {
    const elm = document.getElementById(id);
    return elm ? elm.innerHTML : "";
  };
  useEffect(() => {
    setState({
      personSign: itemProps.personSign,
      buttonSignText: itemProps.buttonSignText,
    });
    if (form && form[itemProps.fieldName + "_chuKy"]) {
      let url = form[itemProps.fieldName + "_chuKy"] + "";
      if (url?.indexOf("data:") == 0) {
        setState({
          imageData: form[itemProps.fieldName + "_chuKy"],
        });
      } else {
        fileUtils
          .getFromUrl({
            prefix: "api/html-editor/v1/",
            url: Array.isArray(form[itemProps.fieldName + "_chuKy"])
              ? form[itemProps.fieldName + "_chuKy"][0]
              : form[itemProps.fieldName + "_chuKy"],
          })
          .then((s) => {
            var base64 = btoa(
              new Uint8Array(s).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            setState({
              imageData: "data:image/png;base64," + base64,
            });
          })
          .catch((e) => {
            setState({
              imageData: null,
            });
          });
      }
    }
    if (mode !== "config") {
      if (component.props.disableIfSigned && form && itemProps.fieldName) {
        {
          if (form[itemProps.fieldName + "_chuKy"]) {
            props.setSignStatus({ componentId: component.key, block: true });
          }
        }
      } else {
        props.setSignStatus({ componentId: component.key, block: false });
      }
    }
  }, [component, form]);

  useImperativeHandle(ref, () => ({
    collectProps: () => {
      return {
        personSign: getValue(`${component.type}_${component.key}`),
        buttonSignText: getValue(`${component.type}_${component.key}_btn_sign`),
      };
    },
  }));

  const handleFocus = () => {
    if (mode === "config") {
      init(component);
    }
  };

  const getNewSignLevel = (sign) => {
    let values = {};
    if (formChange.getAllData) values = formChange.getAllData();
    let signComponent = props.components
      .filter((item) => {
        if (item.type === "electronicSignature") {
          if (sign) {
            if (
              item.key == component.key ||
              values[item.props?.fieldName + "_chuKy"]
            ) {
              return true;
            }
          } else {
            if (
              item.key != component.key &&
              values[item.props?.fieldName + "_chuKy"]
            ) {
              return true;
            }
          }
          return false;
        }
      })
      .sort((a, b) => {
        return a.props?.levelSign > b.props?.levelSign ? -1 : 1;
      });
    if (!signComponent.length) {
      return 0;
    }
    return signComponent[0].props?.levelSign;
  };

  const sendActionAutoSave = () => {
    if (itemProps.autoSave || itemProps.autoSave === undefined) {
      window.postMessage(
        {
          TYPE: "EDITOR-SIGNED",
        },
        window.location.origin
      );
    }
  };

  const onSign = () => {
    if (!form) return;
    let level = itemProps.levelSign;
    let allData = {};
    if (formChange.getAllData) allData = formChange.getAllData();
    props
      .checkAllowSign({ level, values: allData })
      .then((s) => {
        if (itemProps.isPatient) {
          if (refModalPatientSign.current) {
            refModalPatientSign.current.show(
              {
                isGetImage: true,
                // ...s?.data,
                // maHoSo: state.maHoSo,
                // soPhieu: state.soPhieu,
              },
              (image) => {
                setState({
                  imageData: image,
                });
                let newData = {};

                if (itemProps.fieldName) {
                  newData = {
                    ...newData,
                    [itemProps.fieldName + "_chuKy"]: image,
                    [itemProps.fieldName + "_ngayKy"]: new Date().format(
                      "yyyy-MM-dd"
                    ),
                    [itemProps.currentLevelRef || "soCapKy"]: getNewSignLevel(
                      true
                    ),
                  };
                }
                if (formChange.setMultiData) {
                  formChange.setMultiData(newData);
                }

                message.success(
                  "Ký " + (itemProps.signer || "") + " thành công"
                );
                if (component.props.disableIfSigned) {
                  props.setSignStatus({
                    componentId: component.key,
                    block: true,
                  });
                } else {
                  props.setSignStatus({
                    componentId: component.key,
                    block: false,
                  });
                }
                sendActionAutoSave();
              }
            );
          }
        } else {
          setState({
            isLoading: true,
          });
          props.getUserSignImage(props.auth.id).then((s) => {
            if (s) {
              setState({
                imageData: "data:image/png;base64," + s,
              });
              if (itemProps.fieldName) {
                let newData = {};
                if (itemProps.fieldName) {
                  newData = {
                    ...newData,
                    [itemProps.fieldName + "_chuKy"]:
                      "data:image/png;base64," + s,
                    [itemProps.fieldName + "_ngayKy"]: new Date().format(
                      "yyyy-MM-dd"
                    ),
                    [itemProps.fieldName + "_hoVaTen"]: props.auth.full_name,
                    [itemProps.currentLevelRef || "soCapKy"]: getNewSignLevel(
                      true
                    ),
                  };
                  if (formChange.setMultiData) {
                    formChange.setMultiData(newData);
                  }
                }
              }
              setState({
                isLoading: false,
              });
              message.success("Ký " + (itemProps.signer || "") + " thành công");
              if (component.props.disableIfSigned) {
                props.setSignStatus({
                  componentId: component.key,
                  block: true,
                });
              } else {
                props.setSignStatus({
                  componentId: component.key,
                  block: false,
                });
              }
              sendActionAutoSave();
            } else {
              message.error("Người dùng chưa khai báo chữ ký");
            }
          });
        }
      })
      .catch((e) => {
        message.error(e || "Bạn chưa thể thực hiện ký vào lúc này");
      });
  };

  const onChangeValue = (type) => (value) => {
    setState({
      [type]: value,
    });
  };

  const clearSignature = () => {
    let level = itemProps.levelSign;
    let newData = {};
    let allData = {};
    if (formChange.getAllData) allData = formChange.getAllData();

    props
      .checkAllowClearSign({ level, values: allData })
      .then((s) => {
        setState({
          imageData: "",
        });
        if (itemProps.fieldName && formChange.setMultiData) {
          newData[itemProps.fieldName + "_chuKy"] = "";
          newData[itemProps.fieldName + "_ngayKy"] = "";
          newData[itemProps.fieldName + "_hoVaTen"] = "";
          newData[itemProps.currentLevelRef || "soCapKy"] = getNewSignLevel(
            false
          );
          formChange.setMultiData(newData);
        }
        props.setSignStatus({ componentId: component.key, block: false });
      })
      .catch((e) => {
        message.error(e);
      });
  };

  let disable = checkComponentDisable(props.auth, props.patient);

  return (
    <Main
      onClick={handleFocus}
      focusing={focusing}
      hideLabelDots={hideLabelDots}
      style={{
        width: itemProps.width,
        border: mode == "config" ? "1px solid black" : "",
      }}
      hadLabel={!!itemProps.personSign}
    >
      <div
        style={{
          width: itemProps.width || 200,
          height: itemProps.height || 200,
          display: "flex",
          overflow: "hidden",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // border: "1px solid #cacaca",
        }}
      >
        {mode === "config" ? (
          <TextEdit
            id={`${component.type}_${component.key}_btn_sign`}
            className={"text-field-label"}
            defaultValue={itemProps.buttonSignText || buttonSign}
            ref={buttonSignRef}
            mode={mode}
            onChange={onChangeValue("buttonSignText")}
            textTransform={textTransform}
          />
        ) : mode === "editing" ? (
          state.imageData ? (
            <>
              <div className="image-sign-area">
                <img src={`${state.imageData}`} />
              </div>
              {itemProps.allowReset && !disable && (
                <Button
                  className="btn-reset-signature"
                  onClick={clearSignature}
                  icon="edit"
                  size={"small"}
                />
              )}
            </>
          ) : (
            !disable && (
              <Button loading={state.isLoading} onClick={onSign}>
                {renderHTML(itemProps.buttonSignText || buttonSign)}
              </Button>
            )
          )
        ) : (
          <div></div>
        )}
      </div>
      <ModalPatientSign ref={refModalPatientSign} />
    </Main>
  );
});

ElectronicSignature.defaultProps = {
  mode: "editing",
  labelText: "",
  form: {},
  formChange: {},
  component: {},
  line: {},
  focusComponent: () => {},
};

ElectronicSignature.propTypes = {
  mode: T.oneOf(["config", "editing"]),
  form: T.shape({}),
  formChange: T.shape({}),
  component: T.shape({}),
  line: T.shape({}),
  labelText: T.string,
  focusComponent: T.func,
};

const mapState = (state) => ({
  currentLevelRef: state.files.currentLevelRef,
  components: state.files.file.components,
  auth: state.auth.auth,
  patient: state.patient.patient,
  fileDataHIS: state.files.fileDataHIS,
});

const mapDispatch = ({
  component: { init },
  signer: { getUserSignImage },
  files: { setSignStatus, checkAllowSign, checkAllowClearSign },
}) => ({
  init,
  getUserSignImage,
  setSignStatus,
  checkAllowSign,
  checkAllowClearSign,
});

export default connect(mapState, mapDispatch, null, { forwardRef: true })(
  ElectronicSignature
);
