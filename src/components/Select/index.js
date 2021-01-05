import React from "react";
import { Select } from "antd";
const { Option } = Select;

function index(props) {
  return (
    <Select
      onChange={props.onChange}
      value={props.value}
      showSearch
      optionFilterProp="children"
      filterOption={(input, option) =>
        option && option.children && option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      allowClear
      loading={props.loading}
      placeholder={props.placeholder}
      className={props.className}
    >
      {props.data &&
        props.data.length &&
        props.data.map((option, index) => {
          return (
            <Option lists={option} key={index} value={option.id}>
              {props.valueName === "ma" ? option.ma : option.ten}
            </Option>
          );
        })}
    </Select>
  );
}
export default index;
