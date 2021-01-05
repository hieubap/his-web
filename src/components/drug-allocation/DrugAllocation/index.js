import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { Main } from "./styled";
import PatientList from "../PatientList";
import DropListSearch from "../DropListSearch";
import InfoPatient from "../InfoPatient";
import DrugList from "../DrugList";

const DrugAllocation = (props) => {
  useEffect(() => {
    props.updateData({
      patients: [],
      departmentId: null,
      roomId: null,
      showLoadingDrug: false,
      isLoadingPatient: false,
      drug10: [],
      drug20: [],
      patient: null,
      date: new Date(),
    });
  }, []);

  const handleViewManageMedicine = () => {
    console.log("call me to view file ");
  };

  return (
    <Main>
      <div className="layout-body">
        <div className="layout-middle">
          <h2 className="title-list">Danh sách phát thuốc</h2>

          <div className={"head-control"}>
            <DropListSearch />
            {/*<Link to={'/app/files/'}>*/}
            {/*<Button>{'Xem phiếu phát thuốc'}</Button>*/}
            {/*</Link>*/}
          </div>

          <div className="layout-main">
            <div className="patient-list">
              <PatientList />
            </div>
            <div className="detail-patient">
              <InfoPatient />
            </div>
            <div className="drug-list">
              <DrugList />
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

const mapState = (state) => ({});

const mapDispatch = ({ drugAllocation: { updateData } }) => ({ updateData });

export default connect(mapState, mapDispatch)(DrugAllocation);
