import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { Card, Row, Col } from "antd";
import { useTranslation } from "react-i18next";

const PatientList = (props) => {
  const { t } = useTranslation();

  useEffect(() => {
    console.log('props: ', props);
  }, [props]);

  return (
    <Main>
      <Card
        title={t("drugDistributions.infoPatient")}
        bordered={false}
        className="card-container"
      >
        {props.patient ? (
          <div className="info-container">
            <h4 className="patient-name">
              {props.patient.tenNb} ({props.patient.gioiTinh},{" "}
              {props.patient.ngaySinh?.toDateObject().format("yyyy")} -{" "}
              {props.patient.tuoi} {t("drugDistributions.age")})
            </h4>
            <Row className="info-item">
              <Col span={8} className="title-info">
                {t("drugDistributions.patientCode")}
              </Col>
              <Col span={14} className="content-info">
                {props.patient.maNb}
              </Col>
            </Row>
            <Row className="info-item">
              <Col span={8} className="title-info">
                {t("drugDistributions.patientDocument")}
              </Col>
              <Col span={16} className="content-info">
                {props.patient.maHoSo}
              </Col>
            </Row>
            {props.patient.diaChi && (
              <Row className="info-item">
                <Col span={8} gutter={[220]} className="title-info">
                  {t("drugDistributions.address")}
                </Col>
                <Col span={16} className="content-info">
                  {props.patient.diaChi}
                </Col>
              </Row>
            )}
            <Row className="info-item">
              <Col span={8} className="title-info">
                {t("drugDistributions.department")}
              </Col>
              <Col span={16} className="content-info">
                {props.patient.khoa && (
                  <p className="department">{props.patient.khoa}</p>
                )}
                {(props.patient.phong || props.patient.giuong) && (
                  <span className="room">
                    {((patient) => {
                      let text = patient.phong || "";
                      if (patient.giuong) {
                        if (text) text += " - ";
                        text += `${t("drugDistributions.bed")}: ${
                          patient.giuong
                        }`;
                      }
                      return text;
                    })(props.patient)}
                  </span>
                )}
              </Col>
            </Row>
            {props.patient.bacSyDieuTri && (
              <Row className="info-item">
                <Col span={8} className="title-info">
                  {t("drugDistributions.doctor")}
                </Col>
                <Col span={16} className="content-info">
                  {props.patient.bacSyDieuTri}
                </Col>
              </Row>
            )}
            {props.patient.chanDoan && (
              <Row className="info-item">
                <Col span={8} className="title-info">
                  {t("drugDistributions.diagnose")}
                </Col>
                <Col span={16} className="content-info">
                  {props.patient.chanDoan}
                </Col>
              </Row>
            )}
          </div>
        ) : (
          ""
        )}
      </Card>
    </Main>
  );
};

const mapState = (state) => ({
  patient: state.drugAllocation.patient,
});

export default connect(mapState, null)(PatientList);
