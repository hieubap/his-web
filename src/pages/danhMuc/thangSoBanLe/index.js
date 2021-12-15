import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import HomeWrapper from "components/HomeWrapper";
import TableWrapper from "components/TableWrapper";
import CreatedWrapper from "components/CreatedWrapper";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import { Main } from "./styled";
import { SORT_DEFAULT } from "constants/page/therapyConstant";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  PAGE_DEFAULT,
  ADD_LAYOUT,
  HIEU_LUC,
  TABLE_LAYOUT,
  ROLES,
} from "constants/index";
import { Checkbox, Col, Input, Form } from "antd";
import { checkRole } from "app/Sidebar/constant";
import FormWraper from "components/FormWraper";
import { openInNewTab } from "utils";
import IcCreate from "assets/images/kho/IcCreate.png";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import Icon from "@ant-design/icons";
import stringUtils from "mainam-react-native-string-utils";
let timer = null;

const ThangSoBanLe = (props) => {
  const refLayerHotKey = useRef(stringUtils.guid());
  const refClickBtnAdd = useRef();
  const refClickBtnSave = useRef();
  const refSelectRow = useRef();

  const {
    listThangSoBanLe,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    updateData,
    getListThangSoBanLe,
    createOrEdit,
    getAllKhoTongHop,
    listAllKho,
    onSortChange,
    onChangeInputSearch,
    dataSortColumn,
  } = props;
  const [editStatus, setEditStatus] = useState(false);
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [form] = Form.useForm();
  const [state, _setState] = useState({
    showFullTable: false,
  });
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    getListThangSoBanLe({});
    getAllKhoTongHop({});
  }, []);
  // register layerId
  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    onRegisterHotkey({
      layerId: refLayerHotKey.current,
      hotKeys: [
        {
          keyCode: 112, //F1
          onEvent: () => {
            refClickBtnAdd.current && refClickBtnAdd.current();
          },
        },
        {
          keyCode: 115, //F4
          onEvent: (e) => {
            refClickBtnSave.current && refClickBtnSave.current(e);
          },
        },
        {
          keyCode: 38, //up
          onEvent: (e) => {
            refSelectRow.current && refSelectRow.current(-1);
          },
        },
        {
          keyCode: 40, //down
          onEvent: (e) => {
            refSelectRow.current && refSelectRow.current(1);
          },
        },
      ],
    });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  refSelectRow.current = (index) => {
    const indexNextItem =
      (listThangSoBanLe?.findIndex((item) => item.id === dataEditDefault?.id) ||
        0) + index;
    if (-1 < indexNextItem && indexNextItem < listThangSoBanLe.length) {
      setEditStatus(true);
      updateData({ dataEditDefault: listThangSoBanLe[indexNextItem] });
      form.setFieldsValue(listThangSoBanLe[indexNextItem]);
      document
        .getElementsByClassName(
          "row-id-" + listThangSoBanLe[indexNextItem]?.id
        )[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  const onClickSort = (key, value) => {
    onSortChange({
      [key]: value,
    });
  };

  const refTimeOut = useRef(null);
  const onSearchInput = (key) => (e) => {
    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
      refTimeOut.current = null;
    }
    refTimeOut.current = setTimeout(
      (key, s) => {
        let value = "";
        if (s) {
          if (s?.hasOwnProperty("checked")) value = s?.checked;
          else value = s?.value;
        } else value = e;
        props.onChangeInputSearch({
          [key]: value,
        });
      },
      500,
      key,
      e?.target
    );
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 15,
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Thặng số bán lẻ"
          sort_key="thangSoBanLe"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["thangSoBanLe"] || 0}
          search={
            <Input
              placeholder="Tìm thặng số bán lẻ"
              onChange={onSearchInput("thangSoBanLe")}
            />
          }
        />
      ),
      width: 50,
      dataIndex: "thangSoBanLe",
      key: "thangSoBanLe",
      align: "right",
    },
    {
      title: (
        <HeaderSearch
          title="Giá nhập sau VAT nhỏ nhất"
          sort_key="giaNhapNhoNhat"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["giaNhapNhoNhat"] || 0}
          search={
            <Input
              placeholder="Tìm giá nhập sau VAT nhỏ nhất"
              onChange={onSearchInput("giaNhapNhoNhat")}
            />
          }
        />
      ),
      width: 70,
      dataIndex: "giaNhapNhoNhat",
      key: "giaNhapNhoNhat",
      align: "right",
    },
    {
      title: (
        <HeaderSearch
          title="Giá nhập sau VAT lớn nhất"
          sort_key="giaNhapLonNhat"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["giaNhapLonNhat"] || 0}
          search={
            <Input
              placeholder="Tìm giá nhập sau VAT lớn nhất"
              onChange={onSearchInput("giaNhapLonNhat")}
            />
          }
        />
      ),
      width: 70,
      dataIndex: "giaNhapLonNhat",
      key: "giaNhapLonNhat",
      align: "right",
    },
    {
      title: (
        <HeaderSearch
          title="Kho"
          sort_key="khoId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["khoId"] || 0}
          searchSelect={
            <Select
              placeholder="Tìm kho"
              data={listAllKho}
              onChange={onSearchInput("khoId")}
            />
          }
        />
      ),
      width: 70,
      dataIndex: "kho",
      key: "kho",
      render: (item) => {
        return item?.ten;
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
          dataSort={dataSortColumn["active"] || 0}
          title="Có hiệu lực"
        />
      ),
      width: 50,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
  ];

  const onChangePage = (page) => {
    getListThangSoBanLe({ page: page - 1 });
  };

  const onSizeChange = (size) => {
    const params = { page, size };
    updateData(params);
    // searchToaNha({
    //   ...params,
    //   ...dataSearch,
    // });
  };

  const handleAdded = (e) => {
    e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        if (editStatus) {
          values = { ...values, id: dataEditDefault.id };
        }
        createOrEdit(values).then(() => {
          const params = {
            page,
            size,
            ...dataSearch,
          };
          if (!editStatus) {
            params.page = PAGE_DEFAULT;
            form.resetFields();
          }
          getListThangSoBanLe({});
        });
      })
      .catch((error) => {});
  };

  refClickBtnSave.current = handleAdded;

  const onShowAndHandleUpdate = (data = {}) => {
    setEditStatus(true);
    updateData({ dataEditDefault: data });
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
    setEditStatus(false);
    form.resetFields();
    updateData({ dataEditDefault: {} });
  };
  refClickBtnAdd.current = handleClickedBtnAdded;

  const handleCancel = () => {
    if (editStatus) {
      form.setFieldsValue(dataEditDefault);
    } else {
      form.resetFields();
    }
  };

  const setRowClassName = (record) => {
    let idDiff = dataEditDefault?.id;
    return record.id === idDiff
      ? "row-actived row-id-" + record.id
      : "row-id-" + record.id;
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
            title="Danh mục thặng số bán lẻ"
            scroll={{ x: 1000 }}
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
              checkRole([ROLES["DANH_MUC"].DINH_MUC_THANG_SO_THEM])
                ? [
                    {
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
            dataSource={listThangSoBanLe}
            onRow={onRow}
            rowClassName={setRowClassName}
          ></TableWrapper>
          {totalElements && (
            <Pagination
              onChange={onChangePage}
              current={page + 1}
              pageSize={size}
              total={totalElements}
              listData={listThangSoBanLe}
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
              editStatus={editStatus}
              roleSave={[ROLES["DANH_MUC"].DINH_MUC_THANG_SO_THEM]}
              roleEdit={[ROLES["DANH_MUC"].DINH_MUC_THANG_SO_SUA]}
              editStatus={editStatus}
            >
              <FormWraper
                disabled={
                  editStatus
                    ? !checkRole([ROLES["DANH_MUC"].DINH_MUC_THANG_SO_SUA])
                    : !checkRole([ROLES["DANH_MUC"].DINH_MUC_THANG_SO_THEM])
                }
                form={form}
                layout="vertical"
                style={{ width: "100%" }}
                className="form-custom"
              >
                <Form.Item
                  label="Thặng số bán lẻ(%)"
                  name="thangSoBanLe"
                  style={{ width: "50%" }}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập thặng số bán lẻ",
                    },
                    {
                      pattern: new RegExp(/^[1-9][0-9]*$/),
                      message: "Giá trị phải là số nguyên dương",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    className="input-option"
                    placeholder="Nhập thặng số bán lẻ"
                    ref={refAutoFocus}
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <div
                      className="pointer"
                      onClick={() => openInNewTab("/kho/quan-tri-kho")}
                    >
                      Kho
                    </div>
                  }
                  name="khoId"
                  style={{ width: "50%" }}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn kho",
                    },
                  ]}
                >
                  <Select
                    className="input-option"
                    data={listAllKho}
                    placeholder="Chọn kho"
                  />
                </Form.Item>
                <Form.Item
                  label="Giá nhập sau VAT nhỏ nhất"
                  name="giaNhapNhoNhat"
                  style={{ width: "50%" }}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập giá sau VAT nhỏ nhất",
                    },
                    {
                      pattern: new RegExp(/^[1-9][0-9]*$/),
                      message: "Giá trị phải là số nguyên dương",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    className="input-option"
                    placeholder="Nhập giá nhập sau VAT nhỏ nhất"
                  />
                </Form.Item>
                <Form.Item
                  label="Giá nhập sau VAT lớn nhất"
                  name="giaNhapLonNhat"
                  style={{ width: "50%" }}
                  rules={[
                    {
                      required: true,

                      message: "Vui lòng nhập giá sau VAT lớn nhất",
                    },
                    {
                      pattern: new RegExp(/^[0-9]*$/),
                      message: "Giá trị phải là số nguyên dương",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    className="input-option"
                    placeholder="Nhập giá nhập sau VAT lớn nhất"
                  />
                </Form.Item>
                {editStatus && (
                  <Form.Item name="active" valuePropName="checked">
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

const mapStateToProps = (state) => {
  const {
    thangSoBanLe: {
      listThangSoBanLe,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
      dataSort,
      dataSortColumn,
    },
    kho: { listAllKho },
  } = state;

  return {
    listThangSoBanLe,
    totalElements,
    page,
    size,
    dataSortColumn,
    dataEditDefault,
    dataSearch,
    dataSort,
    listAllKho,
  };
};
const mapDispatchToProps = ({
  thangSoBanLe: {
    getListThangSoBanLe,
    createOrEdit,
    updateData,
    onSortChange,
    onChangeInputSearch,
  },
  kho: { getAllTongHop: getAllKhoTongHop },
}) => ({
  getListThangSoBanLe,
  createOrEdit,
  updateData,
  getAllKhoTongHop,
  onSortChange,
  onChangeInputSearch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ThangSoBanLe);
