import React, { useState, useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";
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
import { INNHANH_KYSO } from "constants/index";
import MultiLevelTab from "components/MultiLevelTab";
import ThongTinThietLapQuyenKy from "./ThongTinThietLapQuyenKy";
import IcCreate from "assets/images/kho/IcCreate.png";
import { ModalNotification2 } from "components/ModalConfirm";
import { debounce } from "lodash";
import Breadcrumb from "components/Breadcrumb";
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
    form.setFieldsValue(data);
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
          title: "Cảnh báo",
          content: `Xóa tài khoản ${item?.nhanVien?.ma}?`,
          cancelText: "Đóng",
          okText: "Xóa",
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
          title="Tên tài khoản"
          sort_key="nhanVien.taiKhoan"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["nhanVien.taiKhoan"] || 0}
          search={
            <Input
              placeholder="Tìm tên tài khoản"
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
          title="Họ tên nhân viên"
          sort_key="nhanVien.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["nhanVien.ten"] || 0}
          search={
            <Input
              placeholder="Tìm họ tên nhân viên"
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
          title="Quyền ký"
          sort_key="quyenKy.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["quyenKy.ten"] || 0}
          search={
            <Input
              placeholder="Tìm khoa chỉ định"
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
          title="Khoa chỉ định"
          sort_key="khoaChiDinh.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["khoaChiDinh.ten"] || 0}
          search={
            <Input
              placeholder="Tìm khoa chỉ định"
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
          title="Khoa thực hiện"
          sort_key="khoaThucHien.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["khoaThucHien.ten"] || 0}
          search={
            <Input
              placeholder="Tìm khoa thực hiện"
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
    //           placeholder="Chọn hiệu lực"
    //           onChange={onSearchInput("active")}
    //         />
    //       }
    //       title="Có hiệu lực"
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
          title="Xóa"
          // sort_key="chieuDoc"
          // onClickSort={onClickSort}
          // dataSort={dataSortColumn["chieuDoc"] || 0}
          // search={
          //   <Input
          //     placeholder="Tìm theo kích thước chiều dọc"
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
  //     title: "Thông tin dịch vụ",
  //     key: 1,
  //     render: () => {
  //       return <BaoCaoChiTiet stateParent={state} setStateParent={setState}/>;
  //     },
  //   },
  //   {
  //     key: 6,
  //     title: "THIẾT LẬP CHÂN KÝ",
  //     render: () => {
  //       return <ThietLapChanKy/>;
  //     },
  //   },
  // ];
  return (
    <Main>
      <Breadcrumb
        chains={[
          { title: "Ký số", link: "/ky-so" },
          { title: "Thiết lập quyền ký", link: "/ky-so/thiet-lap-quyen-ky" },
        ]}
      >
        <Col
          {...(collapseStatus ? TABLE_LAYOUT_COLLAPSE : { xl: 16, xxl: 16 })}
          className={`pr-3 ${
            state.changeShowFullTbale ? "" : "transition-ease"
          }`}
        >
          <TableWrapper
            title="Thiết lập quyền ký"
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
                  title: "Thêm mới",
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
            rowClassName={setRowClassName}
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
