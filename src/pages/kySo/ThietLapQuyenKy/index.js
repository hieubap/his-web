import React, { useState, useEffect, useRef, useCallback } from "react";
import { connect, useDispatch } from "react-redux";
import { Checkbox, Col, Input, Form, InputNumber, Upload } from "antd";
import { HOST } from "client/request";
import HomeWrapper from "components/HomeWrapper";
import TableWrapper from "components/TableWrapper";
import CreatedWrapper from "components/CreatedWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import Select from "components/Select";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  HIEU_LUC,
  TABLE_LAYOUT,
  ADD_LAYOUT,
  ROLES,
} from "constants/index";
import baoCaoProvider from "data-access/categories/dm-bao-cao-provider";
import { Main, MainChiTiet } from "./styled";
import uploadImg from "assets/images/his-core/import.png";
import { SORT_DEFAULT, DS_DINH_DANG } from "./configs";
import { checkRole } from "app/Sidebar/constant";
import FormWraper from "components/FormWraper";
import { IN_NHANH_KYSO } from "constants/index";
import MultiLevelTab from "components/MultiLevelTab";
import ThongTinThietLapQuyenKy from "./ThongTinThietLapQuyenKy";
import IcCreate from "assets/images/kho/IcCreate.png";
import { ModalNotification2 } from "components/ModalConfirm";
import { debounce } from "lodash";
import Breadcrumb from "components/Breadcrumb";
import stringUtils from "mainam-react-native-string-utils";

const getUploadedFileName = (url = "") => {
  const indexSlash = url?.lastIndexOf("/");
  let updatedName = url?.slice(indexSlash + 1);

  return `${updatedName}`;
};

