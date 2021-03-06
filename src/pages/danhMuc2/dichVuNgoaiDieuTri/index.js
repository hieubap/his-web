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
          title="M?? D???ch V???"
          sort_key="dichVu.ma"
          onClickSort={onClickSort}
          dataSort={dataSort["dichVu.ma"] || 0}
          search={
            <Input
              placeholder="T??m m?? d???ch v???"
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
          title="T??n d???ch v???"
          sort_key="dichVu.ten"
          onClickSort={onClickSort}
          dataSort={dataSort["dichVu.ten"] || 0}
          search={
            <Input
              placeholder="T??m t??n d???ch v???"
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
          title="????n gi?? kh??ng BH"
          sort_key="dichVu.giaKhongBaoHiem"
          onClickSort={onClickSort}
          dataSort={dataSort["dichVu.giaKhongBaoHiem"] || 0}
          search={
            <InputNumber
              min={0}
              placeholder="T??m gi?? kh??ng BH"
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
          title="????n gi?? BH"
          sort_key="dichVu.giaBaoHiem"
          onClickSort={onClickSort}
          dataSort={dataSort["dichVu.giaBaoHiem"] || 0}
          search={
            <InputNumber
              min={0}
              placeholder="T??m gi?? BH"
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
          title="Ph??? thu"
          sort_key="dichVu.giaPhuThu"
          onClickSort={onClickSort}
          dataSort={dataSort["dichVu.giaPhuThu"] || 0}
          search={
            <InputNumber
              min={0}
              placeholder="T??m gi?? ph??? thu"
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
          title="T??? l??? BH thanh to??n"
          sort_key="dichVu.tyLeBhTt"
          onClickSort={onClickSort}
          dataSort={dataSort["dichVu.tyLeBhTt"] || 0}
          search={
            <InputNumber
              min={0}
              placeholder="T??m t??? l??? BH thanh to??n"
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
          title="T??? l??? thanh to??n DV"
          sort_key="dichVu.tyLeTtDv"
          onClickSort={onClickSort}
          dataSort={dataSort["dichVu.tyLeTtDv"] || 0}
          search={
            <InputNumber
              min={0}
              placeholder="T??m t??? l??? thanh to??n DV"
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
          title="Nh??m chi ph??"
          sort_key="dichVu.nhomChiPhiBh"
          onClickSort={onClickSort}
          dataSort={dataSort["dichVu.nhomChiPhiBh"] || 0}
          searchSelect={
            <SelectConnect
              name={"listnhomChiPhiBh"}
              placeholder="Ch???n nh??m chi ph??"
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
          title="??VT"
          sort_key="dichVu.donViTinhId"
          onClickSort={onClickSort}
          dataSort={dataSort["dichVu.donViTinhId"] || 0}
          searchSelect={
            <Select
              data={listAllDonViTinh}
              placeholder="Ch???n ??VT"
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
          title="Nh??m d???ch v??? c???p 1"
          sort_key="dichVu.nhomDichVuCap1Id"
          onClickSort={onClickSort}
          dataSort={dataSort["dichVu.nhomDichVuCap1Id"] || 0}
          searchSelect={
            <Select
              placeholder={"Ch???n d???ch v??? c???p 1"}
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
          title="Nh??m d???ch v??? c???p 2"
          sort_key="dichVu.nhomDichVuCap2Id"
          onClickSort={onClickSort}
          dataSort={dataSort["dichVu.nhomDichVuCap2Id"] || 0}
          searchSelect={
            <Select
              placeholder={"Ch???n d???ch v??? c???p 2"}
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
          title="Nh??m d???ch v??? c???p 3"
          sort_key="dichVu.nhomDichVuCap3Id"
          onClickSort={onClickSort}
          dataSort={dataSort["dichVu.nhomDichVuCap3Id"] || 0}
          searchSelect={
            <Select
              placeholder={"Ch???n d???ch v??? c???p 3"}
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
          title="M?? t????ng ??????ng"
          sort_key="dichVu.maTuongDuong"
          onClickSort={onClickSort}
          dataSort={dataSort["dichVu.maTuongDuong"] || 0}
          search={
            <Input
              placeholder="T??m m?? t????ng ??????ng"
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
          title="T??n t????ng ??????ng"
          sort_key="dichVu.tenTuongDuong"
          onClickSort={onClickSort}
          dataSort={dataSort["dichVu.tenTuongDuong"] || 0}
          search={
            <Input
              placeholder="T??m t??n t????ng ??????ng"
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
          title="Gi???i t??nh"
          sort_key="gioiTinh"
          onClickSort={onClickSort}
          dataSort={dataSort.gioiTinh || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={[{ id: "", ten: "T???t c???" }, ...(listgioiTinh || [])]}
              placeholder="T??m gi???i t??nh"
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
              placeholder="Ch???n h???n ch??? khoa ch??? ?????nh"
              onChange={onSearchInput("hanCheKhoaChiDinh")}
            />
          }
          title="H???n ch??? khoa ch??? ?????nh"
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
          title="Tr?????ng h???p k?? DV"
          sort_key="dsDoiTuongSuDung"
          onClickSort={onClickSort}
          dataSort={dataSort["dsDoiTuongSuDung"] || 0}
          searchSelect={
            <Select
              data={listdoiTuongSuDung}
              placeholder="Ch???n tr?????ng h???p k?? DV"
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
          title="Ngu???n kh??c chi tr???"
          sort_key="dichVu.dsNguonKhacChiTra"
          onClickSort={onClickSort}
          dataSort={dataSort["dichVu.dsNguonKhacChiTra"] || 0}
          searchSelect={
            <Select
              data={listnguonKhacChiTra}
              placeholder="Ch???n ngu???n kh??c chi tr???"
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
              placeholder="Ch???n t??nh ti???n"
              onChange={onSearchInput("dichVu.khongTinhTien")}
            />
          }
          title="Kh??ng t??nh ti???n"
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
              placeholder="Ch???n hi???u l???c"
              onChange={onSearchInput("active")}
              defaultValue=""
            />
          }
          title="C?? hi???u l???c"
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
      title: "Th??ng tin d???ch v???",
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
      title: "T??y ch???n gi??",
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
      title: "Khoa ch??? ?????nh d???ch v???",
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
        title="Danh m???c ngo??i ??i???u tr???"
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
