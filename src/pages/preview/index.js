import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import File from "components/File";
import Toolbar from "pages/files/components/Toolbar";
import { Spin } from "antd";
import { FORM_WIDTH, FORM_HEIGHT } from "components/constanst";
import { Main } from "./styled";

const PreviewPage = ({
  loading,
  file,
  fileData,
  isFileLoading,
  isFormDataLoading,
  ...props
}) => {
  const [layoutType, setLayoutType] = useState({});
  const { getFormData, getJsonTemplate, getConfigForm } = props;
  const fileRef = useRef(null);

  const url = new URL(window.location.href);
  const fileId = url.searchParams.get("files");
  const layout = {
    width: layoutType === "default" ? FORM_WIDTH : FORM_HEIGHT,
    height: layoutType === "default" ? FORM_HEIGHT : FORM_WIDTH,
  };
  const [state, _setState] = useState({
    zoomValue: 100,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    setLayoutType(file.config ? file.config.layoutType : "default");
  }, [file]);

  useEffect(() => {
    if (fileId) {
      getConfigForm(fileId);
    }
  }, []);

  const setZoomValue = (zoom) => {
    setState({
      zoomValue: zoom,
    });
  };
  return (
    <Main
      layoutType={layoutType}
      width={layout.width}
      height={layout.height}
      zoomValue={state.zoomValue}
    >
      <div className="layout-body">
        <div className="layout-middle">
          <Toolbar
            saveStatus={loading}
            fileData={fileData}
            zoomValue={state.zoomValue}
            setZoomValue={setZoomValue}
            previewMode={true}
          />

          <div className={"editing-contain"} id={"main-contain"}>
            <div className={"editing-box"} id="scrollBox">
              <Spin spinning={isFormDataLoading || isFileLoading}>
                <div className={"form-content"} id={"file-data-display"}>
                  <File ref={fileRef} />
                </div>
              </Spin>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

const mapState = (state) => ({
  file: state.files.file,
  loading: state.files.loading,
  fileData: state.files.fileData,
  isFormDataLoading: state.files.isFormDataLoading,
  isFileLoading: state.files.isFileLoading,
});

const mapDispatch = ({
  files: { getJsonTemplate, getFormData, getConfigForm },
}) => ({
  getJsonTemplate,
  getFormData,
  getConfigForm,
});

export default connect(mapState, mapDispatch)(PreviewPage);
