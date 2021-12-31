import { Col, Row, Select } from "antd";
import Breadcrumb from "components/Breadcrumb";
import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import TTCoBan from "./containers/TTCoBan";
import Content from "./Content";
import { Main } from "./styled";

const { Option } = Select;

const ChiTiet = ({
  getThongTinNBTheoNbThongTinId,
  getThongTinNBDotDieuTri,
  getDvKt,
}) => {
  const updateData = useDispatch().hoSoBenhAn.updateData
  const getListDichVuThuoc = useDispatch().chiDinhDichVuKho.getListDichVuThuoc
  const getListDichVuVatTu = useDispatch().hoSoBenhAn.getListDichVuVatTu
  const nbDotDieuTriId = useSelector(state => state.hoSoBenhAn.nbDotDieuTriId)
  const search = window.location.pathname.split("/");
  const id = search[search.length - 1];
  
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  useEffect(() => {
    getThongTinNBTheoNbThongTinId((params?.id || id)).then((res) => {
      getThongTinNBDotDieuTri(res.id);
      getDvKt({ nbDotDieuTriId: res.id });
      if(params?.maHoSo){
        updateData({ selectedMaHs: params?.maHoSo });
      }
    });
  }, []);
  useEffect(() => {
    nbDotDieuTriId && getListDichVuThuoc({nbDotDieuTriId})
    nbDotDieuTriId && getListDichVuVatTu({nbDotDieuTriId})
  }, [nbDotDieuTriId,getListDichVuVatTu]);
  return (
    <Main>
      <Breadcrumb
        chains={[
          { title: "Hồ sơ bệnh án", link: "/ho-so-benh-an" },
          {
            title: "Danh sách người bệnh",
            link: "/ho-so-benh-an/danh-sach-nguoi-benh",
          },
        ]}
      >
        <Row>
          <Col span={24}>
            <div className="header-screen">
              <h3>Lịch sử khám bệnh</h3>
            </div>
            <TTCoBan />
            <Content />
          </Col>
        </Row>
      </Breadcrumb>
    </Main>
  );
};

export default connect(
  null,
  ({
    nbDotDieuTri: {
      getThongTinNBTheoNbThongTinId,
      getThongTinNBDotDieuTri,
      searchNBDotDieuTri,
    },
    hoSoBenhAn: { getDvKt },
  }) => ({
    getThongTinNBTheoNbThongTinId,
    getThongTinNBDotDieuTri,
    getDvKt,
  })
)(ChiTiet);
