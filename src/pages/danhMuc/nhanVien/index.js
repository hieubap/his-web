import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import moment from "moment";
import { Main } from "./styled";
import { combineSort } from "utils";
import { BIRTHDAY_FORMAT } from "constants/index";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import {
  Pagination,
  HeaderSearch,
  CreatedWrapper,
  TableWrapper,
  HomeWrapper,
  Select,
  ListImage,
} from "components";
import {
  PAGE_DEFAULT,
  ADD_LAYOUT,
  TABLE_LAYOUT,
  TABLE_LAYOUT_COLLAPSE,
  ADD_LAYOUT_COLLAPSE,
  HIEU_LUC,
} from "constants/index";
import {
  Checkbox,
  Col,
  Input,
  Modal,
  Form,
  DatePicker,
  Row,
  Upload,
  message,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import ThongTinKhoaPhong from "./ThongTinKhoaPhong";
import ThongTinKho from "./ThongTinKho";
import { openInNewTab } from "utils";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import fileUpload from "data-access/file-provider";
import fileUtils from "utils/file-utils";
import { checkRole } from "app/Sidebar/constant";
import { ROLES } from "constants/index";
import stringUtils from "mainam-react-native-string-utils";

let timer = null;

const NhanVien = (props) => {
  const {
    listNhanVien,
    listgioiTinh,
    listAllChuyenKhoa,
    getListChuyenKhoaTongHop,
    getListHocHamHocViTongHop,
    listHocHamHocVi,
    getListAllChucVu,
    listAllChucVu,
    listVanBang,
    searchVanBangTongHop,
    listAllKhoa,
    getListAllKhoa,
    listAllPhong,
    getListAllPhong,
    listAllToaNha,
    getListToaNha,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    updateData,
    getListNhanVien,
    createOrEdit,
    listAllKho,
    getAllKhoTongHop,
  } = props;
  const [editStatus, setEditStatus] = useState(false);
  const [dataSortColumn, setDataSortColumn] = useState({ active: 2, id: 2 });
  const [data, setData] = useState([]);
  const [logo, setLogo] = useState();
  const [anhKy, setAnhKy] = useState();
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [dsKhoaPhong, setDsKhoaPhong] = useState([]);
  const [dsKho, setDsKho] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [state, _setState] = useState({
    showFullTable: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const [form] = Form.useForm();
  const refAutoFocus = useRef();
  const refLayerHotKey = useRef(stringUtils.guid());
  const { onAddLayer, onRemoveLayer } = useDispatch().phimTat;

  // register layerId
  useEffect(() => {
    onAddLayer({ layerId: refLayerHotKey.current });
    return () => {
      onRemoveLayer({ layerId: refLayerHotKey.current });
    };
  }, []);

  useEffect(() => {
    const sort = combineSort(dataSortColumn);
    const params = { page, size, sort };
    getListNhanVien(params);
    getListChuyenKhoaTongHop({});
    getListHocHamHocViTongHop({});
    getListAllChucVu();
    searchVanBangTongHop({});
    getListAllKhoa({});
    getListAllPhong({});
    getListToaNha({});
    getAllKhoTongHop({});
    props.getUtils({ name: "gioiTinh" });
  }, []);

  useEffect(() => {
    const data = listNhanVien.map((item, index) => {
      return { ...item, action: item, stt: page * size + index + 1 };
    });
    setData(data);
  }, [listNhanVien, page, size]);

  const onClickSort = (key, value) => {
    const sort = { [key]: value, ...dataSortColumn, [key]: value };
    setDataSortColumn(sort);
    const res = combineSort(sort);
    getListNhanVien({
      page: PAGE_DEFAULT,
      size,
      sort: res,
      ...dataSearch,
    });
  };

  const handleCollapsePane = () => {
    setCollapseStatus(!collapseStatus);
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 48,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã NV"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input
              placeholder="Tìm kiếm"
              onChange={(e) => {
                onSearchInput(e.target.value, "ma");
              }}
            />
          }
        />
      ),
      width: 108,
      dataIndex: "ma",
      key: "ma",
      render: (item) => {
        return item && <span>{item}</span>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Họ tên"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="Tìm kiếm"
              onChange={(e) => {
                onSearchInput(e.target.value, "ten");
              }}
            />
          }
        />
      ),
      width: 191,
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          title="Bằng chuyên môn"
          sort_key="vanBangId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.vanBangId || 0}
          searchSelect={
            <Select
              placeholder="Tìm kiếm"
              data={listVanBang}
              onChange={(value) => {
                onSearchInput(value, "vanBangId");
              }}
            />
          }
        />
      ),
      width: 174,
      dataIndex: "vanBang",
      key: "vanBang",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Khoa"
          searchSelect={
            <Select
              placeholder="Tìm kiếm"
              data={listAllKhoa}
              onChange={(value) => {
                onSearchInput(value, "khoaId");
              }}
            />
          }
        />
      ),
      width: 140,
      dataIndex: "dsKhoa",
      key: "dsKhoa",
      render: (item) => {
        return item && item.length > 0 && item.map((e) => e.khoa.ten).join(",");
      },
    },
    {
      title: (
        <HeaderSearch
          title="Học hàm học vị"
          sort_key="hocHamHocViId"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.hocHamHocViId || 0}
          searchSelect={
            <Select
              placeholder="Tìm kiếm"
              data={listHocHamHocVi}
              onChange={(value) => {
                onSearchInput(value, "hocHamHocViId");
              }}
            />
          }
        />
      ),
      width: 140,
      dataIndex: "hocHamHocVi",
      key: "hocHamHocVi",
      render: (item) => {
        return item?.ten;
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
      width: 108,
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
      getListNhanVien({
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
    getListNhanVien({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortColumn),
    });
  };

  const onSizeChange = (size) => {
    const params = { page, size };
    updateData(params);
    getListNhanVien({
      ...params,
      ...dataSearch,
      sort: combineSort(dataSortColumn),
    });
  };

  const getDsKhoa = () => {
    let dsKhoa = [];
    if (!editStatus && dsKhoaPhong.length === 0) {
      return dsKhoa;
    }
    let thongTinKhoaPhong =
      dsKhoaPhong.length === 0 ? dataEditDefault.dsKhoa : dsKhoaPhong;
    dsKhoa = thongTinKhoaPhong.map((e) => {
      let obj = {};
      obj.khoaId = e.khoa.id;
      obj.khoaQuanLy = e.khoaQuanLy;
      if (e.dsPhong) {
        obj.dsPhongId = e.dsPhong.map((i) => i.id);
      }
      if (e.dsToaNha) {
        obj.dsToaNhaId = e.dsToaNha.map((i) => i.id);
      }
      return obj;
    });
    return dsKhoa;
  };

  const handleAdded = (e) => {
    if (e?.preventDefault) e.preventDefault();
    form
      .validateFields()
      .then(async (values) => {
        let dsKhoa = getDsKhoa();
        values = { ...values, dsKhoa, dsKho };
        if (editStatus) {
          values = { ...values, id: dataEditDefault.id, dsKhoa };
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
          getListNhanVien(params);
        });
      })
      .catch((error) => {});
  };

  const onShowAndHandleUpdate = (data = {}) => {
    setEditStatus(true);
    data.ngaySinh = data.ngaySinh && moment(data.ngaySinh);
    updateData({ dataEditDefault: data });
    setLogo(data.anhDaiDien);
    setAnhKy(data.anhKy);
    form.setFieldsValue(data);
  };

  const onRow = (record) => {
    return {
      onClick: () => {
        onShowAndHandleUpdate(record.action);
      },
    };
  };

  const handleClickedBtnAdded = () => {
    setEditStatus(false);
    form.resetFields();
    updateData({ dataEditDefault: {} });
    setLogo(null);
    setAnhKy(null);

    if (refAutoFocus.current) {
      setTimeout(() => {
        refAutoFocus.current.focus();
      }, 50);
    }
  };

  const handleCancel = () => {
    if (editStatus) {
      dataEditDefault.ngaySinh =
        dataEditDefault.ngaySinh && moment(dataEditDefault.ngaySinh);
      form.setFieldsValue(dataEditDefault);
    } else {
      form.resetFields();
    }
    setIsRefresh(!isRefresh);
  };

  const onUpdateData = (item, type) => {
    if (type === "anhKy") {
      setAnhKy(item);
    } else {
      setLogo(item);
    }
    form.setFieldsValue({ [type]: item });
  };

  const addInfo = (data) => {
    dataEditDefault.dsKhoa = data;
    updateData(dataEditDefault);
    setDsKhoaPhong(data);
  };

  const addInfoKho = (data) => {
    dataEditDefault.dsKho = data;
    updateData(dataEditDefault);
    setDsKho(data);
  };

  const setRowClassName = (record) => {
    let idDiff = dataEditDefault?.id;
    return record.id === idDiff ? "row-actived" : "";
  };
  // useEffect(() => {
  //   if (refAutoFocus.current) {
  //     refAutoFocus.current.focus();
  //   }
  // }, [dataEditDefault]);
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
      <HomeWrapper title="Quản trị">
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
            title="Danh mục nhân viên"
            scroll={{ x: 1000 }}
            classNameRow={"custom-header"}
            styleMain={{ marginTop: 0 }}
            styleContainerButtonHeader={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingRight: 45,
            }}
            buttonHeader={
              checkRole([ROLES["QUAN_LY_TAI_KHOAN"].NHAN_VIEN_THEM])
                ? [
                    {
                      type: "create",
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
            layerId={refLayerHotKey.current}
            dataEditDefault={dataEditDefault}
            // rowClassName={setRowClassName}
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
              okText="Lưu [F4]"
              roleSave={[ROLES["QUAN_LY_TAI_KHOAN"].NHAN_VIEN_THEM]}
              roleEdit={[ROLES["QUAN_LY_TAI_KHOAN"].NHAN_VIEN_SUA]}
              editStatus={editStatus}
              layerId={refLayerHotKey.current}
            >
              <fieldset
                disabled={
                  editStatus
                    ? !checkRole([ROLES["QUAN_LY_TAI_KHOAN"].NHAN_VIEN_SUA])
                    : !checkRole([ROLES["QUAN_LY_TAI_KHOAN"].NHAN_VIEN_THEM])
                }
              >
                <Form
                  form={form}
                  layout="vertical"
                  style={{ width: "100%" }}
                  className="form-custom"
                >
                  <div style={{ width: "30%" }}>
                    <Form.Item
                      label="Họ tên"
                      name="ten"
                      style={{ width: "100%" }}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập họ tên",
                        },
                        {
                          max: 255,
                          message: "Vui lòng nhập họ tên không quá 255 ký tự!",
                        },
                      ]}
                    >
                      <Input
                        ref={refAutoFocus}
                        className="input-option"
                        placeholder="Vui lòng nhập họ tên"
                        maxLength={255}
                      />
                    </Form.Item>
                    <Form.Item
                      className="item-date"
                      label="Ngày sinh"
                      name="ngaySinh"
                      style={{ width: "100%" }}
                    >
                      <DatePicker
                        format={BIRTHDAY_FORMAT}
                        placeholder="Ngày sinh"
                      />
                    </Form.Item>

                    <Form.Item
                      label="Giới tính"
                      name="gioiTinh"
                      style={{ width: "100%" }}
                    >
                      <Select
                        className="input-option"
                        placeholder="Chọn giới tính"
                        data={listgioiTinh}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Email"
                      name="email"
                      style={{ width: "100%" }}
                    >
                      <Input className="input-option" placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                      label="Số điện thoại"
                      name="soDienThoai"
                      style={{ width: "100%" }}
                    >
                      <Input
                        className="input-option"
                        placeholder="Số điện thoại"
                      />
                    </Form.Item>
                    <Form.Item
                      label="CMND/HC"
                      name="soCanCuoc"
                      style={{ width: "100%" }}
                    >
                      <Input className="input-option" placeholder="CMND/HC" />
                    </Form.Item>
                    <Form.Item
                      label="MST/ Tên tài khoản ký"
                      name="taiKhoanKy"
                      style={{ width: "100%" }}
                    >
                      <Input
                        className="input-option"
                        placeholder="MST/ Tên tài khoản ký"
                      />
                    </Form.Item>
                  </div>

                  <div style={{ width: "30%" }}>
                    <Form.Item
                      label="Mã nhân viên"
                      name="ma"
                      style={{ width: "100%" }}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập mã nhân viên",
                        },
                      ]}
                    >
                      <Input
                        className="input-option"
                        placeholder="Mã nhân viên"
                      />
                    </Form.Item>
                    <Form.Item
                      label={
                        <div
                          className="pointer"
                          onClick={() =>
                            openInNewTab("/danh-muc/van-bang-chuyen-mon")
                          }
                        >
                          Bằng chuyên môn
                        </div>
                      }
                      name="vanBangId"
                      style={{ width: "100%" }}
                    >
                      <Select
                        placeholder="Bằng chuyên môn"
                        data={listVanBang}
                      />
                    </Form.Item>

                    <Form.Item
                      label={
                        <div
                          className="pointer"
                          onClick={() => openInNewTab("/danh-muc/chuyen-khoa")}
                        >
                          Chuyên khoa
                        </div>
                      }
                      name="chuyenKhoaId"
                      style={{ width: "100%" }}
                    >
                      <Select
                        data={listAllChuyenKhoa}
                        placeholder="Chuyên khoa"
                      />
                    </Form.Item>

                    <Form.Item
                      label={
                        <div
                          className="pointer"
                          onClick={() =>
                            openInNewTab("/danh-muc/hoc-ham-hoc-vi")
                          }
                        >
                          Học hàm học vị
                        </div>
                      }
                      name="hocHamHocViId"
                      style={{ width: "100%" }}
                    >
                      <Select
                        data={listHocHamHocVi}
                        placeholder="Học hàm học vị"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Chứng chỉ"
                      name="chungChi"
                      style={{ width: "100%" }}
                    >
                      <Input className="input-option" placeholder="Chứng chỉ" />
                    </Form.Item>
                    <Form.Item
                      label={
                        <div
                          className="pointer"
                          onClick={() => openInNewTab("/danh-muc/chuc-vu")}
                        >
                          Chức vụ
                        </div>
                      }
                      name="chucVuId"
                      style={{ width: "100%" }}
                    >
                      <Select data={listAllChucVu} placeholder="Chức vụ" />
                    </Form.Item>
                    <Form.Item
                      label="Chứng thư số/ MK ký"
                      name="matKhauKy"
                      style={{ width: "100%" }}
                    >
                      <Input.Password
                        autoComplete="new-password"
                        className="input-option"
                        placeholder="Chứng thư số/ Mật khẩu ký"
                      />
                    </Form.Item>
                  </div>
                  <div>
                    <div className="group-image">
                      <Form.Item
                        label="Ảnh đại diện"
                        name="anhDaiDien"
                        // style={{ width: "100%" }}
                      >
                        <ListImage
                          uploadImage={(e) => onUpdateData(e, "anhDaiDien")}
                          files={logo}
                          provider="nhanVien"
                          showUploadList={false}
                        />
                      </Form.Item>
                      <Form.Item
                        label="Ảnh chữ ký"
                        name="anhKy"
                        // style={{ width: "100%" }}
                      >
                        <ListImage
                          uploadImage={(e) => onUpdateData(e, "anhKy")}
                          files={anhKy}
                          provider="nhanVien"
                          showUploadList={false}
                        />
                      </Form.Item>
                    </div>
                    <Form.Item
                      label="Danh hiệu"
                      name="danhHieu"
                      style={{ width: "100%" }}
                    >
                      <Input className="input-option" placeholder="Danh hiệu" />
                    </Form.Item>
                    <Form.Item
                      label="Chi chú"
                      name="ghiChu"
                      style={{ width: "100%" }}
                    >
                      <TextArea
                        style={{ minHeight: 100 }}
                        className="input-option"
                        placeholder="Ghi chú"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Mật khẩu HĐĐT"
                      name="matKhauHddt"
                      style={{ width: "100%" }}
                    >
                      <Input.Password
                        autoComplete="new-password"
                        className="input-option"
                        placeholder="Mật khẩu HĐĐT"
                      />
                    </Form.Item>
                    <Form.Item
                      name="active"
                      valuePropName="checked"
                      style={{ width: "100%", marginTop: 38 }}
                    >
                      <Checkbox>Có hiệu lực</Checkbox>
                    </Form.Item>
                  </div>
                </Form>
                <ThongTinKhoaPhong
                  khoa={listAllKhoa}
                  toaNha={listAllToaNha}
                  phong={listAllPhong}
                  dataSource={dataEditDefault.dsKhoa || []}
                  addInfo={addInfo}
                  isRefresh={isRefresh}
                ></ThongTinKhoaPhong>
                {/* <ThongTinKho
                style={{ paddingTop: "15px" }}
                kho={listAllKho}
                dataSource={dataEditDefault.dsKho || []}
                addInfoKho={addInfoKho}
                isRefresh={isRefresh}
              ></ThongTinKho> */}
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
    nhanVien: {
      listNhanVien,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
    },
    chuyenKhoa: { listAllChuyenKhoa },
    hocHamHocVi: { listHocHamHocVi },
    chucVu: { listAllChucVu },
    vanBang: { listVanBang },
    utils: { listgioiTinh },
    khoa: { listAllKhoa },
    phong: { listAllPhong },
    toaNha: { listAllToaNha },
    kho: { listAllKho },
  } = state;

  return {
    listNhanVien,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    listgioiTinh,
    listAllChuyenKhoa,
    listHocHamHocVi,
    listAllChucVu,
    listVanBang,
    listAllKhoa,
    listAllPhong,
    listAllToaNha,
    listAllKho,
  };
};
const mapDispatchToProps = ({
  nhanVien: { getListNhanVien, createOrEdit, onDelete, updateData },
  chuyenKhoa: { getListChuyenKhoaTongHop },
  hocHamHocVi: { getListHocHamHocViTongHop },
  chucVu: { getListAllChucVu },
  utils: { getUtils },
  vanBang: { searchVanBangTongHop },
  khoa: { getListAllKhoa },
  phong: { getListAllPhong },
  toaNha: { getListToaNha },
  kho: { getAllTongHop: getAllKhoTongHop },
}) => ({
  getListNhanVien,
  createOrEdit,
  onDelete,
  updateData,
  getListChuyenKhoaTongHop,
  getListHocHamHocViTongHop,
  getListAllChucVu,
  getUtils,
  searchVanBangTongHop,
  getListAllKhoa,
  getListAllPhong,
  getListToaNha,
  getAllKhoTongHop,
});

export default connect(mapStateToProps, mapDispatchToProps)(NhanVien);
