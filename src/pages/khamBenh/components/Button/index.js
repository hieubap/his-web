import React from "react";
import { ButtonWrapper } from "./styled";

const Button = ({ icon, name, ...restProps }) => {
  return <ButtonWrapper {...restProps}>{name}</ButtonWrapper>;
};

export default Button;
