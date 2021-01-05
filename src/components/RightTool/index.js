import React, { useState, useEffect } from "react";
import { Card, Row, Icon } from "antd";
import PatientInfo from "components/PatientInfo";
import SearchRightSide from "./SearchRightSide";
import { Main } from "./styled";
import { connect } from "react-redux";
import CollapseLayout from "components/RightTool/CollapsedLayout";
import ListFunction from "./ListFunction";
const RightTool = ({ patient, ...props }) => {
  useEffect(() => {
    if (props.windowWidth < 1300) {
      props.updateData({
        therapyRightToolCollapse: true,
      });
    } else {
      props.updateData({
        therapyRightToolCollapse: false,
      });
    }
  }, [props.windowWidth]);
  const collapse = () => {
    console.log(props.therapyRightToolCollapse);
    props.updateData({
      therapyRightToolCollapse: !props.therapyRightToolCollapse,
    });
  };
  return (
    <Main
      collapse={props.therapyRightToolCollapse}
      className={props.therapyRightToolCollapse ? "is-collapse" : ""}
    >
      {props.therapyRightToolCollapse ? (
        <CollapseLayout patient={patient} />
      ) : (
        <div className="expand-area">
          <div className="sidebar-inner">
            {props.currentFunction !== "TREATMENT" && <SearchRightSide />}

            <PatientInfo />

            <div>
              {patient && (
                <Card size={"small"} bordered={false} title={"Chức năng"}>
                  <Row gutter={[12, 12]}>
                    <ListFunction />
                  </Row>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}
      <div
        className={
          "collapse-bar " +
          (props.therapyRightToolCollapse ? "is-collapse" : "")
        }
        onClick={collapse}
      >
        <Icon type="right" style={{ fontSize: 10 }} />
      </div>
    </Main>
  );
};
const mapState = (state) => ({
  patient: state.patient.patient,
  therapyRightToolCollapse: state.application.therapyRightToolCollapse,
  windowWidth: state.application.width,
  currentFunction: state.application.currentFunction,
});

export default connect(mapState, ({ application: { updateData } }) => ({
  updateData,
}))(RightTool);
