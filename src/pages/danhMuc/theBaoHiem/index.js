import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import HomeWrapper from "components/HomeWrapper";
import TableWrapper from "components/TableWrapper";
import CreatedWrapper from "components/CreatedWrapper";
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
import { Checkbox, Col, Input, Form } from "antd";
import FormWraper from "components/FormWraper";
import { checkRole } from "app/Sidebar/constant";
import { openInNewTab } from "utils";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import stringUtils from "mainam-react-native-string-utils";
let timer = null;
const { TextArea } = Input;

const TheBaoHiem = (props) => {
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
    listTheBaoHiem,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    listNgheNghiep,
    updateData,
    getListTheBaoHiem,
    getListNgheNghiepTongHop,
    createOrEdit,
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
    const params = { page, size, sort };
    getListTheBaoHiem(params);
    getListNgheNghiepTongHop({ page: 0, size: 500 });
  }, []);

  useEffect(() => {
    const data = listTheBaoHiem.map((item, index) => {
      return { ...item, action: item, stt: page * size + index + 1 };
    });
    setData(data);
  }, [listTheBaoHiem, page, size]);

  const onClickSort = (key, value) => {
    const sort = { [key]: value, ...dataSortColumn, [key]: value };
    setDataSortColumn(sort);
    const res = combineSort(sort);
    getListTheBaoHiem({
      page: PAGE_DEFAULT,
      size,
      sort: res,
      ...dataSearch,
    });
  };

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
          title="Mã thẻ BH"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input
              placeholder="Tìm mã thẻ BH"
              onChange={(e) => {
                onSearchInput(e.target.value, "ma");
              }}
            />
          }
        />
      ),
      width: 140,
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="Tên thẻ BH"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="Tìm tên thẻ BH"
              onChange={(e) => {
                onSearchInput(e.target.value, "ten");
              }}
            />
          }
        />
      ),
      width: 190,
      dataIndex: "ten",
      key: "ten",
    },

    {
      title: (
        <HeaderSearch
          title="Mức hưởng"
          sort_key="mucHuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.mucHuong || 0}
          search={
            <Input
              placeholder="Tìm mức hưởng"
              onChange={(e) => {
                onSearchInput(e.target.value, "mucHuong");
              }}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "mucHuong",
      key: "mucHuong",
      render: (item) => {
        return item && <span>{`${item}%`}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nghề nghiệp"
          sort_key="ngheNghiep.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ngheNghiep.ten"] || 0}
          searchSelect={
            <Select
              data={listNgheNghiep}
              placeholder="Tìm nghề nghiệp"
              onChange={(value) => {
                onSearchInput(value, "ngheNghiepId");
              }}
            />
          }
        />
      ),
      width: 130,
      dataIndex: "ngheNghiep",
      key: "ngheNghiep",
      render: (item) => {
        return item && <span>{item.ten}</span>;
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
      width: 180,
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
              onChange={(value) => {
                onSearchInput(value, "active");
              }}
            />
          }
          title="Có hiệu lực"
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.active || 0}
        />
      ),
      width: 140,
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
      getListTheBaoHiem({
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
    getListTheBaoHiem({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortColumn),
    });
  };

  const onSizeChange = (size) => {
    const params = { page, size };
    updateData(params);
    getListTheBaoHiem({
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
          getListTheBaoHiem(params);
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
            title="Danh mục thẻ bảo hiểm"
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
              checkRole([ROLES["DANH_MUC"].THE_BAO_HIEM_THEM])
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
              roleSave={[ROLES["DANH_MUC"].THE_BAO_HIEM_THEM]}
              roleEdit={[ROLES["DANH_MUC"].THE_BAO_HIEM_SUA]}
              editStatus={editStatus}
            >
              <FormWraper
                disabled={
                  editStatus
                    ? !checkRole([ROLES["DANH_MUC"].THE_BAO_HIEM_SUA])
                    : !checkRole([ROLES["DANH_MUC"].THE_BAO_HIEM_THEM])
                }
                form={form}
                layout="vertical"
                style={{ width: "100%" }}
                className="form-custom"
              >
                <Form.Item
                  label="Mã thẻ bảo hiểm"
                  name="ma"
                  rules={[
                    { required: true, message: "Vui lòng nhập mã thẻ BH!" },
                    {
                      max: 20,
                      message: "Vui lòng nhập mã thẻ BH không quá 20 ký tự!",
                    },
                    {
                      whitespace: true,
                      message: "Vui lòng nhập mã thẻ BH!",
                    },
                    {
                      pattern: /\D+/,
                      message: "Mã phải có ít nhất một ký tự là chữ!",
                    },
                  ]}
                >
                  <Input
                    ref={refAutoFocus}
                    className="input-option"
                    placeholder="Nhập mã thẻ bảo hiểm"
                  />
                </Form.Item>
                <Form.Item
                  label="Tên thẻ bảo hiểm"
                  name="ten"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên thẻ BH!" },
                    {
                      max: 1000,
                      message: "Vui lòng nhập tên thẻ BH không quá 1000 ký tự!",
                    },
                  ]}
                >
                  <Input
                    className="input-option"
                    placeholder="Nhập tên thẻ bảo hiểm"
                  />
                </Form.Item>

                <Form.Item
                  label="Mức hưởng"
                  name="mucHuong"
                  rules={[
                    { required: true, message: "Vui lòng nhập mức hưởng!" },
                  ]}
                >
                  <Input
                    className="input-option"
                    type="number"
                    placeholder="Nhập mức hưởng"
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <div
                      className="pointer"
                      onClick={() => openInNewTab("/danh-muc/nghe-nghiep")}
                    >
                      Nghề nghiệp
                    </div>
                  }
                  name="ngheNghiepId"
                >
                  <Select
                    data={listNgheNghiep}
                    placeholder="Chọn nghề nghiệp"
                  ></Select>
                </Form.Item>
                <Form.Item label="Ghi chú" name="ghiChu">
                  <TextArea
                    rows={4}
                    placeholder="Nhập ghi chú"
                    maxLength={1000}
                    showCount
                  />
                </Form.Item>
                {editStatus && (
                  <Form.Item label=" " name="active" valuePropName="checked">
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
    theBaoHiem: {
      listTheBaoHiem,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
    },
    ngheNghiep: { listNgheNghiep },
  } = state;

  return {
    listTheBaoHiem,
    listNgheNghiep,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
  };
};
const mapDispatchToProps = ({
  theBaoHiem: { getListTheBaoHiem, createOrEdit, onDelete, updateData },
  ngheNghiep: { getListNgheNghiepTongHop },
}) => ({
  getListTheBaoHiem,
  getListNgheNghiepTongHop,
  createOrEdit,
  onDelete,
  updateData,
});

export default connect(mapStateToProps, mapDispatchToProps)(TheBaoHiem);
