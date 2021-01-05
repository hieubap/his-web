import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import T from "prop-types";
import renderHtml from "react-render-html";
import {
  Button,
  Row,
  Col,
  Radio,
  Input,
  Checkbox,
  Select,
  InputNumber,
} from "antd";
import moment from "moment";
import { Main } from "./styled";

const CheckGroupProps = forwardRef((props, ref) => {
  const [state, _setState] = useState({
    fieldName: "",
    type: "multiple",
    direction: "ltr",
    checkList: [],
    disabled: false,
    readOnly: false,
    blockSignLevel: 0,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const { fields, updateComponents } = props;

  useImperativeHandle(ref, () => ({
    fieldName: state.fieldName,
    type: state.type,
    direction: state.direction,
    checkList: state.checkList,
    disabled: state.disabled,
    readOnly: state.readOnly,
    blockSignLevel: state.blockSignLevel,
  }));

  useEffect(() => {
    if (props.state.key) {
      setState({
        fieldName: props.state.props.fieldName,
        type: props.state.props.type || "multiple",
        checkList: props.state.props.checkList || [],
        direction: props.state.props.direction || "ltr",
        disabled: props.state.props.disabled || false,
        readOnly: props.state.props.readOnly || false,
        blockSignLevel: props.state.props.blockSignLevel,
      });
    }
  }, [props.state]);

  const changeValue = (type) => (value) => {
    setState({
      [type]: value,
    });
  };

  const updateItem = (item, key) => (e) => {
    const value = e.target.value;
    const newList = state.checkList.map((obj) =>
      obj.key === item.key
        ? {
            ...obj,
            [key]: value,
          }
        : obj
    );
    setState({
      checkList: newList,
    });
  };

  const removeItem = (itemKey) => () => {
    const newList = state.checkList.filter((item) => item.key !== itemKey);
    setState({
      checkList: newList,
    });
    updateComponents({
      ...props.state,
      props: {
        ...props.state.props,
        checkList: newList,
      },
    });
  };

  const addCheckItem = () => {
    const newList = state.checkList;
    const item = { label: "test", value: "text", key: moment().valueOf() };
    const list = [...newList, item];
    setState({
      checkList: list,
    });
    updateComponents({
      ...props.state,
      props: {
        ...props.state.props,
        checkList: list,
      },
    });
  };

  const changeInput = (type) => (e) => {
    setState({
      [type]: e.target.value,
    });
  };
  const changeDataFormEMR = (e) => {
    changeValue("disabled")(!e.target.checked);
  };

  const handleChangeDirection = (e) => {
    const value = e.currentTarget.value;
    if (value === "rtl") {
      setState({
        direction: "ltr",
      });
    } else {
      setState({
        direction: "rtl",
      });
    }
  };
  const changeCheckbox = (type) => (e) => {
    changeValue(type)(e.target.checked);
  };

  return (
    <Main>
      <Row gutter={[12, 12]}>
        <Col span={8}>
          <span>{"Field name: "}</span>
        </Col>

        <Col span={16}>
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
        </Col>
        <Col span={8}>
          <span>{"Direction: "}</span>
        </Col>

        <Col span={16}>
          <Row gutter={[12, 12]}>
            <Col span={8}>
              <Button
                icon={state.direction === "ltr" ? "arrow-right" : "arrow-left"}
                size={"small"}
                value={state.direction}
                onClick={handleChangeDirection}
              />
            </Col>

            <Col span={16}>
              {state.direction === "ltr" ? "L to R" : "R to L"}
            </Col>
          </Row>
        </Col>

        <Col span={8}>
          <span>{"Type: "}</span>
        </Col>

        <Col span={16}>
          <Radio.Group onChange={changeInput("type")} value={state.type}>
            <Radio value={"onlyOne"}>{"Only one"}</Radio>
            <Radio value={"multiple"}>{"Multiple"}</Radio>
          </Radio.Group>
        </Col>

        <Col span={8}>
          <span>{"Khoá ở cấp ký "}</span>
        </Col>

        <Col span={16}>
          <InputNumber
            value={state.blockSignLevel}
            onChange={changeValue("blockSignLevel")}
            size={"small"}
          />
        </Col>
        <Col span={8}>
          <span>{"Read Only "}</span>
        </Col>

        <Col span={16}>
          <Checkbox
            onChange={changeCheckbox("readOnly")}
            checked={state.readOnly}
          />
        </Col>
        <Col span={8}>
          <span>{"Dữ liệu từ EMR: "}</span>
        </Col>

        <Col span={16}>
          <Checkbox onChange={changeDataFormEMR} checked={!state.disabled} />
        </Col>
      </Row>

      <ul>
        {state.checkList.map((item) => (
          <li key={item.key} className={"item-main"}>
            <div className={"item-option"}>
              <span className="option-label">Nhãn:</span>
              <span className="option-content">
                {renderHtml(item.label || "")}
              </span>
            </div>
            <div className={"item-option"}>
              <span className="option-label">Giá trị:</span>
              <Input
                className="option-content"
                style={{ flex: 1 }}
                value={item.value}
                onChange={updateItem(item, "value")}
                size={"small"}
              />
              <Button
                icon={"delete"}
                size={"small"}
                onClick={removeItem(item.key)}
              />
            </div>
            <div className={"item-option"}>
              <span className="option-label">Độ rộng:</span>
              <Input
                className="option-content"
                style={{ flex: 1 }}
                value={item.width}
                onChange={updateItem(item, "width")}
                size={"small"}
              />
            </div>
            <div className={"item-option"}>
              <span className="option-label">Gợi ý:</span>
              <Input.TextArea
                rows={2}
                className="option-content"
                style={{ flex: 1 }}
                value={item.note}
                onChange={updateItem(item, "note")}
                size={"small"}
              />
            </div>
          </li>
        ))}
      </ul>
      <Button
        className={"add-btn"}
        icon={"plus"}
        size={"small"}
        onClick={addCheckItem}
      />
    </Main>
  );
});

CheckGroupProps.defaultProps = {
  state: {},
};

CheckGroupProps.propTypes = {
  state: T.shape({}),
};

export default CheckGroupProps;
