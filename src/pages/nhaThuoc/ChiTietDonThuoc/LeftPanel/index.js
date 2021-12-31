import React, { memo, useEffect, useMemo } from "react";
import ThongTinNguoiBenh from "./ThongTinNguoiBenh";
import DanhSach from "./DanhSach";
import { Main } from "./styledMain";
import { compose } from "redux";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import ThemMoi from "./ThemMoi";

const LeftPanel = (props) => {
  // const history = useHistory()
  // const isThemMoi = useMemo(() => {
  //   if(history.location.pathname.includes("them-moi")){
  //     return true
  //   } else {
  //     return false
  //   }
  // },[history])
  return (
    <Main className="container-fluid">
      {props.isThemMoi ? <ThemMoi {...props}/> : <ThongTinNguoiBenh {...props}/>}
      <DanhSach {...props}/>
    </Main>
  );
};

const mapDispatchToProps = () => ({
  
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect, memo)(LeftPanel);
