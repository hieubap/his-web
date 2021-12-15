import React, { memo, useEffect } from "react";
import InfoRegister from "./InfoRegister";
import SearchService from "./SearchService";
import { Main } from "./styledMain";
import { compose } from "redux";
import { connect } from "react-redux";

const LeftPanel = (props) => {
  const { getUtils, id } = props;
  useEffect(() => {
    getUtils({ name: "gioiTinh" });
  }, []);
  return (
    <Main className="container-fluid">
      <InfoRegister id={id} />
      <SearchService id={id} />
    </Main>
  );
};

const mapDispatchToProps = ({ utils: { getUtils } }) => ({
  getUtils,
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect, memo)(LeftPanel);
