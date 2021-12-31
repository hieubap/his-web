import React, { forwardRef } from "react";
import { DatePicker } from "antd";

const Index = forwardRef((props, ref) => {
  const { format, defaultValue, onChange, ...rest } = props;

  return (
    <DatePicker
      ref={ref}
      format={format}
      defaultValue={defaultValue}
      onChange={onChange}
      {...rest}
    />
  );
});

export default Index;
