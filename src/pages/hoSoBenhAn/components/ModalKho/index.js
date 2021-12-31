import { Button, Row, Col } from "antd";
import { Select } from "components";
import React, { forwardRef, useState, useImperativeHandle, useRef } from "react";
import { ModalStyled, ModalStyled2 } from "./styled";
import IcClose from "assets/images/kho/icClose2.png";

const ModalChonKho = forwardRef((props, ref) => {
  const refOk = useRef(null);
  const [state, _setState] = useState({
    show: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: (data, onOk) => {
      const { listKhoUser } = data;
      setState({ show: true, listKhoUser });
      refOk.current = onOk;
    },
  }));
  const onCancel = () => {
    setState({ show: false });
  };

  const onOk = () => {

    if (state.khoId) {
      if (refOk.current) refOk.current(state.khoId);
      setState({ show: false })
    }
  }

  return (
    <ModalStyled
      width={378}
      footer={null}
      visible={state.show}
      onCancel={onCancel}
      closable={false}
    >
      <Row className="container">
        <Row className="header">
          <h1>Chọn kho nhập</h1>
          <img src={IcClose} alt="..." onClick={onCancel}></img>
        </Row>
        <Row className="content">
          <Row className="info-content">
            <label>Kho nhập</label>
            <Select
              style={{ width: "100%" }}
              data={state.listKhoUser}
              onSelect={(e) => {
                const value = e.target ? e.target?.value : e;
                setState({ khoId: value });
              }}
            />
            {!state.khoId && <div className="error">Chọn kho nhập</div>}
          </Row>
          <Row className="footer">
            <Button className="btn-accept" onClick={() => onOk()}>Xác nhận</Button>
          </Row>
        </Row>
      </Row>
    </ModalStyled>
  );
});

const ModalChonPhieuNhap = forwardRef((props, ref) => {
  const refExternal = useRef(null);
  const refReserve = useRef(null);
  const [state, _setState] = useState({
    show: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: (data = {}, onExternal, onReserve) => {
      setState({ show: true });
      refExternal.current = onExternal;
      refReserve.current = onReserve;
    },
  }));
  const onCancel = () => {
    setState({ show: false });
  };

  const onCreateExternal = () => {
    setState({ show: false })
    if (refExternal.current) refExternal.current();
  }

  const onCreateReserve = () => {
    setState({ show: false })
    if (refReserve.current) refReserve.current();
  }

  return (
    <ModalStyled2
      width={665}
      footer={null}
      visible={state.show}
      onCancel={onCancel}
      closable={false}
    >
      <Row className="container">
        <Row className="header">
          <h1>Chọn loại phiếu nhập</h1>
          <img src={IcClose} alt="..." onClick={onCancel}></img>
        </Row>
        <Row className="content">
          <Col xs={12}>
            <Button className="btn-accept" onClick={() => onCreateReserve()}>Phiếu nhập dự trù</Button>
          </Col>
          <Col xs={12}>
            <Button className="btn-accept" onClick={() => onCreateExternal()}>Phiếu nhập từ nhà cung cấp</Button>
          </Col>
        </Row>
      </Row>
    </ModalStyled2>
  );
});

export { ModalChonKho, ModalChonPhieuNhap };
