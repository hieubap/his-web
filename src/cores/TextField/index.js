import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import T from "prop-types";
import TextEdit from "cores/TextEdit";
import ContentEditable from "components/ContentEditable";
import MultipleLine from "components/MultipleLine";
import { Main } from "./styled";
import { connect } from "react-redux";
import { checkComponentDisable } from "utils/editor-utils";
const TextField = forwardRef((props, ref) => {
  const [state, _setState] = useState({
    disable: false,
    width: 0,
    labelWidth: 0,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const {
    mode,
    component,
    form,
    formChange,
    init,
    focusing,
    hideLabelDots,
    other,
    textTransform,
    blockWidth,
  } = props;
  const labelRef = useRef(null);
  const label = mode === "config" ? "label" : "";
  const itemProps = component.props || {};

  const getValue = (id) => {
    const elm = document.getElementById(id);
    return elm ? elm.innerHTML : "";
  };

  useImperativeHandle(ref, () => ({
    collectLabel: () => getValue(`${component.type}_${component.key}`),
  }));

  useEffect(() => {
    if (labelRef.current) {
      setState({
        width: blockWidth - labelRef.current.node.clientWidth - 6,
        labelWidth: labelRef.current.node.clientWidth,
      });
    }
  }, [state.labelValue, blockWidth]);

  useEffect(() => {
    setState({
      labelValue: itemProps.label,
    });
  }, [component]);

  const handleFocus = () => {
    if (mode === "config") {
      init(component);
    }
  };

  const handleOnChange = (value) => {
    if (formChange[itemProps.fieldName]) {
      formChange[itemProps.fieldName](value.htmlValue);
    } else {
      // console.log('formChange: ', formChange[itemProps.fieldName]);
    }
  };

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
  }, [
    props.mode,
    props.signStatus,
    itemProps.disabled,
    itemProps.readOnly,
    props.fileDataHIS,
    props.patient,
  ]);

  return mode === "editing" ? (
    <Main onClick={handleFocus}>
      <MultipleLine
        label={!itemProps.noLabel ? itemProps.label : ""}
        labelWidth={itemProps.labelWidth}
        contentAlign={itemProps.contentAlign}
        onChange={handleOnChange}
        value={form[itemProps.fieldName || ""]}
        extentLine={itemProps.line - 1 < 0 ? 0 : itemProps.line - 1}
        disabled={state.disable}
        width={blockWidth}
        min={itemProps.line}
        size={itemProps.size || 1000}
        border={!!itemProps.border}
      />
      {/*
      <div style={{ width: "100%", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0 }}>
          {itemProps.label && renderHTML(itemProps.label)}
        </div>
        <span
          style={{
            borderWidth: 0,
            width: blockWidth,
            outline: "none",
            textIndent: itemProps.labelWidth + "px",
            textAlign: itemProps.contentAlign,
          }}
          disabled={itemProps.disabled}
          rows={5}
        >
          {form[itemProps.fieldName || ""]}
        </span>
        <MultipleLine
          label={!itemProps.noLabel ? itemProps.label : ""}
          labelWidth={itemProps.labelWidth}
          contentAlign={itemProps.contentAlign}
          onChange={handleOnChange}
          value={form[itemProps.fieldName || ""]}
          extentLine={itemProps.line - 1 < 0 ? 0 : itemProps.line - 1}
          disabled={itemProps.disabled}
          width={blockWidth}
          min={itemProps.line}
          size={itemProps.size || 1000}
          border={!!itemProps.border}
        /> 
      </div>*/}
    </Main>
  ) : (
    <Main
      onClick={handleFocus}
      focusing={focusing}
      hideLabelDots={hideLabelDots}
      style={{ height: itemProps.line ? itemProps.line * 18 : "" }}
      hadLabel={!!itemProps.label}
    >
      {!itemProps.noLabel && (
        <TextEdit
          id={`${component.type}_${component.key}`}
          className={"text-field-label"}
          defaultValue={itemProps.label || label}
          ref={labelRef}
          mode={mode}
          onChange={(value) => {
            setState({
              labelValue: value,
            });
          }}
          textTransform={textTransform}
          width={itemProps.labelWidth || labelRef?.current?.node.clientWidth}
          disable={state.disable}
        />
      )}
      <ContentEditable
        labelWidth={state.labelWidth}
        htmlValue={form[itemProps.fieldName || ""]}
        size={itemProps.size || 500}
        width={state.width}
        onChange={handleOnChange}
        disabled={state.disable}
        type={itemProps.line > 1 ? "multiple" : "single"}
        extentLine={itemProps.line - 1 || 0}
        {...other}
      />
    </Main>
  );
});

TextField.defaultProps = {
  mode: "editing",
  labelText: "",
  form: {},
  formChange: {},
  component: {
    noLabel: false,
  },
  line: {},
  focusComponent: () => {},
};

TextField.propTypes = {
  mode: T.oneOf(["config", "editing"]),
  form: T.shape({}),
  formChange: T.shape({}),
  component: T.shape({}),
  line: T.shape({}),
  labelText: T.string,
  focusComponent: T.func,
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
  TextField
);
