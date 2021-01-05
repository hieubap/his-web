import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import {
  Card,
  Form,
  Input,
  Row,
  Col,
  Button,
  message,
  Select,
  Upload,
  Icon,
  Switch,
  Slider,
} from "antd";
import { fontSizes } from "components/EditorTool/Text/constants";
import { Main } from "./styled";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

const tailLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 9 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 15 },
  },
};

const FormProperties = ({
  form,
  config,
  fillForm,
  pasteLayout,
  control,
  updateFormProps,
  setLayoutType,
  layoutType,
  setZoomValue,
  zoomValue,
  ...rest
}) => {
  const { search: searchParams } = useLocation();
  const history = useHistory();
  const { props } = config;
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    setState(config.props || {});
  }, [config.props]);

  const changeTypeLayout = (horizontal) => {
    setLayoutType(horizontal ? "horizontal" : "default");
  };

  const handleCopyLayout = () => {
    const obj = {
      components: config.components,
      lines: config.lines,
    };

    message.success("Layout has copy!");
    fillForm(obj);
  };

  const handlePasteLayout = () => {
    pasteLayout(control.form);
  };

  const handleExportData = () => {
    const formData = {
      props,
      components: config.components,
      lines: config.lines,
    };

    const str = JSON.stringify(formData);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(str);
    let a = document.createElement("a");
    a.href = dataUri;
    a.download = `${props.name}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleOnchangeUpload = ({ file }) => {
    const reader = new FileReader();

    if (file.status === "uploading") {
      reader.onload = (function () {
        return function (e) {
          const formData = JSON.parse(e.target.result);
          const obj = {
            components: formData.components,
            lines: formData.lines,
          };
          pasteLayout(obj);
          updateFormProps(formData.props);
        };
      })(file);

      reader.readAsText(file.originFileObj);
    }
  };

  const handleChangeZoom = (value) => {
    setZoomValue(value);
  };

  const handleSubmit = () => {
    if (rest.handleSubmit) {
      rest.handleSubmit({
        name: state.name || "",
        value: state.value || "",
        api: state.api || "",
        apiTieuChi: state.apiTieuChi || "",
        tenTieuChi: state.tenTieuChi || "",
      });
    }
  };

  const onChange = (type) => (e) => {
    switch (type) {
      case "value":
      case "name":
      case "api":
      case "apiTieuChi":
      case "tenTieuChi":
        setState({
          [type]: e.target.value,
        });
        break;
      case "fontSize":
        setState({
          [type]: e,
        });
        break;
      default:
        break;
    }
  };

  const handleBack = () => {
    const urlParams = new URLSearchParams(searchParams);
    const { searchKey } = Object.fromEntries(urlParams);
    const currentQuery = searchKey ? `?search_key=${searchKey}` : "";
    history.push(`/config${currentQuery}`);
  };

  return (
    <Main>
      <Card
        bordered={false}
        title={
          <>
            <span
              style={{ color: "#08AAA8", cursor: "pointer" }}
              onClick={handleBack}
            >
              <Icon style={{ marginRight: "12px" }} type={"arrow-left"} />
            </span>
            {props.name}
          </>
        }
        size={"small"}
        extra={
          <div className={"extra-content"}>
            <div className={"zoom-tool"}>
              <span>{"Zoom "}</span>

              <Slider
                className={"slider-tool"}
                value={zoomValue}
                onChange={handleChangeZoom}
              />

              <Input
                onChange={(e) => {
                  handleChangeZoom(e.target.value);
                }}
                size={"small"}
                suffix={"%"}
                value={zoomValue}
                style={{ marginLeft: 6, width: 66 }}
              />
            </div>

            <div className={"type-form-tool extra-item"}>
              <span>{"Horizontal: "}</span>
              <Switch
                style={{ marginLeft: 6 }}
                size={"small"}
                checked={layoutType === "horizontal"}
                onChange={changeTypeLayout}
              />
            </div>

            <Button
              className={"extra-item"}
              size={"small"}
              icon={"download"}
              onClick={handleExportData}
              title={"Export"}
            />

            <Upload
              showUploadList={false}
              onChange={handleOnchangeUpload}
              accept={".json"}
              className={"custom-style"}
            >
              <Button
                className={"extra-item"}
                size={"small"}
                icon={"upload"}
                title={"Import"}
              />
            </Upload>

            <Button
              className={"extra-item"}
              icon={"copy"}
              size={"small"}
              title={"Copy layout"}
              onClick={handleCopyLayout}
            />

            <Button
              className={"extra-item"}
              size={"small"}
              icon={"snippets"}
              title={"Pate layout"}
              disabled={
                control.form.components.length < 1 &&
                control.form.lines.length < 1
              }
              onClick={handlePasteLayout}
            />

            <a href={`/preview?files=${config.id}`} target={"_blank"}>
              <Button
                className={"extra-item"}
                size={"small"}
                icon={"eye"}
                title={"Preview"}
              />
            </a>
          </div>
        }
      >
        <Form style={{ width: "100%" }} {...formItemLayout}>
          <Row gutter={[12, 12]}>
            <Col span={7}>
              <Form.Item label={"Code"} className={"props-form-item"}>
                {form.getFieldDecorator("value", {
                  initialValue: state.value,
                })(<Input size={"small"} onChange={onChange("value")} />)}
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                label={"Name"}
                className={"props-form-item"}
                {...tailLayout}
              >
                {form.getFieldDecorator("name", {
                  initialValue: state.name,
                })(<Input size={"small"} onChange={onChange("name")} />)}
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                label={"API"}
                className={"props-form-item"}
                {...tailLayout}
              >
                {form.getFieldDecorator("api", {
                  initialValue: state.api,
                })(<Input size={"small"} onChange={onChange("api")} />)}
              </Form.Item>
            </Col>
            <Col span={3}>
              <Button
                icon={"save"}
                size={"small"}
                type={"primary"}
                block
                onClick={handleSubmit}
              >
                {"Save"}
              </Button>
            </Col>
          </Row>
          <Row gutter={[12, 12]}>
            <Col span={7}>
              <Form.Item label={"Tiêu Chí"} className={"props-form-item"}>
                {form.getFieldDecorator("tenTieuChi", {
                  initialValue: state.tenTieuChi,
                })(<Input size={"small"} onChange={onChange("tenTieuChi")} />)}
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                label={"Api Tiêu Chí"}
                className={"props-form-item"}
                {...tailLayout}
              >
                {form.getFieldDecorator("apiTieuChi", {
                  initialValue: state.apiTieuChi,
                })(<Input size={"small"} onChange={onChange("apiTieuChi")} />)}
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                label={"Font size"}
                className={"props-form-item"}
                {...tailLayout}
              >
                {form.getFieldDecorator("fontSize", {
                  initialValue: state.fontSize,
                })(
                  <Select
                    size={"small"}
                    style={{ width: "100%" }}
                    placeholder={"font-size"}
                    onSelect={onChange("fontSize")}
                  >
                    {Object.keys(fontSizes).map((item) => (
                      <Select.Option key={item} value={item}>
                        {fontSizes[item]}
                        {" pt"}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </Main>
  );
};

const mapState = (state) => ({
  config: state.config,
  control: state.control,
});

const mapDispatch = ({
  config: { updateFormProps, pasteLayout },
  control: { fillForm },
}) => ({ updateFormProps, fillForm, pasteLayout });

export default connect(mapState, mapDispatch)(Form.create()(FormProperties));
