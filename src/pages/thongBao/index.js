import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { combineSort } from "utils";
import FormWraper from "components/FormWraper";
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

let timer = null;

const QuanLyThongBao = (props) => {
  const {
    listThongBao,
    getListThongBao,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    updateData,
    createOrEdit,
    onDelete,
    listAllKhoa,
    getListAllKhoa,
    listAllPhong,
    getListAllPhong,
    listAllToaNha,
    getListToaNha,
    listAllChucVu,
    getListAllChucVu,
    listRoles,
    getListRoles,
    listloaiThongBao,
    getUtils,
  } = props;
  const [editStatus, setEditStatus] = useState(false);
  const [dataSortColumn, setDataSortColumn] = useState({});
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
  const [form] = Form.useForm();

  useEffect(() => {
    getListThongBao({});
    getListAllKhoa();
    getListAllPhong({});
    getListToaNha({});
    getListAllChucVu();
    getUtils({ name: "loaiThongBao" });
    if (!listRoles?.length) {
      getListRoles({ active: true });
    }
  }, []);

  useEffect(() => {
    const data = listThongBao.map((item, index) => {
      return { ...item, action: item, stt: page * size + index + 1 };
    });
    setData(data);
  }, [listThongBao, page, size]);

  const onClickSort = (key, value) => {
    const sort = { [key]: value, ...dataSortColumn, [key]: value };
    setDataSortColumn(sort);
    const res = combineSort(sort);
    getListThongBao({
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
          title="Nội dung thông báo"
          sort_key="noiDung"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.noiDung || 0}
          search={
            <Input
              placeholder="Tìm kiếm"
              onChange={(e) => {
                onSearchInput(e.target.value, "noiDung");
              }}
            />
          }
        />
      ),
      width: 350,
      dataIndex: "noiDung",
      key: "noiDung",
      render: (item) => {
        return item && <span>{item}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Loại thông báo"
          sort_key="loaiThongBao"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.loaiThongBao || 0}
          searchSelect={
            <Select
              placeholder="Tìm kiếm"
              data={listloaiThongBao}
              onChange={(value) => {
                onSearchInput(value, "loaiThongBao");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "loaiThongBao",
      key: "loaiThongBao",
      render: (item) => {
        if (item) {
          return (
            listloaiThongBao?.filter((e) => {
              return item === e.id;
            })[0] || {}
          ).ten;
        }
      },
    },
    {
      title: (
        <HeaderSearch
          title="Vai trò"
          sort_key="dsVaiTroId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.dsVaiTroId || 0}
          searchSelect={
            <Select
              mode="multiple"
              showArrow
              placeholder="Tìm kiếm"
              data={listRoles}
              onChange={(value) => {
                onSearchInput(value, "dsVaiTroId");
              }}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "dsVaiTro",
      key: "dsVaiTro",
      render: (item) => {
        return item && item.length > 0 && item.map((e) => e?.ten).join(",");
      },
    },
    {
      title: (
        <HeaderSearch
          title="Khoa"
          sort_key="dsKhoaId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.dsKhoaId || 0}
          searchSelect={
            <Select
              mode="multiple"
              showArrow
              placeholder="Tìm kiếm"
              data={listAllKhoa}
              onChange={(value) => {
                onSearchInput(value, "dsKhoaId");
              }}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "dsKhoa",
      key: "dsKhoa",
      render: (item) => {
        return item && item.length > 0 && item.map((e) => e?.ten).join(",");
      },
    },
    {
      title: (
        <HeaderSearch
          title="Phòng"
          sort_key="dsPhongId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.dsPhongId || 0}
          searchSelect={
            <Select
              mode="multiple"
              showArrow
              placeholder="Tìm kiếm"
              data={listAllPhong}
              onChange={(value) => {
                onSearchInput(value, "dsPhongId");
              }}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "dsPhong",
      key: "dsPhodsPhong",
      render: (item) => {
        return (
          item && item.length > 0 && item.map((e) => e && e?.ten).join(",")
        );
      },
    },

    {
      title: (
        <HeaderSearch
          title="Chức vụ"
          sort_key="dsChucVuId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.dsChucVuId || 0}
          searchSelect={
            <Select
              mode="multiple"
              showArrow
              placeholder="Tìm kiếm"
              data={listAllChucVu}
              onChange={(value) => {
                onSearchInput(value, "dsChucVuId");
              }}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "dsChucVu",
      key: "dsChucVu",
      render: (item) => {
        return item && item.length > 0 && item.map((e) => e?.ten).join(",");
      },
    },

    {
      title: (
        <HeaderSearch
          title="Nhà"
          sort_key="dsNhaId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.dsNhaId || 0}
          searchSelect={
            <Select
              mode="multiple"
              showArrow
              placeholder="Tìm kiếm"
              data={listAllToaNha}
              onChange={(value) => {
                onSearchInput(value, "dsNhaId");
              }}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "dsNha",
      key: "dsNha",
      render: (item) => {
        return item && item.length > 0 && item.map((e) => e?.ten).join(",");
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

    {
      title: <HeaderSearch title="Tiện ích" />,
      width: 80,
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (item) => {
        return (
          <Image
            preview={false}
            src={require("assets/images/his-core/iconDelete.png")}
            onClick={() => {
              handleDeleteItem(item);
            }}
          />
        );
      },
    },
  ];

  const onSearchInput = (value, name) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      updateData({ dataSearch: { ...dataSearch, [name]: value } });
      getListThongBao({
        ...dataSearch,
        page: PAGE_DEFAULT,
        size,
        [name]: value,
        sort: combineSort(dataSortColumn),
      });
    }, 300);
  };

  const onPageChange = (page) => {
    const params = { page: page - 1, size };
    updateData(params);
    getListThongBao({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortColumn),
    });
  };

  const onSizeChange = (size) => {
    const params = { page, size };
    updateData(params);
    getListThongBao({
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
          getListThongBao(params);
        });
      })
      .catch((error) => {});
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

  const fields = [
    "dsKhoaId",
    "dsPhongId",
    "dsNhaId",
    "dsVaiTroId",
    "dsChucVuId",
  ];
  function convertData(data) {
    fields.map((e) => {
      if (!data[e]) {
        data[e] = [];
      }
      return data.e;
    });
    return data;
  }

  const onShowAndHandleUpdate = (data = {}) => {
    convertData(data);
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
      <HomeWrapper title="Quản lý thông báo">
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
            title="Quản lý thông báo"
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
            buttonHeader={[
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
                  <Icon component={state.showFullTable ? thuNho : showFull} />
                ),
                onClick: handleChangeshowTable,
              },

              {
                className: "btn-collapse",
                title: (
                  <Icon
                    component={collapseStatus ? extendTable : extendChiTiet}
                  />
                ),
                onClick: handleCollapsePane,
              },
            ]}
            columns={columns}
            dataSource={data}
            onRow={onRow}
            rowClassName={(record, index) => {
              if (dataEditDefault.id === record.id) {
                return "row-edit";
              } else return "";
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
              okText="Lưu"
            >
              <FormWraper
                form={form}
                layout="vertical"
                style={{ width: "100%" }}
                className="form-custom"
              >
                <div style={{ width: "100%" }}>
                  <Form.Item
                    label="Nội dung"
                    name="noiDung"
                    style={{ width: "100%" }}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập nội dung",
                      },
                      {
                        max: 1500,
                        message: "Vui lòng nhập nội dung không quá 1500 ký tự!",
                      },
                    ]}
                  >
                    <Input.TextArea
                      ref={refAutoFocus}
                      placeholder="Vui lòng nhập nội dung"
                      maxLength={1500}
                      rows={10}
                      showCount
                    />
                  </Form.Item>
                </div>

                <div style={{ width: "50%" }}>
                  <Form.Item
                    label="Loại thông báo"
                    name="loaiThongBao"
                    style={{ width: "100%" }}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn loại thông báo",
                      },
                    ]}
                  >
                    <Select data={listloaiThongBao} />
                  </Form.Item>

                  <Form.Item
                    label="Khoa"
                    name="dsKhoaId"
                    style={{ width: "100%" }}
                  >
                    <Select mode="multiple" showArrow data={listAllKhoa} />
                  </Form.Item>

                  <Form.Item
                    label="Phòng"
                    name="dsPhongId"
                    style={{ width: "100%" }}
                  >
                    <Select mode="multiple" showArrow data={listAllPhong} />
                  </Form.Item>
                  {editStatus && (
                    <Form.Item name="active" valuePropName="checked">
                      <Checkbox>Có hiệu lực</Checkbox>
                    </Form.Item>
                  )}
                </div>
                <div style={{ width: "50%" }}>
                  <Form.Item
                    label="Vai trò"
                    name="dsVaiTroId"
                    style={{ width: "100%" }}
                  >
                    <Select mode="multiple" showArrow data={listRoles} />
                  </Form.Item>
                  <Form.Item
                    label="Chức vụ"
                    name="dsChucVuId"
                    style={{ width: "100%" }}
                  >
                    <Select mode="multiple" showArrow data={listAllChucVu} />
                  </Form.Item>

                  <Form.Item
                    label="Nhà"
                    name="dsNhaId"
                    style={{ width: "100%" }}
                  >
                    <Select mode="multiple" showArrow data={listAllToaNha} />
                  </Form.Item>
                </div>
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
    thongBao: {
      listThongBao,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
    },
    chucVu: { listAllChucVu },
    khoa: { listAllKhoa },
    phong: { listAllPhong },
    toaNha: { listAllToaNha },
    adminVaiTroHeThong: { listData: listRoles },
    utils: { listloaiThongBao },
  } = state;

  return {
    listThongBao,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    listAllChucVu,
    listAllKhoa,
    listAllPhong,
    listAllToaNha,
    listRoles,
    listloaiThongBao,
  };
};
const mapDispatchToProps = ({
  thongBao: { getListThongBao, createOrEdit, onDelete, updateData },
  khoa: { getListAllKhoa },
  phong: { getListAllPhong },
  toaNha: { getListToaNha },
  chucVu: { getListAllChucVu },
  adminVaiTroHeThong: { onSearch: getListRoles },
  utils: { getUtils },
}) => ({
  getListThongBao,
  createOrEdit,
  onDelete,
  updateData,
  getListAllKhoa,
  getListAllPhong,
  getListToaNha,
  getListAllChucVu,
  getListRoles,
  getUtils,
});

export default connect(mapStateToProps, mapDispatchToProps)(QuanLyThongBao);
