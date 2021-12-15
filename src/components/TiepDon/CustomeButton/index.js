import { Popover } from "antd";
import React from "react";
import { Main } from "./styled";

const Index = ({
  title = "Lưu thông tin",
  icon = null,
  iconDuplicate = false,
  isShowToolTip = false,
  className = "",
  ...props
}) => {
  return (
    <Main {...props} className={className}>
      <Popover
        visible={isShowToolTip}
        content={`${title}`}
        trigger="hover"
        className={`popover-wrapper `}
      >
        <div className="title">{title}</div>
        {icon && iconDuplicate ? (
          <div className="icon">
            {typeof icon == "string" ? (
              <>
                <img src={icon} alt="iSofh" />
                <img src={icon} alt="iSofh" />
              </>
            ) : (
              icon
            )}
          </div>
        ) : (
          <div className="icon">
            {typeof icon == "string" ? <img src={icon} alt="iSofh" /> : icon}
          </div>
        )}
      </Popover>
    </Main>
  );
};

export default Index;
