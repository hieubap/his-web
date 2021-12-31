import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Checkbox, Form, Input, Upload } from "antd";
import Select from "components/Select";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { HIEU_LUC, ROLES } from "constants/index";
import { SORT_DEFAULT } from "constants/page/therapyConstant";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { combineSort, openInNewTab } from "utils";
import fileUtils from "utils/file-utils";
import { Main } from "./styled";
import BaseDm from "components/BaseDm";

const { TextArea } = Input;
let timer = null;

const BenhVien = ({
  listBenhVien,
  listAllTinh,
  listtuyenBenhVien,
  listhangBenhVien,
  totalElements,
  page,
  size,
  dataEditDefault,
  dataSearch,
  updateData,
  getListBenhVien,
  getListAllTinh,
  getUtils,
  createOrEdit,
}) => {
  const [imageUploaded, setImageUploaded] = useState({
    loading: false,
    imageUrl: "",
  });
  useEffect(() => {
    const sort = combineSort(SORT_DEFAULT);
    const params = { page, size, sort };
    getListBenhVien(params);
    getListAllTinh();
    getUtils({ name: "tuyenBenhVien" });
    getUtils({ name: "hangBenhVien" });
  }, []);

  const getColumns = ({ onClickSort, dataSortColumn, onSearchInput }) => [
    {
      title: <HeaderSearch title="STT" />,
      width: 80,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: <HeaderSearch title="Logo" />,
      width: 120,
      dataIndex: "logo",
      key: "logo",
      render: (item) => {
        return (
          <div>
            <img src={item ? fileUtils.absoluteFileUrl(item) : ""} />
          </div>
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Mã bệnh viện"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input
              placeholder="Tìm mã bệnh viện"
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
          title="Tên bệnh viện"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="Tìm tên bệnh viện"
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
          title="Tuyến bệnh viện"
          sort_key="tuyenBenhVien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tuyenBenhVien || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "Tất cả" }, ...listtuyenBenhVien]}
              defaultValue=""
              placeholder="Chọn tuyến bệnh viện"
              onChange={(value) => {
                onSearchInput(value, "tuyenBenhVien");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "tuyenBenhVien",
      key: "tuyenBenhVien",
      render: (tuyenBenhVien) => {
        return listtuyenBenhVien.find((tuyen) => tuyen.id === tuyenBenhVien)
          ?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Hạng bệnh viện"
          sort_key="hangBenhVien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.hangBenhVien || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "Tất cả" }, ...listhangBenhVien]}
              defaultValue=""
              placeholder="Chọn hạng bệnh viện"
              onChange={(value) => {
                onSearchInput(value, "hangBenhVien");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "hangBenhVien",
      key: "hangBenhVien",
      render: (hangBenhVien) => {
        return listhangBenhVien.find((hang) => hang.id === hangBenhVien)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tỉnh/TP"
          sort_key="tinhThanhPho.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tinhThanhPho.ten"] || 0}
          searchSelect={
            <Select
              data={[{ id: "", ten: "Tất cả" }, ...listAllTinh]}
              defaultValue=""
              placeholder="Tìm tỉnh thành phố"
              onChange={(value) => {
                onSearchInput(value, "tinhThanhPhoId");
              }}
            />
          }
        />
      ),
      width: 130,
      dataIndex: "tinhThanhPho",
      key: "tinhThanhPho",
      render: (item) => {
        return item && <span>{item.ten}</span>;
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
      width: 150,
      dataIndex: "diaChi",
      key: "diaChi",
      render: (item) => {
        return <span>{item}</span>;
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
      width: 160,
      dataIndex: "ghiChu",
      key: "ghiChu",
      render: (item) => {
        return <span>{item}</span>;
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
              placeholder="Chọn hiệu lực"
              defaultValue=""
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

  const handleUploadLogo = () => {
    return;
  };
  const handleChangeLogo = (data) => {
    const fileUpload = data.file.originFileObj;
    const urlPreview = URL.createObjectURL(fileUpload);
    setImageUploaded({ ...imageUploaded, imageUrl: urlPreview });
  };
  const uploadButton = (
    <div>
      {imageUploaded.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const renderForm = ({ form, editStatus }) => {
    return (
      <>
        <Form.Item
          label="Mã bệnh viện"
          name="ma"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mã bệnh viện!",
            },
            {
              max: 20,
              message: "Vui lòng nhập mã bệnh viện không quá 20 ký tự!",
            },
            {
              whitespace: true,
              message: "Vui lòng nhập mã bệnh viện!",
            },
          ]}
        >
          <Input
            className="input-option"
            placeholder="Nhập mã bệnh viện"
            autoFocus
          />
        </Form.Item>
        <Form.Item label="Logo" name="logo">
          <Upload
            name="logo"
            showUploadList={false}
            listType="picture-card"
            multiple={false}
            maxCount={1}
            customRequest={handleUploadLogo}
            onChange={handleChangeLogo}
          >
            {imageUploaded.imageUrl ? (
              <img
                src={imageUploaded.imageUrl}
                alt="logo"
                style={{ width: "100%" }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        <Form.Item
          label="Tên bệnh viện"
          name="ten"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên bệnh viện!",
            },
            {
              max: 1000,
              message: "Vui lòng nhập tên bệnh viện không quá 1000 ký tự!",
            },
          ]}
        >
          <Input className="input-option" />
        </Form.Item>
        <Form.Item label="Tuyến bệnh viện" name="tuyenBenhVien">
          <Select data={listtuyenBenhVien} placeholder="Chọn tuyến bệnh viện" />
        </Form.Item>
        <Form.Item label="Hạng bệnh viện" name="hangBenhVien">
          <Select data={listhangBenhVien} placeholder="Chọn hạng bệnh viện" />
        </Form.Item>
        <Form.Item
          label={
            <div
              className="pointer"
              onClick={() => openInNewTab("/danh-muc/dia-chi-hanh-chinh?tab=2")}
            >
              Tỉnh/TP
            </div>
          }
          name="tinhThanhPhoId"
        >
          <Select data={listAllTinh} placeholder="Chọn tỉnh/TP" />
        </Form.Item>
        <Form.Item label="Địa chỉ" name="diaChi">
          <Input className="input-option" placeholder="Nhập địa chỉ" />
        </Form.Item>
        <Form.Item label="Ghi chú" name="ghiChu">
          <TextArea
            rows={4}
            placeholder="Nhập ghi chú"
            showCount
            maxLength={1000}
          />
        </Form.Item>
        {editStatus && (
          <Form.Item name="active" label=" " valuePropName="checked">
            <Checkbox>Hiệu lực</Checkbox>
          </Form.Item>
        )}
      </>
    );
  };
  return (
    <Main>
      <BaseDm
        titleTable="Danh mục bệnh viện"
        dataEditDefault={dataEditDefault}
        getColumns={getColumns}
        createOrEdit={createOrEdit}
        updateData={updateData}
        renderForm={renderForm}
        getData={getListBenhVien}
        listData={listBenhVien}
        dataSearch={dataSearch}
        totalElements={totalElements}
        page={page}
        size={size}
        roleSave={[ROLES["DANH_MUC"].BENH_VIEN_THEM]}
        roleEdit={[ROLES["DANH_MUC"].BENH_VIEN_SUA]}
      />
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    benhVien: {
      listBenhVien,
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
      dataSort,
    },
    ttHanhChinh: { listAllTinh },
    utils: { listtuyenBenhVien = [], listhangBenhVien = [] },
  } = state;

  return {
    listBenhVien,
    listAllTinh,
    listtuyenBenhVien,
    listhangBenhVien,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    dataSort,
  };
};
const mapDispatchToProps = ({
  benhVien: { getListBenhVien, createOrEdit, onDelete, updateData },
  ttHanhChinh: { getListAllTinh },
  utils: { getUtils },
}) => ({
  getListBenhVien,
  getListAllTinh,
  getUtils,
  createOrEdit,
  onDelete,
  updateData,
});

export default connect(mapStateToProps, mapDispatchToProps)(BenhVien);
