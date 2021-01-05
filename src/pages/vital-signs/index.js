import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { VitalSigns } from "./components";
import { Spin } from "antd";
import { useParams, useHistory } from "react-router-dom";

const VitalSignsMain = (props) => {
  const params = useParams();
  const history = useHistory();
  const patientDocument = params.patientDocument;

  useEffect(() => {
    props.getDataVitalSigns(patientDocument);
    props.getAllVitalSignsCategory();
    props.updatePatientDocument(patientDocument);
    props.setCurrentFuction("CNS");

    return () => {
      props.updateData({ values: null, moreValueIds: null });
    };
  }, []);
  useEffect(() => {
    if (
      props.patientDocument &&
      params.patientDocument != props.patientDocument
    ) {
      window.location.href = `/app/vital-signs/${props.patientDocument}`;
    }
  }, [props.patientDocument]);

  return (
    <Main>
      <div className="layout-body">
        <div className="layout-middle">
          <Spin spinning={props.isLoading}>
            <VitalSigns />
          </Spin>
        </div>
      </div>
    </Main>
  );
};

const mapState = (state) => ({
  isLoading: state.vitalSigns.isLoading,
  patientDocument: state.patient.patientDocument,
});

const mapDispatch = ({
  vitalSigns: { getDataVitalSigns, getAllVitalSignsCategory, updateData },
  patient: { updatePatientDocument },
  application: { setCurrentFuction },
}) => ({
  getDataVitalSigns,
  getAllVitalSignsCategory,
  updateData,
  updatePatientDocument,
  setCurrentFuction,
});

export default connect(mapState, mapDispatch)(VitalSignsMain);
