import React, { useEffect, useState } from "react";
import T from "prop-types";
import { connect } from "react-redux";
import { Spin, Checkbox, Icon, Input } from "antd";
import { Table } from "components/common";
import { Main } from "./styled";
import EditIcon from "assets/svg/edit.svg";
import Pagination from "components/Pagination";

const FormCatalog = (props) => {
  const [state, _setState] = useState({
    search: "",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    props.onSizeChange({ size: 10 });
    props.getAllDepartments();
  }, []);

  const onChangePage = (page) => {
    props.onSearch({ page: page - 1, ten: state.ten, ma: state.ma });
  };

  const onSearch = () => {
    props.onSearch({ page: 0, ten: state.ten, ma: state.ma });
  };
  const showView = (item, readOnly) => () => {
    if (props.showAddNew) props.showAddNew(item, readOnly)();
  };

  const onShowSizeChange = (current, size) => {
    props.onSizeChange({ size, ten: state.ten, ma: state.ma });
  };

  const onChangeSearch = (type) => (e) => {
    setState({ [type]: e.target.value });
  };

  return (
    <Main>
      <Spin spinning={props.isLoadingCategory} root="true">
        <Table
          disableRow={(item, index) => {
            return !item.active;
          }}
          dataSource={props.categories}
          rowKey="id"
          pagination={false}
          headerSearch={true}
          scroll={{ y: "calc(100% - 100px)" }}
          columns={[
            {
              width: 65,
              title: "STT",
              key: "index",
              render: (value, item, index) => {
                return <span>{`${props.page * props.size + index + 1}`}</span>;
              },
            },
            {
              title: "Tên chỉ số",
              key: "ten",
              dataIndex: "ten",
              render: (value, item, index) => {
                return <span>{value}</span>;
              },
            },
            {
              width: 143,
              title: "Đơn vị",
              key: "donVi",
              dataIndex: "donVi",
              render: (value, item, index) => {
                return <span>{value}</span>;
              },
            },
            {
              width: 143,
              title: "Giá trị tối thiểu",
              key: "giaTriNhoNhat",
              dataIndex: "giaTriNhoNhat",
            },
            {
              width: 143,
              title: "Giá trị tối đa",
              key: "giaTriLonNhat",
              dataIndex: "giaTriLonNhat",
            },
            {
              width: 143,
              title: "Có hiệu lực",
              key: "active",
              dataIndex: "active",
              render: (value, item, index) => {
                return <Checkbox checked={item.active} />;
              },
            },
            {
              width: 130,
              title: "Thao tác",
              render: (value, record, index) => {
                return (
                  <div className="action">
                    <Icon
                      type="eye"
                      onClick={showView(record, true)}
                      style={{ color: "#08AAA8" }}
                    />
                    <Icon
                      component={EditIcon}
                      onClick={showView(record, false)}
                    />
                  </div>
                );
              },
            },
          ]}
          subHeader={[
            {
              index: 1,
              align: "left",
              title: (
                <Input
                  onChange={onChangeSearch("ten")}
                  type="text"
                  value={state.ten}
                  placeholder="Nhập tên chỉ số"
                  prefix={
                    <Icon
                      type="search"
                      style={{ color: "#125872" }}
                      onClick={onSearch}
                    />
                  }
                  onPressEnter={onSearch}
                />
              ),
            },
          ]}
        ></Table>
        <Pagination
          current={props.page + 1}
          className={"patient-paging"}
          total={props.total}
          onChange={onChangePage}
          onShowSizeChange={onShowSizeChange}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} của ${total} bản ghi`
          }
          showQuickJumper
          showSizeChanger
        />
      </Spin>
    </Main>
  );
};

FormCatalog.defaultProps = {};

FormCatalog.propTypes = {
  categories: T.array,
};

const mapState = (state) => ({
  isLoadingCategory: state.vitalSigns.isLoadingCategory,
  categories: state.vitalSigns.categories || [],
  total: state.vitalSigns.total || 0,
  page: state.vitalSigns.page || 0,
  size: state.vitalSigns.size || 10,
});

const mapDispatch = ({
  vitalSigns: { onSearch, onSizeChange },
  department: { getAllDepartments },
}) => ({
  onSearch,
  onSizeChange,
  getAllDepartments,
});

export default connect(mapState, mapDispatch)(FormCatalog);
