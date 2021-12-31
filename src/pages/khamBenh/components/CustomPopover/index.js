import React, { memo, useRef, useEffect } from "react";
import { Button, Popover } from "antd";
import { ContentWrapper, GlobalStyled } from "./styled";
import stringUtils from "mainam-react-native-string-utils";
import { useDispatch } from "react-redux";

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
  isDisabledSubmitButton,
  mask = false,
  overlayInnerStyle,
  overlayClassName
}) => {
  const refLayerHotKey = useRef(stringUtils.guid());
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;
  useEffect(() => {
    if (visible) {
      onAddLayer({ layerId: refLayerHotKey.current });
      onRegisterHotkey({
        layerId: refLayerHotKey.current,
        hotKeys: [
          {
            keyCode: 27, //ESC
            onEvent: () => {
              onCancel();
            },
          },
          {
            keyCode: 115, //F4
            onEvent: () => {
              if (!isDisabledSubmitButton) onSubmit();
            },
          },
        ],
      });
    }
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, [visible]);

  const handleVisibleChange = (e) => {
    e.preventDefault();
    handleVisible(!visible);
  };

  const content = () => (
    <>
      {mask &&
        <div className={"mask"} style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 1000,
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.45)",
        }}></div>}
      <ContentWrapper width={width} overlayClassName={overlayClassName ? true : false}>
        <div className="content-popover">
          {contentPopover}
          <div className="popover-btn-list">
            <Button className="popover-btn-list__cancel" onClick={onCancel}>
              Hủy
          </Button>
          <Button
            disabled={isDisabledSubmitButton}
            loading={loadingBtn}
            className="popover-btn-list__ok"
            onClick={onSubmit}
          >
            Đồng ý
          </Button>
          </div>
        </div>
      </ContentWrapper>
    </>
  );

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <GlobalStyled />
      <Popover
        overlayInnerStyle={overlayInnerStyle}
        content={content}
        title={title}
        trigger="click"
        visible={visible}
        placement={placement}
        overlayClassName={`${overlayClassName ? overlayClassName : "custom-popover"}`}
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
