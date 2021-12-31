import React, { useEffect } from "react";
import { Main } from "./styled";
import { Row } from "antd";
import TimKiemPhieuXuat from "pages/kho/components/TimKiemPhieuXuat";
import DanhSachPhieuXuat from "pages/kho/components/DanhSachPhieuXuat";
import Breadcrumb from "components/Breadcrumb";
import MainPage from "../components/MainPage";
import { useDispatch, useSelector } from "react-redux";

const XuatKho = (props) => {
  const {
    kho: { getTheoTaiKhoan },
  } = useDispatch();
  useEffect(() => {
    getTheoTaiKhoan({});
  }, []);
  return (
    <Main>
      <Row className="top-level-category" justify="space-between">
        <Breadcrumb
          chains={[
            { title: "Kho", link: "/kho" },
            { title: "Xuất kho", link: "/kho/xuat-kho" },
          ]}
        ></Breadcrumb>
      </Row>
      <MainPage title={<>Danh sách phiếu xuất</>}>
        <Row xs={24}>
          <TimKiemPhieuXuat />
        </Row>
        <Row>
          <DanhSachPhieuXuat />
        </Row>
      </MainPage>
    </Main>
  );
};

export default XuatKho;
