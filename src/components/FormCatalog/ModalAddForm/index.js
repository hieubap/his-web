import React, { useImperativeHandle, useState, forwardRef } from "react";
import { Main } from "./styled";
import { Button, Form, Input, Row, Col, Checkbox, Spin, Select } from "antd";
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
        active: item.active || item.active === undefined,
        hsdd: item.hsdd || false,
        editor: item.editor || false,
        ma: item.ma || "",
        ten: item.ten || "",
        formId: item.formId,
      });
      props.form.resetFields();
      props.getAllForm();
    },
  }));

  const handleSubmit = () => {};

  const onChange = (type) => (e) => {
    let checked = e?.target?.checked || false;
    switch (type) {
      case 1:
        setState({
          editor: checked,
        });
        return;
      case 2:
        setState({
          hsdd: checked,
        });
        return;
      case 3:
        setState({ active: checked });
        return;
      case 4:
        setState({ ma: e?.target?.value || "" });
        return;
      case 5:
        setState({ ten: e?.target?.value || "" });
        return;
      case 6:
        setState({ formId: e });
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
              .onCreate({
                ten: state.ten,
                ma: state.ma,
                editor: state.editor,
                hsdd: state.hsdd,
                active: state.active,
                formId: state.formId,
              })
              .then((s) => {
                setState({ show: false });
              });
          else
            props
              .onUpdate({
                id: state.id,
                ten: state.ten,
                ma: state.ma,
                editor: state.editor,
                hsdd: state.hsdd,
                active: state.active,
                formId: state.formId,
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
      <Spin spinning={props.isLoadingCreate}>
        <div className="modal-des">
          <h4 className="title-des">
            {state.id
              ? state.readOnly
                ? "XEM THÔNG TIN"
                : "CHỈNH SỬA"
              : "THÊM MỚI"}{" "}
            BIỂU MẪU
          </h4>
          <div className="content-des">
            <Form onSubmit={handleSubmit}>
              <Row gutter={[16, 16]}>
                {!state.id && (
                  <Col span={8}>
                    <Checkbox
                      disabled={!!state.readOnly}
                      checked={state.editor || false}
                      onChange={onChange(1)}
                    >
                      Editor
                    </Checkbox>
                  </Col>
                )}
                <Col span={8}>
                  <Checkbox
                    disabled={!!state.readOnly}
                    checked={state.hsdd || false}
                    onChange={onChange(2)}
                  >
                    HSĐD
                  </Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox
                    disabled={!!state.readOnly}
                    checked={state.active || false}
                    onChange={onChange(3)}
                  >
                    Có hiệu lực
                  </Checkbox>
                </Col>
              </Row>

              {state.id || !state.editor ? (
                <>
                  <Form.Item
                    label={"Mã biểu mẫu"}
                    className={"props-form-item"}
                  >
                    {getFieldDecorator("ma", {
                      // rules: [{ required: true, message: "Vui lòng nhập mã biểu mẫu!" }],
                      initialValue: state.ma,
                    })(
                      <Input
                        disabled={
                          !!state.readOnly || (!!state.id && state.editor)
                        }
                        onChange={onChange(4)}
                        placeholder={"Nhập mã biểu mẫu"}
                      />
                    )}
                  </Form.Item>
                  <Form.Item label={"Tên biểu mẫu"}>
                    {getFieldDecorator("ten", {
                      rules: [
                        {
                          required: true,
                          message: "Vui lòng nhập tên biểu mẫu!",
                        },
                      ],
                      initialValue: state.ten,
                    })(
                      <Input
                        disabled={
                          !!state.readOnly || (!!state.id && state.editor)
                        }
                        onChange={onChange(5)}
                        placeholder={"Nhập tên biểu mẫu"}
                      />
                    )}
                  </Form.Item>
                </>
              ) : (
                <Form.Item label={"Tên biểu mẫu"} className={"props-form-item"}>
                  {getFieldDecorator("formId", {
                    rules: [
                      {
                        required: true,
                        message: "Vui lòng chọn biểu mẫu Editor!",
                      },
                    ],
                    initialValue: state.formId,
                  })(
                    <Select
                      showSearch
                      onChange={onChange(6)}
                      // onSelect={onChange(6)}
                      placeholder={"Chọn biểu mẫu Editor"}
                      size={"default"}
                      className="search-item"
                      filterOption={filterOption}
                      notFoundContent={
                        <span id={"room-no-data-mess"}>
                          Không tìm thấy kết quả
                        </span>
                      }
                    >
                      <Select.Option value="">
                        - Chọn biểu mẫu Editor -
                      </Select.Option>
                      {props.forms.map((item, index) => (
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
              )}
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
      isLoadingCreate: state.form.isLoadingCreate || false,
      forms: state.form.forms || [],
    }),
    ({ form: { onCreate, onUpdate, getAllForm } }) => ({
      onCreate,
      onUpdate,
      getAllForm,
    }),
    null,
    { forwardRef: true }
  )(forwardRef(ModalAddForm))
);
