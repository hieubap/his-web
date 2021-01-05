import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Empty, Row, Col, Spin, Avatar, Divider, Icon } from "antd";
import { Main } from "./styled";
import avatarImage from "assets/img/avatar.png";
import ModalWebcam from "../ModalWebcam";
import { HOST } from "client/request";
const PatientInfo = (props) => {
  const {
    phong,
    khoa,
    maHoSo,
    gioiTinh,
    ngaySinh,
    chanDoan,
    tuoi,
    tenNb,
    giuong,
    maBenhAn,
    diaChi,
    bacSyDieuTri,
    avatar,
  } = props.patient;

  const refWebcame = useRef(null);
  const avatarLocal = avatar ? `${HOST}/api/patient/v1/files/${avatar}` : "";
  const imgAvata = avatarLocal ? avatarLocal : avatarImage;
  useEffect(() => {
    if (props.patientDocument) {
      props.searchPatient({ timKiem: props.patientDocument });
    }
  }, [props.patientDocument]);

  const showModal = () => {
    if (refWebcame.current)
      refWebcame.current.show({
        avatar: avatarLocal,
      });
  };

  const uploadImage = (fileUpload) => {
    return props.uploadAvatar({ fileUpload, id: props.patient.id });
  };

  return (
    <Main>
      <Card
        size={"small"}
        title={"Thông tin NB"}
        bordered={false}
        extra={
          <Link
            style={{ fontWeight: 500 }}
            to={`/app/patient-list/${props.patientDocument || ""}`}
          >
            Danh sách NB
          </Link>
        }
      >
        <Spin spinning={props.isLoadingSearchPatient}>
          <div className={"patient-information"}>
            {props.patient.id ? (
              <React.Fragment>
                <Row gutter={[12, 6]}>
                  <Col span={8}>
                    <span className="avatar-main">
                      <Avatar
                        src={imgAvata}
                        icon={"user"}
                        size={64}
                        shape={"square"}
                        alt=""
                      />
                      <Icon type={"camera"} onClick={showModal} />
                    </span>
                  </Col>

                  <Col span={16}>
                    <div className={"info-item name"}>{tenNb}</div>
                    <div className={"info-item"}>
                      {`(${gioiTinh}, ${new Date(
                        ngaySinh
                      ).getFullYear()},  ${tuoi} tuổi)`}
                    </div>
                    <div className={"info-item"}>Mã HS: {maHoSo}</div>
                  </Col>
                </Row>

                <Divider />

                <Row gutter={[12, 6]}>
                  <Col span={8}>
                    <span className="info-label">{"Mã BA: "}</span>
                  </Col>
                  <Col span={16}>
                    <span className="info-text">{maBenhAn || "- - -"}</span>
                  </Col>
                  <Col span={8}>
                    <span className="info-label">{"Địa chỉ: "}</span>
                  </Col>
                  <Col span={16}>
                    <span className="info-text">{diaChi}</span>
                  </Col>
                  <Col span={8}>
                    <span className="info-label">{"Khoa: "}</span>
                  </Col>
                  <Col span={16}>
                    <div className="info-text">
                      <span>{khoa}</span>
                      <p>
                        <span className="color-red">
                          {phong ? `${phong} -` : null}
                          {giuong ? `${giuong}` : null}
                        </span>
                      </p>
                    </div>
                  </Col>
                  <Col span={8}>
                    <span className="info-label">{"Chẩn đoán:"}</span>
                  </Col>
                  <Col span={16}>
                    <span className="info-text">{chanDoan || "- - -"}</span>
                  </Col>
                  <Col span={8}>
                    <span className="info-label">{"BS điều trị:"}</span>
                  </Col>
                  <Col span={16}>
                    <span className="info-text">{bacSyDieuTri || "- - -"}</span>
                  </Col>
                </Row>
              </React.Fragment>
            ) : (
              <Empty />
            )}
          </div>
        </Spin>
      </Card>
      <ModalWebcam
        ref={refWebcame}
        upload={uploadImage}
        title={"Upload avatar"}
        isLoading={props.isUploadingAvatar}
      />
    </Main>
  );
};

const mapState = (state) => ({
  patient: state.patient.patient || {},
  patientDocument: state.patient.patientDocument,
  isLoadingSearchPatient: state.patient.isLoadingSearchPatient || false,
  isUploadingAvatar: state.patient.isUploadingAvatar,
});

const mapDispatch = ({ patient: { searchPatient, uploadAvatar } }) => ({
  searchPatient,
  uploadAvatar,
});

export default connect(mapState, mapDispatch)(PatientInfo);
