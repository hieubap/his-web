import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Checkbox, Col, Input, Form } from "antd";
import HomeWrapper from "components/HomeWrapper";
import TableWrapper from "components/TableWrapper";
import CreatedWrapper from "components/CreatedWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import Select from "components/Select";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  HIEU_LUC,
  TABLE_LAYOUT,
  ADD_LAYOUT,
  ROLES,
} from "constants/index";
import { Main } from "./styled";
import { SORT_DEFAULT } from "./configs";
import { checkRole } from "app/Sidebar/constant";
import FormWraper from "components/FormWraper";
let timer = null;

const ThietLap = ({
  listData,
  onSizeChange,
  updateData,
  onChangeInputSearch,
  onSortChange,
  dataSortColumn,
  totalElements,
  page,
  size,
  onSearch,
  dataEditDefault,
  createOrEdit,
}) => {
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [form] = Form.useForm();

  const [state, _setState] = useState({
    mauBaoCao: null,
    editStatus: false,
    defaultFileList: [],
    showFullTable: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    onSizeChange({ size: 10 });
  }, []);

  const handleClickedBtnAdded = () => {
    setState({
      editStatus: false,
    });
    form.resetFields();
  };

  const onShowAndHandleUpdate = (data = {}) => {
    updateData({ dataEditDefault: data });
    setState({
      editStatus: true,
    });
    form.setFieldsValue(data);
  };

  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        onShowAndHandleUpdate(record);
      },
    };
  };

  const handleCollapsePane = () => {
    setCollapseStatus(!collapseStatus);
  };

  const onClickSort = (key, value) => {
    onSortChange({
      [key]: value,
    });
  };

  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    clearTimeout(timer);
    timer = setTimeout(() => {
      onChangeInputSearch({
        [key]: value,
      });
    }, 500);
  };

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const handleCancel = () => {
    if (state.editStatus) {
      form.setFieldsValue(dataEditDefault);
    } else {
      form.resetFields();
    }
  };

  const handleAdded = (e) => {
    e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        let formattedData = {
          ...values,
          giaTri: values?.giaTri?.trim(),
          ma: values?.ma?.trim(),
          ten: values.ten?.trim(),
        };
        if (state.editStatus) {
          formattedData = { ...formattedData, id: dataEditDefault.id };
        }

        createOrEdit(formattedData).then(() => {
          if (!state.editStatus) {
            form.resetFields();
          }
        });
      })
      .catch((error) => {});
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "40px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã thiết lập"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ma"] || 0}
          search={
            <Input
              placeholder="Tìm mã thiết lập"
              onChange={onSearchInput("ma")}
            />
          }
        />
      ),
      align: "left",
      width: "120px",
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="Giá trị"
          sort_key="giaTri"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["giaTri"] || 0}
          search={
            <Input
              placeholder="Tìm theo giá trị"
              onChange={onSearchInput("giaTri")}
            />
          }
        />
      ),
      width: "120px",
      align: "left",
      dataIndex: "giaTri",
      key: "giaTri",
    },
    {
      title: (
        <HeaderSearch
          title="Mô tả"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ten"] || 0}
          search={
            <Input
              placeholder="Tìm theo mô tả"
              onChange={onSearchInput("ten")}
            />
          }
        />
      ),
      width: "120px",
      align: "left",
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.active || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              onChange={onSearchInput("active")}
            />
          }
          title="Có hiệu lực"
        />
      ),
      width: "70px",
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
  ];
  const refAutoFocus = useRef(null);
  useEffect(() => {
    if (refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
  }, [dataEditDefault]);
  const handleChangeshowTable = () => {
    setState({
      changeShowFullTbale: true,
      showFullTable: !state.showFullTable,
    });
    setTimeout(() => {
      setState({
        changeShowFullTbale: false,
      });
    }, 1000);
  };
  return (
    <Main>
      <HomeWrapper title="Thiết lập">
        <Col
          {...(!state.showFullTable
            ? collapseStatus
              ? TABLE_LAYOUT_COLLAPSE
              : TABLE_LAYOUT
            : null)}
          span={state.showFullTable ? 24 : null}
          className={`pr-3 ${
            state.changeShowFullTbale ? "" : "transition-ease"
          }`}
        >
          <TableWrapper
            title="Thiết lập chung"
            scroll={{ x: 1000 }}
            classNameRow={"custom-header"}
            styleMain={{ marginTop: 0 }}
            styleContainerButtonHeader={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingRight: 35,
            }}
            scroll={{ x: 1000 }}
            buttonHeader={
              checkRole([ROLES.THIET_LAP_CHUNG_THEM])
                ? [
                    {
                      title: "Thêm mới",
                      onClick: handleClickedBtnAdded,
                      buttonHeaderIcon: (
                        <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
                      ),
                    },
                    {
                      className: "btn-change-full-table",
                      title: (
                        <Icon
                          component={state.showFullTable ? thuNho : showFull}
                        />
                      ),
                      onClick: handleChangeshowTable,
                    },
                    {
                      className: "btn-collapse",
                      title: (
                        <Icon
                          component={
                            collapseStatus ? extendTable : extendChiTiet
                          }
                        />
                      ),
                      onClick: handleCollapsePane,
                    },
                  ]
                : [
                    {
                      className: "btn-change-full-table",
                      title: (
                        <Icon
                          component={state.showFullTable ? thuNho : showFull}
                        />
                      ),
                      onClick: handleChangeshowTable,
                    },
                    {
                      className: "btn-collapse",
                      title: (
                        <Icon
                          component={
                            collapseStatus ? extendTable : extendChiTiet
                          }
                        />
                      ),
                      onClick: handleCollapsePane,
                    },
                  ]
            }
            columns={columns}
            dataSource={listData}
            onRow={onRow}
          />
          {!!totalElements ? (
            <Pagination
              onChange={onChangePage}
              current={page + 1}
              pageSize={size}
              total={totalElements}
              listData={listData}
              onShowSizeChange={(e) => onSizeChange({ size: e })}
              style={{ flex: 1, justifyContent: "flex-end" }}
            />
          ) : null}
        </Col>
        {!state.showFullTable && (
          <Col
            {...(collapseStatus ? ADD_LAYOUT_COLLAPSE : ADD_LAYOUT)}
            className={`mt-3 ${
              state.changeShowFullTbale ? "" : "transition-ease"
            }`}
            style={
              state.isSelected
                ? { border: "2px solid #c1d8fd", borderRadius: 20 }
                : {}
            }
          >
            <CreatedWrapper
              title="Thông tin chi tiết"
              onCancel={handleCancel}
              cancelText="Hủy"
              onOk={handleAdded}
              okText="Lưu"
              roleSave={[ROLES.THIET_LAP_CHUNG_THEM]}
              roleEdit={[ROLES.THIET_LAP_CHUNG_SUA]}
              editStatus={state.editStatus}
            >
              <FormWraper
                disabled={
                  state.editStatus
                    ? !checkRole([ROLES.THIET_LAP_CHUNG_SUA])
                    : !checkRole([ROLES.THIET_LAP_CHUNG_THEM])
                }
                form={form}
                layout="vertical"
                style={{ width: "100%" }}
                className="form-custom"
              >
                <Form.Item
                  label="Mã thiết lập"
                  style={{ width: "100%" }}
                  name="ma"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mã thiết lập!",
                    },
                    {
                      max: 50,
                      message: "Vui lòng nhập mã thiết lập không quá 50 ký tự!",
                    },
                    {
                      whitespace: true,
                      message: "Vui lòng nhập mã thiết lập!",
                    },
                  ]}
                >
                  <Input
                    ref={refAutoFocus}
                    className="input-option"
                    placeholder="Vui lòng nhập mã thiết lập"
                  />
                </Form.Item>
                <Form.Item
                  label="Giá trị"
                  name="giaTri"
                  style={{ width: "100%" }}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập giá trị!",
                    },
                    {
                      max: 1000,
                      message: "Vui lòng nhập giá trị không quá 1000 ký tự!",
                    },
                    {
                      whitespace: true,
                      message: "Vui lòng nhập giá trị!",
                    },
                  ]}
                >
                  <Input
                    className="input-option"
                    placeholder="Vui lòng nhập giá trị"
                  />
                </Form.Item>
                <Form.Item
                  label="Mô tả"
                  name="ten"
                  style={{ width: "100%" }}
                  rules={[
                    {
                      max: 1000,
                      message: "Vui lòng nhập giá trị không quá 1000 ký tự!",
                    },
                  ]}
                >
                  <Input
                    className="input-option"
                    placeholder="Vui lòng nhập mô tả"
                  />
                </Form.Item>
                {state.editStatus && (
                  <Form.Item label=" " name="active" valuePropName="checked">
                    <Checkbox>Có hiệu lực</Checkbox>
                  </Form.Item>
                )}
              </FormWraper>
            </CreatedWrapper>
          </Col>
        )}
      </HomeWrapper>
    </Main>
  );
};

const mapStateToProps = ({
  thietLap: {
    listData,
    totalElements,
    page,
    size,
    dataSearch,
    dataSort,
    dataSortColumn,
    dataEditDefault,
  },
}) => {
  return {
    listData,
    totalElements,
    page,
    size,
    dataSearch: dataSearch || {},
    dataSort,
    dataSortColumn: dataSortColumn || SORT_DEFAULT,
    dataEditDefault,
  };
};
const mapDispatchToProps = ({
  thietLap: {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
    createOrEdit,
  },
}) => ({
  onSearch,
  onSizeChange,
  onSortChange,
  onChangeInputSearch,
  updateData,
  createOrEdit,
});
export default connect(mapStateToProps, mapDispatchToProps)(ThietLap);
