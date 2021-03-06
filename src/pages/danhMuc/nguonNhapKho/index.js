import React, { useState, useEffect, useMemo, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import cloneDeep from "lodash/cloneDeep";
import { Checkbox, Col, Input, Form } from "antd";
import HomeWrapper from "components/HomeWrapper";
import TableWrapper from "components/TableWrapper";
import CreatedWrapper from "components/CreatedWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import imgSearch from "assets/images/template/icSearch.png";
import { Select } from "components";

import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  NCC_KHAC,
  HIEU_LUC,
  TABLE_LAYOUT,
  ADD_LAYOUT,
} from "constants/index";
import { Main } from "./styled";
import { SORT_DEFAULT } from "./configs";
import { groupBy } from "lodash";
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

const { Option } = Select;

const StorageImport = ({
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
  getUtils,
  listLoaiDichVu,
}) => {
  const refLayerHotKey = useRef(stringUtils.guid());
  const refClickBtnAdd = useRef();
  const refClickBtnSave = useRef();
  const refSelectRow = useRef();
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [form] = Form.useForm();

  const [state, _setState] = useState({
    editStatus: false,
    listLoaiDichVu: [],
    showFullTable: false,
  });
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const listDV = useMemo(() => {
    return (listLoaiDichVu || []).filter((dv) =>
      [90, 100, 110].includes(dv.id)
    );
  }, [listLoaiDichVu]);

  const listDV2 = useMemo(() => {
    return [{ id: "", ten: "T???t c???" }, ...listDV];
  }, [listLoaiDichVu]);

  useEffect(() => {
    getUtils({ name: "LoaiDichVu" });
    onSizeChange(10);
  }, []);

  useEffect(() => {
    onSizeChange(10);
  }, [listLoaiDichVu]);

  useEffect(() => {
    for (const element of listData) {
      if (element.loaiDichVu === 90) {
        element.tenLoaiDichVu = "Thu???c";
      } else if (element.loaiDichVu === 100) {
        element.tenLoaiDichVu = "V???t t??";
      } else if (element.loaiDichVu === 110) {
        element.tenLoaiDichVu = "Ho?? ch???t";
      }
    }

    setState({ listData: listData });
  }, [listData]);

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
      (state.listData?.findIndex((item) => item.id === dataEditDefault?.id) ||
        0) + index;
    if (-1 < indexNextItem && indexNextItem < state.listData.length) {
      updateData({ dataEditDefault: state.listData[indexNextItem] });
      setState({
        editStatus: true,
      });
      form.setFieldsValue(state.listData[indexNextItem]);
      document
        .getElementsByClassName(
          "row-id-" + state.listData[indexNextItem]?.id
        )[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
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
    }, 500);
  };

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const onShowAndHandleUpdate = (data = {}) => {
    updateData({ dataEditDefault: data });

    setState({
      editStatus: true,
    });
    form.setFieldsValue(data);
  };

  const handleClickedBtnAdded = () => {
    setState({
      editStatus: false,
    });
    form.resetFields();
    updateData({ dataEditDefault: {} });
  };
  refClickBtnAdd.current = handleClickedBtnAdded;

  const handleCancel = () => {
    // if (state.editStatus) {
    //   form.setFieldsValue(dataEditDefault);
    // } else {
    //   form.resetFields();
    // }
    form.resetFields();
  };

  const handleAdded = (e) => {
    e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        if (values.thau == null || values.thau == "undefined")
          values.thau = false;

        let formattedData = {
          ...values,
        };

        if (state.editStatus) {
          formattedData = { ...formattedData, id: dataEditDefault.id };
        }
        createOrEdit(formattedData).then(() => {
          if (!state.editStatus) {
            form.resetFields();
          }
        });
      })
      .catch((error) => {});
  };
  refClickBtnSave.current = handleAdded;

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
          title="M?? ngu???n nh???p"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ma"] || 0}
          search={
            <Input
              placeholder="T??m m?? ngu???n nh???p"
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
          title="T??n ngu???n nh???p"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ten"] || 0}
          search={
            <Input
              placeholder="T??m ngu???n nh???p"
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
          title="Lo???i d???ch v???"
          sort_key="loaiDichVu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.loaiDichVu || 0}
          searchSelect={
            <Select
              data={listDV2}
              placeholder="Ch???n lo???i d???ch v???"
              onChange={onSearchInput("loaiDichVu")}
            />
          }
        />
      ),
      width: "70px",
      align: "left",
      dataIndex: "tenLoaiDichVu",
      key: "loaiDichVu",
    },
    {
      title: (
        <HeaderSearch
          sort_key="thau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.thau || 0}
          searchSelect={
            <Select
              defaultValue="false"
              data={NCC_KHAC}
              placeholder="Ch???n th???u"
              onChange={onSearchInput("thau")}
            />
          }
          title="Th???u"
        />
      ),
      width: "70px",
      dataIndex: "thau",
      key: "thau",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
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
              placeholder="Ch???n hi???u l???c"
              onChange={onSearchInput("active")}
            />
          }
          title="C?? hi???u l???c"
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

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  useEffect(() => {
    let temp = getUtils({ name: "LoaiDichVu" });
    console.log("t??t " + temp[0]);
  }, [state.listLoaiDichVu?.length > 0]);
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
            title="Danh m???c ngu???n nh???p kho"
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
              checkRole([ROLES["DANH_MUC"].NGUON_NHAP_KHO_THEM])
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
            dataSource={state.listData}
            onRow={onRow}
            rowKey={(record) => record.id}
            rowClassName={setRowClassName}
          />
          {!!totalElements ? (
            <Pagination
              listData={state?.listData}
              onChange={onChangePage}
              current={page + 1}
              pageSize={size}
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
              title="Th??ng tin chi ti???t"
              onCancel={handleCancel}
              cancelText="H???y"
              onOk={handleAdded}
              okText="L??u [F4]"
              roleSave={[ROLES["DANH_MUC"].NGUON_NHAP_KHO_THEM]}
              roleEdit={[ROLES["DANH_MUC"].NGUON_NHAP_KHO_SUA]}
              editStatus={state.editStatus}
            >
              <fieldset
                disabled={
                  state.editStatus
                    ? !checkRole([ROLES["DANH_MUC"].NGUON_NHAP_KHO_SUA])
                    : !checkRole([ROLES["DANH_MUC"].NGUON_NHAP_KHO_THEM])
                }
              >
                <Form
                  form={form}
                  layout="vertical"
                  style={{ width: "100%" }}
                  className="form-custom"
                >
                  <Form.Item
                    label="M?? ngu???n nh???p"
                    name="ma"
                    rules={[
                      {
                        required: true,
                        message: "Vui l??ng nh???p m?? ngu???n nh???p!",
                      },
                      {
                        max: 50,
                        message:
                          "Vui l??ng nh???p m?? ngu???n nh???p kh??ng qu?? 50 k?? t???!",
                      },
                      {
                        whitespace: true,
                        message: "Vui l??ng nh???p m?? ngu???n nh???p!",
                      },
                    ]}
                  >
                    <Input
                      className="input-option"
                      placeholder="Vui l??ng nh???p m?? ngu???n nh???p"
                      ref={refAutoFocus}
                    />
                  </Form.Item>
                  <Form.Item
                    label="T??n ngu???n nh???p"
                    name="ten"
                    rules={[
                      {
                        required: true,
                        message: "Vui l??ng nh???p t??n ngu???n nh???p!",
                      },
                      {
                        max: 1000,
                        message:
                          "Vui l??ng nh???p t??n ngu???n nh???p kh??ng qu?? 1000 k?? t???!",
                      },
                      {
                        whitespace: true,
                        message: "Vui l??ng nh???p t??n ngu???n nh???p!",
                      },
                    ]}
                  >
                    <Input
                      className="input-option"
                      placeholder="Vui l??ng nh???p t??n ngu???n nh???p"
                    />
                  </Form.Item>
                  <Form.Item label="Lo???i DV" name="loaiDichVu">
                    <Select data={listDV} placeholder="Lo???i d???ch v???" />
                  </Form.Item>
                  <Form.Item
                    label=" "
                    name="thau"
                    valuePropName="checked"
                    defaultValue="false"
                  >
                    <Checkbox>Th???u</Checkbox>
                  </Form.Item>
                  <Form.Item label=" " name="active" valuePropName="checked">
                    <Checkbox>C?? hi???u l???c</Checkbox>
                  </Form.Item>
                </Form>
              </fieldset>
            </CreatedWrapper>
          </Col>
        )}
      </HomeWrapper>
    </Main>
  );
};

const mapStateToProps = ({
  nguonNhapKho: {
    listData,
    totalElements,
    page,
    size,
    dataSearch,
    dataSort,
    dataSortColumn,
    dataEditDefault,
  },
  utils: { listLoaiDichVu: listLoaiDichVu },
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
    listLoaiDichVu,
  };
};
const mapDispatchToProps = ({
  nguonNhapKho: {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
    createOrEdit,
  },
  utils: { getUtils },
}) => ({
  onSearch,
  onSizeChange,
  onSortChange,
  onChangeInputSearch,
  updateData,
  createOrEdit,
  getUtils,
});
export default connect(mapStateToProps, mapDispatchToProps)(StorageImport);
