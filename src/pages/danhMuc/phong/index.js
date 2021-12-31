import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import HomeWrapper from "components/HomeWrapper";
import TableWrapper from "components/TableWrapper";
import CreatedWrapper from "components/CreatedWrapper";
import moment from "moment";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import { Main } from "./styled";
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
import { Checkbox, Col, Input, Modal, Form } from "antd";
import { openInNewTab } from "utils";
import { checkRole } from "app/Sidebar/constant";
import { ROLES } from "constants/index";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import stringUtils from "mainam-react-native-string-utils";
let timer = null;

const Index = (props) => {
  const refLayerHotKey = useRef(stringUtils.guid());
  const refClickBtnAdd = useRef();
  const refClickBtnSave = useRef();
  const refSelectRow = useRef();
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;

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
  const {
    listRoom,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    updateData,
    getListPhong,
    createOrEdit,
    onDelete,
    listAllKhoa,
    listChuyenKhoa,
    searchChuyenKhoa,
    getListAllKhoa,
    searchToaNha,
    listToaNha,
    listloaiPhong,
    getUtils,
    getListToaNha,
    listAllToaNha,
    searchTongHop,
  } = props;
  const [editStatus, setEditStatus] = useState(false);
  const [dataSortColumn, setDataSortColumn] = useState({
    ...SORT_DEFAULT,
    macDinh: true,
  });
  const [data, setData] = useState([]);
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [state, _setState] = useState({
    showFullTable: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const url = new URL(window.location.href);
  const active = url.searchParams.get("active");
  const khoaId = url.searchParams.get("khoaId");

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ macDinh: true });
    const sort = combineSort(dataSortColumn);
    const params = { page, size, sort };
    getListPhong(params);
    searchTongHop({ page: 0, size: 500, active: true });
    getListAllKhoa();
    // searchToaNha({ page: 0, size: 500, active: true });
    getUtils({ name: "loaiPhong" });
    getListToaNha();
  }, []);

  useEffect(() => {
    const sort = combineSort(dataSortColumn);
    const params = {
      page,
      size,
      sort,
      active: active == 1 || !active ? true : false,
      khoaId,
    };
    getListPhong(params);
  }, [active, khoaId]);

  useEffect(() => {
    const data = listRoom.map((item, index) => {
      return {
        ...item,
        key: "key" + index,
        action: item,
        stt: page * size + index + 1,
      };
    });
    setData(data);
  }, [listRoom, page, size]);

  const onClickSort = (key, value) => {
    const sort = { [key]: value, ...dataSortColumn, [key]: value };
    delete sort.createdAt;
    setDataSortColumn(sort);
    const res = combineSort(sort);
    getListPhong({
      page: PAGE_DEFAULT,
      size,
      sort: res,
      ...dataSearch,
    });
  };
  const getlistloaiPhong = (item) => {
    let res = (listloaiPhong || []).filter((el) => el.id === item);
    return (res.length && res[0]) || {};
  };
  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 40,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã phòng"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input
              placeholder="Tìm mã phòng"
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
      render: (item) => {
        return item && <span>{item}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tên phòng"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="Tìm tên phòng"
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
          title="Loại phòng"
          sort_key="loaiPhong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.loaiPhong || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "Tất cả" }, ...listloaiPhong]}
              placeholder="Chọn loại phòng"
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "loaiPhong");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "loaiPhong",
      key: "loaiPhong",
      render: (item) => {
        return getlistloaiPhong(item).ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Khoa"
          sort_key="khoaId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.khoaId || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "Tất cả" }, ...listAllKhoa]}
              placeholder="Tìm tên khoa"
              onChange={(e) => {
                onSearchInput(e, "khoaId");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "khoa",
      key: "khoa",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Chuyên khoa"
          sort_key="chuyenKhoaId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.chuyenKhoaId || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "Tất cả" }, ...listChuyenKhoa]}
              placeholder="Tìm tên chuyên khoa"
              onChange={(e) => {
                onSearchInput(e, "chuyenKhoaId");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "chuyenKhoa",
      key: "chuyenKhoa",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Địa điểm"
          sort_key="diaDiem"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.diaDiem || 0}
          search={
            <Input
              placeholder="Tìm địa điểm"
              onChange={(e) => {
                onSearchInput(e.target.value, "diaDiem");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "diaDiem",
      key: "diaDiem",
    },
    {
      title: (
        <HeaderSearch
          title="Nhà"
          sort_key="toaNhaId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.toaNhaId || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "Tất cả" }, ...(listAllToaNha || [])]}
              placeholder="Tìm tên nhà"
              onChange={(e) => {
                onSearchInput(e, "toaNhaId");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "toaNha",
      key: "toaNha",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Ghi chú"
          sort_key="ghiChu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ghiChu || 0}
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
      width: 150,
      dataIndex: "ghiChu",
      key: "ghiChu",
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn nội tru"
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "noiTru");
              }}
            />
          }
          sort_key="noiTru"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.noiTru || 0}
          title="Nội trú"
        />
      ),
      width: 90,
      dataIndex: "noiTru",
      key: "noiTru",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn ngoại trú"
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "ngoaiTru");
              }}
            />
          }
          sort_key="ngoaiTru"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ngoaiTru || 0}
          title="Ngoại trú"
        />
      ),
      width: 90,
      dataIndex: "ngoaiTru",
      key: "ngoaiTru",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={[
                { id: "", ten: "Tất cả" },
                { id: "true", ten: "Có mặc định" },
                { id: "false", ten: "Không mặc định" },
              ]}
              placeholder="Chọn mặc định"
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "macDinh");
              }}
            />
          }
          sort_key="macDinh"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.macDinh || 0}
          title="Mặc định"
        />
      ),
      width: 110,
      dataIndex: "macDinh",
      key: "macDinh",
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
      getListPhong({
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
    getListPhong({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortColumn),
    });
  };

  const onSizeChange = (size) => {
    const params = { page, size };
    updateData(params);
    getListPhong({
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
        } else {
          setDataSortColumn({
            createdAt: 2,
          });
        }
        createOrEdit(values).then(() => {
          const params = {
            page,
            size,
            ...dataSearch,
            sort: combineSort(
              editStatus
                ? dataSortColumn
                : {
                    createdAt: 2,
                  }
            ),
          };
          if (!editStatus) {
            params.page = PAGE_DEFAULT;
            form.resetFields();
            form.setFieldsValue({ macDinh: true });
          }
          getListPhong(params);
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
    updateData({ dataEditDefault: {} });
  };
  refClickBtnAdd.current = handleClickedBtnAdded;

  const setRowClassName = (record) => {
    let idDiff = dataEditDefault?.id;
    return record.id === idDiff
      ? "row-actived row-id-" + record.id
      : "row-id-" + record.id;
  };

  const handleCancel = () => {
    if (editStatus) {
      form.setFieldsValue(dataEditDefault);
    } else {
      form.resetFields();
      form.setFieldsValue({ macDinh: true });
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
            title="Danh mục phòng"
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
              checkRole([ROLES["DANH_MUC"].PHONG_THEM])
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
            dataSource={data}
            onRow={onRow}
            rowKey={"key"}
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
              okText="Lưu"
              roleSave={[ROLES["DANH_MUC"].PHONG_THEM]}
              roleEdit={[ROLES["DANH_MUC"].PHONG_SUA]}
              editStatus={editStatus}
            >
              <fieldset
                disabled={
                  editStatus
                    ? !checkRole([ROLES["DANH_MUC"].PHONG_SUA])
                    : !checkRole([ROLES["DANH_MUC"].PHONG_THEM])
                }
              >
                <Form
                  form={form}
                  layout="vertical"
                  style={{ width: "100%" }}
                  className="form-custom"
                >
                  <Form.Item
                    label="Mã phòng"
                    name="ma"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mã phòng!",
                      },
                      {
                        max: 20,
                        message: "Vui lòng nhập mã phòng không quá 20 ký tự!",
                      },
                      {
                        whitespace: true,
                        message: "Vui lòng nhập mã phòng!",
                      },
                    ]}
                  >
                    <Input
                      ref={refAutoFocus}
                      className="input-option"
                      placeholder="Vui lòng nhập mã phòng"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Tên phòng"
                    name="ten"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên phòng!",
                      },
                      {
                        max: 1000,
                        message:
                          "Vui lòng nhập tên phòng không quá 1000 ký tự!",
                      },
                      {
                        whitespace: true,
                        message: "Vui lòng nhập tên phòng!",
                      },
                    ]}
                  >
                    <Input
                      className="input-option"
                      placeholder="Vui lòng nhập tên phòng"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Loại phòng"
                    name="loaiPhong"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn loại phòng!",
                      },
                    ]}
                  >
                    <Select
                      placeholder={"Chọn loại phòng"}
                      data={[{ id: "", ten: "Tất cả" }, ...listloaiPhong]}
                    />
                  </Form.Item>
                  <Form.Item label="Khoa" name="khoaId">
                    <Select placeholder={"Chọn khoa"} data={listAllKhoa} />
                  </Form.Item>
                  <Form.Item
                    label={
                      <div
                        className="pointer"
                        onClick={() => openInNewTab("/danh-muc/chuyen-khoa")}
                      >
                        Chuyên khoa
                      </div>
                    }
                    name="chuyenKhoaId"
                  >
                    <Select
                      placeholder={"Chọn chuyên khoa"}
                      data={listChuyenKhoa}
                    />
                  </Form.Item>
                  <Form.Item
                    label={
                      <div
                        className="pointer"
                        onClick={() => openInNewTab("/danh-muc/toa-nha")}
                      >
                        Nhà
                      </div>
                    }
                    name="toaNhaId"
                  >
                    <Select placeholder={"Chọn nhà"} data={listAllToaNha} />
                  </Form.Item>
                  <Form.Item
                    label="Địa điểm"
                    name="diaDiem"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập địa điểm!",
                      },
                    ]}
                  >
                    <Input.TextArea
                      row={4}
                      style={{ height: "auto" }}
                      className="input-option"
                      placeholder="Vui lòng nhập địa điểm"
                    />
                  </Form.Item>
                  <Form.Item label="Ghi chú" name="ghiChu">
                    <Input.TextArea
                      row={4}
                      style={{ height: "auto" }}
                      className="input-option"
                      placeholder="Vui lòng nhập ghi chú"
                    />
                  </Form.Item>
                  <Form.Item
                    name="noiTru"
                    valuePropName="checked"
                    style={{ width: "33.33%" }}
                  >
                    <Checkbox>Nội trú</Checkbox>
                  </Form.Item>
                  <Form.Item
                    name="ngoaiTru"
                    valuePropName="checked"
                    style={{ width: "33.33%" }}
                  >
                    <Checkbox>Ngoại trú</Checkbox>
                  </Form.Item>
                  <Form.Item
                    name="macDinh"
                    valuePropName="checked"
                    style={{ width: "33.33%" }}
                  >
                    <Checkbox>Mặc định</Checkbox>
                  </Form.Item>
                  {/* {editStatus && (
                <Form.Item name="active" valuePropName="checked">
                  <Checkbox>Có hiệu lực</Checkbox>
                </Form.Item>
              )} */}
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
    phong: {
      listRoom = [],
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
      dataSort,
    },
    utils: { listloaiPhong = [] },
    khoa: { listAllKhoa },
    chuyenKhoa: { listChuyenKhoa },
    toaNha: { listToaNha, listAllToaNha },
  } = state;

  return {
    listloaiPhong,
    listToaNha,
    listChuyenKhoa,
    listAllKhoa,
    listRoom,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    dataSort,
    listAllToaNha,
  };
};
const mapDispatchToProps = ({
  phong: { getListPhong, createOrEdit, onDelete, updateData },
  khoa: { getListAllKhoa },
  chuyenKhoa: { searchChuyenKhoa, searchTongHop },
  toaNha: { searchToaNha, getListToaNha },
  utils: { getUtils },
}) => ({
  getUtils,
  searchToaNha,
  searchChuyenKhoa,
  getListAllKhoa,
  getListPhong,
  createOrEdit,
  onDelete,
  updateData,
  getListToaNha,
  searchTongHop,
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
