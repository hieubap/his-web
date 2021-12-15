import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Breadcrumb from "components/Breadcrumb";
import { HomeWrapper } from "components";
import { Main } from "./styled";
import HeaderSearchPhieuHoan from "./components/headerSearch";
import { HeaderSearch, TableWrapper } from "components";
import { checkRole } from "app/Sidebar/constant";
import { Checkbox, Input } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import viewItem from "assets/svg/thuNgan/viewItem.svg";
import Icon from "@ant-design/icons";
import Pagination from "components/Pagination";
import { ROLES } from "constants/index";
import { useHistory } from "react-router";
const DsPhieuYeuCauHoan = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const { totalElements, listData, page, size, dataSortColumn } = useSelector(
    (state) => state.danhSachPhieuYeuCauHoan
  );

  const auth = useSelector((state) => state.auth.auth);

  const { onSizeChange, onSortChange, onSearch } =
    dispatch.danhSachPhieuYeuCauHoan;
  const { getUtils } = dispatch.utils;
  const roles = auth?.authorities || [];
  useEffect(() => {
    onSizeChange({
      size: 10,
      dataSearch: { dsTrangThai: 20 },
      dataSortColumn: {},
    });
    getUtils({ name: "trangThaiPhieuDoiTra" });
  }, []);
  const onClickSort = (key, value) => {
    onSortChange({
      [key]: value,
    });
  };
  const handleSizeChange = (size) => {
    onSizeChange({ size });
  };
  const onRow = (record) => {
    return {
      onClick: () => {
        if (!checkRole([ROLES["THU_NGAN"].CHI_TIET_PHIEU_HOAN_TRA], roles))
          return;
        const { maHoSo, id, nbDotDieuTriId, soPhieu } = record;
        history.push(
          `/thu-ngan/chi-tiet-phieu-hoan-tra/${maHoSo}/${id}/${nbDotDieuTriId}`
        );
      },
    };
  };
  const handleChangePage = (page) => {
    onSearch({ page });
  };
  const columnsGroup = [
    {
      title: <HeaderSearch title="STT" />,
      width: 40,
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Số phiếu"
          sort_key="soPhieu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.soPhieu || 0}
        />
      ),
      width: 90,
      dataIndex: "soPhieu",
      key: "soPhieu",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã NB"
          sort_key="maNb"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.maNb || 0}
        />
      ),
      width: 120,
      dataIndex: "maNb",
      key: "maNb",
      align: "center",
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
      width: 200,
      dataIndex: "tenNb",
      key: "tenNb",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Tiền NB trả thêm"
          sort_key="tienNbTraThem"
          // onClickSort={onClickSort}
          dataSort={dataSortColumn?.tienNbTraThem || 0}
        />
      ),
      width: 120,
      dataIndex: "tienNbTraThem",
      key: "tienNbTraThem",
      align: "right",
      render: (item) => {
        return item?.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tổng tiền DV trả lại"
          sort_key="tongDichVuTraLai"
          // onClickSort={onClickSort}
          dataSort={dataSortColumn?.thanhTienMoi || 0}
        />
      ),
      width: 120,
      dataIndex: "tongDichVuTraLai",
      key: "tongDichVuTraLai",
      align: "right",
      render: (item) => {
        return item?.formatPrice();
      },
    },

    {
      title: (
        <HeaderSearch
          title="Tổng tiền DV mới"
          sort_key="thanhTienMoi"
          // onClickSort={onClickSort}
          dataSort={props?.dataSortColumn?.active || 0}
        />
      ),
      width: 120,
      dataIndex: "thanhTienMoi",
      key: "thanhTienMoi",
      align: "right",
      render: (item) => {
        return item?.formatPrice();
      },
    },
    {
      title: (
        <HeaderSearch
          title="Thời gian yêu cầu"
          sort_key="thoiGianYeuCau"
          onClickSort={onClickSort}
          dataSort={dataSortColumn?.thoiGianYeuCau || 0}
        />
      ),
      width: 160,
      dataIndex: "thoiGianYeuCau",
      key: "thoiGianYeuCau",
      align: "center",
      render: (item) => {
        return <>{moment(item).format("DD/MM/YYYY hh:mm:ss")}</>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Trạng thái phiếu"
          sort_key="trangThai"
          // onClickSort={onClickSort}
          dataSort={props?.dataSortColumn?.trangThai || 0}
        />
      ),
      width: 140,
      dataIndex: "trangThai",
      key: "trangThai",
      align: "center",
      render: (item) => {
        return <>{item == 20 ? "Chờ hoàn" : "Hoàn thành"} </>;
      },
    },
    {
      title: <HeaderSearch title="Xem phiếu" sort_key="soPhieu" />,
      width: 100,
      dataIndex: "soPhieu",
      key: "soPhieu",
      align: "center",
      render: (item) => {
        return (
          <Icon
            component={viewItem}
            onClick={() => {
              console.log("soPhieu", item);
            }}
          ></Icon>
        );
      },
    },
  ];
  return (
    <Main>
      <Breadcrumb
        chains={[
          { title: "Thu ngân", link: "/thu-ngan" },
          {
            title: "Danh sách phiếu yêu cầu hoàn",
            link: "/thu-ngan/ds-phieu-yeu-cau-hoan",
          },
        ]}
      >
        <div className="title">Danh sách phiếu yêu cầu hoàn</div>
        <HeaderSearchPhieuHoan />
        <TableWrapper
          columns={columnsGroup}
          dataSource={listData || []}
          onRow={onRow}
        />
        {totalElements ? (
          <Pagination
            listData={listData}
            onChange={handleChangePage}
            current={page + 1}
            pageSize={size}
            total={totalElements}
            onShowSizeChange={handleSizeChange}
            style={{ flex: 1, justifyContent: "flex-end" }}
          />
        ) : null}
      </Breadcrumb>
    </Main>
  );
};

export default DsPhieuYeuCauHoan;
