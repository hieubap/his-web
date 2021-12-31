import React, { useEffect, useRef, useState } from "react";
import { Input, InputNumber } from "antd";

const Input2 = ({
  onChange = () => () => { },
  data,
  style = {},
  defaultValue,
  placeholder,
  handleValue = (value) => value,
  ...props
}) => {
  const [state, setState] = useState("");

  useEffect(() => {
    setState(data);
  }, [data]);

  const ref = useRef(null);

  const changeInput = (value) => {
    setState(value);
    if (ref.current) {
      clearTimeout(ref.current);
    }
    ref.current = setTimeout(() => {
      onChange(handleValue(value));
      setState(handleValue(value));
    }, 500);
  };
  return (
    <Input
      {...props}
      value={state}
      placeholder={placeholder}
      onChange={(e) => changeInput(e.target ? e.target?.value : e)}
      style={style}
    />
  );
};

const InputNumber2 = ({
  onChange = () => () => { },
  data,
  style = {},
  defaultValue,
  placeholder,
  handleValue = (value) => value,
  ...props
}) => {
  const [state, setState] = useState("");

  useEffect(() => {
    setState(data);
  }, [data]);

  const ref = useRef(null);

  const changeInput = (value) => {
    setState(value);
    if (ref.current) {
      clearTimeout(ref.current);
    }
    ref.current = setTimeout(() => {
      onChange(handleValue(value));
      setState(handleValue(value));
    }, 500);
  };
  return (
    <InputNumber
      {...props}
      value={state}
      placeholder={placeholder}
      onChange={(e) => changeInput(e.target ? e.target?.value : e)}
      style={style}
    />
  );
};

export { Input2, InputNumber2 };
