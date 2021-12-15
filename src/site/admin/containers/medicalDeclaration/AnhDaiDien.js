import React, { useEffect, useRef, useState } from "react";
import { withTranslate } from "react-redux-multilingual";
import WebcamModal from "@admin/components/common/webcamModal";
import { connect } from "react-redux";
import actionTtHanhChinh from "@actions/ttHanhChinh";
import actionSetting from "@actions/setting";
import { Button } from "antd";
import { MainAvatar } from "./styledModal";
import settingProvider from "@data-access/setting-provider";
import "./style.scss";

function index(props) {
  const refWebcame = useRef(null);
  const {
    translate,
    updateData,
    history,
    isUploadingAvatar,
    uploadFile,
    anhDaiDien,
  } = props;
  const [state, _setState] = useState({
    camera: "user",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    let camera =
      settingProvider.getValue(props.dataSetting, "camera", "") == 20
        ? "environment"
        : "user";
    setState({
      camera,
    });
  }, [props.dataSetting]);
  const showModal = () => {
    if (refWebcame.current)
      refWebcame.current.show({
        image: "",
        camera: state.camera,
      });
  };
  const uploadImage = (fileName) => {
    updateData({
      isUploadingAvatar: true,
    });
    return uploadFile(fileName);
  };
  return (
    <>
      <p>{translate("hinhanhquykhach")}</p>
      <MainAvatar>
        <div className="avatar-body">
          <img
            src={
              anhDaiDien
                ? anhDaiDien.absoluteFileUrl()
                : require("@images/capture_avatar.png")
            }
            alt=""
          />
        </div>
        <Button className="button-avatar" onClick={showModal}>
          <img src={require("@images/web-cam/camera.png")} alt=" " />
          {translate("take_photo")}
        </Button>
      </MainAvatar>
      <WebcamModal
        ref={refWebcame}
        history={history}
        title={"Upload avatar"}
        upload={uploadImage}
        isLoading={isUploadingAvatar}
      />
    </>
  );
}
export default connect(
  (state) => {
    return {
      anhDaiDien: state.ttHanhChinh.anhDaiDien,
      isUploadingAvatar: state.ttHanhChinh.isUploadingAvatar,
      dataSetting: state.setting.data || [],
    };
  },
  {
    updateData: actionTtHanhChinh.updateData,
    uploadFile: actionTtHanhChinh.uploadFile,
  }
)(withTranslate(index));
