import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Checkbox, Input } from "antd";
import Pagination from "components/Pagination";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";
import { Main, PaginationWrapper } from "./styled";
import { TRANG_THAI, isNumber, formatDecimal } from "./configs";
import { useDispatch } from "react-redux";
let timer = null;
const DanhsachDichVu = ({
  listData,
  totalElements,
  onSearch,
  onSizeChange,
  size,
  page,
  onSortChange,
  onChangeInputSearch,
  dataSortColumn,
  listtrangThaiHoan,
  getUtils,
  thongTinPhieuThu,
  layerId,
}) => {
  const refTenDichVu = useRef(null);
  const [state, _setState] = useState({
    currentIndex: 0,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const { onRegisterHotkey } = useDispatch().phimTat;
  const { nbDotDieuTriId, phieuThuId } = useParams();
  useEffect(() => {
    onSizeChange({ size: 10, nbDotDieuTriId, phieuThuId });
    getUtils({ name: "trangThaiHoan" });
  }, [nbDotDieuTriId, phieuThuId]);

  useEffect(() => {
    onRegisterHotkey({
      layerId: layerId,
      hotKeys: [
        {
          keyCode: 9, //Tab
          onEvent: () => {
            refTenDichVu.current && refTenDichVu.current.focus();
          },
        },
        {
          keyCode: 38, //Mũi tên lên
          onEvent: () => {
            if (state.currentIndex > 0) {
              setState({
                currentIndex: state.currentIndex - 1,
              });
            }
          },
        },
        {
          keyCode: 40, //Mũi tên xuống
          onEvent: () => {
            if (state.currentIndex < listData.length - 1) {
              setState({
                currentIndex: state.currentIndex + 1,
              });
            }
          },
        },
        {
          keyCode: 13, //Enter
          onEvent: () => {
            const record = listData[state.currentIndex];
            if (record) {
              // onRow(record).onClick();
            }
          },
        },
      ],
    });
  }, [state.currentIndex, listData]);
  useEffect(() => {
    if (state.index > listData.length - 1) {
      setState({ currentIndex: 0 });
    }
  }, [listData]);
  const onClickSort = (key, value) => {
    if (key === "thanhTien" || key === "tienGiamGia") {
      key = `${key}${getKeyByLoaiPhieuThu()}`;
    }
    onSortChange({
      [key]: value,
    });
  };

  const onSearchInput = (key, requiredNumber) => (e) => {
    let value = "";
    if (e?.target) {
      if (e.target.hasOwnProperty("checked")) value = e.target.checked;
      else value = e.target.value;
    } else value = e;
    if (requiredNumber && !isNumber(value) && value) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      onChangeInputSearch({
        [key]: value,
      });
    }, 300);
  };

  const getKeyByLoaiPhieuThu = () => {
    return thongTinPhieuThu.loaiPhieuThu === 1
      ? "KhongBh"
      : thongTinPhieuThu.loaiPhieuThu === 2
      ? "Bh"
      : "";
  };

  const columns = [
    // {
    //   title: <HeaderSearch title="Thao tác" />,
    //   width: "80px",
    //   dataIndex: "thaotac",
    //   key: "thaotac",
    //   align: "center",
    //   render: (item, list, index) => (
    //     <img
    //       className="icon"
    //       src={require("assets/images/his-core/swap.png")}
    //       alt=""
    //     />
    //   ),
    // },
    {
      title: <HeaderSearch title="STT" />,
      width: "60px",
      dataIndex: "stt",
      key: "stt",
      align: "center",
    },

    {
      title: (
        <HeaderSearch
          title="Tên dịch vụ"
          sort_key="tenDichVu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenDichVu"] || 0}
          search={
            <Input
              ref={refTenDichVu}
              placeholder="Tìm tên dịch vụ"
              onChange={onSearchInput("tenDichVu")}
            />
          }
        />
      ),
      width: "180px",
      dataIndex: "tenDichVu",
      key: "tenDichVu",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          title="Số lượng"
          sort_key="soLuong"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["soLuong"] || 0}
          search={
            <Input
              placeholder="Nhập giá nhỏ nhất cần tìm"
              onChange={onSearchInput("soLuong", true)}
            />
          }
        />
      ),
      width: "80px",
      dataIndex: "soLuong",
      key: "soLuong",
      align: "right",
    },

    {
      title: (
        <HeaderSearch
          title={
            thongTinPhieuThu.loaiPhieuThu === 1
              ? "Thành tiền không BH"
              : thongTinPhieuThu.loaiPhieuThu === 2
              ? "Thành tiền BH"
              : "Thành tiền"
          }
          sort_key="thanhTien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["thanhTien"] || 0}
          search={
            <Input
              placeholder="Tìm thành tiền"
              onChange={onSearchInput("thanhTien", true)}
            />
          }
        />
      ),
      width: "120px",
      dataIndex: "thanhTien",
      key: "thanhTien",
      align: "right",
      render: (item) => formatDecimal(String(item)),
    },
    {
      title: (
        <HeaderSearch
          title="Đơn vị tính"
          sort_key="tenDonViTinh"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tenDonViTinh"] || 0}
          search={
            <Input
              placeholder="Nhập đơn vị tính"
              onChange={onSearchInput("tenDonViTinh")}
            />
          }
        />
      ),
      width: "100px",
      dataIndex: "tenDonViTinh",
      key: "tenDonViTinh",
      align: "left",
    },
    {
      title: (
        <HeaderSearch
          title="Tự trả"
          sort_key="tuTra"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tuTra"] || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={TRANG_THAI}
              placeholder="Chọn"
              onChange={onSearchInput("tuTra")}
            />
          }
        />
      ),
      width: "100px",
      dataIndex: "tuTra",
      key: "tuTra",
      align: "center",
      render: (item, list, index) => (
        <Checkbox checked={item} onChange={() => {}} />
      ),
    },
    {
      title: (
        <HeaderSearch
          title="Không tính tiền"
          sort_key="khongTinhTien"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["khongTinhTien"] || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={TRANG_THAI}
              placeholder="Chọn"
              onChange={onSearchInput("khongTinhTien")}
            />
          }
        />
      ),
      width: "120px",
      dataIndex: "khongTinhTien",
      key: "khongTinhTien",
      align: "center",
      render: (item, list, index) => (
        <Checkbox checked={item} onChange={() => {}} />
      ),
    },
    {
      title: (
        <HeaderSearch
          title="Đơn giá không BH"
          sort_key="giaKhongBaoHiem"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["giaKhongBaoHiem"] || 0}
          search={
            <Input
              placeholder="Nhập giá nhỏ nhất cần tìm"
              onChange={onSearchInput("giaKhongBaoHiem", true)}
            />
          }
        />
      ),
      width: "170px",
      dataIndex: "giaKhongBaoHiem",
      key: "giaKhongBaoHiem",
      align: "right",
      render: (item) => formatDecimal(String(item)),
    },
    {
      title: (
        <HeaderSearch
          title="Đơn giá BH"
          sort_key="giaBaoHiem"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["giaBaoHiem"] || 0}
          search={
            <Input
              placeholder="Nhập giá nhỏ nhất cần tìm"
              onChange={onSearchInput("giaBaoHiem", true)}
            />
          }
        />
      ),
      width: "120px",
      dataIndex: "giaBaoHiem",
      key: "giaBaoHiem",
      align: "right",
      render: (item) => formatDecimal(String(item)),
    },
    {
      title: (
        <HeaderSearch
          title="Phụ thu"
          sort_key="giaPhuThu"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["giaPhuThu"] || 0}
          search={
            <Input
              placeholder="Nhập giá nhỏ nhất cần tìm"
              onChange={onSearchInput("giaPhuThu", true)}
            />
          }
        />
      ),
      width: "100px",
      dataIndex: "giaPhuThu",
      key: "giaPhuThu",
      align: "right",
      render: (item) => formatDecimal(String(item)),
    },
    {
      title: (
        <HeaderSearch
          title="Tổng tiền miễn giảm"
          sort_key="tienMienGiam"
          onClickSort={onClickSort}
          dataSort={dataSortColumn["tienMienGiam"] || 0}
          search={
            <Input
              placeholder="Nhập tổng tiền miễn giảm"
              onChange={onSearchInput("tienMienGiam", true)}
            />
          }
        />
      ),
      width: "170px",
      dataIndex: "tienMienGiam",
      key: "tienMienGiam",
      align: "right",
      render: (item) => formatDecimal(String(item)),
    },
    {
      title: (
        <HeaderSearch
          title={
            thongTinPhieuThu.loaiPhieuThu === 1
              ? "Tiền miễn giảm không BH"
              : thongTinPhieuThu.loaiPhieuThu === 2
              ? "Tiền miễn giảm BH"
              : "Tiền miễn giảm"
          }
          sort_key={`tienMienGiamDichVu${getKeyByLoaiPhieuThu()}`}
          onClickSort={onClickSort}
          dataSort={
            dataSortColumn[`tienMienGiamDichVu${getKeyByLoaiPhieuThu()}`] || 0
          }
          search={
            <Input
              placeholder="Nhập tiền miễn giảm"
              onChange={onSearchInput(
                `tienMienGiamDichVu${getKeyByLoaiPhieuThu()}`,
                true
              )}
            />
          }
        />
      ),
      width: "170px",
      dataIndex: `tienMienGiamDichVu${getKeyByLoaiPhieuThu()}`,
      key: `tienMienGiamDichVu${getKeyByLoaiPhieuThu()}`,
      align: "right",
      render: (item) => formatDecimal(String(item)),
    },
    {
      title: (
        <HeaderSearch
          title={
            thongTinPhieuThu.loaiPhieuThu === 1
              ? "% Miễn giảm không BH"
              : thongTinPhieuThu.loaiPhieuThu === 2
              ? "% Miễn giảm BH"
              : "% Miễn giảm"
          }
          sort_key={`phanTramMienGiamDichVu${getKeyByLoaiPhieuThu()}`}
          onClickSort={onClickSort}
          dataSort={
            dataSortColumn[`phanTramMienGiamDichVu${getKeyByLoaiPhieuThu()}`] ||
            0
          }
          search={
            <Input
              placeholder="Nhập giá nhỏ nhất cần tìm"
              onChange={onSearchInput(
                `phanTramMienGiamDichVu${getKeyByLoaiPhieuThu()}`,
                true
              )}
            />
          }
        />
      ),
      width: "120px",
      dataIndex: `phanTramMienGiamDichVu${getKeyByLoaiPhieuThu()}`,
      key: `phanTramMienGiamDichVu${getKeyByLoaiPhieuThu()}`,
      align: "right",
    },
    {
      title: (
        <HeaderSearch
          title={
            thongTinPhieuThu.loaiPhieuThu === 1
              ? "Tiền giảm voucher không BH"
              : thongTinPhieuThu.loaiPhieuThu === 2
              ? "Tiền giảm voucher BH"
              : "Tiền giảm voucher"
          }
          sort_key={
            thongTinPhieuThu.loaiPhieuThu === 1
              ? "tienGiamGiaKhongBh"
              : thongTinPhieuThu.loaiPhieuThu === 2
              ? "tienGiamGiaBh"
              : "tienGiamGia"
          }
          onClickSort={onClickSort}
          dataSort={dataSortColumn[`tienGiamGia${getKeyByLoaiPhieuThu()}`] || 0}
          search={
            <Input
              placeholder="Nhập giá nhỏ nhất cần tìm"
              onChange={onSearchInput(
                `tienGiamGia${getKeyByLoaiPhieuThu()}`,
                true
              )}
            />
          }
        />
      ),
      width: "180px",
      dataIndex: `tienGiamGia${getKeyByLoaiPhieuThu()}`,
      key: `tienGiamGia${getKeyByLoaiPhieuThu()}`,
      align: "right",
      render: (item) => formatDecimal(String(item)),
    },
    {
      title: (
        <HeaderSearch
          title="Trạng thái hoàn"
          searchSelect={
            <Select
              defaultValue={0}
              data={listtrangThaiHoan}
              placeholder="Chọn"
              onChange={onSearchInput("trangThaiHoan")}
            />
          }
        />
      ),
      width: "120px",
      dataIndex: "trangThaiHoan",
      key: "trangThaiHoan",
      align: "center",
      render: (item, list, index) => {
        return listtrangThaiHoan?.find((e) => e.id === item)?.ten;
      },
    },
  ];
  const handleChangePage = (page) => {
    onSearch({ page: page - 1 });
  };

  const handleSizeChange = (size) => {
    onSizeChange({ size: size });
  };
  return (
    <Main>
      <TableWrapper
        columns={columns}
        dataSource={listData}
        rowClassName={(record, index) => {
          return index == state.currentIndex ? "row-selected" : "";
        }}
      />
      {!!totalElements && (
        <PaginationWrapper>
          <Pagination
            className="service-pagination"
            onChange={handleChangePage}
            current={page + 1}
            pageSize={size}
            total={totalElements}
            onShowSizeChange={handleSizeChange}
            style={{ flex: 1, justifyContent: "flex-end" }}
          />
        </PaginationWrapper>
      )}
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    danhSachDichVu: {
      listData,
      totalElements,
      page,
      size,
      dataSearch,
      dataSortColumn,
    },
    utils: { listtrangThaiHoan },
    thuNgan: { thongTinPhieuThu },
  } = state;
  return {
    listData,
    totalElements,
    page,
    size,
    dataSearch,
    dataSortColumn,
    listtrangThaiHoan,
    thongTinPhieuThu,
  };
};

const mapDispatchToProps = ({
  danhSachDichVu: {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
  },
  utils: { getUtils },
}) => ({
  onSearch,
  onSizeChange,
  onSortChange,
  onChangeInputSearch,
  updateData,
  getUtils,
});

export default connect(mapStateToProps, mapDispatchToProps)(DanhsachDichVu);
