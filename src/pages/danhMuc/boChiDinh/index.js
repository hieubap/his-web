import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import HomeWrapper from "components/HomeWrapper";
import TableWrapper from "components/TableWrapper";
import EditWrapper from "components/MultiLevelTab/EditWrapper";
import MultiLevelTab from "components/MultiLevelTab";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import { Main } from "./styled";
import { combineSort } from "utils";
import { SORT_DEFAULT } from "constants/page/therapyConstant";
import {
  PAGE_DEFAULT,
  ADD_LAYOUT,
  TABLE_LAYOUT,
  TABLE_LAYOUT_COLLAPSE,
  ADD_LAYOUT_COLLAPSE,
  HIEU_LUC,
  YES_NO,
} from "constants/index";
import {
  Checkbox,
  Col,
  Input,
  Modal,
  Form,
  Image,
  Select as SelectAntd,
} from "antd";
import DichVu from "./DichVu";
import { checkRole } from "app/Sidebar/constant";
import { ROLES } from "constants/index";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import stringUtils from "mainam-react-native-string-utils";
let timer = null;

const Unit = (props) => {
  const refLayerHotKey = useRef(stringUtils.guid());
  const refClickBtnAdd = useRef();
  const refClickBtnSave = useRef();
  const refSave1 = useRef();
  const refSave2 = useRef();
  const refSelectRow = useRef();
  const {
    listBoChiDinh,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    updateData,
    getListBoChiDinh,
    createOrEdit,
    onDelete,
    getUtils,
    listloaiDichVuBoChiDinh,
    onSearchTaiKhoan,
    listAccount,
    auth,
  } = props;
  const [editStatus, setEditStatus] = useState(false);
  const [dataSortColumn, setDataSortColumn] = useState(SORT_DEFAULT);
  const [data, setData] = useState([]);

  const [form] = Form.useForm();
  const [collapseStatus, setCollapseStatus] = useState(false);
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;

  useEffect(() => {
    const sort = combineSort(dataSortColumn);
    const params = { page, size, sort, bacSiChiDinhId: auth.nhanVienId };
    getListBoChiDinh(params);
    getUtils({ name: "loaiDichVuBoChiDinh" });
    onSearchTaiKhoan({ page: 0, size: 9999 });
  }, []);

  useEffect(() => {
    const data = listBoChiDinh.map((item, index) => {
      return { ...item, action: item, stt: page * size + index + 1 };
    });
    setData(data);
  }, [listBoChiDinh, page, size]);

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
    const newData = {
      ...data[indexNextItem],
      bacSiChiDinhTaiKhoan: data?.bacSiChiDinh?.taiKhoan || null,
    };
    if (-1 < indexNextItem && indexNextItem < data.length) {
      setEditStatus(true);
      updateData({ dataEditDefault: newData });
      form.setFieldsValue(newData);
      document
        .getElementsByClassName("row-id-" + newData?.id)[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  refClickBtnSave.current = (e) => {
    const { activeKeyTab } = state;
    if (activeKeyTab === "1" && refSave1.current) refSave1.current(e);
    if (activeKeyTab === "2" && refSave2.current) refSave2.current(e);
  };

  const [state, _setState] = useState({
    showFullTable: false,
    activeKeyTab: "1",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const onClickSort = (key, value) => {
    const sort = { [key]: value, ...dataSortColumn, [key]: value };
    setDataSortColumn(sort);
    const res = combineSort(sort);
    getListBoChiDinh({
      bacSiChiDinhId: auth.nhanVienId,
      page: PAGE_DEFAULT,
      size,
      sort: res,
      ...dataSearch,
    });
  };

  const handleCollapsePane = () => {
    setCollapseStatus(!collapseStatus);
  };

  const onDeleteItem = (item) => {
    Modal.confirm({
      title: "Bạn có chắc chắn xóa bản ghi này không?",
      cancelText: "Hủy",
      okText: "Đồng ý",
      onOk() {
        onDelete(item.id);
      },
      onCancel() {},
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
          title="Mã bộ"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input
              placeholder="Tìm mã bộ"
              onChange={(e) => {
                onSearchInput(e.target.value, "ma");
              }}
            />
          }
        />
      ),
      width: 180,
      dataIndex: "ma",
      key: "ma",
      render: (item) => {
        return item && <span>{item}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tên bộ"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.ten || 0}
          search={
            <Input
              placeholder="Tìm tên bộ"
              onChange={(e) => {
                onSearchInput(e.target.value, "ten");
              }}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          title="Loại dịch vụ"
          sort_key="dsLoaiDichVu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.dsLoaiDichVu || 0}
          searchSelect={
            <Select
              mode="multiple"
              placeholder="Loại dịch vụ"
              data={listloaiDichVuBoChiDinh}
              onChange={(e) => {
                onSearchInput(e, "dsLoaiDichVu");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dsLoaiDichVu",
      key: "dsLoaiDichVu",
      render: (item) => {
        return (
          item &&
          item
            ?.map(
              (e, index) =>
                listloaiDichVuBoChiDinh?.find((i) => i.id === e)?.ten
            )
            .join(",")
        );
      },
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={YES_NO}
              placeholder="Chọn bộ thuốc kê ngoài"
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "thuocChiDinhNgoai");
              }}
            />
          }
          sort_key="thuocChiDinhNgoai"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.thuocChiDinhNgoai || 0}
          title="Bộ thuốc kê ngoài"
        />
      ),
      width: 150,
      dataIndex: "thuocChiDinhNgoai",
      key: "thuocChiDinhNgoai",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tài khoản chỉ định"
          sort_key="bacSiChiDinh.taiKhoan"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["bacSiChiDinh.taiKhoan"] || 0}
          search={
            <Input
              placeholder="Tìm tên tài khoản chỉ định"
              onChange={(e) => {
                onSearchInput(e.target.value, "bacSiChiDinh.taiKhoan");
              }}
            />
          }
        />
      ),
      width: 220,
      render: (item) => {
        return <div>{item.bacSiChiDinh.taiKhoan}</div>;
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
      width: 120,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      title: <HeaderSearch title="Actions" />,
      width: 50,
      dataIndex: "actions",
      key: "actions",
      align: "center",
      render: (_, item) => {
        if (
          checkRole([ROLES["DANH_MUC"].BO_CHI_DINH_SUA]) ||
          checkRole([ROLES["DANH_MUC"].BO_CHI_DINH_THEM])
        ) {
          return (
            <Image
              preview={false}
              src={require("assets/images/his-core/iconDelete.png")}
              onClick={() => {
                onDeleteItem(item);
              }}
            />
          );
        }
        return <></>;
      },
    },
  ];

  const onSearchInput = (value, name) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      updateData({ dataSearch: { ...dataSearch, [name]: value } });
      getListBoChiDinh({
        ...dataSearch,
        page: PAGE_DEFAULT,
        size,
        [name]: value,
        sort: combineSort(dataSortColumn),
        bacSiChiDinhId: auth.nhanVienId,
      });
    }, 500);
  };

  const onPageChange = (page) => {
    const params = { page: page - 1, size };
    updateData(params);
    getListBoChiDinh({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortColumn),
      bacSiChiDinhId: auth.nhanVienId,
    });
  };

  const onSizeChange = (size) => {
    const params = { page, size };
    updateData(params);
    getListBoChiDinh({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortColumn),
      bacSiChiDinhId: auth.nhanVienId,
    });
  };

  const handleAdded = (e) => {
    e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        values = {
          ...values,
          bacSiChiDinhId: auth.nhanVienId,
        };
        delete values?.bacSiChiDinhTaiKhoan;
        if (editStatus) {
          values = { ...values, id: dataEditDefault.id };
        }
        createOrEdit(values).then(() => {
          const params = {
            page,
            size,
            ...dataSearch,
            sort: combineSort(dataSortColumn),
            bacSiChiDinhId: auth.nhanVienId,
          };
          if (!editStatus) {
            params.page = PAGE_DEFAULT;
            form.resetFields();
          }
          getListBoChiDinh(params);
        });
      })
      .catch((error) => {});
  };
  refSave1.current = handleAdded;

  const onShowAndHandleUpdate = (data = {}) => {
    setEditStatus(true);
    data.bacSiChiDinhTaiKhoan = data?.bacSiChiDinh?.taiKhoan || null;
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

  const setRowClassName = (record) => {
    let idDiff = dataEditDefault?.id;
    return record.id === idDiff
      ? "row-actived row-id-" + record.id
      : "row-id-" + record.id;
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
  const listPanel = [
    {
      title: "Thông tin chi tiết",
      key: 1,
      render: () => {
        return (
          <>
            <EditWrapper
              title="Thông tin chi tiết"
              onCancel={handleCancel}
              onSave={handleAdded}
              showAdded={false}
              isShowSaveButton={true}
              isShowCancelButton={true}
              roleSave={[ROLES["DANH_MUC"].BO_CHI_DINH_THEM]}
              roleEdit={[ROLES["DANH_MUC"].BO_CHI_DINH_SUA]}
              editStatus={
                editStatus
                  ? !checkRole([ROLES["DANH_MUC"].BO_CHI_DINH_SUA])
                  : !checkRole([ROLES["DANH_MUC"].BO_CHI_DINH_THEM])
              }
              isHiddenButtonAdd={true}
              forceShowButtonSave={
                (dataEditDefault &&
                  checkRole([ROLES["DANH_MUC"].BO_CHI_DINH_SUA]) &&
                  true) ||
                false
              }
              forceShowButtonCancel={
                (dataEditDefault &&
                  checkRole([ROLES["DANH_MUC"].BO_CHI_DINH_SUA]) &&
                  true) ||
                false
              }
            >
              <fieldset
                disabled={
                  editStatus
                    ? !checkRole([ROLES["DANH_MUC"].BO_CHI_DINH_SUA])
                    : !checkRole([ROLES["DANH_MUC"].BO_CHI_DINH_THEM])
                }
              >
                <Form
                  form={form}
                  layout="vertical"
                  style={{ width: "100%" }}
                  className="form-custom form-custom--one-line"
                >
                  <Form.Item
                    label="Mã bộ"
                    name="ma"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mã bộ!",
                      },
                      {
                        max: 20,
                        message: "Vui lòng nhập mã bộ không quá 20 ký tự!",
                      },
                      {
                        whitespace: true,
                        message: "Vui lòng nhập mã bộ!",
                      },
                    ]}
                  >
                    <Input
                      className="input-option"
                      placeholder="Vui lòng nhập mã bộ"
                      ref={refAutoFocus}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Tên bộ"
                    name="ten"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên bộ!",
                      },
                      {
                        max: 1000,
                        message: "Vui lòng nhập tên bộ không quá 1000 ký tự!",
                      },
                      {
                        whitespace: true,
                        message: "Vui lòng nhập tên bộ!",
                      },
                    ]}
                  >
                    <Input
                      className="input-option"
                      placeholder="Vui lòng nhập tên bộ"
                    />
                  </Form.Item>
                  <Form.Item label="Loại dịch vụ" name="dsLoaiDichVu">
                    <Select
                      mode="multiple"
                      placeholder="Vui lòng chọn loại dịch vụ"
                      data={listloaiDichVuBoChiDinh}
                      showArrow={true}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Tài khoản chỉ định"
                    name="bacSiChiDinhTaiKhoan"
                  >
                    <Input className="input-option" disabled={true} />
                  </Form.Item>
                  <Form.Item label="Bác sĩ chỉ định" name="bacSiChiDinhId">
                    <SelectAntd
                      defaultValue={auth.nhanVienId}
                      value={auth.nhanVienId}
                      disabled={true}
                      placeholder="Vui lòng chọn bác sĩ chỉ định"
                    >
                      {listAccount.map((option) => (
                        <SelectAntd.Option
                          key={option?.nhanVienId}
                          value={option?.nhanVienId}
                        >
                          {option?.nhanVien?.ten}
                        </SelectAntd.Option>
                      ))}
                      }
                    </SelectAntd>
                  </Form.Item>
                  <Form.Item
                    label=""
                    name="thuocChiDinhNgoai"
                    valuePropName="checked"
                    style={{ marginTop: 40 }}
                  >
                    <Checkbox>Bộ thuốc kê ngoài</Checkbox>
                  </Form.Item>
                  {editStatus && (
                    <Form.Item label=" " name="active" valuePropName="checked">
                      <Checkbox>Có hiệu lực</Checkbox>
                    </Form.Item>
                  )}
                </Form>
              </fieldset>
            </EditWrapper>
          </>
        );
      },
    },
    {
      key: 2,
      title: "Dịch vụ trong bộ chỉ định",
      render: () => {
        return (
          <DichVu
            refCallbackSave={refSave2}
            dsLoaiDichVu={dataEditDefault?.dsLoaiDichVu}
            boChiDinhId={dataEditDefault?.id}
            roleSave={[ROLES["DANH_MUC"].BO_CHI_DINH_THEM]}
            roleEdit={[ROLES["DANH_MUC"].BO_CHI_DINH_SUA]}
            editStatus={
              editStatus
                ? !checkRole([ROLES["DANH_MUC"].BO_CHI_DINH_SUA])
                : !checkRole([ROLES["DANH_MUC"].BO_CHI_DINH_THEM])
            }
            isHiddenButtonAdd={true}
            currentItemRowParent={dataEditDefault}
          />
        );
      },
    },
  ];
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
            title="Danh mục bộ chỉ định"
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
              checkRole([ROLES["DANH_MUC"].BO_CHI_DINH_THEM])
                ? [
                    {
                      title: "Thêm mới [F1]",
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
            <MultiLevelTab
              // defaultActiveKey={1}
              listPanel={listPanel}
              isBoxTabs={true}
              activeKey={state.activeKeyTab}
              onChange={(activeKeyTab) => setState({ activeKeyTab })}
            ></MultiLevelTab>
          </Col>
        )}
      </HomeWrapper>
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    boChiDinh: {
      listBoChiDinh,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
      dataSort,
    },
    utils: { listloaiDichVuBoChiDinh },
    adminTaiKhoanHeThong: { listAccount },
    auth: { auth },
  } = state;
  return {
    listBoChiDinh,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    dataSort,
    listloaiDichVuBoChiDinh,
    listAccount,
    auth,
  };
};
const mapDispatchToProps = ({
  boChiDinh: { getListBoChiDinh, createOrEdit, onDelete, updateData },
  utils: { getUtils },
  adminTaiKhoanHeThong: { onSearch: onSearchTaiKhoan },
}) => ({
  getListBoChiDinh,
  createOrEdit,
  onDelete,
  updateData,
  getUtils,
  onSearchTaiKhoan,
});

export default connect(mapStateToProps, mapDispatchToProps)(Unit);
