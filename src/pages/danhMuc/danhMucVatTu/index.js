import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import HomeWrapper from "components/HomeWrapper";
import TableWrapper from "components/TableWrapper";
import FormServiceInfo from "./components/FormServiceInfo";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import MultiLevelTab from "components/MultiLevelTab";

import { Main } from "./styled";
import { LOAI_DICH_VU } from "constants/index";
import {
  PAGE_DEFAULT,
  ADD_LAYOUT_COLLAPSE,
  TABLE_LAYOUT_COLLAPSE,
  ADD_LAYOUT,
  TABLE_LAYOUT,
  HIEU_LUC,
  KHONG_TINH_TIEN,
} from "constants/index";
import Checkbox from "components/Checkbox";
import { checkRole } from "app/Sidebar/constant";
import { ROLES } from "constants/index";
import { Col, Input } from "antd";
import { formatNumber } from "utils";
import IcCreate from "assets/images/kho/IcCreate.png";
import showFull from "assets/svg/showFull.svg";
import thuNho from "assets/svg/thuNho.svg";
import extendTable from "assets/svg/extendTable.svg";
import extendChiTiet from "assets/svg/extendChiTiet.svg";
import Icon from "@ant-design/icons";
let timer = null;

const DanhMucVatTu = (props) => {
  const {
    totalElements,
    dataSortColumn,
    listNhomVatTu,
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
    getUtils,
    searchNhomVatTu,
    searchDonViSoCap,
    // getListQuocGia,
    getListXuatXu,
    getListNhaSanXuat,
    searchDichVuCap1,
    searchDichVuCap2,
    searchDichVuCap3,
    getListXuatXuTongHop,
    searchTongHopDichVuCap1,
    searchTongHopDichVuCap2,
    searchTongHopDichVuCap3,
    searchTongHopDonViTinh,
    getListTongHopNhaSanXuat,
    getAllUnit,
    AllUnit,
    currentItem,
  } = props;
  const [collapseStatus, setCollapseStatus] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  useEffect(() => {
    props.onSizeChange({ size: 10 });
    getAllServices();
  }, []);
  const [state, _setState] = useState({
    showFullTable: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const getAllServices = () => {
    const params = { page: 0, size: 10000, active: true, sort: "ten,asc" };
    searchNhomVatTu({ ...params, loaiDichVu: LOAI_DICH_VU.VAT_TU });
    searchTongHopDichVuCap1({ ...params, loaiDichVu: LOAI_DICH_VU.VAT_TU });
    searchTongHopDichVuCap2({ ...params, loaiDichVu: LOAI_DICH_VU.VAT_TU });
    searchTongHopDichVuCap3({ ...params, loaiDichVu: LOAI_DICH_VU.VAT_TU });
    searchTongHopDonViTinh({ ...params, loaiDichVu: 100 });
    getAllUnit({ ...params, loaiDichVu: 100 });
    // searchDichVuCap1({ ...params, loaiDichVu: LOAI_DICH_VU.VAT_TU });
    // searchDichVuCap2({ ...params, loaiDichVu: LOAI_DICH_VU.VAT_TU });
    // searchDichVuCap3({ ...params, loaiDichVu: LOAI_DICH_VU.VAT_TU });
    // searchDonViSoCap({ ...params, loaiDichVu: 100 });
    // getListQuocGia(params);
    // getListXuatXu(params);
    getListXuatXuTongHop(params);
    getListTongHopNhaSanXuat({ ...params, loaiNhaSanXuat: 10 });
    getListTongHopNhaSanXuat({ ...params, loaiNhaSanXuat: 20 });
    // getListNhaSanXuat({ ...params, loaiNhaSanXuat: 10 });
    // getListNhaSanXuat({ ...params, loaiNhaSanXuat: 20 });
    getUtils({ page: PAGE_DEFAULT, name: "nhomChiPhiBh", sort: "name, asc" });
    getUtils({
      page: PAGE_DEFAULT,
      name: "NguonKhacChiTra",
      sort: "name,asc",
    });
  };

  const onClickSort = (key, value) => {
    props.onSortChange({
      [key]: value,
    });
  };
  const onSearchInput = (key) => (e) => {
    console.log("key", key);
    console.log("e", e);
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) {
        value = e.target.checked;
      } else {
        value = e.target.value;
      }
    } else value = e;
    clearTimeout(timer);
    timer = setTimeout(() => {
      props.onChangeInputSearch({
        [key]: value,
      });
    }, 500);
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "80px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="M?? v???t t??"
          sort_key="dichVu.ma"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["dichVu.ma"] || 0}
          search={
            <Input
              placeholder="T??m m?? v???t t??"
              onChange={onSearchInput("dichVu.ma")}
            />
          }
        />
      ),
      width: "130px",
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item && item.ma;
      },
    },
    {
      title: (
        <HeaderSearch
          title="T??n v???t t??"
          sort_key="dichVu.ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["dichVu.ten"] || 0}
          search={
            <Input
              placeholder="T??m t??n v???t t??"
              onChange={onSearchInput("dichVu.ten")}
            />
          }
        />
      ),
      width: "180px",
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item && item.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nh??m v???t t??"
          sort_key="nhomDvKhoCap1"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["nhomDvKhoCap1.ten"] || 0}
          searchSelect={
            <Select
              data={listNhomVatTu}
              placeholder="Ch???n nh??m v???t t??"
              onChange={onSearchInput("nhomDvKhoCap1Id")}
            />
          }
        />
      ),
      width: "160px",
      dataIndex: "nhomDvKhoCap1",
      key: "nhomDvKhoCap1",
      render: (item) => item?.ten,
    },
    {
      title: (
        <HeaderSearch
          sort_key="maKyHieu"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.maKyHieu || 0}
          search={
            <Input
              placeholder="Nh???p m?? k?? hi???u"
              onChange={onSearchInput("maTt37")}
            />
          }
          title="M?? k?? hi???u"
        />
      ),
      width: "130px",
      dataIndex: "maKyHieu",
      key: "maKyHieu",
    },
    {
      title: (
        <HeaderSearch
          sort_key="dvtSoCap.ten"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["dvtSoCap.ten"] || 0}
          searchSelect={
            <Select
              data={listDonViSoCap}
              placeholder="Ch???n ????n v??? s?? c???p"
              onChange={onSearchInput("dvtSoCapId")}
            />
          }
          title="????n v??? s?? c???p"
        />
      ),
      width: "150px",
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
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["dichVu.donViTinh.ten"] || 0}
          searchSelect={
            <Select
              data={listDonViSoCap}
              placeholder="Ch???n ????n v??? th??? c???p"
              onChange={onSearchInput("dichVu.donViTinh.ten")}
            />
          }
          title="????n v??? th??? c???p"
        />
      ),
      width: "150px",
      dataIndex: "dichVu",
      key: "dichVu",
      render: (item) => {
        return item?.donViTinh?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="heSoDinhMuc"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.heSoDinhMuc || 0}
          search={
            <Input
              placeholder="Nh???p h??? s??? ?????nh m???c"
              onChange={onSearchInput("heSoDinhMuc")}
            />
          }
          title="H??? s??? ?????nh m???c"
        />
      ),
      width: "150px",
      dataIndex: "heSoDinhMuc",
      key: "heSoDinhMuc",
      align: "right",
    },
    {
      title: (
        <HeaderSearch
          sort_key="thongSoKyThuat"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.thongSoKyThuat || 0}
          search={
            <Input
              placeholder="Nh???p th??ng s??? k??? thu???t"
              onChange={onSearchInput("thongSoKyThuat")}
            />
          }
          title="Th??ng s??? k??? thu???t"
        />
      ),
      width: "160px",
      dataIndex: "thongSoKyThuat",
      key: "thongSoKyThuat",
      align: "right",
    },
    {
      title: (
        <HeaderSearch
          sort_key="quyCach"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.quyCach || 0}
          search={
            <Input
              placeholder="Nh???p quy c??ch"
              onChange={onSearchInput("quyCach")}
            />
          }
          title="Quy c??ch"
        />
      ),
      width: "100px",
      dataIndex: "quyCach",
      key: "quyCach",
      align: "right",
    },
    {
      title: (
        <HeaderSearch
          sort_key="xuatXu.ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["xuatXu.ten"] || 0}
          searchSelect={
            <Select
              data={listXuatXu}
              placeholder="Ch???n n?????c s???n xu???t"
              onChange={onSearchInput("xuatXuId")}
            />
          }
          title="N?????c s???n xu???t"
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
              placeholder="Ch???n n?????c s???n xu???t"
              onChange={onSearchInput("nhaSanXuatId")}
            />
          }
          title="Nh?? s???n xu???t"
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
              placeholder="Ch???n nh?? cung c???p"
              onChange={onSearchInput("nhaCungCapId")}
            />
          }
          title="Nh?? cung c???p"
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
          sort_key="giaNhap"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.giaNhap || 0}
          search={
            <Input
              placeholder="T??m gi?? nh???p"
              onChange={onSearchInput("giaNhap")}
            />
          }
          title="Gi?? nh???p"
        />
      ),
      width: 130,
      dataIndex: "giaNhap",
      key: "giaNhap",
      align: "right",
    },
    // {
    //   title: (
    //     <HeaderSearch
    //       sort_key="giaTran"
    //       onClickSort={onClickSort}
    //       dataSort={dataSortColumn.giaTran || 0}
    //       search={
    //         <Input
    //           placeholder="T??m gi?? tr???n"
    //           onChange={onSearchInput("giaTran")}
    //         />
    //       }
    //       title="Gi?? tr???n"
    //     />
    //   ),
    //   width: 130,
    //   dataIndex: "giaTran",
    //   key: "giaTran",
    //   align: "right",
    //   render: (field, _, __) => (field && formatNumber(field)) || "",
    // },
    {
      title: (
        <HeaderSearch
          sort_key="tranBaoHiem"
          onClickSort={onClickSort}
          dataSort={dataSortColumn.tranBaoHiem || 0}
          search={
            <Input
              placeholder="T??m gi?? tr???n BH"
              onChange={onSearchInput("tranBaoHiem")}
            />
          }
          title="Tr???n b???o hi???m"
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
              placeholder="T??m t??? l??? BHTT"
              onChange={onSearchInput("dichVu.tyLeBhTt")}
            />
          }
          title="T??? l??? BH thanh to??n"
        />
      ),
      width: 150,
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
          sort_key="dichVu.tyLeTtDv"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.tyLeTtDv"] || 0}
          search={
            <Input
              placeholder="T??m t??? l??? TTDV"
              onChange={onSearchInput("dichVu.tyLeTtDv")}
            />
          }
          title="T??? l??? thanh to??n DV"
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: "dichVu",
      align: "right",
      render: (item) => {
        return item?.tyLeTtDv;
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
              placeholder="Ch???n nh??m chi ph??"
              onChange={onSearchInput("dichVu.nhomChiPhiBh")}
            />
          }
          title="Nh??m chi ph??"
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
              placeholder="Ch???n nh??m DV c???p 1"
              onChange={onSearchInput("dichVu.nhomDichVuCap1Id")}
            />
          }
          title="Nh??m DV c???p 1"
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
              placeholder="Ch???n DV c???p 2"
              onChange={onSearchInput("dichVu.nhomDichVuCap2Id")}
            />
          }
          title="Nh??m DV c???p 2"
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
              placeholder="Ch???n DV c???p 3"
              onChange={onSearchInput("dichVu.nhomDichVuCap3Id")}
            />
          }
          title="Nh??m DV c???p 3"
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
              placeholder="T??m m?? t????ng ??????ng"
              onChange={onSearchInput("dichVu.maTuongDuong")}
            />
          }
          title="M?? t????ng ??????ng"
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
              placeholder="T??m t??n t????ng ??????ng"
              onChange={onSearchInput("dichVu.tenTuongDuong")}
            />
          }
          title="T??n t????ng ??????ng"
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
          sort_key="vatTuBo"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.vatTuBo || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Ch???n v???t t?? b???"
              onChange={onSearchInput("vatTuBo")}
            />
          }
          title="V???t t?? b???"
        />
      ),
      width: "130px",
      dataIndex: "vatTuBo",
      key: "vatTuBo",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="vatTuKichThuoc"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["vatTuKichThuoc"] || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Ch???n v???t t?? b???"
              onChange={onSearchInput("vatTuKichThuoc")}
            />
          }
          title="V???t t?? theo k??ch th?????c"
        />
      ),
      width: "160px",
      dataIndex: "vatTuKichThuoc",
      key: "vatTuKichThuoc",
      align: "center",
      render: (item) => {
        console.log(item);
        return <Checkbox checked={item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="kyThuatCao"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["kyThuatCao"] || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Ch???n k??? thu???t cao"
              onChange={onSearchInput("kyThuatCao")}
            />
          }
          title="K??? thu???t cao"
        />
      ),
      width: "130px",
      dataIndex: "kyThuatCao",
      key: "kyThuatCao",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
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
              placeholder="T??m ngu???n chi tr??? kh??c"
              mode="multiple"
              onChange={onSearchInput("dsNguonKhacChiTra")}
            />
          }
          title="Ngu???n kh??c chi tr???"
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
          sort_key="dichVu.khongTinhTien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["dichVu.khongTinhTien"] || 0}
          searchSelect={
            <Select
              data={KHONG_TINH_TIEN}
              placeholder="Ch???n t??nh ti???n"
              onChange={onSearchInput("dichVu.khongTinhTien")}
            />
          }
          title="Kh??ng t??nh ti???n"
        />
      ),
      width: 160,
      dataIndex: "dichVu",
      key: "dichVu",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item?.khongTinhTien} />;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["active"] || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Ch???n t??nh ti???n"
              onChange={onSearchInput("active")}
            />
          }
          title="C?? hi???u l???c"
        />
      ),
      width: "130px",
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
      title: "Th??ng tin v???t t??",
      key: 1,
      render: () => {
        return (
          <FormServiceInfo
            listNhomVatTu={listNhomVatTu}
            listDonViSoCap={AllUnit}
            // listQuocGia={listQuocGia}
            listXuatXu={listXuatXu}
            listNSX={listNSX}
            listNCC={listNCC}
            listnhomChiPhiBh={listnhomChiPhiBh}
            listNguonKhacChiTra={listNguonKhacChiTra}
            listNhomDvCap1={listNhomDvCap1}
            listNhomDvCap2={listNhomDvCap2}
            listNhomDvCap3={listNhomDvCap3}
            roleSave={[ROLES["DANH_MUC"].VAT_TU_THEM]}
            roleEdit={[ROLES["DANH_MUC"].VAT_TU_SUA]}
            editStatus={
              editStatus
                ? !checkRole([ROLES["DANH_MUC"].VAT_TU_SUA])
                : !checkRole([ROLES["DANH_MUC"].VAT_TU_THEM])
            }
            currentItemRowParent={currentItem}
            hiddenField={["giaTran"]}
            optionalField={["nhomDichVuCap2Id"]}
          />
        );
      },
    },
  ];

  const onChangePage = (page) => {
    props.onSearch({ page: page - 1 });
  };

  const onSizeChange = (size) => {
    props.onSizeChange({ size: size });
  };

  const onShowAndHandleUpdate = (data = {}) => {
    setEditStatus(true);
    props.updateData({
      currentItem: data,
    });
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

  return (
    <Main>
      <HomeWrapper title="Danh m???c">
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
            title="Danh m???c v???t t??"
            scroll={{ x: 1000 }}
            styleMain={{ marginTop: 0 }}
            classNameRow={"custom-header"}
            styleContainerButtonHeader={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingRight: 35,
            }}
            buttonHeader={
              checkRole([ROLES["DANH_MUC"].VAT_TU_THEM])
                ? [
                    {
                      title: "Th??m m???i",
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
            dataSource={props.listData}
            onRow={onRow}
          ></TableWrapper>
          {totalElements ? (
            <Pagination
              listData={props?.listData}
              onChange={onChangePage}
              current={props.page + 1}
              pageSize={props.size}
              total={totalElements}
              onShowSizeChange={onSizeChange}
              style={{ flex: 1, justifyContent: "flex-end" }}
            />
          ) : null}
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
    danhMucVatTu: {
      listData,
      totalElements,
      page,
      size,
      dataSearch,
      dataSort,
      currentItem,
      dataSortColumn,
    },
    nhomDichVuKho: { listMeGrLv1: listNhomVatTu = [] },
    donViTinh: { listUnit: listDonViSoCap = [], AllUnit },
    // ttHanhChinh: { listQuocGia = [] },
    xuatXu: { listXuatXu = [] },
    nhaSanXuat: { listNSX, listNCC = [] },
    utils: { listnhomChiPhiBh = [], listNguonKhacChiTra = [] },
    nhomDichVuCap1: { listGroupService1: listNhomDvCap1 = [] },
    nhomDichVuCap2: { listGroupService2: listNhomDvCap2 = [] },
    nhomDichVuCap3: { listGroupService3: listNhomDvCap3 = [] },
  } = state;

  return {
    listData,
    totalElements,
    page,
    size,
    currentItem,
    dataSearch,
    dataSort,
    dataSortColumn,
    listNhomVatTu,
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
    AllUnit,
  };
};
const mapDispatchToProps = ({
  danhMucVatTu: {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
  },
  nhomDichVuKho: { getListMeGrLv1TongHop: searchNhomVatTu },
  donViTinh: {
    searchDonViTinh: searchDonViSoCap,
    searchTongHopDonViTinh,
    getAllUnit,
  },
  // ttHanhChinh: { getListQuocGia },
  xuatXu: { getListXuatXu, getListXuatXuTongHop },
  nhaSanXuat: { getListNhaSanXuat, getListTongHopNhaSanXuat },
  utils: { getUtils },
  nhomDichVuCap1: { searchDichVuCap1, searchTongHopDichVuCap1 },
  nhomDichVuCap2: { searchDichVuCap2, searchTongHopDichVuCap2 },
  nhomDichVuCap3: { searchDichVuCap3, searchTongHopDichVuCap3 },
}) => ({
  onSearch,
  onSizeChange,
  onSortChange,
  onChangeInputSearch,
  getUtils,
  updateData,
  searchNhomVatTu,
  searchDonViSoCap,
  // getListQuocGia,
  getListXuatXu,
  getListNhaSanXuat,
  searchDichVuCap1,
  searchDichVuCap2,
  searchDichVuCap3,
  getAllUnit,
  getListXuatXuTongHop,
  searchTongHopDichVuCap1,
  searchTongHopDichVuCap2,
  searchTongHopDichVuCap3,
  searchTongHopDonViTinh,
  getListTongHopNhaSanXuat,
});

export default connect(mapStateToProps, mapDispatchToProps)(DanhMucVatTu);
