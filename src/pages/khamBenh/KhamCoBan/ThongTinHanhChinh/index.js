import React from "react";
import { Col, Row, Avatar, Popover } from "antd";
import moment from "moment";
import { UserOutlined } from "@ant-design/icons";
import IcInfo from "assets/images/khamBenh/icInfo.svg";
import Image from "components/Image";
import { Title, Tags, GlobalStyle, HanhChinh } from "../styled";
import ModalThongTinBN from "components/ThongTinBenhNhan";
import { DOI_TUONG } from "constants/index";
import { useSelector } from "react-redux";
function ThongTinHanhChinh(props) {
  let {
    tenNb,
    tenDanToc,
    ngaySinh,
    anhDaiDien,
    tuoi,
    tenQuanHuyen,
    soNha,
    tenTinhThanhPho,
    tenQuocGia,
    noiLamViec,
    gioiTinh,
    doiTuong,
    soDienThoai,
    tenNguoiBaoLanh,
    moiQuanHeNguoiBaoLanh,
    soDienThoaiNguoiBaoLanh,
    thoiGianVaoVien,
    cdNoiGioiThieu,
    lyDoDenKham,
    mucHuongBhyt,
  } = useSelector((state) => state.khamBenh.infoNb || {});
  const listgioiTinh = useSelector((state) => state.utils.listgioiTinh || []);

  const renderDoiTuong = () => {
    let target = "";
    let cl = "";

    if (doiTuong === DOI_TUONG.BAO_HIEM) {
      target = "BHYT";
      cl = "rgb(4, 146, 84)";
    } else {
      target = "Không bảo hiểm";
      cl = "rgb(191, 152, 6)";
    }

    return (
      <Tags color="#e6f9f1" cl={cl}>
        {target}
        {doiTuong === DOI_TUONG.BAO_HIEM && ` (${mucHuongBhyt || 0}%)`}
      </Tags>
    );
  };

  return (
    <>
      <Title>I. HÀNH CHÍNH</Title>
      <HanhChinh>
        <div className="info-partient__left">
          {anhDaiDien ? (
            <>
              <Image preview={false} src={anhDaiDien} />
              <Popover
                content={
                  <ModalThongTinBN
                    gioiTinh={"Nữ"}
                    age={18}
                    infoNb={props.infoNb}
                  />
                }
                trigger="click"
                placement="bottomLeft"
                overlayClassName="custom-popover-ttbn"
              >
                <GlobalStyle />
                <IcInfo className="info-popover" />
              </Popover>
            </>
          ) : (
            <Avatar icon={<UserOutlined />} size={220} shape={"square"} />
          )}
        </div>
        <div className="info-partient__right paddingLeft">
          <Row>
            <Col md={12}>
              <div className="info-profile">
                1. Họ và tên:<span>{tenNb}</span>
              </div>
              <div className="info-profile">
                2. Ngày sinh:
                <span>
                  {ngaySinh && moment(ngaySinh).format("DD/MM/YYYY")}
                  {tuoi && ` - ${tuoi} tuổi`}
                </span>
              </div>
              <div className="info-profile">
                3. Giới tính:
                <span>
                  {listgioiTinh.find((item) => item.id === gioiTinh)?.ten}
                </span>
              </div>
              <div className="info-profile">
                4. SĐT: <span>{soDienThoai}</span>
              </div>
            </Col>
            <Col md={12}>
              <div className="info-profile">
                5. Dân tộc: <span>{tenDanToc}</span>
              </div>
              <div className="info-profile">
                6. Địa chỉ:
                <span>
                  {soNha && `${soNha} - `}
                  {tenQuanHuyen && `${tenQuanHuyen} - `}
                  {tenTinhThanhPho && `${tenTinhThanhPho} - `}
                  {tenQuocGia}
                </span>
              </div>
              <div className="info-profile">
                7. Nơi làm việc: <span>{noiLamViec}</span>
              </div>
              <div className="info-profile">
                8. Đối tượng:
                <span>{renderDoiTuong()}</span>
              </div>
            </Col>
            <Col xs={24}>
              <div className="info-profile">
                9. Người bảo lãnh:
                <span>
                  {tenNguoiBaoLanh}
                  {(moiQuanHeNguoiBaoLanh || soDienThoaiNguoiBaoLanh) &&
                    ` (${moiQuanHeNguoiBaoLanh || ""}${
                      moiQuanHeNguoiBaoLanh && soDienThoaiNguoiBaoLanh
                        ? " - "
                        : ""
                    }${soDienThoaiNguoiBaoLanh || ""})`}
                </span>
              </div>
              <div className="info-profile">
                10. Đến khám bệnh lúc:
                <span>
                  {thoiGianVaoVien &&
                    moment(thoiGianVaoVien).format("HH:mm:ss DD/MM/YYYY")}
                </span>
              </div>
              <div className="info-profile">
                11. Chẩn đoán của nơi giới thiệu: <span>{cdNoiGioiThieu}</span>
              </div>
              <div className="info-profile">
                12. Lý do đến khám: <span>{lyDoDenKham}</span>
              </div>
            </Col>
          </Row>
        </div>
      </HanhChinh>
    </>
  );
}

export default ThongTinHanhChinh;
