import React, { useState, useMemo } from "react";
import { Main } from "./styled";
import { Input, Table } from "antd";
// import {Table} from "components/Table";
import IcSearch from "assets/images/template/icSearch.png";

const TableWrapper = ({
  title,
  columns = [],
  data = [],
  isShowSearch = false,
  onChangeSearch = () => {},
  searchPlaceHolder = "",
  isTable = true,
  ...props
}) => {
  const [state, _setState] = useState({ ds: [] });
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };
  const ds = useMemo(() => {
    return [...data];
  }, [data]);
  return (
    <Main>
      <div className="header">
        <div className="_title">{title}</div>
        {isShowSearch && (
          <div className="_search">
            <Input
              onChange={onChangeSearch}
              placeholder={`${searchPlaceHolder}`}
            />
            <img src={IcSearch} alt="iSofh" />
          </div>
        )}
      </div>
      <div className="wrapper">
        {isTable ? (
          <Table
            rowClassName={(record, index) => (index % 2 === 0 ? "bg-blue" : "")}
            rowKey={props.rowKey || "id"}
            pagination={false}
            columns={columns}
            dataSource={ds}
            {...props}
          />
        ) : (
          props.children
        )}
      </div>
    </Main>
  );
};

export default TableWrapper;
