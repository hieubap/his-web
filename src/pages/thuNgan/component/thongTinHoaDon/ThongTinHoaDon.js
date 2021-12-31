import React, { useState } from "react";
import PropTypes from "prop-types";
import { Checkbox, Form, Input } from "antd";
import { Main } from "./styled";
import moment from "moment";
const ThongTinHoaDon = (props) => {
  const { thongTinBenhNhan, isChiTiet } = props;
  const [showHoaDonCty, setShowHoaDonCty] = useState(true);
  const allowXuatHoaDon = () => {
    setShowHoaDonCty(!showHoaDonCty);
  };
  const thongTinHoaDon = {
    tenCongTy: "Công ty cổ phần công nghệ ISOFH",
    diaChiCongTy: "311-313 Trường Chinh, Thanh Xuân, Hà Nội",
    maSoThue: "1213123123",
    soTk: "1213123123123",
    hinhThucThanhToan: "CK/TM",
    soHoaDon: "12123123123",
    kiHieuHoaDon: "HD01",
    soHoaDonGoc: "123123123123",
    kiHieuHoaDonGoc: "HD01",
    trangThaiHoaDon: "Thường",
    nguoiXuatHoaDon: "Phạm Thảo Lan",
    ngayXuatHoaDon: new Date(),
  };
  return (
    <Main>
      <div className="patient">
        <h4 className="title bold">Thông tin hóa đơn </h4>
        <div>
          Họ tên Nb : <span className="bold">{thongTinBenhNhan?.tenNb}</span>
        </div>
        <div>
          Địa chỉ NB :
          <span className="bold">{thongTinBenhNhan?.nbDiaChi?.diaChi}</span>{" "}
        </div>
        <div>
          Mã hồ sơ : <span className="bold">{thongTinBenhNhan?.maHoSo}</span>
        </div>
      </div>
      {!isChiTiet ? (
        <div className="form-thong-tin">
          <Form layout="vertical">
            <Form.Item
              label="Email nhận HĐĐT"
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập email!" }]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>
            <Form.Item
              // label="Email nhận HĐĐT"
              name="email"
            >
              <Checkbox checked={showHoaDonCty} onChange={allowXuatHoaDon}>
                <span className="bold">Xuất hóa đơn cho công ty</span>
              </Checkbox>
            </Form.Item>
            {showHoaDonCty && (
              <>
                <Form.Item
                  label="Tên công ty"
                  name="email"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên công ty!" },
                  ]}
                >
                  <Input placeholder="Nhập địa chỉ"></Input>
                </Form.Item>
                <Form.Item
                  label="Địa chỉ công ty"
                  name="diaChiCongTy"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập địa chỉ công ty!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập địa chỉ"></Input>
                </Form.Item>
                <Form.Item
                  label="Mã số thuế công ty"
                  name="maSoThue"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mã số thuế công ty!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập mã số thuế"></Input>
                </Form.Item>
                <Form.Item
                  label="Số tài khoản công ty"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số tài khoản công ty!",
                    },
                  ]}
                >
                  <Input placeholder="Nhập số tài khoản"></Input>
                </Form.Item>
              </>
            )}
          </Form>
        </div>
      ) : (
        <div className="form-chi-tiet">
          <Checkbox style={{ margin: "10px 0" }} checked={true}>
            <span className="bold">Xuất hóa đơn cho công ty</span>
          </Checkbox>
          <div>
            <span>Tên công ty:</span>
            <span className="bold"> {thongTinHoaDon?.tenCongTy}</span>
          </div>
          <div>
            <span>Địa chỉ công ty:</span>
            <span className="bold"> {thongTinHoaDon?.diaChiCongTy}</span>
          </div>
          <div>
            <span>MST công ty:</span>
            <span className="bold"> {thongTinHoaDon?.maSoThue}</span>
          </div>
          <div>
            <span>STK công ty:</span>
            <span className="bold"> {thongTinHoaDon?.soTk}</span>
          </div>
          <div>
            <span>Hình thức thanh toán:</span>
            <span className="bold"> {thongTinHoaDon?.hinhThucThanhToan}</span>
          </div>
          <div style={{ marginTop: "10px" }}>
            <span>Số hóa đơn:</span>
            <span className="bold"> {thongTinHoaDon?.soHoaDon}</span>
          </div>
          <div>
            <span>Ký hiệu hóa đơn:</span>
            <span className="bold"> {thongTinHoaDon?.kiHieuHoaDon}</span>
          </div>
          <div>
            <span>Số hóa đơn gốc:</span>
            <span className="bold"> {thongTinHoaDon?.soHoaDonGoc}</span>
          </div>
          <div>
            <span>Kí hiệu hóa đơn gốc:</span>
            <span className="bold"> {thongTinHoaDon?.kiHieuHoaDonGoc}</span>
          </div>
          <div style={{ margin: "10px 0" }}>
            <span>Trạng thái hóa đơn:</span>
            <span className="bold"> {thongTinHoaDon?.trangThaiHoaDon}</span>
          </div>
          <div style={{ marginTop: "10px" }}>
            <span>Người xuất hóa đơn:</span>
            <span className="bold"> {thongTinHoaDon?.nguoiXuatHoaDon}</span>
          </div>
          <div>
            <span>Ngày xuất hóa đơn:</span>
            <span className="bold">
              {" "}
              {moment(thongTinHoaDon?.ngayXuatHoaDon).format(
                "YYYY/MM/DD hh:mm:ss"
              )}
            </span>
          </div>
        </div>
      )}
      <div className="total-money">
        <div className="lable">Tổng tiền thanh toán</div>
        <div className="money">{"2000000".formatPrice()}</div>
      </div>
    </Main>
  );
};

export default ThongTinHoaDon;
