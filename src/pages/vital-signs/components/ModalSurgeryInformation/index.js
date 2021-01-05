import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { Modal, Select, Input, message } from "antd";
import { connect } from "react-redux";
const { TextArea } = Input;
const SurgeryInformationModal = forwardRef((props, ref) => {
  const [state, _setState] = useState({
    search: "",
  });
  const refCallback = useRef(null);
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    props.getAllDoctor();
  }, []);

  useImperativeHandle(ref, () => ({
    show: (bacSy, phuongPhapPhauThuat, callback) => {
      setState({
        bacSy,
        phuongPhapPhauThuat,
        show: true,
      });
      refCallback.current = callback;
    },
  }));

  const onChange = (key) => (text) => {
    if (key === "bacSy") setState({ [key]: text });
    else setState({ [key]: text.target.value });
  };
  const onCancel = () =>
    setState({
      show: false,
    });

  const onOK = () => {
    if (!state.bacSy) {
      message.error("Vui lòng chọn bác sĩ");
      return;
    }
    if (!state.phuongPhapPhauThuat) {
      message.error("Vui lòng nhập phương pháp phẫu thuật");
      return;
    }
    if (refCallback.current)
      refCallback.current(state.bacSy, state.phuongPhapPhauThuat);
    setState({ show: false });
  };
  return (
    <Modal
      width={550}
      title="Thông tin phẫu thuật"
      visible={state.show}
      onOk={onOK}
      okText="Đồng ý"
      cancelText="Huỷ bỏ"
      cancelButtonProps={{ type: "danger" }}
      onCancel={onCancel}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <span>Bác sĩ: </span>
        <Select
          showSearch
          style={{ width: 450, marginLeft: 10 }}
          placeholder="Nhập tên bác sỹ"
          optionFilterProp="props.children"
          value={state.bacSy}
          onChange={onChange("bacSy")}
          filterOption={(input, option) => {
            return (
              (option.props.children + "")
                .toLowerCase()
                .createUniqueText()
                .indexOf(input.toLowerCase().createUniqueText()) >= 0
            );
          }}
        >
          {props.doctors.map((item, index) => {
            return (
              <Select.Option key={index} value={item.fullName}>
                {item.fullName} - Mã NV: {item.value} - {item.departmentName}
              </Select.Option>
            );
          })}
        </Select>
      </div>
      <span>Phương pháp phẫu thuật</span>
      <TextArea
        value={state.phuongPhapPhauThuat}
        onChange={onChange("phuongPhapPhauThuat")}
        rows={5}
        style={{ marginTop: 5 }}
        placeholder="Vui lòng nhập phương pháp phẫu thuật"
      />
    </Modal>
  );
});

export default connect(
  (state) => {
    return {
      doctors: state.vitalSigns.doctors || [],
    };
  },
  ({ vitalSigns: { getAllDoctor } }) => ({
    getAllDoctor,
  }),
  null,
  { forwardRef: true }
)(SurgeryInformationModal);
