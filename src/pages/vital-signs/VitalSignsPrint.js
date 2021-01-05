import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import Page from "./Page";
import { Spin } from "antd";
const VitalSignsPrint = (props) => {
  // const [state, _setState] = useState({});
  // const setState = (data = {}) => {
  //   _setState((state) => {
  //     return { ...state, ...data };
  //   });
  // };

  useEffect(() => {
    let patientDocument = props.match?.params?.patientDocument;
    props.getDataToPrint({ patientDocument });
  }, []);
  useEffect(() => {
    if (props.patient && props.values) {
      setTimeout(() => {
        window.print();
        window.close();
      }, 500);
    }
  }, [props.values, props.patient]);

  let newValues = [];
  props.values.forEach((item, index) => {
    let _index = parseInt(index / 9);
    if (!newValues[_index]) newValues[_index] = [];
    newValues[_index].push(item);
  });
  if (newValues.length === 0) newValues = [[]];
  if (!props.patient) return null;
  return (
    <Main>
      <Spin spinning={props.isLoadingPrint}>
        {newValues.map((values, index) => {
          return (
            <Page
              moreValueIds={props.moreValueIds}
              vitalSignsCategories={props.vitalSignsCategories}
              key={index}
              data={props.patient}
              values={values}
              style={{}}
            />
          );
        })}
      </Spin>
    </Main>
  );
};

const mapState = (state) => {
  let dataPrint = state.vitalSigns.dataPrint || {};
  return {
    isLoadingPrint: state.vitalSigns.isLoadingPrint,
    values: dataPrint.values || [],
    patient: dataPrint.patient,
    moreValueIds: dataPrint.moreValueIds || [],
    vitalSignsCategories: state.vitalSigns.vitalSignsCategories || [],
  };
};

const mapDispatch = ({ vitalSigns: { getDataToPrint } }) => ({
  getDataToPrint,
});

export default connect(mapState, mapDispatch)(VitalSignsPrint);
