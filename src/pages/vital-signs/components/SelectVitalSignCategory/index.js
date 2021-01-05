import React from "react";
import { Main } from "./styled";
import { Select } from "antd";
import { connect } from "react-redux";

const { Option } = Select;
function index(props) {
  const onChange = (value) => {
    if (value) {
      let values = JSON.parse(JSON.stringify(props.moreValueIds));
      if (values.indexOf((t) => t === value) === -1) {
        values.push(value);
      }
      props.updateData({
        moreValueIds: values,
      });
    }
  };

  return (
    <Main
      style={{
        top: props.top || 0,
        left: 5,
        width: props.width - 5,
        height: props.height,
        zIndex: 104,
      }}
    >
      <Select
        showSearch
        style={{ width: "100%", height: props.height }}
        placeholder="Thêm chỉ số"
        optionFilterProp="children"
        onChange={onChange}
        value="Thêm chỉ số"
        filterOption={(input, option) => {
          return (
            ((option.props.children || "") + "")
              .createUniqueText()
              .indexOf(input.createUniqueText()) >= 0
          );
        }}
      >
        {props.vitalSignsCategories.map((item, index) => {
          return (
            <Option value={item.id} key={index}>
              {item.ten} ({item.donVi})
            </Option>
          );
        })}
      </Select>
    </Main>
  );
}
export default connect(
  (state) => {
    let moreValueIds = state.vitalSigns.moreValueIds || [];
    return {
      moreValueIds,
      vitalSignsCategories: (
        state.vitalSigns.vitalSignsCategories || []
      ).filter((item) => !moreValueIds.find((t) => t === item.id)),
    };
  },
  ({ vitalSigns: { updateData } }) => ({
    updateData,
  })
)(index);
