import React, { useState, useEffect, useCallback, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import {
  Checkbox,
  Col,
  Input,
  Form,
  InputNumber,
  Upload,
  Button,
  Row,
  Select,
  message,
} from "antd";
import { HOST } from "client/request";
import HomeWrapper from "components/HomeWrapper";
import TableWrapper from "components/TableWrapper";
import CreatedWrapper from "components/CreatedWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import SelectCustom from "components/Select";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  HIEU_LUC,
  TABLE_LAYOUT,
  ADD_LAYOUT,
  ROLES,
} from "constants/index";
import baoCaoProvider from "data-access/categories/dm-bao-cao-provider";
import {
  Main,
  BaoCaoChiTietStyle,
  Wrapper,
  MainPhanQuyen,
  SelectCustom2,
} from "./styled";
import uploadImg from "assets/images/his-core/import.png";
import { SORT_DEFAULT, DS_DINH_DANG } from "./configs";
import { checkRole } from "app/Sidebar/constant";
import FormWraper from "components/FormWraper";
import { IN_NHANH_KYSO } from "constants/index";
import MultiLevelTab from "components/MultiLevelTab";
import IcCreate from "assets/images/kho/IcCreate.png";
import { ModalNotification2 } from "components/ModalConfirm";
import { debounce } from "lodash";
const ThongTinChiTietLoaiPhieu = ({
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
  listhuongGiay,
  listkhoGiay,
  listDinhDangBaoCao,
  stateParent,
  listAccount,
  listDataQuyenKy,
  onSizeChangeQuyenKy,
  getListKhoa,
  listKhoa,
  deleteThietLap,
  setStateParent,

  refCallbackSave = {},
}) => {
  const refConfirmXoaRow = useRef(null);
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [form] = Form.useForm();

  const [state, _setState] = useState({
    mauBaoCao: null,
    editStatus: false,
    defaultFileList: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    // if (dataEditDefault) {
      setState({ ...stateParent });
      if (
        !stateParent.editStatus &&
        stateParent.mauBaoCao === null &&
        stateParent.defaultFileList?.length === 0 &&
        !stateParent.invalidMauBaoCao &&
        !dataEditDefault?.id
      ) {
        form.resetFields();
      } else {
        form.setFieldsValue({
          ...dataEditDefault,
          ten: dataEditDefault?.nhanVien?.ten,
        });
      }
    // }
  }, [dataEditDefault, stateParent]);

  useEffect(() => {
    // onSizeChange({ size: 10 });
    getListKhoa({ page: 0, size: 9999 });
  }, []);

  const handleAdded = (e) => {
    e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        let formattedData = {
          // nhanVien: {
          //     ten: values.ten
          // },
          nhanVienId: values.nhanVienId,
          khoaChiDinhId: values?.khoaChiDinhId || null,
          quyenKyId: values?.quyenKyId || null,
          khoaThucHienId: values?.khoaThucHienId || null,
        };
        if (state.editStatus) {
          formattedData = { ...formattedData, id: dataEditDefault.id };
        }
        const objDupplicate = listData.find(
          (item) =>
            item.khoaChiDinhId === formattedData.khoaChiDinhId &&
            item.khoaThucHienId === formattedData.khoaThucHienId &&
            item.nhanVienId === formattedData.nhanVienId &&
            item.quyenKyId === formattedData.quyenKyId
        );
        if (objDupplicate && !state.editStatus) {
          message.error("Ph??n quy???n t??i kho???n ???? t???n t???i");
          return null;
        }
        createOrEdit(formattedData).then(() => {
          if (!state.editStatus) {
            form.resetFields();
          }
          setState({
            mauBaoCao: null,
            defaultFileList: [],
          });
          setStateParent({
            isSelected: false,
          });
        });
      })
      .catch((error) => {
        if (!state.mauBaoCao) {
          setState({
            invalidMauBaoCao: true,
          });
          return;
        }
      });
  };

  const onChangeKhoGiay = (val) => {
    setState({
      isRequiredKichThuoc: val === 200,
    });
    form.validateFields();
  };
  const handleCancel = () => {
    if (state.editStatus) {
      form.setFieldsValue(dataEditDefault);
    } else {
      form.resetFields();
    }
    setStateParent({
      isSelected: true,
    });
  };
  const handleHiddenCancel = () => {
    let roleSave = [ROLES["DANH_MUC"].BAO_CAO_THEM];
    let roleEdit = [ROLES["DANH_MUC"].BAO_CAO_THEM];
    if (roleEdit || roleSave) {
      if (state.editStatus) {
        return !checkRole(roleEdit);
      } else {
        return !checkRole(roleSave);
      }
    } else {
      return false;
    }
  };
  const handleHiddenSave = () => {
    let roleSave = [ROLES["DANH_MUC"].BAO_CAO_THEM];
    let roleEdit = [ROLES["DANH_MUC"].BAO_CAO_THEM];
    if (roleEdit || roleSave) {
      if (state.editStatus) {
        return !checkRole(roleEdit);
      } else {
        return !checkRole(roleSave);
      }
    } else {
      return false;
    }
  };
  refCallbackSave.current = handleAdded;
  //  ---------------------------------------------------------------- Table
  const onClickSort = (key, value) => {
    onSortChange({
      [key]: value,
    });
  };
  const debounceFunc = useCallback(
    debounce(
      (key, value) =>
        onChangeInputSearch({
          [key]: value,
        }),
      1000
    ),
    []
  );
  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    debounceFunc(key, value);
    //   onChangeInputSearch({
    //     [key]: value,
    //   });
  };
  const handleClickedBtnAdded = () => {
    setState({
      editStatus: false,
      mauBaoCao: null,
      defaultFileList: [],
      invalidMauBaoCao: false,
    });
    form.resetFields();
  };
  const setRowClassName = (record) => {
    let idDiff = dataEditDefault?.id;
    return record.id === idDiff ? "row-actived" : "";
  };
  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        onShowAndHandleUpdate(record);
      },
    };
  };
  const onShowAndHandleUpdate = (data = {}) => {
    // updateData({ dataEditDefault: data });
    // setState({
    //     mauBaoCao: data.mauBaoCao,
    //     editStatus: true,
    //     defaultFileList: data?.mauBaoCao
    //         ? [
    //             {
    //                 uid: "1",
    //                 name: getUploadedFileName(data.mauBaoCao),
    //                 url: `${HOST}/api/his/v1/files/${data?.mauBaoCao}`,
    //             },
    //         ]
    //         : [],
    // });
    // form.setFieldsValue(data);
  };
  const handleCollapsePane = () => {
    setCollapseStatus(!collapseStatus);
  };
  const onDeletePhieu = (item) => {
    deleteThietLap(item?.id)
      .then((s) => {
        // setTimeout(() => history.push("/kho/nhap-kho"), 200);
      })
      .catch(() => {});
  };
  const filterOption = (input = "", option) => {
    input = input?.toLowerCase().createUniqueText() || "";
    return (
      option?.children?.toLowerCase().createUniqueText().indexOf(input) >= 0
    );
  };
  const onShowModalConfirmXoaPhieu = (item) => () => {
    refConfirmXoaRow.current &&
      refConfirmXoaRow.current.show(
        {
          title: "C???nh b??o",
          content: `X??a ph??n quy???n ${item?.id}?`,
          cancelText: "????ng",
          okText: "X??a",
          classNameOkText: "button-error",
          showImg: true,
          showBtnOk: true,
          showBtnOk: true,
        },
        () => {
          onDeletePhieu(item);
        },
        () => {}
      );
  };
  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "5px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Quy???n k??"
          sort_key="quyenKyId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["quyenKyId"] || 0}
          search={
            <SelectCustom2
              // data={HIEU_LUC}
              placeholder="Ch???n quy???n k??"
              onChange={(e) => {
                setState({
                  quyenKyId: e,
                });
                // onSearchInput("quyenKyId")(e)
              }}
            >
              {listDataQuyenKy.map((item, index) => {
                return (
                  <Select.Option
                    key={index}
                    value={item?.id + ""}
                  >{`${item?.ten}`}</Select.Option>
                );
              })}
            </SelectCustom2>
          }
        />
      ),
      width: "15px",
      render: (item) => {
        return item?.quyenKy?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Khoa ch??? ?????nh"
          sort_key="khoaChiDinhId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["khoaChiDinhId"] || 0}
          search={
            <SelectCustom2
              // data={HIEU_LUC}
              placeholder="Ch???n khoa ch??? ?????nh"
              onChange={(e) => {
                setState({
                  khoaChiDinhId: e,
                });
                // onSearchInput("khoaChiDinhId")(e)
              }}
            >
              {listKhoa.map((item, index) => {
                return (
                  <Select.Option
                    key={index}
                    value={item?.id + ""}
                  >{`${item?.ten}`}</Select.Option>
                );
              })}
            </SelectCustom2>
          }
        />
      ),
      width: "15px",
      render: (item) => {
        return item?.khoaChiDinh?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Khoa th???c hi???n"
          sort_key="khoaThucHienId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["khoaThucHienId"] || 0}
          search={
            <SelectCustom2
              // data={HIEU_LUC}
              placeholder="T??m khoa th???c hi???n"
              onChange={(e) => {
                setState({
                  khoaThucHienId: e,
                });
                // onSearchInput("khoaThucHienId")(e)
              }}
            >
              {listKhoa.map((item, index) => {
                return (
                  <Select.Option
                    key={index}
                    value={item?.id + ""}
                  >{`${item?.ten}`}</Select.Option>
                );
              })}
            </SelectCustom2>
          }
        />
      ),
      width: "15px",
      render: (item) => {
        return item?.khoaThucHien?.ten;
      },
    },
    // {
    //   title: (
    //     <HeaderSearch
    //       sort_key="active"
    //       onClickSort={onClickSort}
    //       dataSort={dataSortColumn.active || 0}
    //       searchSelect={
    //         <Select
    //           defaultValue=""
    //           data={HIEU_LUC}
    //           placeholder="Ch???n hi???u l???c"
    //           onChange={onSearchInput("active")}
    //         />
    //       }
    //       title="C?? hi???u l???c"
    //     />
    //   ),
    //   width: "100px",
    //   dataIndex: "active",
    //   key: "active",
    //   align: "center",
    //   render: (item) => {
    //     return <Checkbox checked={item} />;
    //   },
    // },
    {
      title: (
        <HeaderSearch
          title=""
          // sort_key="chieuDoc"
          // onClickSort={onClickSort}
          // dataSort={dataSortColumn["chieuDoc"] || 0}
          searchSelect={
            <img
              style={{ cursor: "pointer" }}
              onClick={() => {
                let value = {
                  quyenKyId: state.quyenKyId,
                  khoaThucHienId: state.khoaThucHienId,
                  khoaChiDinhId: state.khoaChiDinhId,
                };
                onChangeInputSearch({
                  ...value,
                });
              }}
              src={require("assets/images/utils/icon-save-blue.png")}
              alt=""
              // onClick={onShowModalConfirmXoaPhieu(item)}
            />
          }
        />
      ),
      render: (item) => {
        return (
          <>
            <img
              style={{
                marginLeft: 10,
                marginBottom: 5,
                cursor: "pointer",
                height: 15,
                width: 15,
                objectFit: "contain",
              }}
              src={require("assets/images/utils/edit.png")}
              alt=""
              onClick={() => {}}
            />
            <img
              style={{
                marginLeft: 10,
                marginBottom: 5,
                cursor: "pointer",
                height: 15,
                width: 15,
                objectFit: "contain",
              }}
              src={require("assets/images/utils/delete-red.png")}
              alt=""
              onClick={onShowModalConfirmXoaPhieu(item)}
            />
          </>
        );
      },
      align: "center",
      width: "7px",
    },
  ];
  console.log(listAccount);
  return (
    // <Col
    //     {...(collapseStatus ? ADD_LAYOUT_COLLAPSE : ADD_LAYOUT)}
    //     className={`mt-3 ${state.changeShowFullTbale ? "" : "transition-ease"}`}
    // >
    <BaoCaoChiTietStyle>
      {/* <CreatedWrapper
                title="Th??ng tin chi ti???t"
                onCancel={handleCancel}
                cancelText="H???y"
                onOk={handleAdded}
                okText="L??u"
                roleSave={[ROLES["DANH_MUC"].BAO_CAO_THEM]}
                roleEdit={[ROLES["DANH_MUC"].BAO_CAO_SUA]}
                editStatus={state.editStatus}
            > */}
      <Wrapper>
        <div className="header-create">
          <div className="create-title">Th??ng tin chi ti???t</div>
        </div>
        <div className="header-body">
          <FormWraper
            disabled={
              state.editStatus
                ? !checkRole([ROLES["DANH_MUC"].BAO_CAO_SUA])
                : !checkRole([ROLES["DANH_MUC"].BAO_CAO_THEM])
            }
            form={form}
            layout="vertical"
            className="form-custom"
          >
            <Form.Item
              label={
                <a
                  style={{ color: "#172b4d" }}
                  href="/quan-tri/danh-muc-tai-khoan"
                  target="_blank"
                >
                  T??n t??i kho???n
                </a>
              }
              name="nhanVienId"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p t??n t??i kho???n!",
                },
                // {
                //     max: 20,
                //     message: "Vui l??ng nh???p m?? b??o c??o kh??ng qu?? 20 k?? t???!",
                // },
                // {
                //     whitespace: true,
                //     message: "Vui l??ng nh???p t??n t??i kho???n!",
                // },
              ]}
            >
              <Select
                autoFocus
                showSearch
                placeholder="Vui l??ng nh???p t??n t??i kho???n"
                filterOption={filterOption}
                onChange={(e) => {
                  let value = form.getFieldValue();
                  let obj = listAccount.find((item) => item?.nhanVien?.id == e);
                  form.setFieldsValue({ ...value, ten: obj?.nhanVien?.ten }); // khi ch???n select , set input h??? v?? t??n l???i
                }}
              >
                {listAccount.map((item, index) => {
                  return (
                    <Select.Option
                      key={index}
                      value={item?.nhanVien?.id}
                    >{`${item?.taiKhoan}`}</Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="H??? v?? t??n nh??n vi??n"
              name="ten"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng nh???p h??? v?? t??n nh??n vi??n!",
                },
                // {
                //     max: 20,
                //     message: "Vui l??ng nh???p m?? b??o c??o kh??ng qu?? 20 k?? t???!",
                // },
                // {
                //     whitespace: true,
                //     message: "Vui l??ng nh???p h??? v?? t??n nh??n vi??n!",
                // },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui l??ng nh???p h??? v?? t??n nh??n vi??n"
                disabled={true}
              />
            </Form.Item>
            <Form.Item
              label={
                <a
                  style={{ color: "#172b4d" }}
                  href="/danh-muc/quyen-ky"
                  target="_blank"
                >
                  Quy???n k??
                </a>
              }
              name="quyenKyId"
              rules={[
                {
                  required: true,
                  message: "Vui l??ng ch???n quy???n k??!",
                },
              ]}
            >
              <Select
                placeholder="Ch???n quy???n k??"
                showSearch
                filterOption={filterOption}
                allowClear
              >
                {listDataQuyenKy.map((item, index) => {
                  return (
                    <Select.Option
                      key={index}
                      value={item?.id}
                    >{`${item?.ten}`}</Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label={
                <a
                  style={{ color: "#172b4d" }}
                  href="/danh-muc/khoa"
                  target="_blank"
                >
                  Khoa ch??? ?????nh
                </a>
              }
              name="khoaChiDinhId"
            >
              <Select
                placeholder="Ch???n khoa ch??? ?????nh"
                showSearch
                allowClear
                filterOption={filterOption}
              >
                {listKhoa.map((item, index) => {
                  return (
                    <Select.Option
                      key={index}
                      value={item?.id}
                    >{`${item?.ten}`}</Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label={
                <a
                  style={{ color: "#172b4d" }}
                  href="/danh-muc/khoa"
                  target="_blank"
                >
                  Khoa th???c hi???n
                </a>
              }
              name="khoaThucHienId"
            >
              <Select
                placeholder="Ch???n khoa th???c hi???n"
                showSearch
                allowClear
                filterOption={filterOption}
              >
                {listKhoa.map((item, index) => {
                  return (
                    <Select.Option
                      key={index}
                      value={item?.id}
                    >{`${item?.ten}`}</Select.Option>
                  );
                })}
              </Select>
            </Form.Item>

            {/* {state.editStatus && (
                            <Form.Item label=" " name="active" valuePropName="checked">
                                <Checkbox>C?? hi???u l???c</Checkbox>
                            </Form.Item>
                        )} */}
          </FormWraper>

          {/* <MainPhanQuyen> */}
          {/* <TableWrapper
                            title="Ph??n quy???n k??"
                            // scroll={{ x: 1000 }}
                            styleMain={{ marginTop: 0 }}
                            classNameRow={"custom-header"}
                            styleContainerButtonHeader={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "flex-end",
                                paddingRight: 50
                            }}
                            columns={columns}
                            dataSource={listData}
                            onRow={onRow}
                            rowClassName={setRowClassName}
                        /> */}
          {/* {totalElements ? (
                                    <Pagination
                                        listData={listData}
                                        styleVersion={2}
                                        onChange={onChangePage}
                                        current={page + 1}
                                        pageSize={size}
                                        total={totalElements}
                                        onShowSizeChange={handleSizeChange}
                                        style={{ flex: 1, justifyContent: "flex-end" }}
                                    />
                                ) : null} */}
          {/* </MainPhanQuyen> */}

          {/* </CreatedWrapper> */}
          <div className="button-bottom-modal">
            <Button
              className="button-cancel"
              onClick={handleCancel}
              hidden={handleHiddenCancel()}
            >
              {"H???y"}
            </Button>
            <Button
              className="button-ok"
              onClick={handleAdded}
              // loading={props.loading}
              hidden={handleHiddenSave()}
            >
              {"L??u [F4]"}
              <img
                style={{ marginLeft: 6 }}
                src={require("assets/images/kho/save.png")}
                alt=""
              ></img>
            </Button>
          </div>
        </div>
      </Wrapper>
      <ModalNotification2 ref={refConfirmXoaRow} />
    </BaoCaoChiTietStyle>
    // </Col>
  );
};

const mapStateToProps = ({
  thietLapQuyenKy: {
    listData,
    totalElements,
    page,
    size,
    dataSearch,
    dataSort,
    currentItem,
    dataSortColumn,
    dataEditDefault,
  },
  // thietLapQuyenKy: {
  //     dataEditDefault
  // },
  utils: { listkhoGiay, listhuongGiay, listDinhDangBaoCao },
  adminTaiKhoanHeThong: { listAccount },
  quyenKy: { listData: listDataQuyenKy },
  khoa: { listKhoa },
}) => {
  return {
    listData,
    totalElements,
    page,
    size,
    currentItem,
    dataSearch: dataSearch || {},
    dataSort,
    dataSortColumn: dataSortColumn || SORT_DEFAULT,
    // dataEditDefaultPhanQuyenThietLapQuyenKy,
    listhuongGiay,
    listkhoGiay,
    listDinhDangBaoCao,
    listAccount,
    listDataQuyenKy,
    listKhoa,
    dataEditDefault,
  };
};
const mapDispatchToProps = ({
  thietLapQuyenKy: {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
    createOrEdit,
    delete: deleteThietLap,
  },
  utils: { getUtils },
  quyenKy: { onSizeChange: onSizeChangeQuyenKy },
  khoa: {
    getListKhoa,
    //  createOrEdit, onDelete, updateData
  },
}) => ({
  onSearch,
  onSizeChange,
  onSortChange,
  onChangeInputSearch,
  getUtils,
  updateData,
  createOrEdit,
  onSizeChangeQuyenKy,
  getListKhoa,
  deleteThietLap,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThongTinChiTietLoaiPhieu);
