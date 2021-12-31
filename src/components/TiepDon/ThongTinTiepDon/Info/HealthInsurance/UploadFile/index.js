import React, {
  useRef,
  useImperativeHandle,
  useState,
  forwardRef,
} from "react";
import { Main } from "./styled";
import fileProvider from "data-access/file-provider";
import ModalWebcam from "components/ModalWebcam";
import { message } from "antd";
import Pdf from "components/Pdf";
import IcRemove from "assets/svg/tiep-don/remove.svg";
import Image from "components/Image";
const UploadFile = (props, ref) => {
  const refCallback = useRef(null);
  const refImage = useRef();
  const [state, _setState] = useState({
    dataView: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: (item = {}, callback) => {
      setState({
        show: item.show,
        dataView: item.dataView || [],
        typeFile: item.type,
        title: item.title,
      });
      refCallback.current = callback;
    },
  }));
  const { type, dataView, typeFile, title } = state;
  const onOK = () => {
    onCancel();
    if (refCallback.current)
      refCallback.current({ data: dataView, type: typeFile });
  };
  const handleUploadFile = (event) => {
    event.preventDefault();
    return refImage.current.click();
  };
  const onTakePicture = (fileName, type, checkUpload) => {
    fileProvider
      .upload(fileName, type)
      .then((s) => {
        if (s?.code === 0) {
          let data = [];
          let image = s.data?.length && s.data[0];
          data = dataView?.concat(image);
          setState({ dataView: data });
          if (!checkUpload) onCamera(false);
        } else {
          message.error(s.message);
        }
      })
      .catch(() => {});
  };

  const onCancel = () => {
    setState({ show: false });
  };
  const onCamera = (show) => {
    setState({ [`isOpen${type}`]: show });
  };
  const onDeleteIndex = (index) => {
    dataView.splice(index, 1);
    setState({ dataView: [...dataView] });
  };
  return (
    <Main visible={state.show} closable={false} title={`Thông tin ${title}`}>
      <div span={24} className="header">
        <img
          className="info"
          src={require("assets/images/welcome/info.png")}
          alt=""
        />
        <div className="info">
          <span className="title">Tải lên giấy {title}</span>
          <br />
          <span className="content">
            Nhấn vào icon máy ảnh để tải ảnh chụp trực tiếp
            <br />
            Nhấn vào hình đám mây để tải tệp từ máy
            <br />
            Nhấn biểu tượng x ở góc ảnh để xóa dữ liệu đã tải lên
          </span>
        </div>
      </div>
      <div className="body-camera">
        <div className="camera">
          {dataView?.map((item, index) => {
            return (
              <div className="item" key={index}>
                {item?.substr(item.length - 3, 3) === "pdf" ? (
                  <Pdf src={item} width={150} height={100} />
                ) : (
                  <Image src={item} alt="" />
                )}
                <div className="file-overlay" />
                <IcRemove
                  className="icon-close"
                  //   src={require("assets/images/welcome/closeImage.png")}
                  onClick={() => onDeleteIndex(index)}
                  //   alt=""
                />
              </div>
            );
          })}
        </div>
        <div className="camera-icon">
          <img
            onClick={() => onCamera(true)}
            src={require("assets/images/web-cam/camera2.png")}
            alt=""
            style={{ marginRight: 10 }}
          />
          <input
            style={{ display: "none" }}
            accept="file_extension"
            type="file"
            onChange={(e) => onTakePicture(e.target.files[0], typeFile, true)}
            ref={refImage}
          />
          <img
            onClick={handleUploadFile}
            src={require("assets/images/web-cam/dammay.png")}
            alt=""
          />
        </div>
      </div>
      <div className="footer">
        <div className="btn btn-cancel" onClick={() => onCancel()}>
          <span> Quay lại </span>
        </div>
        <div className="btn btn-accept" onClick={() => onOK()}>
          <span>Lưu thông tin</span>
          <img src={require("assets/images/welcome/save.png")} alt="" />
        </div>
      </div>
      {state[`isOpen${type}`] && (
        <ModalWebcam
          show={state[`isOpen${type}`]}
          title={"Chụp ảnh"}
          modalActions={(e) => onTakePicture(e, typeFile)}
          onClose={onCamera}
        />
      )}
    </Main>
  );
};

export default forwardRef(UploadFile);
