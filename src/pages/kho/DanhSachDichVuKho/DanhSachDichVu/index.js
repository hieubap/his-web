import { Button, Row, Input, DatePicker } from "antd";
import React, { useEffect } from "react";
import TableWrapper from "components/TableWrapper";
import { Main, ContentTable } from "./styled";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Pagination from "components/Pagination";
import IcCreate from "assets/images/kho/IcCreate.png";
import IcDown from "assets/images/kho/icDown.png";
import IcUp from "assets/images/kho/IcUp.png";
import { connect, useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Select from "components/Select";
import { useHistory } from "react-router-dom";
import { addPrefixNumberZero } from "utils";
import { useState } from "react";

let timer = null;

const DanhSach = (props) => {
  const [state, _setState] = useState({
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const cachXem = useSelector((state) => state.danhSachDichVuKho.cachXem);
  const page = useSelector((state) => state.danhSachDichVuKho.page);
  const size = useSelector((state) => state.danhSachDichVuKho.size);
  const totalElements = useSelector((state) => state.danhSachDichVuKho.totalElements);
  const listDanhSachDichVuKho = useSelector((state) => state.danhSachDichVuKho.listDanhSachDichVuKho);
  const { dataSortColumn , dsKhoId} = useSelector(state => state.danhSachDichVuKho)
  

  const onSizeChange = useDispatch().danhSachDichVuKho.onSizeChange;
  const getListDanhSachDichVuKho = useDispatch().danhSachDichVuKho.getListDanhSachDichVuKho;
  const updateData = useDispatch().danhSachDichVuKho.updateData;
  const { onSortChange } = useDispatch().danhSachDichVuKho
  const { getUtils } = useDispatch().utils
  const searchByParams = useDispatch().danhSachDichVuKho.searchByParams;

  // const {
  //   dataSortColumn,
  //   getListPhieuNhap,
  //   onSizeChange,
  //   listPhieuNhap,
  //   getUtils,
  //   listTrangThaiPhieuNhapXuat,
  //   totalElements,
  //   page,
  //   size,
  //   updateDataNhapKho,
  //   phieuNhapXuatId,
  //   onChangeInputSearch,
  //   listNhaSanXuat,
  //   listNguonNhapKho,
  //   listAllQuyetDinhThau,
  //   updateData,
  // } = props;
  useEffect(() => {
    // onSizeChange(10);
    // onSizeChange({ dataSearch: 10 });
    if(cachXem === "1"){
      searchByParams({ dsKhoId })
    } else {
      searchByParams({ dsKhoId ,theoLo: true})
    }
    getUtils({ name: "LoaiDichVu" });
  }, []);
  useEffect(() => {
    // updateData({ listDanhSachDichVuKho: [], dataSortColumn: {} }) // reset vì bị cache khi chuyển lọc lô
    // if (cachXem === "2") { // 2 = Xem theo lô , giá trị tự custom
    //   getListDanhSachDichVuKho({ theoLo: true });
    // }
    // else {
    //   getListDanhSachDichVuKho({ page: 0 });
    // }
  }, [cachXem]);
  const onClickSort = (key, value) => {
    if (cachXem == 2) {
      onSortChange({ [key]: value, theoLo: true });
    } else {
      onSortChange({ [key]: value });
    }
  };
  const onChangePage = (page) => {
    if (cachXem === "1") {
      getListDanhSachDichVuKho({ page: page - 1 , dsKhoId});
    }
    else {
      getListDanhSachDichVuKho({ theoLo: true, page: page - 1 , dsKhoId});
    }
  };

  const handleSizeChange = (size) => {
    if (cachXem === "1") {
      onSizeChange({ size , dsKhoId});
    }
    else {
      getListDanhSachDichVuKho({ theoLo: true, size , dsKhoId});
    }

  };

  const showChiTiet = () => {
    updateData({ chiTiet: false });
  };

  const history = useHistory();

  const onRow = (record) => {
    return {
      onClick: () => {
        const { khoId, dichVuId } = record;
        history.push({
          pathname: `/kho/danh-sach-dich-vu-kho/chi-tiet/${khoId}/${dichVuId}`,
          state: { notUseParamsSearch : true }
        })
        updateData({
          selectedItem: { ...record },
        });
      },
    };
  };

  const setRowClassName = (record) => {
    // let idDiff;
    // idDiff = phieuNhapXuatId;
    // return record.id === idDiff ? "row-actived" : "";
  };

  const onSearchInput = (key) => (e) => {
    // let value = "";
    // if (e?.target) {
    //   value = e.target.value;
    // } else if (e?._d) value = e.format("YYYY-MM-DD");
    // else value = e;
    // clearTimeout(timer);
    // timer = setTimeout(() => {
    //   onChangeInputSearch({ [key]: value });
    // }, 300);
  };
  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "25px",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (item) => {
        return addPrefixNumberZero(item, 3)
      },
    },
    {
      title: (
        <HeaderSearch
          title="Mã"
          sort_key="ma"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ma"] || ""}
        />
      ),
      width: "50px",
      dataIndex: "ma",
      key: "ma",
    },
    {
      title: (
        <HeaderSearch
          title="Tên Dịch Vụ"
          sort_key="ten"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ten"] || ""}
        />
      ),
      width: "150px",
      dataIndex: "ten",
      key: "ten",
    },
    {
      title: (
        <HeaderSearch
          title="Sl tồn thực tế"
          sort_key="soLuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["soLuong"] || ""}
        />
      ),
      align: "right",
      width: "70px",
      dataIndex: "soLuong",
      key: "soLuong",
      // render: (item) => {
      //   return listTrangThaiPhieuNhapXuat.find((x) => x.id == item)?.ten;
      // },
    },
    {
      title: (
        <HeaderSearch
          title="SL tồn khả dụng"
          sort_key="soLuongKhaDung"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["soLuongKhaDung"] || ""}
        />
      ),
      align: "right",
      width: "70px",
      dataIndex: "soLuongKhaDung",
      key: "soLuongKhaDung",
    },
    {
      title: (
        <HeaderSearch
          title="Hạn sử dụng"
          sort_key="ngayHanSuDung"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["ngayHanSuDung"] || ""}
        />
      ),
      render: (item) => {
        return item?.toDateObject()?.format("dd/MM/yyyy")
      },
      width: "70px",
      dataIndex: "ngayHanSuDung",
      key: "ngayHanSuDung",
    },
    {
      title: (
        <HeaderSearch
          title="Số lô"
          sort_key="soLo"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["soLo"] || ""}
        />
      ),
      // width: cachXem === "1" ? "0px" :"70px",
      // render: (row) => {
      //   // let api = "/api/v1/row/delete/";
      //   // //this ID be sued for POST delete row like a API below
      //   // api = api + row.id;
      //   return <div></div>
      // },
      width: "70px",
      dataIndex: "soLo",
      key: "soLo",
      className: cachXem === 1 ? "hide" : "",
    },
    // {
    //   title: <HeaderSearch title="SL kho" sort_key="n" />,
    //   width: "70px",
    // },
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
      // render: (item) => {
      //   return item?.ten;
      // },
    },
    {
      title: (
        <HeaderSearch
          title="Tên hoạt chất"
          sort_key="tenHoatChat"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenHoatChat"] || ""}
        />
      ),
      // textWrap: 'word-break',
      // ellipsis: true,
      // width: cachXem === "1" ? "0px" :"20%",
      width: "100px",
      dataIndex: "tenHoatChat",
      key: "tenHoatChat",
      render: (text, record) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          {text}
        </div>
      ),
      // render: (item) => {
      //   return item?.ten;
      // },
    },
  ];
  return (
    <Main>
      <ContentTable>
        <TableWrapper
          // columns={columns}
          columns={
            cachXem === "1"
              ? columns.filter(item => (item.dataIndex !== "soLo") && (item.dataIndex !== "ngayHanSuDung"))
              : columns
          }
          dataSource={listDanhSachDichVuKho || []}
          onRow={onRow}
          rowClassName={(record, index) => {
            return index % 2 === 0 ? `table-row-odd ${index == listDanhSachDichVuKho?.length - 1 ? "add-border" : ""}` : `table-row-even ${index == listDanhSachDichVuKho?.length - 1 ? "add-border" : ""}`
          }}
        />
        <Pagination
          listData={listDanhSachDichVuKho}
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
    nhapKho: { listPhieuNhap, totalElements, page, size },
    utils: { listTrangThaiPhieuNhapXuat = [] },
    nhapKhoChiTiet: { phieuNhapXuatId },
    nguonNhapKho: { listData: listNguonNhapKho },
    quyetDinhThau: { listAllQuyetDinhThau },
    nhaSanXuat: { listNhaSanXuat },
  } = state;
  return {
    listPhieuNhap,
    listTrangThaiPhieuNhapXuat,
    totalElements,
    page,
    size,
    phieuNhapXuatId,
    listNguonNhapKho,
    listAllQuyetDinhThau,
    listNhaSanXuat,
  };
};
const mapDispatchToProps = ({
  nhapKho: { getListPhieuNhap, onSizeChange, updateData, onChangeInputSearch },
  utils: { getUtils },
  nhapKhoChiTiet: { updateData: updateDataNhapKho },
}) => ({
  getListPhieuNhap,
  getUtils,
  onSizeChange,
  updateDataNhapKho,
  updateData,
  onChangeInputSearch,
});
export default connect(null, null)(DanhSach);
