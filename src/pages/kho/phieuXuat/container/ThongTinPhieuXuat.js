import { Col, Row } from "antd";
import Select from "components/Select";
import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import InputTimeout from "../../../../components/InputTimeout";
import TrangThaiPhieuXuat from "../../components/TrangThaiPhieuXuat";
import { openInNewTab } from "utils";

const ThongTinPhieuXuat = (
  { data = {}, edit, onChangeData = () => {} },
  ref
) => {
  const { listHinhThucNhapXuat } = useSelector(
    (state) => state.hinhThucNhapXuat
  );
  const { getListHinhThucNhapXuat } = useDispatch().hinhThucNhapXuat;

  useEffect(() => {
    getListHinhThucNhapXuat({ dsHinhThucNhapXuat: 20 });
  }, []);

  return (
    <>
      <TrangThaiPhieuXuat ticket={data} />
      <Row>
        <Col style={{ width: "20%" }}>
          <span>
            <b>Kho nhập: </b>
          </span>
          <span>{data.kho?.ten}</span>
        </Col>
        <Col style={{ width: "20%" }}>
          <span>
            <b>Tháng dự trù: </b>
          </span>
          <span>{data.thangDuTru && "Tháng " + data.thangDuTru}</span>
        </Col>
        <Col style={{ width: "20%" }}>
          <span>
            <b>Số phiếu: </b>
          </span>
          <span>{data.soPhieu}</span>
        </Col>
        <Col style={{ width: "20%" }}>
          <span>
            <b>Người tạo phiếu: </b>
          </span>
          <span>{data.nguoiTaoPhieu?.ten}</span>
        </Col>
        <Col style={{ width: "20%" }}>
          <span>
            <b>Người duyệt phát: </b>
          </span>
          <span>{data.nguoiDuyet?.ten}</span>
        </Col>
        <Col style={{ width: "20%" }}>
          <span style={{ width: "30%" }}>
            <b
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/hinh-thuc-nhap-xuat")}
            >
              Loại xuất:{" "}
            </b>
          </span>
          {edit ? (
            <Select
              placeholder="Loại xuất"
              bordered={false}
              data={listHinhThucNhapXuat}
              showArrow
              value={data.hinhThucNhapXuatId}
              style={{ width: "70%" }}
              onChange={onChangeData("hinhThucNhapXuatId")}
            />
          ) : (
            <span>{data.hinhThucNhapXuat?.ten}</span>
          )}
        </Col>
        <Col style={{ width: "20%" }}>
          <span>
            <b
              className="pointer"
              onClick={() => openInNewTab("/kho/quan-tri-kho")}
            >
              Kho xuất:{" "}
            </b>
          </span>
          <span>{data.khoDoiUng?.ten}</span>
        </Col>
        {/* <Col style={{ width: "20%" }}>
        <span>
          <b>Số phiếu đối ứng: </b>
        </span>
        <span></span>
      </Col> */}
        <Col style={{ width: "20%" }}>
          <span>
            <b>Ghi chú: </b>
          </span>
          <span>{data.ghiChu}</span>
        </Col>
        <Col style={{ width: "20%" }}>
          <span style={{ width: "30%" }}>
            <b>Lý do: </b>
          </span>
          {edit ? (
            <InputTimeout
              style={{ width: "70%" }}
              data={data.lyDo}
              onChange={onChangeData("lyDo")}
            />
          ) : (
            <span>{data.lyDo}</span>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ThongTinPhieuXuat;
