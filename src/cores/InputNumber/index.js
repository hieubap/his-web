import React, { useEffect, useState, useRef, forwardRef } from "react";
import T from "prop-types";
import { Main } from "./styled";
import { isEmpty } from "lodash";
import { connect } from "react-redux";
import { checkComponentDisable } from "utils/editor-utils";

const InputNumber = forwardRef((props, ref) => {
  const [state, _setState] = useState({
    disable: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { mode, component, form, formChange, init, focusing } = props;

  const itemProps = component.props || {};
  const [value, setValue] = useState([]);
  const elRef = useRef([]);
  const singleRef = useRef([]);

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
    if (itemProps.quantity) {
      const arrEmpty = [];
      arrEmpty.length = itemProps.quantity;
      arrEmpty.fill("");
      setValue(arrEmpty && arrEmpty);
    }
  }, [form, itemProps]);
  const handleFocus = () => {
    if (mode === "config") {
      init(component);
    }
  };

  const handleChangeInput = (index) => {
    let valueItem = elRef.current[index];
    let param;
    const values = form && form[itemProps.fieldName];
    if (itemProps.fieldName && formChange[itemProps.fieldName])
      if (itemProps.fieldName) {
        values[index] = valueItem && valueItem.innerHTML;
        const valueChanged = values && values.join("");
        param = {
          htmlLabe: valueChanged,
          htmlValue: values,
        };
        formChange[itemProps.fieldName](param);
      }
  };

  return (
    <Main onClick={handleFocus} focusing={focusing} size={itemProps.size}>
      {mode === "config" && (
        <div className="contenteditable">
          {!isEmpty(value) ? (
            value.map((item, index) => (
              <span
                key={index}
                ref={(el) => (elRef.current[index] = el)}
                className="contenteditable-item"
              >
                {item}
              </span>
            ))
          ) : (
            <span className="contenteditable-item" />
          )}
        </div>
      )}

      {mode === "editing" && (
        <div className="contenteditable">
          {!isEmpty(value) ? (
            value.map((item, index) => (
              <span
                key={index}
                ref={(el) => (elRef.current[index] = el)}
                contentEditable={`${!state.disable}`}
                suppressContentEditableWarning
                onInput={(e) => handleChangeInput(index, e)}
                className="contenteditable-item"
              >
                {form && itemProps.fieldName && form[itemProps.fieldName]
                  ? form[itemProps.fieldName][index]
                  : ""}
              </span>
            ))
          ) : (
            <span
              ref={(el) => (singleRef.current = el)}
              className="contenteditable-item"
              contentEditable={`${!state.disable}`}
              suppressContentEditableWarning
              onInput={handleChangeInput}
            />
          )}
        </div>
      )}
    </Main>
  );
});

InputNumber.defaultProps = {
  component: {
    props: {
      inputList: [],
    },
  },
  mode: "editing",
};

InputNumber.propTypes = {
  component: T.shape({}),
  mode: T.oneOf(["config", "editing"]),
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
  InputNumber
);
