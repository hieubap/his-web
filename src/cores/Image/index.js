import React, { useState, useEffect, forwardRef } from "react";
import T from "prop-types";
import { Upload } from "antd";
import { connect } from "react-redux";
import { Main } from "./styled";
import defaultPicture from "assets/img/default-image.jpg";
import { HOST } from "client/request";
import fileUtils from "utils/file-utils";
import { checkComponentDisable } from "utils/editor-utils";

const ImageUpload = forwardRef((props, ref) => {
  const {
    init,
    component,
    mode,
    focusing,
    formChange,
    common,
    uploadImage,
    form,
  } = props;
  const itemProps = component.props || {};
  const [state, _setState] = useState({
    disable: false,
    file: "",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    let disable = checkComponentDisable(
      props.auth,
      props.patient,
      itemProps,
      mode,
      props.signStatus,
      props
    );
    if (state.disable != disable) {
      setState({
        disable,
      });
    }
  }, [props.mode, props.signStatus, itemProps.disabled, props.fileDataHIS, props.patient]);
  useEffect(() => {
    if (itemProps.fieldName != "logoAnh") {
      if (form) {
        if (form[itemProps.fieldName]) {
          loadFile("api/html-editor/v1/", form[itemProps.fieldName], "file");
        }
      }
    }
  }, [component, form]);

  const loadFile = (prefix, url, key) => {
    fileUtils
      .getFromUrl({
        prefix: prefix,
        url: Array.isArray(url) ? url[0] : url,
      })
      .then((s) => {
        var base64 = btoa(
          new Uint8Array(s).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );

        // const blob = new Blob([new Uint8Array(s)], {
        //   type: "image/png",
        // });
        setState({ [key]: "data:image/png;base64," + base64 });
      })
      .catch((e) => {
        setState({ [key]: "" });
      });
  };
  useEffect(() => {
    if (itemProps.fieldName === "logoAnh") {
      props.getCommonConfig({ name: "logo_bv" });
    }
  }, [itemProps.fieldName]);

  useEffect(() => {
    if (itemProps.fieldName === "logoAnh" && props.logoAnh?.giaTri) {
      loadFile("api/html-editor/v1", props.logoAnh?.giaTri, "file");
    }
  }, [props.logoAnh, props.commonConfig]);

  useEffect(() => {
    if (itemProps.defaultImageUpload) {
      loadFile(
        "api/html-editor/v1",
        itemProps.defaultImageUpload,
        "imageDefault"
      );
    }
  }, [itemProps.defaultImageUpload]);

  const handleFocus = () => {
    if (mode === "config") {
      init(component);
    }
  };
  useEffect(() => {
    if (formChange && formChange[itemProps.fieldName]) {
      formChange[itemProps.fieldName](common.image);
    }
  }, [common, itemProps]);

  const handleChange = (data) => {
    const reader = new FileReader();

    reader.onload = function () {
      setState({ file: reader.result });
    };
    uploadImage(data.file.originFileObj);
    reader.readAsDataURL(data.file.originFileObj);
  };
  return (
    <Main onClick={handleFocus} focusing={focusing}>
      <Upload
        disabled={state.disable}
        showUploadList={false}
        onChange={handleChange}
        accept=".png,.jpg,.jpeg,.bmp"
      >
        <img
          className={"img-view"}
          src={
            state.file || state.imageDefault
              ? state.file || state.imageDefault
              : defaultPicture
          }
          width={itemProps.width}
          height={itemProps.height}
          alt={"default"}
        />
      </Upload>
    </Main>
  );
});

ImageUpload.defaultProps = {
  component: {
    props: {
      width: 64,
      height: 64,
    },
  },
  formChange: {},
};

ImageUpload.propTypes = {
  formChange: T.shape({}),
};

const mapState = (state) => {
  let commonConfig = state.files.commonConfig || {};
  return {
    commonConfig,
    logoAnh: commonConfig.logo_bv,
    common: state.common,
    fileDefault: state.common.imagedata,
    signStatus: state.files.signStatus || {},
    auth: state.auth.auth,
    patient: state.patient.patient,
    fileDataHIS: state.files.fileDataHIS,
  };
};

const mapDispatch = ({
  component: { init },
  common: { uploadImage },
  files: { getCommonConfig },
}) => ({
  init,
  uploadImage,
  getCommonConfig,
});

export default connect(mapState, mapDispatch, null, { forwardRef: true })(
  ImageUpload
);
