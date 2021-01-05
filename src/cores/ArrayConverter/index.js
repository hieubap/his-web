import React, { useEffect, useRef, useState, forwardRef } from "react";
import T from "prop-types";
import TextEdit from "cores/TextEdit";
import ContentEditable from "components/ContentEditable";
import MultipleLine from "components/MultipleLine";
import { Main } from "./styled";
import { connect } from "react-redux";
import { checkComponentDisable } from "utils/editor-utils";

const ArrayConverter = forwardRef((props, ref) => {
  const {
    mode,
    component,
    updateContent,
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
  const [width, setWidth] = useState(0);
  const [labelWidth, setLabelWidth] = useState(0);
  const label = mode === "config" ? "label" : "";

  const itemProps = component.props || {};
  const [state, _setState] = useState({
    disable: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
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
  }, [props.mode, props.signStatus, itemProps.disabled, props.fileDataHIS]);
  useEffect(() => {
    if (labelRef.current) {
      setWidth(blockWidth - labelRef.current.node.clientWidth - 6);
      setLabelWidth(labelRef.current.node.clientWidth);
    }
  }, [component, blockWidth]);

  const handleChangeLabel = (valueHTML) => {
    const timer = 500;
    const timeout = setTimeout(() => {
      updateContent({
        ...component,
        props: {
          ...itemProps,
          labelValue: valueHTML,
          height: itemProps.line * 24,
        },
      });

      clearTimeout(timeout);
    }, timer);
  };

  const handleFocus = () => {
    if (mode === "config") {
      init(component);
    }
  };

  const handleOnChange = (value) => {
    if (itemProps.fieldName && formChange[itemProps.fieldName]) {
      formChange[itemProps.fieldName](
        value.htmlValue.split(itemProps.rule || ",").map((item) => item.trim())
      );
    }
  };

  let htmlValue = (form[itemProps.fieldName || ""] || []).join(
    itemProps.rule + " " || ", "
  );

  return mode === "editing" ? (
    <Main onClick={handleFocus}>
      <MultipleLine
        label={!itemProps.noLabel ? itemProps.label : ""}
        onChange={handleOnChange}
        value={htmlValue}
        extentLine={itemProps.line - 1}
        disabled={state.disable}
        width={blockWidth}
        min={itemProps.line}
        size={itemProps.size || 1000}
      />
    </Main>
  ) : (
    <Main
      onClick={handleFocus}
      focusing={focusing}
      hideLabelDots={hideLabelDots}
      style={{ height: itemProps.line ? itemProps.line * 24 : "" }}
      hadLabel={!!itemProps.label}
    >
      {!itemProps.noLabel && (
        <TextEdit
          onChange={handleChangeLabel}
          className={"text-field-label"}
          defaultValue={itemProps.label || label}
          ref={labelRef}
          mode={mode}
          textTransform={textTransform}
        />
      )}

      <ContentEditable
        labelWidth={labelWidth}
        htmlValue={htmlValue}
        size={itemProps.size || 500}
        width={width}
        onChange={handleOnChange}
        disabled={state.disable}
        type={itemProps.line > 1 ? "multiple" : "single"}
        extentLine={itemProps.line - 1 || 0}
        {...other}
      />
    </Main>
  );
});

ArrayConverter.defaultProps = {
  mode: "editing",
  labelText: "",
  form: {},
  formChange: {},
  component: {},
  line: {},
  focusComponent: () => {},
};

ArrayConverter.propTypes = {
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
  ArrayConverter
);
