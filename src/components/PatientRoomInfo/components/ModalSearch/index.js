import React from "react";
import { Main, CustomModalPatientRoom } from "./styled";
import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import NursingAll from "./NursingAll";
import NursingSelected from "../NursingList";
import T from "prop-types";
const ModalSearch = ({ showModal, visible }) => {
  const { t } = useTranslation();

  const handleOk = () => {
    showModal(false);
  };

  const handleCancel = () => {
    showModal(false);
  };

  return (
    <CustomModalPatientRoom
      visible={visible}
      onOk={handleOk}
      okText={t("drugDistributions.close")}
      cancelText={""}
      onCancel={handleCancel}
      style={{ minWidth: 992 }}
      footer={[]}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Main>
        <div className="modal-search">
          <div className="title">
            <h4>Chỉ định điều dưỡng</h4>
          </div>
          <div className="nursing-container">
            <Row gutter={[24, 12]}>
              <Col span={12}>
                <NursingAll visible={visible} />
              </Col>
              <Col span={12}>
                <NursingSelected
                  title={null}
                  total
                />
              </Col>
            </Row>
          </div>
        </div>
      </Main>
    </CustomModalPatientRoom>
  );
};

ModalSearch.defaultProps = {
  showModal: () => {},
  visible: false,
};

ModalSearch.propTypes = {
  showModal: T.func,
  visible: T.bool,
};

export default ModalSearch;
