import React, { useEffect, useRef } from "react";
import TableWrapper from "components/TableWrapper";
import { Main, ContentTable } from "./styled";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import { connect, useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ModalPhieu from "../ModalPhieu";
import moment from "moment";
let timer = null;

const DanhSach = (props) => {
  const refModalPhieu = useRef(null);
  const history = useHistory();
  const { dataSortColumn } = useSelector((state) => state.danhSachPhieuChoKy);

  const { onSortChange, updateData } = useDispatch().danhSachPhieuChoKy;
  const {
    onSizeChange,
    getUtils,
    listTrangThaiPhieuNhapXuat,
    totalElements,
    page,
    size,
    phieuNhapXuatId,
    getList,
    listData,
  } = props;

  useEffect(() => {
    getUtils({ name: "trangThaiKy" });
    onSizeChange({});
    return () => {
      updateData({
        dataSortColumn: {},
        maHoSo: "",
        dataSearch: {},
      });
    };
  }, []);
  const onClickSort = (key, value) => {
    onSortChange({ [key]: value });
  };
  const onChangePage = (page) => {
    getList({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size });
  };

  const onRow = (record) => {
    return {
      onClick: () => {
        const { id } = record;
        // history.push('/ky-so/danh-sach-phieu-cho-ky/chi-tiet/' + id)
        refModalPhieu.current.show({
          fileLink: record.fileTruocKy,
          item: record,
        });
      },
    };
  };

  const setRowClassName = (record) => {
    let idDiff;
    idDiff = phieuNhapXuatId;
    return record.id === idDiff ? "row-actived" : "";
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "15px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Tên phiếu"
          sort_key="tenBaoCao"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenBaoCao"] || ""}
        />
      ),
      width: "100px",
      dataIndex: "tenBaoCao",
      key: "tenBaoCao",
      render: (item) => {
        return <b>{item}</b>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Mã hồ sơ"
          sort_key="maHoSo"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["maHoSo"] || ""}
        />
      ),
      width: "50px",
      dataIndex: "maHoSo",
      key: "maHoSo",
      render: (item) => {
        return <b>{item}</b>;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Họ và tên NB"
          sort_key="tenNb"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenNb"] || ""}
        />
      ),
      width: "100px",
      dataIndex: "tenNb",
      key: "tenNb",
    },
    {
      title: (
        <HeaderSearch
          title="Người trình ký"
          sort_key="tenNguoiTrinhKy"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenNguoiTrinhKy"] || ""}
        />
      ),
      width: "100px",
      dataIndex: "tenNguoiTrinhKy",
      key: "tenNguoiTrinhKy",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Thời gian trình ký"
          sort_key="thoiGianTrinhKy"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["thoiGianTrinhKy"] || ""}
        />
      ),
      width: "50px",
      dataIndex: "thoiGianTrinhKy",
      key: "thoiGianTrinhKy",
      render: (item) => {
        return moment(item)?.format("DD/MM/YYYY");
      },
    },
    {
      title: (
        <HeaderSearch
          title="Xem phiếu"
          // sort_key="diaChi"
          // onClickSort={onClickSort}
          // dataSort={dataSortColumn["soPhieu"] || ""}
        />
      ),
      width: "30px",
      // dataIndex: "diaChi",
      // key: "diaChi",
      align: "center",
      render: (item) => {
        return (
          <img
            src={require("assets/images/utils/eye.png")}
            alt=""
            onClick={() => {
              refModalPhieu.current.show({
                fileLink: item.fileTruocKy,
                item: item,
              });
            }}
          />
        );
      },
    },
  ];
  return (
    <Main>
      <ContentTable>
        <TableWrapper
          columns={columns}
          dataSource={listData}
          onRow={onRow}
          rowKey={(record) => `${record.id}`}
          rowClassName={setRowClassName}
        />
        <Pagination
          listData={listData}
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          total={totalElements}
          onShowSizeChange={handleSizeChange}
          stylePagination={{ flex: 1, justifyContent: "flex-start" }}
        />
      </ContentTable>
      <ModalPhieu ref={refModalPhieu} />
    </Main>
  );
};
const mapStateToProps = (state) => {
  const {
    danhSachPhieuChoKy: { listData, totalElements, page, size },
    utils: { listTrangThaiPhieuNhapXuat = [] },
  } = state;
  return {
    listData,
    listTrangThaiPhieuNhapXuat,
    totalElements,
    page,
    size,
  };
};
const mapDispatchToProps = ({
  danhSachPhieuChoKy: { getList, updateData, onSizeChange },
  utils: { getUtils },
}) => ({
  getList,
  updateData,
  onSizeChange,
  getUtils,
});
export default connect(mapStateToProps, mapDispatchToProps)(DanhSach);
