import React, { useEffect } from "react";
import TableWrapper from "components/TableWrapper";
import { Main, ContentTable } from "./styled";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import { connect, useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { GIOI_TINH_VNI } from "constants/index";
import moment from "moment";
let timer = null;

const DanhSach = (props) => {
  const { dsKhoId, dsTrangThai, tenNb, dataSortColumn } = useSelector(state => state.lichSuKyDanhSachNguoiBenh)
  const { listKhoUser } = useSelector(state => state.kho)
  const { searchThuocByParams, onSortChange } = useDispatch().lichSuKyDanhSachNguoiBenh
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
    let obj = {
      dsTrangThai,
      dsKhoId,
    }
    for (let i in obj) { // xóa param search bằng null hoặc không có
      if (!obj[i] || obj[i]?.length === 0) {
        delete obj[i]
      }
    }
    onSizeChange(obj);
    getUtils({ name: "TrangThaiPhieuNhapXuat" });
  }, []);
  useEffect(() => {
    if (listKhoUser.length > 0) { // random kho khi render lần đầu
      const list = listKhoUser.map(item => item.id)
      const randomId = list[~~(Math.random() * list.length)] // random 
      updateData({
        dsKhoId: [randomId]
      })
      let obj = {
        dsTrangThai,
        dsKhoId,
      }
      for (let i in obj) { // xóa param search bằng null hoặc không có
        if (!obj[i] || obj[i]?.length === 0) {
          delete obj[i]
        }
      }
      onSizeChange(obj);
    }
  }, [listKhoUser]);
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
        history.push('/ky-so/lich-su-ky/danh-sach-nguoi-benh/danh-sach-phieu/' + id)
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
      width: "22px",
      dataIndex: "index",
      key: "index",
      align: "center",
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
        return <b>{item}</b>
      }
    },
    {
      title: (
        <HeaderSearch
          title="Mã người bệnh"
          sort_key="maNb"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["maNb"] || ""}
        />
      ),
      width: "50px",
      dataIndex: "maNb",
      key: "maNb",
      render: (item) => {
        return <b>{item}</b>
      }
    },
    {
      title: (
        <HeaderSearch
          title="Họ tên"
          sort_key="tenNb"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenNb"] || ""}
        />
      ),
      width: "150px",
      dataIndex: "tenNb",
      key: "tenNb",
    },
    {
      title: (
        <HeaderSearch
          title="Ngày sinh"
          sort_key="ngaySinh"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ngaySinh"] || ""}
        />
      ),
      width: "50px",
      dataIndex: "ngaySinh",
      key: "ngaySinh",
      render: (item) => {
        return item && moment(item).format("DD/MM/YYYY") || "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Giới tính"
          sort_key="gioiTinh"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["gioiTinh"] || ""}
        />
      ),
      width: "30px",
      dataIndex: "gioiTinh",
      key: "gioiTinh",
      render: (item) => {
        return item && GIOI_TINH_VNI[item];
      },
    },
    {
      title: (
        <HeaderSearch
          title="Địa chỉ"
        />
      ),
      width: "150px",
      dataIndex: "nbDiaChi",
      key: "nbDiaChi",
      render: (item) => {
        return item.diaChi;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Xem danh sách phiếu"
        />
      ),
      width: "60px",
      align: "center",
      render: (item) => {
        return <img src={require("assets/images/utils/eye.png")} alt="" onClick={() => history.push('/ky-so/lich-su-ky/danh-sach-nguoi-benh/danh-sach-phieu/' + item.id)} />;
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
    </Main>
  );
};
const mapStateToProps = (state) => {
  const {
    lichSuKyDanhSachNguoiBenh: { listData, totalElements, page, size },
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
  lichSuKyDanhSachNguoiBenh: { getList, updateData, onSizeChange },
  utils: { getUtils },

}) => ({
  getList,
  updateData,
  onSizeChange,
  getUtils,
});
export default connect(mapStateToProps, mapDispatchToProps)(DanhSach);
