import React, {
  useEffect,
  useState,
  useImperativeHandle,
  useMemo,
  useDebugValue,
  useRef,
} from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Main } from "./styled";
import { combineSort } from "utils";
import { SORT_DEFAULT } from "constants/page/therapyConstant";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import {
  Pagination,
  HeaderSearch,
  CreatedWrapper,
  TableWrapper,
  HomeWrapper,
  Select,
  ListImage,
} from "components";
import {
  PAGE_DEFAULT,
  ADD_LAYOUT,
  TABLE_LAYOUT,
  HIEU_LUC,
  TABLE_LAYOUT_COLLAPSE,
  ADD_LAYOUT_COLLAPSE,
} from "constants/index";
import { Checkbox, Col, Input, Modal, Form, DatePicker, Row } from "antd";
import imgSearch from "assets/images/template/icSearch.png";
import { clone, groupBy, set } from "lodash";
import cloneDeep from "lodash/cloneDeep";
import { openInNewTab } from "../../../utils";
import { checkRole } from "app/Sidebar/constant";
import { ROLES } from "constants/index";
let timer = null;

const SettingsAccount = (props) => {
  const {
    listAccount,
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
    listRoles,
    getListRoles,
    listAllNhanVien,
    getListAllNhanVien,
  } = props;

  const [collapseStatus, setCollapseStatus] = useState(false);
  const [logo, setLogo] = useState("");
  const [form] = Form.useForm();
  const CheckboxGroup = Checkbox.Group;

  const defaultPlainOptions = listRoles
    .sort((a, b) => (a.ten > b.ten ? 1 : -1))
    .map((item) => ({ value: item.id, label: item.ten }));
  const [plainOptions, setPlainOptions] = useState(defaultPlainOptions);
  const [checkedList, setCheckedList] = useState(defaultPlainOptions);
  const [indeterminate, setIndeterminate] = React.useState(false);
  const [checkAll, setCheckAll] = React.useState(false);

  const [state, _setState] = useState({
    editStatus: false,
    groupRoles: [],
    dataRoles: {},
    isCheckedAll: false,
    inValidRoles: false,
    checked: false,
    indeterminateCheckAll: false,
    showFullTable: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { dataRoles } = state;

  useEffect(() => {
    onSizeChange(10);
    if (!listRoles?.length) {
      getListRoles({ active: true, size: 500 });
    }

    if (!listAllNhanVien?.length) {
      getListAllNhanVien({ active: true });
    }
  }, []);

  useEffect(() => {
    const temp = listRoles.map((item) => ({ value: item.id, label: item.ten }));
    setPlainOptions(temp);
  }, [listRoles]);

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
    }, 300);
  };

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 48,
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Tên TK"
          sort_key="taiKhoan"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["taiKhoan"] || 0}
          search={
            <Input
              placeholder="Tìm kiếm"
              onChange={onSearchInput("taiKhoan")}
            />
          }
        />
      ),
      width: 108,
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: (
        <HeaderSearch
          title="Họ tên"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ten"] || 0}
          search={
            <Input placeholder="Tìm kiếm" onChange={onSearchInput("ten")} />
          }
        />
      ),
      width: 191,
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          title="Mã nhân viên"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ma"] || 0}
          search={
            <Input placeholder="Tìm kiếm" onChange={onSearchInput("ma")} />
          }
        />
      ),
      width: 174,
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="Vai trò"
          sort_key="dsVaiTroId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dsVaiTroId"] || 0}
          search={
            <Input
              placeholder="Tìm kiếm"
              onChange={onSearchInput("dsVaiTroId")}
            />
          }
        />
      ),
      width: 140,
      dataIndex: "dsVaiTro",
      key: "dsVaiTro",
      render: (item) => {
        return (
          item &&
          item.length > 0 &&
          item
            .sort((a, b) => (a.ten > b.ten ? 1 : -1))
            .map((e) => e.ten)
            .join(",")
        );
      },
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              defaultValue=""
              onChange={onSearchInput("active")}
            />
          }
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.active || 0}
          title="Có hiệu lực"
        />
      ),
      width: 108,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    // {
    //   title: <HeaderSearch title="Actions" />,
    //   width: 48,
    //   align: "center",
    //   key: "action",
    //   render: (item, list) => (
    //     <a onClick={resetPassWord(list)}>Action</a>
    //     // <Space size="middle">
    //     //   <a>Action</a>
    //     // </Space>
    //   ),
    // },
  ];

  const handleAdded = (e) => {
    e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        let dsVaiTro = [];
        let dsVaiTroId = [];

        let nhanVien = listAllNhanVien.find((item) => {
          return item.ma === values.ma;
        });
        let nhanVienId = nhanVien?.id;

        if (checkAll) {
          listRoles.forEach((item) => {
            dsVaiTro.push({ id: item.id, ma: item.ma, ten: item.ten });
            dsVaiTroId.push(item.id);
          });
        } else {
          listRoles.forEach((item) => {
            if (checkedList.includes(item.id)) {
              dsVaiTro.push({ id: item.id, ma: item.ma, ten: item.ten });
              dsVaiTroId.push(item.id);
            }
          });
        }

        // checkedList?.forEach((item) => {
        //   dsVaiTro.push({ id: item.id, ma: item.ma, ten: item.ten });
        //   dsVaiTroId.push(item.id);
        // });

        let formattedData = {
          ...values,
          dsVaiTro,
          dsVaiTroId,
          nhanVien,
          nhanVienId,
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

  const resetPassWord = (item) => () => {
    item.passWord = "123456";
    let formattedData = {
      ...item,
    };
    formattedData = { ...formattedData, id: item.id };
    createOrEdit(formattedData).then(() => {});
  };

  const onShowAndHandleUpdate = (data = {}) => {
    updateData({ dataEditDefault: data });

    if (!data.dsVaiTroId.length) {
      setCheckAll(false);
      setIndeterminate(false);
    } else if (data.dsVaiTroId.length === listRoles.length) {
      setCheckAll(true);
      setIndeterminate(false);
    } else if (data.dsVaiTroId.length > 0) {
      setCheckAll(false);
      setIndeterminate(true);
    }
    setCheckedList(data.dsVaiTroId);
    setState({
      editStatus: true,
    });
    setLogo(data.anhDaiDien);
    form.setFieldsValue(data);
  };

  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        onShowAndHandleUpdate(record);
      },
    };
  };

  const handleClickedBtnAdded = () => {
    setState({
      editStatus: false,
    });
    setCheckAll(false);
    setIndeterminate(false);
    setCheckedList(null);
    updateData({ dataEditDefault: null });
    form.resetFields();
  };

  const handleCancel = () => {
    setState({
      dataRoles: {},
    });
    if (state.editStatus) {
      form.setFieldsValue(dataEditDefault);
    } else {
      form.resetFields();
    }
  };

  const onUpdateData = (item, type) => {
    setLogo(item);
    form.setFieldsValue({ [type]: item });
  };

  const filterByRoles = (e) => {
    let { value } = e.target;
    let filterData = !value
      ? defaultPlainOptions
      : plainOptions.filter(
          (item) =>
            item.label
              ?.toLowerCase()
              .unsignText()
              .indexOf(value.toLowerCase()) >= 0
        );
    setPlainOptions(filterData);
  };

  const onChange = (list) => {
    setState({
      dataRoles: list,
    });
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e) => {
    let obj = [];
    plainOptions.map((item) => {
      obj.push(item.value);
    });
    setCheckedList(e.target.checked ? obj : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
    setState({
      dataRoles: plainOptions,
    });
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
    <Main>
      <HomeWrapper title="Quản trị">
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
            title="Quản lý tài khoản"
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
            buttonHeader={
              checkRole([ROLES["QUAN_LY_TAI_KHOAN"].QUAN_LY_TAI_KHOAN_THEM])
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
            dataSource={listAccount}
            onRow={onRow}
            rowKey={(record) => record.id}
            rowClassName={setRowClassName}
          ></TableWrapper>
          {!!totalElements ? (
            <Pagination
              onChange={onChangePage}
              current={page + 1}
              pageSize={size}
              listData={listAccount}
              total={totalElements}
              onShowSizeChange={onSizeChange}
              style={{ flex: 1, justifyContent: "flex-end" }}
            />
          ) : null}
        </Col>
        {!state.showFullTable && (
          <Col
            {...(collapseStatus ? ADD_LAYOUT_COLLAPSE : ADD_LAYOUT)}
            // className={`mt-3 ${state.changeShowFullTbale ? "" : "transition-ease"}`}
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
              roleSave={[ROLES["QUAN_LY_TAI_KHOAN"].QUAN_LY_TAI_KHOAN_THEM]}
              roleEdit={[ROLES["QUAN_LY_TAI_KHOAN"].QUAN_LY_TAI_KHOAN_SUA]}
              editStatus={state.editStatus}
            >
              <fieldset
                disabled={
                  state.editStatus
                    ? !checkRole([
                        ROLES["QUAN_LY_TAI_KHOAN"].QUAN_LY_TAI_KHOAN_SUA,
                      ])
                    : !checkRole([
                        ROLES["QUAN_LY_TAI_KHOAN"].QUAN_LY_TAI_KHOAN_THEM,
                      ])
                }
              >
                <Form
                  form={form}
                  layout="vertical"
                  style={{ width: "100%" }}
                  className="form-custom"
                >
                  <div style={{ width: "70%" }}>
                    <Form.Item
                      label="Tên tài khoản"
                      name="taiKhoan"
                      style={{ width: "100%" }}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên tài khoản",
                        },
                        {
                          max: 255,
                          message:
                            "Vui lòng nhập tên tài khoản không quá 255 ký tự!",
                        },
                      ]}
                    >
                      <Input
                        ref={refAutoFocus}
                        className="input-option"
                        placeholder="Vui lòng nhập tên tài khoản"
                        maxLength={255}
                      />
                    </Form.Item>
                    <div>
                      <div style={{ width: "50%", float: "left" }}>
                        <Form.Item
                          label={
                            <div
                              className="pointer"
                              onClick={() =>
                                openInNewTab("/danh-muc/nhan-vien")
                              }
                            >
                              Mã nhân viên
                            </div>
                          }
                          name="ma"
                          style={{ width: "100%" }}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập mã nhân viên",
                            },
                          ]}
                        >
                          <Select
                            data={listAllNhanVien}
                            placeholder="Mã nhân viên"
                            ten="ma"
                          />
                        </Form.Item>
                        <Form.Item
                          label="Tên đơn vị công tác"
                          name="donViCongTac"
                          style={{ width: "100%" }}
                        >
                          <Input
                            className="input-option"
                            placeholder="Tên đơn vị công tác"
                          />
                        </Form.Item>
                      </div>
                      <div style={{ width: "50%", float: "right" }}>
                        <Form.Item
                          label={
                            <div
                              className="pointer"
                              onClick={() =>
                                openInNewTab("/danh-muc/nhan-vien")
                              }
                            >
                              Họ tên
                            </div>
                          }
                          name="ten"
                          style={{ width: "100%" }}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập họ tên",
                            },
                          ]}
                        >
                          <Select
                            data={listAllNhanVien}
                            id="ten"
                            placeholder="Họ tên"
                          />
                        </Form.Item>

                        <Form.Item
                          label="Địa chỉ đơn vị công tác"
                          name="diaChiDonViCongTac"
                          style={{ width: "100%" }}
                        >
                          <Input
                            className="input-option"
                            placeholder="Địa chỉ đơn vị công tác"
                          />
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div style={{ width: "30%" }}>
                    <Form.Item
                      label="Ảnh đại diện"
                      name="anhDaiDien"
                      style={{ width: "100%" }}
                    >
                      <ListImage
                        uploadImage={(e) => onUpdateData(e, "anhDaiDien")}
                        files={logo}
                        provider="nhanVien"
                      />
                    </Form.Item>
                    {state.editStatus && (
                      <Form.Item
                        label=" "
                        name="active"
                        valuePropName="checked"
                        style={{ width: "100%" }}
                      >
                        <Checkbox>Có hiệu lực</Checkbox>
                      </Form.Item>
                    )}
                  </div>
                </Form>
                <div className="permission-action">
                  <div className="header-permission">Gán vai trò</div>
                  <div className="content-permission">
                    <div className="action-filter addition-box">
                      <div className="select addition-box">
                        <div className="input-box">
                          <img src={imgSearch} alt="imgSearch" />
                          <Input
                            placeholder="Tìm kiếm vai trò"
                            onChange={filterByRoles}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="list-func__title">
                      <Checkbox
                        indeterminate={indeterminate}
                        onChange={onCheckAllChange}
                        checked={checkAll}
                      >
                        Tất cả
                      </Checkbox>
                      <hr />
                      <div className="">
                        <Checkbox.Group
                          style={{ width: "100%" }}
                          onChange={onChange}
                          value={checkedList}
                        >
                          <Row>
                            {plainOptions?.map((item) => {
                              return (
                                <Col span={8} key={item.value}>
                                  <Checkbox value={item.value}>
                                    {item.label}
                                  </Checkbox>
                                </Col>
                              );
                            })}
                          </Row>
                        </Checkbox.Group>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </CreatedWrapper>
          </Col>
        )}
      </HomeWrapper>
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    adminTaiKhoanHeThong: {
      listAccount,
      totalElements,
      page,
      size,
      dataSearch,
      dataSort,
      dataSortColumn,
      dataEditDefault,
    },
    adminVaiTroHeThong: { listData: listRoles },
    nhanVien: { listAllNhanVien },
    quyen: { listAllData: listAllPermission },
  } = state;

  return {
    listAccount,
    totalElements,
    page,
    size,
    dataSearch,
    dataSort,
    dataSortColumn: dataSortColumn || SORT_DEFAULT,
    dataEditDefault,
    listRoles,
    listAllNhanVien,
    listAllPermission,
  };
};
const mapDispatchToProps = ({
  adminTaiKhoanHeThong: {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
    createOrEdit,
  },
  adminVaiTroHeThong: { onSearchTongHop: getListRoles },
  nhanVien: { getListAllNhanVien: getListAllNhanVien },
  quyen: { onGetAll: getAllPermission },
}) => ({
  onSearch,
  onSizeChange,
  onSortChange,
  onChangeInputSearch,
  updateData,
  createOrEdit,
  getListRoles,
  getListAllNhanVien,
  getAllPermission,
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsAccount);
