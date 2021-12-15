import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import "./style.scss";
import QrReader from "react-qr-reader";
import { Modal } from "antd";
import snackbar from "@utils/snackbar-utils";
import FocusCamera from "./FocusCamera";
function ScanQrCode(props, ref) {
  const refCallback = useRef(null);
  const refImage = useRef(null);
  const [state, _setState] = useState({});
  const { selectImage } = props;
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    show: (options = {}, callback) => {
      setState({
        show: true,
        camera: options.camera || "user",
      });
      refCallback.current = callback;
    },
  }));

  const handleScan = (data) => {
    if (data) {
      setState({
        show: false,
      });
      if (refCallback.current) refCallback.current(data);
    }
  };
  const handleError = (err) => {
    // console.error(err);
  };
  const onCancel = () => {
    setState({
      show: false,
    });
  };
  const update = (event) => {
    let image = event.target.files && event.target.files[0];
    let type = image.type;
    if (type === "image/png" || type === "image/jpeg" || type === "image/gif") {
      selectImage(image);
      onCancel();
    } else {
      snackbar.show("Vui lòng chọn đúng định dạng ảnh Qrcode!", "danger");
    }
  };
  const handleUploadFile = (event) => {
    event.preventDefault();
    return refImage.current.click();
  };

  const changeCamera = () => {
    setState({
      camera: state.camera == "user" ? "environment" : "user",
    });
  };
  return (
    <Modal
      visible={state.show}
      footer={null}
      onCancel={onCancel}
      closable={false}
      className="scan-qr-code"
    >
      {state.show && (
        <QrReader
          facingMode={state.camera}
          onError={() => handleError()}
          onScan={(e) => handleScan(e)}
        />
      )}
      {state.show && <FocusCamera />}
      <div className="tip">
        <span>
          Di chuyển Camera <br /> đến khu vực cần quét
          <img
            onClick={onCancel}
            src={require("@images/searchQR/iconNotifi.png")}
            alt=""
            style={{ maxWidth: 30, cursor: "pointer" }}
          />
        </span>
      </div>
      <div className="camera-footer">
        <div
          className="upload-qr"
          style={{ cursor: "pointer" }}
          onClick={handleUploadFile}
        >
          <img
            src={require("@images/searchQR/iconUpload.png")}
            alt=""
            style={{ maxWidth: 30 }}
          />
          <div>Upload QRcode</div>
        </div>
        <input
          accept="image/*"
          style={{ display: "none" }}
          type="file"
          onChange={(event) => {
            update(event);
          }}
          ref={refImage}
        />
        {/* <div>
          <img
            src={require("@images/searchQR/Check_circle.png")}
            alt=""
            onClick={onCancel}
            style={{ maxHeight: 60 }}
          />
        </div> */}
        <div className="change-camera">
          <img
            onClick={changeCamera}
            src={require("@images/searchQR/change-camera.png")}
            style={{ cursor: "pointer" }}
            alt=""
            style={{ maxWidth: 30 }}
          />
          <div>Đổi camera</div>
        </div>
      </div>
    </Modal>
  );
}

export default forwardRef(ScanQrCode);
