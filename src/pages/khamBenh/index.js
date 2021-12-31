import React, { useRef, useEffect } from "react";
import { Row, Col } from "antd";
import { Main } from "./styled";
import HomeWrapper from "components/HomeWrapper";
import TimKiemBN from "./components/TimKiemBN";
import LayDSBN from "./components/TimKiemBN/LayDsBN";
import LichSuKham from "./components/LichSuKham";
import ThongTinBN from "./components/ThongTinNB";
import SoLuongBN from "./components/SoLuongBN";
import ThongTin from "./ThongTin";
import stringUtils from "mainam-react-native-string-utils";
import { useDispatch } from "react-redux";
function KhamBenh() {
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
      <HomeWrapper title="Khám bệnh">
        <Row style={{ width: "100%" }}>
          <Col span={8} className="paddingRight">
            <TimKiemBN layerId={refLayerHotKey.current} />
            <ThongTinBN layerId={refLayerHotKey.current} />
            <LichSuKham layerId={refLayerHotKey.current} />
          </Col>
          <Col span={16} className="paddingLeft">
            <Row>
              <Col span={10}>
                <LayDSBN layerId={refLayerHotKey.current} />
              </Col>
              <Col span={14}>
                <SoLuongBN layerId={refLayerHotKey.current} />
              </Col>
              <Col span={24} className="marginTop">
                <ThongTin layerId={refLayerHotKey.current} />
              </Col>
            </Row>
          </Col>
        </Row>
      </HomeWrapper>
    </Main>
  );
}

export default KhamBenh;
