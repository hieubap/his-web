import { Select } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import Pagination from "components/Pagination";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ContentTable, Main } from "./styled";
import { sortString } from "utils";

const { Option } = Select;

const DsDichVu = ({
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
      data: dsDvKt.filter((item) => item.maHoSo === selectedMaHs),
      dataRender: dsDvKt.filter((item) => item.maHoSo === selectedMaHs),
    });
  }, [dsDvKt, selectedMaHs]);

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
          title="Tên dịch vụ"
          sort_key="tenDichVu"
          onClickSort={handleSort(true)}
          dataSort={(state.sort?.key === "tenDichVu" && state.sort?.value) || 0}
        />
      ),
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      width: 250,
    },
    {
      title: (
        <HeaderSearch
          title="Trạng thái"
          sort_key="trangThai"
          dataSort={(state.sort?.key === "trangThai" && state.sort?.value) || 0}
          onClickSort={handleSort(false)}
        />
      ),
      dataIndex: "trangThai",
      key: "trangThai",
      align: "center",
      width: 150,
      render: (item) => listtrangThaiDichVu.find((e) => e.id === item)?.ten,
    },
    {
      title: (
        <HeaderSearch
          title="Thành tiền"
          sort_key="thanhTien"
          dataSort={(state.sort?.key === "thanhTien" && state.sort?.value) || 0}
          onClickSort={handleSort(false)}
        />
      ),
      dataIndex: "thanhTien",
      key: "thanhTien",
      align: "right",
      width: 150,
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
          sort_key="trangThaiHoan"
          onClickSort={handleSort(false)}
          dataSort={
            (state.sort?.key === "trangThaiHoan" && state.sort?.value) || 0
          }
        />
      ),
      dataIndex: "trangThaiHoan",
      key: "trangThaiHoan",
      width: 150,
      align: "center",
      render: (item) =>
        listtrangThaiHoan.find((element) => element.id === item)?.ten,
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
      width: 170,
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
          title="Phòng thực hiện"
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
    {
      title: (
        <HeaderSearch
          title="Thanh toán sau"
          sort_key="thanhToanSau"
          onClickSort={handleSort(false)}
          dataSort={
            (state.sort?.key === "thanhToanSau" && state.sort?.value) || 0
          }
        />
      ),
      dataIndex: "thanhToanSau",
      key: "thanhToanSau",
      width: 150,
      align: "center",
      render: (item) => <Checkbox checked={item} />,
    },
  ];

  console.log(totalElementDvKt);

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
    },
    utils: { listtrangThaiDichVu = [], listtrangThaiHoan = [] },
  }) => ({
    dsDvKt,
    totalElementDvKt,
    selectedMaHs,
    listtrangThaiDichVu,
    listtrangThaiHoan,
    nbDotDieuTriId,
    pageDv,
    sizeDv,
  }),
  ({ utils: { getUtils }, hoSoBenhAn: { updateData, getDvKt } }) => ({
    getUtils,
    getDvKt,
    updateData,
  })
)(DsDichVu);
