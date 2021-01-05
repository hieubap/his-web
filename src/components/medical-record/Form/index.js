import React, { useEffect, useState, useRef } from "react";
import T from "prop-types";
import { connect } from "react-redux";
import { Spin, Icon, Button, Input, message, Checkbox, Empty } from "antd";
import { Table, ModalConfirm } from "components/common";
import { Main } from "./styled";
import EditIcon from "assets/svg/edit.svg";
import AddNewIcon from "assets/svg/addNew2.svg";
import DragIcon from "assets/svg/ic-drag.svg";
import DeleteIcon from "assets/svg/ic-delete.svg";
import ModalAddForm from "../ModalAddForm";
import ModalEditForm from "../ModalEditForm";
import Page from "components/common/Page";
import PageHeader from "components/common/PageHeader";
import Pagination from "components/Pagination";

import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from "react-sortable-hoc";
import arrayMove from "array-move";
import "./style.css";
const DragHandle = sortableHandle((props) => (
  <div style={{ textAlign: "center", cursor: "move", width: 40 }}>
    <Icon component={DragIcon} />
    <span style={{ marginLeft: 10 }}>{props.value}</span>
  </div>
));
const SortableItem = sortableElement((props) => {
  let className = "ant-table-row ant-table-row-level-0";
  if (!props?.item?.active) className += " disable-row";
  return <tr {...props} className={className} />;
});
const NormalItem = (props) => {
  return <tr {...props} className="ant-table-row ant-table-row-level-0" />;
};
const SortableContainer = sortableContainer((props) => <tbody {...props} />);
const FormCatalog = (props) => {
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const refAddForm = useRef(null);
  const refEditForm = useRef(null);
  const refModalConfirmDelete = useRef(null);

  useEffect(() => {
    onShowSizeChange(10, 10);
  }, []);

  useEffect(() => {
    if (props.editMode) return;
    let recordType = props.recordType;
    if (recordType?.id) {
      onSearch({ ...state, recordType: recordType, page: 1 });
    } else {
      setState({
        data: [],
        total: 0,
        page: 1,
      });
    }
  }, [props.recordType]);

  useEffect(() => {
    if (!props.editMode) return;
    let recordType = props.recordTypeClone;
    if (recordType?.id) {
      onSearch({
        ...state,
        recordType: recordType,
        page: 1,
        size: state.size || 10,
      });
    } else {
      setState({
        data: [],
        total: 0,
        page: 1,
      });
    }
  }, [props.recordTypeClone]);

  const onChangePage = (page) => {
    onSearch({ ...state, page: page });
  };

  const onSearch = ({ page, size = 10, ma = "", ten = "", recordType }) => {
    if (recordType) {
      let data = (recordType.dsBieuMau || []).filter((item, index) => {
        return (
          (!ma ||
            item.bieuMau?.ma
              ?.toLowerCase()
              .createUniqueText()
              .indexOf(ma?.toLowerCase().createUniqueText()) !== -1) &&
          (!ten ||
            item.bieuMau?.ten
              ?.toLowerCase()
              .createUniqueText()
              .indexOf(ten?.toLowerCase().createUniqueText()) !== -1)
        );
      });
      let total = data.length;
      data = data.slice((page - 1) * size, page * size);

      setState({
        recordType,
        ten,
        ma,
        data,
        dataIndex: data.map((item) => item.stt),
        page,
        size,
        total: total,
      });
    }

    // props.onSearch({ page: 0, ten: state.ten, ma: state.ma });
  };

  const onSubmit = () => {
    onSearch(state);
  };
  const showAddNew = () => {
    if (!props.recordType?.id) {
      message.error("Chọn hồ sơ bệnh án cần chỉnh sửa");
      return;
    }
    props.cloneRecordType();
    refAddForm.current.show();
  };
  const showView = (item, readOnly) => () => {
    item.loaiBa = state?.recordType?.ten;
    refEditForm.current.show(item, readOnly, props.editMode);
  };

  const onDeleteForm = (item) => () => {
    // refModalConfirmDelete.current.show(
    //   {
    //     title: "XÁC NHẬN XÓA",
    //     message: "Bạn có chắc chắn muốn xóa biểu mẫu này",
    //   },
    //   () => {
    props.removeForm({ form: item });
    // }
    // );
  };

  const onShowSizeChange = (current, size) => {
    onSearch({ ...state, page: 1, size });
  };

  const onChangeSearch = (type) => (e) => {
    setState({ [type]: e.target.value });
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (newIndex === -1) return;
    const { data, dataIndex = [] } = state;
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(data), oldIndex, newIndex)
        .filter((el) => !!el)
        .map((item, index) => {
          item.stt = dataIndex[index];
          return item;
        });
      setState({ data: newData });
      props.reOrder({ forms: newData });
    }
  };
  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    const { data = [] } = state;
    const index = data.findIndex(
      (x) => x?.bieuMauId === restProps["data-row-key"]
    );
    if (index === -1) return <NormalItem index={index} {...restProps} />;
    return <SortableItem index={index} {...restProps} item={data[index]} />;
  };
  const DraggableContainer = (props) => {
    return (
      <SortableContainer
        useDragHandle
        helperClass="row-dragging"
        onSortEnd={onSortEnd}
        {...props}
      />
    );
  };
  return (
    <Page
      margin={0}
      showPage={props.showPage}
      header={
        props.showHeader && (
          <PageHeader
            leftArea={""}
            rightArea={
              <Button
                type="primary"
                onClick={showAddNew}
                disabled={!props.recordType?.active}
              >
                <Icon component={AddNewIcon} />
                Sửa DS Biểu mẫu
              </Button>
            }
          />
        )
      }
    >
      <Main>
        <Spin
          spinning={
            props.editMode
              ? props.isLoadingCreateRecordType
              : props.isLoadingRecordType
          }
        >
          <Table
            dataSource={state.data || []}
            headerSearch={true}
            scroll={{ y: `calc(100% - ${props.marginBottom || 100}px)` }}
            rowKey={props.sortable ? "bieuMauId" : ""}
            pagination={false}
            disableRow={(item) => !item.active}
            components={
              props.sortable
                ? {
                    body: {
                      wrapper: DraggableContainer,
                      row: DraggableBodyRow,
                    },
                  }
                : {}
            }
            subHeader={[
              {
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
                        onClick={onSubmit}
                      />
                    }
                    onPressEnter={onSubmit}
                  />
                ),
                index: 1,
                align: "left",
              },
              {
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
                        onClick={onSubmit}
                      />
                    }
                    onPressEnter={onSubmit}
                  />
                ),
                index: 2,
                align: "left",
              },
            ]}
            columns={[
              {
                title: "STT",
                width: 50,
                key: "stt",
                className: "drag-visible",
                render: (value, item, index) => {
                  if (props.sortable)
                    return (
                      <DragHandle
                        value={`${(state.page - 1) * state.size + index + 1}`}
                      />
                    );
                  return (
                    <span>{`${
                      (state.page - 1) * state.size + index + 1
                    }`}</span>
                  );
                },
              },
              {
                title: "Mã Biểu mẫu",
                width: 110,
                key: "bieuMauId",
                dataIndex: "bieuMauId",
                render: (value, item, index) => {
                  return <span>{item.bieuMau?.ma}</span>;
                },
              },
              {
                title: "Tên Biểu mẫu",
                key: "tenBieuMau",
                className: "drag-visible",
                dataIndex: "tenBieuMau",
                render: (value, item, index) => {
                  return <span>{item.bieuMau?.ten}</span>;
                },
              },
              {
                title: "Mặc định",
                key: "macDinh",
                width: 70,
                dataIndex: "macDinh",
                render: (value, item, index) => {
                  return <Checkbox checked={item.macDinh} />;
                },
              },
              {
                title: "Nhiều mẫu",
                key: "taoNhieuMau",
                width: 80,
                dataIndex: "taoNhieuMau",
                render: (value, item, index) => {
                  return <Checkbox checked={item.taoNhieuMau} />;
                },
              },
              // {
              //   title: "HSĐD",
              //   key: "hsdd",
              //   width: 65,
              //   dataIndex: "hsdd",
              //   render: (value, item, index) => {
              //     return <Checkbox checked={item.hsdd} />;
              //   },
              // },
              {
                title: "Hiệu lực",
                key: "active",
                width: 65,
                dataIndex: "active",
                render: (value, item, index) => {
                  return <Checkbox checked={item.active} />;
                },
              },
              {
                title: "Thao tác",
                width: 90,
                render: (value, item, index) => {
                  return (
                    <div className="action">
                      <Icon
                        type="eye"
                        onClick={showView(item, true)}
                        style={{ color: "#08AAA8" }}
                      />
                      {props.recordType?.active && (
                        <Icon
                          component={EditIcon}
                          onClick={showView(item, false)}
                        />
                      )}
                      {!item.id && props.editMode && (
                        <Icon
                          component={DeleteIcon}
                          onClick={onDeleteForm(item)}
                        />
                      )}
                    </div>
                  );
                },
              },
            ]}
          >
            <Empty description={"Không có dữ liệu"} />
          </Table>

          <Pagination
            pageSize={state.size || 10}
            current={state.page}
            className={"patient-paging"}
            total={state.total}
            onChange={onChangePage}
            onShowSizeChange={onShowSizeChange}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} của ${total} bản ghi`
            }
            showQuickJumper
            showSizeChanger
          />
        </Spin>
        {!props.editMode && <ModalAddForm ref={refAddForm} />}
        <ModalConfirm ref={refModalConfirmDelete} />
        <ModalEditForm wrappedComponentRef={refEditForm} />
      </Main>
    </Page>
  );
};

FormCatalog.defaultProps = {
  data: [],
  showHeader: true,
  sortable: false,
  editMode: false,
  isLoadingCreateRecordType: false,
};

FormCatalog.propTypes = {
  data: T.array,
  showHeader: T.bool,
  isLoadingCreateRecordType: T.bool,
  sortable: T.bool,
  editMode: T.bool,
};

const mapState = (state) => ({
  isLoadingRecordType: state.medicalRecord.isLoadingRecordType,
  isLoadingCreateRecordType: state.medicalRecord.isLoadingCreateRecordType,
  recordType: state.medicalRecord.recordType,
  recordTypeClone: state.medicalRecord.recordTypeClone,
  data: [{ id: 0 }, ...(state.form.data || [])],
  total: state.form.total || 0,
  page: state.form.page || 0,
  size: state.form.size || 10,
});

const mapDispatch = ({
  medicalRecord: { cloneRecordType, onSave, removeForm, reOrder },
}) => ({
  cloneRecordType,
  onSave,
  removeForm,
  reOrder,
});

export default connect(mapState, mapDispatch)(FormCatalog);
