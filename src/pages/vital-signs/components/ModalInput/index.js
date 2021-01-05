import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Modal, InputNumber } from "antd";
import { ModalBloodPressure, ModalInputRespiratory } from "../";
export default forwardRef(function ModalInput(props, ref) {
  const [state, _setState] = useState({
    search: "",
  });
  const refCallback = useRef(null);
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useImperativeHandle(ref, () => ({
    show: (value, type, keyboardType, callback) => {
      setState({
        value: value,
        type,
        keyboardType,
        show: true,
      });
      refCallback.current = callback;
    },
  }));

  const onChange = (text) => {
    setState({ value: text });
  };
  const onCancel = () =>
    setState({
      show: false,
    });

  const onOK = (value) => {
    if (refCallback.current)
      refCallback.current(
        (state.value ? state.value + "" : "") || value,
        state.type
      );
    setState({ show: false });
  };

  const onPressEnter = () => {
    onOK(state.value || "");
  };
  let type = state.type;
  if (type === 2 || type === 3)
    return (
      <Modal
        width={400}
        title="Nhập giá trị"
        visible={state.show}
        onOk={onPressEnter}
        okText="Đồng ý"
        cancelText="Huỷ bỏ"
        cancelButtonProps={{ type: "danger" }}
        onCancel={onCancel}
      >
        <InputNumber
          min={0}
          autoFocus={true}
          style={{ width: "100%" }}
          // max={10}
          placeholder="Nhập giá trị"
          // step={0.1}
          onChange={onChange}
          value={state.value}
          onPressEnter={onPressEnter}
        />
      </Modal>
    );
  if (type === 0)
    return (
      <ModalBloodPressure
        onCancel={onCancel}
        isVisible={state.show}
        valueInput={state.value}
        onOK={onOK}
        changeValueInput={(value) => {
          setState({ value: value });
        }}
      />
    );
  if (type === 1)
    return (
      <ModalInputRespiratory
        onCancel={onCancel}
        isVisible={state.show}
        onOK={onOK}
        valueInput={state.value}
        changeValueInput={(value) => {
          setState({ value: value });
        }}
      />
    );

  return null;
});
