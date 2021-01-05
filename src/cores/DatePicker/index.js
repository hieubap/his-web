import React, { useState, useEffect, forwardRef } from "react";
import T from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { DatePicker } from "antd";
import { Main } from "./styled";
import { render, formatSecond } from "./constants";
import { checkComponentDisable } from "utils/editor-utils";

const AppDatePicker = forwardRef((props, ref) => {
  const [state, _setState] = useState({
    disable: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { mode, component, init, form, formChange } = props;
  const [localValue, setLocalValue] = useState();

  const itemProps = component.props || {};
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
  useEffect(() => {
    setLocalValue(form[itemProps.fieldName]);
  }, [form]);

  const handleFocus = () => {
    if (mode === "config") {
      init(component);
    }
  };

  const handleChangeDate = (value) => {
    if (itemProps.fieldName && formChange[itemProps.fieldName]) {
      if (itemProps.onlyDate) {
        formChange[itemProps.fieldName](value.format("YYYY-MM-DD"));
      } else {
        formChange[itemProps.fieldName](value.format());
      }
    }

    setLocalValue(value.format());
  };

  return (
    <Main
      onClick={handleFocus}
      contentAlign={itemProps.contentAlign}
      mode={mode}
    >
      {mode === "editing" && !state.disable && (
        <div>
          <DatePicker
            showTime={
              formatSecond.includes(itemProps.dateTimeFormat)
                ? { format: "HH:mm:ss" }
                : null
            }
            allowClear={false}
            className={"date-picker"}
            onChange={handleChangeDate}
            value={localValue ? moment(localValue) : null}
            format={"DD/MM/YYYY"}
          />
        </div>
      )}

      <div className={"value-display"}>
        {render(itemProps.dateTimeFormat, localValue, mode)}
      </div>
    </Main>
  );
});

AppDatePicker.defaultProps = {
  form: {},
};

AppDatePicker.propTypes = {
  form: T.shape({}),
};
const mapState = (state) => ({
  signStatus: state.files.signStatus || {},
  auth: state.auth.auth,
  patient: state.patient.patient,
  fileDataHIS: state.files.fileDataHIS,
});

const mapDispatch = ({ component: { init } }) => ({
  init,
});

export default connect(mapState, mapDispatch, null, { forwardRef: true })(
  AppDatePicker
);
