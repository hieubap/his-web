import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Main } from "./styled";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Avatar, Col, Row } from "antd";
import { useSelector } from "react-redux";
import { formatPhone } from "utils";
import moment from "moment";
import { UserOutlined } from "@ant-design/icons";
import Image from "components/Image";
const ThongTinBenhNhan = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const thongTinBenhNhan = useSelector((state) => state.nbDotDieuTri);
  useEffect(() => {
    setState({
      patient: thongTinBenhNhan.thongTinBenhNhan,
    });
  }, [thongTinBenhNhan]);
  const { nbDotDieuTriId } = useParams();
  const { getThongTinNBDotDieuTri } = dispatch.nbDotDieuTri;
  useEffect(() => {
    getThongTinNBDotDieuTri(nbDotDieuTriId);
  }, []);
  return (
    <Main>
      <div className="image-patient">
        {state?.patient?.anhDaiDien ? (
          <Image preview={false} src={thongTinBenhNhan?.anhDaiDien} />
        ) : (
          <Avatar icon={<UserOutlined />} size={120} shape={"square"} />
        )}
      </div>
      <div className="info-patient">
        <div className="name-patient">
          <span className="code">
            Mã NB : <b>{state?.patient?.maNb}</b>
          </span>
          <span className="name">
            <b>{state?.patient?.tenNb}</b>
            <span className="gender">
              {" "}
              ({state?.patient?.gioiTinh == 1 ? "Nam" : "Nữ"})
            </span>
          </span>
        </div>
        <Row className="info-detail">
          <Col span={12}>
            <p>
              <span className="column-info">Ngày sinh:</span>
              <span className="text-info">{state?.patient?.ngaySinh2}</span>
            </p>
            <p>
              <span className="column-info">Địa chỉ:</span>
              <span className="text-info">
                {state?.patient?.nbDiaChi?.diaChi}
              </span>
            </p>
            <p>
              <span className="column-info">Số giấy tờ tùy thân:</span>
              <span className="text-info">
                {state?.patient?.nbGiayToTuyThan?.maSo}
              </span>
            </p>
            <p>
              <span className="column-info">SĐT:</span>
              <span className="text-info">
                {formatPhone(state?.patient?.soDienThoai)}
              </span>
            </p>
          </Col>
          <Col span={12}>
            <p>
              <span className="column-info-2">Mã HS:</span>
              <span className="text-info">{state?.patient?.maHoSo}</span>
            </p>
            <p>
              <span className="column-info-2">Số BHYT:</span>
              <span className="text-info">
                {state?.patient?.nbTheBaoHiem?.maThe}
              </span>
            </p>
            <p>
              <span className="column-info-2">Giá trị thẻ:</span>
              <span className="text-info">
                Từ{" "}
                {moment(state?.patient?.nbTheBaoHiem?.tuNgay).format(
                  "DD/MM/YYYY"
                )}{" "}
                đến{" "}
                {moment(state?.patient?.nbTheBaoHiem?.denNgay).format(
                  "DD/MM/YYYY"
                )}
              </span>
            </p>
            <p>
              <span className="column-info-2">Loại:</span>
              <span className="text-info">
                <span>
                  {thongTinBenhNhan?.nbTheBaoHiem?.dungTuyen && `Đúng tuyến`}
                </span>
                <span style={{ color: "red" }}>
                  {thongTinBenhNhan?.nbTheBaoHiem?.mucHuong &&
                    ` (${thongTinBenhNhan?.nbTheBaoHiem?.mucHuong}%)`}
                </span>
              </span>
            </p>
          </Col>
        </Row>
      </div>
    </Main>
  );
};

export default ThongTinBenhNhan;
