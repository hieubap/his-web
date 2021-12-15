import React from "react";
import { Form } from "antd";
import { Main } from "./styled";
const FormWraper = (props) => {
  const { disabled, ...rest } = props;
  return (
    <Main>
      <fieldset disabled={disabled}>
        <Form {...rest}></Form>
      </fieldset>
    </Main>
  );
};

export default FormWraper;
