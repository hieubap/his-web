import React, {
  useEffect,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import T from "prop-types";
import moment from "moment";
import { Form, Input, Button, Row, Col } from "antd";
import { formItemLayout } from "components/constanst";
import { Main } from "./styled";

const DateTimeProps = forwardRef((props, ref) => {
  const { state } = props;

  const [fieldName, setFieldName] = useState("");
  const [fieldInSide, setFieldInSide] = useState([]);

  useEffect(() => {
    if (state.props) {
      setFieldName(state.props.fieldName);
      setFieldInSide(state.props.fields || []);
    }
  }, [state]);

  useImperativeHandle(ref, () => ({
    fieldName,
    fields: fieldInSide,
  }));

  const changeFieldName = (e) => {
    const value = e.target.value;
    setFieldName(value);
  };

  const addField = () => {
    const field = {
      name: "",
      key: moment().valueOf(),
      bold: false,
    };
    const fieldList = [...fieldInSide, field];

    setFieldInSide(fieldList);
  };

  const changeField = (index) => (e) => {
    const value = e.target.value;

    setFieldInSide(
      fieldInSide.map((item, idx) =>
        idx === index ? { ...item, name: value } : item
      )
    );
  };

  const changePrefix = (index) => (e) => {
    const value = e.target.value;

    setFieldInSide(
      fieldInSide.map((item, idx) =>
        idx === index ? { ...item, prefix: value } : item
      )
    );
  };

  const changeSuffix = (index) => (e) => {
    const value = e.target.value;

    setFieldInSide(
      fieldInSide.map((item, idx) =>
        idx === index ? { ...item, suffix: value } : item
      )
    );
  };

  const changeFieldPropBold = (index, value) => () => {
    const obj = fieldInSide.find((item, idx) => idx === index);
    let boldCheck = obj.bold;
    let italicCheck = obj.italic;
    let underlineCheck = obj.underline;

    switch (value) {
      case "bold":
        boldCheck = !obj.bold;
        break;
      case "italic":
        italicCheck = !obj.italic;
        break;
      case "underline":
        underlineCheck = !obj.underline;
        break;
      default:
        break;
    }

    setFieldInSide(
      fieldInSide.map((item, idx) =>
        idx === index
          ? {
              ...item,
              bold: boldCheck,
              italic: italicCheck,
              underline: underlineCheck,
            }
          : item
      )
    );
  };

  return (
    <Main>
      <Form {...formItemLayout}>
        <Form.Item label={"Field name"} className={"props-form-item"}>
          <Input
            size={"small"}
            style={{ width: "100%" }}
            value={fieldName}
            onChange={changeFieldName}
          />
        </Form.Item>

        <Row gutter={[12, 12]}>
          {fieldInSide.map((item, index) => (
            <Col span={24} key={item.key}>
              <Row gutter={[12]} type={"flex"} align={"middle"} justify={"end"}>
                <Col span={2}>
                  <div>{index + 1}</div>
                </Col>

                <Col span={15}>
                  <Input.Group compact>
                    <Input
                      style={{ width: "15%", textAlign: "center" }}
                      size={"small"}
                      defaultValue={item.prefix}
                      onChange={changePrefix(index)}
                    />
                    <Input
                      style={{ width: "70%" }}
                      size={"small"}
                      defaultValue={item.name}
                      onChange={changeField(index)}
                    />
                    <Input
                      style={{ width: "15%", textAlign: "center" }}
                      size={"small"}
                      defaultValue={item.suffix}
                      onChange={changeSuffix(index)}
                    />
                  </Input.Group>
                </Col>

                <Col span={7}>
                  <Button.Group className={"btn-group"} size={"small"}>
                    <Button
                      type={item.bold ? "primary" : "default"}
                      icon={"bold"}
                      onClick={changeFieldPropBold(index, "bold")}
                    />
                    <Button
                      type={item.italic ? "primary" : "default"}
                      icon={"italic"}
                      onClick={changeFieldPropBold(index, "italic")}
                    />
                    <Button
                      type={item.underline ? "primary" : "default"}
                      icon={"underline"}
                      onClick={changeFieldPropBold(index, "underline")}
                    />
                  </Button.Group>
                </Col>
              </Row>
            </Col>
          ))}

          <Col span={24}>
            <Button size={"small"} icon={"plus"} block onClick={addField}>
              {"Add field"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Main>
  );
});

DateTimeProps.propTypes = {
  state: T.shape({}),
};

export default DateTimeProps;
