import React, {
  useEffect,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import T from "prop-types";
import { Form, Select, Checkbox, InputNumber } from "antd";
import { formItemLayout, tailFormItemLayout } from "components/constanst";
import { format } from "../constants";
import AlignConfig from "components/Config/AlignConfig";

const DateTimeProps = forwardRef((props, ref) => {
  const { fields } = props;
  const [state, _setState] = useState({
    dateTimeFormat: "",
    fieldName: "",
    disabled: false,
    onlyDate: false,
    contentAlign: "right",
    readOnly: false,
    blockSignLevel: 0,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    if (props.state.props) {
      setState({
        dateTimeFormat: props.state.props.dateTimeFormat,
        fieldName: props.state.props.fieldName,
        disabled: props.state.props.disabled,
        onlyDate: props.state.props.onlyDate,
        contentAlign: props.state.props.contentAlign || "right",
        readOnly: props.state.props.readOnly || false,
        blockSignLevel: props.state.props.blockSignLevel || 0,
      });
    }
  }, [props.state]);

  useImperativeHandle(ref, () => ({
    fieldName: state.fieldName,
    dateTimeFormat: state.dateTimeFormat,
    disabled: state.disabled,
    onlyDate: state.onlyDate,
    contentAlign: state.contentAlign,
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
    <Form {...formItemLayout}>
      <Form.Item label={"Field name"} className={"props-form-item"}>
        <Select
          showSearch
          size={"small"}
          style={{ width: "100%" }}
          value={state.fieldName}
          onSelect={changeValue("fieldName")}
        >
          {fields.map((item) => (
            <Select.Option key={item} value={item}>
              <div title={item}>{item}</div>
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label={"Format"} className={"props-form-item"}>
        <Select
          showSearch
          size={"small"}
          style={{ width: "100%" }}
          value={state.dateTimeFormat}
          onSelect={changeValue("dateTimeFormat")}
        >
          {Object.keys(format).map((key) => (
            <Select.Option key={key} value={key}>
              {format[key].label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <AlignConfig
        changeAlign={changeValue("contentAlign")}
        contentAlign={state.contentAlign}
      />
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

      <Form.Item label={"Chỉ nhập ngày"} className={"props-form-item"}>
        <Checkbox
          checked={state.onlyDate}
          onChange={changeCheckbox("onlyDate")}
        />
      </Form.Item>
    </Form>
  );
});

DateTimeProps.propTypes = {
  state: T.shape({}),
};

export default DateTimeProps;
