import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
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
import stringUtils from "mainam-react-native-string-utils";

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

  const refLayerHotKey = useRef(stringUtils.guid());
  const refClickBtnAdd = useRef();
  const refClickBtnSave = useRef();
  const refSelectRow = useRef();
  const refAutoFocus = useRef(null);
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
      onShowAndHandleUpdate(data[indexNextItem]);
      document
        .getElementsByClassName("row-id-" + data[indexNextItem]?.id)[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

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
          title="N???i dung th??ng b??o"
          sort_key="noiDung"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.noiDung || 0}
          search={
            <Input
              placeholder="T??m ki???m"
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
          title="Lo???i th??ng b??o"
          sort_key="loaiThongBao"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.loaiThongBao || 0}
          searchSelect={
            <Select
              placeholder="T??m ki???m"
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
          title="Vai tr??"
          sort_key="dsVaiTroId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.dsVaiTroId || 0}
          searchSelect={
            <Select
              mode="multiple"
              showArrow
              placeholder="T??m ki???m"
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
              placeholder="T??m ki???m"
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
          title="Ph??ng"
          sort_key="dsPhongId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.dsPhongId || 0}
          searchSelect={
            <Select
              mode="multiple"
              showArrow
              placeholder="T??m ki???m"
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
          title="Ch???c v???"
          sort_key="dsChucVuId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.dsChucVuId || 0}
          searchSelect={
            <Select
              mode="multiple"
              showArrow
              placeholder="T??m ki???m"
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
          title="Nh??"
          sort_key="dsNhaId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.dsNhaId || 0}
          searchSelect={
            <Select
              mode="multiple"
              showArrow
              placeholder="T??m ki???m"
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
              placeholder="Ch???n hi???u l???c"
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "active");
              }}
            />
          }
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.active || 0}
          title="C?? hi???u l???c"
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
      title: <HeaderSearch title="Ti???n ??ch" />,
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
  refClickBtnSave.current = handleAdded;

  const handleDeleteItem = (item) => {
    Modal.confirm({
      title: "B???n c?? ch???c ch???n x??a b???n ghi n??y kh??ng?",
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
  refClickBtnAdd.current = handleClickedBtnAdded;

  const handleCancel = () => {
    if (editStatus) {
      form.setFieldsValue(dataEditDefault);
    } else {
      form.resetFields();
    }
  };
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
      <HomeWrapper title="Qu???n l?? th??ng b??o">
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
            title="Qu???n l?? th??ng b??o"
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
                title: "Th??m m???i [F1]",
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
                return "row-edit row-id-" + record.id;
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
              title="Th??ng tin chi ti???t"
              onCancel={handleCancel}
              cancelText="H???y"
              onOk={handleAdded}
              okText="L??u [F4]"
            >
              <FormWraper
                form={form}
                layout="vertical"
                style={{ width: "100%" }}
                className="form-custom"
              >
                <div style={{ width: "100%" }}>
                  <Form.Item
                    label="N???i dung"
                    name="noiDung"
                    style={{ width: "100%" }}
                    rules={[
                      {
                        required: true,
                        message: "Vui l??ng nh???p n???i dung",
                      },
                      {
                        max: 1500,
                        message: "Vui l??ng nh???p n???i dung kh??ng qu?? 1500 k?? t???!",
                      },
                    ]}
                  >
                    <Input.TextArea
                      ref={refAutoFocus}
                      placeholder="Vui l??ng nh???p n???i dung"
                      maxLength={1500}
                      rows={10}
                      showCount
                    />
                  </Form.Item>
                </div>

                <div style={{ width: "50%" }}>
                  <Form.Item
                    label="Lo???i th??ng b??o"
                    name="loaiThongBao"
                    style={{ width: "100%" }}
                    rules={[
                      {
                        required: true,
                        message: "Vui l??ng ch???n lo???i th??ng b??o",
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
                    label="Ph??ng"
                    name="dsPhongId"
                    style={{ width: "100%" }}
                  >
                    <Select mode="multiple" showArrow data={listAllPhong} />
                  </Form.Item>
                  {editStatus && (
                    <Form.Item name="active" valuePropName="checked">
                      <Checkbox>C?? hi???u l???c</Checkbox>
                    </Form.Item>
                  )}
                </div>
                <div style={{ width: "50%" }}>
                  <Form.Item
                    label="Vai tr??"
                    name="dsVaiTroId"
                    style={{ width: "100%" }}
                  >
                    <Select mode="multiple" showArrow data={listRoles} />
                  </Form.Item>
                  <Form.Item
                    label="Ch???c v???"
                    name="dsChucVuId"
                    style={{ width: "100%" }}
                  >
                    <Select mode="multiple" showArrow data={listAllChucVu} />
                  </Form.Item>

                  <Form.Item
                    label="Nh??"
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
