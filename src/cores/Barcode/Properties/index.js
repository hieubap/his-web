import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  useEffect,
} from "react";
import T from "prop-types";
import { Form, Select, Input, Checkbox } from "antd";
import { Main } from "../styled";
import { formItemLayout } from "components/constanst";
import AlignConfig from "components/Config/AlignConfig";
const BarcodeProps = forwardRef((props, ref) => {
  const [state, _setState] = useState({
    noLabel: false,
    width: 200,
    fromEMR: false,
    height: 90,
    contentAlign: "center",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const { fields } = props;

  useEffect(() => {
    if (props.state.props) {
      setState({
        fieldName: props.state.props.fieldName,
        label: props.state.props.label,
        fromEMR: props.state.props.fromEMR,
        width: props.state.props.width || 200,
        height: props.state.props.height || 90,
        noLabel: props.state.props.noLabel,
        contentAlign: props.state.props.contentAlign || "center",
      });
    }
  }, [props.state]);

  useImperativeHandle(ref, () => ({
    fieldName: state.fieldName,
    label: state.label,
    fromEMR: state.fromEMR,
    height: state.height,
    width: state.width,
    noLabel: state.noLabel,
    contentAlign: state.contentAlign,
  }));

  const selectFieldName = (value) => {
    setState({
      fieldName: value,
    });
  };

  const handleChangeInput = (key) => (e) => {
    setState({
      [key]: e.target.value,
    });
  };

  const handleFromEMR = (e) => {
    setState({
      fromEMR: e.target.checked,
    });
  };
  const handleNoLabel = (e) => {
    setState({
      noLabel: e.target.checked,
    });
  };
  const changeAlign = (value) => {
    setState({
      contentAlign: value,
    });
  };
  return (
    <Main>
      <Form {...formItemLayout}>
        <Form.Item label={"Field name"} className={"props-form-item"}>
          <Select
            showSearch
            size={"small"}
            style={{ width: "100%" }}
            onSelect={selectFieldName}
            value={state.fieldName}
          >
            {fields.map((key) => (
              <Select.Option key={key} value={key}>
                {key}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <AlignConfig
          changeAlign={changeAlign}
          contentAlign={state.contentAlign}
        />

        <Form.Item label={"Label"} className={"props-form-item"}>
          <Input
            style={{ width: "100%" }}
            size={"small"}
            onChange={handleChangeInput("label")}
            value={state.label}
          />
        </Form.Item>
        <Form.Item label={"Width"} className={"props-form-item"}>
          <Input
            style={{ height: "100%" }}
            size={"small"}
            onChange={handleChangeInput("width")}
            value={state.width}
          />
        </Form.Item>
        <Form.Item label={"Height"} className={"props-form-item"}>
          <Input
            style={{ height: "100%" }}
            size={"small"}
            onChange={handleChangeInput("height")}
            value={state.height}
          />
        </Form.Item>
        <Form.Item label={"No Label"} className={"props-form-item"}>
          <Checkbox onChange={handleNoLabel} checked={state.noLabel} />
        </Form.Item>
        <Form.Item label={"Dữ liệu từ EMR"} className={"props-form-item"}>
          <Checkbox onChange={handleFromEMR} checked={state.fromEMR} />
        </Form.Item>
      </Form>
    </Main>
  );
});

BarcodeProps.propTypes = {
  config: T.shape({}),
};

export default BarcodeProps;
