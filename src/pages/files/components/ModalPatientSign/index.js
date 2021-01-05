import React, {
  useImperativeHandle,
  useState,
  forwardRef,
  useRef,
  useEffect,
} from "react";
import { Main } from "./styled";
import { Button, Spin, message } from "antd";
import { connect } from "react-redux";
import SignaturePad from "react-signature-pad-wrapper";
import ButtonClose from "assets/svg/camera-close.svg";

const ModalPatientSign = (props, ref) => {
  const refCanvas = useRef(null);
  const refCallback = useRef(null);
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: (data = {}, callback) => {
      setState({
        show: true,
        isGetImage: data.isGetImage,
        id: data.id,
        // fileName: data.fileName,
        base64Image: null,
        maBieuMau: data.maBieuMau,
        // sequenceNo: data.sequenceNo,
        // patientDocument: data.patientDocument,
        soPhieu: data.soPhieu,
        // fileId,
        formId: data.formId, //sử dụng để update trạng thái ký cho fileEditor
        nbHoSoBaId: data.nbHoSoBaId, //sử dụng để update trạng thái ký cho fileEditor
      });
      refCallback.current = callback;
      if (refCanvas.current) {
        refCanvas.current.clear();
      }
      props.updateData({
        isSigning: false,
      });
    },
  }));
  useEffect(() => {
    if (refCanvas.current) {
      refCanvas.current.height = 300;
    }
  }, [refCanvas.current]);
  const onOK = (ok) => () => {
    if (ok) {
      let image = refCanvas.current.toDataURL() || "";
      if (state.isGetImage) {
        if (refCallback.current) {
          refCallback.current(image);
        }
        setState({ show: false });
      } else {
        if (!refCanvas.current || refCanvas.current.isEmpty()) {
          message.error("Vui lòng vẽ chữ ký của bạn");
        } else {
          image = image.replace("data:image/png;base64,", "");
          props
            .signPatient({
              id: state.id,
              anhKyBase64: image,
              maBieuMau: state.maBieuMau,
              // sequenceNo: state.sequenceNo,
              maHoSo: state.maHoSo,
              soPhieu: state.soPhieu,
              // fileId: state.fileId,
              formId: state.formId, //sử dụng để update trạng thái ký cho fileEditor
              nbHoSoBaId: state.nbHoSoBaId, //sử dụng để update trạng thái ký cho fileEditor
            })
            .then((s) => {
              setState({ show: false });
            });
        }
      }
    } else setState({ show: false });
  };
  const onReset = () => {
    if (refCanvas.current) {
      refCanvas.current.clear();
    }
  };
  return (
    <Main
      visible={state.show}
      style={{ width: 500, height: 400 }}
      closable={false}
      centered
      onCancel={onOK(false)}
      footer={[null]}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Spin spinning={props.isSigning}>
        <div className="modal-des">
          <h4 className="title-des">
            <p>KÝ TÊN</p>
            <ButtonClose
              width={40}
              height={40}
              className="button-close"
              onClick={onOK(false)}
            />
          </h4>
          <div className="content-des">
            <SignaturePad
              redrawOnResize={true}
              ref={refCanvas}
              options={{
                minWidth: 0.1,
                maxWidth: 2,
                penColor: "#000",
              }}
            />
          </div>
        </div>
        <div className="action-footer">
          {state.readOnly ? (
            <Button
              type="danger"
              style={{
                minWidth: 100,
              }}
              onClick={onOK(false)}
            >
              Đóng
            </Button>
          ) : (
            <>
              <Button
                type="danger"
                style={{
                  minWidth: 100,
                }}
                onClick={onReset}
              >
                Ký lại
              </Button>
              <Button
                type="primary"
                style={{
                  minWidth: 100,
                }}
                onClick={onOK(true)}
              >
                Lưu
              </Button>
            </>
          )}
        </div>
      </Spin>
    </Main>
  );
};

export default connect(
  (state) => ({
    isSigning: state.signer.isSigning || false,
  }),
  ({ signer: { signPatient, updateData } }) => ({
    signPatient,
    updateData,
  }),
  null,
  { forwardRef: true }
)(forwardRef(ModalPatientSign));
