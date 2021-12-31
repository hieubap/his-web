import React, { useEffect, useRef } from "react";
import TableWrapper from "components/TableWrapper";
import { Main, ContentTable } from "./styled";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import { connect, useSelector, useDispatch } from "react-redux";
import { useHistory, withRouter } from "react-router-dom";
import moment from "moment";
import ModalLichSuKy from "../ModalLichSuKy";

let timer = null;

const DanhSach = (props) => {
  const refModalLichSuKy = useRef(null);
  const { dsKhoId, dsTrangThai, tenNb, dataSortColumn } = useSelector(
    (state) => state.lichSuKyLichSuPhieu
  );
  const { listtrangThaiKy } = useSelector((state) => state.utils);
  const { listKhoUser } = useSelector((state) => state.kho);
  const { searchByParams, onSortChange } = useDispatch().lichSuKyLichSuPhieu;
  const { getFilePdf } = useDispatch().lichSuKyLichSuPhieu;
  const {
    getListPhieuNhap,
    onSizeChange,
    listPhieuNhap,
    getUtils,
    listTrangThaiPhieuNhapXuat,
    totalElements,
    page,
    size,
    updateDataNhapKho,
    phieuNhapXuatId,
    onChangeInputSearch,
    updateData,

    //thuốc
    getList,
    listData,
  } = props;

  useEffect(() => {
    getUtils({ name: "trangThaiKy" });
    onSizeChange({
      nbDotDieuTriId: props?.match?.params?.id,
      soPhieu: props?.match?.params?.lichSuPhieuId,
    });
    // onSizeChange({nbDotDieuTriId : props?.match?.params?.id , soPhieu : 74});
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

  const showChiTiet = () => {
    updateData({ chiTiet: false });
  };

  const history = useHistory();

  const onRow = (record) => {
    return {
      onClick: () => {
        const { id } = record;
        refModalLichSuKy.current.show({
          fileLink: record?.fileSauKy || record?.fileTruocKy,
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

  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e?.target) {
      value = e.target.value;
    } else if (e?._d) value = e.format("YYYY-MM-DD");
    else value = e;
    clearTimeout(timer);
    timer = setTimeout(() => {
      onChangeInputSearch({ [key]: value });
    }, 300);
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
          title="Người ký"
          sort_key="tenNguoiKy"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenNguoiKy"] || ""}
        />
      ),
      width: "100px",
      dataIndex: "tenNguoiKy",
      key: "tenNguoiKy",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Loại chữ ký"
          sort_key="loaiKy"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["loaiKy"] || ""}
        />
      ),
      width: "100px",
      dataIndex: "loaiKy",
      key: "loaiKy",
      render: (item) => {
        return item === 0 ? "Ký số" : "Ký điện tử";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Thời gian ký"
          sort_key="thoiGianKy"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["thoiGianKy"] || ""}
        />
      ),
      width: "50px",
      dataIndex: "thoiGianKy",
      key: "thoiGianKy",
      render: (item) => {
        return item && moment(item)?.format("DD/MM/YYYY");
      },
    },
    {
      title: (
        <HeaderSearch
          title="Thời gian nhận"
          sort_key="thoiGianTrinhKy"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["thoiGianTrinhKy"] || ""}
        />
      ),
      width: "100px",
      dataIndex: "thoiGianTrinhKy",
      key: "thoiGianTrinhKy",
      align: "left",
      render: (item) => {
        return item && moment(item)?.format("DD/MM/YYYY");
      },
    },
    {
      title: (
        <HeaderSearch
          title="Mô tả"
          sort_key="moTa"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["moTa"] || ""}
        />
      ),
      width: "100px",
      dataIndex: "moTa",
      key: "moTa",
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
              refModalLichSuKy.current.show({
                fileLink: item?.fileSauKy || item?.fileTruocKy,
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
      <ModalLichSuKy ref={refModalLichSuKy} />
    </Main>
  );
};
const mapStateToProps = (state) => {
  const {
    lichSuKyLichSuPhieu: { listData, totalElements, page, size },
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
  lichSuKyLichSuPhieu: { getList, updateData, onSizeChange },
  thuocChiTiet: { updateData: updateDataThuocChiTiet },
  utils: { getUtils },
}) => ({
  getList,
  updateData,
  onSizeChange,
  getUtils,
  updateDataThuocChiTiet,
});
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DanhSach)
);
