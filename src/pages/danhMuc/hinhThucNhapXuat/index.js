import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Main } from "./styled";
import { combineSort } from "utils";
import { SORT_DEFAULT } from "constants/page/therapyConstant";
import {
  Pagination,
  HeaderSearch,
  CreatedWrapper,
  TableWrapper,
  HomeWrapper,
  Select,
} from "components";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  PAGE_DEFAULT,
  ADD_LAYOUT,
  TABLE_LAYOUT,
  HIEU_LUC,
} from "constants/index";
import { Checkbox, Col, Input, Form, Image, Modal } from "antd";
import { checkRole } from "app/Sidebar/constant";
import { ROLES } from "constants/index";
import IcCreate from "assets/images/kho/IcCreate.png";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import Icon from "@ant-design/icons";
import stringUtils from "mainam-react-native-string-utils";
let timer = null;

const HinhThucNhapXuat = (props) => {
  const refLayerHotKey = useRef(stringUtils.guid());
  const refClickBtnAdd = useRef();
  const refClickBtnSave = useRef();
  const refSelectRow = useRef();
  const {
    listHinhThucNhapXuat,
    getListHinhThucNhapXuat,
    listHinhThucNhapXuatKho,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    updateData,
    createOrEdit,
    onDelete,
    getUtils,
  } = props;
  const [editStatus, setEditStatus] = useState(false);
  const [dataSortColumn, setDataSortColumn] = useState(SORT_DEFAULT);
  const [data, setData] = useState([]);
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [state, _setState] = useState({
    showFullTable: false,
  });
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const [form] = Form.useForm();

  useEffect(() => {
    const sort = combineSort(dataSortColumn);
    const params = { page, size, sort };
    getListHinhThucNhapXuat(params);
    getUtils({ name: "HinhThucNhapXuatKho" });
    console.log(listHinhThucNhapXuatKho);
  }, []);

  useEffect(() => {
    const data = listHinhThucNhapXuat.map((item, index) => {
      return { ...item, action: item, stt: page * size + index + 1 };
    });
    setData(data);
  }, [listHinhThucNhapXuat, page, size]);
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
      (data?.findIndex((item) => item.id === dataEditDefault?.id) || 0) + index;
    if (-1 < indexNextItem && indexNextItem < data.length) {
      setEditStatus(true);
      updateData({ dataEditDefault: data[indexNextItem] });
      form.setFieldsValue(data[indexNextItem]);
      document
        .getElementsByClassName("row-id-" + data[indexNextItem]?.id)[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  const onClickSort = (key, value) => {
    const sort = { [key]: value, ...dataSortColumn, [key]: value };
    setDataSortColumn(sort);
    const res = combineSort(sort);
    listHinhThucNhapXuat({
      page: PAGE_DEFAULT,
      size,
      sort: res,
      ...dataSearch,
    });
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 48,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input
              placeholder="Tìm kiếm"
              onChange={(e) => {
                onSearchInput(e.target.value, "ma");
              }}
            />
          }
        />
      ),
      width: 100,
      dataIndex: "ma",
      key: "ma",
      render: (item) => {
        return item && <span>{item}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tên"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="Tìm kiếm"
              onChange={(e) => {
                onSearchInput(e.target.value, "ten");
              }}
            />
          }
        />
      ),
      width: 350,
      dataIndex: "ten",
      key: "ten",
      render: (item) => {
        return item && <span>{item}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Hình thức"
          sort_key="hinhThuc"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.dsHinhThucNhapXuat || 0}
          searchSelect={
            <Select
              placeholder="Tìm kiếm"
              data={
                listHinhThucNhapXuatKho
                  ? [{ id: "", ten: "Tất cả" }, ...listHinhThucNhapXuatKho]
                  : []
              }
              onChange={(value) => {
                console.log(listHinhThucNhapXuatKho);
                onSearchInput(value, "dsHinhThucNhapXuat");
              }}
              defaultValue=""
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dsHinhThucNhapXuat",
      key: "dsHinhThucNhapXuat",
      render: (item, list, index) => {
        if (listHinhThucNhapXuatKho?.length) {
          let list =
            item
              ?.map((e, index) => {
                let x = listHinhThucNhapXuatKho.find((i) => i.id === e);
                return x?.ten || "";
              })
              .filter((item) => item) ?? [];
          return list.join(", ");
        }
        return "";
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
      width: 108,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
  ];

  const onSearchInput = (value, name) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      updateData({ dataSearch: { ...dataSearch, [name]: value } });
      getListHinhThucNhapXuat({
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
    getListHinhThucNhapXuat({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortColumn),
    });
  };

  const onSizeChange = (size) => {
    const params = { page, size };
    updateData(params);
    getListHinhThucNhapXuat({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortColumn),
    });
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
            sort: combineSort(dataSortColumn),
          };
          if (!editStatus) {
            params.page = PAGE_DEFAULT;
            form.resetFields();
          }
          getListHinhThucNhapXuat(params);
        });
      })
      .catch((error) => {});
  };

  refClickBtnSave.current = handleAdded;

  const handleDeleteItem = (item) => {
    Modal.confirm({
      title: "Bạn có chắc chắn xóa bản ghi này không?",
      onOk() {
        onDelete(item.id);
      },
      onCancel() {},
    });
  };

  const onShowAndHandleUpdate = (data = {}) => {
    setEditStatus(true);
    updateData({ dataEditDefault: data });
    form.setFieldsValue(data);
  };

  const onRow = (record) => {
    return {
      onClick: () => {
        onShowAndHandleUpdate(record.action);
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
            title="Danh sách hình thức nhập/Loại xuất"
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
              checkRole([ROLES["DANH_MUC"].HINH_THUC_NHAP_XUAT_LOAI_XUAT_THEM])
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
            dataSource={data}
            onRow={onRow}
            rowClassName={(record, index) => {
              if (dataEditDefault.id === record.id) {
                return "row-actived row-id-" + record.id;
              } else return "row-id-" + record.id;
            }}
          ></TableWrapper>
          {totalElements && (
            <Pagination
              onChange={onPageChange}
              current={page + 1}
              pageSize={size}
              listData={data}
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
              okText="Lưu [F4]"
              roleSave={[ROLES["DANH_MUC"].HINH_THUC_NHAP_XUAT_LOAI_XUAT_THEM]}
              roleEdit={[ROLES["DANH_MUC"].HINH_THUC_NHAP_XUAT_LOAI_XUAT_SUA]}
              editStatus={editStatus}
            >
              <fieldset
                disabled={
                  editStatus
                    ? !checkRole([
                        ROLES["DANH_MUC"].HINH_THUC_NHAP_XUAT_LOAI_XUAT_SUA,
                      ])
                    : !checkRole([
                        ROLES["DANH_MUC"].HINH_THUC_NHAP_XUAT_LOAI_XUAT_THEM,
                      ])
                }
              >
                <Form
                  form={form}
                  layout="vertical"
                  style={{ width: "100%" }}
                  className="form-custom"
                >
                  <Form.Item
                    label="Mã hình thức nhập/Loại xuất"
                    name="ma"
                    style={{ width: "100%" }}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mã hình thức nhập/Loại xuất",
                      },
                    ]}
                  >
                    <Input
                      className="input-option"
                      placeholder="Vui lòng nhập mã hình thức nhập/Loại xuất"
                      ref={refAutoFocus}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Tên hình thức nhâp/Loại xuất"
                    name="ten"
                    style={{ width: "100%" }}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên hình thức nhập/Loại xuất",
                      },
                      {
                        whitespace: true,
                        message: "Vui lòng nhập tên hình thức nhập/Loại xuất!",
                      },
                    ]}
                  >
                    <Input
                      className="input-option"
                      placeholder="Vui lòng nhập tên hình thức nhập/Loại xuất"
                    />
                  </Form.Item>
                  <Form.Item label="Hình thức" name="dsHinhThucNhapXuat">
                    <Select
                      mode="multiple"
                      showArrow={true}
                      data={listHinhThucNhapXuatKho}
                    />
                  </Form.Item>
                  {editStatus && (
                    <Form.Item name="active" label=" " valuePropName="checked">
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
  );
};

const mapStateToProps = (state) => {
  const {
    hinhThucNhapXuat: {
      listHinhThucNhapXuat,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
    },
    utils: { listHinhThucNhapXuatKho },
  } = state;

  return {
    listHinhThucNhapXuat,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    listHinhThucNhapXuatKho,
  };
};
const mapDispatchToProps = ({
  hinhThucNhapXuat: {
    getListHinhThucNhapXuat,
    createOrEdit,
    onDelete,
    updateData,
  },
  utils: { getUtils },
}) => ({
  getListHinhThucNhapXuat,
  createOrEdit,
  onDelete,
  updateData,
  getUtils,
});

export default connect(mapStateToProps, mapDispatchToProps)(HinhThucNhapXuat);
