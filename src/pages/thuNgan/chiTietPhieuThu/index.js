import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { ROLES } from "constants/index";
import AuthWrapper from "components/AuthWrapper";
import { Main, GlobalStyle } from "./styled";
import DanhSachPhieuThuNB from "./danhSachPhieuThuNB";
import ThongTinSoTien from "./thongTinSoTien";
import { Row, Col, Button } from "antd";
import MainHeaderSearch from "../timKiemBenhNhan/HeaderSearch";
import ThongTinBenhNhan from "./thongTinBenhNhan";
import ThongTinPhieuThu from "./thongTinPhieuThu";
import DanhSachDichVu from "./danhSachDichVu";
import MienGiam from "./MienGiam";
import ChuyenPhieu from "./chuyenPhieu";
import IconMienGiam from "assets/images/thuNgan/icMienGiam.png";
import IconChuyenPhieu from "assets/images/thuNgan/icChuyenPhieu.png";
import stringUtils from "mainam-react-native-string-utils";
import { useDispatch } from "react-redux";

const ChiTietPhieuThu = (props) => {
  const refLayerHotKey = useRef(stringUtils.guid());
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;

  const mienGiamRef = useRef(null);
  const chuyenPhieuRef = useRef(null);
  const {
    match: {
      params: { phieuThuId, nbDotDieuTriId },
    },
    searchAll,
    history
  } = props;
  useEffect(() => {
    searchAll({ nbDotDieuTriId, phieuThuId });
  }, [nbDotDieuTriId, phieuThuId]);
  const styles = {
    padding: "0 20px",
  };

  const onClickTaoMienGiam = () => {
    if (mienGiamRef.current) {
      mienGiamRef.current.show();
    }
  };

  const onClickChiaPhieuThu = () => {
    if (chuyenPhieuRef.current) {
      chuyenPhieuRef.current.show();
    }
  };
  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    onRegisterHotkey({
      layerId: refLayerHotKey.current,
      hotKeys: [
        // {
        //   keyCode: 121, //F10
        //   onEvent: () => {
        //     onClickChiaPhieuThu();
        //   },
        // },
        // {
        //   keyCode: 122, //F11
        //   onEvent: () => {
        //     onClickTaoMienGiam();
        //   },
        // },
      ],
    });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  return (
    <Main>
      <GlobalStyle />
      <MainHeaderSearch
        history={props.history}
        layerId={refLayerHotKey.current}
      />
      <Row className="info-partient">
        <Col xl={15} md={15} xs={24}>
          <ThongTinBenhNhan />
        </Col>
        <Col xl={4} md={4} xs={12} style={styles}>
          <AuthWrapper accessRoles={[ROLES["THU_NGAN"].DS_KHOAN_TIEN]}>
            <ThongTinSoTien nbDotDieuTriId={nbDotDieuTriId} />
          </AuthWrapper>
        </Col>
        <Col xl={5} md={5} xs={12}>
          <AuthWrapper accessRoles={[ROLES["THU_NGAN"].DS_TONG_HOP_PHIEU_THU]}>
            <DanhSachPhieuThuNB history={props.history} />
          </AuthWrapper>
        </Col>
      </Row>
      <Row className="bottom-content">
        <Col xl={19} md={19} xs={12} className="bottom-content__right">
          <AuthWrapper accessRoles={[ROLES["THU_NGAN"].DS_DICH_VU]}>
            <div className="bottom-content__wrapper-table">
              <Row className="bottom-content__header">
                <Col xs={12} className="bottom-content__title-right">
                  Danh sách dịch vụ
                </Col>
                <Col xs={12} className="bottom-content__btn-right">
                  <AuthWrapper accessRoles={[ROLES["THU_NGAN"].CHIA_PHIEU_THU]}>
                    <Button onClick={onClickChiaPhieuThu}>
                      Chia phiếu thu
                      <img src={IconChuyenPhieu} alt="IconChuyenPhieu" />
                    </Button>
                  </AuthWrapper>
                  {/* <Button>
                Xuất HDDT <img src={IconHDDT} />
              </Button> */}
                  <AuthWrapper accessRoles={[ROLES["THU_NGAN"].MIEN_GIAM]}>
                    <Button onClick={onClickTaoMienGiam}>
                      Tạo miễn giảm
                      <img src={IconMienGiam} alt="icontaomiengiam" />
                    </Button>
                  </AuthWrapper>
                </Col>
              </Row>
              <DanhSachDichVu layerId={refLayerHotKey.current} />
            </div>
          </AuthWrapper>
        </Col>
        <Col xl={5} md={5} xs={12}>
          <AuthWrapper accessRoles={[ROLES["THU_NGAN"].THONG_TIN_PHIEU_THU]}>
            <ThongTinPhieuThu
              phieuThuId={phieuThuId}
              nbDotDieuTriId={nbDotDieuTriId}
              layerId={refLayerHotKey.current}
            />
          </AuthWrapper>
        </Col>
      </Row>

      <MienGiam ref={mienGiamRef} modalCheckoutRef={mienGiamRef} />
      <ChuyenPhieu
        ref={chuyenPhieuRef}
        modalCheckoutRef={chuyenPhieuRef}
        history={props.history}
      />
    </Main>
  );
};

export default connect(
  (state) => {
    return {};
  },
  ({ danhSachDichVu: { searchAll } }) => ({
    searchAll,
  })
)(ChiTietPhieuThu);
