import React, { useEffect } from "react";
import TableWrapper from "components/TableWrapper";
import { Main, ContentTable } from "./styled";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import { connect, useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { formatDecimal } from "../../../utils";

let timer = null;

const DanhSachDonThuoc = (props) => {
  const { dsKhoId, dsTrangThai, tenNb, dataSortColumn } = useSelector(state => state.thuocKho)
  const { listKhoUser } = useSelector(state => state.kho)
  const { searchThuocByParams, onSortChange } = useDispatch().thuocKho
  const {
    getListPhieuNhap,
    onSizeChange,
    listPhieuNhap,
    getUtils,
    listTrangThaiDonThuocNhaThuoc,
    totalElements,
    page,
    size,
    updateDataNhapKho,
    phieuNhapXuatId,
    onChangeInputSearch,
    updateData,

    //thuốc
    getListThuoc,
    listThuoc,
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
    getUtils({ name: "TrangThaiDonThuocNhaThuoc" });
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
    getListThuoc({ page: page - 1 });
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
        history.push('/nha-thuoc/chi-tiet/' + id)
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
      width: "25px",
      dataIndex: "index",
      key: "index",
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="Mã NB"
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
          title="Tên người bệnh"
          sort_key="tenNb"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenNb"] || ""}
        />
      ),
      width: "100px",
      dataIndex: "tenNb",
      key: "tenNb",
      render: (item) => {
        return <b>{item}</b>
      }
    },
    {
      title: (
        <HeaderSearch
          title="Thành tiền"
          sort_key="thanhTien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["thanhTien"] || ""}
        />
      ),
      width: "50px",
      dataIndex: "thanhTien",
      key: "thanhTien",
      align: "right",
      render : (item) => {
        return formatDecimal(String(item));
      }
    },
    {
      title: (
        <HeaderSearch
          title="Trạng thái"
          sort_key="trangThai"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["trangThai"] || ""}
        />
      ),
      width: "50px",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (item) => {
        return listTrangThaiDonThuocNhaThuoc.find((x) => x.id == item)?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Số phiếu"
          sort_key="soPhieu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["soPhieu"] || ""}
        />
      ),
      width: "50px",
      dataIndex: "soPhieu",
      key: "soPhieu",
      render: (item) => {
        return item;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Địa chỉ"
          // sort_key="diaChi"
          // onClickSort={onClickSort}
          // dataSort={dataSortColumn["soPhieu"] || ""}
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
          title="Kho"
          sort_key="tenKho"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenKho"] || ""}
        />
      ),
      width: "150px",
      dataIndex: "tenKho",
      key: "tenKho",
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
          dataSource={listThuoc}
          onRow={onRow}
          rowKey={(record) => `${record.id}`}
          rowClassName={setRowClassName}
        />
        <Pagination
          listData={listThuoc}
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
    thuocKho: { listThuoc, totalElements, page, size },
    utils: { listTrangThaiDonThuocNhaThuoc = [] },
  } = state;
  return {
    listThuoc,
    listTrangThaiDonThuocNhaThuoc,
    totalElements,
    page,
    size,
  };
};
const mapDispatchToProps = ({
  thuocKho: { getListThuoc, updateData, onSizeChange },
  thuocChiTiet: { updateData: updateDataThuocChiTiet },
  utils: { getUtils },

}) => ({
  getListThuoc,
  updateData,
  onSizeChange,
  getUtils,
  updateDataThuocChiTiet
});
export default connect(mapStateToProps, mapDispatchToProps)(DanhSachDonThuoc);
