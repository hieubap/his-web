import React from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import IconPrinter from "assets/images/khamBenh/printer.png";
import IconDelete from "assets/images/khamBenh/delete.png";
import { HeaderWrapper } from "./styled";

const Header = ({ isCollapsed, title }) => (
  <HeaderWrapper isCollapsed={isCollapsed}>
    <div className="info">
      <CaretRightOutlined className="collapse-arrow" />
      <span className="info__name">{title}</span>
      <img
        src={IconPrinter}
        alt="IconEdit"
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
    </div>
  </HeaderWrapper>
);

export default Header;
