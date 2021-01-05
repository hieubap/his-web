import React, { useImperativeHandle, useState, forwardRef } from "react";
import { Main } from "./styled";
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Spin,
  Radio,
  Select,
} from "antd";
import { connect } from "react-redux";
const ModalAddForm = (props, ref) => {
  const { getFieldDecorator } = props.form;

  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: (item = {}, readOnly) => {
      setState({
        show: true,
        id: item.id || "",
        readOnly,
        ma: item.ma || "",
        ten: item.ten || "",
        loaiBa: item.loaiBa,
        mauBaId: item.mauBaId,
        active: item.active === undefined ? true : item.active || false,
      });
      props.form.resetFields();
      props.getAllMedicalRecordType();
    },
  }));

  const handleSubmit = () => {};

  const onChange = (type) => (e) => {
    switch (type) {
      case 1:
        setState({
          ma: e?.target?.value,
        });
        return;
      case 2:
        setState({
          ten: e?.target?.value,
        });
        return;
      case 3:
        if (e?.target?.value === 10) {
          setState({
            loaiBa: e?.target?.value,
            mauBaId: null,
          });
        } else
          setState({
            loaiBa: e?.target?.value,
          });
        return;
      case 4:
        setState({
          mauBaId: e,
        });
        return;
      case 5:
        setState({ active: e?.target?.checked || false });
        return;
      default:
    }
  };
  const onOK = (ok) => () => {
    if (ok) {
      props.form.validateFields((errors, values) => {
        if (!errors) {
          if (!state.id)
            props
              .onCreateRecordType({
                ten: state.ten,
                ma: state.ma,
                loaiBa: state.loaiBa,
                mauBaId: state.mauBaId,
                active: state.active,
              })
              .then((s) => {
                setState({ show: false });
              });
          else
            props
              .onUpdateRecordType({
                id: state.id,
                ten: state.ten,
                ma: state.ma,
                loaiBa: state.loaiBa,
                mauBaId: state.mauBaId,
                active: state.active,
              })
              .then((s) => {
                setState({ show: false });
              });

          // setState({ show: false });
        }
      });
    } else setState({ show: false });
  };
  const filterOption = (input, option) => {
    return (
      (option.props.name || "")
        .toLowerCase()
        .createUniqueText()
        .indexOf(input.toLowerCase().createUniqueText()) >= 0
    );
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
            {state.readOnly ? "XEM" : state.id ? "SỬA" : "THÊM MỚI"} LOẠI HỒ SƠ
            BỆNH ÁN
          </h4>
          <div className="content-des">
            <Form onSubmit={handleSubmit}>
              <Form.Item label={"Mã loại hồ sơ"} className={"props-form-item"}>
                {getFieldDecorator("ma", {
                  // rules: [{ required: true, message: "Vui lòng nhập mã biểu mẫu!" }],
                  initialValue: state.ma,
                })(
                  <Input
                    disabled={state.readOnly}
                    onChange={onChange(1)}
                    placeholder={"Nhập mã loại hồ sơ"}
                  />
                )}
              </Form.Item>
              <Form.Item label={"Tên loại hồ sơ"}>
                {getFieldDecorator("ten", {
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng nhập tên loại hồ sơ!",
                    },
                  ],
                  initialValue: state.ten,
                })(
                  <Input
                    disabled={state.readOnly}
                    onChange={onChange(2)}
                    placeholder={"Nhập tên loại hồ sơ"}
                  />
                )}
              </Form.Item>
              <Form.Item label={"Loại hồ sơ"}>
                {getFieldDecorator("loaiBa", {
                  rules: [
                    {
                      required: true,
                      message: "Vui lòng chọn loại hồ sơ!",
                    },
                  ],
                  initialValue: state.loaiBa,
                })(
                  <Radio.Group
                    disabled={state.readOnly}
                    onChange={onChange(3)}
                    className="groupLoaiBa"
                  >
                    <Row>
                      <Col span={12}>
                        <Radio value={10}>KCB Ngoại trú</Radio>
                      </Col>
                      <Col span={12}>
                        <Radio value={20}>Điều trị Nội trú</Radio>
                      </Col>
                      <Col span={12}>
                        <Radio value={30}>Điều trị Ngoại trú</Radio>
                      </Col>
                    </Row>
                  </Radio.Group>
                )}
              </Form.Item>
              <Form.Item label={"Mẫu bệnh án"}>
                {getFieldDecorator("mauBaId", {
                  rules: [
                    {
                      required: state.loaiBa !== 10,
                      message: "Vui lòng chọn mẫu bệnh án!",
                    },
                  ],
                  initialValue: state.mauBaId,
                })(
                  <Select
                    showSearch
                    disabled={state.readOnly || state.loaiBa === 10}
                    onSelect={onChange(4)}
                    placeholder="Chọn mẫu bệnh án"
                    size={"default"}
                    className="search-item"
                    filterOption={filterOption}
                    notFoundContent={
                      <span id={"no-data-mess"}>Không có dữ liệu</span>
                    }
                  >
                    {props.medicalRecordTypes.map((item, index) => (
                      <Select.Option
                        key={index}
                        value={item.id}
                        id={item.id}
                        name={item.name}
                      >
                        <div
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                          title={item.name}
                        >
                          {item.name}
                        </div>
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              {/* <Checkbox
                disabled={state.readOnly}
                checked={state.active || false}
                onChange={onChange(5)}
              >
                Có hiệu lực
              </Checkbox> */}
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
      medicalRecordTypes: state.medicalRecord.medicalRecordTypes || [],
    }),
    ({
      medicalRecord: {
        getAllMedicalRecordType,
        onCreateRecordType,
        onUpdateRecordType,
      },
    }) => ({
      onCreateRecordType,
      onUpdateRecordType,
      getAllMedicalRecordType,
    }),
    null,
    { forwardRef: true }
  )(forwardRef(ModalAddForm))
);
