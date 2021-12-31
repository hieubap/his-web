import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Main } from "./styled";
import Breadcrumb from "components/Breadcrumb";
import { Button, Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ThongTinHoaDon from "../component/thongTinHoaDon/ThongTinHoaDon";
import TableDsDichVu from "../component/tableDsDichVu";
import Icon from "@ant-design/icons";
import IconList from "assets/svg/iconList.svg";
import IconXuatHd from "assets/svg/thuNgan/iconXuatHd.svg";
import IconDelete from "assets/svg/kho/delete.svg";
const TaoHoaDonDienTu = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { getDsDichVu } = dispatch.dsHoaDonDienTu;
  const { nbDotDieuTri } = useSelector((state) => state.dsHoaDonDienTu);
  const { thongTinBenhNhan } = useSelector((state) => state.nbDotDieuTri);
  const { getThongTinNBDotDieuTri } = dispatch.nbDotDieuTri;
  useEffect(() => {
    getThongTinNBDotDieuTri(30109);
    getDsDichVu({ id: 30109 }).then((s) => {
      setState({ dsDichVu: s.data });
    });
  }, []);
  const handleRedirect = () => {
    history.push("/thu-ngan/ds-hoa-don-dien-tu");
  };
  return (
    <Main>
      <Breadcrumb
        chains={[
          { title: "Thu ngân", link: "/thu-ngan" },
          {
            title: "Hóa đơn điện tử",
            link: "/thu-ngan/ds-hoa-don-dien-tu",
          },
        ]}
      >
        <Col span={24} className="header-title">
          <div className="title">
            <span>Chi tiết hóa đơn</span>{" "}
            <Icon component={IconList} onClick={handleRedirect}></Icon>
            <Icon component={IconDelete}></Icon>
          </div>
        </Col>
        <Col span={24}>
          <Row gutter={10}>
            <Col span={18} className="ds-dich-vu">
              <TableDsDichVu
                dsDichVu={state.dsDichVu}
                isChiTiet={true}
              ></TableDsDichVu>
            </Col>
            <Col span={6} className="info">
              <ThongTinHoaDon
                thongTinBenhNhan={thongTinBenhNhan}
                isChiTiet={true}
              ></ThongTinHoaDon>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <div className="footer-button">
            <Button className="btn-cancel">Xem hóa đơn nháp</Button>
            <Button className="btn-ok">
              Xuất hóa đơn <Icon component={IconXuatHd}></Icon>
            </Button>
          </div>
        </Col>
      </Breadcrumb>
    </Main>
  );
};

export default TaoHoaDonDienTu;
