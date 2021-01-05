import React, { useEffect, useState, forwardRef } from "react";
import T from "prop-types";
import { Main } from "./styled";
import { connect } from "react-redux";
import { checkComponentDisable } from "utils/editor-utils";

const Input = forwardRef((props, ref) => {
  const [state, _setState] = useState({
    disable: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { init, component, mode, form, formChange } = props;
  const [localValue, setValue] = useState("");
  const itemProps = component.props || {};

  useEffect(() => {
    form && setValue(form[itemProps.fieldName]);
  }, [component, form]);

  useEffect(() => {
    let disable = checkComponentDisable(
      props.auth,
      props.patient,
      itemProps,
      mode,
      props.signStatus,
      props
    );
    if (state.disable != disable) {
      setState({
        disable,
      });
    }
  }, [props.mode, props.signStatus, itemProps.disabled, props.fileDataHIS, props.patient]);

  const handleFocus = () => {
    if (mode === "config") {
      init(component);
    }
  };

  const handleOnChange = (e) => {
    if (itemProps.fieldName && formChange[itemProps.fieldName]) {
      formChange[itemProps.fieldName](e.target.value);
    }
  };

  return (
    <Main onClick={handleFocus}>
      <input
        style={{
          width: `${itemProps.width}px` || "100%",
          height: `${itemProps.height}px` || "100%",
          borderRadius: itemProps.type === "circle" ? "50%" : 0,
        }}
        defaultValue={localValue}
        type="text"
        className={"input-component"}
        onChange={handleOnChange}
        maxLength={2}
        disabled={state.disable}
      />
    </Main>
  );
});

Input.defaultProps = {
  component: {
    props: {},
  },
};

Input.propTypes = {
  component: T.shape({}),
};

const mapState = (state) => ({
  common: state.common,
  fileDefault: state.common.imagedata,
  signStatus: state.files.signStatus || {},
  auth: state.auth.auth,
  patient: state.patient.patient,
  fileDataHIS: state.files.fileDataHIS,
});

const mapDispatch = ({ component: { init } }) => ({ init });

export default connect(mapState, mapDispatch, null, { forwardRef: true })(
  Input
);
