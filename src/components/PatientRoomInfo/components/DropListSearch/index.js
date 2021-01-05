import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { unsignText } from "components/utils";

const DropListSearch = ({
  getAllDepartments,
  departments,
  onSelectDepartment,
  departmentId,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    getAllDepartments();
  }, []);
  useEffect(() => {
    if (departments.length > 0) {
      selectDepartment(departments[0].id);
    }
  }, [departments]);
  const selectDepartment = (value) => {
    onSelectDepartment({ departmentId: value });
  };

  const filterOption = (input, option) => {
    return (
      unsignText(option.props.name)
        .toLowerCase()
        .indexOf(unsignText(input.toLowerCase())) >= 0
    );
  };
  return (
    <Main>
      <div className="header-search">
        <Select
          showSearch
          value={departmentId}
          onSelect={selectDepartment}
          filterOption={filterOption}
          notFoundContent={<span id={'room_no_data_mess'}>{t("drugDistributions.noData")}</span>}
          placeholder={t("drugDistributions.selectDepartmant")}
          size={"medium"}
          className="search-item"
        >
          {departments.map((item, index) => (
            <Select.Option
              key={item.id}
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
      </div>
    </Main>
  );
};

const mapState = (state) => ({
  common: state.common,
  auth: state.auth.auth,
  departments: state.department.departments || [],
  departmentId: state.patientRoom.departmentId,
});

const mapDispatch = ({
  department: { getAllDepartments },
  patientRoom: { onSelectDepartment },
}) => ({
  getAllDepartments,
  onSelectDepartment,
});

export default connect(mapState, mapDispatch)(DropListSearch);
