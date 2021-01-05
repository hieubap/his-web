import React, {
  useImperativeHandle,
  useState,
  forwardRef,
  useRef,
} from "react";
import { Main } from "./styled";
import { Form, Button, Spin, Input, Col, Select } from "antd";
import { connect } from "react-redux";

const { Option } = Select;
const ModalFillFormName = (props, ref) => {
  const { getFieldDecorator } = props.form;
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
        tenPhieu: data.tenPhieu,
      });
      refCallBack.current = callback;
      props.form.resetFields();
    },
  }));
  const onOK = (ok) => () => {
    if (ok) {
      props.form.validateFields((errors, values) => {
        if (!errors) {
          if (refCallBack.current) {
            try {
              refCallBack.current(state.tenPhieu).then((s) => {
                setState({ show: false });
              });
            } catch (error) {
              setState({ show: false });
            }
          }
        }
      });
    } else setState({ show: false });
  };
  const handleSubmit = (e) => {
    e.prentDefault();
  };
  const onChange = (key) => (e) => {
    setState({
      [key]: e.target.value,
    });
  };
  return (
    <Main
      visible={state.show}
      style={{ maxWidth: 420 }}
      closable={false}
      centered
      onCancel={onOK(false)}
      footer={[null]}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Spin spinning={props.isSaveFormLoading}>
        <div className="modal-des">
          <h4 className="title-des">NHẬP TÊN BIỂU MẪU</h4>
          <div className="content-des">
            <Form onSubmit={handleSubmit}>
              <Form.Item label={"Tên biểu mẫu"}>
                {getFieldDecorator("tenPhieu", {
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng nhập tên biểu mẫu!",
                    },
                  ],
                  initialValue: state.tenPhieu,
                })(
                  <Input
                    style={{ width: "100%" }}
                    // disabled={state.readOnly || !!state.id}
                    onChange={onChange("tenPhieu")}
                    placeholder={"Nhập tên biểu mẫu"}
                  />
                )}
              </Form.Item>
            </Form>
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
                onClick={onOK(false)}
              >
                Huỷ
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

export default Form.create({})(
  connect(
    (state) => ({
      criterials: state.files.criterials || [],
      patient: state.patient.patient || {},
      isSaveFormLoading: state.files.isSaveFormLoading || false,
    }),
    ({ files: { getAllCriterials } }) => ({
      getAllCriterials,
    }),
    null,
    { forwardRef: true }
  )(forwardRef(ModalFillFormName))
);
