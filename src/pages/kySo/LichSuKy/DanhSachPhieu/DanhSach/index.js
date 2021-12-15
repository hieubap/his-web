import React, { useEffect, useRef } from "react";
import TableWrapper from "components/TableWrapper";
import { Main, ContentTable } from "./styled";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import { connect, useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ModalPhieu from "../ModalPhieu";
import { withRouter } from "react-router-dom";
import moment from "moment";
let timer = null;

const DanhSach = (props) => {
  const refModalPhieu = useRef(null)
  const history = useHistory();

  const { dsKhoId, dsTrangThai, tenNb, dataSortColumn } = useSelector(state => state.lichSuKyDanhSachPhieu)
  const { listKhoUser } = useSelector(state => state.kho)
  const { searchByParams, onSortChange } = useDispatch().lichSuKyDanhSachPhieu
  const {listtrangThaiKy} = useSelector(state => state.utils)
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
    onSizeChange({nbDotDieuTriId : props?.match?.params?.id});
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
        const { id , soPhieu} = record;
        history.push(`/ky-so/lich-su-ky/danh-sach-nguoi-benh/danh-sach-phieu/${props?.match?.params?.id}/lich-su-phieu/${soPhieu}`)
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
          title="Mã phiếu"
          sort_key="maBaoCao"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["maBaoCao"] || ""}
        />
      ),
      width: "100px",
      dataIndex: "maBaoCao",
      key: "maBaoCao",
      render: (item) => {
        return item
      }
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
        return item
      }
    },
    {
      title: (
        <HeaderSearch
          title="Số phiếu ký"
          sort_key="soPhieu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["soPhieu"] || ""}
        />
      ),
      width: "50px",
      dataIndex: "soPhieu",
      key: "soPhieu",
      render: (item) => {
        return item
      }
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
      width: "100px",
      dataIndex: "thoiGianKy",
      key: "thoiGianKy",
      render: (item) => {
        return item && moment(item).format("DD/MM/YYYY hh:mm:ss");
      },
    },
    {
      title: (
        <HeaderSearch
          title="Trạng thái phiếu"
          sort_key="trangThai"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["trangThai"] || ""}
        />
      ),
      width: "50px",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (item) => {
        return item && listtrangThaiKy?.find(obj => obj.id === item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Lịch sử ký"
        />
      ),
      width: "30px",
      align: "center",
      render: (item) => {
        return <img src={require("assets/images/utils/time-blue.png")} alt="" onClick={()=>{
          history.push(`/ky-so/lich-su-ky/danh-sach-nguoi-benh/danh-sach-phieu/${props.match.params.id}/lich-su-phieu/${item.soPhieu}`)
        }}/>;
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
          styleVersion={2}
          styleVersion={2}
          onChange={onChangePage}
          current={page + 1}
          pageSize={size}
          total={totalElements}
          onShowSizeChange={handleSizeChange}
          stylePagination={{ flex: 1, justifyContent: "flex-start" }}
        />
      </ContentTable>
      <ModalPhieu ref={refModalPhieu}/>
    </Main>
  );
};
const mapStateToProps = (state) => {
  const {
    lichSuKyDanhSachPhieu: { listData, totalElements, page, size },
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
  lichSuKyDanhSachPhieu: { getList, updateData, onSizeChange },
  thuocChiTiet: { updateData: updateDataThuocChiTiet },
  utils: { getUtils },

}) => ({
  getList,
  updateData,
  onSizeChange,
  getUtils,
  updateDataThuocChiTiet
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DanhSach));
