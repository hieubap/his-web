import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { Card, Input, List, Icon, Tooltip, Empty, Spin } from "antd";
import { useTranslation } from "react-i18next";
import ScanQrCode from "components/ScanQrCode";
import ScanButton from "assets/svg/scan-barcode.svg";

const PatientList = (props) => {
  const refQRCodeScaner = useRef(null);

  const refTimeout = useRef(null);
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { t } = useTranslation();
  useEffect(() => {
    props.updateData({
      textSearch: "",
    });
    props.onRefresh();
  }, []);

  const changeInput = (e) => {
    setState({ textSearch: e.target.value });
    props.updateData({
      textSearch: e.target.value || "",
    });
  };
  const submit = () => {
    if (refTimeout.current) {
      clearTimeout(refTimeout.current);
      refTimeout.current = null;
    }
    props.onRefresh();
  };

  const onSelectPatient = (patient) => {
    props.onSelectPatient(patient);
  };
  const onScanQRcode = () => {
    refQRCodeScaner.current.show((value) => {
      props.updateData({
        textSearch: value || "",
      });
      props.onRefresh();
    });
  };
  return (
    <Main>
      <Card
        title={t("drugDistributions.patientList")}
        bordered={false}
        className="card-container"
      >
        <div className="search-container">
          <Input
            value={props.textSearch || ""}
            placeholder={t("drugDistributions.searchPatientPlaceHolder")}
            prefix={
              <Icon
                type="search"
                style={{ color: "#125872" }}
                onClick={submit}
              />
            }
            className="input-search"
            onChange={changeInput}
            onPressEnter={submit}
          />
          <Tooltip placement="topLeft" title={"Scan"}>
            <ScanButton
              style={{ width: 65 }}
              onClick={onScanQRcode}
              className="button-scan"
              width={65}
              height={36}
            />
          </Tooltip>
        </div>
        <Spin spinning={props.isLoadingPatient}>
          {props.patients && props.patients.length > 0 ? (
            <List
              itemLayout="horizontal"
              dataSource={props.patients || []}
              className="scroll-container"
              renderItem={(item, index) => (
                <List.Item
                  key={index}
                  className={`patient-item ${
                    props.patient.id === item.id ? "selected-patient" : ""
                  }`}
                  onClick={() => onSelectPatient(item)}
                >
                  <List.Item.Meta
                    title={
                      <span>
                        {item.tenNb} - {item.tuoi} tuổi
                      </span>
                    }
                    description={`${t("drugDistributions.medicalCode")}/${t(
                      "drugDistributions.patientDocument"
                    )}: ${
                      item.maBenhAn !== null
                        ? item.maBenhAn
                        : item.maHoSo
                        ? item.maHoSo
                        : ""
                    }`}
                  />
                </List.Item>
              )}
            />
          ) : (
            <Empty description={t("drugDistributions.noData")} />
          )}
        </Spin>
      </Card>
      <ScanQrCode ref={refQRCodeScaner} />
    </Main>
  );
};

const mapState = (state) => {
  return {
    isLoadingPatient: state.drugAllocation.isLoadingPatient,
    patients: state.drugAllocation.patients || [],
    patient: state.drugAllocation.patient || {},
    textSearch: state.drugAllocation.textSearch || "",
  };
};

const mapDispatch = ({
  drugAllocation: { onRefresh, onSelectPatient, updateData },
}) => ({
  onRefresh,
  onSelectPatient,
  updateData,
});

export default connect(mapState, mapDispatch)(PatientList);
