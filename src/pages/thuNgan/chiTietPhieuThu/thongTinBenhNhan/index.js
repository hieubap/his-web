import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Tooltip, Avatar } from "antd";
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
          <Image
            preview={false}
            src={thongTinBenhNhan?.anhDaiDien}
          />
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
        <div className="info-content">
          <div className="custom-col">
            <table>
              <tbody>
                <tr>
                  <td>Ngày sinh:</td>
                  <td className="info">
                    {moment(thongTinBenhNhan?.ngaySinh).format("DD/MM/YYYY")}{" "}
                    {age}
                  </td>
                </tr>
                <tr>
                  <td>Địa chỉ:</td>
                  <td className="info">
                    <Tooltip
                      placement="topLeft"
                      title={thongTinBenhNhan?.nbDiaChi?.diaChi}
                    >
                      {thongTinBenhNhan?.nbDiaChi?.diaChi}
                    </Tooltip>
                  </td>
                </tr>
                <tr>
                  <td>Số giấy tờ tùy thân:</td>
                  <td className="info">
                    {thongTinBenhNhan?.nbGiayToTuyThan?.maSo}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="custom-col col-2">
            <table>
              <tbody>
                <tr>
                  <td>SĐT:</td>
                  <td className="info">
                    {formatPhone(thongTinBenhNhan?.soDienThoai)}
                  </td>
                </tr>
                <tr>
                  <td>Mã HS:</td>
                  <td className="info">{thongTinBenhNhan?.maHoSo}</td>
                </tr>
                <tr>
                  <td>Mã NB:</td>
                  <td className="info">{thongTinBenhNhan?.maNb}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="custom-col">
            <table>
              <tbody>
                <tr>
                  <td>Số BHYT:</td>
                  <td className="info">
                    <span className="info__highlight">
                      {thongTinBenhNhan?.nbTheBaoHiem?.maThe}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Giá trị thẻ:</td>
                  <td className="info">
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
                  </td>
                </tr>
                <tr>
                  <td>Loại khám BH:</td>
                  <td className="info">
                    <span className="info__highlight">
                      {thongTinBenhNhan?.nbTheBaoHiem?.dungTuyen &&
                        `Đúng tuyến`}
                      {thongTinBenhNhan?.nbTheBaoHiem?.mucHuong &&
                        ` (${thongTinBenhNhan?.nbTheBaoHiem?.mucHuong}%)`}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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
