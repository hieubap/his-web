import React, { useEffect, useState, forwardRef, useRef } from "react";
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
  ROLES,
} from "constants/index";
import { Checkbox, Col, Input, Modal, Form } from "antd";
import FormWraper from "components/FormWraper";
import { checkRole } from "app/Sidebar/constant";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import stringUtils from "mainam-react-native-string-utils";
let timer = null;

const HocHamHocVi = (props) => {
  const {
    listHocHamHocVi,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    updateData,
    getListHocHamHocVi,
    createOrEdit,
    onDelete,
  } = props;
  const [editStatus, setEditStatus] = useState(false);
  const [dataSortColumn, setDataSortColumn] = useState(SORT_DEFAULT);
  const [data, setData] = useState([]);
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [state, _setState] = useState({
    showFullTable: false,
  });
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

  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const [form] = Form.useForm();

  useEffect(() => {
    const sort = combineSort(dataSortColumn);
    const params = { page, size, sort };
    getListHocHamHocVi(params);
  }, []);

  useEffect(() => {
    const data = listHocHamHocVi?.map((item, index) => {
      return { ...item, action: item, stt: page * size + index + 1 };
    });
    setData(data);
  }, [listHocHamHocVi, page, size]);

  const onClickSort = (key, value) => {
    const sort = { [key]: value, ...dataSortColumn, [key]: value };
    setDataSortColumn(sort);
    const res = combineSort(sort);
    getListHocHamHocVi({
      page: PAGE_DEFAULT,
      size,
      sort: res,
      ...dataSearch,
    });
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 60,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="M?? h???c h??m h???c v???"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input
              placeholder="T??m m?? h???c h??m h???c v???"
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
      render: (item) => {
        return item && <span>{item}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="T??n vi???t t???t"
          sort_key="vietTat"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.vietTat || 0}
          search={
            <Input
              placeholder="T??m t??n vi???t t???t"
              onChange={(e) => {
                onSearchInput(e.target.value, "vietTat");
              }}
            />
          }
        />
      ),
      width: 180,
      dataIndex: "vietTat",
      key: "vietTat",
      render: (item) => {
        return item && <span>{item}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="T??n h???c h??m h???c v???"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="T??m t??n h???c h??m h???c v???"
              onChange={(e) => {
                onSearchInput(e.target.value, "ten");
              }}
            />
          }
        />
      ),
      width: 240,
      dataIndex: "ten",
      key: "ten",
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
      width: 100,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    // {
    //   title: <HeaderSearch title="Thao t??c" />,
    //   width: 10,
    //   dataIndex: "action",
    //   key: "action",
    //   fixed: "right",
    //   align: "center",
    //   render: (item) => {
    //     return (
    //       <div className="support">
    //         <img
    //           onClick={() => handleDeleteItem(item)}
    //           src={require("assets/images/his-core/iconDelete.png")}
    //         ></img>
    //       </div>
    //     );
    //   },
    // },
  ];

  const onSearchInput = (value, name) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      updateData({ dataSearch: { ...dataSearch, [name]: value } });
      getListHocHamHocVi({
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
    getListHocHamHocVi({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortColumn),
    });
  };

  const onSizeChange = (size) => {
    const params = { page, size };
    updateData(params);
    getListHocHamHocVi({
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

  const onClick = () => {};

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
          getListHocHamHocVi(params);
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
    if (!editStatus) {
      return;
    }
    setEditStatus(false);
    form.resetFields();
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
            title="Danh m???c h???c h??m h???c v???"
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
              checkRole([ROLES["DANH_MUC"].HOC_HAM_THEM])
                ? [
                    {
                      title: "Th??m m???i",
                      onClick: handleClickedBtnAdded,
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
              title="Th??ng tin chi ti???t"
              onCancel={handleCancel}
              cancelText="H???y"
              onOk={handleAdded}
              okText="L??u"
              roleSave={[ROLES["DANH_MUC"].HOC_HAM_THEM]}
              roleEdit={[ROLES["DANH_MUC"].HOC_HAM_SUA]}
              editStatus={editStatus}
            >
              <FormWraper
                form={form}
                disabled={
                  editStatus
                    ? !checkRole([ROLES["DANH_MUC"].HOC_HAM_SUA])
                    : !checkRole([ROLES["DANH_MUC"].HOC_HAM_THEM])
                }
                layout="vertical"
                style={{ width: "100%" }}
                className="form-custom form-custom--one-line"
              >
                <Form.Item
                  label="M?? h???c h??m h???c v???"
                  name="ma"
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng nh???p m?? h???c h??m h???c v???!",
                    },
                    {
                      max: 20,
                      message:
                        "Vui l??ng nh???p m?? h???c h??m h???c v??? kh??ng qu?? 20 k?? t???!",
                    },
                    {
                      whitespace: true,
                      message: "Vui l??ng nh???p m?? h???c h??m h???c v???!",
                    },
                  ]}
                >
                  <Input
                    autoFocus={true}
                    className="input-option"
                    placeholder="Vui l??ng nh???p m?? h???c h??m h???c v???"
                    ref={refAutoFocus}
                  />
                </Form.Item>
                <Form.Item
                  label="T??n vi???t t???t h???c h??m h???c v???"
                  name="vietTat"
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng nh???p t??n vi???t t???t h???c h??m h???c v???!",
                    },
                    {
                      max: 20,
                      message:
                        "Vui l??ng nh???p t??n vi???t t???t h???c h??m h???c v??? kh??ng qu?? 20 k?? t???!",
                    },
                    {
                      whitespace: true,
                      message: "Vui l??ng nh???p t??n vi???t t???t h???c h??m h???c v???!",
                    },
                  ]}
                >
                  <Input
                    className="input-option"
                    placeholder="Vui l??ng nh???p t??n vi???t t???t h???c h??m h???c v???"
                  />
                </Form.Item>
                <Form.Item
                  label="T??n h???c h??m h???c v???"
                  name="ten"
                  rules={[
                    {
                      required: true,
                      message: "Vui l??ng nh???p t??n h???c h??m h???c v???!",
                    },
                    {
                      max: 1000,
                      message:
                        "Vui l??ng nh???p t??n h???c h??m h???c v??? kh??ng qu?? 1000 k?? t???!",
                    },
                    {
                      whitespace: true,
                      message: "Vui l??ng nh???p t??n h???c h??m h???c v???!",
                    },
                  ]}
                >
                  <Input
                    className="input-option"
                    placeholder="Vui l??ng nh???p t??n h???c h??m h???c v???"
                  />
                </Form.Item>
                {editStatus && (
                  <Form.Item label=" " name="active" valuePropName="checked">
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
    hocHamHocVi: {
      listHocHamHocVi,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
    },
  } = state;

  return {
    listHocHamHocVi,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
  };
};
const mapDispatchToProps = ({
  hocHamHocVi: { getListHocHamHocVi, createOrEdit, onDelete, updateData },
}) => ({
  getListHocHamHocVi,
  createOrEdit,
  onDelete,
  updateData,
});

export default connect(mapStateToProps, mapDispatchToProps)(HocHamHocVi);
