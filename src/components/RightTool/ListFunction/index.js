import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Col, Icon } from "antd";
import { applications } from "../constants";
import { Main } from "./styled";
import { connect } from "react-redux";
import ModalUploadForm from "components/Scan/ModalUploadForm";
const ListFunction = ({ patient, ...props }) => {
  const refModalUploadForm = useRef(null);
  const [localApps, setLocalApp] = useState([]);

  useEffect(() => {
    const apps = applications.filter((item) =>
      item.display.includes(process.env.REACT_APP_APP)
    );
    setLocalApp(apps);
  }, []);
  const showScanModal = () => {
    refModalUploadForm.current.show({}, (id, data) => {});
  };
  return (
    <Main className={props.therapyRightToolCollapse ? "is-collapse" : ""}>
      {localApps.map((item, index) => {
        return (
          <Col span={props.colSpan || 6} key={index}>
            {item.href ? (
              <a href={item.href}>
                <div className={`menu-app-item`}>
                  <span className="icon-app">
                    <Icon component={item.icon} />
                  </span>

                  <span className="text-app">{item.name}</span>
                </div>
              </a>
            ) : item.name == "SCAN" ? (
              <div
                onClick={showScanModal}
                className={`menu-app-item ${
                  item.name === props.currentFunction ? "selected" : ""
                }`}
              >
                <span className="icon-app">
                  <Icon component={item.icon} />
                </span>

                <span className="text-app">{item.name}</span>
              </div>
            ) : (
              <Link to={`${item.link}/${patient?.maHoSo}`} title={item.name}>
                <div
                  className={`menu-app-item ${
                    item.name === props.currentFunction ? "selected" : ""
                  }`}
                >
                  <span className="icon-app">
                    <Icon component={item.icon} />
                  </span>

                  <span className="text-app">{item.name}</span>
                </div>
              </Link>
            )}
          </Col>
        );
      })}
      <ModalUploadForm
        wrappedComponentRef={refModalUploadForm}
        needResetPatient={false}
      />
    </Main>
  );
};
const mapState = (state) => ({
  patient: state.patient.patient,
  currentFunction: state.application.currentFunction,
  therapyRightToolCollapse: state.application.therapyRightToolCollapse,
});

export default connect(mapState, null)(ListFunction);
