import React, {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import T from "prop-types";
import { connect } from "react-redux";
import { Spin, Icon, Input, message, Select, Row, Col, Checkbox } from "antd";
import { Table } from "components/common";
import { Main } from "./styled";
import Pagination from "components/Pagination";
import { useTranslation } from "react-i18next";
import ModalSignPdf from "pages/files/components/ModalSignPdf";
import EditIcon from "assets/svg/edit.svg";
import ModalUploadForm from "components/Scan/ModalUploadForm";

const Scan = (props, ref) => {
  const { t } = useTranslation();
  const refModalSignPdf = useRef(null);
  const refAddForm = useRef(null);
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
    props.getAllForm({ size: 9999, active: true });
  }, []);

  const onChangePage = (page) => {
    props.onSearch({
      page: page - 1,
      patientDocument: state.patientDocument,
      formId: state.formId,
      ten: state.ten,
      ma: state.ma,
    });
  };

  const onSearch = () => {
    props.onSearch({
      page: 0,
      patientDocument: state.patientDocument,
      formId: state.formId,
    });
  };

  useImperativeHandle(ref, () => ({
    addForm: () => {
      refAddForm.current.show({}, (id, data) => {
        onSearch();
      });
    },
  }));
  const showView = (item, isEdit) => () => {
    if (!isEdit)
      props.getFileScan(item.duongDan).then((s) => {
        if (refModalSignPdf.current) {
          refModalSignPdf.current.show({
            formId: item.dmBieuMauId,
            maHoSo: item.maHoSo,
            urlFile: s,
            soPhieu: item?.soPhieu,
            maBieuMau: item?.maBieuMau,
            tenBieuMau: item?.tenBieuMau,
          });
        }
      });
    else {
      refAddForm.current.show(item, (id, data) => {});
    }
  };

  const onShowSizeChange = (current, size) => {
    props.onSizeChange({ size, ten: state.ten, ma: state.ma });
  };

  const onChangeSearch = (type) => (e) => {
    setState({ [type]: e.target.value });
  };
  const filterOption = (input, option) => {
    return (
      (option.props.name || "")
        .toLowerCase()
        .createUniqueText()
        .indexOf(input.toLowerCase().createUniqueText()) >= 0
    );
  };
  const selectDocuments = (value) => {
    setState({ ["formId"]: value });
    props.onSearch({
      page: 0,
      patientDocument: state.patientDocument,
      formId: value,
    });
  };

  return (
    <Main>
      <Spin spinning={props.isLoading} root="true">
        <Row gutter={12} style={{ marginBottom: 10 }}>
          <Col span={6}>
            <Input
              onChange={onChangeSearch("patientDocument")}
              type="text"
              value={state.patientDocument}
              placeholder="Nhập mã hồ sơ"
              prefix={
                <Icon
                  type="search"
                  style={{ color: "#125872" }}
                  onClick={onSearch}
                />
              }
              onPressEnter={onSearch}
            />
          </Col>
          <Col span={6}>
            <Select
              showSearch
              size={"default"}
              placeholder="Chọn biểu mẫu"
              className="search-item"
              filterOption={filterOption}
              onSelect={selectDocuments}
              notFoundContent={
                <span id={"no-data-mess"}>{t("drugDistributions.noData")}</span>
              }
              id={"department"}
              style={{ width: "100%" }}
            >
              <Select.Option value={""}>
                <div
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Tất cả
                </div>
              </Select.Option>
              {props.forms &&
                props.forms.map((item, index) => (
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
          </Col>
        </Row>
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
              width: 50,
              title: "STT",
              key: "index",
              render: (value, item, index) => {
                return <span>{`${props.page * props.size + index + 1}`}</span>;
              },
            },
            {
              width: 100,
              title: "Mã biểu mẫu",
              key: "maBieuMau",
              dataIndex: "maBieuMau",
              render: (value, item, index) => {
                return <span>{value}</span>;
              },
            },
            {
              width: 160,
              title: "Họ và tên",
              key: "tenNb",
              dataIndex: "tenNb",
            },
            {
              width: 130,
              title: "Biểu mẫu",
              key: "tenBieuMau",
              dataIndex: "tenBieuMau",
            },
            {
              width: 110,
              title: "Thời gian tạo",
              key: "createdAt",
              dataIndex: "createdAt",
              render: (value) => value?.toDateObject()?.format("dd/MM/yyyy HH:mm")
            },
            {
              width: 110,
              title: "Ngày sinh",
              key: "patientHistory.birthday",
              dataIndex: "patientHistory.birthday",
              render: (value, record, index) => {
                return (
                  <span>
                    {(() => {
                      let birthday = record?.ngaySinh;
                      if (birthday) {
                        if (record?.onlyYearBirth)
                          return birthday?.toDateObject()?.format("yyyy");
                        return birthday?.toDateObject()?.format("dd/MM/yyyy");
                      }
                      return "";
                    })()}
                  </span>
                );
              },
            },
            {
              width: 70,
              title: "Giới tính",
              key: "gender",
              dataIndex: "gender",
              render: (text, record) => (
                <span>{record?.gioiTinh === 1 ? "Nam" : "Nữ"}</span>
              ),
            },
            {
              title: "Địa chỉ",
              dataIndex: "diaChi",
              key: "diaChi",
            },
            {
              width: 90,
              title: "Có hiệu lực",
              key: "active",
              dataIndex: "active",
              render: (text, record) => <Checkbox checked={record.active} />,
            },
            {
              width: 131,
              title: "Xem",
              render: (value, record, index) => {
                return (
                  <div className="action">
                    <Icon
                      type="eye"
                      onClick={showView(record, false)}
                      style={{ color: "#08AAA8" }}
                    />
                    <Icon
                      component={EditIcon}
                      onClick={showView(record, true)}
                    />
                  </div>
                );
              },
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
      <ModalSignPdf ref={refModalSignPdf} />
      <ModalUploadForm
        wrappedComponentRef={refAddForm}
        needResetPatient={true}
      />
    </Main>
  );
};

Scan.defaultProps = {};

Scan.propTypes = {
  data: T.array,
};

const mapState = (state) => ({
  isLoading: state.scan.isLoading,
  data: state.scan.data || [],
  total: state.scan.total || 0,
  page: state.scan.page || 0,
  size: state.scan.size || 10,
  forms: state.form.forms || [],
});

const mapDispatch = ({
  scan: { onSearch, onSizeChange, getFileScan },
  form: { getAllForm },
}) => ({
  onSearch,
  onSizeChange,
  getAllForm,
  getFileScan,
});

export default connect(mapState, mapDispatch, null, { forwardRef: true })(
  forwardRef(Scan)
);
