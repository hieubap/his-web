import React, {
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";
import T from "prop-types";
import { Form, Select, Radio, Icon } from "antd";
import components from "cores";
import { formItemLayout } from "components/constanst";
import { headings } from "mokup";

const TitleProps = forwardRef((props, ref) => {
  const { state,fields } = props;
  const [fontSize, setFontSize] = useState("");
  const [align, setAlign] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [textTransform, setTextTransform] = useState("");
  const [fontWeight, setFontWeight] = useState("");
  useImperativeHandle(ref, () => ({
    fontSize,
    align,
    fieldName,
    fontWeight,
    textTransform,
  }));

  useEffect(() => {
    if (state.key) {
      setFieldName(state.props.fieldName);
      setFontSize(state.props.fontSize);
      setAlign(state.props.align);
      setFontWeight(state.props.fontWeight);
      setTextTransform(state.props.textTransform);
    }
  }, [state]);
  const changeFieldName = (value) => {
    setFieldName(value);
  };
  const changeFontSize = (value) => {
    setFontSize(value);
  };
  const changeAlign = (e) => {
    setAlign(e.target.value);
  };
  const changeFontWeight = (e) => { 
    setFontWeight(e.target.value);
  };
  const changeTextTransform = (e) => {
    setTextTransform(e.target.value);
  };
  return (
    <Form {...formItemLayout}>
      <Form.Item label={"Component"} className={"props-form-item"}>
        <span>{components[state.type] ? components[state.type].name : ""}</span>
      </Form.Item>
      <Form.Item label={"Field name"} className={"props-form-item"}>
        <Select
          showSearch
          size={"small"}
          style={{ width: "100%" }}
          value={fieldName}
          onSelect={changeFieldName}
        >
          {fields.map((item) => (
            <Select.Option key={item} value={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label={"Heading"} className={"props-form-item"}>
        <Select showSearch value={fontSize} onSelect={changeFontSize} size={"small"} style={{ width: "100%" }}>
          {headings.map((item) => (
            <Select.Option
              style={{ fontSize: item.fontSize }}
              key={item.headingTag}
              value={item.fontSize}
            >
              {item.headingTag}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label={"Align item"} className={"props-form-item"}>
        
          <Radio.Group buttonStyle="solid" size={"small"} value={align} onChange={changeAlign}>
            <Radio.Button value="flex-start">
              <Icon type="align-left" />
            </Radio.Button>
            <Radio.Button value="center">
              <Icon type="align-center" />
            </Radio.Button>
            <Radio.Button value="flex-end">
              <Icon type="align-right" />
            </Radio.Button>
          </Radio.Group>
        
      </Form.Item>
      <Form.Item label={"Font weight"} className={"props-form-item"}>
        
          <Radio.Group buttonStyle="solid" size={"small"} value={fontWeight} onChange={changeFontWeight}>
            <Radio.Button value="700">Bold</Radio.Button>
            <Radio.Button value="500">Medium</Radio.Button>
            <Radio.Button value="300">Light</Radio.Button>
          </Radio.Group>
        
      </Form.Item>
      <Form.Item label={"Transform"} className={"props-form-item"}>
        
          <Radio.Group buttonStyle="solid" size={"small"} value={textTransform} onChange={changeTextTransform}>
            <Radio.Button value="uppercase">Upper</Radio.Button>
            <Radio.Button value="lowercase">Lower</Radio.Button>
          </Radio.Group>
        
      </Form.Item>
    </Form>
  );
});

TitleProps.propTypes = {
  state: T.shape({}),
};

export default TitleProps;
