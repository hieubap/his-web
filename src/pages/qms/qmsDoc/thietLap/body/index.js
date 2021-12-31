import React, { memo } from "react";
import { StyleBody } from "./styled";
import TopContent from "./TopContent";
import MiddleContent from "./MiddleContent";
import { connect } from "react-redux";

function Body(props) {
  const {
    dataSearch
  } = props;

  return (
    <StyleBody
    >
      <TopContent
      />
       {dataSearch.loaiQms && dataSearch.phongId && 
      <MiddleContent
      />
       }
    </StyleBody>
  );
}
const mapStateToProps = (state) => {
  return {
    dataSearch: state.kiosk.dataSearch
  };
};
const mapDispatchToProps = ({
}) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Body);