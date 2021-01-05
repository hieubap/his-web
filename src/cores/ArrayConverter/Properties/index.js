import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import T from "prop-types";
import { Form, Checkbox, InputNumber, Select, Input } from "antd";
import { Main } from "./styled";
import { formItemLayout, tailFormItemLayout } from "components/constanst";

const ComponentProps = forwardRef((props, ref) => {
  const { fields } = props;
  const [state, _setState] = useState({
    fieldName: "",
    noLabel: false,
    disabled: false,
    size: "",
    border: false,
    line: "",
    rule: "",
    readOnly: false,
    blockSignLevel: 0,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    fieldName: state.fieldName,
    noLabel: state.noLabel,
    disabled: state.disabled,
    size: state.size,
    border: state.border,
    line: state.line,
    rule: state.rule,
    readOnly: state.readOnly,
    blockSignLevel: state.blockSignLevel,
  }));

  useEffect(() => {
    if (props.state.key) {
      setState({
        fieldName: props.state.props.fieldName,
        noLabel: props.state.props.noLabel,
        disabled: props.state.props.disabled,
        size: props.state.props.size,
        border: props.state.props.border,
        line: props.state.props.line,
        rule: props.state.props.rule,
        readOnly: props.state.props.readOnly,
        blockSignLevel: props.state.props.blockSignLevel,
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
          label={"Số dòng"}
          className={"props-form-item"}
        >
          <InputNumber
            size={"small"}
            value={state.line}
            onChange={changeValue("line")}
          />
        </Form.Item>

        <Form.Item
          {...tailFormItemLayout}
          label={"Size"}
          className={"props-form-item"}
        >
          <InputNumber
            size={"small"}
            value={state.size}
            onChange={changeValue("size")}
          />
        </Form.Item>

        <Form.Item
          {...tailFormItemLayout}
          label={"Rule"}
          className={"props-form-item"}
        >
          <Input
            size={"small"}
            style={{ width: 100 }}
            placeholder="Nhập ký tự phân cách"
            value={state.rule}
            onChange={changeInput("rule")}
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
