import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { loadDataSort } from "mokup/common";
import { Main } from "./styled";
import Image from "components/Image";
import { combineSort } from "utils";
import { formatNumber } from "utils";
import {
  Pagination,
  HeaderSearch,
  CreatedWrapper,
  TableWrapper,
  HomeWrapper,
  Select,
  ListImage,
} from "components";
import { SORT_DEFAULT } from "constants/page/therapyConstant";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  PAGE_DEFAULT,
  ADD_LAYOUT,
  TABLE_LAYOUT,
  HIEU_LUC,
  THANH_TOAN_SAU,
} from "constants/index";
import { Checkbox, Col, Input, Modal, Form, InputNumber } from "antd";
import { openInNewTab } from "utils";
import { checkRole } from "app/Sidebar/constant";
import { ROLES } from "constants/index";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import stringUtils from "mainam-react-native-string-utils";
import BaseDm from "components/BaseDm";

let timer = null;

const Index = ({
  listKhoa,
  totalElements,
  page,
  size,
  dataEditDefault,
  dataSearch,
  dataSort,
  updateData,
  getListKhoa,
  createOrEdit,
  onDelete,
  listToaNha,
  searchToaNha,
  getListAllLoaiBenhAn,
  listAllLoaiBenhAn,
  getUtils,
  listtinhChatKhoa,
  getListToaNha,
  listAllToaNha,
}) => {
  const [logo, setLogo] = useState("");
  const url = new URL(window.location.href);
  const active = url.searchParams.get("active");

  const initWhenCreate = ({ form }) => {
    form.setFieldsValue({ active: true, thanhToanSau: true });
    const params = { page: 0, size: 10 };
    getListKhoa(params);
    // searchToaNha({ page: 0, size: 500 });
    getListAllLoaiBenhAn({});
    getUtils({ name: "tinhChatKhoa" });
    getListToaNha();
  };

  const getlisttinhChatKhoa = (item) => {
    let res = (listtinhChatKhoa || []).reduce(
      (arr, current) =>
        item && item.some((e) => e === current.id)
          ? [...arr, current.ten]
          : [...arr],
      []
    );
    return (res.length && res) || [];
  };
  const getColumns = ({ onClickSort, dataSortColumn, onSearchInput }) => [
    {
      title: <HeaderSearch title="STT" />,
      width: 70,
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
            <Image src={item} />
          </div>
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Mã khoa"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ma || 0}
          search={
            <Input
              placeholder="Tìm mã khoa"
              onChange={(e) => {
                onSearchInput(e.target.value, "ma");
              }}
            />
          }
        />
      ),
      width: 90,
      dataIndex: "ma",
      key: "ma",
      render: (item) => {
        return (
          <div className="city">
            <h5>{item}</h5>
          </div>
        );
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tên khoa"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.ten || 0}
          search={
            <Input
              placeholder="Tìm tên khoa"
              onChange={(e) => {
                onSearchInput(e.target.value, "ten");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          title="Tên viết tắt"
          sort_key="vietTat"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.vietTat || 0}
          search={
            <Input
              placeholder="Tìm tên viết tắt"
              onChange={(e) => {
                onSearchInput(e.target.value, "vietTat");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "vietTat",
      key: "vietTat",
    },
    {
      title: (
        <HeaderSearch
          title="Mã BHYT"
          sort_key="maBhyt"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.maBhyt || 0}
          search={
            <Input
              placeholder="Tìm mã BHYT"
              onChange={(e) => {
                onSearchInput(e.target.value, "maBHYT");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "maBhyt",
      key: "maBhyt",
    },
    {
      title: (
        <HeaderSearch
          title="Tên BH"
          sort_key="tenBhyt"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tenBhyt || 0}
          search={
            <Input
              placeholder="Tìm tên BH"
              onChange={(e) => {
                onSearchInput(e.target.value, "tenBhyt");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "tenBhyt",
      key: "tenBhyt",
    },
    {
      title: (
        <HeaderSearch
          title="Loại bệnh án"
          sort_key="loaiBenhAn.ten"
          onClickSort={onClickSort}
          dataSort={
            dataSortColumn.key === "loaiBenhAn.ten" ? dataSortColumn.value : 0
          }
          search={
            <Input
              placeholder="Tìm loại bệnh án"
              onChange={(e) => {
                onSearchInput(e.target.value, "loaiBenhAn.ten");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "loaiBenhAn",
      key: "loaiBenhAn",
      render: (loaiBenhAn) => {
        return loaiBenhAn?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nhà"
          sort_key="toaNha.ten"
          onClickSort={onClickSort}
          dataSort={
            dataSortColumn.key === "toaNha.ten" ? dataSortColumn.value : 0
          }
          search={
            <Input
              placeholder="Tìm nhà"
              onChange={(e) => {
                onSearchInput(e.target.value, "toaNha.ten");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "toaNha",
      key: "toaNha",
      render: (toaNha) => {
        return toaNha?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nhà thu tiền"
          sort_key="nhaThuTien.ten"
          onClickSort={onClickSort}
          dataSort={
            dataSortColumn.key === "nhaThuTien.ten" ? dataSortColumn.value : 0
          }
          search={
            <Input
              placeholder="Tìm nhà thu tiền"
              onChange={(e) => {
                onSearchInput(e.target.value, "nhaThuTien.ten");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "nhaThuTien",
      key: "nhaThuTien",
      render: (nhaThuTien) => {
        return nhaThuTien?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Giường kế hoạch"
          sort_key="giuongKeHoach"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.giuongKeHoach || 0}
          search={
            <Input
              type="number"
              placeholder="Tìm giường kế hoạch"
              onChange={(e) => {
                onSearchInput(e.target.value, "giuongKeHoach");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "giuongKeHoach",
      key: "giuongKeHoach",
      align: "right",
    },
    {
      title: (
        <HeaderSearch
          title="Giường thực kê"
          sort_key="giuongThucKe"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.giuongThucKe || 0}
          search={
            <Input
              type="number"
              placeholder="Tìm giường thực kê"
              onChange={(e) => {
                onSearchInput(e.target.value, "giuongThucKe");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "giuongThucKe",
      key: "giuongThucKe",
      align: "right",
    },
    {
      title: (
        <HeaderSearch
          title="Trần bảo hiểm"
          sort_key="tranBaoHiem"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tranBaoHiem || 0}
          search={
            <Input
              type="number"
              placeholder="Tìm trần bảo hiểm"
              onChange={(e) => {
                onSearchInput(e.target.value, "tranBaoHiem");
              }}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "tranBaoHiem",
      key: "tranBaoHiem",
      align: "right",
      render: (field, _, __) => (field && formatNumber(field)) || "",
    },
    {
      title: (
        <HeaderSearch
          title="Tính chất khoa"
          searchSelect={
            <Select
              defaultValue=""
              data={[{ id: "", ten: "Tất cả" }, ...listtinhChatKhoa]}
              placeholder="Tìm tính chất khoa"
              onChange={(e) => {
                onSearchInput(e, "dsTinhChatKhoa");
              }}
            />
          }
        />
      ),
      width: 250,
      dataIndex: "dsTinhChatKhoa",
      key: "dsTinhChatKhoa",
      render: (item) => {
        return getlisttinhChatKhoa(item).join(", ");
      },
    },
    {
      title: (
        <HeaderSearch
          searchSelect={
            <Select
              data={THANH_TOAN_SAU}
              placeholder="Chọn thanh toán sau"
              defaultValue=""
              onChange={(value) => {
                onSearchInput(value, "thanhToanSau");
              }}
            />
          }
          sort_key="thanhToanSau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.thanhToanSau || 0}
          title="Thanh toán sau"
        />
      ),
      width: 150,
      dataIndex: "thanhToanSau",
      key: "thanhToanSau",
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
      width: 110,
      dataIndex: "active",
      key: "active",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
  ];

  const renderForm = ({ form, editStatus, refAutoFocus, autoFocus }) => {
    return (
      <>
        <fieldset
          disabled={
            editStatus
              ? !checkRole([ROLES["DANH_MUC"].KHOA_SUA])
              : !checkRole([ROLES["DANH_MUC"].KHOA_THEM])
          }
        >
          <Form
            form={form}
            layout="vertical"
            style={{ width: "100%" }}
            className="form-custom"
          >
            <div style={{ width: "50%" }}>
              <Form.Item
                label="Mã khoa"
                name="ma"
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mã khoa!",
                  },
                  {
                    max: 20,
                    message: "Vui lòng nhập mã khoa không quá 20 ký tự!",
                  },
                ]}
              >
                <Input
                  ref={refAutoFocus}
                  className="input-option"
                  placeholder="Vui lòng nhập mã khoa"
                />
              </Form.Item>
              <Form.Item
                label="Tên khoa"
                name="ten"
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên khoa!",
                  },
                  {
                    max: 1000,
                    message: "Vui lòng nhập tên khoa không quá 1000 ký tự!",
                  },
                ]}
              >
                <Input
                  className="input-option"
                  placeholder="Vui lòng nhập tên khoa"
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                label="Logo"
                name="logo"
                style={{ width: "100%", marginLeft: "48%" }}
              >
                <ListImage
                  uploadImage={(e) => onUpdateData(e, "logo")}
                  files={logo}
                  provider="khoa"
                />
              </Form.Item>
            </div>
            <Form.Item
              label="Tên viết tắt"
              name="vietTat"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên viết tắt!",
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui lòng nhập tên viết tắt"
              />
            </Form.Item>
            <Form.Item
              label="Mã BHYT"
              name="maBhyt"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã BHYT!",
                },
              ]}
            >
              <Input
                className="input-option"
                placeholder="Vui lòng nhập mã BHYT"
              />
            </Form.Item>
            <Form.Item label="Loại bệnh án" name="loaiBenhAnId">
              <Select
                data={listAllLoaiBenhAn}
                placeholder="Chọn loại bệnh án"
              />
            </Form.Item>
            <Form.Item label="Tên BH" name="tenBhyt">
              <Input
                className="input-option"
                placeholder="Vui lòng nhập tên BH"
              />
            </Form.Item>
            <Form.Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/toa-nha")}
                >
                  Nhà thu tiền
                </div>
              }
              name="nhaThuTienId"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn nhà thu tiền!",
                },
              ]}
            >
              <Select data={listAllToaNha} placeholder="Chọn nhà thu tiền" />
            </Form.Item>
            <Form.Item
              label={
                <div
                  className="pointer"
                  onClick={() => openInNewTab("/danh-muc/toa-nha")}
                >
                  Nhà
                </div>
              }
              name="toaNhaId"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn nhà!",
                },
              ]}
            >
              <Select data={listAllToaNha} placeholder="Chọn nhà" />
            </Form.Item>
            <Form.Item label="Giường thực kê" name="giuongThucKe">
              <Input
                type="number"
                placeholder="Nhập giường thực kê"
                className="input-option"
              />
            </Form.Item>
            <Form.Item label="Giường kế hoạch" name="giuongKeHoach">
              <Input
                type="number"
                placeholder="Nhập giường kế hoạch"
                className="input-option"
              />
            </Form.Item>
            <Form.Item label="Tính chất khoa" name="dsTinhChatKhoa">
              <Select
                mode="multiple"
                data={[...listtinhChatKhoa]}
                placeholder="Chọn tính chất khoa"
              />
            </Form.Item>
            <Form.Item label="Trần bảo hiểm" name="tranBaoHiem">
              <InputNumber
                type="number"
                placeholder="Nhập trần bảo hiểm"
                className="input-option"
                min={0}
              />
            </Form.Item>
            <Form.Item name="active" valuePropName="checked">
              {editStatus && <Checkbox>Có hiệu lực</Checkbox>}
            </Form.Item>
            <Form.Item name="thanhToanSau" valuePropName="checked">
              <Checkbox>Thanh toán sau</Checkbox>
            </Form.Item>
          </Form>
        </fieldset>
      </>
    );
  };

  return (
    <Main>
      <BaseDm
        titleTable="Danh mục khoa"
        dataEditDefault={dataEditDefault}
        getColumns={getColumns}
        createOrEdit={createOrEdit}
        updateData={updateData}
        renderForm={renderForm}
        getData={getListQuanHam}
        listData={listQuanHam}
        dataSearch={dataSearch}
        totalElements={totalElements}
        page={page}
        size={size}
        roleSave={[ROLES["DANH_MUC"].KHOA_THEM]}
        roleEdit={[ROLES["DANH_MUC"].KHOA_SUA]}
        classNameForm={"form-custom--one-line"}
      />
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    loaiBenhAn: { listAllLoaiBenhAn = [] },
    utils: { listtinhChatKhoa = [] },
    khoa: {
      listKhoa = [],
      totalElements,
      page,
      size,
      dataEditDefault,
      dataSearch,
      dataSort,
    },
    toaNha: { listToaNha = [], listAllToaNha },
  } = state;

  return {
    listtinhChatKhoa,
    listAllLoaiBenhAn,
    listToaNha,
    listKhoa,
    totalElements,
    page,
    size,
    dataEditDefault,
    dataSearch,
    dataSort,
    listAllToaNha,
  };
};
const mapDispatchToProps = ({
  khoa: { getListKhoa, createOrEdit, onDelete, updateData },
  toaNha: { searchToaNha, getListToaNha },
  loaiBenhAn: { getListAllLoaiBenhAn },
  utils: { getUtils },
}) => ({
  getListAllLoaiBenhAn,
  searchToaNha,
  getListKhoa,
  createOrEdit,
  onDelete,
  updateData,
  getUtils,
  getListToaNha,
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
