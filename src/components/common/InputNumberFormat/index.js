import React from "react";
import NumberFormat from 'react-number-format';
import { Input } from 'antd'
function Index({ ...rest }) {
  return (
    <NumberFormat
      customInput={Input}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      {...rest}
    />
  );
}
export default Index;
