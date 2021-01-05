import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Select } from "antd";
import { useTranslation } from "react-i18next";

const SelectDepartment = (props) => {
  const { t } = useTranslation();
  useEffect(() => {
    props.getAllDepartments();
  }, []);
  useEffect(() => {
    if (props.departments && props.departments.length) {
      if (props.departmentId !== props.departments[0]?.id)
        props.onSelectDepartment({ departmentId: props.departments[0]?.id });
    }
  }, [props.departments]);

  const onSelectDepartment = (value) => {
    props.onSelectDepartment({ departmentId: value });
  };

  const filterOption = (input, option) => {
    return (
      option.props.name?.toLowerCase()
        .createUniqueText()
        .indexOf(input.toLowerCase().createUniqueText()) >= 0
    );
  };

  return (
    <Select
      showSearch
      value={props.departmentId}
      onSelect={onSelectDepartment}
      placeholder={t("drugDistributions.selectDepartmant")}
      size={"default"}
      className="search-item"
      filterOption={filterOption}
      notFoundContent={
        <span id={"no-data-mess"}>{t("drugDistributions.noData")}</span>
      }
      id={"department"}
    >
      {props.departments.map((item, index) => (
        <Select.Option
          key={index}
          value={item.id}
          id={item.id}
          name={item.name}
        >
          <div
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            title={item.name}
          >
            {item.name}
          </div>
        </Select.Option>
      ))}
    </Select>
  );
};

const mapState = (state) => {
  return {
    departments: state.department.departments || [],
    departmentId: state.drugAllocation.departmentId,
  };
};

const mapDispatch = ({
  department: { getAllDepartments },
  drugAllocation: { onSelectDepartment },
}) => ({
  getAllDepartments,
  onSelectDepartment,
});

export default connect(mapState, mapDispatch)(SelectDepartment);
