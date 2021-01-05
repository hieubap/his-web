import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import T from "prop-types";
import { Button, Icon, Form, Checkbox, InputNumber, Select, Input } from "antd";
import { Main } from "./styled";
import { formItemLayout, tailFormItemLayout } from "components/constanst";

const ComponentProps = forwardRef((props, ref) => {
  const [state, _setState] = useState({
    fieldName: "",
    noLabel: false,
    disabled: false,
    size: "",
    border: false,
    line: "",
    contentAlign: "left",
    readOnly: false,
    blockSignLevel: 0,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const { fields } = props;

  useImperativeHandle(ref, () => ({
    size: state.size,
    fieldName: state.fieldName,
    noLabel: state.noLabel,
    disabled: state.disabled,
    border: state.border,
    line: state.line,
    labelWidth: state.labelWidth,
    contentAlign: state.contentAlign,
    readOnly: state.readOnly,
    blockSignLevel: state.blockSignLevel,
  }));

  useEffect(() => {
    if (props.state.key) {
      setState({
        fieldName: props.state.props.fieldName,
        size: props.state.props.size,
        noLabel: props.state.props.noLabel,
        disabled: props.state.props.disabled,
        border: props.state.props.border,
        line: props.state.props.line,
        labelWidth: props.state.props.labelWidth,
        contentAlign: props.state.props.contentAlign || "left",
        readOnly: props.state.props.readOnly || false,
        blockSignLevel: props.state.props.blockSignLevel || 0,
      });
    }
  }, [props.state]);

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

  const changeAlign = (value) => (e) => {
    changeValue("contentAlign")(value);
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
          label={"No label"}
          className={"props-form-item"}
        >
          <Checkbox
            checked={state.noLabel}
            onChange={changeCheckbox("noLabel")}
          />
        </Form.Item>
        <Form.Item
          {...tailFormItemLayout}
          label={"Label Width"}
          className={"props-form-item"}
        >
          <Input
            className="option-content"
            style={{ flex: 1 }}
            value={state.labelWidth}
            onChange={changeInput("labelWidth")}
            size={"small"}
          />
        </Form.Item>
        <Form.Item
          {...tailFormItemLayout}
          label={"Content Align"}
          className={"props-form-item"}
        >
          <Button.Group size={"small"} style={{ width: 100 }}>
            <Button
              type={state.contentAlign === "left" ? "primary" : ""}
              icon={"align-left"}
              onClick={changeAlign("left")}
              value={"left"}
            />
            <Button
              type={state.contentAlign === "center" ? "primary" : ""}
              icon={"align-center"}
              onClick={changeAlign("center")}
              value={"center"}
            />
            <Button
              type={state.contentAlign === "right" ? "primary" : ""}
              icon={"align-right"}
              onClick={changeAlign("right")}
              value={"right"}
            />
          </Button.Group>
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
        <Form.Item
          {...tailFormItemLayout}
          label={"Hiển thị viền"}
          className={"props-form-item"}
        >
          <Checkbox
            onChange={changeCheckbox("border")}
            checked={state.border}
          />
        </Form.Item>
        <Form.Item
          {...tailFormItemLayout}
          label={"Số dòng"}
          className={"props-form-item"}
        >
          <InputNumber
            value={state.line}
            onChange={changeValue("line")}
            size={"small"}
          />
        </Form.Item>

        <Form.Item
          {...tailFormItemLayout}
          label={"Số ký tự"}
          className={"props-form-item"}
        >
          <InputNumber
            size={"small"}
            value={state.size}
            onChange={changeValue("size")}
          />
        </Form.Item>
      </Form>
    </Main>
  );
});

ComponentProps.defaultProps = {
  component: {},
  fields: [],
};

ComponentProps.propTypes = {
  component: T.shape({}),
  fields: T.arrayOf(T.string),
};

export default ComponentProps;
