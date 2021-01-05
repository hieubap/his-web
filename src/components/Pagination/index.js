import React from "react";
import T from "prop-types";
import { Pagination } from "antd";

const AppPagination = (props) => {
  const {
    current,
    total,
    onChange,
    pageSizeOptions,
    onShowSizeChange,
    pageSize = 10,
    defaultPageSize,
  } = props;

  const handleSizeChange = (current = 1, size) => {
    onShowSizeChange(current, size);
  };

  return (
    <Pagination
      current={current}
      className={"patient-paging"}
      pageSize={pageSize}
      defaultPageSize={defaultPageSize}
      pageSizeOptions={pageSizeOptions}
      total={total}
      onChange={onChange}
      onShowSizeChange={handleSizeChange}
      showTotal={(total, range) => {
        return `${range[0]}-${range[1]} của ${total} bản ghi`;
      }}
      showQuickJumper
      showSizeChanger
    />
  );
};

AppPagination.defaultProps = {
  pageSizeOptions: ["10", "20", "50", "100"],
};

AppPagination.propTypes = {
  pageSizeOptions: T.array,
};

export default AppPagination;
