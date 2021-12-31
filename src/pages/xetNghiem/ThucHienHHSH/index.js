import React, { useRef, useEffect } from "react";
import { Row, Col } from "antd";
import HomeWrapper from "components/HomeWrapper";
import { Main } from "./styled";
import ChiTietDichVu from "../chiTietDichVu";
import DanhSachDichVu from "./DanhSachDichVu";
import DanhSachBN from "../components/danhSachBN";
import ThongTinBN from "../components/thongTinBN";
import TimKiemBN from "../components/timKiemBN";
import stringUtils from "mainam-react-native-string-utils";
import { useDispatch } from "react-redux";

const ThucHienHHSH = () => {
  const refLayerHotKey = useRef(stringUtils.guid());
  const { onAddLayer, onRemoveLayer } = useDispatch().phimTat;
  const { getThietLap } = useDispatch().thietLap;
  useEffect(() => {
    getThietLap({ ma: "NHOM_HUYET_HOC" });
    getThietLap({ ma: "NHOM_SINH_HOA" });
    getThietLap({ ma: "NHOM_SINH_HOA_TIM_MACH" });
    getThietLap({ ma: "NHOM_MIEN_DICH" });
    onAddLayer({ layerId: refLayerHotKey.current });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);
  const chiTietDVRef = useRef(null);
  const onShowInfo = (data) => {
    if (chiTietDVRef.current) {
      chiTietDVRef.current.show(data);
    }
  };
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
            <DanhSachBN layerId={refLayerHotKey.current} />
          </Col>
          <Col span={16} className="right">
            <DanhSachDichVu
              onShowInfo={onShowInfo}
              layerId={refLayerHotKey.current}
            />
          </Col>
        </Row>
      </HomeWrapper>
      <ChiTietDichVu ref={chiTietDVRef} layerId={refLayerHotKey.current} />
    </Main>
  );
};

export default ThucHienHHSH;
