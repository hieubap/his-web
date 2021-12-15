import React, { memo } from "react";
import { Button, Popover } from "antd";
import { ContentWrapper } from "./styled";

export const CustomPopover = ({
  icon,
  title,
  text = "",
  placement = "bottomRight",
  contentPopover = null,
  onSubmit,
  onCancel,
  visible = false,
  handleVisible,
  width,
  loadingBtn = false,
}) => {
  const handleVisibleChange = (e) => {
    e.preventDefault();
    handleVisible(!visible);
  };

  const content = () => (
    <ContentWrapper width={width}>
      <div className="content-popover">
        {contentPopover}
        <div className="popover-btn-list">
          <Button className="popover-btn-list__cancel" onClick={onCancel}>
            Hủy
          </Button>
          <Button loading={loadingBtn} className="popover-btn-list__ok" onClick={onSubmit}>
            Đồng ý
          </Button>
        </div>
      </div>
    </ContentWrapper>
  );

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Popover
        content={content}
        title={title}
        trigger="click"
        visible={visible}
        placement={placement}
        overlayClassName="custom-popover"
      >
        <span onClick={handleVisibleChange}>
          {icon && <img src={icon} alt="icon" />}
          {text}
        </span>
      </Popover>
    </div>
  );
};

export default memo(CustomPopover);
