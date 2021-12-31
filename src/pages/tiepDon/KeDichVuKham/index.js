import React, { useRef } from "react";
import { Col } from "antd";
import LeftPanel from "components/TiepDon/KeDichVu/LeftPanel";
import RightPanel from "components/TiepDon/KeDichVu/RightPanel";
import { Main } from "./styled";

const KeDichVuKham = (props) => {
  return (
    <Main>
      <Col md={24} xl={16} xxl={16} className="body">
        <LeftPanel />
      </Col>
      <Col md={24} xl={8} xxl={8} className="bg-color">
        <RightPanel />
      </Col>
    </Main>
  );
};

export default KeDichVuKham;
