import React, {
  useState,
  forwardRef,
  useEffect,
  useImperativeHandle,
} from "react";
import { Main } from "./styled";
import { Row, Col } from "antd";
import { useDispatch } from "react-redux";
import CloseIcon from "assets/svg/tiep-don/closeIcon.svg";
import DanhSachPhieu from "./DanhSachPhieu";
import XemTruoc from "./XemTruoc";

const ModalKyVaIn = (props, ref) => {
  const { getPhieuIn } = useDispatch().tiepDonDichVu;
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: ({ id }) => {
      setState({
        show: true,
        id,
      });
      getPhieuIn({
        nbDotDieuTriId: id,
      });
    },
  }));

  const onOK = (isOk, type) => (e) => {
    if (!isOk) {
      setState({ show: false });
    }
  };
  return (
    <Main
      style={{ top: 50 }}
      width={"98%"}
      visible={state.show}
      closable={false}
    >
      <Row className="container">
        <Col style={{ width: "100%" }}>
          <Row className="header">
            <h3 className="title">Ký và in</h3>
            <div className="closeIcon">
              <CloseIcon onClick={onOK(false, null)} />
            </div>
          </Row>
          <Row className="modal-content" gutter={[8, 8]}>
            <Col md={16} xl={16} xxl={16}>
              <XemTruoc />
            </Col>
            <Col md={8} xl={8} xxl={8}>
              <DanhSachPhieu />
            </Col>
          </Row>
        </Col>
      </Row>
    </Main>
  );
};

export default forwardRef(ModalKyVaIn);
