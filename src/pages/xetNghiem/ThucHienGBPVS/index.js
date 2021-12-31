import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "antd";
import { Main } from "./styled";
import DanhSachDichVu from "./danhSachDichVu";
import DanhSachBN from "../components/danhSachBN";
import ThongTinBN from "../components/thongTinBN";
import TimKiemBN from "../components/timKiemBN";
import HomeWrapper from "components/HomeWrapper";
import ThongTinDichVu from "./thongTinDichVu";
import stringUtils from "mainam-react-native-string-utils";
import { useDispatch } from "react-redux";

const ThucHienGBPVS = (props) => {
  const refLayerHotKey = useRef(stringUtils.guid());
  const { onAddLayer, onRemoveLayer } = useDispatch().phimTat;
  const { getThietLap } = useDispatch().thietLap;

  const {
    xnGiaiPhauBenhViSinh: { infoDichVu },
  } = useSelector((state) => state);
  useEffect(() => {
    getThietLap({ ma: "NHOM_GIAI_PHAU_BENH" });
    getThietLap({ ma: "NHOM_VI_SINH" });
    onAddLayer({ layerId: refLayerHotKey.current });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);
  return (
    <Main>
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
              <DanhSachBN layerId={refLayerHotKey.current} />
              <DanhSachDichVu layerId={refLayerHotKey.current} />
            </Col>
            <Col span={16} className="right">
              <ThongTinDichVu
                infoDichVu={infoDichVu}
                layerId={refLayerHotKey.current}
              />
            </Col>
          </Row>
        </HomeWrapper>
      </Main>
    </Main>
  );
};

export default ThucHienGBPVS;
