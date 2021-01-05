import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Form, Select, Checkbox, InputNumber } from "antd";
import { Main } from "../styled";
import { sizeInput } from "mokup";
import { formItemLayout, tailFormItemLayout } from "components/constanst";

const InputNumberProps = forwardRef((props, ref) => {
  const { fields } = props;
  const [state, _setState] = useState({
    fieldName: "",
    size: "",
    disabled: false,
    quantity: "",
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
        size: props.state.props.size,
        disabled: props.state.props.disabled,
        quantity: props.state.props.quantity,
        readOnly: props.state.props.readOnly,
        blockSignLevel: props.state.props.blockSignLevel || 0,
      });
    }
  }, [props.state]);
  useImperativeHandle(ref, () => ({
    fieldName: state.fieldName,
    size: state.size,
    disabled: state.disabled,
    quantity: state.quantity,
    readOnly: state.readOnly,
    blockSignLevel: state.blockSignLevel,
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
            style={{ width: "100%" }}
            size={"small"}
            showSearch
            onSelect={changeValue("fieldName")}
            value={state.fieldName}
          >
            {fields.map((item) => (
              <Select.Option key={item} value={item}>
                <span title={item}>{item}</span>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label={"size"} className={"props-form-item"}>
          <Select
            showSearch
            size={"small"}
            style={{ width: "100%" }}
            value={state.size}
            onSelect={changeValue("size")}
          >
            {sizeInput.map((item, index) => (
              <Select.Option key={index} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          {...tailFormItemLayout}
          label={"Quantity"}
          className={"props-form-item"}
        >
          <InputNumber
            type="number"
            size={"small"}
            min={1}
            value={state.quantity}
            onChange={changeValue("quantity")}
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
      </Form>
    </Main>
  );
});

export default InputNumberProps;
