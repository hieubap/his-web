import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useEffect,
  useState,
  useRef,
} from "react";
import { Button, Popover } from "antd";
import { ContentWrapper } from "./styled";
import stringUtils from "mainam-react-native-string-utils";
import { useDispatch } from "react-redux";

export const CustomPopover = (
  {
    handleVisible,
    loadingBtn = false,
    text,
    placement = "bottomRight",
    title,
    icon,
    width,
    contentPopover,
  },
  ref
) => {
  const refCancel = useRef(null);
  const refSubmit = useRef(null);
  const refLayerHotKey = useRef(stringUtils.guid());

  const [state, _setState] = useState({
    show: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;

  useImperativeHandle(ref, () => ({
    show: ({}, onSubmit, onCancel) => {
      setState({
        show: true,
      });
      refSubmit.current = onSubmit;
      refCancel.current = onCancel;
      onAddLayer({ layerId: refLayerHotKey.current });
      onRegisterHotkey({
        layerId: refLayerHotKey.current,
        hotKeys: [
          {
            keyCode: 27, //ESC
            onEvent: () => {
              setState({
                show: false,
              });
            },
          },
          {
            keyCode: 115, //F4
            onEvent: () => {
              refSubmit.current && refSubmit.current();
            },
          },
        ],
      });
    },
    hide: () => {
      setState({
        show: false,
      });
    },
  }));

  useEffect(() => {
    if (!state.show) {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    }
  }, [state.show]);
  useEffect(() => {
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  const handleVisibleChange = (e) => {
    e.preventDefault();
    handleVisible(true);
  };

  const content = () => (
    <ContentWrapper width={width}>
      <div className="content-popover">
        {contentPopover}
        <div className="popover-btn-list">
          <Button
            className="popover-btn-list__cancel"
            onClick={refCancel.current}
          >
            Hủy
          </Button>
          <Button
            loading={loadingBtn}
            className="popover-btn-list__ok"
            onClick={refSubmit.current}
          >
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
        visible={state.show}
        placement={placement}
        overlayClassName="custom-popover"
      >
        <span onClick={handleVisibleChange}>
          {state.icon && <img src={icon} alt="icon" />}
          {text}
        </span>
      </Popover>
    </div>
  );
};

export default memo(forwardRef(CustomPopover));
