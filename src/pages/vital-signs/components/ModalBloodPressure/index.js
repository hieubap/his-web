import React, { memo, useState, useEffect } from "react";
import { message } from "antd";
// import { WheelPicker } from "react-native-wheel-picker-android";
import { handleBloodPressure } from "utils/vital-signs/canvas-utils";
import { Modal, InputNumber } from "antd";
import { cloneDeep } from "lodash";

const valuesHPTh = [];
for (let i = 30; i <= 380; i++) {
  valuesHPTh.push(i.toString());
}
export default memo(function ModalBloodPressure({
  isVisible,
  onCancel,
  valueInput,
  onOK,
  changeValueInput,
}) {
  const [value, setValue] = useState({
    systolic: 120,
    diastolic: 90,
  });

  useEffect(() => {
    if (valueInput) {
      const newValue = handleBloodPressure(valueInput);
      setValue(newValue);
    }
  }, [valueInput]);

  const _onOK = () => {
    if (
      +value.systolic <= value.diastolic ||
      +value.systolic - 100 >= value.diastolic
    ) {
      message.error(
        "Huyết áp tâm thu cần lớn hơn huyết áp tâm trương nhưng không quá 100 đơn vị "
      );
    } else {
      onOK(value.systolic + "/" + value.diastolic);
    }
  };
  const onChange = (type) => (_value) => {
    if (type === 1) {
      let newValue = cloneDeep(value);
      changeValueInput(`${_value}/${value.diastolic}`);
      newValue.systolic = _value;
      setValue(newValue);
    } else {
      changeValueInput(`${value.systolic}/${_value}`);
      let newValue = cloneDeep(value);
      newValue.diastolic = _value;
      setValue(newValue);
    }
  };

  return (
    <Modal
      width={400}
      title="Nhập giá trị huyết áp"
      visible={isVisible}
      onOk={_onOK}
      okText="Đồng ý"
      cancelText="Huỷ bỏ"
      onCancel={onCancel}
      cancelButtonProps={{ type: "danger" }}
    >
      <div style={{ fontSize: 17, fontWeight: "bold" }}>Huyết áp tâm thu</div>
      <InputNumber
        min={0}
        style={{ width: "100%", marginBottom: 10 }}
        // max={10}
        placeholder="Nhập giá trị"
        // step={0.1}
        onChange={onChange(1)}
        autoFocus={true}
        value={value.systolic}
        onPressEnter={_onOK}
      />
      <div style={{ fontSize: 17, fontWeight: "bold" }}>
        Huyết áp tâm trương
      </div>
      <InputNumber
        min={0}
        // max={value.systolic}
        style={{ width: "100%", marginBottom: 10 }}
        // max={10}
        placeholder="Nhập giá trị"
        // step={0.1}
        onChange={onChange(2)}
        value={value.diastolic}
        onPressEnter={_onOK}
      />
    </Modal>
  );
});
