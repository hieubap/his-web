import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Input } from "antd";

const InputTimeout = (
  {
    onChange = () => () => {},
    data,
    style = {},
    defaultValue,
    placeholder,
    ...props
  },
  refs
) => {
  const [state, setState] = useState("");

  useEffect(() => {
    setState(data);
  }, [data]);

  // useImperativeHandle(ref,() => ({}))

  const ref = useRef(null);

  const changeInput = (value) => {
    setState(value);
    if (ref.current) {
      clearTimeout(ref.current);
    }
    ref.current = setTimeout(() => {
      onChange(value);
    }, 500);
  };
  return (
    <Input
      value={state}
      placeholder={placeholder}
      onChange={(e) => changeInput(e.target.value)}
      style={style}
      ref={refs}
      {...props}
    />
  );
};

export default forwardRef(InputTimeout);
