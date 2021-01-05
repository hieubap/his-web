import React, { forwardRef } from "react";
import T from "prop-types";
import { Main } from "./styled";
import { connect } from "react-redux";

const Title = forwardRef((props, ref) => {
  const { mode, component, init, focusing, form } = props;
  const itemProps = component.props;

  const handleFocus = () => {
    if (mode === "config") {
      init(component);
    }
  };

  return (
    <Main
      onClick={handleFocus}
      className="heading-text"
      focusing={focusing}
      fontSize={itemProps.fontSize}
      fontWeight={itemProps.fontWeight}
      align={itemProps.align}
      textAlign={itemProps.align}
      textTransform={itemProps.textTransform}
    >
      <span>
        {form[itemProps.fieldName]
          ? form[itemProps.fieldName]
          : "Title heading"}
      </span>
    </Main>
  );
});

Title.defaultProps = {
  form: {},
  component: {},
};

Title.propTypes = {
  form: T.shape({}),
  component: T.shape({}),
};

const mapState = () => ({});

const mapDispatch = ({ component: { init } }) => ({
  init,
});

export default connect(mapState, mapDispatch)(Title);
