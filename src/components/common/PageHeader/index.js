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

export default PageHeader;
