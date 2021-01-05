import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { DatePicker } from "antd";
import SelectDepartment from "../SelectDepartment";
import SelectRoom from "../SelectRoom";
import moment from "moment";

const DropListSearch = (props) => {
  const onChangeDate = (date) => {
    props.onChangeDate(date?._d ?? new Date());
  };

  const dateComponent = (currentDate) => {
    return (
      <div className={'ant-calendar-date'} id={currentDate.valueOf()}>{currentDate.format('DD')}</div>
    )
  };

  return (
    <Main>
      <div className="header-search">
        <SelectDepartment />
        <SelectRoom />
        <DatePicker
          onChange={onChangeDate}
          value={moment(props.date)}
          format={"DD/MM/YYYY"}
          className="search-item"
          disabledTime
          dateRender={dateComponent}
        />
      </div>
    </Main>
  );
};

const mapState = (state) => {
  return {
    date: state.drugAllocation.date || new Date(),
  };
};

const mapDispatch = ({ drugAllocation: { onChangeDate } }) => ({
  onChangeDate,
});

export default connect(mapState, mapDispatch)(DropListSearch);
