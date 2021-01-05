import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import T from "prop-types";
import { Form, Checkbox, InputNumber, Select } from "antd";
import { Main } from "./styled";
import components from "cores";
import { formItemLayout, tailFormItemLayout } from "components/constanst";

const ComponentProps = forwardRef((props, ref) => {
  const [state, _setState] = useState({
    fieldName: "",
    disabled: false,
    border: false,
    size: "",
    readOnly: false,
    blockSignLevel: 0,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const { fields } = props;

  useEffect(() => {
    if (props.state.key) {
      setState({
        fieldName: props.state.props.fieldName,
        disabled: props.state.props.disabled,
        border: props.state.props.border,
        size: props.state.props.size,
        readOnly: props.state.props.readOnly,
        blockSignLevel: props.state.props.blockSignLevel,
      });
    }
  }, [props.state]);
  useImperativeHandle(ref, () => ({
    fieldName: state.fieldName,
    disabled: state.disabled,
    border: state.border,
    size: state.size,
    readOnly: state.readOnly,
    blockSignLevel: state.blockSignLevel,
  }));
  const changeValue = (type) => (value) => {
    setState({
      [type]: value,
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

        {props.state.type === "layout" && (
          <Form.Item
            {...tailFormItemLayout}
            label={"Hiển thị viền"}
            className={"props-form-item"}
          >
            <Checkbox
              checked={state.border}
              onChange={changeCheckbox("border")}
            />
          </Form.Item>
        )}

        <Form.Item
          {...tailFormItemLayout}
          label={"Size"}
          className={"props-form-item"}
        >
          <InputNumber
            size={"small"}
            onChange={changeValue("size")}
            value={state.size}
          />
        </Form.Item>
      </Form>
    </Main>
  );
});

ComponentProps.defaultProps = {
  component: {},
};

ComponentProps.propTypes = {
  component: T.shape({}),
};

export default ComponentProps;
