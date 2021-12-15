import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import HomeWrapper from "components/HomeWrapper";
import TableWrapper from "components/TableWrapper";
import FormServiceInfo from "./components/FormServiceInfo";
import LieuDungThuoc from "./components/LieuDungThuoc";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import MultiLevelTab from "components/MultiLevelTab";
import IcCreate from "assets/images/kho/IcCreate.png";
import Icon from "@ant-design/icons";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import { Main } from "./styled";
import {
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  ADD_LAYOUT,
  TABLE_LAYOUT,
  HIEU_LUC,
  KHONG_TINH_TIEN,
} from "constants/index";
import { Checkbox, Col, Input } from "antd";
import { formatNumber } from "utils";
import { checkRole } from "app/Sidebar/constant";
import { ROLES } from "constants/index";
const DanhMucThuoc = (props) => {
  const {
    listData,
    totalElements,
    dataSortColumn,
    listHoatChat,
    listNhomThuoc,
    listPhanNhomThuoc,
    listPhanLoaiThuoc,
    listDonViSoCap,
    // listQuocGia,
    listXuatXu,
    listNSX,
    listNCC,
    listNguonKhacChiTra,
    listnhomChiPhiBh,
    listNhomDvCap1,
    listNhomDvCap2,
    listNhomDvCap3,
    listDuongDung,
  } = props;
  const [editStatus, setEditStatus] = useState(false);
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
    props.onSizeChange({ size: 10 });
    searchAllServices();
  }, []);

  const searchAllServices = () => {
    const {
      searchHoatChat,
      searchNhomThuoc,
      searchPhanNhomThuoc,
      searchPhanLoaiThuoc,
      searchDonViSoCap,
      // getListQuocGia,
      getListXuatXu,
      getListNhaSanXuat,
      getUtils,
      searchDichVuCap1,
      searchDichVuCap2,
      searchDichVuCap3,
      searchDuongDung,
      searchHoatChatTongHop,
      searchTongHopDichVuCap1,
      searchTongHopDichVuCap2,
      searchTongHopDichVuCap3,
      getListXuatXuTongHop,
      searchDuongDungTongHop,
      getListTongHopNhaSanXuat,
    } = props;
    const params = { page: 0, size: 10000, active: true, sort: "ten,asc" };
    // searchHoatChat({ ...params, loaiDichVu: 90 });
    searchHoatChatTongHop({ ...params, loaiDichVu: 90 });
    searchNhomThuoc({ ...params, loaiDichVu: 90 });
    searchPhanNhomThuoc({ ...params, loaiDichVu: 90 });
    searchPhanLoaiThuoc({ ...params, loaiDichVu: 90 });
    searchDonViSoCap({
      ...params,
      pageUnit: params.page,
      sizeUnit: params.size,
      loaiDichVu: 90,
    });
    // getListQuocGia(params);
    getListXuatXuTongHop(params);
    // getListXuatXu(params);
    getListTongHopNhaSanXuat({ ...params, loaiNhaSanXuat: 10 });
    getListTongHopNhaSanXuat({ ...params, loaiNhaSanXuat: 20 });
    getUtils({ page: 0, name: "nhomChiPhiBh", sort: "ten,asc" });
    getUtils({ page: 0, name: "NguonKhacChiTra", sort: "ten,asc" });
    searchTongHopDichVuCap1(params);
    searchTongHopDichVuCap2(params);
    searchTongHopDichVuCap3(params);
    // searchDichVuCap1(params);
    // searchDichVuCap2(params);
    // searchDichVuCap3(params);
    // searchDuongDung(params);
    searchDuongDungTongHop(params);
  };

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

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: 50,
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã thuốc"
          sort_key="dichVu.ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.ma"] || 0}
          search={
            <Input
              placeholder="Tìm mã thuốc"
              onChange={onSearchInput("dichVu.ma")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item && item.ma;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tên thuốc"
          sort_key="dichVu.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.ten"] || 0}
          search={
            <Input
              placeholder="Tìm tên thuốc"
              onChange={onSearchInput("dichVu.ten")}
            />
          }
        />
      ),
      width: 180,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item && item.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Mã hoạt chất"
          sort_key="hoatChat.ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["hoatChat.ma"] || 0}
          searchSelect={
            <Select
              data={listHoatChat.map((item) => ({ id: item.id, ten: item.ma }))}
              placeholder="Chọn mã hoạt chất"
              onChange={onSearchInput("hoatChatId")}
            />
          }
        />
      ),
      width: 130,
      dataIndex: "hoatChat",
      key: "hoatChat",
      render: (item) => item?.ma,
    },
    {
      title: (
        <HeaderSearch
          sort_key="tenHoatChat"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tenHoatChat || 0}
          search={
            <Input
              style={{ width: "100%" }}
              placeholder="Tìm tên hoạt chất"
              onChange={onSearchInput("tenHoatChat")}
            />
          }
          title="Tên hoạt chất"
        />
      ),
      width: 170,
      dataIndex: "tenHoatChat",
      key: "tenHoatChat",
    },
    {
      title: (
        <HeaderSearch
          sort_key="hamLuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.hamLuong || 0}
          search={
            <Input
              placeholder="Tìm hàm lượng"
              onChange={onSearchInput("hamLuong")}
            />
          }
          title="Hàm lượng"
        />
      ),
      width: 150,
      dataIndex: "hamLuong",
      key: "hamLuong",
    },
    {
      title: (
        <HeaderSearch
          sort_key="nhomDvKhoCap1.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["nhomDvKhoCap1.ten"] || 0}
          searchSelect={
            <Select
              data={listNhomThuoc}
              placeholder="Chọn nhóm thuốc"
              onChange={onSearchInput("nhomDvKhoCap1Id")}
            />
          }
          title="Nhóm thuốc"
        />
      ),
      width: 150,
      dataIndex: "nhomDvKhoCap1",
      key: "nhomDvKhoCap1",
      render: (item) => {
        return item && item.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="phanNhomDvKho.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["phanNhomDvKho.ten"] || 0}
          searchSelect={
            <Select
              data={listPhanLoaiThuoc}
              placeholder="Chọn phân nhóm thuốc"
              onChange={onSearchInput("nhomDvKhoCap1Id")}
            />
          }
          title="Phân nhóm thuốc"
        />
      ),
      width: 150,
      dataIndex: "phanNhomDvKho",
      key: "phanNhomDvKho",
      render: (item, _, __) => item && item?.ten,
    },
    {
      title: (
        <HeaderSearch
          sort_key="phanLoaiDvKho.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["phanLoaiDvKho.ten"] || 0}
          searchSelect={
            <Select
              data={listPhanLoaiThuoc}
              placeholder="Chọn phân loại thuốc"
              onChange={onSearchInput("phanLoaiDvKhoId")}
            />
          }
          title="Phân loại thuốc"
        />
      ),
      width: 150,
      dataIndex: "phanLoaiDvKho",
      key: "phanLoaiDvKho",
      render: (item, _, __) => item && item?.ten,
    },
    {
      title: (
        <HeaderSearch
          sort_key="dvtSoCap.ten"
          defaultValue=""
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dvtSoCap.ten"] || 0}
          searchSelect={
            <Select
              data={listDonViSoCap}
              placeholder="Chọn đơn vị sơ cấp"
              onChange={onSearchInput("dvtSoCapId")}
            />
          }
          title="Đơn vị sơ cấp"
        />
      ),
      width: 150,
      dataIndex: "dvtSoCap",
      key: "dvtSoCap",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="dichVu.donViTinh.ten"
          defaultValue=""
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.donViTinh.ten"] || 0}
          searchSelect={
            <Select
              data={listDonViSoCap}
              placeholder="Chọn đơn vị thứ cấp"
              onChange={onSearchInput("dichVu.donViTinhId")}
            />
          }
          title="Đơn vị thứ cấp"
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "dvtThuCap",
      render: (item) => {
        return item?.donViTinh?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="heSoDinhMuc"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.heSoDinhMuc || 0}
          search={
            <Input
              placeholder="Tìm hệ số định mức"
              onChange={onSearchInput("heSoDinhMuc")}
            />
          }
          title="Hệ số định mức"
        />
      ),
      width: 150,
      dataIndex: "heSoDinhMuc",
      key: "heSoDinhMuc",
      align: "right",
    },
    {
      title: (
        <HeaderSearch
          sort_key="quyCach"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.quyCach || 0}
          search={
            <Input
              placeholder="Tìm quy cách"
              onChange={onSearchInput("quyCach")}
            />
          }
          title="Quy cách"
        />
      ),
      width: 130,
      dataIndex: "quyCach",
      key: "quyCach",
    },
    {
      title: (
        <HeaderSearch
          sort_key="xuatXu.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["xuatXu.ten"] || 0}
          searchSelect={
            <Select
              // data={listQuocGia}
              data={listXuatXu}
              placeholder="Chọn nước sản xuất"
              onChange={onSearchInput("xuatXuId")}
            />
          }
          title="Nước sản xuất"
        />
      ),
      width: 130,
      dataIndex: "xuatXu",
      key: "xuatXu",
      render: (item) => {
        return item && item.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="nhaSanXuat.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["nhaSanXuat.ten"] || 0}
          searchSelect={
            <Select
              data={listNSX}
              placeholder="Chọn nước sản xuất"
              onChange={onSearchInput("nhaSanXuatId")}
            />
          }
          title="Nhà sản xuất"
        />
      ),
      width: 130,
      dataIndex: "nhaSanXuat",
      key: "nhaSanXuat",
      render: (item) => {
        return item && item.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="nhaCungCap.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["nhaCungCap.ten"] || 0}
          searchSelect={
            <Select
              data={listNCC}
              placeholder="Chọn nhà cung cấp"
              onChange={onSearchInput("nhaCungCapId")}
            />
          }
          title="Nhà cung cấp"
        />
      ),
      width: 130,
      dataIndex: "nhaCungCap",
      key: "nhaCungCap",
      render: (item) => {
        return item && item.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="giaNhapSauVat"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.giaNhapSauVat || 0}
          search={
            <Input
              placeholder="Tìm giá nhập"
              onChange={onSearchInput("giaNhapSauVat")}
            />
          }
          title="Giá nhập"
        />
      ),
      width: 130,
      dataIndex: "giaNhapSauVat",
      key: "giaNhapSauVat",
      align: "right",
      render: (field, _, __) => (field && formatNumber(field)) || "",
    },
    {
      title: (
        <HeaderSearch
          sort_key="giaTran"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.giaTran || 0}
          search={
            <Input
              placeholder="Tìm giá trần"
              onChange={onSearchInput("giaTran")}
            />
          }
          title="Giá trần"
        />
      ),
      width: 130,
      dataIndex: "giaTran",
      key: "giaTran",
      align: "right",
      render: (field, _, __) => (field && formatNumber(field)) || "",
    },
    {
      title: (
        <HeaderSearch
          sort_key="tranBaoHiem"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tranBaoHiem || 0}
          search={
            <Input
              placeholder="Tìm giá trần BH"
              onChange={onSearchInput("tranBaoHiem")}
            />
          }
          title="Trần bảo hiểm"
        />
      ),
      width: 130,
      dataIndex: "tranBaoHiem",
      key: "tranBaoHiem",
      align: "right",
      render: (field, _, __) => (field && formatNumber(field)) || "",
    },
    {
      title: (
        <HeaderSearch
          sort_key="dichVu.tyLeBhTt"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.tyLeBhTt"] || 0}
          search={
            <Input
              placeholder="Tìm tỷ lệ BHTT"
              onChange={onSearchInput("dichVu.tyLeBhTt")}
            />
          }
          title="Tỷ lệ BH thanh toán"
        />
      ),
      width: 170,
      dataIndex: "dichVu",
      key: "dichVu",
      align: "right",
      render: (item) => {
        return item?.tyLeBhTt;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="dichVu.nhomChiPhiBh"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.nhomChiPhiBh"] || 0}
          searchSelect={
            <Select
              data={listnhomChiPhiBh}
              placeholder="Chọn nhóm chi phí"
              onChange={onSearchInput("dichVu.nhomChiPhiBh")}
            />
          }
          title="Nhóm chi phí"
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        const index = listnhomChiPhiBh.findIndex(
          (chiphi) => chiphi.id === item.nhomChiPhiBh
        );
        if (index === -1) return;
        return listnhomChiPhiBh[index]?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="dichVu.nhomDichVuCap1.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.nhomDichVuCap1.ten"] || 0}
          searchSelect={
            <Select
              data={listNhomDvCap1}
              placeholder="Chọn nhóm DV cấp I"
              onChange={onSearchInput("dichVu.nhomDichVuCap1Id")}
            />
          }
          title="Nhóm DV cấp I"
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item && item?.nhomDichVuCap1?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="dichVu.nhomDichVuCap2.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.nhomDichVuCap2.ten"] || 0}
          searchSelect={
            <Select
              data={listNhomDvCap2}
              placeholder="Chọn DV cấp II"
              onChange={onSearchInput("dichVu.nhomDichVuCap2Id")}
            />
          }
          title="Nhóm DV cấp II"
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item && item?.nhomDichVuCap2?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="dichVu.nhomDichVuCap3.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.nhomDichVuCap3.ten"] || 0}
          searchSelect={
            <Select
              data={listNhomDvCap3}
              placeholder="Chọn DV cấp III"
              onChange={onSearchInput("dichVu.nhomDichVuCap3Id")}
            />
          }
          title="Nhóm DV cấp III"
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item && item?.nhomDichVuCap3?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="dichVu.maTuongDuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.maTuongDuong"] || 0}
          search={
            <Input
              placeholder="Tìm mã tương đương"
              onChange={onSearchInput("dichVu.maTuongDuong")}
            />
          }
          title="Mã tương đương"
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item && item.maTuongDuong;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="dichVu.tenTuongDuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.tenTuongDuong"] || 0}
          search={
            <Input
              placeholder="Tìm tên tương đương"
              onChange={onSearchInput("dichVu.tenTuongDuong")}
            />
          }
          title="Tên tương đương"
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item && item.tenTuongDuong;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="soVisa"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.soVisa || 0}
          search={
            <Input
              placeholder="Tìm số visa"
              onChange={onSearchInput("soVisa")}
            />
          }
          title="Số Visa"
        />
      ),
      width: 150,
      dataIndex: "soVisa",
      key: "soVisa",
    },
    {
      title: (
        <HeaderSearch
          sort_key="maLienThong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.maLienThong || 0}
          search={
            <Input
              placeholder="Tìm mã liên thông"
              onChange={onSearchInput("maLienThong")}
            />
          }
          title="Mã liên thông"
        />
      ),
      width: 150,
      dataIndex: "maLienThong",
      key: "maLienThong",
    },
    {
      title: (
        <HeaderSearch
          // sort_key="dichVu.khongTinhTien"
          // onClickSort={onClickSort}
          // dataSort={dataSortColumn["dichVu.khongTinhTien"] || 0}
          searchSelect={
            <Select
              data={listNguonKhacChiTra}
              placeholder="Tìm nguồn chi trả khác"
              mode="multiple"
              onChange={onSearchInput("dsNguonKhacChiTra")}
            />
          }
          title="Nguồn khác chi trả"
        />
      ),
      width: 170,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) =>
        item?.dsNguonKhacChiTra
          ?.map((dsId) => {
            const index = listNguonKhacChiTra?.findIndex(
              (nguon) => nguon.id === dsId
            );
            return listNguonKhacChiTra[index]?.ten;
          })
          .join(", "),
    },
    {
      title: (
        <HeaderSearch
          sort_key="duongDung.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["duongDung.ten"] || 0}
          searchSelect={
            <Select
              data={listDuongDung}
              placeholder="Tìm đường dùng"
              onChange={onSearchInput("duongDung.ten")}
            />
          }
          title="Đường dùng"
        />
      ),
      width: 170,
      dataIndex: "duongDung",
      key: "duongDung",
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="dichVu.khongTinhTien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.khongTinhTien"] || 0}
          searchSelect={
            <Select
              data={KHONG_TINH_TIEN}
              placeholder="Chọn tính tiền"
              onChange={onSearchInput("dichVu.khongTinhTien")}
            />
          }
          title="Không tính tiền"
        />
      ),
      width: 160,
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return <Checkbox checked={!!item?.khongTienTien} />;
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
  const listPanel = [
    {
      title: "Thông tin dịch vụ",
      key: 1,
      render: () => {
        return (
          <FormServiceInfo
            listHoatChat={listHoatChat}
            listNhomThuoc={listNhomThuoc}
            listPhanNhomThuoc={listPhanNhomThuoc}
            listPhanLoaiThuoc={listPhanLoaiThuoc}
            listDonViSoCap={listDonViSoCap}
            // listQuocGia={listQuocGia}
            listXuatXu={listXuatXu}
            listNSX={listNSX}
            listNCC={listNCC}
            listnhomChiPhiBh={listnhomChiPhiBh}
            listNguonKhacChiTra={listNguonKhacChiTra}
            listNhomDvCap1={listNhomDvCap1}
            listNhomDvCap2={listNhomDvCap2}
            listNhomDvCap3={listNhomDvCap3}
            listDuongDung={listDuongDung}
            roleSave={[ROLES["DANH_MUC"].THUOC_THEM]}
            roleEdit={[ROLES["DANH_MUC"].THUOC_SUA]}
            editStatus={
              editStatus
                ? !checkRole([ROLES["DANH_MUC"].THUOC_SUA])
                : !checkRole([ROLES["DANH_MUC"].THUOC_THEM])
            }
            currentItemRowParent={props?.currentItem}
          />
        );
      },
    },
    {
      title: "Liều dùng",
      key: 2,
      render: () => {
        return (
          <LieuDungThuoc
            dichVuId={props.currentItem?.id}
            roleSave={[ROLES["DANH_MUC"].THUOC_THEM]}
            roleEdit={[ROLES["DANH_MUC"].THUOC_SUA]}
            editStatus={
              editStatus
                ? !checkRole([ROLES["DANH_MUC"].THUOC_SUA])
                : !checkRole([ROLES["DANH_MUC"].THUOC_THEM])
            }
          />
        );
      },
    },
    // {
    //   key: 2,
    //   title: "Liều dùng",
    //   render: () => {
    //     return <DichVuTrongGoi />;
    //   },
    // },
  ];

  const onClick = () => {};

  const onChangePage = (page) => {
    props.onSearch({ page: page - 1 });
  };

  const onSizeChange = (size) => {
    props.onSizeChange({ size: size });
  };

  const onShowAndHandleUpdate = (data = {}) => {
    setEditStatus(true);
    props.updateData({
      currentItem: { ...data },
    });
  };

  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        setState({
          dataSelected: record,
        });
        onShowAndHandleUpdate(record);
      },
    };
  };

  const handleClickedBtnAdded = () => {
    setEditStatus(false);
    props.updateData({
      currentItem: {},
    });
  };

  const handleCollapsePane = () => {
    setCollapseStatus(!collapseStatus);
  };
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
  const setRowClassName = (record) => {
    let idDiff = state.dataSelected?.id;
    return record.id === idDiff ? "row-actived" : "";
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
            title="Danh mục thuốc"
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
              checkRole([ROLES["DANH_MUC"].THUOC_THEM])
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
            dataSource={listData}
            onRow={onRow}
            rowClassName={setRowClassName}
          ></TableWrapper>
          {totalElements && (
            <Pagination
              listData={listData}
              onChange={onChangePage}
              current={props.page + 1}
              pageSize={props.size}
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
              defaultActiveKey={1}
              listPanel={listPanel}
              isBoxTabs={true}
            ></MultiLevelTab>
          </Col>
        )}
      </HomeWrapper>
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    danhMucThuoc: {
      listData,
      totalElements,
      page,
      size,
      dataSearch,
      dataSort,
      currentItem,
      dataSortColumn,
    },
    hoatChat: { listHoatChat = [] },
    nhomDichVuKho: { listMeGrLv1: listNhomThuoc = [] },
    phanNhomDichVuKho: { listGroupMedicine: listPhanNhomThuoc = [] },
    phanLoaiThuoc: { listPhanLoaiThuoc: listPhanLoaiThuoc = [] },
    donViTinh: { listUnit: listDonViSoCap = [] },
    // ttHanhChinh: { listQuocGia = [] },
    xuatXu: { listXuatXu },
    nhaSanXuat: { listNSX, listNCC = [] },
    utils: { listnhomChiPhiBh = [], listNguonKhacChiTra = [] },
    nhomDichVuCap1: { listGroupService1: listNhomDvCap1 = [] },
    nhomDichVuCap2: { listGroupService2: listNhomDvCap2 = [] },
    nhomDichVuCap3: { listGroupService3: listNhomDvCap3 = [] },
    duongDung: { listDuongDung = [] },
  } = state;

  return {
    listData,
    totalElements,
    page,
    size,
    dataSearch,
    dataSort,
    currentItem,
    dataSortColumn,
    listHoatChat,
    listNhomThuoc,
    listPhanNhomThuoc,
    listPhanLoaiThuoc,
    listDonViSoCap,
    // listQuocGia,
    listXuatXu,
    listNSX,
    listNCC,
    listnhomChiPhiBh,
    listNguonKhacChiTra,
    listNhomDvCap1,
    listNhomDvCap2,
    listNhomDvCap3,
    listDuongDung,
  };
};
const mapDispatchToProps = ({
  danhMucThuoc: {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
  },
  hoatChat: { searchHoatChat, searchHoatChatTongHop },
  nhomDichVuKho: { getListMeGrLv1TongHop: searchNhomThuoc },
  phanNhomDichVuKho: { getListGroupMedicineTongHop: searchPhanNhomThuoc },
  phanLoaiThuoc: { getListPhanLoaiThuocTongHop: searchPhanLoaiThuoc },
  donViTinh: { searchTongHopDonViTinh: searchDonViSoCap },
  // ttHanhChinh: { getListQuocGia },
  xuatXu: { getListXuatXu, getListXuatXuTongHop },
  nhaSanXuat: { getListNhaSanXuat, getListTongHopNhaSanXuat },
  utils: { getUtils },
  nhomDichVuCap1: { searchDichVuCap1, searchTongHopDichVuCap1 },
  nhomDichVuCap2: { searchDichVuCap2, searchTongHopDichVuCap2 },
  nhomDichVuCap3: { searchDichVuCap3, searchTongHopDichVuCap3 },
  duongDung: { searchDuongDung, searchDuongDungTongHop },
}) => ({
  onSearch,
  onSizeChange,
  onSortChange,
  onChangeInputSearch,
  updateData,
  searchHoatChat,
  searchHoatChatTongHop,
  searchNhomThuoc,
  searchPhanNhomThuoc,
  searchPhanLoaiThuoc,
  searchDonViSoCap,
  // getListQuocGia,
  getListXuatXu,
  getListXuatXuTongHop,
  getListNhaSanXuat,
  getUtils,
  searchDichVuCap1,
  searchDichVuCap2,
  searchDichVuCap3,
  searchDuongDung,
  searchTongHopDichVuCap1,
  searchTongHopDichVuCap2,
  searchTongHopDichVuCap3,
  searchDuongDungTongHop,
  getListTongHopNhaSanXuat,
});

export default connect(mapStateToProps, mapDispatchToProps)(DanhMucThuoc);
