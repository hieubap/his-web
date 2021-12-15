import { Row, Col , Input} from "antd";
import React, { useEffect } from "react";
import MainBox from "pages/danhMuc/thietLapPhieuIn/components/MainBox";
import { Main , InputSearch} from "./styled";
import { HomeWrapper } from "components";
import { connect } from "react-redux";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
const ThietLapPhieuIn = (props) => {
  const { getUtils, getDanhSachPhieuIn } = props;

  useEffect(() => {
    getUtils({ name: "LoaiPhongHangDoi" });
    getUtils({ name: "DoiTuongHangDoi" });
    getDanhSachPhieuIn({})
  }, []);

  return (
    <Main>
      <HomeWrapper title="Thiết lập">
        <Row style={{ width: "100%" }}>
          <Col span={24}>
            <div className="title-page">Thiết lập phiếu tại các màn hình</div>
            <MainBox></MainBox>
          </Col>
        </Row>
      </HomeWrapper>
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    utils: { listLoaiPhongHangDoi = [], listDoiTuongHangDoi = [] },
  } = state;

  return {
    listLoaiPhongHangDoi,
    listDoiTuongHangDoi,
  };
};
const mapDispatchToProps = ({ utils: { getUtils }, 
  thietLapPhieuIn: {getDanhSachPhieuIn}

}) => ({
  getUtils,
  getDanhSachPhieuIn
});
export default connect(mapStateToProps, mapDispatchToProps)(ThietLapPhieuIn);