const ThietLapQuyenKy = ({
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
  listAllNhanVien,
  getListAllNhanVien,
  onSizeChangeAdminTaiKhoanHeThong,
  onSizeChangeQuyenKy,
  listAccount,
  deleteThietLap,
}) => {
  const refConfirmXoaRow = useRef(null);
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [form] = Form.useForm();

  const [state, _setState] = useState({
    mauBaoCao: null,
    editStatus: false,
    defaultFileList: [],
    isSelected: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const refLayerHotKey = useRef(stringUtils.guid());
  const refClickBtnSave = useRef();
  const refAutoFocus = useRef(null);
  const { onAddLayer, onRemoveLayer, onRegisterHotkey } = useDispatch().phimTat;

  // register layerId
  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    onRegisterHotkey({
      layerId: refLayerHotKey.current,
      hotKeys: [
        {
          keyCode: 115, //F4
          onEvent: (e) => {
            refClickBtnSave.current && refClickBtnSave.current(e);
          },
        },
      ],
    });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  useEffect(() => {
    onSizeChange({ size: 10 });
    onSizeChangeQuyenKy({ size: 9999 });
    // getUtils({ name: "huongGiay" });
    // getUtils({ name: "khoGiay" });
    // getUtils({ name: "DinhDangBaoCao" });
    getListAllNhanVien({ active: true });
    onSizeChangeAdminTaiKhoanHeThong(9999);
  }, []);

  const handleClickedBtnAdded = () => {
    setState({
      editStatus: false,
      mauBaoCao: null,
      defaultFileList: [],
      invalidMauBaoCao: false,
      isSelected: true,
    });
    updateData({ dataEditDefault: {} });
    form.resetFields();
  };

  const onShowAndHandleUpdate = (data = {}) => {
    updateData({ dataEditDefault: data });
    setState({
      mauBaoCao: data.mauBaoCao,
      editStatus: true,
      isSelected: true,
      defaultFileList: data?.mauBaoCao
        ? [
            {
              uid: "1",
              name: getUploadedFileName(data.mauBaoCao),
              url: `${HOST}/api/his/v1/files/${data?.mauBaoCao}`,
            },
          ]
        : [],
    });
    // form.setFieldsValue(data);
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
  const debounceFunc = useCallback(
    debounce(
      (key, value) =>
        onChangeInputSearch({
          [key]: value,
        }),
      500
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
  };

  const onChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const handleCancel = () => {
    if (state.editStatus) {
      form.setFieldsValue(dataEditDefault);
    } else {
      form.resetFields();
    }
  };

  const handleAdded = (e) => {
    e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        if (!state.mauBaoCao) {
          setState({
            invalidMauBaoCao: true,
          });
          return;
        }
        let formattedData = {
          ...values,
          ma: values?.ma?.trim(),
          ten: values?.ten?.trim(),
          chieuDoc: values.chieuDoc || null,
          chieuNgang: values.chieuNgang || null,
          mauBaoCao: state.mauBaoCao,
          dinhDang: values.dinhDang || null,
        };
        if (state.editStatus) {
          formattedData = { ...formattedData, id: dataEditDefault.id };
        }

        createOrEdit(formattedData).then(() => {
          if (!state.editStatus) {
            form.resetFields();
          }
          setState({
            mauBaoCao: null,
            defaultFileList: [],
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

  const onDeletePhieu = (item) => {
    deleteThietLap(item?.id)
      .then((s) => {
        // setTimeout(() => history.push("/kho/nhap-kho"), 200);
      })
      .catch(() => {});
  };
  const onShowModalConfirmXoaPhieu = (item) => () => {
    refConfirmXoaRow.current &&
      refConfirmXoaRow.current.show(
        {
          title: "C???nh b??o",
          content: `X??a t??i kho???n ${item?.nhanVien?.ma}?`,
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
      width: "70px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="T??n t??i kho???n"
          sort_key="nhanVien.taiKhoan"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["nhanVien.taiKhoan"] || 0}
          search={
            <Input
              placeholder="T??m t??n t??i kho???n"
              onChange={onSearchInput("nhanVien.taiKhoan")}
            />
          }
        />
      ),
      render: (item) => {
        return item?.nhanVien?.taiKhoan;
      },
      width: "120px",
    },
    {
      title: (
        <HeaderSearch
          title="H??? t??n nh??n vi??n"
          sort_key="nhanVien.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["nhanVien.ten"] || 0}
          search={
            <Input
              placeholder="T??m h??? t??n nh??n vi??n"
              onChange={onSearchInput("nhanVien.ten")}
            />
          }
        />
      ),
      width: "120px",
      render: (item) => {
        return item?.nhanVien?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Quy???n k??"
          sort_key="quyenKy.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["quyenKy.ten"] || 0}
          search={
            <Input
              placeholder="T??m khoa ch??? ?????nh"
              onChange={onSearchInput("quyenKy.ten")}
            />
          }
        />
      ),
      width: "120px",
      render: (item) => {
        return item?.quyenKy?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Khoa ch??? ?????nh"
          sort_key="khoaChiDinh.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["khoaChiDinh.ten"] || 0}
          search={
            <Input
              placeholder="T??m khoa ch??? ?????nh"
              onChange={onSearchInput("khoaChiDinh.ten")}
            />
          }
        />
      ),
      width: "120px",
      render: (item) => {
        return item?.khoaChiDinh?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Khoa th???c hi???n"
          sort_key="khoaThucHien.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["khoaThucHien.ten"] || 0}
          search={
            <Input
              placeholder="T??m khoa th???c hi???n"
              onChange={onSearchInput("khoaThucHien.ten")}
            />
          }
        />
      ),
      width: "120px",
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
          title="X??a"
          // sort_key="chieuDoc"
          // onClickSort={onClickSort}
          // dataSort={dataSortColumn["chieuDoc"] || 0}
          // search={
          //   <Input
          //     placeholder="T??m theo k??ch th?????c chi???u d???c"
          //     onChange={onSearchInput("chieuDoc")}
          //   />
          // }
        />
      ),
      render: (item) => {
        return (
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
        );
      },
      align: "center",
      width: "50px",
    },
  ];

  const handleSizeChange = (size) => {
    onSizeChange({ size });
  };

  const onChangeKhoGiay = (val) => {
    setState({
      isRequiredKichThuoc: val === 200,
    });
    form.validateFields();
  };
  const setRowClassName = (record) => {
    let idDiff = dataEditDefault?.id;
    return record.id === idDiff ? "row-actived" : "";
  };
  // const listPanel = [
  //   {
  //     title: "Th??ng tin d???ch v???",
  //     key: 1,
  //     render: () => {
  //       return <BaoCaoChiTiet stateParent={state} setStateParent={setState}/>;
  //     },
  //   },
  //   {
  //     key: 6,
  //     title: "THI???T L???P CH??N K??",
  //     render: () => {
  //       return <ThietLapChanKy/>;
  //     },
  //   },
  // ];
  return (
    <Main>
      <Breadcrumb
        chains={[
          { title: "K?? s???", link: "/ky-so" },
          { title: "Thi???t l???p quy???n k??", link: "/ky-so/thiet-lap-quyen-ky" },
        ]}
      >
        <Col
          {...(collapseStatus ? TABLE_LAYOUT_COLLAPSE : { xl: 16, xxl: 16 })}
          className={`pr-3 ${
            state.changeShowFullTbale ? "" : "transition-ease"
          }`}
        >
          <TableWrapper
            title="Thi???t l???p quy???n k??"
            scroll={{ x: 1000 }}
            styleMain={{ marginTop: 0 }}
            classNameRow={"custom-header"}
            rowKey={(record) => {
              return record.id;
            }}
            styleContainerButtonHeader={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              paddingRight: 50,
            }}
            buttonHeader={
              checkRole([ROLES["DANH_MUC"].BAO_CAO_THEM]) && [
                {
                  type: "create",
                  title: "Th??m m???i [F1]",
                  onClick: handleClickedBtnAdded,
                  buttonHeaderIcon: (
                    <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
                  ),
                },
                {
                  className: "btn-collapse",
                  title: (
                    <img
                      src={require(`assets/images/utils/double-arrow-${
                        collapseStatus ? "right" : "left"
                      }.png`)}
                      alt="btn-collapse"
                    />
                  ),
                  onClick: handleCollapsePane,
                },
              ]
            }
            columns={columns}
            dataSource={listData}
            onRow={onRow}
            layerId={refLayerHotKey.current}
            dataEditDefault={dataEditDefault}
            // rowClassName={setRowClassName}
          />
          {totalElements ? (
            <Pagination
              listData={listData}
              onChange={onChangePage}
              current={page + 1}
              pageSize={size}
              total={totalElements}
              onShowSizeChange={handleSizeChange}
              style={{ flex: 1, justifyContent: "flex-end" }}
            />
          ) : null}
        </Col>
        <Col
          {...(collapseStatus ? ADD_LAYOUT_COLLAPSE : { xl: 8, xxl: 8 })}
          className={`mt-3 ${
            state.changeShowFullTbale ? "" : "transition-ease"
          }`}
          style={
            state.isSelected
              ? { border: "2px solid #c1d8fd", borderRadius: 20 }
              : {}
          }
        >
          <MainChiTiet>
            <ThongTinThietLapQuyenKy
              stateParent={state}
              setStateParent={setState}
              refCallbackSave={refClickBtnSave}
            ></ThongTinThietLapQuyenKy>
          </MainChiTiet>
          {/* <MultiLevelTab
            defaultActiveKey={1}
            listPanel={listPanel}
            isBoxTabs={true}
          ></MultiLevelTab> */}
        </Col>
      </Breadcrumb>
      <ModalNotification2 ref={refConfirmXoaRow} />
    </Main>
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
  utils: { listkhoGiay, listhuongGiay, listDinhDangBaoCao },
  nhanVien: { listAllNhanVien },
  adminTaiKhoanHeThong: { listAccount },
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
    dataEditDefault,
    listhuongGiay,
    listkhoGiay,
    listDinhDangBaoCao,
    listAllNhanVien,
    listAccount,
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
  nhanVien: { getListAllNhanVien },
  adminTaiKhoanHeThong: { onSizeChange: onSizeChangeAdminTaiKhoanHeThong },
  quyenKy: { onSizeChange: onSizeChangeQuyenKy },
}) => ({
  onSearch,
  onSizeChange,
  onSortChange,
  onChangeInputSearch,
  getUtils,
  updateData,
  createOrEdit,
  deleteThietLap,
  getListAllNhanVien,
  onSizeChangeAdminTaiKhoanHeThong,
  onSizeChangeQuyenKy,
});
export default connect(mapStateToProps, mapDispatchToProps)(ThietLapQuyenKy);
