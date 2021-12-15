import React from "react";
import { CheckboxStyled } from "./styled";

function Index({ checked, onChange, children, style, ...rest }) {
  return (
    <CheckboxStyled
      checked={checked}
      onChange={onChange}
      {...rest}
      style={style}
    >
      {children}
    </CheckboxStyled>
  );
}

export default Index;
