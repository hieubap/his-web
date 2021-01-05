import React, { useState, forwardRef, useImperativeHandle } from "react";
import T from "prop-types";
import { Main } from "./styled";
import { Button } from "antd";
import { connect } from "react-redux";

const BreakLine = forwardRef(({ textTransform, ...props }, ref) => {
  const { mode, component, init, focusing } = props;
  const itemProps = component.props || {};
  useImperativeHandle(ref, () => ({}));

  const handleFocus = () => {
    if (mode === "config") {
      init(component);
    }
  };

  return (
    <Main
      onClick={handleFocus}
      focusing={focusing}
      mode={mode}
      itemProps={itemProps}
    >
      {mode === "config" && (
        <Button icon={"setting"} onClick={handleFocus} size={"small"} />
      )}{" "}
      <hr />
    </Main>
  );
});

BreakLine.defaultProps = {
  mode: "editing",
  component: {},
};

BreakLine.propTypes = {
  mode: T.oneOf(["config", "editing"]),
  component: T.shape({}),
};

const mapState = (state) => ({});

const mapDispatch = ({ component: { init } }) => ({
  init,
});

export default connect(mapState, mapDispatch, null, { forwardRef: true })(
  BreakLine
);
