import React, { useState, useEffect } from "react";
import { Dropdown, Icon, Row, Col } from "antd";
import { Main, Color, ColorItem, ColorContain } from "./styled";
import { colors } from "../constants";

const color = (handleSetColor) => (
  <ColorContain>
    <Row gutter={[6, 6]}>
      {colors.map((key) => (
        <Col span={8} key={key}>
          <ColorItem onClick={handleSetColor(key)} color={key} />
        </Col>
      ))}
    </Row>
  </ColorContain>
);

const PickColor = ({ icon, changeColor, dataColor, title }) => {
  const [value, setColor] = useState(dataColor || colors[1]);
  useEffect(() => {
    setColor(dataColor || colors[1]);
  }, [dataColor]);

  const handleSetColor = (res) => () => {
    setColor(res);
    changeColor(res);
  };

  return (
    <Main title={title}>
      <Dropdown.Button
        className="color-picker"
        placement="bottomCenter"
        overlay={color(handleSetColor)}
        size={"small"}
        icon={<Color color={value} />}
        trigger={["click"]}
      >
        {icon && <Icon type={icon} style={{ color: value }} />}
      </Dropdown.Button>
    </Main>
  );
};

export default PickColor;
