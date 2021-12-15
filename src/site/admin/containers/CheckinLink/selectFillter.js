import { Select } from "antd";
import React from "react";
const { Option } = Select;
function index({ data, textTranslate, validate, error, multiple, ...rest }) {
  return (
    <>
      <Select
        {...rest}
        showSearch
        filterOption={(input, option) =>
          option.props.children
            .toLowerCase()
            .unsignText()
            .indexOf(input.toLowerCase().unsignText()) >= 0
        }
        placeholder={textTranslate}
        mode={multiple ? "multiple" : ""}
      >
        {multiple || rest.require ? null : <Option value={undefined}>{textTranslate}</Option>}
        {(data || []).map((item, index) => {
          return (
            <Option key={index} value={item.id} ref={item.ma}>
              {item.ten}
            </Option>
          );
        })}
      </Select>
      {validate ? (
        <div className="red-text" style={{ paddingTop: "5pt" }}>
          {error}
        </div>
      ) : null}
    </>
  );
}
export default index;
