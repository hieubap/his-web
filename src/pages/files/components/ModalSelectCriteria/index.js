import React, {
  useImperativeHandle,
  useState,
  forwardRef,
  useRef,
} from "react";
import { Main } from "./styled";
import { Button, Spin, Row, Col, Select } from "antd";
import { connect } from "react-redux";

const { Option } = Select;
const ModalSelectCriteria = (props, ref) => {
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refCallBack = useRef(null);
  useImperativeHandle(ref, () => ({
    show: (data = {}, callback) => {
      setState({
        show: true,
        tenTieuChi: data.tenTieuChi,
        apiTieuChi: data.apiTieuChi,
        value: "",
      });
      props.getAllCriterials({
        api: data.apiTieuChi,
        patientDocument: props.patient.maHoSo,
      });
      refCallBack.current = callback;
    },
  }));
  const onOK = (ok) => () => {
    if (ok) {
      setState({ show: false });
      if (refCallBack.current) refCallBack.current(state.value);
    } else setState({ show: false });
  };
  const onSelect = (value) => {
    setState({ value });
  };
  return (
    <Main
      visible={state.show}
      closable={false}
      centered
      onCancel={onOK(false)}
      footer={[null]}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Spin spinning={props.isLoadingCriterial}>
        <div className="modal-des">
          <h4 className="title-des">
            <p>CHỌN TIÊU CHÍ</p>
          </h4>
          <div className="content-des">
            <Row>
              <Col span={7}>{state.tenTieuChi}</Col>
              <Col span={17}>
                <Select
                  placeholder="Chọn tiêu chí"
                  style={{ width: "100%" }}
                  value={state.value}
                  onSelect={onSelect}
                >
                  <Option value={""}>Chọn tiêu chí</Option>
                  {props.criterials.map((item, index) => {
                    if (item)
                      return (
                        <Option title={item.name} value={item.id} key={index}>
                          {item.name}
                        </Option>
                      );
                  })}
                </Select>
              </Col>
            </Row>
          </div>
        </div>
        <div className="action-footer">
          <Button
            type="danger"
            style={{
              minWidth: 100,
            }}
            onClick={onOK(false)}
          >
            Thoát
          </Button>
          <Button
            type="primary"
            style={{
              minWidth: 100,
            }}
            onClick={onOK(true)}
          >
            Tiếp Tục
          </Button>
        </div>
      </Spin>
    </Main>
  );
};

export default connect(
  (state) => ({
    criterials: state.files.criterials || [],
    patient: state.patient.patient || {},
    isLoadingCriterial: state.files.isLoadingCriterial || false,
  }),
  ({ files: { getAllCriterials } }) => ({
    getAllCriterials,
  }),
  null,
  { forwardRef: true }
)(forwardRef(ModalSelectCriteria));
