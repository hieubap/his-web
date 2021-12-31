import { Checkbox, Input, InputNumber } from "antd";
import Select from "components/Select";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { HAN_CHE_KHOA, HIEU_LUC, KHONG_TINH_TIEN } from "constants/index";
import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import BaseDmTabForm from "../../../components/BaseDmTabForm";
// import ThongTinDichVu from "../components/ThongTinDichVu";
import ThietLapChanKy from "./components/ThietLapChanKy";
import { GlobalStyle, Main } from "./styled";
import ThongTinDichVu from "components/DanhMuc/ThongTinDichVu";
import KhoaChiDinh from "components/DanhMuc/KhoaChiDinh";
import TuyChonGia from "components/DanhMuc/TuyChonGia";
import { checkRole } from "app/Sidebar/constant";
import { ROLES } from "constants/index";
import { getState } from "redux-store/stores";

const getUploadedFileName = (url = "") => {
  const indexSlash = url?.lastIndexOf("/");
  let updatedName = url?.slice(indexSlash + 1);

  return `${updatedName}`;
};

const DichVuNgoaiDieuTri = ({
  onSearch,
  createOrEdit,
  getUtils,
  listhuongGiay,
  listkhoGiay,
  listDinhDangBaoCao,
  getByBaoCaoId,
  dataChanKy,
  _dataEdit,

  loaiDichVu = 30,
  getListChuyenKhoa,
  getListDonViTinh,
  getListDonViTinhTongHop,
  getAllDichVuCap1,
  getAllDichVuCap2,
  getAllDichVuCap3,
  getAllTongHopDichVuCap1,
  getAllTongHopDichVuCap2,
  getAllTongHopDichVuCap3,
  getListTongHopChuyenKhoa,

  listData,
  totalElements,
  page,
  size,
  dataSort,
  dataSearch,
  dataEditDefault,
  getData,
  updateData,

  ...props
}) => {
  // const [state, _setState] = useState({
  //   mauBaoCao: null,
  //   editStatus: false,
  //   defaultFileList: [],
  //   isSelected: false,
  //   showFullTable: false,
  //   activeKeyTab: "1",
  // });

  // const setState = (data = {}) => {
  //   _setState((state) => {
  //     return { ...state, ...data };
  //   });
  // };
  const {
    chuyenKhoa: { listAllChuyenKhoa = [] },
    donViTinh: { listAllDonViTinh = [] },
    nhomDichVuCap1: { listAllNhomDichVuCap1 = [] },
    nhomDichVuCap2: { listAllNhomDichVuCap2 = [] },
    nhomDichVuCap3: { listAllNhomDichVuCap3 = [] },
    utils: {
      listnhomChiPhiBh = [],
      listgioiTinh = [],
      listdoiTuongSuDung = [],
      listloaiMau = [],
      listnguonKhacChiTra = [],
      listloaiKetQuaXetNghiem = [],
    },
  } = getState();

  const SelectConnect = connect(
    ({
      chuyenKhoa: { listAllChuyenKhoa = [] },
      donViTinh: { listAllDonViTinh = [] },
      nhomDichVuCap1: { listAllNhomDichVuCap1 = [] },
      nhomDichVuCap2: { listAllNhomDichVuCap2 = [] },
      nhomDichVuCap3: { listAllNhomDichVuCap3 = [] },
      utils: {
        listnhomChiPhiBh = [],
        listgioiTinh = [],
        listdoiTuongSuDung = [],
        listloaiMau = [],
        listnguonKhacChiTra = [],
        listloaiKetQuaXetNghiem = [],
      },
    }) => ({
      storeData: {
        listnhomChiPhiBh,
        listgioiTinh,
        listdoiTuongSuDung,
        listloaiMau,
        listnguonKhacChiTra,
        listloaiKetQuaXetNghiem,

        listAllChuyenKhoa,
        listAllDonViTinh,
        listAllNhomDichVuCap1,
        listAllNhomDichVuCap2,
        listAllNhomDichVuCap3,
      },
    })
  )(({ name, storeData, dispatch, ...props }) => (
    <Select data={storeData[name]} />
  ));

  const getColumns = ({ onClickSort, onSearchInput, dataSort, page, size }) => [
    {
      title: <HeaderSearch title="STT" />,
      width: "50px",
      dataIndex: "index",
      key: 0,
      align: "center",
      render: (_, __, index) => page * size + index + 1,
    },
    {
      title: (
        <HeaderSearch
          title="Mã Dịch Vụ"
          sort_key="dichVu.ma"
          onClickSort={onClickSort}
          dataSort={dataSort["dichVu.ma"] || 0}
          search={
            <Input
              placeholder="Tìm mã dịch vụ"
              onChange={onSearchInput("dichVu.ma")}
            />
          }
        />
      ),
      width: 120,
      dataIndex: "dichVu",
      key: 1,
      render: (item) => {
        return item?.ma;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tên dịch vụ"
          sort_key="dichVu.ten"
          onClickSort={onClickSort}
          dataSort={dataSort["dichVu.ten"] || 0}
          search={
            <Input
              placeholder="Tìm tên dịch vụ"
              onChange={onSearchInput("dichVu.ten")}
            />
          }
        />
      ),
      width: 200,
      dataIndex: "dichVu",
      key: 2,
      render: (item) => {
        return item?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Đơn giá không BH"
          sort_key="dichVu.giaKhongBaoHiem"
          onClickSort={onClickSort}
          dataSort={dataSort["dichVu.giaKhongBaoHiem"] || 0}
          search={
            <InputNumber
              min={0}
              placeholder="Tìm giá không BH"
              onChange={onSearchInput("dichVu.giaKhongBaoHiem")}
              type="number"
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      align: "right",
      key: 3,
      render: (item = []) => {
        return item?.giaKhongBaoHiem?.formatPrice() || "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Đơn giá BH"
          sort_key="dichVu.giaBaoHiem"
          onClickSort={onClickSort}
          dataSort={dataSort["dichVu.giaBaoHiem"] || 0}
          search={
            <InputNumber
              min={0}
              placeholder="Tìm giá BH"
              onChange={onSearchInput("dichVu.giaBaoHiem")}
              type="number"
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      align: "right",
      key: 4,
      render: (item, list, index) => {
        return item?.giaBaoHiem?.formatPrice() || "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Phụ thu"
          sort_key="dichVu.giaPhuThu"
          onClickSort={onClickSort}
          dataSort={dataSort["dichVu.giaPhuThu"] || 0}
          search={
            <InputNumber
              min={0}
              placeholder="Tìm giá phụ thu"
              onChange={onSearchInput("dichVu.giaPhuThu")}
              type="number"
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      align: "right",
      key: 5,
      render: (item, list, index) => {
        return item?.giaPhuThu?.formatPrice() || "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tỷ lệ BH thanh toán"
          sort_key="dichVu.tyLeBhTt"
          onClickSort={onClickSort}
          dataSort={dataSort["dichVu.tyLeBhTt"] || 0}
          search={
            <InputNumber
              min={0}
              placeholder="Tìm tỷ lệ BH thanh toán"
              onChange={onSearchInput("dichVu.tyLeBhTt")}
              type="number"
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "dichVu",
      align: "right",
      key: 6,
      render: (item, list, index) => {
        return item?.tyLeBhTt;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tỷ lệ thanh toán DV"
          sort_key="dichVu.tyLeTtDv"
          onClickSort={onClickSort}
          dataSort={dataSort["dichVu.tyLeTtDv"] || 0}
          search={
            <InputNumber
              min={0}
              placeholder="Tìm tỷ lệ thanh toán DV"
              onChange={onSearchInput("dichVu.tyLeTtDv")}
              type="number"
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "dichVu",
      align: "right",
      key: 7,
      render: (item, list, index) => {
        return item?.tyLeTtDv;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nhóm chi phí"
          sort_key="dichVu.nhomChiPhiBh"
          onClickSort={onClickSort}
          dataSort={dataSort["dichVu.nhomChiPhiBh"] || 0}
          searchSelect={
            <SelectConnect
              name={"listnhomChiPhiBh"}
              placeholder="Chọn nhóm chi phí"
              onChange={onSearchInput("dichVu.nhomChiPhiBh")}
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "dichVu",
      key: 16,
      render: (item, list, index) => {
        if (listnhomChiPhiBh?.length) {
          return (
            listnhomChiPhiBh.find((x) => x.id === item?.nhomChiPhiBh)?.ten || ""
          );
        }
        return "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="ĐVT"
          sort_key="dichVu.donViTinhId"
          onClickSort={onClickSort}
          dataSort={dataSort["dichVu.donViTinhId"] || 0}
          searchSelect={
            <Select
              data={listAllDonViTinh}
              placeholder="Chọn ĐVT"
              onChange={onSearchInput("dichVu.donViTinhId")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: 17,
      render: (item, list, index) => {
        return item?.donViTinh?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nhóm dịch vụ cấp 1"
          sort_key="dichVu.nhomDichVuCap1Id"
          onClickSort={onClickSort}
          dataSort={dataSort["dichVu.nhomDichVuCap1Id"] || 0}
          searchSelect={
            <Select
              placeholder={"Chọn dịch vụ cấp 1"}
              data={listAllNhomDichVuCap1}
              onChange={onSearchInput("dichVu.nhomDichVuCap1Id")}
              style={{ width: "100%" }}
            />
          }
        />
      ),
      width: 170,
      dataIndex: "dichVu",
      key: 18,
      render: (item) => {
        return item?.nhomDichVuCap1?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nhóm dịch vụ cấp 2"
          sort_key="dichVu.nhomDichVuCap2Id"
          onClickSort={onClickSort}
          dataSort={dataSort["dichVu.nhomDichVuCap2Id"] || 0}
          searchSelect={
            <Select
              placeholder={"Chọn dịch vụ cấp 2"}
              data={listAllNhomDichVuCap2}
              onChange={onSearchInput("dichVu.nhomDichVuCap2Id")}
              style={{ width: "100%" }}
            />
          }
        />
      ),
      width: 170,
      dataIndex: "dichVu",
      key: 19,
      render: (item) => {
        return item?.nhomDichVuCap2?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nhóm dịch vụ cấp 3"
          sort_key="dichVu.nhomDichVuCap3Id"
          onClickSort={onClickSort}
          dataSort={dataSort["dichVu.nhomDichVuCap3Id"] || 0}
          searchSelect={
            <Select
              placeholder={"Chọn dịch vụ cấp 3"}
              data={listAllNhomDichVuCap3}
              onChange={onSearchInput("dichVu.nhomDichVuCap3Id")}
              style={{ width: "100%" }}
            />
          }
        />
      ),
      width: 170,
      dataIndex: "dichVu",
      key: 20,
      render: (item) => {
        return item?.nhomDichVuCap3?.ten;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Mã tương đương"
          sort_key="dichVu.maTuongDuong"
          onClickSort={onClickSort}
          dataSort={dataSort["dichVu.maTuongDuong"] || 0}
          search={
            <Input
              placeholder="Tìm mã tương đương"
              onChange={onSearchInput("dichVu.maTuongDuong")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: 21,
      render: (item) => {
        return item?.maTuongDuong;
      },
    },
    {
      title: (
        <HeaderSearch
          title="Tên tương đương"
          sort_key="dichVu.tenTuongDuong"
          onClickSort={onClickSort}
          dataSort={dataSort["dichVu.tenTuongDuong"] || 0}
          search={
            <Input
              placeholder="Tìm tên tương đương"
              onChange={onSearchInput("dichVu.tenTuongDuong")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: 22,
      render: (item) => {
        return item?.tenTuongDuong;
      },
    },
    {
      display: [10, 20, 30, 40].includes(loaiDichVu),
      title: (
        <HeaderSearch
          title="Giới tính"
          sort_key="gioiTinh"
          onClickSort={onClickSort}
          dataSort={dataSort.gioiTinh || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={[{ id: "", ten: "Tất cả" }, ...(listgioiTinh || [])]}
              placeholder="Tìm giới tính"
              onChange={onSearchInput("gioiTinh")}
            />
          }
        />
      ),
      width: 110,
      dataIndex: "gioiTinh",
      key: 23,
      render: (item, list, index) => {
        return listgioiTinh.find((gt) => gt.id === item)?.ten;
      },
    },
    {
      display: [10, 20, 30, 40].includes(loaiDichVu),
      title: (
        <HeaderSearch
          sort_key="hanCheKhoaChiDinh"
          onClickSort={onClickSort}
          dataSort={dataSort.hanCheKhoaChiDinh || 0}
          searchSelect={
            <Select
              data={HAN_CHE_KHOA}
              placeholder="Chọn hạn chế khoa chỉ định"
              onChange={onSearchInput("hanCheKhoaChiDinh")}
            />
          }
          title="Hạn chế khoa chỉ định"
        />
      ),
      width: 130,
      dataIndex: "hanCheKhoaChiDinh",
      key: 24,
      align: "center",
      render: (item) => {
        return <Checkbox checked={!!item} />;
      },
    },
    {
      display: [10, 20, 30, 40].includes(loaiDichVu),
      title: (
        <HeaderSearch
          title="Trường hợp kê DV"
          sort_key="dsDoiTuongSuDung"
          onClickSort={onClickSort}
          dataSort={dataSort["dsDoiTuongSuDung"] || 0}
          searchSelect={
            <Select
              data={listdoiTuongSuDung}
              placeholder="Chọn trường hợp kê DV"
              onChange={onSearchInput("dsDoiTuongSuDung")}
              mode="multiple"
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "dsDoiTuongSuDung",
      key: 25,
      render: (item, list, index) => {
        if (listdoiTuongSuDung?.length) {
          let list =
            item
              ?.map((nguon, index) => {
                let x = listdoiTuongSuDung.find((dv) => dv.id === nguon);
                return x?.ten || "";
              })
              .filter((item) => item) ?? [];

          return list.join(", ");
        }
        return "";
      },
    },
    {
      title: (
        <HeaderSearch
          title="Nguồn khác chi trả"
          sort_key="dichVu.dsNguonKhacChiTra"
          onClickSort={onClickSort}
          dataSort={dataSort["dichVu.dsNguonKhacChiTra"] || 0}
          searchSelect={
            <Select
              data={listnguonKhacChiTra}
              placeholder="Chọn nguồn khác chi trả"
              onChange={onSearchInput("dichVu.dsNguonKhacChiTra")}
              mode="multiple"
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "dichVu",
      key: 16,
      render: (item, list, index) => {
        if (listnguonKhacChiTra?.length) {
          let list =
            item?.dsNguonKhacChiTra
              ?.map((nguon, index) => {
                let x = listnguonKhacChiTra.find((dv) => dv.id === nguon);
                return x?.ten || "";
              })
              .filter((item) => item) ?? [];

          return list.join(", ");
        }
        return "";
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="dichVu.khongTinhTien"
          onClickSort={onClickSort}
          dataSort={dataSort["dichVu.khongTinhTien"] || 0}
          searchSelect={
            <Select
              data={KHONG_TINH_TIEN}
              placeholder="Chọn tính tiền"
              onChange={onSearchInput("dichVu.khongTinhTien")}
            />
          }
          title="Không tính tiền"
        />
      ),
      width: 150,
      dataIndex: "dichVu",
      key: 17,
      align: "center",
      render: (item) => {
        return item && <Checkbox checked={!!item.khongTinhTien} />;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={dataSort.active || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Chọn hiệu lực"
              onChange={onSearchInput("active")}
              defaultValue=""
            />
          }
          title="Có hiệu lực"
        />
      ),
      width: 120,
      dataIndex: "active",
      key: 18,
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
  ];
  console.log("render ...");
  const listPanel = ({}) => [
    {
      title: "Thông tin dịch vụ",
      render: ({ layerId }) => {
        return (
          <ThongTinDichVu
            // refCallbackSave={refSave1}
            layerId={layerId}
            currentItem={_dataEdit}
            loaiDichVu={30}
            roleSave={[ROLES["DANH_MUC"].CDHA_TDCN_THEM]}
            roleEdit={[ROLES["DANH_MUC"].CDHA_TDCN_SUA]}
            editStatus={
              _dataEdit?.id
                ? !checkRole([ROLES["DANH_MUC"].CDHA_TDCN_SUA])
                : !checkRole([ROLES["DANH_MUC"].CDHA_TDCN_THEM])
            }
          />
        );
      },
    },
    {
      title: "Tùy chọn giá",
      render: ({ layerId }) => {
        return (
          <TuyChonGia
            layerId={layerId}
            dichVuId={_dataEdit?.id}
            // refCallbackSave={refSave2}
            roleSave={[ROLES["DANH_MUC"].CDHA_TDCN_THEM]}
            roleEdit={[ROLES["DANH_MUC"].CDHA_TDCN_SUA]}
            editStatus={
              _dataEdit?.id
                ? !checkRole([ROLES["DANH_MUC"].CDHA_TDCN_SUA])
                : !checkRole([ROLES["DANH_MUC"].CDHA_TDCN_THEM])
            }
          />
        );
      },
    },
    {
      title: "Khoa chỉ định dịch vụ",
      render: ({ layerId }) => {
        return (
          <KhoaChiDinh
            layerId={layerId}
            // refCallbackSave={refSave3}
            dichVuId={_dataEdit?.id}
            roleSave={[ROLES["DANH_MUC"].CDHA_TDCN_THEM]}
            roleEdit={[ROLES["DANH_MUC"].CDHA_TDCN_SUA]}
            editStatus={
              _dataEdit?.id
                ? !checkRole([ROLES["DANH_MUC"].CDHA_TDCN_SUA])
                : !checkRole([ROLES["DANH_MUC"].CDHA_TDCN_THEM])
            }
          />
        );
      },
    },
  ];
  console.log('render ... 1');
  return (
    <Main>
      <GlobalStyle />
      <BaseDmTabForm
        title="Danh mục ngoài điều trị"
        listPanel={listPanel}
        getColumns={getColumns}
        listData={listData}
        totalElements={totalElements}
        page={page}
        size={size}
        dataSort={dataSort}
        dataSearch={dataSearch}
        dataEditDefault={dataEditDefault}
        getData={getData}
        updateData={updateData}
        rowKey={(record) => record.id}
        {...props}
      />
    </Main>
  );
};

const mapStateToProps = ({
  dichVuNgoaiDieuTri: {
    _listData,
    _dataSearch,
    _dataSort,
    _page,
    _size,
    _totalElements,
    _dataEdit,
  },
}) => {
  return {
    listData: _listData,
    totalElements: _totalElements,
    page: _page,
    size: _size,
    dataSort: _dataSort,
    dataSearch: _dataSearch,
    dataEditDefault: _dataEdit,

    // currentItem,
    // dataSearch: dataSearch || {},
    // dataSort,
    // dataSort: dataSort || SORT_DEFAULT,
    // dataEditDefault,
    // listhuongGiay,
    // listkhoGiay,
    // listDinhDangBaoCao,
    // dataChanKy,
  };
};
const mapDispatchToProps = ({
  dichVuNgoaiDieuTri: { _getList, updateData },
  utils: { getUtils },
  chuyenKhoa: { getListChuyenKhoa, getListTongHopChuyenKhoa },
  donViTinh: { getListDonViTinh, getListDonViTinhTongHop },
  nhomDichVuCap1: { getAllDichVuCap1, getAllTongHopDichVuCap1 },
  nhomDichVuCap2: { getAllDichVuCap2, getAllTongHopDichVuCap2 },
  nhomDichVuCap3: { getAllDichVuCap3, getAllTongHopDichVuCap3 },
}) => ({
  getData: _getList,
  updateData,

  // onSearch,
  // onSizeChange,
  // onSortChange,
  // onChangeInputSearch,
  getUtils,
  // updateData,
  // createOrEdit,
  // getByBaoCaoId,
  getListChuyenKhoa,
  getListDonViTinh,
  getListDonViTinhTongHop,
  getAllDichVuCap1,
  getAllDichVuCap2,
  getAllDichVuCap3,
  getAllTongHopDichVuCap1,
  getAllTongHopDichVuCap2,
  getAllTongHopDichVuCap3,
  getListTongHopChuyenKhoa,
});
export default connect(mapStateToProps, mapDispatchToProps)(DichVuNgoaiDieuTri);
