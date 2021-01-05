import React, { forwardRef, useState } from "react";
import { Form, Button, Input } from "antd";
import { tailFormItemLayout } from "components/constanst";
import { Main } from "./styled";

const MarginConfig = (props) => {
  const handleChange = (type) => (e) => {
    if (props.onChange) props.onChange(type, e.target.value);
  };
  return (
    <Main>
      <Input
        style={{ width: "40px" }}
        size={"small"}
        onChange={handleChange("top")}
        value={props.top}
      />
      <div className="middle">
        <Input
          // addonAfter={"px"}
          style={{ width: "40px" }}
          size={"small"}
          onChange={handleChange("left")}
          value={props.left}
        />
        <div></div>
        <Input
          // addonAfter={"px"}
          style={{ width: "40px" }}
          size={"small"}
          onChange={handleChange("right")}
          value={props.right}
        />
      </div>
      <Input
        // addonAfter={"px"}
        style={{ width: "40px" }}
        size={"small"}
        onChange={handleChange("bottom")}
        value={props.bottom}
      />
    </Main>
  );
};

export default MarginConfig;
