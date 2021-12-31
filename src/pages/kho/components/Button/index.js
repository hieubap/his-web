import React from "react";
import { ButtonMain } from "./styled";

const Button = ({
  leftIcon,
  rightIcon,
  children,
  onClick,
  primary,
  ...props
}) => {
  const onClickButton = (e) => {
    onClick && onClick(e);
  };
  return (
    <ButtonMain
      onClick={onClickButton}
      className={`${primary ? "primary" : ""}`}
    >
      {leftIcon}
      <div className="button-content">{children}</div>
      {rightIcon}
    </ButtonMain>
  );
};

export default Button;
