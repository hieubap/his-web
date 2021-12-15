import React, { useEffect, useRef } from "react";
import { Row, Col } from "antd";
import HomeWrapper from "components/HomeWrapper";
import { Main } from "./styled";
import DanhSachDichVu from "./DanhSachDichVu";
import DanhSachBN from "./danhSachBN";
import ThongTinBN from "../components/thongTinBN";
import TimKiemBN from "../components/timKiemBN";
import DanhSachNBTiepTheo from "./DanhSachNBTiepTheo";
import { checkRole } from "app/Sidebar/constant";
import { ROLES } from "constants/index";
import stringUtils from "mainam-react-native-string-utils";
import { useDispatch } from "react-redux";

const TiepNhanMauXN = () => {
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
      <HomeWrapper title="Xét nghiệm">
        <Row>
          <Col span={8} className="left">
            <TimKiemBN layerId={refLayerHotKey.current} />
          </Col>
          <Col span={16} className="right">
            <ThongTinBN layerId={refLayerHotKey.current} />
          </Col>
        </Row>
        <Row>
          <Col span={8} className="left">
            {checkRole([ROLES["XET_NGHIEM"].DS_NB_TIEP_THEO]) && (
              <DanhSachNBTiepTheo layerId={refLayerHotKey.current} />
            )}
            <DanhSachBN layerId={refLayerHotKey.current} />
          </Col>
          <Col span={16} className="right">
            <DanhSachDichVu layerId={refLayerHotKey.current} />
          </Col>
        </Row>
      </HomeWrapper>
    </Main>
  );
};

export default TiepNhanMauXN;
