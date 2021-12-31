import React from "react";
import { Main } from "./styled";
import PropTypes from "prop-types";

function DatePickerField(props) {
  const { customFormat, placeholder, ...rest } = props;
  const dateFormat = (value) => {
    return `giờ ${value.format("HH")} phút ${value.format("mm")}`;
  };

  return (
    <Main
      placeholder={placeholder || "..........giờ..........phút"}
      format={customFormat || dateFormat}
      suffixIcon={null}
      {...rest}
    />
  );
}

DatePickerField.propTypes = {
  customFormat: PropTypes.func,
  placeholder: PropTypes.string,
};

export default DatePickerField;
