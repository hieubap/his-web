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
      <Spin spinning={props.isLoading} root="true">
        <Table
          disableRow={(item, index) => {
            return !item.active;
          }}
          dataSource={props.data}
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
              width: 165,
              title: "Mã biểu mẫu",
              key: "ma",
              dataIndex: "ma",
              render: (value, item, index) => {
                return <span>{value}</span>;
              },
            },
            {
              title: "Tên biểu mẫu",
              key: "ten",
              dataIndex: "ten",
              render: (value, item, index) => {
                return <span>{value}</span>;
              },
            },
            {
              width: 143,
              title: "HSDD",
              key: "hsdd",
              dataIndex: "hsdd",
              render: (value, item, index) => {
                return <Checkbox checked={item.hsdd} />;
              },
            },
            {
              width: 143,
              title: "Editor",
              key: "editor",
              dataIndex: "editor",
              render: (value, item, index) => {
                return <Checkbox checked={item.editor} />;
              },
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
              width: 131,
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
                  onChange={onChangeSearch("ma")}
                  type="text"
                  value={state.ma}
                  placeholder="Nhập mã biểu mẫu"
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
            {
              index: 2,
              align: "left",
              title: (
                <Input
                  onChange={onChangeSearch("ten")}
                  type="text"
                  value={state.ten}
                  placeholder="Nhập tên biểu mẫu"
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
  data: T.array,
};

const mapState = (state) => ({
  isLoading: state.form.isLoading,
  data: state.form.data || [],
  total: state.form.total || 0,
  page: state.form.page || 0,
  size: state.form.size || 10,
});

const mapDispatch = ({ form: { onSearch, onSizeChange } }) => ({
  onSearch,
  onSizeChange,
});

export default connect(mapState, mapDispatch)(FormCatalog);
