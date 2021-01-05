import React, { forwardRef } from "react";
import { Form, Button } from "antd";
import { tailFormItemLayout } from "components/constanst";

const AlignConfig = (props) => {
  const changeAlign = (value) => () => {
    if (props.changeAlign) {
      props.changeAlign(value);
    }
  };
  return (
    <Form.Item
      {...tailFormItemLayout}
      label={"Content Align"}
      className={"props-form-item"}
    >
      <Button.Group size={"small"} style={{ width: 100 }}>
        <Button
          type={props.contentAlign === "left" ? "primary" : ""}
          icon={"align-left"}
          onClick={changeAlign("left")}
          value={"left"}
        />
        <Button
          type={props.contentAlign === "center" ? "primary" : ""}
          icon={"align-center"}
          onClick={changeAlign("center")}
          value={"center"}
        />
        <Button
          type={props.contentAlign === "right" ? "primary" : ""}
          icon={"align-right"}
          onClick={changeAlign("right")}
          value={"right"}
        />
      </Button.Group>
    </Form.Item>
  );
};

export default AlignConfig;
