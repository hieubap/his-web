import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { combineSort } from "utils";
import { Main } from "./styled";
import { SORT_DEFAULT } from "constants/page/therapyConstant";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  PAGE_DEFAULT,
  PAGE_SIZE,
  ADD_LAYOUT,
  TABLE_LAYOUT,
} from "constants/index";
import {
  Pagination,
  HeaderSearch,
  CreatedWrapper,
  TableWrapper,
  HomeWrapper,
  Select,
} from "components";

import { Checkbox, Col, Input, Modal, Form } from "antd";
import { checkRole } from "app/Sidebar/constant";
import { ROLES } from "constants/index";
import IcCreate from "assets/images/kho/IcCreate.png";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import Icon from "@ant-design/icons";
let timer = null;

const Index = (props) => {
  const {
    listPhanLoaiThuoc,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    dataSort,
    updateData,
    getListPhanLoaiThuoc,
    createOrEdit,
    onDelete,
    getUtils,
    listloaiDonThuoc,
  } = props;
  const [editStatus, setEditStatus] = useState(false);
  const [dataSortColumn, setDataSortColumn] = useState(SORT_DEFAULT);
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
    const sort = combineSort(dataSortColumn);
    const params = { page: PAGE_DEFAULT, size: PAGE_SIZE, sort };
    getListPhanLoaiThuoc(params);
    getUtils({ name: "loaiDonThuoc" });
  }, []);

  useEffect(() => {
    const data = listPhanLoaiThuoc.map((item, index) => {
      return { ...item, stt: page * size + index + 1 };
    });
    setData(data);
  }, [listPhanLoaiThuoc, page, size]);

  const onClickSort = (key, value) => {
    const sort = { [key]: value, ...dataSortColumn, [key]: value };
    setDataSortColumn(sort);
    const res = combineSort(sort);
    getListPhanLoaiThuoc({
      page: PAGE_DEFAULT,
      size,
      sort: res,
      ...dataSearch,
    });
  };

  const HIEU_LUC = [
    {
      id: "",
      ten: "T???t c???",
    },
    {
      id: "true",
      ten: "C??",
    },
    {
      id: "false",
      ten: "Kh??ng",
    },
  ];

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 80,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="M?? ph??n lo???i thu???c"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input
              placeholder="T??m m?? ph??n lo???i thu???c"
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
          title="T??n ph??n lo???i thu???c"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="T??m t??n ph??n lo???i thu???c"
              onChange={(e) => {
                onSearchInput(e.target.value, "ten");
              }}
            />
          }
        />
      ),
      width: 180,
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          title="Lo???i ????n thu???c"
          sort_key="loaiDonThuoc"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.loaiDonThuoc || 0}
          searchSelect={
            <Select
              data={[
                {
                  id: "",
                  ten: "T???t c???",
                },
                ...listloaiDonThuoc,
              ]}
              defaultValue=""
              placeholder="T??m lo???i ????n thu???c"
              onChange={(e) => {
                onSearchInput(e, "loaiDonThuoc");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "loaiDonThuoc",
      key: "loaiDonThuoc",
      render: (item) => {
        const index = listloaiDonThuoc.findIndex((dt) => dt.id === item);
        if (index === -1) return;
        return listloaiDonThuoc[index].ten;
      },
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Ch???n y??u c???u ?????t d??ng"
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "nhapDotDung");
              }}
            />
          }
          sort_key="nhapDotDung"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.active || 0}
          title="Y??u c???u ?????t d??ng"
        />
      ),
      width: 130,
      dataIndex: "nhapDotDung",
      key: "nhapDotDung",
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
      width: 130,
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
      getListPhanLoaiThuoc({
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
    getListPhanLoaiThuoc({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortColumn),
    });
  };

  const onSizeChange = (size) => {
    const params = { page, size };
    updateData(params);
    getListPhanLoaiThuoc({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortColumn),
    });
  };

  const handleAdded = () => {
    form
      .validateFields()
      .then((values) => {
        if (editStatus) {
          values = { ...values, id: dataEditDefault.id };
        }
        createOrEdit(values).then((res) => {
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
          getListPhanLoaiThuoc(params);
        });
      })
      .catch((error) => {});
  };

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

  const handleClickedBtnAdded = (item) => {
    if (!editStatus) {
      return;
    }
    setEditStatus(false);
    form.resetFields();
  };

  const handleCancel = () => {
    if (editStatus) {
      form.setFieldsValue(dataEditDefault);
    } else {
      form.resetFields();
    }
  };
  const setRowClassName = (record) => {
    let idDiff = dataEditDefault?.id;
    return record.id === idDiff ? "row-actived" : "";
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
            title="Danh m???c ph??n lo???i thu???c"
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
              checkRole([ROLES["DANH_MUC"].PHAN_LOAI_THUOC_THEM])
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
          {+totalElements > 0 && (
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
              okText="L??u"
              roleSave={[ROLES["DANH_MUC"].PHAN_LOAI_THUOC_THEM]}
              roleEdit={[ROLES["DANH_MUC"].PHAN_LOAI_THUOC_SUA]}
              editStatus={editStatus}
            >
              <fieldset
                disabled={
                  editStatus
                    ? !checkRole([ROLES["DANH_MUC"].PHAN_LOAI_THUOC_SUA])
                    : !checkRole([ROLES["DANH_MUC"].PHAN_LOAI_THUOC_THEM])
                }
              >
                <Form
                  form={form}
                  layout="vertical"
                  style={{ width: "100%" }}
                  className="form-custom"
                >
                  <Form.Item
                    label="M?? ph??n lo???i thu???c"
                    name="ma"
                    rules={[
                      {
                        required: true,
                        message: "Vui l??ng nh???p m?? ph??n lo???i thu???c!",
                      },
                      {
                        max: 20,
                        message:
                          "Vui l??ng nh???p m?? ph??n lo???i thu???c kh??ng qu?? 20 k?? t???!",
                      },
                    ]}
                  >
                    <Input
                      ref={refAutoFocus}
                      className="input-option"
                      placeholder="Vui l??ng nh???p m?? ph??n lo???i thu???c"
                    />
                  </Form.Item>
                  <Form.Item
                    label="T??n ph??n lo???i thu???c"
                    name="ten"
                    rules={[
                      {
                        required: true,
                        message: "Vui l??ng nh???p t??n ph??n lo???i thu???c!",
                      },
                      {
                        max: 1000,
                        message:
                          "Vui l??ng nh???p t??n ph??n lo???i thu???c kh??ng qu?? 1000 k?? t???!",
                      },
                    ]}
                  >
                    <Input
                      className="input-option"
                      placeholder="Vui l??ng nh???p t??n ph??n lo???i thu???c"
                    />
                  </Form.Item>
                  <Form.Item label="Lo???i ????n thu???c" name="loaiDonThuoc">
                    <Select
                      data={listloaiDonThuoc}
                      placeholder="Ch???n lo???i ????n thu???c"
                    />
                  </Form.Item>
                  <Form.Item
                    label=" "
                    name="nhapDotDung"
                    valuePropName="checked"
                  >
                    <Checkbox>Y??u c???u ?????t d??ng</Checkbox>
                  </Form.Item>
                  {editStatus && (
                    <Form.Item label=" " name="active" valuePropName="checked">
                      <Checkbox>C?? hi???u l???c</Checkbox>
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
    utils: { listloaiDonThuoc = [] },
    phanLoaiThuoc: {
      listPhanLoaiThuoc = [],
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
      dataSort,
    },
  } = state;

  return {
    listloaiDonThuoc,
    listPhanLoaiThuoc,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    dataSort,
  };
};
const mapDispatchToProps = ({
  phanLoaiThuoc: { getListPhanLoaiThuoc, createOrEdit, onDelete, updateData },
  utils: { getUtils },
}) => ({
  getListPhanLoaiThuoc,
  createOrEdit,
  onDelete,
  updateData,
  getUtils,
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
