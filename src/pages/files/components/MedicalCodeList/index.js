import React, { useEffect, useState } from "react";
import { Select, Radio, Row, Col } from "antd";
import { connect } from "react-redux";
import moment from "moment";

import { Main } from "./styled";

const MedicalCodeList = ({ getMedicalCodeList, patient, ...props }) => {
  const { patientValue } = props.patient;
  const medicalCodeList = props.medicalCodeList;
  const [selectedMedicalCode, getMedicalCodeSelected] = useState();
  const [patientType, setPatientType] = useState("outPatient");
  const [listLocalMedicalCode, setLocalList] = useState([]);
  const { Option } = Select;

  useEffect(() => {
    getMedicalCodeList(patientValue);
  }, [patientValue]);

  useEffect(() => {
    getListType();
  }, [patientType]);

  const getListType = () => {
    let listLocalMedicalCode;

    if (patientType === "inPatient") {
      listLocalMedicalCode =
        medicalCodeList && medicalCodeList.filter((item) => item.inpatient);
    } else if (patientType === "outPatient") {
      listLocalMedicalCode =
        medicalCodeList && medicalCodeList.filter((item) => !item.inpatient);
    }
    setLocalList(listLocalMedicalCode);
    const defaultMedicalCode =
      listLocalMedicalCode &&
      listLocalMedicalCode.length === 1 &&
      listLocalMedicalCode[0].patientDocument;
    getMedicalCodeSelected(defaultMedicalCode);
  };

  const handleChange = (value) => {
    getMedicalCodeSelected(value);
  };

  const changePatientType = (e) => {
    setPatientType(e.target.value);
    getMedicalCodeSelected(null);
  };

  return (
    <Main>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Radio.Group
            defaultValue="outPatient"
            buttonStyle="solid"
            className="radio-group"
          >
            <Radio.Button value="outPatient" onChange={changePatientType}>
              Ngoại trú
            </Radio.Button>
            <Radio.Button value="inPatient" onChange={changePatientType}>
              Nội trú
            </Radio.Button>
          </Radio.Group>
        </Col>

        <Col span={24}>
          <Select
            placeholder="Chọn mã hồ sơ"
            onChange={handleChange}
            className="list-medical-code"
            value={selectedMedicalCode || undefined}
          >
            {listLocalMedicalCode &&
              listLocalMedicalCode.length &&
              listLocalMedicalCode.map((item) => {
                const timeGoIn = moment(item.timeGoIn).format("DD/MM/YYYY");
                const timeGoOut = item.timeGoOut
                  ? moment(item.timeGoOut).format("DD/MM/YYYY")
                  : null;
                const patientMedicalCode = item.patientDocument;
                return (
                  <Option key={patientMedicalCode} value={patientMedicalCode}>
                    <span className="medical-name">
                      Mã bệnh án: {item.patientDocument}
                    </span>
                    <p>
                      ({`${timeGoIn} ${timeGoOut ? ` - ${timeGoOut}` : ""}`})
                    </p>
                  </Option>
                );
              })}
          </Select>
        </Col>
      </Row>
    </Main>
  );
};

const mapState = (state) => ({
  patient: state.patient.patient,
  medicalCodeList: state.patient.medicalCodeList,
});

const mapDispatch = ({
  patient: { getMedicalCodeList, getMedicalCodeSelected },
}) => ({
  getMedicalCodeList,
});

export default connect(mapState, mapDispatch)(MedicalCodeList);
