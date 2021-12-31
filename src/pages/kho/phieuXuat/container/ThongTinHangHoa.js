import { Table } from "antd";
import empty from "assets/images/kho/empty.png";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import InputTimeout from "components/InputTimeout";
import HeaderSearch from "components/TableWrapper/headerSearch";
import moment from "moment";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import styled from "styled-components";
const Content = styled.div`
  .title {
    padding: 15px;
    padding-left: 30px;
    display: flex;
    .input-search {
      margin-left: 10px;
    }
  }
  table {
    border-collapse: collapse;
    .ant-table-cell {
      background-color: white;
      color: #03317c;
      padding: 8px;
    }
    .none-border-top {
      border-top: none;
    }
    th {
      font-weight: bold;
      border-top: 1px solid #c5cad3;
      .title-box {
        align-items: center;
      }
    }
    td:nth-child(2) {
      font-weight: bold;
      color: #0762f7;
    }
    td {
      background-color: white;
      border-right: none;
      border-bottom: none;
    }
    input,
    .ant-picker,
    .ant-select-selector {
      border-top: none;
      border-right: none;
      border-left: none;
    }
  }
`;
const blockInvalidChar = (e) => {
  if (
    (e.keyCode >= 48 && e.keyCode <= 57) ||
    (e.keyCode >= 96 && e.keyCode <= 105) || // các số trên bàn phím
    e.keyCode === 9 || // tab
    e.which === 8 || // dấu -
    e.keyCode === 37 || // mũi tên trái
    e.keyCode === 39 || // mũi tên phải
    e.keyCode === 190 // dấu .
  ) {
  } else {
    return e.preventDefault();
  }
};
const ThongTinHangHoa = (
  { edit = false, onChangeData = () => {}, trangThai },
  ref
) => {
  const [state, setState] = useState({
    dataRender: [],
    data: [],
  });

  useImperativeHandle(ref, () => ({
    updateData: (data) =>
      setState({
        data,
        dataRender: data,
      }),
  }));

  const handleSearch = (value) => {
    const searchStr = value.trim().toLowerCase();
    const newDataRender = (state.data || []).filter(
      (item) => item.dichVu?.ten?.trim().toLowerCase().indexOf(searchStr) !== -1
    );
    setState({ ...state, dataRender: newDataRender });
  };

  const handleSort = (key1, key2) => (key, value) => {
    if (value === 0) {
      handleSearch("");
      setState({
        ...state,
        sortKey: "",
        sortValue: 0,
      });
    } else {
      const newDataRender = state.data.sort((a, b) =>
        key2
          ? value === 1
            ? a[key1][key2] - b[key1][key2]
            : b[key1][key2] - a[key1][key2]
          : value === 1
          ? a[key1] - b[key1]
          : b[key1] - a[key1]
      );
      setState({
        ...state,
        dataRender: newDataRender,
        sortKey: key,
        sortValue: value,
      });
    }
  };

  const changeData = (id, key, value) => {
    const newDs = Object.assign([], state.data);
    const edit = newDs.find((item) => item.id === id);
    edit[key] = value;
    return onChangeData("dsNhapXuatChiTiet")(newDs);
  };

  const columns = [
    {
      title: (
        <HeaderSearch
          title="STT"
          dataSort={state.sortKey === "stt" ? state.sortValue : 0}
          sort_key="stt"
          onClickSort={handleSort("stt")}
        />
      ),
      key: "stt",
      width: 60,
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: (
        <HeaderSearch
          title="Tên hàng hóa"
          dataSort={state.sortKey === "tenHangHoa" ? state.sortValue : 0}
          sort_key="tenHangHoa"
          onClickSort={handleSort("dichVu", "ten")}
        />
      ),
      key: "tenHangHoa",
      width: "25%",
      render: (_, data) => (
        <div>
          <div>{data?.dichVu?.ten}</div>
          <div style={{ color: "#7A869A", fontWeight: 600 }}>
            {edit && trangThai === 10 ? (
              <InputTimeout
                data={data.ghiChu}
                placeholder="Nhập ghi chú"
                onChange={(value) => changeData(data.id, "ghiChu", value)}
              />
            ) : (
              data?.ghiChu
            )}
          </div>
        </div>
      ),
    },
    {
      title: (
        <HeaderSearch
          title="ĐVT"
          dataSort={state.sortKey === "dvt" ? state.sortValue : 0}
          sort_key="dvt"
          onClickSort={handleSort("dichVu", "tenDonViTinh")}
        />
      ),
      align: "center",
      key: "dvt",
      render: (_, data) => data.dichVu?.tenDonViTinh,
    },
    {
      title: (
        <HeaderSearch
          title="Hàm lượng"
          dataSort={state.sortKey === "hamLuong" ? state.sortValue : 0}
          sort_key="hamLuong"
          onClickSort={handleSort("dichVu", "hamLuong")}
        />
      ),
      key: "hamLuong",
      align: "right",
      width: "20%",
      render: (_, data) => data.dichVu?.hamLuong,
    },
    {
      title: (
        <HeaderSearch
          title="SL dự trù"
          dataSort={state.sortKey === "slDuTru" ? state.sortValue : 0}
          sort_key="slDuTru"
          onClickSort={handleSort("soLuongYeuCau")}
        />
      ),
      key: "slDuTru",
      align: "right",
      dataIndex: "soLuongYeuCau",
    },
    {
      title: (
        <HeaderSearch
          title="SL duyệt"
          dataSort={state.sortKey === "slDuyet" ? state.sortValue : 0}
          sort_key="slDuyet"
          onClickSort={handleSort("soLuong")}
        />
      ),
      key: "slDuyet",
      align: "right",
      width: "10%",
      dataIndex: "soLuong",
      render: (item, data) =>
        edit ? (
          <InputTimeout
            data={item}
            onChange={(sl) => changeData(data.id, "soLuong", sl)}
            onKeyDown={blockInvalidChar}
          />
        ) : (
          item
        ),
    },
    {
      title: (
        <HeaderSearch
          title="Số lô"
          dataSort={state.sortKey === "soLo" ? state.sortValue : 0}
          sort_key="soLo"
          onClickSort={handleSort("loNhap", "soLo")}
        />
      ),
      key: "soLo",
      align: "right",
      render: (_, data) => data.loNhap?.soLo,
    },
    {
      title: (
        <HeaderSearch
          title="Hạn sử dụng"
          dataSort={state.sortKey === "hanSuDung" ? state.sortValue : 0}
          sort_key="hanSuDung"
          onClickSort={handleSort("loNhap", "ngayHanSuDung")}
        />
      ),
      key: "hanSuDung",
      align: "right",
      render: (_, data) =>
        data.loNhap?.ngayHanSuDung &&
        moment(data.loNhap?.ngayHanSuDung).format("DD/MM/YYYY"),
    },
  ];
  return (
    <Content>
      <div className="title">
        <span>
          <b>Thông tin hàng hóa</b>
        </span>
        <span>
          <div className="input-search">
            <img src={IconSearch} alt="IconSearch" className="icon-search" />
            <InputTimeout
              style={{ width: "300px" }}
              placeholder="Nhập hoặc quét mã dịch vụ, tên dịch vụ"
              onChange={(value) => handleSearch(value)}
            ></InputTimeout>
          </div>
        </span>
      </div>
      <Table
        locale={{
          emptyText: (
            <div style={{ padding: "50px 0" }}>
              <img src={empty} />
              <div style={{ padding: "10px 0" }}>Không có hàng hóa</div>
            </div>
          ),
        }}
        showSorterTooltip={false}
        columns={columns}
        dataSource={state.dataRender}
        pagination={false}
        rowKey={(record) => record.id}
      />
    </Content>
  );
};

export default forwardRef(ThongTinHangHoa);
