import React, { useEffect } from "react";

import { MainNotifiSearch } from "./styled";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import IconSearch from "assets/images/thuNgan/icSearch.png";
const TimKiemBenhNhan = (props) => {
  useEffect(() => {}, []);

  return (
    <MainNotifiSearch>
      <Row>
        <img src={IconSearch} alt="iconSearch" />
        <div className="title">
          Vui lòng tìm kiếm người bệnh hoặc nhấn gọi NB tiếp theo để tiếp tục
          thanh toán!
        </div>
      </Row>
    </MainNotifiSearch>
  );
};
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = ({}) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TimKiemBenhNhan);
