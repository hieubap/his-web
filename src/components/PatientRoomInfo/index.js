import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import Rooms from "./components/Rooms";
import NursingList from "./components/NursingList";
import DropListSearch from "./components/DropListSearch";
import { Row, Col, Button, Icon } from "antd";
import { useTranslation } from "react-i18next";
import AddNewIcon from "assets/svg/addNew.svg";
const ClinicInfo = (props) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    props.getAllNursing();
  }, []);

  const showModal = (type) => {
    setVisible(!!type);
  };
  return (
    <Main>
      <div className="layout-body">
        <div className="layout-middle">
          <h2 className="title-list">{t("patientRoom.titlePage")}</h2>
          <DropListSearch />
          <Row gutter={12}>
            <Col span={8}>
              <Rooms />
            </Col>
            <Col span={8}>
              <NursingList
                visible={visible || false}
                showModal={showModal}
                title={
                  <div className="title-container">
                    <span>{t("patientRoom.nursingIncharge")}</span>
                    {
                       <Button className="btn-add" type="primary" onClick={showModal}><Icon component={AddNewIcon} />Thêm điều dưỡng</Button>
                    }
                  </div>
                }
              />
            </Col>
          </Row>
        </div>
      </div>
    </Main>
  );
};

const mapDispatch = ({ patientRoom: { getAllNursing } }) => ({
  getAllNursing,
});

export default connect(null, mapDispatch)(ClinicInfo);
