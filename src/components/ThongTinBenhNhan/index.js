import React, { useRef, useEffect } from "react";
import moment from "moment";
import { Tooltip, Avatar, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ROLES } from "constants/index";
import AuthWrapper from "components/AuthWrapper";
import { formatPhone } from "utils";
import { PatientInfoWrapper, Main } from "./styled";
import Image from "components/Image";
import stringUtils from "mainam-react-native-string-utils";
import { useDispatch } from "react-redux";

const ThongTinBenhNhan = ({
  thongTinBenhNhan = {},
  age,
  gioiTinh,
  onToggleModal,
  ...rest
}) => {
  const refLayerHotKey = useRef(stringUtils.guid());
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;
  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    onRegisterHotkey({
      layerId: refLayerHotKey.current,
      hotKeys: [
        {
          keyCode: 27, //ESC
          onEvent: () => {
            onToggleModal && onToggleModal("hidden")();
          },
        },
      ],
    });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);
  return (
    <Main className={rest.className}>
      <Row className="info-partinent">
        <div className="info-partinent__index">BNS-0004</div>
        <div className="info-partinent__name">
          <span>{thongTinBenhNhan?.tenNb}</span>
          {gioiTinh.ten &&
            age &&
            ` (${gioiTinh.ten && `${gioiTinh.ten} - `} ${age})`}
        </div>
      </Row>
      <PatientInfoWrapper>
        <AuthWrapper accessRoles={[ROLES["THU_NGAN"].THONG_TIN_CA_NHAN]}>
          <div className="img-avatar">
            {thongTinBenhNhan?.anhDaiDien ? (
              <Image preview={false} src={thongTinBenhNhan?.anhDaiDien} />
            ) : (
              <Avatar icon={<UserOutlined />} size={100} shape={"square"} />
            )}
          </div>
        </AuthWrapper>
        <div className="patient-information">
          <div className="info-content">
            <div className="custom-col">
              <table>
                <tbody>
                  <tr>
                    <td>Ngày sinh:</td>
                    <td className="info">
                      {thongTinBenhNhan?.ngaySinh
                        ? `${moment(thongTinBenhNhan?.ngaySinh).format(
                            "DD/MM/YYYY"
                          )} - `
                        : ""}
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
                    <td>Số BHYT:</td>
                    <td className="info">
                      {thongTinBenhNhan?.nbTheBaoHiem?.maThe}
                    </td>
                  </tr>
                  <tr>
                    <td>Giá trị thẻ:</td>
                    <td className="info">
                      {thongTinBenhNhan?.nbTheBaoHiem && (
                        <>
                          Từ{" "}
                          {moment(thongTinBenhNhan.nbTheBaoHiem?.tuNgay).format(
                            "DD/MM/YYYY"
                          )}{" "}
                          đến{" "}
                          {moment(
                            thongTinBenhNhan.nbTheBaoHiem?.denNgay
                          ).format("DD/MM/YYYY")}
                        </>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="custom-col">
              <table>
                <tbody>
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
          </div>
        </div>
      </PatientInfoWrapper>
    </Main>
  );
};

export default ThongTinBenhNhan;
