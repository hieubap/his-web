import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Breadcrumb from "components/Breadcrumb";
import { Main } from "./styled";
import { HeaderSearch, TableWrapper } from "components";
import Pagination from "components/Pagination";
import { ROLES } from "constants/index";
import viewItem from "assets/svg/thuNgan/viewItem.svg";
import { checkRole } from "app/Sidebar/constant";
import Icon from "@ant-design/icons";
import moment from "moment";
import HeaderSearchHoaDon from "./component/headerSearchHoaDon";
import IcCreate from "assets/images/kho/IcCreate.png";

import { Button } from "antd";
import ModalDsNguoiBenh from "./component/modalDsBenhNhan";
import { useRef } from "react";
const DsHoaDonDienTu = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const refModalDsNb = useRef(null);
  const { getUtils } = dispatch.utils;
  const { listtrangThaiHoaDon } = useSelector((state) => state.utils);
  const { totalElements, listData, page, size, dataSortColumn } = useSelector(
    (state) => state.dsHoaDonDienTu
  );
  const auth = useSelector((state) => state.auth.auth);
  const { onSizeChange, onSortChange, onSearch } = dispatch.dsHoaDonDienTu;
  const onClickSort = (key, value) => {
    onSortChange({
      [key]: value,
    });
  };
  const roles = auth?.authorities || [];
  const handleChangePage = (page) => {
    onSearch({ page: page - 1 });
  };
  const handleSizeChange = (size) => {
    onSizeChange({ size });
  };
  const onRow = (record) => {
    return {
      onClick: () => {
        setState({
          dataSelect: record,
        });
      },
    };
  };
  const handleRedirect = (item) => {
    const { maHoSo, id } = item;
    history.push(`/thu-ngan/chi-tiet-hoa-don/${maHoSo}/${id}/12321`);
  };
  const setRowClassName = (record) => {
    let idDiff = state.dataSelect?.id;
    return record.id === idDiff ? "row-actived" : null;
  };
  useEffect(() => {
    onSizeChange({
      size: 10,
    });
    getUtils({ name: "trangThaiHoaDon" });
  }, []);

  const handleShowModal = () => {
    if (refModalDsNb.current) {
      refModalDsNb.current.show();
    }
  };
  const columnsGroup = [
    {
      title: <HeaderSearch title="STT" />,
      width: 80,
      dataIndex: "index",
      key: "index",
      align: "center",
      fixed: "left",
      render: (text, item, index) => index + 1,
    },
    {
      title: (
        <HeaderSearch
          title="Số hóa đơn"
          sort_key="soHoaDon"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.soHoaDon || 0}
        />
      ),
      width: 120,
      dataIndex: "soHoaDon",
      key: "soHoaDon",
      align: "left",
      fixed: "left",
    },
    {
      title: (
        <HeaderSearch
          title="Ký hiệu hóa đơn"
          sort_key="kiHieuHoaDon"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.kiHieuHoaDon || 0}
        />
      ),
      width: 150,
      dataIndex: "kiHieuHoaDon",
      key: "kiHieuHoaDon",
      align: "left",
      fixed: "left",
    },
    {
      title: (
        <HeaderSearch
          title="Tổng tiền hóa đơn"
          sort_key="thanhTien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.tongTien || 0}
        />
      ),
      width: 200,
      dataIndex: "thanhTien",
      key: "thanhTien",
      align: "right",
      render: (text) => text.formatPrice() || "",
    },
    {
      title: (
        <HeaderSearch
          title="Thời gian xuất hóa đơn"
          sort_key="thoiGianXuatHoaDon"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.thoiGianXuatHoaDon || 0}
        />
      ),
      width: 200,
      dataIndex: "thoiGianXuatHoaDon",
      key: "thoiGianXuatHoaDon",
      align: "left",
      render: (item) => {
        return moment(item).format("DD/MM/YYYY hh:mm:ss");
      },
    },
    {
      title: (
        <HeaderSearch
          title="Mã hồ sơ"
          sort_key="maHoSo"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.maHoSo || 0}
        />
      ),
      width: 120,
      dataIndex: "maHoSo",
      key: "maHoSo",
      align: "left",
    },

    {
      title: (
        <HeaderSearch
          title="Họ tên người bệnh"
          sort_key="tenNb"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.tenNb || 0}
        />
      ),
      width: 250,
      dataIndex: "tenNb",
      key: "tenNb",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          title="Tên công ty"
          sort_key="tenCongTy"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.tenCongTy || 0}
        />
      ),
      width: 250,
      dataIndex: "tenCongTy",
      key: "tenCongTy",
      align: "left",
    },

    {
      title: (
        <HeaderSearch
          title="Người xuất hóa đơn"
          sort_key="tenNguoiXuatHoaDon"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.tenNguoiXuatHoaDon || 0}
        />
      ),
      width: 200,
      dataIndex: "tenNguoiXuatHoaDon",
      key: "tenNguoiXuatHoaDon",
      align: "left",
    },

    {
      title: (
        <HeaderSearch
          title="Số hóa đơn gốc"
          sort_key="soHoaDonGoc"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.soHoaDonGoc || 0}
        />
      ),
      width: 200,
      dataIndex: "soHoaDonGoc",
      key: "soHoaDonGoc",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          title="Ký hiệu hóa đơn gốc"
          sort_key="kyHieuHoaDonGoc"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.kyHieuHoaDonGoc || 0}
        />
      ),
      width: 200,
      dataIndex: "kyHieuHoaDonGoc",
      key: "kyHieuHoaDonGoc",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          title="Trạng thái"
          sort_key="trangThaiHoaDon"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.trangThaiHoaDon || 0}
        />
      ),
      width: 140,
      dataIndex: "trangThaiHoaDon",
      key: "trangThaiHoaDon",
      align: "left",
      fixed: "right",
      render: (text) =>
        listtrangThaiHoaDon
          ? listtrangThaiHoaDon.find((item) => item.id == text).ten
          : "",
    },
    {
      title: <HeaderSearch title="Xem hóa đơn" sort_key="soPhieu" />,
      width: 150,
      dataIndex: "soHoaDon",
      key: "soHoaDon",
      align: "center",
      render: (text, item) => {
        return (
          <Icon
            component={viewItem}
            onClick={() => handleRedirect(item)}
          ></Icon>
        );
      },
      fixed: "right",
    },
  ];
  return (
    <Main>
      <Breadcrumb
        chains={[
          { title: "Thu ngân", link: "/thu-ngan" },
          {
            title: "Hóa đơn điện tử",
            link: "/thu-ngan/ds-hoa-don-dien-tu",
          },
        ]}
      >
        <div className="header-title">
          <div className="title">Hóa đơn điện tử</div>
          <Button className="btn-ok" onClick={handleShowModal}>
            <span> Thêm mới </span>
            <img src={IcCreate}></img>
          </Button>
        </div>
        <HeaderSearchHoaDon />
        <div className="wrapper">
          <TableWrapper
            columns={columnsGroup}
            dataSource={listData || []}
            onRow={onRow}
            scroll={{ x: 200 }}
            rowClassName={setRowClassName}
          />
          {totalElements ? (
            <Pagination
              listData={listData}
              onChange={handleChangePage}
              current={page + 1 || 1}
              pageSize={size || 10}
              total={totalElements || 15}
              onShowSizeChange={handleSizeChange}
              style={{ flex: 1, justifyContent: "flex-end" }}
            />
          ) : null}
        </div>
      </Breadcrumb>
      <ModalDsNguoiBenh ref={refModalDsNb}></ModalDsNguoiBenh>
    </Main>
  );
};

export default DsHoaDonDienTu;
