import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Checkbox, Col, Input, Form } from "antd";
import HomeWrapper from "components/HomeWrapper";
import TableWrapper from "components/TableWrapper";
import CreatedWrapper from "components/CreatedWrapper";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import { combineSort } from "utils";
import { SORT_DEFAULT } from "constants/page/therapyConstant";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  PAGE_DEFAULT,
  ADD_LAYOUT,
  TABLE_LAYOUT,
  HIEU_LUC,
} from "constants/index";
import { Main } from "./styled";
import { checkRole } from "app/Sidebar/constant";
import { ROLES } from "constants/index";
import IcCreate from "assets/images/kho/IcCreate.png";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import Icon from "@ant-design/icons";
let timer = null;

const GroupOfMedicine = ({
  totalElements,
  page,
  size,
  listGroupMedicine,
  getListGroupMedicine,
  createOrEdit,
  dataSearch,
  updateData,
  dataEditDefault,
}) => {
  const [editStatus, setEditStatus] = useState(false);
  const [dataSortColumn, setDataSortColumn] = useState(SORT_DEFAULT);
  const [form] = Form.useForm();
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [state, _setState] = useState({
    showFullTable: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    const sort = combineSort(dataSortColumn);
    const params = { page, size, sort };
    getListGroupMedicine(params);
  }, []);

  const handleAdded = (e) => {
    e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        createOrEdit({
          ...values,
          ...(editStatus ? { id: dataEditDefault.id } : {}),
        }).then(() => {
          const params = {
            page,
            size,
            ...dataSearch,
            sort: combineSort(dataSortColumn),
          };
          if (!editStatus) {
            params.page = PAGE_DEFAULT;
            form.resetFields();
          }
          getListGroupMedicine(params);
        });
      })
      .catch(() => {});
  };

  const onShowAndHandleUpdate = (data = {}) => {
    setEditStatus(true);
    updateData({ dataEditDefault: data });
    form.setFieldsValue(data);
  };

  const onRow = (record) => {
    return {
      onClick: () => {
        onShowAndHandleUpdate(record);
      },
    };
  };

  const onSearchInput = (value, name) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      updateData({ dataSearch: { ...dataSearch, [name]: value } });
      getListGroupMedicine({
        ...dataSearch,
        page: PAGE_DEFAULT,
        size,
        [name]: value,
        sort: combineSort(dataSortColumn),
      });
    }, 500);
  };

  const onClickSort = (key, value) => {
    const sort = { [key]: value, ...dataSortColumn, [key]: value };
    setDataSortColumn(sort);
    const res = combineSort(sort);
    getListGroupMedicine({
      page: PAGE_DEFAULT,
      size,
      sort: res,
      ...dataSearch,
    });
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 3,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã phân nhóm thuốc"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input
              placeholder="Tìm mã phân nhóm thuốc"
              onChange={(e) => {
                onSearchInput(e.target.value, "ma");
              }}
            />
          }
        />
      ),
      width: 14,
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="Tên phân nhóm thuốc"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="Tìm tên phân nhóm thuốc"
              onChange={(e) => {
                onSearchInput(e.target.value, "ten");
              }}
            />
          }
        />
      ),
      width: 14,
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "active");
              }}
            />
          }
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.active || 0}
          title="Có hiệu lực"
        />
      ),
      width: 9,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} onClick={() => {}} />;
      },
    },
  ];

  const onPageChange = (page) => {
    const params = { page: page - 1, size };
    updateData(params);
    getListGroupMedicine({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortColumn),
    });
  };

  const onSizeChange = (size) => {
    const params = { page, size };
    updateData(params);
    getListGroupMedicine({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortColumn),
    });
  };

  const handleCancel = () => {
    if (editStatus) {
      form.setFieldsValue(dataEditDefault);
    } else {
      form.resetFields();
    }
  };

  const handleClickedBtnAdded = () => {
    setEditStatus(false);
    form.resetFields();
    updateData({ dataEditDefault: {} });
  };
  const setRowClassName = (record) => {
    let idDiff = dataEditDefault?.id;
    return record.id === idDiff ? "row-actived" : "";
  };
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
  const handleCollapsePane = () => {
    setCollapseStatus(!collapseStatus);
  };
  return (
    <>
      <Main>
        <HomeWrapper title="Danh mục">
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
              title="Danh mục phân nhóm thuốc"
              styleMain={{ marginTop: 0 }}
              classNameRow={"custom-header"}
              styleContainerButtonHeader={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
                alignItems: "center",
                paddingRight: 35,
              }}
              buttonHeader={
                checkRole([ROLES["DANH_MUC"].PHAN_NHOM_THUOC_THEM])
                  ? [
                      {
                        title: "Thêm mới",
                        onClick: handleClickedBtnAdded,
                        buttonHeaderIcon: (
                          <img
                            style={{ marginLeft: 5 }}
                            src={IcCreate}
                            alt=""
                          />
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
              dataSource={listGroupMedicine}
              onRow={onRow}
              rowClassName={setRowClassName}
            />
            {totalElements && (
              <Pagination
                onChange={onPageChange}
                current={page + 1}
                pageSize={size}
                listData={listGroupMedicine}
                total={totalElements}
                onShowSizeChange={onSizeChange}
                style={{ flex: 1, justifyContent: "flex-end" }}
              />
            )}
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
                roleSave={[ROLES["DANH_MUC"].PHAN_NHOM_THUOC_THEM]}
                roleEdit={[ROLES["DANH_MUC"].PHAN_NHOM_THUOC_SUA]}
                editStatus={editStatus}
              >
                <fieldset
                  disabled={
                    editStatus
                      ? !checkRole([ROLES["DANH_MUC"].PHAN_NHOM_THUOC_SUA])
                      : !checkRole([ROLES["DANH_MUC"].PHAN_NHOM_THUOC_THEM])
                  }
                >
                  <Form
                    form={form}
                    layout="vertical"
                    style={{ width: "100%" }}
                    className="form-custom"
                  >
                    <Form.Item
                      label="Mã phân nhóm thuốc"
                      name="ma"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập mã phân nhóm thuốc!",
                        },
                        {
                          whitespace: true,
                          message: "Vui lòng nhập mã phân nhóm thuốc!",
                        },
                        {
                          max: 20,
                          message:
                            "Vui lòng nhập mã phân nhóm thuốc không quá 20 ký tự!",
                        },
                      ]}
                    >
                      <Input
                        ref={refAutoFocus}
                        className="input-option"
                        placeholder="Vui lòng nhập mã phân nhóm thuốc"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Tên phân nhóm thuốc"
                      name="ten"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên phân nhóm thuốc!",
                        },
                        {
                          whitespace: true,
                          message: "Vui lòng nhập tên phân nhóm thuốc!",
                        },
                        {
                          max: 1000,
                          message:
                            "Vui lòng nhập tên phân nhóm thuốc không quá 1000 ký tự!",
                        },
                      ]}
                    >
                      <Input
                        className="input-option"
                        placeholder="Vui lòng nhập tên phân nhóm thuốc"
                      />
                    </Form.Item>
                    {editStatus && (
                      <Form.Item name="active" valuePropName="checked">
                        <Checkbox>Có hiệu lực</Checkbox>
                      </Form.Item>
                    )}
                  </Form>
                </fieldset>
              </CreatedWrapper>
            </Col>
          )}
        </HomeWrapper>
      </Main>
    </>
  );
};

const mapStateToProps = (state) => {
  const {
    phanNhomDichVuKho: {
      listGroupMedicine,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
    },
  } = state;

  return {
    listGroupMedicine,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
  };
};
const mapDispatchToProps = ({
  phanNhomDichVuKho: { getListGroupMedicine, createOrEdit, updateData },
}) => ({
  getListGroupMedicine,
  createOrEdit,
  updateData,
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupOfMedicine);
