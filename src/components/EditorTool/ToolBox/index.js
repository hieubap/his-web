import React, { useEffect } from "react";
import { Button, Row, Col } from "antd";
import { Main } from "./styled";
import PickColor from "../PickColor";
import { bold, italic, underline, handleShortKey } from "../utils";
import * as command from "../utils";

const ToolBox = () => {
  useEffect(() => {
    document.addEventListener("keydown", handleShortKey);

    return () => {
      document.removeEventListener("keydown", handleShortKey);
    };
  }, []);

  const handleChangeColor = (value) => {
    command.foreColor(value);
  };

  const handleMark = (value) => {
    command.mark(value);
  };

  return (
    <Main>
      <Row gutter={[6, 6]}>
        <Col span={10}>
          <PickColor icon={"font-colors"} changeColor={handleChangeColor} />
        </Col>

        <Col span={12}>
          <PickColor icon={"highlight"} changeColor={handleMark} />
        </Col>

        <Col span={4}>
          <Button
            onClick={bold}
            className={"tool-btn"}
            size={"small"}
            icon={"bold"}
          />
        </Col>
        <Col span={4}>
          <Button
            onClick={italic}
            className={"tool-btn"}
            size={"small"}
            icon={"italic"}
          />
        </Col>
        <Col span={4}>
          <Button
            onClick={underline}
            className={"tool-btn"}
            size={"small"}
            icon={"underline"}
          />
        </Col>
      </Row>
    </Main>
  );
};

export default ToolBox;
