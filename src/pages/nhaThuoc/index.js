import React, { useState, useEffect, useRef } from "react";
import { Main } from "./styled";
import HomeWrapper from "components/HomeWrapper";
import { Col, Row } from "antd";
import TimKiemDonThuoc from "pages/nhaThuoc/TimKiemDonThuoc";
import { connect, useDispatch } from "react-redux";
import DanhSachDonThuoc from "./DanhSachDonThuoc";
import stringUtils from "mainam-react-native-string-utils";

const NhaThuoc = (props) => {
  const refLayerHotKey = useRef(stringUtils.guid());
  const { onAddLayer, onRemoveLayer } = useDispatch().phimTat;

  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  return (
    <Main>
      <HomeWrapper title="Nhà thuốc" link="nha-thuoc">
        <Row xs={24}>
          <TimKiemDonThuoc layerId={refLayerHotKey.current} />
        </Row>
        <Row>
          <DanhSachDonThuoc layerId={refLayerHotKey.current} />
        </Row>
      </HomeWrapper>
    </Main>
  );
};

export default NhaThuoc;
