import React, { memo, useState, useEffect } from "react";
import { Modal, InputNumber, Checkbox } from "antd";
const valuesRespiratory = [];
for (let i = 0; i <= 100; i++) {
  valuesRespiratory.push(i.toString());
}

export default memo(function ModalInputRespiratory({
  isVisible,
  onCancel,
  valueInput,
  onOK,
  changeValueInput,
}) {
  const [value, setValue] = useState("20");
  const [isResuscitationMask, setIsResuscitationMask] = useState(false);

  useEffect(() => {
    if (valueInput) {
      const splitValues = valueInput.toString().split("/");
      setValue(splitValues[0]);
      setIsResuscitationMask(!!splitValues[1]);
    }
  }, [valueInput]);

  const onChange = (text) => {
    setValue(text);
    const textShow = isResuscitationMask ? "(bb)" : "";
    changeValueInput(`${text}${textShow ? `/${textShow}` : ""}`);
  };

  const handleSetIsResuscitationMask = () => {
    setIsResuscitationMask(!isResuscitationMask);
    const textShow = !isResuscitationMask ? "(bb)" : "";
    changeValueInput(`${value}${textShow ? `/${textShow}` : ""}`);
  };

  const _onOK = () => {
    const textShow = isResuscitationMask ? "(bb)" : "";
    onOK(`${value}${textShow ? `/${textShow}` : ""}`);
  };
  return (
    <Modal
      width={400}
      title="Nhập giá trị nhịp thở"
      visible={isVisible}
      onOk={_onOK}
      okText="Đồng ý"
      cancelText="Huỷ bỏ"
      cancelButtonProps={{ type: "danger" }}
      onCancel={onCancel}
    >
      <div>
        <InputNumber
          min={0}
          style={{ width: "100%", marginBottom: 10 }}
          // max={10}
          placeholder="Nhập giá trị"
          // step={0.1}
          onChange={onChange}
          value={value}
          autoFocus={true}
          onPressEnter={_onOK}
        />
        <Checkbox
          onChange={handleSetIsResuscitationMask}
          checked={isResuscitationMask}
        >
          Bóp bóng
        </Checkbox>
      </div>
    </Modal>
  );
});
