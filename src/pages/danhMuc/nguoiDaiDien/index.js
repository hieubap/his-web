import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import HomeWrapper from "components/HomeWrapper";
import TableWrapper from "components/TableWrapper";
import CreatedWrapper from "components/CreatedWrapper";
import moment from "moment";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import DatePicker from "components/DatePicker";
import { combineSort } from "utils";

import { Main } from "./styled";
import { SORT_DEFAULT } from "constants/page/therapyConstant";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  PAGE_DEFAULT,
  ADD_LAYOUT,
  TABLE_LAYOUT,
  HIEU_LUC,
  BIRTHDAY_FORMAT,
  ROLES,
} from "constants/index";

import { Checkbox, Col, Input, Form } from "antd";
import { checkRole } from "app/Sidebar/constant";
import FormWraper from "components/FormWraper";
import { openInNewTab } from "utils";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import stringUtils from "mainam-react-native-string-utils";
let timer = null;

const NguoiDaiDien = (props) => {
  const {
    listNguoiDaiDien,
    listAllDonVi,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    updateData,
    getListNguoiDaiDien,
    getListAllDonVi,
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
      const dataUpdate = {
        ...data[indexNextItem],
        ngaySinh: data.ngaySinh ? moment(data.ngaySinh) : "",
      };
      updateData({ dataEditDefault: dataUpdate });
      form.setFieldsValue(dataUpdate);

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
  useEffect(() => {
    const sort = combineSort(dataSortColumn);
    const params = { page, size, sort };
    getListNguoiDaiDien(params);
    getListAllDonVi();
  }, []);

  useEffect(() => {
    const data = listNguoiDaiDien.map((item, index) => {
      return { ...item, stt: page * size + index + 1 };
    });
    setData(data);
  }, [listNguoiDaiDien, page, size]);

  const onClickSort = (key, value) => {
    const sort = { [key]: value, ...dataSortColumn, [key]: value };
    delete sort.createdAt;
    setDataSortColumn(sort);
    const res = combineSort(sort);
    getListNguoiDaiDien({ page: PAGE_DEFAULT, size, sort: res, ...dataSearch });
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 70,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã người đại diện"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input
              placeholder="Tìm mã người đại diện"
              onChange={(e) => {
                onSearchInput(e.target.value, "ma");
              }}
            />
          }
        />
      ),
      width: 130,
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="Tên người đại diện"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="Tìm tên người đại diện"
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
          title="Số diện thoại"
          sort_key="soDienThoai"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.soDienThoai || 0}
          search={
            <Input
              placeholder="Tìm số điện thoại"
              onChange={(e) => {
                onSearchInput(e.target.value, "soDienThoai");
              }}
              type="number"
            />
          }
        />
      ),
      width: 130,
      dataIndex: "soDienThoai",
      key: "soDienThoai",
    },
    {
      title: (
        <HeaderSearch
          title="Ngày sinh"
          sort_key="ngaySinh"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ngaySinh || 0}
          searchSelect={
            <DatePicker
              placeholder="Tìm ngày sinh"
              onChange={(value) => {
                onSearchInput(
                  moment(value).format(BIRTHDAY_FORMAT),
                  "ngaySinh"
                );
              }}
            />
          }
        />
      ),
      width: 140,
      dataIndex: "ngaySinh",
      key: "ngaySinh",
      render: (item) => {
        return item && <span>{moment(item).format(BIRTHDAY_FORMAT)}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Địa chỉ"
          sort_key="diaChi"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.diaChi || 0}
          search={
            <Input
              placeholder="Tìm địa chỉ"
              onChange={(e) => {
                onSearchInput(e.target.value, "diaChi");
              }}
            />
          }
        />
      ),
      width: 160,
      dataIndex: "diaChi",
      key: "diaChi",
      render: (item) => {
        return <span>{item}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Số tài khoản"
          sort_key="soTaiKhoan"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.soTaiKhoan || 0}
          search={
            <Input
              placeholder="Tìm số tài khoản"
              onChange={(e) => {
                onSearchInput(e.target.value, "soTaiKhoan");
              }}
              type="number"
            />
          }
        />
      ),
      width: 150,
      dataIndex: "soTaiKhoan",
      key: "soTaiKhoan",
    },
    {
      title: (
        <HeaderSearch
          title="Mã số thuế"
          sort_key="maSoThue"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.maSoThue || 0}
          search={
            <Input
              placeholder="Tìm mã số thuế"
              onChange={(e) => {
                onSearchInput(e.target.value, "maSoThue");
              }}
              type="number"
            />
          }
        />
      ),
      width: 140,
      dataIndex: "maSoThue",
      key: "maSoThue",
    },
    {
      title: (
        <HeaderSearch
          sort_key="donVi"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.donVi || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "Tất cả" }, ...listAllDonVi]}
              defaultValue=""
              placeholder="Chọn đơn vị"
              onChange={(value) => {
                onSearchInput(value, "donViId");
              }}
            />
          }
          title="Đơn vị"
        />
      ),
      width: 120,
      dataIndex: "donViId",
      key: "donViId",
      render: (item) => {
        const index = listAllDonVi.findIndex((unit) => unit.id === item);
        if (index === -1) return;
        return listAllDonVi[index].ten;
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
              data={HIEU_LUC}
              defaultValue=""
              placeholder="Chọn hiệu lực"
              onChange={(value) => {
                onSearchInput(value, "active");
              }}
            />
          }
          title="Có hiệu lực"
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
      getListNguoiDaiDien({
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
    getListNguoiDaiDien({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortColumn),
    });
  };

  const onSizeChange = (size) => {
    const params = { page, size };
    updateData(params);
    getListNguoiDaiDien({
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
              dataEditDefault.id ? dataSortColumn : { createdAt: 2 }
            ),
          };
          if (!editStatus) {
            params.page = PAGE_DEFAULT;
            form.resetFields();
          }
          getListNguoiDaiDien(params);
        });
      })
      .catch((error) => {});
  };
  refClickBtnSave.current = handleAdded;

  const onShowAndHandleUpdate = (data = {}) => {
    setEditStatus(true);
    const dataUpdate = {
      ...data,
      ngaySinh: data.ngaySinh ? moment(data.ngaySinh) : "",
    };
    updateData({ dataEditDefault: dataUpdate });
    form.setFieldsValue(dataUpdate);
  };

  const onRow = (record) => {
    return {
      onClick: (event) => {
        onShowAndHandleUpdate(record);
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
            title="Danh mục người đại diện"
            scroll={{ x: 1500 }}
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
              checkRole([ROLES["DANH_MUC"].NGUOI_DAI_DIEN_THEM])
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
              total={totalElements}
              listData={data}
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
              roleSave={[ROLES["DANH_MUC"].NGUOI_DAI_DIEN_THEM]}
              roleEdit={[ROLES["DANH_MUC"].NGUOI_DAI_DIEN_SUA]}
              editStatus={editStatus}
            >
              <FormWraper
                disabled={
                  editStatus
                    ? !checkRole([ROLES["DANH_MUC"].NGUOI_DAI_DIEN_SUA])
                    : !checkRole([ROLES["DANH_MUC"].NGUOI_DAI_DIEN_THEM])
                }
                form={form}
                layout="vertical"
                style={{ width: "100%" }}
                className="form-custom"
              >
                <Form.Item
                  label="Mã người đại diện"
                  name="ma"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mã người đại diện!",
                    },
                    {
                      max: 20,
                      message:
                        "Vui lòng nhập mã người đại diện không quá 20 ký tự!",
                    },
                    {
                      whitespace: true,
                      message: "Vui lòng nhập mã người đại diện!",
                    },
                  ]}
                >
                  <Input
                    autoFocus={true}
                    className="input-option"
                    placeholder="Nhập mã người đại diện"
                    ref={refAutoFocus}
                  />
                </Form.Item>
                <Form.Item
                  label="Tên"
                  name="ten"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên người đại diện!",
                    },
                    {
                      max: 1000,
                      message:
                        "Vui lòng nhập tên người đại diện không quá 1000 ký tự!",
                    },
                    {
                      whitespace: true,
                      message: "Vui lòng nhập tên người đại diện!",
                    },
                  ]}
                >
                  <Input
                    className="input-option"
                    placeholder="Nhập tên người đại diện"
                  />
                </Form.Item>
                <Form.Item label="Số điện thoại" name="soDienThoai">
                  <Input
                    className="input-option hidden-arrow"
                    type="number"
                    placeholder="Nhập số điện thoại"
                  />
                </Form.Item>
                <Form.Item label="Ngày sinh" name="ngaySinh">
                  <DatePicker
                    format={BIRTHDAY_FORMAT}
                    placeholder="Nhập ngày sinh"
                  />
                </Form.Item>
                <Form.Item label="Số tài khoản" name="soTaiKhoan">
                  <Input
                    className="input-option hidden-arrow"
                    type="number"
                    placeholder="Nhập số tài khoản"
                  />
                </Form.Item>
                <Form.Item label="Mã số thuế" name="maSoThue">
                  <Input
                    className="input-option hidden-arrow"
                    type="number"
                    placeholder="Nhập mã số thuế"
                  />
                </Form.Item>
                <Form.Item label="Địa chỉ" name="diaChi">
                  <Input className="input-option" placeholder="Nhập địa chỉ" />
                </Form.Item>
                <Form.Item
                  label={
                    <div
                      className="pointer"
                      onClick={() => openInNewTab("/danh-muc/co-quan-don-vi")}
                    >
                      Đơn vị
                    </div>
                  }
                  name="donViId"
                >
                  <Select data={listAllDonVi} placeholder="Nhập đơn vị" />
                </Form.Item>
                {editStatus && (
                  <Form.Item name="active" label=" " valuePropName="checked">
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
    nguoiDaiDien: {
      listNguoiDaiDien,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
      dataSort,
    },
    donVi: { listAllDonVi },
  } = state;

  return {
    listNguoiDaiDien,
    listAllDonVi,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    dataSort,
  };
};
const mapDispatchToProps = ({
  nguoiDaiDien: { getListNguoiDaiDien, createOrEdit, onDelete, updateData },
  donVi: { getListAllDonVi },
}) => ({
  getListNguoiDaiDien,
  getListAllDonVi,
  createOrEdit,
  onDelete,
  updateData,
});

export default connect(mapStateToProps, mapDispatchToProps)(NguoiDaiDien);
