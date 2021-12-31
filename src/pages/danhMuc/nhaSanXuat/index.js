import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Main } from "./styled";
import {
  Pagination,
  HeaderSearch,
  CreatedWrapper,
  TableWrapper,
  HomeWrapper,
  Select,
} from "components";
import { combineSort } from "utils";
import { SORT_DEFAULT } from "constants/page/therapyConstant";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  PAGE_DEFAULT,
  ADD_LAYOUT,
  TABLE_LAYOUT,
  HIEU_LUC,
  ROLES,
} from "constants/index";
import { Checkbox, Col, Input, Modal, Form, InputNumber } from "antd";
import FormWraper from "components/FormWraper";
import { checkRole } from "app/Sidebar/constant";
import { openInNewTab } from "utils";
import IcCreate from "assets/images/kho/IcCreate.png";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import Icon from "@ant-design/icons";
import stringUtils from "mainam-react-native-string-utils";
let timer = null;

const Index = (props) => {
  const refLayerHotKey = useRef(stringUtils.guid());
  const refClickBtnAdd = useRef();
  const refClickBtnSave = useRef();
  const refSelectRow = useRef();
  const {
    listNhaSanXuat,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    updateData,
    getListNhaSanXuat,
    createOrEdit,
    onDelete,
    listloaiNhaSanXuat,
    listAllNhomDichVuCap1,
    getAllTongHopDichVuCap1,
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
    getListNhaSanXuat(params);
    getUtils({ name: "loaiNhaSanXuat" });
    getAllTongHopDichVuCap1({ page: 0, size: 9999 });
  }, []);

  useEffect(() => {
    const data = listNhaSanXuat.map((item, index) => {
      return { ...item, action: item, stt: page * size + index + 1 };
    });
    setData(data);
  }, [listNhaSanXuat, page, size]);

  const onClickSort = (key, value) => {
    const sort = { [key]: value, ...dataSortColumn, [key]: value };
    setDataSortColumn(sort);
    const res = combineSort(sort);
    getListNhaSanXuat({
      page: PAGE_DEFAULT,
      size,
      sort: res,
      ...dataSearch,
    });
  };

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

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 35,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã NSX/ NCC"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input
              placeholder="Tìm mã NSX/ NCC"
              onChange={(e) => {
                onSearchInput(e.target.value, "ma");
              }}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="Tên NSX/ NCC"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="Tìm tên NSX/ NCC"
              onChange={(e) => {
                onSearchInput(e.target.value, "ten");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          title="Mã số thuế"
          onClickSort={onClickSort}
          sort_key="maSoThue"
          dataSort={dataSortColumn.maSoThue || 0}
          search={
            <Input
              placeholder="Tìm mã số thuế"
              onChange={(e) => {
                onSearchInput(e.target.value, "maSoThue");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "maSoThue",
      key: "maSoThue",
    },
    {
      title: (
        <HeaderSearch
          title="Nhóm DV"
          onClickSort={onClickSort}
          sort_key="nhomDichVuCap1.ten"
          dataSort={dataSortColumn["nhomDichVuCap1.ten"] || 0}
          search={
            <Input
              placeholder="Tìm nhóm DV"
              onChange={(e) => {
                onSearchInput(e.target.value, "nhomDichVuCap1.ten");
              }}
            />
          }
        />
      ),
      width: 170,
      dataIndex: "nhomDichVuCap1",
      key: "nhomDichVuCap1",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Loại đối tác"
          onClickSort={onClickSort}
          sort_key="loaiNhaSanXuat"
          dataSort={dataSortColumn["loaiNhaSanXuat"] || 0}
          searchSelect={
            <Select
              onChange={(e) => {
                onSearchInput(e, "loaiNhaSanXuat");
              }}
              defaultValue=""
              placeholder={"Chọn loại đối tác"}
              data={[{ id: "", ten: "Tất cả" }, ...listloaiNhaSanXuat]}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "loaiNhaSanXuat",
      key: "loaiNhaSanXuat",
      render: (item) => {
        let res = listloaiNhaSanXuat.filter((val) => {
          return +item === +val.id;
        });
        return res.length ? res[0].ten : "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Số tài khoản"
          onClickSort={onClickSort}
          sort_key="soTaiKhoan"
          dataSort={dataSortColumn["soTaiKhoan"] || 0}
          search={
            <InputNumber
              placeholder="Tìm tài khoản"
              onChange={(e) => {
                onSearchInput(e.target.value, "soTaiKhoan");
              }}
              type="number"
            />
          }
        />
      ),
      width: 150,
      dataIndex: "soTaiKhoan",
      key: "soTaiKhoan",
      align: "right",
    },
    {
      title: (
        <HeaderSearch
          title="Địa chỉ"
          onClickSort={onClickSort}
          sort_key="diaChi"
          dataSort={dataSortColumn["diaChi"] || 0}
          search={
            <Input
              placeholder="Tìm địa chỉ"
              onChange={(e) => {
                onSearchInput(e.target.value, "diaChi");
              }}
            />
          }
        />
      ),
      width: 100,
      dataIndex: "diaChi",
      key: "diaChi",
    },
    {
      title: (
        <HeaderSearch
          title="Ghi chú"
          onClickSort={onClickSort}
          sort_key="ghiChu"
          dataSort={dataSortColumn["ghiChu"] || 0}
          search={
            <Input
              placeholder="Tìm ghi chú"
              onChange={(e) => {
                onSearchInput(e.target.value, "ghiChu");
              }}
            />
          }
        />
      ),
      width: 100,
      dataIndex: "ghiChu",
      key: "ghiChu",
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
      width: 120,
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
      getListNhaSanXuat({
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
    getListNhaSanXuat({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortColumn),
    });
  };

  const onSizeChange = (size) => {
    const params = { page, size };
    updateData(params);
    getListNhaSanXuat({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortColumn),
    });
  };

  const handleDeleteItem = (item) => {
    Modal.confirm({
      title: "Bạn có chắc chắn xóa bản ghi này không?",
      onOk() {
        onDelete(item.id);
      },
      onCancel() {},
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
            form.setFieldsValue({ logo: "" });
          }
          getListNhaSanXuat({ ...params });
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
        onShowAndHandleUpdate(record.action);
      },
    };
  };

  const handleClickedBtnAdded = () => {
    setEditStatus(false);
    form.resetFields();
    form.setFieldsValue({ logo: "" });
    updateData({ dataEditDefault: {} });
  };
  refClickBtnAdd.current = handleClickedBtnAdded;

  const handleCancel = () => {
    if (editStatus) {
      form.setFieldsValue({ ...dataEditDefault });
    } else {
      form.resetFields();
      form.setFieldsValue({ logo: "" });
    }
  };
  const onUpdateData = (e, item) => {
    if (+e <= 0) {
      form.setFieldsValue({ [item]: null });
    } else {
      form.setFieldsValue({ [item]: e });
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
            title="Danh mục nhà sản xuất/ cung cấp"
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
              checkRole([ROLES["DANH_MUC"].NHA_SAN_XUAT_THEM])
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
            rowClassName={setRowClassName}
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
              roleSave={[ROLES["DANH_MUC"].NHA_SAN_XUAT_THEM]}
              roleEdit={[ROLES["DANH_MUC"].NHA_SAN_XUAT_SUA]}
              editStatus={editStatus}
            >
              <FormWraper
                disabled={
                  editStatus
                    ? !checkRole([ROLES["DANH_MUC"].NHA_SAN_XUAT_SUA])
                    : !checkRole([ROLES["DANH_MUC"].NHA_SAN_XUAT_THEM])
                }
                form={form}
                layout="vertical"
                style={{ width: "100%" }}
                className="form-custom"
              >
                <Form.Item
                  label="Mã NSX/ NCC"
                  name="ma"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mã NSX/ NCC!",
                    },
                    {
                      max: 20,
                      message: "Vui lòng nhập mã NSX/ NCC không quá 20 ký tự!",
                    },
                    {
                      whitespace: true,
                      message: "Vui lòng nhập mã NSX/ NCC!",
                    },
                  ]}
                >
                  <Input
                    className="input-option"
                    placeholder="Vui lòng nhập mã NSX/ NCC"
                    ref={refAutoFocus}
                  />
                </Form.Item>
                <Form.Item
                  label="Tên NSX/ NCC"
                  name="ten"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên NSX/ NCC!",
                    },
                    {
                      max: 1000,
                      message:
                        "Vui lòng nhập tên NSX/ NCC không quá 1000 ký tự!",
                    },
                    {
                      whitespace: true,
                      message: "Vui lòng nhập tên NSX/ NCC!",
                    },
                  ]}
                >
                  <Input
                    className="input-option"
                    placeholder="Vui lòng nhập tên NSX/ NCC"
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <div
                      className="pointer"
                      onClick={() =>
                        openInNewTab("/danh-muc/nhom-dich-vu?level=1")
                      }
                    >
                      Nhóm DV
                    </div>
                  }
                  name="nhomDichVuCap1Id"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn nhóm DV!",
                    },
                  ]}
                >
                  <Select
                    placeholder={"chọn nhóm DV"}
                    data={listAllNhomDichVuCap1}
                  />
                </Form.Item>
                <Form.Item
                  label="Loại đối tác"
                  name="loaiNhaSanXuat"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn loại đối tác!",
                    },
                  ]}
                >
                  <Select
                    placeholder={"chọn loại đối tác"}
                    data={listloaiNhaSanXuat}
                  />
                </Form.Item>
                <Form.Item label="Mã số thuế" name="maSoThue">
                  <Input placeholder="Nhập mã số thuế" />
                </Form.Item>
                <Form.Item label="Số tài khoản" name="soTaiKhoan">
                  <InputNumber
                    placeholder="Nhập số tài khoản"
                    type="number"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item label="Địa chỉ" name="diaChi">
                  <Input.TextArea
                    style={{ height: 120 }}
                    placeholder="Nhập địa chỉ"
                  />
                </Form.Item>
                <Form.Item label="Ghi chú" name="ghiChu">
                  <Input.TextArea
                    style={{ height: 120 }}
                    placeholder="Nhập ghi chú"
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
    nhaSanXuat: {
      listNhaSanXuat,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
      dataSort,
    },
    utils: { listloaiNhaSanXuat = [] },
    nhomDichVuCap1: { listAllNhomDichVuCap1 = [] },
  } = state;

  return {
    listloaiNhaSanXuat,
    listAllNhomDichVuCap1,
    listNhaSanXuat,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    dataSort,
  };
};
const mapDispatchToProps = ({
  nhaSanXuat: { getListNhaSanXuat, createOrEdit, onDelete, updateData },
  nhomDichVuCap1: { getAllTongHopDichVuCap1 },
  utils: { getUtils },
}) => ({
  getAllTongHopDichVuCap1,
  getListNhaSanXuat,
  getUtils,
  createOrEdit,
  onDelete,
  updateData,
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
