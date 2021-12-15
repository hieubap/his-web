import React, {
  useRef,
  useImperativeHandle,
  useState,
  forwardRef,
  useEffect,
} from "react";
import { Main } from "./styled";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import CloseIcon from "assets/svg/tiep-don/closeIcon.svg";
import DanhSachPhieu from "../DanhSachPhieu";
import XemTruoc from "../XemTruoc";

const KyIn = ({
  getDanhSachPhieu,
  ...props
}, ref) => {
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const onChange = (type) => (e) => {

  }
  useImperativeHandle(ref, () => ({
    show: ({ show = true, ...payload }) => {
      setState({
        show,
        ...payload,
      });
    },
  }));

  const onOK = (isOk, type) => (e) => {
    if (!isOk) {
      setState({ show: false });
    }
  };
  const onBack = () => {
    setState({ show: false });
  };

  useEffect(() => {
    if (state.id) {
      getDanhSachPhieu({
        id: state.id,
        chiDinhTuLoaiDichVu: state.chiDinhTuLoaiDichVu,
        covid: state.covid,
      });
    }
  }, [state.id]);

  useEffect(() => {

  }, []);

  return (
    <Main style={{ top: 50 }} width={"98%"} visible={state.show} closable={false}>
      <Row className="container">
        <Col style={{ width: "100%" }}>
          <Row className="header">
            <h3 className="title">Ký và in</h3>
            <div className="closeIcon">
              <CloseIcon
                onClick={onOK(false, null)}
              />
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

export default connect(
  (state) => {
    return {

    };
  },
  ({
    tiepDonDichVu: {
      getDanhSachPhieu,
    }
  }) => ({
    getDanhSachPhieu,
  }),
  null,
  { forwardRef: true }
)(forwardRef(KyIn));
