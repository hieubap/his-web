import React, { useImperativeHandle, useState, forwardRef } from "react";
import { Main } from "./styled";
import { Button, Form, Input, Row, Col, Checkbox, Spin } from "antd";
import { connect } from "react-redux";
const ModalEditForm = (props, ref) => {
  const { getFieldDecorator } = props.form;

  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: (item = {}, readOnly, editMode) => {
      setState({
        show: true,
        id: item.id || "",
        readOnly,
        ma: item.bieuMau.ma || "",
        bieuMauId: item.bieuMauId,
        ten: item.bieuMau.ten || "",
        loaiBa: item.loaiBa,
        macDinh: item.macDinh,
        taoNhieuMau: item.taoNhieuMau,
        hsdd: item.hsdd,
        active: item.active === undefined ? true : item.active || false,
        editMode,
      });
      props.form.resetFields();
    },
  }));

  const handleSubmit = () => {};

  const onChange = (type) => (e) => {
    switch (type) {
      case 4:
        setState({ macDinh: e?.target?.checked || false });
        return;
      case 5:
        setState({ taoNhieuMau: e?.target?.checked || false });
        return;
      case 6:
        setState({ hsdd: e?.target?.checked || false });
        return;
      case 7:
        setState({ active: e?.target?.checked || false });
        return;
      default:
    }
  };
  const onOK = (ok) => () => {
    if (ok) {
      props.form.validateFields((errors, values) => {
        if (!errors) {
          props
            .updateForm({ form: state, draftMode: state.editMode })
            .then((s) => {
              setState({ show: false });
            });
          // setState({ show: false });
        }
      });
    } else setState({ show: false });
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
      <Spin spinning={props.isLoadingCreateRecordType}>
        <div className="modal-des">
          <h4 className="title-des">
            {state.readOnly ? "XEM CHI TIẾT" : "CHỈNH SỬA"} BIỂU MẪU
          </h4>
          <div className="content-des">
            <Form onSubmit={handleSubmit}>
              <Form.Item label={"Mã biểu mẫu"} className={"props-form-item"}>
                {getFieldDecorator("ma", {
                  // rules: [{ required: true, message: "Vui lòng nhập mã biểu mẫu!" }],
                  initialValue: state.ma,
                })(
                  <Input
                    disabled={state.readOnly || !!state.id}
                    onChange={onChange(1)}
                    placeholder={"Nhập mã biểu mẫu"}
                  />
                )}
              </Form.Item>
              <Form.Item label={"Tên biểu mẫu"}>
                {getFieldDecorator("ten", {
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: "Vui lòng nhập tên biểu mẫu!",
                  //   },
                  // ],
                  initialValue: state.ten,
                })(
                  <Input
                    disabled={state.readOnly || !!state.id}
                    onChange={onChange(2)}
                    placeholder={"Nhập tên loại hồ sơ"}
                  />
                )}
              </Form.Item>
              <Form.Item label={"Loại HSBA"}>
                {getFieldDecorator("loaiHSBA", {
                  // rules: [
                  //   {
                  //     required: true,
                  //     message: "Vui lòng nhập loại hsba!",
                  //   },
                  // ],
                  initialValue: state.loaiBa,
                })(
                  <Input
                    disabled={state.readOnly || !!state.id}
                    onChange={onChange(3)}
                    placeholder={"Nhập loại bệnh án"}
                  />
                )}
              </Form.Item>
              <Row gutter={[12, 12]}>
                <Col span={7}>
                  <Checkbox
                    disabled={state.readOnly}
                    checked={state.macDinh || false}
                    onChange={onChange(4)}
                  >
                    Mặc định
                  </Checkbox>
                </Col>
                <Col span={9}>
                  <Checkbox
                    disabled={state.readOnly}
                    checked={state.taoNhieuMau || false}
                    onChange={onChange(5)}
                  >
                    Tạo nhiều mẫu
                  </Checkbox>
                </Col>
                {/* <Col span={12}>
                  <Checkbox
                    disabled={state.readOnly}
                    checked={state.hsdd || false}
                    onChange={onChange(6)}
                  >
                    HSĐD
                  </Checkbox>
                </Col> */}
                <Col span={8}>
                  <Checkbox
                    disabled={state.readOnly}
                    checked={state.active || false}
                    onChange={onChange(7)}
                  >
                    Có hiệu lực
                  </Checkbox>
                </Col>
              </Row>
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
      isLoadingCreateRecordType:
        state.medicalRecord.isLoadingCreateRecordType || false,
    }),
    ({ medicalRecord: { updateForm } }) => ({
      updateForm,
    }),
    null,
    { forwardRef: true }
  )(forwardRef(ModalEditForm))
);
