import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { connect } from "react-redux";
import { Spin, Checkbox } from "antd";
import { Table } from "components/common";
import { Main } from "./styled";
import Pagination from 'components/Pagination';

const FormCatalog = (props, ref) => {
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    props.onSizeChange({
      size: 20,
      active: true,
      loaiHoSoBaId: props.recordType.id,
    });
  }, []);

  const onChangePage = (page) => {
    props.onSearch({
      page: page - 1,
      ten: state.ten,
      ma: state.ma,
      active: true,
      loaiHoSoBaId: props.recordType.id,
      timKiem: state.timKiem,
    });
  };

  const onSearch = (text) => {
    setState({
      timKiem: text,
    });
    props.onSearch({
      page: 0,
      timKiem: text,
      active: true,
      loaiHoSoBaId: props.recordType.id,
    });
  };
  useImperativeHandle(ref, () => ({
    onSearch,
  }));

  const onShowSizeChange = (current, size) => {
    props.onSizeChange({
      size,
      ten: state.ten,
      ma: state.ma,
      loaiHoSoBaId: props.recordType.id,
    });
  };

  const getChecked = (item) => {
    if (props.recordTypeClone?.dsBieuMau?.length) {
      return (
        props.recordTypeClone.dsBieuMau.findIndex(
          (x) => x.bieuMauId === item.id
        ) >= 0
      );
    }
  };
  const onRowClick = (record, rowIndex) => {
    return {
      onClick: (event) => {
        props.addFormToRecordType({
          form: record,
          macDinh: props.macDinh,
          taoNhieuMau: props.taoNhieuMau,
          active: props.active,
          hsdd: props.hsdd,
        });
      }, // click row
    };
  };
  const disableRow = (item) => {
    return (
      props.recordTypeClone?.dsBieuMau?.findIndex(
        (x) => x.bieuMauId === item.id
      ) >= 0
    );
  };
  return (
    <Main>
      <Spin spinning={props.isLoading}>
        <Table
          onRow={onRowClick}
          dataSource={props.data}
          rowKey="id"
          disableRow={disableRow}
          pagination={false}
          scroll={{ y: "calc(100vh - 250px)" }}
          columns={[
            {
              title: "STT",
              width: 80,
              key: "stt",
              render: (value, item, index) => {
                return (
                  <div>
                    <Checkbox
                      disabled={getChecked(item)}
                      checked={getChecked(item)}
                    />
                    <span style={{ marginLeft: 10 }}>{`${
                      props.page * props.size + index + 1
                    }`}</span>
                  </div>
                );
              },
            },
            {
              width: 100,
              title: "Mã biểu mẫu",
              dataIndex: "ma",
              key: "ma",
              align: "left",
            },
            {
              title: "Tên biểu mẫu",
              dataIndex: "ten",
              key: "ten",
              align: "left",
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

const mapState = (state) => {
  return {
    isLoading: state.form.isLoading,
    data: state.form.data || [],
    total: state.form.total || 0,
    page: state.form.page || 0,
    size: state.form.size || 10,
    recordTypeClone: state.medicalRecord.recordTypeClone || {},
    recordType: state.medicalRecord.recordType || {},
  };
};

const mapDispatch = ({
  form: { onSearch, onSizeChange },
  medicalRecord: { addFormToRecordType },
}) => ({
  onSearch,
  onSizeChange,
  addFormToRecordType,
});

export default connect(mapState, mapDispatch, null, { forwardRef: true })(
  forwardRef(FormCatalog)
);
