import React, { useState, useRef, useEffect } from "react";
import T from "prop-types";
import renderHTML from "react-render-html";
import ContentEditable from "components/ContentEditable";
import { Main } from "./styled";

const EditMultipleLine = (props) => {
  const {
    label,
    onChange,
    value,
    extentLine,
    disabled,
    extendChild,
    width,
    min,
    size,
    border,
    contentAlign,
  } = props;
  const [labelWidth, setLabelWidth] = useState(0);
  const [lineQuantity, setLineQuantity] = useState(0);
  const [lineNumber, setLineNumber] = useState(0);
  const labelRef = useRef(null);

  useEffect(() => {
    const labelWidth = labelRef.current.clientWidth;
    setLabelWidth(labelWidth);
    setLineQuantity(extentLine);
    setLineNumber(extentLine || 0);
  }, []);

  const plusLine = () => {
    setLineQuantity(lineQuantity + 1);
  };

  const minusLine = () => {
    setLineQuantity(lineQuantity <= min ? min : lineQuantity - 1);
  };

  const handleSetLineNumber = (value) => {
    const defaultExtendLine = extentLine || 0;

    setLineNumber(value > defaultExtendLine ? value : defaultExtendLine);
  };

  
  return (
    <Main style={{ minHeight: (lineNumber + 1) * 18 + 3 }}>
      <span
        ref={labelRef}
        style={{
          display: label ? "inline-block" : "",
          width: props.labelWidth + "px",
        }}
      >
        {label && renderHTML(label)}
      </span>

      <ContentEditable
        contentAlign={contentAlign}
        extendChild={extendChild}
        extentLine={lineNumber}
        labelWidth={labelWidth}
        onChange={onChange}
        value={value}
        htmlValue={value}
        type="multiple"
        disabled={disabled}
        width={width}
        plusLine={plusLine}
        minusLine={minusLine}
        size={size}
        updateLineNumber={handleSetLineNumber}
        border={border}
      />
    </Main>
  );
};

EditMultipleLine.defaultProps = {
  extentLine: 0,
  min: 1,
  disabled: false,
};

EditMultipleLine.propTypes = {
  extentLine: T.number,
  min: T.number,
  max: T.number,
  onChange: T.func,
  disabled: T.bool,
};

export default EditMultipleLine;
