import React, { memo, useEffect } from "react";
import ThongTinDonThuoc from "./ThongTinDonThuoc";
import { Main } from "./styledMain";
import { compose } from "redux";
import { connect } from "react-redux";
const RightPanel = (props) => {
  return (
    <Main className="service-welcome">
      <ThongTinDonThuoc {...props}/>
    </Main>
  );
};

const mapStateToProps = (state) => {
};
const mapDispatchToProps = ({
}) => ({
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(RightPanel);
