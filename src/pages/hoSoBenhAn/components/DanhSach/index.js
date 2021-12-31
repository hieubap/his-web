import React, { useEffect, useRef } from "react";
import TableWrapper from "components/TableWrapper";
import { Main, ContentTable } from "./styled";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";

const DanhSach = (props) => {
  const {
    dataSortColumn,
    onSizeChange,
    listThongTinNguoiBenh,
    totalElements,
    page,
    size,
    onChangeInputSearch,
    onSortChange,
    updateData,
    onSearchThongTinNguoiBenh,
  } = props;
  useEffect(() => {
    onSizeChange(10);
  }, []);

  const onChangePage = (page) => {
    onSearchThongTinNguoiBenh({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange(size);
  };

  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };

  const history = useHistory();

  const onRow = (record) => {
    return {
      onClick: () => {
        const { id } = record;
        history.push("/ho-so-benh-an/chi-tiet-nguoi-benh/" + id);
      },
    };
  };

  // const setRowClassName = (record) => {
  //   let idDiff;
  //   idDiff = phieuNhapXuatId;
  //   return record.id === idDiff ? "row-actived" : "";
  // };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "25px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Ngày đăng ký"
          sort_key="thoiGianVaoVien"
          dataSort={dataSortColumn["thoiGianVaoVien"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "thoiGianVaoVien",
      key: "thoiGianVaoVien",
      render: (field, item, index) =>
        field ? moment(field).format("DD / MM / YYYY") : "",
    },
    {
      title: (
        <HeaderSearch
          title="Mã NB"
          sort_key="maNb"
          dataSort={dataSortColumn["maNb"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "maNb",
      key: "maNb",
    },
    {
      title: (
        <HeaderSearch
          title="Họ tên"
          sort_key="tenNb"
          dataSort={dataSortColumn["tenNb"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "80px",
      dataIndex: "tenNb",
      key: "tenNb",
    },
    {
      title: (
        <HeaderSearch
          title="Ngày sinh"
          sort_key="ngaySinh"
          dataSort={dataSortColumn["ngaySinh"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "ngaySinh",
      key: "ngaySinh",
      render: (field, item, index) =>
        field ? moment(field).format("DD / MM / YYYY") : "",
    },
    {
      title: (
        <HeaderSearch
          title="Địa chỉ"
          sort_key="diaChi"
          dataSort={dataSortColumn["diaChi"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "150px",
      dataIndex: "diaChi",
      key: "diaChi",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Số điện thoại"
          sort_key="soDienThoai"
          dataSort={dataSortColumn["soDienThoai"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "soDienThoai",
      key: "soDienThoai",
    },
    {
      title: (
        <HeaderSearch
          title="Số thẻ BHYT"
          sort_key="maTheBhyt"
          dataSort={dataSortColumn["maTheBhyt"] || ""}
          onClickSort={onClickSort}
        />
      ),
      width: "100px",
      dataIndex: "maTheBhyt",
      key: "maTheBhyt",
      render: (item) => {
        return item;
      },
    },
  ];
  return (
    <Main>
      <ContentTable>
        <TableWrapper
          columns={columns}
          dataSource={listThongTinNguoiBenh}
          onRow={onRow}
          rowKey={(record) => `${record.id}`}
          // rowClassName={setRowClassName}
        />
        <Pagination
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          listData={listThongTinNguoiBenh}
          total={totalElements}
          onShowSizeChange={handleSizeChange}
          stylePagination={{ flex: 1, justifyContent: "flex-start" }}
        />
      </ContentTable>
    </Main>
  );
};

export default connect(
  (state) => ({
    dataSortColumn: state.information.dataSortColumn || {},
    listThongTinNguoiBenh: state.information.listThongTinNguoiBenh || [],
    totalElements: state.information.totalElements || 0,
    page: state.information.page || 0,
    size: state.information.size || 10,
  }),
  ({
    information: {
      onSizeChange,
      onChangeInputSearch,
      onSortChange,
      updateData,
      onSearch: onSearchThongTinNguoiBenh,
    },
  }) => ({
    onSizeChange,
    onChangeInputSearch,
    onSortChange,
    updateData,
    onSearchThongTinNguoiBenh,
  })
)(DanhSach);
