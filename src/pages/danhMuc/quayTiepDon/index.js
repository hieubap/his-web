import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Main } from "./styled";
import SelectCustome from "components/Select";
import {
  Pagination,
  HeaderSearch,
  CreatedWrapper,
  TableWrapper,
  HomeWrapper,
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
import { Checkbox, Col, Input, Form, Select, InputNumber } from "antd";
import { checkRole } from "app/Sidebar/constant";
import FormWraper from "components/FormWraper";
import { openInNewTab } from "utils";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import stringUtils from "mainam-react-native-string-utils";
const { Option } = Select;
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
    listQuayTiepDon,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    updateData,
    searchQuayTiepDon,
    createOrEdit,
    onDelete,
    getUtils,
    listdoiTuongPhucVu,
    getListAllLoaGoiSo,
    getListAllKhoa,
    searchToaNha,
    listToaNha,
    getListToaNha,
    listAllToaNha,
    listAllLoaGoiSo,
    listAllKhoa,
  } = props;
  const [editStatus, setEditStatus] = useState(false);
  const [doiTuong, setDoiTuong] = useState([]);
  const [uuTien, setUuTien] = useState([]);
  const [dataSortColumn, setDataSortColumn] = useState(SORT_DEFAULT);
  const [data, setData] = useState([]);
  const [renderLoad, setRenderLoad] = useState(false);
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
  const dataField = form.getFieldsValue();

  useEffect(() => {
    const sort = combineSort(dataSortColumn);
    const params = { page, size, sort };
    searchQuayTiepDon(params);
    getUtils({ name: "doiTuongPhucVu" });
    getListAllLoaGoiSo();
    getListAllKhoa();
    getListToaNha({ page: 0, active: true, size: 500 });
    form.setFieldsValue({ soLuongHangDoi: 1 });
  }, []);
  useEffect(() => {
    const data = listQuayTiepDon.map((item, index) => {
      return { ...item, action: item, stt: page * size + index + 1 };
    });
    setData(data);
  }, [listQuayTiepDon, page, size]);

  const onClickSort = (key, value) => {
    const sort = { [key]: value };
    delete sort.createdAt;
    setDataSortColumn(sort);
    const res = combineSort(sort);
    searchQuayTiepDon({
      page: PAGE_DEFAULT,
      size,
      sort: res,
      ...dataSearch,
    });
  };
  const getlistdsDoiTuong = (item) => {
    let res = listdoiTuongPhucVu.map((el) => {
      if (item && item.some((e) => e && e.doiTuong === el.id)) {
        return el.ten;
      }
    });
    return (res.length && res) || [];
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
          title="M?? qu???y ti???p ????n"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input
              placeholder="T??m M?? qu???y ti???p ????n"
              onChange={(e) => {
                onSearchInput(e.target.value, "ma");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="T??n qu???y ti???p ????n"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="T??m T??n qu???y ti???p ????n"
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
          title="S??? l?????ng h??ng ?????i"
          sort_key="soLuongHangDoi"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.soLuongHangDoi || 0}
          search={
            <Input
              type="number"
              placeholder="T??m s??? l?????ng h??ng ?????i"
              onChange={(e) => {
                onSearchInput(e.target.value, "soLuongHangDoi");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "soLuongHangDoi",
      key: "soLuongHangDoi",
      align: "right",
    },
    {
      title: (
        <HeaderSearch
          title="Khoa"
          sort_key="khoa.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["khoa.ten"] || 0}
          search={
            <Input
              placeholder="T??m khoa"
              onChange={(e) => {
                onSearchInput(e.target.value, "khoa.ten");
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
          title="T??a nh??"
          sort_key="toaNha.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["toaNha.ten"] || 0}
          search={
            <Input
              placeholder="T??m t??a nh??"
              onChange={(e) => {
                onSearchInput(e.target.value, "toaNha.ten");
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
          title="Loa g???i s???"
          sort_key="loaGoiSo.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["loaGoiSo.ten"] || 0}
          search={
            <Input
              placeholder="T??m loa g???i s???"
              onChange={(e) => {
                onSearchInput(e.target.value, "loaGoiSo.ten");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "loaGoiSo",
      key: "loaGoiSo",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="DS ?????i t?????ng"
          // onClickSort={onClickSort}
          // sort_key="dsDoiTuong"
          // dataSort={dataSort.key === "dsDoiTuong" ? dataSort.value : 0}
          searchSelect={
            <SelectCustome
              placeholder="T??m ds ?????i t?????ng"
              onChange={(e) => {
                onSearchInput(e, "dsLoaiDoiTuong");
              }}
              data={listdoiTuongPhucVu}
              mode="multiple"
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dsDoiTuong",
      key: "dsDoiTuong",
      render: (item) => {
        return getlistdsDoiTuong(item)
          .filter((item) => !!item)
          .join(", ");
      },
    },
    {
      title: (
        <HeaderSearch
          title="C?? hi???u l???c"
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.active || 0}
          searchSelect={
            <SelectCustome
              onChange={(e) => {
                onSearchInput(e, "active");
              }}
              defaultValue=""
              placeholder={"Ch???n hi???u l???c"}
              data={HIEU_LUC}
            />
          }
        />
      ),
      width: 90,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
  ];

  const onSearchInput = (value, name) => {
    if (Array.isArray(value)) {
      value = (value.length && value) || null;
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      updateData({ dataSearch: { ...dataSearch, [name]: value } });
      searchQuayTiepDon({
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
    searchQuayTiepDon({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortColumn),
    });
  };

  const onSizeChange = (size) => {
    const params = { page, size };
    updateData(params);
    searchQuayTiepDon({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortColumn),
    });
  };

  const handleAdded = (e) => {
    setRenderLoad(true);
    e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        let arr1 = [];
        if (uuTien.length) {
          arr1 = uuTien.reduce(
            (arr, item) => [
              ...arr,
              {
                doiTuong: Object.values(item)[0],
                uuTien: +Object.keys(item)[0],
              },
            ],
            []
          );
        }
        let params = {
          ...values,
          dsDoiTuong: arr1.filter((item) => item),
        };
        if (editStatus) {
          params = {
            ...params,
            id: dataEditDefault.id,
          };
        } else {
          setDataSortColumn({
            createdAt: 2,
          });
        }
        createOrEdit(params)
          .then(() => {
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
              setUuTien([]);
              form.resetFields();
              form.setFieldsValue({ soLuongHangDoi: 1 });
            }
            setRenderLoad(false);
            searchQuayTiepDon({ ...params });
          })
          .catch((error) => {
            setRenderLoad(false);
          });
      })
      .catch((error) => {});
  };
  refClickBtnSave.current = handleAdded;

  const onShowAndHandleUpdate = (data = {}) => {
    let object = (data.dsDoiTuong || []).reduce(
      (arr, cur) => (cur ? [...arr, cur.doiTuong] : [...arr]),
      []
    );
    let el = (data.dsDoiTuong || []).reduce(
      (obj, cur) =>
        cur?.doiTuong ? [...obj, { [cur?.uuTien]: cur?.doiTuong }] : [...obj],
      []
    );
    let dataDt = {
      dsDoiTuong: object,
      uuTien: el,
    };
    setUuTien(el);
    setDoiTuong(object);
    setEditStatus(true);
    updateData({
      dataEditDefault: {
        ...data,
        ...dataDt,
      },
    });
    form.setFieldsValue({ ...data, ...dataDt });
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
      setUuTien(dataEditDefault.uuTien);
    } else {
      setUuTien([]);
      setDoiTuong([]);
      form.resetFields();
      form.setFieldsValue({ logo: "" });
    }
  };
  const onUpdateData = (item, type, current) => {
    if (type === "uuTien") {
      let arr = [...uuTien];
      let currentIndex = arr.findIndex(
        (el) => Object.values(el)[0] === current
      );
      if (currentIndex !== -1) {
        arr[currentIndex] = { [item]: current };
      } else {
        arr.push({ [item]: current });
      }
      setUuTien(arr);
      form.setFieldsValue({ [type]: arr });
    } else {
      let currentItem;
      if (item.length < uuTien.length) {
        currentItem = uuTien.filter((e) =>
          item.some((el) => el === +Object.values(e)[0])
        );
      } else {
        currentItem = item.reduce(
          (arr, cur) =>
            uuTien.some((el) => +Object.values(el)[0] === cur)
              ? [
                  ...arr,
                  {
                    [`${
                      Object.keys(
                        uuTien[
                          uuTien.findIndex((el) => Object.values(el)[0] === cur)
                        ]
                      )[0]
                    }`]: cur,
                  },
                ]
              : [...arr, { 1: cur }],
          []
        );
      }
      setUuTien(currentItem);
      setDoiTuong(item);
      form.setFieldsValue({ [type]: item });
    }
  };
  const customeSelect = {
    textAlign: "right",
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
            title="Danh m???c qu???y ti???p ????n"
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
              checkRole([ROLES["DANH_MUC"].QUAY_THEM])
                ? [
                    {
                      title: "Th??m m???i",
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
          {totalElements > 0 && (
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
              okText="L??u"
              roleSave={[ROLES["DANH_MUC"].QUAY_THEM]}
              roleEdit={[ROLES["DANH_MUC"].QUAY_SUA]}
              editStatus={editStatus}
            >
              <FormWraper
                disabled={
                  editStatus
                    ? !checkRole([ROLES["DANH_MUC"].QUAY_SUA])
                    : !checkRole([ROLES["DANH_MUC"].QUAY_THEM])
                }
                form={form}
                layout="vertical"
                style={{ width: "100%" }}
                className="form-custom"
              >
                <Form.Item
                  label="M?? qu???y ti???p ????n"
                  name="ma"
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng nh???p m?? qu???y ti???p ????n!",
                    },
                    {
                      max: 20,
                      message:
                        "Vui l??ng nh???p m?? qu???y ti???p ????n kh??ng qu?? 20 k?? t???!",
                    },
                    {
                      whitespace: true,
                      message: "Vui l??ng nh???p m?? qu???y ti???p ????n!",
                    },
                  ]}
                >
                  <Input
                    ref={refAutoFocus}
                    className="input-option"
                    placeholder="Vui l??ng nh???p m?? qu???y ti???p ????n"
                  />
                </Form.Item>
                <Form.Item
                  label="T??n qu???y ti???p ????n"
                  name="ten"
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng nh???p t??n qu???y ti???p ????n!",
                    },
                    {
                      max: 1000,
                      message:
                        "Vui l??ng nh???p t??n qu???y ti???p ????n kh??ng qu?? 1000 k?? t???!",
                    },
                    {
                      whitespace: true,
                      message: "Vui l??ng nh???p t??n qu???y ti???p ????n!",
                    },
                  ]}
                >
                  <Input
                    className="input-option"
                    placeholder="Vui l??ng nh???p t??n qu???y ti???p ????n"
                  />
                </Form.Item>
                <Form.Item
                  label="S??? l?????ng h??ng ?????i"
                  name="soLuongHangDoi"
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng nh???p s??? l?????ng h??ng ?????i!",
                    },
                    {
                      pattern: new RegExp(/^.{1,2}$/),
                      message:
                        "Vui l??ng nh???p s??? l?????ng h??ng ?????i kh??ng qu?? 2 k?? t???!",
                    },
                  ]}
                >
                  <InputNumber
                    className="input-option"
                    placeholder="Vui l??ng nh???p s??? l?????ng h??ng ?????i"
                    type="number"
                    min={1}
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <div
                      className="pointer"
                      onClick={() => openInNewTab("/danh-muc/khoa")}
                    >
                      Khoa
                    </div>
                  }
                  name="khoaId"
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng ch???n khoa!",
                    },
                  ]}
                >
                  <SelectCustome placeholder={"Ch???n khoa"} data={listAllKhoa} />
                </Form.Item>
                <Form.Item
                  label={
                    <div
                      className="pointer"
                      onClick={() => openInNewTab("/danh-muc/toa-nha")}
                    >
                      T??a nh??
                    </div>
                  }
                  name="toaNhaId"
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng ch???n t??a nh??!",
                    },
                  ]}
                >
                  <SelectCustome
                    placeholder={"Ch???n t??a nh??"}
                    data={listAllToaNha}
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <div
                      className="pointer"
                      onClick={() => openInNewTab("/danh-muc/loa-goi-so")}
                    >
                      Loa g???i s???
                    </div>
                  }
                  name="loaGoiSoId"
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng ch???n loa g???i s???!",
                    },
                  ]}
                >
                  <SelectCustome
                    placeholder={"Ch???n loa g???i s???"}
                    data={listAllLoaGoiSo}
                  />
                </Form.Item>
                <Form.Item
                  label="?????i t?????ng ti???p ????n"
                  name="dsDoiTuong"
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng ch???n ?????i t?????ng ti???p ????n!",
                    },
                  ]}
                >
                  <Checkbox.Group
                    onChange={(e) => onUpdateData(e, "dsDoiTuong")}
                  >
                    {listdoiTuongPhucVu.map((item) => {
                      return (
                        <Checkbox value={item.id} key={item.id}>
                          {item.ten}
                        </Checkbox>
                      );
                    })}
                  </Checkbox.Group>
                </Form.Item>
                <Form.Item label="M???c ????? ??u ti??n" className="uuTien">
                  {listdoiTuongPhucVu.map((item) => {
                    return (
                      <Select
                        autoClearSearchValue
                        onChange={(e) => {
                          onUpdateData(e, "uuTien", item.id);
                        }}
                        value={
                          (uuTien.findIndex(
                            (el) => Object.values(el)[0] === item.id
                          ) !== -1 &&
                            +Object.keys(
                              uuTien[
                                uuTien.findIndex(
                                  (el) => Object.values(el)[0] === item.id
                                )
                              ]
                            )[0]) ||
                          1
                        }
                        disabled={
                          !(doiTuong || []).some((el) => el === item.id)
                        }
                        key={item.id}
                      >
                        <Option value={1} style={customeSelect}>
                          M???c 1
                        </Option>
                        <Option value={2} style={customeSelect}>
                          M???c 2
                        </Option>
                        <Option value={3} style={customeSelect}>
                          M???c 3
                        </Option>
                      </Select>
                    );
                  })}
                </Form.Item>
                {editStatus && (
                  <Form.Item name="active" valuePropName="checked">
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
    quayTiepDon: {
      listQuayTiepDon = [],
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
      dataSort,
    },
    toaNha: { listToaNha, listAllToaNha },
    loaGoiSo: { listAllLoaGoiSo },
    khoa: { listAllKhoa },
    utils: { listdoiTuongPhucVu = [] },
  } = state;

  return {
    listToaNha,
    listAllToaNha,
    listAllLoaGoiSo,
    listAllKhoa,
    listQuayTiepDon,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    dataSort,
    listdoiTuongPhucVu,
  };
};
const mapDispatchToProps = ({
  quayTiepDon: { searchQuayTiepDon, createOrEdit, onDelete, updateData },
  utils: { getUtils },
  loaGoiSo: { getListAllLoaGoiSo },
  khoa: { getListAllKhoa },
  toaNha: { searchToaNha, getListToaNha },
}) => ({
  searchQuayTiepDon,
  createOrEdit,
  onDelete,
  updateData,
  getUtils,
  getListAllLoaGoiSo,
  getListAllKhoa,
  searchToaNha,
  getListToaNha,
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
