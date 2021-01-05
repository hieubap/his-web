import React, { useState } from "react";
import { Route } from "react-router-dom";
import RightTool from "components/RightTool";
import { Main } from "./styled";
import { therapyPages } from "pages/constants";
import { connect } from "react-redux";

const Therapy = (props) => {
  return (
    <Main windowWidth={props.width} therapyRightToolCollapse={props.therapyRightToolCollapse}>
      <div className={"app-contain"}>
        {Object.keys(therapyPages).map((key) => (
          <Route
            key={key}
            path={therapyPages[key].path}
            component={therapyPages[key].component}
            exact={therapyPages[key].exact}
          />
        ))}
      </div>

      <RightTool />
    </Main>
  );
};

const mapState = (state) => ({
  therapyRightToolCollapse: state.application.therapyRightToolCollapse,
  width: state.application.width,
});

export default connect(mapState, ({ application: { updateData } }) => ({
  updateData,
}))(Therapy);
