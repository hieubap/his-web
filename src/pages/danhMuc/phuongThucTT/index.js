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
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  PAGE_DEFAULT,
  ADD_LAYOUT,
  TABLE_LAYOUT,
  HIEU_LUC,
  NCC_KHAC,
  ROLES,
} from "constants/index";
import { Checkbox, Col, Input, Form, InputNumber } from "antd";
import { handleBlurInput, handleKeypressInput } from "utils";
import FormWraper from "components/FormWraper";
import { checkRole } from "app/Sidebar/constant";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import stringUtils from "mainam-react-native-string-utils";
const PTTT = (props) => {
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
    listData,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    updateData,
    onSearch,
    createOrEdit,
    dataSortColumn,
  } = props;
  const [editStatus, setEditStatus] = useState(false);
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
    props.onSizeChange({ size: 10 });
  }, []);

  useEffect(() => {
    setData([...listData]);
  }, [props.listData, page, size]);
  const onClickSort = (key, value) => {
    props.onSortChange({
      [key]: value,
    });
  };

  const refTimeOut = useRef(null);
  const onSearchInput = (key) => (e) => {
    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
      refTimeOut.current = null;
    }
    refTimeOut.current = setTimeout(
      (key, s) => {
        let value = "";
        if (s) {
          if (s?.hasOwnProperty("checked")) value = s?.checked;
          else value = s?.value;
        } else value = e;
        props.onChangeInputSearch({
          [key]: value,
        });
      },
      500,
      key,
      e?.target
    );
  };

  const onChangePage = (page) => {
    props.onSearch({ page: page - 1 });
  };

  const onSizeChange = (size) => {
    props.onSizeChange({ size: size });
  };
  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 45,
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã PTTT"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input placeholder="Tìm mã PTTT" onChange={onSearchInput("ma")} />
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
          title="Tên PTTT"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input placeholder="Tìm tên PTTT" onChange={onSearchInput("ten")} />
          }
        />
      ),
      width: 120,
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          title="Mã nhà cung cấp PTTT"
          sort_key="maNhaCungCap"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.maNhaCungCap || 0}
          search={
            <Input
              placeholder="Tìm mã nhà cung cấp"
              onChange={onSearchInput("maNhaCungCap")}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "maNhaCungCap",
      key: "maNhaCungCap",
    },
    {
      title: (
        <HeaderSearch
          title="Tên nhà cung cấp PTTT"
          sort_key="tenNhaCungCap"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tenNhaCungCap || 0}
          search={
            <Input
              placeholder="Tìm tên nhà cung cấp"
              onChange={onSearchInput("tenNhaCungCap")}
            />
          }
        />
      ),
      width: 170,
      dataIndex: "tenNhaCungCap",
      key: "tenNhaCungCap",
    },
    {
      title: (
        <HeaderSearch
          sort_key="nccKhacBv"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.nccKhacBv || 0}
          title="NCC khác BV"
          searchSelect={
            <Select
              data={NCC_KHAC}
              placeholder="Chọn NCC khác BV"
              defaultValue=""
              onChange={onSearchInput("nccKhacBv")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "nccKhacBv",
      key: "nccKhacBv",
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
              placeholder="Chọn hiệu lực"
              defaultValue=""
              onChange={onSearchInput("active")}
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
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={NCC_KHAC}
              placeholder="Chọn tiền mặt"
              defaultValue=""
              onChange={onSearchInput("tienMat")}
            />
          }
          sort_key="tienMat"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tienMat || 0}
          title="Tiền mặt"
        />
      ),
      width: 120,
      dataIndex: "tienMat",
      key: "tienMat",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Mức độ ưu tiên"
          sort_key="uuTien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.uuTien || 0}
        />
      ),
      width: 150,
      dataIndex: "uuTien",
      key: "uuTien",
    },
  ];
  const handleAdded = (e) => {
    e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        const { nccKhacBv = false, tienMat = false, ...rest } = values;
        values = {
          nccKhacBv: nccKhacBv || false,
          tienMat: tienMat || false,
          ...rest,
        };
        if (editStatus) {
          values = {
            ...values,
            id: dataEditDefault.id,
          };
        } else {
          updateData({
            dataSortColumn: {
              createdAt: 2,
            },
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
          }
          onSearch(params);
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
        onShowAndHandleUpdate(record);
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
  const validator = (rule, value, callback) => {
    if (value) {
      if (Number(value) > 2147483647) {
        callback(new Error("Vui lòng nhập ưu tiên nhỏ hơn 2147483648!"));
      } else {
        callback();
      }
    } else {
      callback();
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
            title="Danh mục phương thức thanh toán"
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
              checkRole([ROLES["DANH_MUC"].PTTT_THEM])
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
              onChange={onChangePage}
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
              roleSave={[ROLES["DANH_MUC"].PTTT_THEM]}
              roleEdit={[ROLES["DANH_MUC"].PTTT_SUA]}
              editStatus={editStatus}
            >
              <FormWraper
                disabled={
                  editStatus
                    ? !checkRole([ROLES["DANH_MUC"].PTTT_SUA])
                    : !checkRole([ROLES["DANH_MUC"].PTTT_THEM])
                }
                form={form}
                layout="vertical"
                style={{ width: "100%" }}
                className="form-custom"
              >
                <Form.Item
                  label="Mã PTTT"
                  name="ma"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mã PTTT!",
                    },
                    {
                      max: 20,
                      message: "Vui lòng nhập mã PTTT không quá 20 ký tự!",
                    },
                    {
                      whitespace: true,
                      message: "Vui lòng nhập mã PTTT!",
                    },
                  ]}
                >
                  <Input
                    ref={refAutoFocus}
                    className="input-option"
                    placeholder="Vui lòng nhập mã PTTT"
                  />
                </Form.Item>
                <Form.Item
                  label="Tên PTTT"
                  name="ten"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên PTTT!",
                    },
                    {
                      max: 1000,
                      message: "Vui lòng nhập tên PTTT không quá 1000 ký tự!",
                    },
                    {
                      whitespace: true,
                      message: "Vui lòng nhập tên PTTT!",
                    },
                  ]}
                >
                  <Input
                    className="input-option"
                    placeholder="Vui lòng nhập tên PTTT"
                  />
                </Form.Item>
                <Form.Item
                  label="Mã nhà cung cấp PTTT"
                  name="maNhaCungCap"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng mã nhà cung cấp PTTT!",
                    },
                  ]}
                >
                  <Input
                    className="input-option"
                    placeholder="Vui lòng nhập mã nhà cung cấp PTTT"
                  />
                </Form.Item>
                <Form.Item
                  label="Tên nhà cung cấp thanh toán"
                  name="tenNhaCungCap"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên nhà cung cấp thanh toán!",
                    },
                  ]}
                >
                  <Input
                    className="input-option"
                    placeholder="Vui lòng nhập tên nhà cung cấp thanh toán"
                  />
                </Form.Item>
                <Form.Item name="nccKhacBv" valuePropName="checked">
                  <Checkbox>NCC khác BV</Checkbox>
                </Form.Item>
                <Form.Item
                  label="Mức độ ưu Tiên"
                  name="uuTien"
                  rules={[
                    {
                      validator: validator,
                    },
                  ]}
                >
                  <InputNumber
                    className="input-option"
                    placeholder="Vui lòng nhập mức độ ưu tiên"
                    onKeyDown={handleKeypressInput}
                    onBlur={handleBlurInput}
                  />
                </Form.Item>
                <Form.Item name="tienMat" valuePropName="checked">
                  <Checkbox>Tiền mặt</Checkbox>
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
    phuongThucTT: {
      listData,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
      dataSortColumn,
    },
  } = state;

  return {
    listData,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    dataSortColumn,
  };
};
const mapDispatchToProps = ({
  phuongThucTT: {
    onSearch,
    createOrEdit,
    updateData,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
  },
}) => ({
  onSearch,
  createOrEdit,
  updateData,
  onSizeChange,
  onSortChange,
  onChangeInputSearch,
});

export default connect(mapStateToProps, mapDispatchToProps)(PTTT);
