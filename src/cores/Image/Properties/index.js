import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import {
  Form,
  InputNumber,
  Select,
  Upload,
  Button,
  Icon,
  Checkbox,
} from "antd";
import { formItemLayout, tailFormItemLayout } from "components/constanst";
import { Main } from "./styled";
import { connect } from "react-redux";
const ImageProps = (props, ref) => {
  const { uploadImage, common, fields } = props;
  const [state, _setState] = useState({
    defaultImageUpload: "",
    fieldName: "",
    width: "",
    height: "",
    nameImage: "",
    fromEMR: "",
    readOnly: false,
    blockSignLevel: 0,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    if (props.state.key) {
      setState({
        defaultImageUpload: common.image,
      });
    }
  }, [common.image]);

  useEffect(() => {
    if (props.state.props) {
      setState({
        fieldName: props.state.props.fieldName,
        width: props.state.props.width,
        height: props.state.props.height,
        defaultImageUpload: props.state.props.defaultImageUpload,
        fromEMR: props.state.props.fromEMR,
        readOnly: props.state.props.readOnly,
        blockSignLevel: props.state.props.blockSignLevel,
      });
    }
  }, [props.state]);

  useImperativeHandle(ref, () => ({
    fieldName: state.fieldName,
    width: state.width,
    height: state.height,
    defaultImageUpload: state.defaultImageUpload,
    fromEMR: state.fromEMR,
    readOnly: state.readOnly,
    blockSignLevel: state.blockSignLevel,
  }));

  const handleChangeImage = (info) => {
    setState({
      nameImage: info.file.name,
    });
    uploadImage(info.file.originFileObj);
  };
  const changeValue = (type) => (value) => {
    setState({
      [type]: value,
    });
  };

  const changeCheckbox = (type) => (e) => {
    changeValue(type)(e.target.checked);
  };

  return (
    <Main>
      <Form {...formItemLayout}>
        <Form.Item label={"Field name"} className={"props-form-item"}>
          <Select
            showSearch
            size={"small"}
            style={{ width: "100%" }}
            value={state.fieldName}
            onSelect={changeValue("fieldName")}
          >
            {fields.map((key) => (
              <Select.Option key={key} value={key}>
                {key}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          {...tailFormItemLayout}
          label={"Default"}
          className={"props-form-item"}
        >
          <Upload onChange={handleChangeImage} showUploadList={false}>
            <Button size={"small"}>
              <Icon type="upload" /> Upload
            </Button>
          </Upload>
          <span className={"name-image"}>
            {state.nameImage || state.defaultImageUpload}
          </span>
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
        <Form.Item label={"Dữ liệu từ EMR"} className={"props-form-item"}>
          <Checkbox
            onChange={changeCheckbox("fromEMR")}
            checked={state.fromEMR}
          />
        </Form.Item>
      </Form>
    </Main>
  );
};

const mapState = (state) => ({
  common: state.common,
});
const mapDispatch = ({ common: { uploadImage } }) => ({
  uploadImage,
});

export default connect(mapState, mapDispatch, null, { forwardRef: true })(
  forwardRef(ImageProps)
);

// export default connect(mapState, mapDispatch)(ImageProps);
