import { Select } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import Pagination from "components/Pagination";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ContentTable, Main } from "./styled";
import { sortString } from "utils";
import { firstLetterWordUpperCase, formatDecimal } from "utils";
import moment from "moment";
const { Option } = Select;

const VatTuHoSoBenhAn = ({
  dsDvKt,
  totalElementDvKt,
  selectedMaHs,
  getUtils,
  listtrangThaiDichVu,
  listtrangThaiHoan,
  getDvKt,
  nbDotDieuTriId,
  updateData,
  pageDv,
  sizeDv,
  listDvThuoc,
  listDvVatTu
}) => {
  const [state, setState] = useState({
    page: 1,
    size: 10,
    data: [],
  });
  useEffect(() => {
    getUtils({ name: "trangThaiDichVu" });
    getUtils({ name: "trangThaiHoan" });
  }, []);
  useEffect(() => {
    setState({
      ...state,
      data: listDvVatTu?.filter((item) => item.maHoSo === selectedMaHs),
      dataRender: listDvVatTu?.filter((item) => item.maHoSo === selectedMaHs),
    });
  }, [listDvVatTu, selectedMaHs]);

  const handleSort = (isString) => (key, value) => {
    const newDataRender = Object.assign([], state.data);
    if (value != 0) {
      if (isString) {
        newDataRender.sort(sortString(key, value));
      } else {
        newDataRender.sort((a, b) =>
          value === 1 ? a[key] - b[key] : b[key] - a[key]
        );
      }
    }
    setState({ ...state, dataRender: newDataRender, sort: { key, value } });
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      key: "stt",
      width: 50,
      align: "right",
      ellipsis: {
        showTitle: false,
      },
      render: (_, data, index) => (pageDv - 1) * sizeDv + index + 1,
    },
    {
      title: (
        <HeaderSearch
          title="Tên Vật tư"
          sort_key="ten"
          onClickSort={handleSort(true)}
          dataSort={(state.sort?.key === "ten" && state.sort?.value) || 0}
        />
      ),
      dataIndex: "ten",
      key: "ten",
      width: 250,
    },
    {
      title: (
        <HeaderSearch
          title="SL kê"
          sort_key="soLuongYeuCau"
          dataSort={(state.sort?.key === "soLuongYeuCau" && state.sort?.value) || 0}
          onClickSort={handleSort(false)}
        />
      ),
      dataIndex: "soLuongYeuCau",
      key: "soLuongYeuCau",
      align: "right",
      width: 250,
      render: (item) => item,
    },
    {
      title: (
        <HeaderSearch
          title="SL dùng"
          sort_key="soLuong"
          dataSort={(state.sort?.key === "soLuong" && state.sort?.value) || 0}
          onClickSort={handleSort(false)}
        />
      ),
      dataIndex: "soLuong",
      key: "soLuong",
      align: "right",
      width: 150,
    },
    {
      title: (
        <HeaderSearch
          title="Thành tiền"
          sort_key="thanhTien"
          onClickSort={handleSort(false)}
          dataSort={(state.sort?.key === "thanhTien" && state.sort?.value) || 0}
        />
      ),
      dataIndex: "thanhTien",
      key: "thanhTien",
      width: 150,
      align: "right",
      render: (item) => formatDecimal(item),
    },
    {
      title: (
        <HeaderSearch
          title="Đã phát"
          sort_key="phat"
          onClickSort={handleSort(false)}
          dataSort={(state.sort?.key === "phat" && state.sort?.value) || 0}
        />
      ),
      dataIndex: "phat",
      key: "phat",
      width: 150,
      align: "center",
      render: (item) => <Checkbox checked={item} />,
    },
    {
      title: (
        <HeaderSearch
          title="TT thanh toán"
          sort_key="thanhToan"
          onClickSort={handleSort(false)}
          dataSort={(state.sort?.key === "thanhToan" && state.sort?.value) || 0}
        />
      ),
      dataIndex: "thanhToan",
      key: "thanhToan",
      width: 150,
      align: "center",
      render: (item) => <Checkbox checked={item} />,
    },
    {
      title: (
        <HeaderSearch
          title="TT Hoàn"
          sort_key="tenPhongThucHien"
          onClickSort={handleSort(true)}
          dataSort={
            (state.sort?.key === "tenPhongThucHien" && state.sort?.value) || 0
          }
        />
      ),
      dataIndex: "tenPhongThucHien",
      key: "tenPhongThucHien",
      width: 200,
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="BS chỉ định"
          sort_key="tenBacSiChiDinh"
          onClickSort={handleSort(true)}
          dataSort={
            (state.sort?.key === "tenBacSiChiDinh" && state.sort?.value) || 0
          }
        />
      ),
      dataIndex: "tenBacSiChiDinh",
      key: "tenBacSiChiDinh",
      width: 200,
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Khoa chỉ định"
          sort_key="tenKhoaChiDinh"
          onClickSort={handleSort(true)}
          dataSort={
            (state.sort?.key === "tenKhoaChiDinh" && state.sort?.value) || 0
          }
        />
      ),
      dataIndex: "tenKhoaChiDinh",
      key: "tenKhoaChiDinh",
      width: 200,
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Thg chỉ định"
          sort_key="thoiGianChiDinh"
          onClickSort={handleSort(true)}
          dataSort={
            (state.sort?.key === "thoiGianChiDinh" && state.sort?.value) || 0
          }
        />
      ),
      dataIndex: "thoiGianChiDinh",
      key: "thoiGianChiDinh",
      width: 200,
      align: "center",
      render: (item) => item && moment(item).format("DD/MM/YYYY")
    },
    {
      title: (
        <HeaderSearch
          title="Thg phát"
          sort_key="thoiGianDuyet"
          onClickSort={handleSort(true)}
          dataSort={
            (state.sort?.key === "thoiGianDuyet" && state.sort?.value) || 0
          }
        />
      ),
      dataIndex: "thoiGianDuyet",
      key: "thoiGianDuyet",
      width: 200,
      align: "center",
      render: (item) => item && moment(item).format("DD/MM/YYYY")
    },
    {
      title: (
        <HeaderSearch
          title="Tự trả"
          sort_key="tuTra"
          onClickSort={handleSort(false)}
          dataSort={(state.sort?.key === "tuTra" && state.sort?.value) || 0}
        />
      ),
      dataIndex: "tuTra",
      key: "tuTra",
      width: 150,
      align: "center",
      render: (item) => <Checkbox checked={item} />,
    },
    {
      title: (
        <HeaderSearch
          title="Không tính tiền"
          sort_key="khongTinhTien"
          onClickSort={handleSort(false)}
          dataSort={
            (state.sort?.key === "khongTinhTien" && state.sort?.value) || 0
          }
        />
      ),
      dataIndex: "khongTinhTien",
      key: "khongTinhTien",
      width: 150,
      align: "center",
      render: (item) => <Checkbox checked={item} />,
    },
  ];

  return (
    <Main>
      <ContentTable>
        <TableWrapper
          columns={columns}
          dataSource={(state.dataRender || []).slice(
            (pageDv - 1) * sizeDv,
            pageDv * sizeDv
          )}
          //   onRow={onRow}
          rowKey={(record) => record.id}
        //   rowClassName={setRowClassName}
        />
        <Pagination
          onChange={(pageDv) => updateData({ pageDv })}
          current={pageDv}
          pageSize={sizeDv}
          total={totalElementDvKt}
          onShowSizeChange={(sizeDv) => updateData({ sizeDv, pageDv: 1 })}
          stylePagination={{ flex: 1, justifyContent: "flex-start" }}
        />
      </ContentTable>
    </Main>
  );
};

export default connect(
  ({
    hoSoBenhAn: {
      dsDvKt,
      totalElementDvKt,
      selectedMaHs,
      nbDotDieuTriId,
      pageDv,
      sizeDv,
      listDvVatTu
    },
    utils: { listtrangThaiDichVu = [], listtrangThaiHoan = [] },
    chiDinhDichVuKho : {listDvThuoc}
  }) => ({
    dsDvKt,
    totalElementDvKt,
    selectedMaHs,
    listtrangThaiDichVu,
    listtrangThaiHoan,
    nbDotDieuTriId,
    pageDv,
    sizeDv,
    listDvThuoc,
    listDvVatTu
  }),
  ({ utils: { getUtils }, hoSoBenhAn: { updateData, getDvKt } }) => ({
    getUtils,
    getDvKt,
    updateData,
  })
)(VatTuHoSoBenhAn);
