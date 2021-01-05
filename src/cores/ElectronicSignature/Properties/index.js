import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import T from "prop-types";
import { Form, Checkbox, InputNumber, Select, message, Input } from "antd";
import { Main } from "./styled";
import { formItemLayout, tailFormItemLayout } from "components/constanst";

const ComponentProps = forwardRef((props, ref) => {
  const { fields = [] } = props;
  const [state, _setState] = useState({
    newFields: [],
    fieldName: "",
    levelSign: "",
    width: 200,
    height: 200,
    isPatient: false,
    allowReset: true,
    currentLevelRef: "soCapKy",
    disableIfSigned: true,
    disabled: false,
    signer: "",
    autoSave: true,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    if (fields) {
      let newFields = [];
      fields.forEach((item) => {
        if (fields.find((item2) => item + "_ngayKy" == item2)) {
          newFields.push(item);
        }
      });
      setState({
        newFields: newFields,
      });
    }
  }, [fields]);

  useImperativeHandle(ref, () => ({
    fieldName: state.fieldName,
    levelSign: state.levelSign,
    currentLevelRef: state.currentLevelRef,
    width: state.width,
    height: state.height,
    isPatient: state.isPatient,
    allowReset: state.allowReset,
    disableIfSigned: state.disableIfSigned,
    disabled: state.disabled,
    signer: state.signer,
    autoSave: state.autoSave,
  }));

  useEffect(() => {
    if (props.state.key) {
      setState({
        fieldName: props.state.props.fieldName,
        levelSign: props.state.props.levelSign,
        width: props.state.props.width,
        height: props.state.props.height,
        isPatient: props.state.props.isPatient,
        allowReset: props.state.props.allowReset,
        disableIfSigned: props.state.props.disableIfSigned,
        disabled: props.state.props.disabled,
        currentLevelRef: props.state.props.currentLevelRef || "soCapKy",
        signer: props.state.props.signer,
        autoSave:
          props.state.props.autoSave == undefined
            ? true
            : props.state.props.autoSave,
      });
    }
  }, [props.state]);

  const changeValue = (target) => (e) => {
    if (target == "fieldName") {
      let ngayKy = e + "_ngayKy";

      if (!fields.find((item) => item == ngayKy)) {
        message.error("Vui lòng chọn đúng trường ký");
        return;
      }
    }
    setState({
      [target]: e,
    });
  };

  const changeInput = (target) => (e) => {
    setState({
      [target]: e.target.value,
    });
  };
  const changeCheckbox = (target) => (e) => {
    setState({
      [target]: e.target.checked,
    });
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
            {state.newFields.map((item) => {
              return (
                <Select.Option key={item} value={item}>
                  <span title={item}>{item}</span>
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label={"Trạng thái cấp ký"} className={"props-form-item"}>
          <Select
            style={{ width: "100%" }}
            size={"small"}
            showSearch
            onSelect={changeValue("currentLevelRef")}
            value={state.currentLevelRef}
          >
            {fields.map((item) => (
              <Select.Option key={item} value={item}>
                <span title={item}>{item}</span>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label={"Cấp ký"} className={"props-form-item"}>
          <InputNumber
            size={"small"}
            value={state.levelSign}
            onChange={changeValue("levelSign")}
          />
        </Form.Item>
        <Form.Item label={"Người ký"} className={"props-form-item"}>
          <Input
            style={{ width: "100%" }}
            size={"small"}
            value={state.signer}
            onChange={changeInput("signer")}
          />
        </Form.Item>
        <Form.Item
          label={"Người bệnh/ Người nhà Người bệnh"}
          {...tailFormItemLayout}
          className={"props-form-item is-patient"}
        >
          <Checkbox
            checked={state.isPatient}
            onChange={changeCheckbox("isPatient")}
          />
        </Form.Item>

        <Form.Item
          label={"Khóa biểu mẫu sau khi ký"}
          {...tailFormItemLayout}
          className={"props-form-item is-patient"}
        >
          <Checkbox
            checked={state.disableIfSigned}
            onChange={changeCheckbox("disableIfSigned")}
          />
        </Form.Item>
        <Form.Item
          label={"Cho phép huỷ khi đã ký"}
          {...tailFormItemLayout}
          className={"props-form-item is-patient"}
        >
          <Checkbox
            checked={state.allowReset}
            onChange={changeCheckbox("allowReset")}
          />
        </Form.Item>
        <Form.Item
          label={"Tự động lưu sau khi ký"}
          {...tailFormItemLayout}
          className={"props-form-item is-patient"}
        >
          <Checkbox
            checked={state.autoSave}
            onChange={changeCheckbox("autoSave")}
          />
        </Form.Item>
        <Form.Item
          {...tailFormItemLayout}
          label={"Disabled"}
          className={"props-form-item"}
        >
          <Checkbox
            checked={state.disabled}
            onChange={changeCheckbox("disabled")}
          />
        </Form.Item>

        <Form.Item
          {...tailFormItemLayout}
          label={"Width"}
          className={"props-form-item"}
        >
          <InputNumber
            size={"small"}
            value={state.width}
            onChange={changeValue("width")}
          />
        </Form.Item>
        <Form.Item
          {...tailFormItemLayout}
          label={"Height"}
          className={"props-form-item"}
        >
          <InputNumber
            size={"small"}
            value={state.height}
            onChange={changeValue("height")}
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
