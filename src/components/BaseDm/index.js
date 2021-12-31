import Icon from "@ant-design/icons";
import { Col, Form, Modal } from "antd";
import { checkRole } from "app/Sidebar/constant";
import IcCreate from "assets/images/kho/IcCreate.png";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import extendTable from "assets/svg/extendTable.svg";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import CreatedWrapper from "components/CreatedWrapper";
import FormWraper from "components/FormWraper";
import HomeWrapper from "components/HomeWrapper";
import Pagination from "components/Pagination";
import TableWrapper from "components/TableWrapper";
import {
  ADD_LAYOUT,
  ADD_LAYOUT_COLLAPSE,
  PAGE_DEFAULT,
  TABLE_LAYOUT,
  TABLE_LAYOUT_COLLAPSE,
} from "constants/index";
import { SORT_DEFAULT } from "constants/page/therapyConstant";
import stringUtils from "mainam-react-native-string-utils";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { combineSort } from "utils";
import { Main } from "./styled";

let timer = null;

const BaseDm = ({
  totalElements,
  page,
  size,
  dataEditDefault,
  dataSearch,
  titleTable,
  renderForm = () => {},
  getColumns = () => [],
  initFunction = () => {},
  getData = () => {},
  createOrEdit,
  updateData,
  onDelete = () => {},
  listData = [],
  roleSave = [],
  roleEdit = [],
  classNameForm = "",
  customShowUpdate, // function
  customSetFieldsValue, // function
  customOnSearchInput, // function
  setDefaultForm = () => {},
  autoFocus = true,
  afterSubmit = () => {},
  ...props
}) => {
  const [state, _setState] = useState({
    showFullTable: false,
    collapseStatus: false,
    editStatus: false,
    dataSortColumn: { active: 2, createdAt: 2 },
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const { editStatus, collapseStatus, dataSortColumn, data } = state;
  const refLayerHotKey = useRef(stringUtils.guid());
  const refAutoFocus = useRef({});
  const { onAddLayer, onRemoveLayer } = useDispatch().phimTat;

  // register layerId
  useEffect(() => {
    setDefaultForm({ form });
    onAddLayer({ layerId: refLayerHotKey.current });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  const [form] = Form.useForm();
  useEffect(() => {
    const sort = combineSort(dataSortColumn);
    const params = { page, size, sort };
    getData(params);
  }, []);

  useEffect(() => {
    const data = listData.map((item, index) => {
      return { ...item, action: item, stt: page * size + index + 1 };
    });
    setState({ data });
  }, [listData, size, page]);

  const onClickSort = (key, value) => {
    const sort = { [key]: value, ...dataSortColumn, [key]: value };
    delete sort.createdAt;
    setState({ dataSortColumn: sort });
    const res = combineSort(sort);
    getData({
      page: PAGE_DEFAULT,
      size,
      sort: res,
      ...dataSearch,
    });
  };

  const onSearchInput = customOnSearchInput
    ? customOnSearchInput({ dataSortColumn })
    : (value, name) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          updateData({ dataSearch: { ...dataSearch, [name]: value } });
          getData({
            ...dataSearch,
            page: PAGE_DEFAULT,
            size,
            [name]: value,
            sort: combineSort(dataSortColumn),
          });
        }, 500);
      };

  const onPageChange = (page) => {
    const params = { page: page - 1, size };
    updateData(params);
    getData({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortColumn),
    });
  };

  const onSizeChange = (size) => {
    const params = { page, size };
    updateData(params);
    getData({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortColumn),
    });
  };

  const handleAdded = (e) => {
    if (e?.preventDefault) e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        if (editStatus) {
          values = { ...values, id: dataEditDefault.id };
        } else {
          setState({ dataSortColumn: { createdAt: 2 } });
        }
        createOrEdit(values).then(() => {
          const params = {
            page,
            size,
            ...dataSearch,
            sort: combineSort(
              dataEditDefault.id ? dataSortColumn : { createdAt: 2 }
            ),
          };
          if (!editStatus) {
            params.page = PAGE_DEFAULT;
            form.resetFields();
          }
          getData(params);
          afterSubmit();
        });
      })
      .catch((error) => {});
  };

  const setFieldsValue = customSetFieldsValue
    ? customSetFieldsValue({
        form,
      })
    : (data = {}) => form.setFieldsValue(data);

  const _onShowData = (data = {}) => {
    setState({ editStatus: true });
    updateData({ _dataEdit: data, dataEditDefault: data });
    setFieldsValue(data);
  };
  const onShowAndHandleUpdate = customShowUpdate
    ? customShowUpdate({
        form,
        updateData,
        setEditStatus: (editStatus) => setState({ editStatus }),
        setFieldsValue,
        callback: _onShowData,
      })
    : _onShowData;

  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        onShowAndHandleUpdate(record);
      },
    };
  };

  const handleClickedBtnAdded = () => {
    setState({ editStatus: false });
    form.resetFields();
    setDefaultForm({ form });
    updateData({ dataEditDefault: {}, _dataEdit: {} });
  };

  const handleCancel = () => {
    if (editStatus) {
      setFieldsValue(dataEditDefault);
    } else {
      form.resetFields();
    }
  };

  const handleDeleteItem = (item) => {
    Modal.confirm({
      title: "Bạn có chắc chắn xóa bản ghi này không?",
      onOk() {
        onDelete(item?.id);
      },
      onCancel() {},
    });
  };

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
    setState({ collapseStatus: !collapseStatus });
  };
  return (
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
            title={titleTable}
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
              checkRole(roleSave)
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
            columns={getColumns({
              onClickSort,
              dataSortColumn,
              onSearchInput,
              handleDeleteItem,
            })}
            dataSource={data}
            onRow={onRow}
            layerId={refLayerHotKey.current}
            dataEditDefault={dataEditDefault}
          ></TableWrapper>
          {totalElements && (
            <Pagination
              onChange={onPageChange}
              current={page + 1}
              pageSize={size}
              total={totalElements}
              listData={listData}
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
              okText="Lưu [F4]"
              roleSave={roleSave}
              roleEdit={roleEdit}
              editStatus={editStatus}
              layerId={refLayerHotKey.current}
            >
              <FormWraper
                disabled={
                  editStatus ? !checkRole(roleEdit) : !checkRole(roleSave)
                }
                form={form}
                layout="vertical"
                style={{ width: "100%" }}
                className={`form-custom ${classNameForm}`}
              >
                {renderForm({ form, editStatus, autoFocus, refAutoFocus })}
              </FormWraper>
            </CreatedWrapper>
          </Col>
        )}
      </HomeWrapper>
    </Main>
  );
};

export default BaseDm;
