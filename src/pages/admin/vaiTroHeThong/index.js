import React, { useState, useEffect, useMemo, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import { Checkbox, Col, Input, Form } from "antd";
import HomeWrapper from "components/HomeWrapper";
import TableWrapper from "components/TableWrapper";
import CreatedWrapper from "components/CreatedWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import Select from "components/Select";
import imgSearch from "assets/images/template/icSearch.png";
import CheckBoxVt from "./checkBox";
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
import { groupBy } from "lodash";
import { checkRole } from "app/Sidebar/constant";
import FormWraper from "components/FormWraper";
import stringUtils from "mainam-react-native-string-utils";

let timer = null;

const SettingsPermission = ({
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
  getAllPermission,
  listAllPermission,
  getNhomTinhNang,
  ListTinhNang,
}) => {
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [form] = Form.useForm();
  const refAutoFocus = useRef(null);

  const [state, _setState] = useState({
    editStatus: false,
    groupPermission: [],
    dataPermission: {},
    isCheckedAll: false,
    indeterminateCheckAll: false,
    inValidRoles: false,
    allPermision: [],
    values: [],
    showFullTable: false,
    listAllPermission: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const { dataPermission, inValidRoles } = state;

  const refLayerHotKey = useRef(stringUtils.guid());
  const { onAddLayer, onRemoveLayer } = useDispatch().phimTat;

  // register layerId
  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  useEffect(() => {
    onSizeChange(10);
    getAllPermission({ active: true });
    getNhomTinhNang({ active: true });
  }, []);

  const handleClickedBtnAdded = () => {
    setState({
      editStatus: false,
      inValidRoles: false,
      dataPermission: {},
      values: [],
    });
    updateData({ dataEditDefault: null });
    form.resetFields();

    if (refAutoFocus.current) {
      setTimeout(() => {
        refAutoFocus.current.focus();
      }, 50);
    }
  };

  const onShowAndHandleUpdate = (data = {}) => {
    updateData({ dataEditDefault: data });
    let { dsQuyen } = data;
    const values = dsQuyen.map((quyen) => quyen.id);

    setState({
      values: values,
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
    }, 300);
  };

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const handleCancel = () => {
    setState({
      dataPermission: {},
      inValidRoles: false,
    });
    if (state.editStatus) {
      form.setFieldsValue(dataEditDefault);
    } else {
      form.resetFields();
    }
  };

  const handleAdded = (e) => {
    if (e?.preventDefault) e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        if (!state.values.length) return;
        let formattedData = {
          ...values,
          moTa: values?.moTa?.trim(),
          ma: values?.ma?.trim(),
          ten: values.ten?.trim(),
          dsQuyenId: state.values,
        };
        if (state.editStatus) {
          formattedData = { ...formattedData, id: dataEditDefault.id };
        }

        createOrEdit(formattedData).then(() => {
          if (!state.editStatus) {
            form.resetFields();
            setState({
              dataPermission: {},
            });
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
          title="Mã vai trò"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ma"] || 0}
          search={
            <Input
              placeholder="Tìm mã vai trò"
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
          title="Tên vai trò"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ten"] || 0}
          search={
            <Input
              placeholder="Tìm theo giá trị"
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
          title="Mô tả"
          sort_key="moTa"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["moTa"] || 0}
          search={
            <Input
              placeholder="Tìm theo mô tả"
              onChange={onSearchInput("moTa")}
            />
          }
        />
      ),
      width: "120px",
      align: "left",
      dataIndex: "moTa",
      key: "moTa",
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

  const filterByGroup = (value) => {
    if (value.length) {
      const newPermisson = state.oldAllPermisson.filter((tinhNang) => {
        return value.some((item) => item == tinhNang.id);
      });
      setState({
        allPermision: newPermisson,
      });
    } else {
      setState({
        allPermision: state.oldAllPermisson,
      });
    }
  };
  useEffect(() => {
    setState({
      listAllPermission: listAllPermission,
    });
  }, [listAllPermission]);
  useEffect(() => {
    if (state.listAllPermission?.length) {
      const data = {};
      state.listAllPermission.forEach((permission) => {
        permission.dsNhomTinhNangId.forEach((id) => {
          if (!data[id]) {
            data[id] = [];
            data[id].push(permission);
          } else {
            data[id].push(permission);
          }
        });
      });

      if (ListTinhNang.length) {
        ListTinhNang.forEach((tinhNang) => {
          tinhNang.permision = data[tinhNang.id];
        });
      }
      setState({
        allPermision: ListTinhNang,
        oldAllPermisson: ListTinhNang,
      });
    } else {
      setState({
        allPermision: [],
      });
    }
  }, [state.listAllPermission, ListTinhNang]);
  const filterByPermission = (e) => {
    const { value } = e.target;
    const filterData = !value
      ? listAllPermission
      : listAllPermission.filter(
          (item) => item.ten?.toLowerCase().unsignText().indexOf(value) >= 0
        );
    setState({
      listAllPermission: filterData,
    });
  };

  const onCheckAll = (e) => {
    const { checked } = e.target;
    if (checked) {
      const listAllPermissonSelectd = [];
      state.allPermision.forEach((tinhNang) => {
        if (tinhNang?.permision?.length) {
          tinhNang.permision.forEach((per) => {
            listAllPermissonSelectd.push(per.id);
          });
        }
      });
      setState({
        values: listAllPermissonSelectd,
      });
    } else {
      setState({
        values: [],
      });
    }
  };

  const onChangeAllPermission = (e) => {
    const { value, checked } = e.target;
    const listPer = state.allPermision.find((item) => item.id == value);
    if (checked) {
      const per = listPer.permision.map((item) => item.id);
      setState({
        values: [...state.values, ...per],
      });
    } else {
      const per = listPer.permision.map((item) => item.id);
      const newPerssion = state.values.filter((item) => {
        return !per.some((e) => e == item);
      });
      setState({
        values: newPerssion,
      });
    }
  };

  const onChangeOnePermisson = (e) => {
    const { value, checked } = e.target;
    if (!checked) {
      const newPermisson = state.values.filter((per) => per !== value);
      setState({
        values: newPermisson,
      });
    } else {
      setState({ values: [...state.values, value] });
    }
  };
  const setRowClassName = (record) => {
    let idDiff = dataEditDefault?.id;
    return record.id === idDiff
      ? "row-actived row-id-" + record.id
      : "row-id-" + record.id;
  };

  // useEffect(() => {
  //   if (refAutoFocus.current) {
  //     refAutoFocus.current.focus();
  //   }
  // }, [dataEditDefault]);
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
            title="Danh mục vai trò"
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
              checkRole([ROLES["QUAN_LY_TAI_KHOAN"].VAI_TRO_HE_THONG_THEM])
                ? [
                    {
                      type: "create",
                      title: "Thêm mới [F1]",
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
            layerId={refLayerHotKey.current}
            dataEditDefault={dataEditDefault}
            // rowKey={(record) => record.id}
            // rowClassName={setRowClassName}
          />
          {!!totalElements ? (
            <Pagination
              onChange={onChangePage}
              current={page + 1}
              pageSize={size}
              listData={listData}
              total={totalElements}
              onShowSizeChange={onSizeChange}
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
              okText="Lưu [F4]"
              roleSave={[ROLES["QUAN_LY_TAI_KHOAN"].VAI_TRO_HE_THONG_THEM]}
              roleEdit={[ROLES["QUAN_LY_TAI_KHOAN"].VAI_TRO_HE_THONG_SUA]}
              editStatus={state.editStatus}
              layerId={refLayerHotKey.current}
            >
              <FormWraper
                disabled={
                  state.editStatus
                    ? !checkRole([
                        ROLES["QUAN_LY_TAI_KHOAN"].VAI_TRO_HE_THONG_SUA,
                      ])
                    : !checkRole([
                        ROLES["QUAN_LY_TAI_KHOAN"].VAI_TRO_HE_THONG_THEM,
                      ])
                }
                form={form}
                layout="vertical"
                style={{ width: "100%" }}
                className="form-custom"
              >
                <Form.Item
                  label="Mã vai trò"
                  name="ma"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mã vai trò!",
                    },
                    {
                      max: 50,
                      message: "Vui lòng nhập mã vai trò không quá 50 ký tự!",
                    },
                    {
                      whitespace: true,
                      message: "Vui lòng nhập mã vai trò!",
                    },
                  ]}
                >
                  <Input
                    ref={refAutoFocus}
                    className="input-option"
                    placeholder="Vui lòng nhập mã vai trò"
                  />
                </Form.Item>
                <Form.Item
                  label="Mô tả"
                  name="moTa"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mô tả!",
                    },
                    {
                      max: 1000,
                      message: "Vui lòng nhập mô tả không quá 1000 ký tự!",
                    },
                    {
                      whitespace: true,
                      message: "Vui lòng nhập mô tả!",
                    },
                  ]}
                >
                  <Input
                    className="input-option"
                    placeholder="Vui lòng nhập mô tả"
                  />
                </Form.Item>
                <Form.Item
                  label="Tên vai trò"
                  name="ten"
                  rules={[
                    {
                      max: 1000,
                      message:
                        "Vui lòng nhập tên vai trò không quá 1000 ký tự!",
                    },
                    {
                      required: true,
                      message: "Vui lòng nhập tên vai trò!",
                    },
                  ]}
                >
                  <Input
                    className="input-option"
                    placeholder="Vui lòng nhập tên vai trò"
                  />
                </Form.Item>
                {state.editStatus && (
                  <Form.Item label=" " name="active" valuePropName="checked">
                    <Checkbox>Có hiệu lực</Checkbox>
                  </Form.Item>
                )}
              </FormWraper>
              {inValidRoles && (
                <div style={{ color: "red", marginLeft: 25 }}>
                  Vui lòng chọn quyền!
                </div>
              )}
              <div
                className="permission-action"
                style={inValidRoles ? { border: "1px solid red" } : {}}
              >
                <div className="header-permission">Quyền được gán</div>
                <div className="content-permission">
                  <div className="action-filter addition-box">
                    <div className="check">
                      <Checkbox onChange={onCheckAll} />
                      <span> Chọn tất cả</span>
                    </div>
                    <div className="select addition-box">
                      <Select
                        data={ListTinhNang}
                        mode="multiple"
                        placeholder="Chọn nhóm tính năng"
                        onChange={filterByGroup}
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div className="select addition-box">
                      <div className="input-box">
                        <img src={imgSearch} alt="imgSearch" />
                        <Input
                          placeholder="Tìm kiếm quyền"
                          onChange={filterByPermission}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="list-func">
                    {state.allPermision.map((item, index) => {
                      if (item?.permision?.length) {
                        return (
                          <CheckBoxVt
                            key={index}
                            permision={item}
                            values={state.values}
                            onChangeAllPermission={onChangeAllPermission}
                            onChangeOnePermisson={onChangeOnePermisson}
                          />
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            </CreatedWrapper>
          </Col>
        )}
      </HomeWrapper>
    </Main>
  );
};

const mapStateToProps = ({
  adminVaiTroHeThong: {
    listData,
    totalElements,
    page,
    size,
    dataSearch,
    dataSort,
    dataSortColumn,
    dataEditDefault,
  },
  quyen: { listAllData: listAllPermission },
  nhomTinhNang: { listAllData: ListTinhNang },
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
    listAllPermission,
    ListTinhNang,
  };
};
const mapDispatchToProps = ({
  adminVaiTroHeThong: {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
    createOrEdit,
  },
  quyen: { onGetAll: getAllPermission },
  nhomTinhNang: { onGetAll },
}) => ({
  onSearch,
  onSizeChange,
  onSortChange,
  onChangeInputSearch,
  updateData,
  createOrEdit,
  getAllPermission,
  getNhomTinhNang: onGetAll,
});
export default connect(mapStateToProps, mapDispatchToProps)(SettingsPermission);
