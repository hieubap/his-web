import React, {
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";
import {
  Form,
  Select,
  Input,
  Radio,
  Row,
  Col,
  Checkbox,
  InputNumber,
} from "antd";
import { Main } from "./styled";
import { formItemLayout, tailFormItemLayout } from "components/constanst";

const InputProps = forwardRef((props, ref) => {
  const { fields } = props;
  const [state, _setState] = useState({
    fieldName: "",
    disabled: false,
    width: 0,
    height: 0,
    type: "square",
    readOnly: false,
    blockSignLevel: 0,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    if (props.state.key) {
      setState({
        fieldName: props.state.props.fieldName,
        width: props.state.props.width,
        height: props.state.props.height,
        disabled: props.state.props.disabled,
        type: props.state.props.type || "square",
        readOnly: props.state.props.readOnly,
        blockSignLevel: props.state.props.blockSignLevel,
      });
    }
  }, [props.state]);

  useImperativeHandle(ref, () => ({
    fieldName: state.fieldName,
    height: state.height,
    width: state.width,
    type: state.type,
    disabled: state.disabled,
    blockSignLevel: state.blockSignLevel,
    readOnly: state.readOnly,
  }));
  const changeValue = (type) => (value) => {
    setState({
      [type]: value,
    });
  };
  const changeInput = (type) => (e) => {
    setState({
      [type]: e.target.value,
    });
  };
  const changeCheckbox = (type) => (e) => {
    changeValue(type)(e.target.checked);
  };
  const changeDataFormEMR = (e) => {
    changeValue("disabled")(!e.target.checked);
  };
  return (
    <Main>
      <Form {...formItemLayout}>
        <Form.Item label={"Field name"} className={"props-form-item"}>
          <Select
            showSearch
            size={"small"}
            style={{ width: "100%" }}
            onChange={changeValue("fieldName")}
            value={state.fieldName}
          >
            {fields.map((key) => (
              <Select.Option key={key} value={key}>
                <div title={key}>{key}</div>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label={"Width"} className={"props-form-item"}>
          <Input
            addonAfter={"px"}
            style={{ width: "50%" }}
            size={"small"}
            onChange={changeInput("width")}
            value={state.width}
          />
        </Form.Item>

        <Form.Item label={"Height"} className={"props-form-item"}>
          <Input
            addonAfter={"px"}
            style={{ width: "50%" }}
            size={"small"}
            onChange={changeInput("height")}
            value={state.height}
          />
        </Form.Item>
        <Form.Item
          {...tailFormItemLayout}
          label={"Khoá ở cấp ký"}
          className={"props-form-item"}
        >
          <InputNumber
            value={state.blockSignLevel}
            onChange={changeValue("blockSignLevel")}
            size={"small"}
          />
        </Form.Item>
        <Form.Item
          {...tailFormItemLayout}
          label={"Read Only"}
          className={"props-form-item"}
        >
          <Checkbox
            onChange={changeCheckbox("readOnly")}
            checked={state.readOnly}
          />
        </Form.Item>
        <Form.Item
          {...tailFormItemLayout}
          label={"Dữ liệu từ EMR"}
          className={"props-form-item"}
        >
          <Checkbox onChange={changeDataFormEMR} checked={!state.disabled} />
        </Form.Item>

        <Form.Item label={"Shape"} className={"props-form-item"}>
          <Radio.Group
            size={"small"}
            onChange={changeInput("type")}
            value={state.type}
          >
            <Row gutter={12}>
              <Col span={12}>
                <Radio value={"square"}>{"Square"}</Radio>
              </Col>
              <Col span={12}>
                <Radio value={"circle"}>{"Circle"}</Radio>
              </Col>
            </Row>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Main>
  );
});

export default InputProps;
