import React, { useEffect, useState, useRef } from "react";
import T from "prop-types";
import { connect } from "react-redux";
import { Spin, Icon, Button, Input } from "antd";
import { Main } from "./styled";
import EditIcon from "assets/svg/edit.svg";
import AddNewIcon from "assets/svg/addNew2.svg";
import ModalAddRecordType from "../ModalAddRecordType";
import { Table } from "components/common";
import Page from "components/common/Page";
import PageHeader from "components/common/PageHeader";
import Pagination from "components/Pagination";

const RecordType = (props) => {
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refAddRecordType = useRef(null);

  useEffect(() => {
    props.onSizeChangeRecordType(10);
  }, []);

  const onChangePage = (page) => {
    props.onSearchRecordType({ page: page - 1, ten: state.ten, ma: state.ma });
  };

  const onSearch = () => {
    props.onSearchRecordType({ page: 0, ten: state.ten, ma: state.ma });
  };
  const showAddNew = () => {
    refAddRecordType.current.show();
  };
  const showView = (item, readOnly) => (e) => {
    e.stopPropagation();
    refAddRecordType.current.show(item, readOnly);
  };

  const onShowSizeChange = (current, size) => {
    props.onSizeChangeRecordType({ size, ten: state.ten, ma: state.ma });
  };

  const onChangeSearch = (type) => (e) => {
    setState({ [type]: e.target.value });
  };

  const onRowClick = (record, rowIndex) => {
    return {
      onClick: (event) => {
        props.getDetail(record);
      }, // click row
      onDoubleClick: (event) => {}, // double click row
      onContextMenu: (event) => {}, // right button click row
      onMouseEnter: (event) => {}, // mouse enter row
      onMouseLeave: (event) => {}, // mouse leave row
    };
  };
  const disableRow = (item = {}) => {
    return !item.active;
  };
  const activeRow = (item = {}) => {
    return props.recordType?.id === item.id;
  };
  return (
    <Page
      margin={0}
      header={
        <PageHeader
          leftArea={
            <div style={{ fontSize: 11 }}>QUẢN LÝ SẮP XẾP HỒ SƠ BỆNH ÁN</div>
          }
          rightArea={
            <Button type={"primary"} className="btn-add" onClick={showAddNew}>
              <Icon component={AddNewIcon} />
              Thêm loại hồ sơ
            </Button>
          }
        />
      }
    >
      <Main>
        <Spin spinning={props.isLoadingRecordType}>
          <Table
            headerSearch={true}
            disableRow={disableRow}
            activeRow={activeRow}
            dataSource={props.dataRecordTypes}
            rowKey="id"
            pagination={false}
            onRow={onRowClick}
            scroll={{ y: "calc(100% - 100px)" }}
            columns={[
              {
                title: "STT",
                width: 50,
                key: "index",
                render: (value, item, index) => {
                  return (
                    <span>{`${
                      props.recordTypePage * props.recordTypeSize + index + 1
                    }`}</span>
                  );
                },
              },
              {
                title: "Mã HSBA",
                width: 90,
                key: "ma",
                dataIndex: "ma",
                render: (value, item, index) => {
                  return <span>{value}</span>;
                },
              },
              {
                title: "Tên HSBA",
                key: "ten",
                dataIndex: "ten",
                render: (value, item, index) => {
                  return <span>{value}</span>;
                },
              },
              {
                title: "Thao tác",
                width: 80,
                render: (value, item, index) => {
                  return (
                    <div className="action">
                      <Icon
                        type="eye"
                        onClick={showView(item, true)}
                        style={{ color: "#08AAA8" }}
                      />
                      <Icon
                        component={EditIcon}
                        onClick={showView(item, false)}
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
                    placeholder="Nhập mã HSBA"
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
                    placeholder="Nhập tên HSBA"
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
            current={props.recordTypePage + 1}
            className={"patient-paging"}
            total={props.recordTypeTotal}
            onChange={onChangePage}
            onShowSizeChange={onShowSizeChange}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} của ${total} bản ghi`
            }
            showQuickJumper
            showSizeChanger
          />
        </Spin>
        <ModalAddRecordType wrappedComponentRef={refAddRecordType} />
      </Main>
    </Page>
  );
};

RecordType.defaultProps = {
  dataRecordTypes: [],
};

RecordType.propTypes = {
  data: T.array,
};

const mapState = (state) => ({
  isLoadingRecordType: state.medicalRecord.isLoadingRecordType,
  dataRecordTypes: state.medicalRecord.dataRecordTypes || [],
  recordTypeTotal: state.medicalRecord.recordTypeTotal || 0,
  recordTypePage: state.medicalRecord.recordTypePage || 0,
  recordTypeSize: state.medicalRecord.recordTypeSize || 10,
  recordType: state.medicalRecord.recordType,
});

const mapDispatch = ({
  medicalRecord: { onSearchRecordType, onSizeChangeRecordType, getDetail },
}) => ({
  onSearchRecordType,
  onSizeChangeRecordType,
  getDetail,
});

export default connect(mapState, mapDispatch)(RecordType);
