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
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  PAGE_DEFAULT,
  ADD_LAYOUT,
  TABLE_LAYOUT,
  HIEU_LUC,
  ROLES,
} from "constants/index";
import { Checkbox, Col, Input, Modal, Form } from "antd";
import FormWraper from "components/FormWraper";
import { checkRole } from "app/Sidebar/constant";
import { openInNewTab } from "utils";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import stringUtils from "mainam-react-native-string-utils";
let timer = null;

const NoiLayBenhPham = (props) => {
  const refAutoFocus = useRef();
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
    listNoiLayBenhPham,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    updateData,
    searchNoiLayBenhPham,
    createOrEdit,
    onDelete,
    getListAllKhoa,
    listAllKhoa,
    getListToaNha,
    listAllToaNha,
    nhomDichVuCap1,
    getNhomDichVuCap1,
    getAllDichVuCap2,
    listAllNhomDichVuCap2,
    getListAllPhong,
    listAllPhong,
  } = props;
  const [editStatus, setEditStatus] = useState(false);
  const [dataSortColumn, setDataSortColumn] = useState({
    active: 2,
    ["khoaChiDinh.ten"]: 1,
  });
  const [data, setData] = useState([]);
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
    const params = { page, size, sort: combineSort(dataSortColumn) };
    searchNoiLayBenhPham(params);
    getListAllKhoa({});
    getListToaNha({});
    getNhomDichVuCap1({
      path: "/nhom-dich-vu-cap1",
      loaiDichVu: 20,
    }).then((s) => {
      if (s && s?.payload) {
        let xetNghiem = s.payload.nhomDichVuCap1;
        form.setFieldsValue({ tenNhomDichVuCap1: xetNghiem.ten });
        getAllDichVuCap2({
          page: 0,
          size: 9999,
          nhomDichVuCap1Id: xetNghiem.id,
        });
      } else {
        getAllDichVuCap2({
          page: 0,
          size: 9999,
        });
      }
    });

    getListAllPhong({
      loaiPhong: 40,
      sort: combineSort({ active: 2, ten: 1 }),
    });
  }, []);

  useEffect(() => {
    const data = listNoiLayBenhPham.map((item, index) => {
      return { ...item, action: item, stt: page * size + index + 1 };
    });
    setData(data);
  }, [listNoiLayBenhPham, page, size]);

  const onClickSort = (key, value) => {
    const sort = { [key]: value, ...dataSortColumn, [key]: value };
    setDataSortColumn(sort);
    const res = combineSort(sort);
    searchNoiLayBenhPham({
      page: PAGE_DEFAULT,
      size,
      sort: res,
      ...dataSearch,
    });
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 20,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Khoa ch??? ?????nh"
          sort_key="khoaChiDinh.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["khoaChiDinh.ten"] || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "T???t c???" }, ...listAllKhoa]}
              placeholder="Ch???n khoa ch??? ?????nh"
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "khoaChiDinhId");
              }}
            />
          }
        />
      ),
      width: 70,
      dataIndex: "khoaChiDinh",
      key: "khoaChiDinh",
      render: (item) => {
        return item && <span>{item?.ten}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nh?? ch??? ?????nh"
          sort_key="nhaChiDinh.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["nhaChiDinh.ten"] || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "T???t c???" }, ...listAllToaNha]}
              placeholder="Ch???n nh?? ch??? ?????nh"
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "nhaChiDinhId");
              }}
            />
          }
        />
      ),
      width: 70,
      dataIndex: "nhaChiDinh",
      key: "nhaChiDinh",
      render: (item) => {
        return item && <span>{item?.ten}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nh??m DV c???p 2"
          sort_key="nhomDichVuCap2.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["nhomDichVuCap2.ten"] || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "T???t c???" }, ...listAllNhomDichVuCap2]}
              placeholder="Ch???n nh??m DV c???p 2"
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "nhomDichVuCap2Id");
              }}
            />
          }
        />
      ),
      width: 70,
      dataIndex: "dsNhomDichVuCap2",
      key: "dsNhomDichVuCap2",
      render: (item) => {
        const ten = item?.length ? item.map((ten) => ten.ten).join(",") : "";
        return item?.length ? <span>{ten}</span> : "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Ph??ng l???y m???u"
          sort_key="phongLayMau.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["phongLayMau.ten"] || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "T???t c???" }, ...listAllPhong]}
              placeholder="Ch???n ph??ng l???y m???u"
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "phongLayMauId");
              }}
            />
          }
        />
      ),
      width: 70,
      dataIndex: "phongLayMau",
      key: "phongLayMau",
      render: (item) => {
        return item && <span>{item?.ten}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="?????a ??i???m"
          sort_key="diaDiem"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.diaDiem || 0}
          search={
            <Input
              placeholder="T??m ?????a ??i???m"
              onChange={(e) => {
                onSearchInput(e.target.value, "diaDiem");
              }}
            />
          }
        />
      ),
      width: 70,
      dataIndex: "diaDiem",
      key: "diaDiem",
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
      width: 50,
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
      searchNoiLayBenhPham({
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
    searchNoiLayBenhPham({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortColumn),
    });
  };

  const onSizeChange = (size) => {
    const params = { page, size };
    updateData(params);
    searchNoiLayBenhPham({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortColumn),
    });
  };

  const handleDeleteItem = (item) => {
    Modal.confirm({
      title: "B???n c?? ch???c ch???n x??a b???n ghi n??y kh??ng?",
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
        values.nhomDichVuCap1Id = values.nhomDichVuCap1Id
          ? values.nhomDichVuCap1Id
          : nhomDichVuCap1.id;
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
          searchNoiLayBenhPham({ ...params });
        });
      })
      .catch((error) => {});
  };
  refClickBtnSave.current = handleAdded;

  const onShowAndHandleUpdate = (data = {}) => {
    setEditStatus(true);
    updateData({ dataEditDefault: data });
    form.setFieldsValue({
      tenNhomDichVuCap1:
        data.nhomDichVuCap1Id !== nhomDichVuCap1.id
          ? data?.nhomDichVuCap1?.ten
          : nhomDichVuCap1.ten,
      ...data,
    });
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
    form.setFieldsValue({ tenNhomDichVuCap1: nhomDichVuCap1?.ten });
    updateData({ dataEditDefault: {} });
  };
  refClickBtnAdd.current = handleClickedBtnAdded;

  const handleCancel = () => {
    if (editStatus) {
      form.setFieldsValue({ ...dataEditDefault });
    } else {
      form.resetFields();
      form.setFieldsValue({ tenNhomDichVuCap1: nhomDichVuCap1?.ten });
    }
  };
  useEffect(() => {
    if (refAutoFocus.current) {
      refAutoFocus.current.click();
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
  const setRowClassName = (record) => {
    let idDiff = dataEditDefault?.id;
    return record.id === idDiff
      ? "row-actived row-id-" + record.id
      : "row-id-" + record.id;
  };
  return (
    <Main>
      <HomeWrapper title="Danh m???c">
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
            title="Danh m???c n??i l???y m???u b???nh ph???m"
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
              checkRole([ROLES["DANH_MUC"].NOI_LAY_BENH_PHAM_THEM])
                ? [
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
              listData={data}
              pageSize={size}
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
              roleSave={[ROLES["DANH_MUC"].NOI_LAY_BENH_PHAM_THEM]}
              roleEdit={[ROLES["DANH_MUC"].NOI_LAY_BENH_PHAM_SUA]}
              editStatus={editStatus}
            >
              <FormWraper
                disabled={
                  editStatus
                    ? !checkRole([ROLES["DANH_MUC"].NOI_LAY_BENH_PHAM_SUA])
                    : !checkRole([ROLES["DANH_MUC"].NOI_LAY_BENH_PHAM_THEM])
                }
                form={form}
                layout="vertical"
                style={{ width: "100%" }}
                className="form-custom"
              >
                <Form.Item
                  label={
                    <div
                      className="pointer"
                      onClick={() => openInNewTab("/danh-muc/khoa")}
                    >
                      Khoa ch??? ?????nh
                    </div>
                  }
                  name="khoaChiDinhId"
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng nh???p khoa ch??? ?????nh!",
                    },
                  ]}
                >
                  <Select
                    data={listAllKhoa}
                    placeholder="Ch???n khoa ch??? ?????nh"
                    onChange={(e, list) => {
                      form.setFieldsValue({
                        nhaChiDinhId: list?.lists?.toaNhaId,
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <div
                      className="pointer"
                      onClick={() => openInNewTab("/danh-muc/toa-nha")}
                    >
                      Nh?? ch??? ?????nh
                    </div>
                  }
                  name="nhaChiDinhId"
                >
                  <Select
                    data={listAllToaNha}
                    placeholder="Ch???n nh?? ch??? ?????nh"
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
                      Nh??m DV c???p 1
                    </div>
                  }
                  name="tenNhomDichVuCap1"
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng nh???p nh??m ch??? ?????nh c???p 1!",
                    },
                  ]}
                >
                  <Input
                    className="input-option"
                    value={nhomDichVuCap1?.ten}
                    placeholder="Ch???n nh???p nh??m DV c???p 1"
                    disabled
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <div
                      className="pointer"
                      onClick={() =>
                        openInNewTab("/danh-muc/nhom-dich-vu?level=2")
                      }
                    >
                      Nh??m DV c???p 2
                    </div>
                  }
                  name="dsNhomDichVuCap2Id"
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng ch???n nh??m DV c???p 2!",
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    data={listAllNhomDichVuCap2}
                    placeholder="Ch???n nh??m DV c???p 2"
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <div
                      className="pointer"
                      onClick={() => openInNewTab("/danh-muc/phong")}
                    >
                      Ph??ng l???y m???u
                    </div>
                  }
                  name="phongLayMauId"
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng ch???n ph??ng l???y m???u!",
                    },
                  ]}
                >
                  <Select
                    data={listAllPhong}
                    placeholder="Ch???n ph??ng l???y m???u"
                    onChange={(e, list) => {
                      form.setFieldsValue({ diaDiem: list?.lists?.diaDiem });
                    }}
                  />
                </Form.Item>
                <Form.Item label="?????a ??i???m" name="diaDiem">
                  <Input
                    className="input-option"
                    placeholder="Vui l??ng nh???p ?????a ??i???m"
                    disabled
                  />
                </Form.Item>
                <Form.Item label="SL h??ng ?????i" name="slBanLayBenhPham">
                  <Input
                    className="input-option"
                    placeholder="Vui l??ng nh???p SL h??ng ?????i"
                  />
                </Form.Item>
                {editStatus && (
                  <Form.Item
                    name="active"
                    valuePropName="checked"
                    style={{ marginTop: 32 }}
                  >
                    <Checkbox>C?? hi???u l???c</Checkbox>
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
    noiLayBenhPham: {
      listNoiLayBenhPham,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
      dataSort,
    },
    khoa: { listAllKhoa = [] },
    toaNha: { listAllToaNha = [] },
    nhomDichVuCap2: { listAllNhomDichVuCap2 = [] },
    tiepDon: { dataMacDinh },
    phong: { listAllPhong = [] },
    thietLap: { nhomDichVuCap1 },
  } = state;

  return {
    listNoiLayBenhPham,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    dataSort,
    listAllKhoa,
    listAllToaNha,
    listAllNhomDichVuCap2,
    dataMacDinh,
    listAllPhong,
    nhomDichVuCap1,
  };
};
const mapDispatchToProps = ({
  noiLayBenhPham: { searchNoiLayBenhPham, createOrEdit, onDelete, updateData },
  khoa: { getListAllKhoa },
  toaNha: { getListToaNha },
  thietLap: { getNhomDichVuCap1 },
  nhomDichVuCap2: { getAllDichVuCap2 },
  phong: { getListAllPhong },
}) => ({
  searchNoiLayBenhPham,
  createOrEdit,
  onDelete,
  updateData,
  getListAllKhoa,
  getNhomDichVuCap1,
  getListToaNha,
  getAllDichVuCap2,
  getListAllPhong,
});

export default connect(mapStateToProps, mapDispatchToProps)(NoiLayBenhPham);
