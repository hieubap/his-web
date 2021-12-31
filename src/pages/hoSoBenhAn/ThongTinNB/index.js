import { Col, Row, Form, Input, DatePicker, TimePicker, message } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import PersonalInformation from "./containers";
import { Modal } from "./styled";

const { Item } = Form;
const ThongTinNB = (
  {
    thongTinBenhNhan,
    getThongTinNBDotDieuTri,
    onUpdate,
    nbDotDieuTriId,
    ...props
  },
  ref
) => {
  const updateData = useDispatch().tiepDon.updateData;
  const [state, setState] = useState({ isDetail: true });
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    show: (isDetail) => {
      setState({ ...state, show: true, isDetail: !!isDetail });
    },
  }));

  const handleSubmit = () => {
    onUpdate(thongTinBenhNhan)
      .then((s) => {
        if (s && s.code === 0) {
          message.success("Cập nhật thành công");
          setState({ ...state, show: false, isDetail: true });
        } else {
          message.erro("Cập nhật không thành công: " + s.message);
        }
      })
      .catch((e) => {
        message.error("Đã có lỗi xảy ra");
      });
  };

  const selectAddress = async (data) => {
    let address = {};
    if (data?.tinhThanhPho && data?.quanHuyen) {
      address = {
        ...props.nbDiaChi,
        tinhThanhPhoId: data?.tinhThanhPho?.id,
        quanHuyenId: data?.quanHuyen?.id,
        xaPhuongId: data?.id,
        diaChi: data?.displayText,
      };
    } else if (data?.tinhThanhPho) {
      address = {
        ...props.nbDiaChi,
        tinhThanhPhoId: data?.tinhThanhPho?.id,
        quanHuyenId: data?.id,
        diaChi: data?.displayText,
      };
    } else {
      address = {
        ...props.nbDiaChi,
        tinhThanhPhoId: data?.id,
        diaChi: data?.displayText,
      };
    }
    updateData({ nbDiaChi: address });
  };

  return (
    <Modal
      // closable={false}
      width={700}
      visible={state.show}
      title={
        <div className="title-header">
          {state.isDetail
            ? "Chi tiết thông tin Người bệnh"
            : "Sửa thông tin người bệnh"}
        </div>
      }
      footer={null}
      onCancel={() => setState({ ...state, show: false })}
    >
      <PersonalInformation isDetail={state.isDetail} />
      <div className="footer">
        <div
          className="button button-back"
          onClick={() => {
            if (!state.isDetail) {
              getThongTinNBDotDieuTri(nbDotDieuTriId);
            }
            setState({ ...state, show: false, isDetail: true });
          }}
        >
          <span>Thoát</span>
        </div>
        {state.isDetail ? (
          <div
            className="button button-save"
            onClick={() => setState({ ...state, isDetail: false })}
          >
            <span>Cập nhật thông tin</span>
            <img src={require("assets/images/welcome/sua.png")} alt=""></img>
          </div>
        ) : (
          <div className="button button-save" onClick={() => handleSubmit()}>
            <span>Lưu thay đổi</span>
            <img src={require("assets/images/welcome/save.png")} alt=""></img>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default connect(
  ({ hoSoBenhAn: { nbDotDieuTriId }, nbDotDieuTri: { thongTinBenhNhan } }) => ({
    nbDotDieuTriId,
    thongTinBenhNhan,
  }),
  ({ nbDotDieuTri: { getThongTinNBDotDieuTri, onUpdate } }) => ({
    getThongTinNBDotDieuTri,
    onUpdate,
  }),
  null,
  { forwardRef: true }
)(forwardRef(ThongTinNB));
