import React, { useEffect, useState, useRef } from "react";
import T from "prop-types";
import { connect } from "react-redux";
import { Spin, Icon, Pagination, Button, Input, Row, Col } from "antd";
import { Main } from "./styled";
import AddNewIcon from "assets/svg/addNew2.svg";
import { Table } from "components/common";

const PageHeader = (props) => {
  return (
    <Main>
      <div className="header">
        <div className="left-area">{props.leftArea}</div>
        <div className="right-area">{props.rightArea}</div>
      </div>
    </Main>
  );
};

const mapState = (state) => ({
  isLoadingRecordType: state.medicalRecord.isLoadingRecordType,
  dataRecordTypes: state.medicalRecord.dataRecordTypes || [],
  recordTypeTotal: state.medicalRecord.recordTypeTotal || 0,
  recordTypePage: state.medicalRecord.recordTypePage || 0,
  recordTypeSize: state.medicalRecord.recordTypeSize || 10,
  recordType: state.medicalRecord.recordType,
});

const mapDispatch = ({
  medicalRecord: { onSearchRecordType, onSizeChangeRecordType, getDetail },
}) => ({
  onSearchRecordType,
  onSizeChangeRecordType,
  getDetail,
});

export default connect(mapState, mapDispatch)(PageHeader);
