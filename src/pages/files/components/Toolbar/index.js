import React, { useState, useRef } from "react";
import { Icon, Button, Select, message, Slider, Input, Popover } from "antd";
import printJS from "print-js";
import { Main, PopupTool } from "./styled";
import { fontFamilies, fontSizes } from "components/EditorTool/Text/constants";
import { generate, pullAllCss } from "./constant";
import * as command from "components/EditorTool/utils";
import ModalSignPdf from "pages/files/components/ModalSignPdf";
import pdfUtils from "utils/pdf-utils";
import xmlUtils from "utils/xml-utils";
import { connect } from "react-redux";
import { HOST } from "client/request";
const Toolbar = ({
  listFiles,
  saveStatus,
  saveData,
  fileOnShow,
  handleOpen,
  fileData,
  patientDocument,
  fileDataHIS,
  patient,
  zoomValue,
  setZoomValue,
  onChangeFile,
  ...props
}) => {
  const [state, _setState] = useState({
    fontSize: "2",
    fontFamily: "timeNewRomance",
    printLoading: false,
    idx: 0,
    isSigning: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refModalSignPdf = useRef(null);

  const handleChangeFontSize = (value) => {
    setState({
      fontSize: value,
    });
    command.setFontSize(value);
  };

  const handleChangeZoom = (value) => {
    setZoomValue(value);
  };

  const signForm = () => {
    if (
      fileOnShow?.formId ||
      fileOnShow?.type == "xnhis" ||
      fileOnShow?.type == "cdhahis"
    ) {
      setState({
        isSigning: true,
      });
      pdfGenerator(fileOnShow, props.file)
        .then((blob) => {
          if (refModalSignPdf.current) {
            console.log("xxx", window.URL.createObjectURL(blob));
            setState({
              isSigning: false,
            });
            refModalSignPdf.current.show({
              formId: fileOnShow?.formId,
              maHoSo: patientDocument,
              urlFile: window.URL.createObjectURL(blob),
              soPhieu: fileOnShow?.soPhieu,
              maBieuMau: fileOnShow?.maBieuMau,
              tenBieuMau: fileOnShow?.tenBieuMau,
              nbHoSoBaId: fileOnShow?.nbHoSoBaId,
            });
          }
        })
        .catch((e) => {
          setState({
            isSigning: false,
          });
        });
    } else {
      refModalSignPdf.current.show({
        formId: fileOnShow?.formId,
        maHoSo: patientDocument,
        urlFile: `${HOST}${fileOnShow.api}`,
        soPhieu: fileOnShow?.soPhieu || 1,
        maBieuMau: fileOnShow?.maBieuMau,
        tenBieuMau: fileOnShow?.tenBieuMau,
      });
    }
  };

  const pdfGenerator = (fileOnShow, fileConfig) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (fileOnShow?.type == "xnhis" || fileOnShow?.type == "cdhahis") {
          pdfUtils
            .htmlToPdf(fileOnShow.ketQua, {
              format: "A4",
              margin: {
                top: "40px",
                left: "40px",
              },
            })
            .then((blob) => {
              resolve(blob);
            })
            .catch((e) => {
              message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              reject(e);
            });
        } else {
          let isHorizontal = fileConfig?.config?.layoutType == "horizontal";

          const wrapElm = document.createElement("div");
          wrapElm.setAttribute("class", "print-wrapper");
          wrapElm.setAttribute("id", "print-wrapper");

          let printArea = document.createElement("div");
          printArea.setAttribute("id", "print-area");
          printArea.setAttribute("class", "view-file-mode");
          printArea.style.fontFamily = `font-family: "Times New Roman", sans-serif;`;
          printArea.style.color = "black";

          let lines = [];
          const file = Array.from(
            document.getElementsByClassName("form-content")
          )[0];

          if (file) {
            Array.from(file.childNodes).forEach((itemLv1) => {
              lines = [...lines, ...Array.from(itemLv1.childNodes)];
            });
            generate(lines, printArea, 0, isHorizontal);
            if (Array.from(file.childNodes).length) {
              let firstChild = Array.from(file.childNodes)[0];
              if (firstChild) {
                firstChild = firstChild.cloneNode();
                console.log(firstChild);
                firstChild.innerHTML = printArea.outerHTML;
                printArea = firstChild;
              }
            }
          }
          wrapElm.append(printArea);
          if (wrapElm) {
            let html = document.getElementsByTagName("html")[0].cloneNode(true);
            let body = html.getElementsByTagName("body")[0];
            if (body) {
              body.innerHTML = wrapElm.outerHTML;
            }
            let head = html.getElementsByTagName("head")[0];
            var css = await pullAllCss(html),
              style = document.createElement("style");
            if (head) {
              head.appendChild(style);
              style.type = "text/css";
              if (style.styleSheet) {
                // This is required for IE8 and below.
                style.styleSheet.cssText = css;
              } else {
                style.appendChild(document.createTextNode(css));
              }
            }

            // var myWindow = window.open("", "MsgWindow");
            // myWindow.document.write(html.outerHTML);
            // return;
            // debugger;
            pdfUtils
              .htmlToPdf(html.outerHTML, {
                format: "A4",
                landscape: isHorizontal,
                margin: {
                  // top: "0px",
                },
              })  
              .then((blob) => {
                resolve(blob);
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
                reject(e);
              });
          }
        }
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  };

  const printForm = () => {
    if (
      fileOnShow?.formId ||
      fileOnShow?.type == "xnhis" ||
      fileOnShow?.type == "cdhahis"
    ) {
      setState({
        printLoading: true,
      });
      pdfGenerator(fileOnShow, props.file)
        .then((blob) => {
          const blobUrl = window.URL.createObjectURL(blob);
          setState({
            printLoading: false,
          });
          printJS({
            printable: blobUrl,
            type: "pdf",
          });
        })
        .catch((e) => {
          setState({
            printLoading: false,
          });
        });
    } else {
      if (fileOnShow?.api) {
        printJS({
          printable: `${HOST}${fileOnShow?.api}`,
          type: "pdf",
        });
      }
    }
  };

  const exportXml = () => {
    xmlUtils.exportHL7(fileDataHIS, patient);
  };

  const changeFile = (isNext) => () => {
    onChangeFile(isNext);
  };

  const renderSelectFont = () => {
    return (
      <Select
        style={{ width: 150 }}
        placeholder={"font-family"}
        size={"small"}
        value={state.fontFamily}
        onChange={(value) => {
          setState({
            fontFamily: value,
          });
        }}
      >
        {Object.keys(fontFamilies).map((key) => (
          <Select.Option key={key} value={key}>
            {fontFamilies[key]}
          </Select.Option>
        ))}
      </Select>
    );
  };

  const renderSelectFontSize = () => {
    return (
      <Select
        size={"small"}
        style={{ width: 70 }}
        placeholder={"font-size"}
        className={"item-tool"}
        value={state.fontSize}
        onChange={handleChangeFontSize}
      >
        {Object.keys(fontSizes).map((item) => (
          <Select.Option key={item} value={item}>
            {fontSizes[item]}
            {" pt"}
          </Select.Option>
        ))}
      </Select>
    );
  };
  const renderButtonBold = () => {
    return (
      <Button
        icon={"bold"}
        size={"small"}
        onClick={command.bold}
        className={"item-tool"}
      />
    );
  };
  const renderButtonItalic = () => {
    return (
      <Button
        icon={"italic"}
        size={"small"}
        onClick={command.italic}
        className={"item-tool"}
      />
    );
  };
  const renderButtonUnderline = () => {
    return (
      <Button
        icon={"underline"}
        size={"small"}
        onClick={command.underline}
        className={"item-tool"}
      />
    );
  };
  const renderButtonPrint = () => {
    return (
      <Button
        loading={state.printLoading}
        icon={"printer"}
        size={"small"}
        onClick={printForm}
        className={"item-tool"}
      />
    );
  };

  const renderZoomTool = () => {
    return (
      <div className={"zoom-tool"}>
        <span>{"Zoom"}</span>
        <Slider
          className={"slider-tool"}
          onChange={handleChangeZoom}
          value={zoomValue}
        />
        <Input
          style={{ marginLeft: 6, width: 66 }}
          value={zoomValue}
          size={"small"}
          suffix={"%"}
          onChange={(e) => {
            handleChangeZoom(e.target.value);
          }}
        />
      </div>
    );
  };
  const renderActionButton = () => {
    return (
      !props.previewMode && (
        <div className={"file-system-tool"}>
          {(fileOnShow.formValue === "BA049" || fileOnShow.maBieuMau === "BA049") && (
            <Button
              size={"small"}
              icon={"file-text"}
              type={"primary"}
              className={"item-tool text-btn"}
              onClick={exportXml}
            >
              {"Xuất HL7"}
            </Button>
          )}
          {process.env.REACT_APP_HIDE_SIGNER === "false" && (
            <Button
              size={"small"}
              icon={"file-done"}
              type={"primary"}
              className={"item-tool text-btn"}
              loading={state.isSigning}
              onClick={signForm}
            >
              {"File ký"}
            </Button>
          )}
          <Button
            size={"small"}
            icon={"save"}
            loading={saveStatus}
            onClick={saveData}
            type={"primary"}
            className={"item-tool text-btn"}
          >
            {"Lưu"}
          </Button>
        </div>
      )
    );
  };

  const renderStyleButtonTool = () => {
    return (
      <div className={"editor-tool"} style={{ marginTop: 0 }}>
        {renderSelectFont()}
        {props.windowWidth <= 450 ? (
          <>
            {renderButtonPrint()}
            <Popover
              placement="topRight"
              content={
                <PopupTool>
                  {renderSelectFontSize()}
                  {renderButtonBold()}
                  {renderButtonItalic()}
                  {renderButtonUnderline()}
                  {props.windowWidth > 450 && renderButtonPrint()}
                </PopupTool>
              }
              trigger="click"
              style={{ alignItems: "flex-end" }}
            >
              <div
                style={{ flex: 1, justifyContent: "flex-end", display: "flex" }}
              >
                <Button icon={"more"} size={"small"} className={"item-tool"} />
              </div>
            </Popover>
          </>
        ) : (
          <>
            {renderSelectFontSize()}
            {renderButtonBold()}
            {renderButtonItalic()}
            {renderButtonUnderline()}
            {renderButtonPrint()}
          </>
        )}
      </div>
    );
  };

  return (
    <Main>
      <div className="toolbar">
        {props.windowWidth >= 650 ? (
          <div style={{ display: "flex" }}>
            <div
              className={"toolbar-left"}
              style={{ borderRightWidth: 0, width: "100%" }}
            >
              <div style={{ display: "flex" }}>
                {renderZoomTool()}
                {renderActionButton()}
              </div>
            </div>
          </div>
        ) : (
          <>
            {renderActionButton()}
            {renderZoomTool()}
          </>
        )}

        <div className={"toolbarStyle1"}>
          {renderStyleButtonTool()}
          {!props.previewMode && (
            <div className={"file-selection"}>
              <button className={"arrow-btn"} onClick={changeFile(false)}>
                <Icon type="left" />
              </button>

              <div className={"file-name-d"} onClick={handleOpen}>
                <span className={"file-name-text"}>
                  {fileOnShow.formName || fileOnShow.ten}
                </span>
              </div>

              <button className={"arrow-btn"} onClick={changeFile(true)}>
                <Icon type="right" />
              </button>
            </div>
          )}
        </div>
      </div>

      <ModalSignPdf ref={refModalSignPdf} />
    </Main>
  );
};

const mapState = (state) => ({
  fileDataHIS: state.files.fileDataHIS,
  fileData: state.files.fileData,
  listFiles: state.documents.files,
  patient: state.patient.patient,
  windowWidth: state.application.width,
  file: state.files.file,
});

const mapDispatch = ({}) => ({});

export default connect(mapState, mapDispatch)(Toolbar);
