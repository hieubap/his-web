import React, { useState, useRef, useEffect, forwardRef } from "react";
import T from "prop-types";
import { Input } from "antd";
import { useOutsideClick } from "hook";
import { Main } from "./styled";

const InputPopup = forwardRef((props, ref) => {
  const { value, width, onChange } = props;
  const [onInput, setOnInput] = useState(false);
  const [localValue, setLocalValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    setLocalValue(value || "");
  }, [value]);

  const hideInput = () => {
    if (onInput) {
      setOnInput(false);
    }
  };

  useOutsideClick(inputRef, hideInput);

  const handleClickValue = () => {
    setOnInput(true);
  };

  const handleOnChange = (e) => {
    const val = e.target.value;
    setLocalValue(val);
    onChange(val);
  };

  return (
    <Main>
      {onInput ? (
        <div ref={inputRef}>
          <Input
            autoFocus
            style={{ width }}
            value={localValue}
            size={"small"}
            className={"input-number-popup"}
            onChange={handleOnChange}
          />
        </div>
      ) : (
        <div className={"categories-value-display"} onClick={handleClickValue}>
          <span className={"value-text"}>{localValue}</span>
        </div>
      )}
    </Main>
  );
});

InputPopup.defaultProps = {
  value: "",
  width: "",
};

InputPopup.propTypes = {
  value: T.oneOfType([T.string, T.number]),
  width: T.number,
};

export default InputPopup;
