import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Tooltip, Avatar, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { HOST } from "client/request";
import { formatPhone } from "utils";
import { PatientInfoWrapper } from "./styled";
import Image from "components/Image";
const ThongTinBenhNhan = ({
  thongTinBenhNhan,
  getThongTinNBDotDieuTri,
  listgioiTinh,
  getUtils,
}) => {
  const { nbDotDieuTriId } = useParams();

  useEffect(() => {
    getUtils({ name: "gioiTinh" });
  }, []);

  useEffect(() => {
    getThongTinNBDotDieuTri(nbDotDieuTriId);
  }, [nbDotDieuTriId]);

  const gioiTinh =
    listgioiTinh.find((item) => item.id === thongTinBenhNhan?.gioiTinh) || {};
  const age = thongTinBenhNhan.tuoi ? ` - ${thongTinBenhNhan?.tuoi} tuổi` : "";
  return (
    <PatientInfoWrapper>
      <div className="img-avatar">
        {thongTinBenhNhan?.anhDaiDien ? (
          <Image preview={false} src={thongTinBenhNhan?.anhDaiDien} />
        ) : (
          <Avatar icon={<UserOutlined />} size={100} shape={"square"} />
        )}
      </div>
      <div className="patient-information">
        <div className="head">
          <div className="name">
            <span>{thongTinBenhNhan?.tenNb}</span>{" "}
            {gioiTinh.ten && `(${gioiTinh.ten})`}
          </div>
        </div>
        <Row className="info-content" gutter={12}>
          <Col xl={12} xxl={10} className="custom-col">
            <div className="flex">
              <div className="w150">Ngày sinh:</div>
              <div className="info">
                {moment(thongTinBenhNhan?.ngaySinh).format("DD/MM/YYYY")} {age}
              </div>
            </div>
            <div className="flex">
              <div className="w150">Địa chỉ:</div>
              <div className="info">
                <Tooltip
                  placement="topLeft"
                  title={thongTinBenhNhan?.nbDiaChi?.diaChi}
                >
                  {thongTinBenhNhan?.nbDiaChi?.diaChi}
                </Tooltip>
              </div>
            </div>
            <div className="flex">
              <div className="w150">Số giấy tờ tùy thân:</div>
              <div className="info">
                {thongTinBenhNhan?.nbGiayToTuyThan?.maSo}
              </div>
            </div>
          </Col>
          <Col xl={12} xxl={6} className="custom-col">
            <div className="flex">
              <div className="w60">SĐT:</div>
              <div className="info">
                {formatPhone(thongTinBenhNhan?.soDienThoai)}
              </div>
            </div>
            <div className="flex">
              <div className="w60">Mã HS:</div>
              <div className="info">{thongTinBenhNhan?.maHoSo}</div>
            </div>
            <div className="flex">
              <div className="w60">Mã NB:</div>
              <div className="info">{thongTinBenhNhan?.maNb}</div>
            </div>
          </Col>
          <Col xl={24} xxl={8} className="custom-col col-3">
            <div className="flex">
              <div className="w150">Thời gian vào viện:</div>
              <div className="info">
                <span className="info__highlight">
                  {moment(thongTinBenhNhan.thoiGianVaoVien).format(
                    "DD/MM/YYYY HH:mm:ss"
                  )}
                </span>
              </div>
            </div>
            <div className="flex">
              <div className="w150">Số BHYT:</div>
              <div className="info">
                <span className="info__highlight">
                  {thongTinBenhNhan?.nbTheBaoHiem?.maThe}
                </span>
              </div>
            </div>
            <div className="flex">
              <div className="150">Giá trị thẻ:</div>
              <div className="info">
                {thongTinBenhNhan?.nbTheBaoHiem && (
                  <span className="info__highlight">
                    Từ{" "}
                    {moment(thongTinBenhNhan.nbTheBaoHiem?.tuNgay).format(
                      "DD/MM/YYYY"
                    )}{" "}
                    đến{" "}
                    {moment(thongTinBenhNhan.nbTheBaoHiem?.denNgay).format(
                      "DD/MM/YYYY"
                    )}
                  </span>
                )}
              </div>
            </div>
            <div className="flex">
              <div className="w150">Loại khám BH:</div>
              <div className="info">
                <span className="info__highlight">
                  {thongTinBenhNhan?.nbTheBaoHiem?.dungTuyen && `Đúng tuyến`}
                  {thongTinBenhNhan?.nbTheBaoHiem?.mucHuong &&
                    ` (${thongTinBenhNhan?.nbTheBaoHiem?.mucHuong}%)`}
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </PatientInfoWrapper>
  );
};

const mapStateToProps = (state) => {
  const {
    nbDotDieuTri: { thongTinBenhNhan },
    utils: { listgioiTinh = [] },
  } = state;
  return {
    thongTinBenhNhan,
    listgioiTinh,
  };
};

const mapDispatchToProps = ({
  nbDotDieuTri: { getThongTinNBDotDieuTri },
  utils: { getUtils },
}) => ({
  getThongTinNBDotDieuTri,
  getUtils,
});

export default connect(mapStateToProps, mapDispatchToProps)(ThongTinBenhNhan);
