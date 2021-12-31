import React, { useRef, useEffect } from "react";
import { Row, Col } from "antd";
import HomeWrapper from "components/HomeWrapper";
import { Main } from "./styled";
import TimKiemBN from "pages/chanDoanHinhAnh/components/TimKiemBN";
// import DanhSachNBTiepTheo from "./DanhSachNBTiepTheo";
import DanhSachBN from "pages/chanDoanHinhAnh/components/DanhSachBN";
import ThongTinBN from "pages/chanDoanHinhAnh/components/ThongTinBN";
import DanhSachDichVu from "./DanhSachDichVu";
import stringUtils from "mainam-react-native-string-utils";
import { useDispatch } from "react-redux";

const ChoTiepDonCDHA = () => {
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
      <HomeWrapper title="Chẩn đoán hình ảnh">
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
            {/* <DanhSachNBTiepTheo /> */}
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

export default ChoTiepDonCDHA;
