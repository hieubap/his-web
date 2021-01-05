/* eslint-disable array-callback-return */
import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { Card, Row, Col, Checkbox, Radio, Spin, Button } from "antd";
import { useTranslation } from "react-i18next";
import ModalConfirmAllocation from "../ModalConfirmAllocation";
import ModalDetailAllocation from "../ModalDetailAllocation";

const DrugList = (props) => {
  const refConfirm = useRef(null);
  const refDetailAllocation = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (props.drug) {
      refDetailAllocation.current.show(props.drug, () => {
        props.updateData({
          drug: null,
        });
      });
    }
    return () => {
      props.updateData({
        drug: null,
      });
    };
  }, [props.drug]);
  const onChangeDrugType = (type) => {
    props.onChangeDrugType(type.target.value);
  };
  const onAllocation = () => {
    if (refConfirm.current) {
      refConfirm.current.show(() => {
        props.onAllocation();
      });
    }
  };
  const viewDetail = (item) => () => {
    if (props.feature === "distribution") {
      props.onViewDetailDrug(item.id);
    }
  };
  return (
    <Main>
      <Card
        title={t("drugDistributions.medicineList")}
        bordered={false}
        className="card-container"
      >
        {props.patient && (
          <>
            <Row className="action-header">
              <Col span={16} className="drug-info">
                <Radio.Group onChange={onChangeDrugType} value={props.drugType}>
                  <Radio value={20}>
                    {t("drugDistributions.normalMedicine")}
                  </Radio>
                  <Radio value={10}>
                    {t("drugDistributions.injectionMedicine")}
                  </Radio>
                </Radio.Group>
              </Col>
              <Col span={4} className="drug-quantity"></Col>
              <Col span={4} className="text-center">
                {t("drugDistributions.isDistributed")}
              </Col>
            </Row>
            <Spin className="drug-list" spinning={props.showLoadingDrug}>
              <div className="scroll-container">
                {props.drugs.map((item, index) => {
                  return (
                    <Row className="drug-item" key={item.id}>
                      <Col
                        span={16}
                        className="drug-info"
                        onClick={viewDetail(item)}
                        // onClick={() => showModal(true, item.id)}
                      >
                        <p className="drug-name">
                          {index + 1}/ {item.tenThuongMai}_{item.hamLuong} (
                          {item.tenHoatChat})
                        </p>
                        <span className="note">
                          {((item) => {
                            let text = "";
                            if (props.drugType === 20) {
                              text = item.lieuDung;
                              if (!text) {
                                text = item.cachDung;
                              }
                            } else {
                              if (item.lieuDung) text += item.lieuDung;
                              if (item.tocDoTruyen) {
                                if (text) text += "_";
                                text += item.tocDoTruyen;
                              }
                              if (item.donViTruyen) {
                                if (text) text += "_";
                                text += item.donViTruyen;
                              }
                            }
                            if (!text) {
                              if (item.cachDung) text = item.cachDung;
                            }
                            return text;
                          })(item)}
                        </span>
                      </Col>
                      <Col span={4} className="drug-quantity">
                        {item.soLuong} {item.donViTinh}
                      </Col>
                      <Col span={4} className="drug-distributed">
                        <Checkbox checked={item.daCapChoNb} />
                      </Col>
                    </Row>
                  );
                })}
              </div>
            </Spin>
            {props.drugs &&
            props.drugs.length &&
            props.feature === "allocation" ? (
              <Button
                type={"danger"}
                disabled={
                  props.showLoadingDrug ||
                  props.drugs.filter((item) => !item.daCapChoNb).length === 0
                }
                className="drug-allocation"
                onClick={onAllocation}
              >
                Phát thuốc
              </Button>
            ) : null}
          </>
        )}
      </Card>
      <ModalConfirmAllocation ref={refConfirm} />
      <ModalDetailAllocation ref={refDetailAllocation} />
    </Main>
  );
};

const mapState = (state) => ({
  showLoadingDrug: state.drugAllocation.showLoadingDrug,
  drugType: state.drugAllocation.drugType,
  drugs: state.drugAllocation["drug" + state.drugAllocation.drugType] || [],
  patient: state.drugAllocation.patient,
  feature: state.drugAllocation.feature,
  drug: state.drugAllocation.drug,
});

const mapDispatch = ({
  drugAllocation: {
    onChangeDrugType,
    onAllocation,
    onViewDetailDrug,
    updateData,
  },
}) => ({
  onChangeDrugType,
  onAllocation,
  onViewDetailDrug,
  updateData,
});

export default connect(mapState, mapDispatch)(DrugList);
