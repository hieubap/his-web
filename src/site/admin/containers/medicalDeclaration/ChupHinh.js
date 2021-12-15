import React, { useEffect, useRef, useState } from "react";
import { withTranslate } from "react-redux-multilingual";
import WebcamModal from "@admin/components/common/webcamModal";
import { connect } from "react-redux";
import actionTtHanhChinh from "@actions/ttHanhChinh";
import actionSetting from "@actions/setting";
import { AdminPage } from "@admin/components/admin";
import { Button } from "antd";
import { MainChupHinh } from "./styledModal";
import settingProvider from "@data-access/setting-provider";
function index(props) {
  const refWebcame = useRef(null);
  const {
    translate,
    updateData,
    history,
    isUploadingAvatar,
    uploadFile,
  } = props;
  const [state, _setState] = useState({
    camera: "user",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const maKhach = window.location.search.getQueryStringHref("ma");
  useEffect(() => {
    showModal();
  }, []);
  useEffect(() => {
    let camera =
      settingProvider.getValue(props.dataSetting, "camera", "") == 20
        ? "environment"
        : "user";
    let tenPhieu = settingProvider.getValue(
      props.dataSetting,
      "ten_phieu_khai_thac_thong_tin",
      ""
    );
    setState({
      camera,
      tenPhieu,
    });
  }, [props.dataSetting]);
  const showModal = () => {
    if (refWebcame.current)
      setTimeout(() => {
        refWebcame.current.show({
          image: "",
          camera: state.camera,
        });
      }, 500);
  };
  const uploadImage = (fileName) => {
    updateData({
      isUploadingAvatar: true,
    });
    return uploadFile(fileName)
      .then((s) => {
        if (s && s.code === 0) {
          if (maKhach) {
            let href = "/check-in" + window.location.search;
            history.push(href);
          } else {
            let href = "/so-dien-thoai" + window.location.search;
            history.push(href);
          }
        }
      })
      .catch(() => {});
  };
  const gotoPage = () => {
    let href = "/bo-cau-hoi" + window.location.search;
    history.push(href);
  };
  return (
    <MainChupHinh>
      <AdminPage
        className="mgr-camera"
        icon={[<img src={require("@images/checkin/icLogPage.png")} />]}
        header={state.tenPhieu ? state.tenPhieu : translate("khaibaoyte")}
        subheader={translate("chuphinh")}
      >
        <div className="row">
          <div className="button-camera">
            <Button className="button" onClick={() => gotoPage()}>
              {translate("quaylai")}
            </Button>
          </div>
        </div>
        <WebcamModal
          ref={refWebcame}
          history={history}
          title={translate("chupanhcanhan")}
          upload={uploadImage}
          isLoading={isUploadingAvatar}
        />
      </AdminPage>
    </MainChupHinh>
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
