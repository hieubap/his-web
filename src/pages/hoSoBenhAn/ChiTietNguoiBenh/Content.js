import { Col, Row, Select, Tabs } from "antd";
import Breadcrumb from "components/Breadcrumb";
import React, { useState } from "react";
import DsDichVu from "./containers/DsDichVu";
import ThuocHoSoBenhAn from "./containers/ThuocHoSoBenhAn";
import VatTuHoSoBenhAn from "./containers/VatTuHoSoBenhAn";
import HoSoKhamBenh from "./containers/HoSoKhamBenh";
import LichSuKham from "./containers/LichSuKham";
import TTCoBan from "./containers/TTCoBan";
import { Body } from "./styled";

const { Option } = Select;

const Content = ({ ...props }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Body>
      <div className="left-body">
        <LichSuKham />
      </div>
      <div className="right-body">
        <Tabs
          defaultActiveKey={activeTab}
          onChange={(tab) => {
            setActiveTab(tab);
          }}
        >
          <Tabs.TabPane tab="Hồ sơ khám chữa bệnh" key={1}>
              <HoSoKhamBenh />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Danh sách dịch vụ" key={2}>
              <DsDichVu />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Danh sách thuốc" key={3}>
              <ThuocHoSoBenhAn />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Danh sách vật tư" key={4}>
              <VatTuHoSoBenhAn />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Body>
  );
};

export default Content;
