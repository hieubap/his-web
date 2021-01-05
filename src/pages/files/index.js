import React, { useEffect, useRef, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { HOST } from "client/request";
import { connect } from "react-redux";
import { Spin } from "antd";
import PdfView from "components/PdfView";
import HtmlView from "components/HtmlView";
import File from "components/File";
import Toolbar from "pages/files/components/Toolbar";
import FormList from "./components/FormList";
import { Main } from "./styled";
import { FORM_HEIGHT, FORM_WIDTH } from "components/constanst";
import ModalFillFormName from "pages/files/components/ModalFillFormName";
const Files = ({
  file,
  getJsonTemplate,
  getFormData,
  getConfigForm,
  getRecordTypeByPatientDocument,
  getFiles,
  deleteFile,
  updatePatientDocument,
  ...props
}) => {
  const [state, _setState] = useState({
    fileOnShow: {},
    zoomValue: 100,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refModalFillFormName = useRef(null);
  const params = useParams();
  const history = useHistory();
  const fileRef = useRef(null);
  const formListRef = useRef(null);

  const url = new URL(window.location.href);
  const formsStr = url.searchParams.get("files");
  const nbHsBaId = url.searchParams.get("nbHsBaId");
  const recordId = url.searchParams.get("recordId");
  const viewType = url.searchParams.get("view");
  const type = url.searchParams.get("type");
  const referentId = url.searchParams.get("referentId");

  const layout = {
    width:
      (file?.config?.layoutType || "default") === "default"
        ? FORM_WIDTH
        : FORM_HEIGHT,
    height:
      (file?.config?.layoutType || "default") === "default"
        ? FORM_HEIGHT
        : FORM_WIDTH,
  };

  useEffect(() => {
    props.setCurrentFuction("HSBA");
    window.addEventListener("message", eventMessage, false);

    return () => {
      window.removeEventListener("message", eventMessage);
    };
  }, []);

  const eventMessage = (event = {}) => {
    if (event.data?.TYPE === "EDITOR-SIGNED") {
      saveData();
    }
  };

  useEffect(() => {
    const maHoSo = params.patientDocument;
    updatePatientDocument(maHoSo);
    getFiles(maHoSo);
    getRecordTypeByPatientDocument(maHoSo);
  }, [params.patientDocument]);

  useEffect(() => {
    if (props.listFiles) {
      //lấy danh sách các phiếu có form Id được truyền vào
      const objL = props.listFiles.filter(
        (item) =>
          item.formId === parseInt(formsStr) ||
          item.formValue === formsStr ||
          item.maBieuMau === formsStr
      );
      //lấy phiếu trùng với query nếu không có thì lấy phần tử đầu tiên
      let objF = objL.find((item) => {
        if (nbHsBaId && item.nbHoSoBaId == nbHsBaId) return true;
        if (recordId && item.recordId == recordId) return true;
        if (referentId && item.id == referentId) return true;
        return false;
      });
      if (!objF) {
        objF =
          objL.find((item) => {
            if (item.nbHoSoBaId) return true;
            if (item.type == "form" && item.formId) return true;
            if (item.type == "signed") return true;
            if (item.type == "scan") return true;
            if (item.type == "cdhapacs") return true;
            if (item.type == "cdhahis") return true;
            if (item.type == "xnhis") return true;
            if (item.type == "xnlis") return true;
          }) || objL[0];
      }
      if (objF) {
        changeFile(objF);
        formListRef.current.setExpandedKeys([objF.parentKey]);
        formListRef.current.setSelectedKeys([objF.key]);
      } else if (props.listFiles[0]) {
        changeFile(props.listFiles[0]);
      }
    }
  }, [props.listFiles]);

  useEffect(() => {
    if (state.fileOnShow?.key) {
      formListRef.current.setSelectedKeys([state.fileOnShow?.key + ""]);
    }
    if (state.fileOnShow.formId) {
      state.fileOnShow.recordId = state.fileOnShow.recordId || recordId;

      getConfigForm(state.fileOnShow.formId);
      handleLoadInfo(state.fileOnShow);

      if (state.fileOnShow.nbHoSoBaId) {
        history.replace(
          `${history.location.pathname}?files=${state.fileOnShow.formId}&nbHsBaId=${state.fileOnShow.nbHoSoBaId}`
        );
      } else {
        history.replace(
          `${history.location.pathname}?files=${state.fileOnShow.formId}${
            recordId ? "&recordId=" + recordId : ""
          }`
        );
      }
    } else {
      let formValue = state.fileOnShow.formValue || state.fileOnShow.maBieuMau;
      if (formValue) {
        history.replace(
          `${history.location.pathname}?files=${formValue}&type=${state.fileOnShow.type}&referentId=${state.fileOnShow.id}`
        );
      }
    }
  }, [state.fileOnShow]);

  const changeFile = (file) => {
    setState({
      fileOnShow: file,
    });
  };

  const onChangeFile = (isNext) => {
    if (formListRef.current) {
      if (isNext) formListRef.current.next(state.fileOnShow);
      else formListRef.current.back(state.fileOnShow);
    }
  };

  const handleOpen = () => {
    if (formListRef.current) {
      formListRef.current.show({});
    }
  };

  const handleLoadInfo = (file) => {
    getJsonTemplate(file.api);
    getFormData({
      file,
      patientDocument: params.patientDocument,
      nbHsBaId: file.nbHoSoBaId,
      recordId: file.recordId,
    });
  };

  const saveData = () => {
    if (fileRef.current) {
      if (state.fileOnShow?.taoNhieuMau) {
        if (state.fileOnShow?.nbHoSoBaId) {
          return fileRef.current.handleSubmit(
            state.fileOnShow,
            state.fileOnShow.tenPhieu
          );
        } else {
          let fs = props.listFiles.find((item) => {
            return item.formId === state.fileOnShow?.formId && item.nbHoSoBaId;
          });
          if (fs) {
            if (refModalFillFormName.current)
              refModalFillFormName.current.show(
                {
                  tenPhieu:
                    state.fileOnShow?.tenPhieu || state.fileOnShow?.formName,
                },
                (name) => {
                  return fileRef.current.handleSubmit(state.fileOnShow, name);
                }
              );
          } else {
            return fileRef.current.handleSubmit(state.fileOnShow, "");
          }
        }
      } else {
        return fileRef.current.handleSubmit(state.fileOnShow, "");
      }
    }
  };

  const setZoomValue = (zoom) => {
    setState({
      zoomValue: zoom,
    });
  };
  console.log(state.fileOnShow);
  return (
    <Main
      layoutType={file?.config?.layoutType || "default"}
      width={layout.width}
      height={layout.height}
      zoomValue={state.zoomValue}
    >
      <div className="layout-body">
        <Toolbar
          handleOpen={handleOpen}
          fileOnShow={state.fileOnShow}
          saveData={saveData}
          handleLoadInfo={handleLoadInfo}
          onChangeFile={onChangeFile}
          saveStatus={props.loading}
          patientDocument={params.patientDocument}
          zoomValue={state.zoomValue}
          setZoomValue={setZoomValue}
        />
        <div className="layout-middle">
          <div className={"editing-contain"} id={"main-contain"}>
            <FormList
              ref={formListRef}
              fileOnShow={state.fileOnShow}
              changeFile={changeFile}
            />
            <div className="editor-layout">
              <div className={"editing-box"} id="scrollBox">
                <Spin spinning={props.isFormDataLoading || props.isFileLoading}>
                  <div className={"form-content"} id={"file-data-display"}>
                    {state.fileOnShow?.type == "scan" ||
                    state.fileOnShow?.type == "signed" ||
                    state.fileOnShow?.type == "xnlis" ||
                    state.fileOnShow?.type == "cdhapacs" ? (
                      <PdfView src={`${HOST}${state.fileOnShow.api}`} />
                    ) : state.fileOnShow?.type == "cdhahis" ||
                      state.fileOnShow?.type == "xnhis" ? (
                      <HtmlView html={state.fileOnShow?.ketQua} />
                    ) : state.fileOnShow?.type == "form" &&
                      !state.fileOnShow?.formId ? null : (
                      <File ref={fileRef} />
                    )}
                  </div>
                </Spin>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalFillFormName wrappedComponentRef={refModalFillFormName} />
    </Main>
  );
};

const mapState = (state) => {
  return {
    loading: state.files.loading,
    isFormDataLoading: state.files.isFormDataLoading,
    isFileLoading: state.files.isFileLoading,
    file: state.files.file,
    listFiles: state.documents.files,
    patientDocument: state.patient.patientDocument,
  };
};

const mapDispatch = ({
  files: { getJsonTemplate, getFormData, getConfigForm },
  patient: { updatePatientDocument },
  documents: { getRecordTypeByPatientDocument, getFiles, deleteFile },
  application: { setCurrentFuction },
}) => ({
  getJsonTemplate,
  getFormData,
  getConfigForm,
  getRecordTypeByPatientDocument,
  getFiles,
  deleteFile,
  updatePatientDocument,
  setCurrentFuction,
});

export default connect(mapState, mapDispatch)(Files);
