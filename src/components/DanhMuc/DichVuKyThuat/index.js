import React, { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
import TableWrapper from "components/TableWrapper";
import Pagination from "components/Pagination";
import HeaderSearch from "components/TableWrapper/headerSearch";
import Select from "components/Select";

import { Main } from "./styled";
import { TIEPDON_CLS } from "constants/index";
import {
  HAN_CHE_KHOA,
  HIEU_LUC,
  KHONG_TINH_TIEN,
  DICH_VU_CO_KET_QUA_LAU,
  CHI_PHI_VAN_CHUYEN,
} from "constants/index";
import { SORT_DEFAULT } from "./configs";
import Checkbox from "components/Checkbox";
import { DatePicker, Input, InputNumber } from "antd";
const DichVuKham = (props) => {
  console.log('render 1');
  const { totalElements, loaiDichVu, styleContainerButtonHeader, layerId } =
    props;
  const { onRegisterHotkey } = useDispatch().phimTat;
  const refSelectRow = useRef();
  useEffect(() => {
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 38, //up
          onEvent: (e) => {
            refSelectRow.current && refSelectRow.current(-1);
          },
        },
        {
          keyCode: 40, //down
          onEvent: (e) => {
            refSelectRow.current && refSelectRow.current(1);
          },
        },
      ],
    });
  }, []);
  refSelectRow.current = (index) => {
    const { listData } = props;
    const indexNextItem =
      (listData?.findIndex((item) => item.id === state.currentItem?.id) || 0) +
      index;
    if (-1 < indexNextItem && indexNextItem < listData.length) {
      onShowAndHandleUpdate(listData[indexNextItem]);
      setState({ currentItem: listData[indexNextItem] });
      document
        .getElementsByClassName("row-id-" + listData[indexNextItem]?.id)[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };
  const [state, _setState] = useState({
    listAllChuyenKhoa: [],
    listAllDonViTinh: [],
    listAllNhomDichVuCap1: [],
    listAllNhomDichVuCap2: [],
    listAllNhomDichVuCap3: [],
    listnhomChiPhiBh: [],
    listloaiKetQuaXetNghiem: [],
    listAllBaoCao: [],
    listGioiTinh: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  // console.log("styleContainerButtonHeader", styleContainerButtonHeader);
  useEffect(() => {
    props.onSizeChange({ size: 10, loaiDichVu, dataSortColumn: { active: 0}});
    props.getUtils({ name: "loaiMau" });
    props.getUtils({ name: "nhomChiPhiBh" });
    props.getUtils({ name: "gioiTinh" });
    props.getUtils({ name: "doiTuongSuDung" });
    props.getUtils({ name: "nguonKhacChiTra" });
    // props.getListChuyenKhoa({});
    props.getListTongHopChuyenKhoa({});
    // props.getListDonViTinh({});
    props.getListDonViTinhTongHop({});
    // props.getAllDichVuCap1();
    // props.getAllDichVuCap2();
    // props.getAllDichVuCap3();
    props.getAllTongHopDichVuCap1();
    props.getAllTongHopDichVuCap2();
    props.getAllTongHopDichVuCap3();
    if (loaiDichVu === 20) {
      props.getUtils({ name: "loaiKetQuaXetNghiem" });
      props.getAllBaoCao({});
    }
  }, []);
  useEffect(() => {
    setState({
      listAllBaoCao: [{ id: "", ten: "T???t c???" }, ...props.listAllBaoCao],
    });
  }, [props.listAllBaoCao]);
  useEffect(() => {
    setState({
      listloaiKetQuaXetNghiem: [
        { id: "", ten: "T???t c???" },
        ...props.listloaiKetQuaXetNghiem,
      ],
    });
  }, [props.listloaiKetQuaXetNghiem]);

  useEffect(() => {
    setState({
      listnhomChiPhiBh: [{ id: "", ten: "T???t c???" }, ...props.listnhomChiPhiBh],
    });
  }, [props.listnhomChiPhiBh]);

  useEffect(() => {
    setState({
      listloaiMau: [{ id: "", ten: "T???t c???" }, ...props.listloaiMau],
    });
  }, [props.listloaiMau]);

  useEffect(() => {
    setState({
      listnguonKhacChiTra: [
        // { id: "", ten: "T???t c???" },
        ...props.listnguonKhacChiTra,
      ],
    });
  }, [props.listnguonKhacChiTra]);

  useEffect(() => {
    setState({
      listAllNhomDichVuCap1: [
        { id: "", ten: "T???t c???" },
        ...props.listAllNhomDichVuCap1,
      ],
    });
  }, [props.listAllNhomDichVuCap1]);

  useEffect(() => {
    setState({
      listAllNhomDichVuCap2: [
        { id: "", ten: "T???t c???" },
        ...props.listAllNhomDichVuCap2,
      ],
    });
  }, [props.listAllNhomDichVuCap2]);

  useEffect(() => {
    setState({
      listAllNhomDichVuCap3: [
        { id: "", ten: "T???t c???" },
        ...props.listAllNhomDichVuCap3,
      ],
    });
  }, [props.listAllNhomDichVuCap3]);

  useEffect(() => {
    setState({
      listdoiTuongSuDung: [
        // { id: "", ten: "T???t c???" },
        ...props.listdoiTuongSuDung,
      ],
    });
  }, [props.listdoiTuongSuDung]);

  useEffect(() => {
    setState({
      listGioiTinh: [{ id: "", ten: "T???t c???" }, ...props.listgioiTinh],
    });
  }, [props.listgioiTinh]);

  useEffect(() => {
    setState({
      listAllDonViTinh: [{ id: "", ten: "T???t c???" }, ...props.listAllDonViTinh],
    });
  }, [props.listAllDonViTinh]);

  useEffect(() => {
    setState({
      listAllChuyenKhoa: [
        { id: "", ten: "T???t c???" },
        ...props.listAllChuyenKhoa,
      ],
    });
  }, [props.listAllChuyenKhoa]);

  const onClickSort = (key, value) => {
    props.onSortChange(
      {
        [key]: value,
      },
      loaiDichVu
    );
  };

  const refTimeOut = useRef(null);
  const onSearchInput = (key) => (e) => {
    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
      refTimeOut.current = null;
    }
    refTimeOut.current = setTimeout(
      (key, s) => {
        let value = "";
        if (s) {
          if (s?.hasOwnProperty("checked")) value = s?.checked;
          else value = s?.value;
        } else value = e;
        props.onChangeInputSearch({
          [key]: value,
          "dichVu.loaiDichVu": loaiDichVu
        });
      },
      500,
      key,
      e?.target
    );
  };

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "50px",
      dataIndex: "index",
      key: 0,
      align: "center",
    },
    {
      title: (
        <HeaderSearch
          title="M?? D???ch V???"
          sort_key="dichVu.ma"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["dichVu.ma"] || 0}
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
          dataSort={props.dataSortColumn["dichVu.ten"] || 0}
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
          dataSort={props.dataSortColumn["dichVu.giaKhongBaoHiem"] || 0}
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
          dataSort={props.dataSortColumn["dichVu.giaBaoHiem"] || 0}
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
          dataSort={props.dataSortColumn["dichVu.giaPhuThu"] || 0}
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
          dataSort={props.dataSortColumn["dichVu.tyLeBhTt"] || 0}
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
      display: [20].includes(loaiDichVu),
      title: (
        <HeaderSearch
          title="Lo???i k???t qu???"
          sort_key="loaiKetQua"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["loaiKetQua"] || 0}
          searchSelect={
            <Select
              placeholder="T??m lo???i k???t qu???"
              onChange={onSearchInput("loaiKetQua")}
              data={state.listloaiKetQuaXetNghiem}
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "loaiKetQua",
      key: "loaiKetQua",
      render: (item) => {
        if (state.listloaiKetQuaXetNghiem?.length) {
          return (
            state.listloaiKetQuaXetNghiem.find((x) => x.id === item)?.ten || ""
          );
        }
        return "";
      },
    },
    {
      display: [20].includes(loaiDichVu),
      title: (
        <HeaderSearch
          title="K???t qu??? tham chi???u"
          sort_key="ketQuaThamChieu"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["ketQuaThamChieu"] || 0}
          search={
            <InputNumber
              min={0}
              placeholder="T??m k???t qu??? tham chi???u"
              onChange={onSearchInput("ketQuaThamChieu")}
              type="number"
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "ketQuaThamChieu",
      key: "ketQuaThamChieu",
      render: (item) => {
        return item && item.join(", ");
      },
    },
    {
      title: (
        <HeaderSearch
          title="T??? l??? thanh to??n DV"
          sort_key="dichVu.tyLeTtDv"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["dichVu.tyLeTtDv"] || 0}
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
      display: [10, 20, 30].includes(loaiDichVu),
      title: (
        <HeaderSearch
          title="Chuy??n khoa"
          sort_key="chuyenKhoaId"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["chuyenKhoaId"] || 0}
          searchSelect={
            <Select
              data={state.listAllChuyenKhoa}
              placeholder="Ch???n chuy??n khoa"
              onChange={onSearchInput("chuyenKhoaId")}
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "chuyenKhoaId",
      key: 8,
      render: (item, list, index) => {
        if (props.listAllChuyenKhoa?.length) {
          return props.listAllChuyenKhoa.find((x) => x.id === item)?.ten || "";
        }
        return "";
      },
    },
    {
      display: [20].includes(loaiDichVu),
      title: (
        <HeaderSearch
          title="T??n b??o c??o"
          sort_key="chuyenKhoaId"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["phieuChiDinhId"] || 0}
          searchSelect={
            <Select
              data={state.listAllBaoCao}
              placeholder="Ch???n b??o c??o"
              onChange={onSearchInput("phieuChiDinhId")}
            />
          }
        />
      ),
      width: "200px",
      dataIndex: "phieuChiDinhId",
      key: 8,
      render: (item, list, index) => {
        if (props.listAllBaoCao?.length) {
          return props.listAllBaoCao.find((x) => x.id === item)?.ten || "";
        }
        return "";
      },
    },
    {
      display: [20].includes(loaiDichVu),
      title: (
        <HeaderSearch
          title="Ch??? s??? n??? th???p"
          sort_key="chiSoNuThap"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["chiSoNuThap"] || 0}
          search={
            <InputNumber
              min={0}
              placeholder="T??m ch??? s??? n??? th???p"
              onChange={onSearchInput("chiSoNuThap")}
              type="number"
            />
          }
        />
      ),
      width: 150,
      dataIndex: "chiSoNuThap",
      align: "right",
      key: 9,
    },
    {
      display: [20].includes(loaiDichVu),
      title: (
        <HeaderSearch
          title="Ch??? s??? n??? cao"
          sort_key="chiSoNuCao"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["chiSoNuCao"] || 0}
          search={
            <InputNumber
              min={0}
              placeholder="T??m ch??? s??? n??? cao"
              onChange={onSearchInput("chiSoNuCao")}
              type="number"
            />
          }
        />
      ),
      width: 150,
      dataIndex: "chiSoNuCao",
      align: "right",
      key: 10,
    },
    {
      display: [20].includes(loaiDichVu),
      title: (
        <HeaderSearch
          title="Ch??? s??? nam th???p"
          sort_key="chiSoNamThap"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["chiSoNamThap"] || 0}
          search={
            <InputNumber
              min={0}
              placeholder="T??m ch??? s??? nam th???p"
              onChange={onSearchInput("chiSoNamThap")}
              type="number"
            />
          }
        />
      ),
      width: 150,
      dataIndex: "chiSoNamThap",
      align: "right",
      key: 11,
    },
    {
      display: [20].includes(loaiDichVu),
      title: (
        <HeaderSearch
          title="Ch??? s??? nam cao"
          sort_key="chiSoNamCao"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["chiSoNamCao"] || 0}
          search={
            <InputNumber
              min={0}
              placeholder="T??m ch??? s??? nam cao"
              onChange={onSearchInput("chiSoNamCao")}
              type="number"
            />
          }
        />
      ),
      width: 150,
      dataIndex: "chiSoNamCao",
      align: "right",
      key: 12,
    },
    {
      display: [120].includes(loaiDichVu),
      title: (
        <HeaderSearch
          title="Lo???i m??u"
          sort_key="loaiMau"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["loaiMau"] || 0}
          searchSelect={
            <Select
              data={state.listloaiMau}
              placeholder="Ch???n lo???i m??u"
              onChange={onSearchInput("loaiMau")}
            />
          }
        />
      ),
      width: 150,
      dataIndex: "loaiMau",
      key: 13,
      render: (item, list, index) => {
        if (props.listloaiMau?.length) {
          return props.listloaiMau.find((x) => x.id === item)?.ten || "";
        }
        return "";
      },
    },
    {
      display: [120].includes(loaiDichVu),
      title: (
        <HeaderSearch
          title="Th??? t??ch"
          sort_key="theTich"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["theTich"] || 0}
          searchSelect={
            <InputNumber
              style={{ width: "100%" }}
              placeholder="T??m th??? t??ch"
              onChange={onSearchInput("theTich")}
              type="number"
            />
          }
        />
      ),
      width: 120,
      dataIndex: "theTich",
      align: "right",
      key: 14,
    },
    {
      display: [120].includes(loaiDichVu),
      title: (
        <HeaderSearch
          title="S??? ng??y s??? d???ng"
          sort_key="soNgaySuDung"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["soNgaySuDung"] || 0}
          searchSelect={
            <InputNumber
              style={{ width: "100%" }}
              placeholder="T??m s??? ng??y s??? d???ng"
              onChange={onSearchInput("soNgaySuDung")}
              type="number"
            />
          }
        />
      ),
      width: 150,
      dataIndex: "soNgaySuDung",
      align: "right",
      key: 15,
    },
    {
      title: (
        <HeaderSearch
          title="Nh??m chi ph??"
          sort_key="dichVu.nhomChiPhiBh"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["dichVu.nhomChiPhiBh"] || 0}
          searchSelect={
            <Select
              data={state.listnhomChiPhiBh}
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
        if (props.listnhomChiPhiBh?.length) {
          return (
            props.listnhomChiPhiBh.find((x) => x.id === item?.nhomChiPhiBh)
              ?.ten || ""
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
          dataSort={props.dataSortColumn["dichVu.donViTinhId"] || 0}
          searchSelect={
            <Select
              data={state.listAllDonViTinh}
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
          dataSort={props.dataSortColumn["dichVu.nhomDichVuCap1Id"] || 0}
          searchSelect={
            <Select
              placeholder={"Ch???n d???ch v??? c???p 1"}
              data={state.listAllNhomDichVuCap1}
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
          dataSort={props.dataSortColumn["dichVu.nhomDichVuCap2Id"] || 0}
          searchSelect={
            <Select
              placeholder={"Ch???n d???ch v??? c???p 2"}
              data={state.listAllNhomDichVuCap2}
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
          dataSort={props.dataSortColumn["dichVu.nhomDichVuCap3Id"] || 0}
          searchSelect={
            <Select
              placeholder={"Ch???n d???ch v??? c???p 3"}
              data={state.listAllNhomDichVuCap3}
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
          dataSort={props.dataSortColumn["dichVu.maTuongDuong"] || 0}
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
          dataSort={props.dataSortColumn["dichVu.tenTuongDuong"] || 0}
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
          dataSort={props.dataSortColumn.gioiTinh || 0}
          searchSelect={
            <Select
              defaultValue=""
              data={state.listGioiTinh}
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
        return state.listGioiTinh.find((gt) => gt.id === item)?.ten;
      },
    },
    {
      display: [10, 20, 30, 40].includes(loaiDichVu),
      title: (
        <HeaderSearch
          sort_key="hanCheKhoaChiDinh"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.hanCheKhoaChiDinh || 0}
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
          dataSort={props.dataSortColumn["dsDoiTuongSuDung"] || 0}
          searchSelect={
            <Select
              data={state.listdoiTuongSuDung}
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
        if (props.listdoiTuongSuDung?.length) {
          let list =
            item
              ?.map((nguon, index) => {
                let x = props.listdoiTuongSuDung.find((dv) => dv.id === nguon);
                return x?.ten || "";
              })
              .filter((item) => item) ?? [];

          return list.join(", ");
        }
        return "";
      },
    },
    {
      display: [30].includes(loaiDichVu),
      title: (
        <HeaderSearch
          sort_key="dichVu.tiepDonCls"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["tiepDonCls"] || 0}
          searchSelect={
            <Select
              data={TIEPDON_CLS}
              placeholder="Ti???p ????n CLS"
              onChange={onSearchInput("tiepDonCls")}
            />
          }
          title="Ti???p ????n CLS"
        />
      ),
      width: 120,
      dataIndex: "tiepDonCls",
      key: "cls",
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },

    {
      display: [20, 30, 40].includes(loaiDichVu),
      title: (
        <HeaderSearch
          sort_key="quyetDinh"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["quyetDinh"] || 0}
          search={
            <Input
              placeholder="Nh???p m?? s??? quy???t ?????nh"
              onChange={onSearchInput("quyetDinh")}
            />
          }
          title="M?? s??? quy???t ?????nh"
        />
      ),
      width: "150px",
      dataIndex: "quyetDinh",
      key: "quyetDinh",
    },
    {
      display: [20, 30, 40].includes(loaiDichVu),
      title: (
        <HeaderSearch
          sort_key="ngayCongBo"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["ngayCongBo"] || 0}
          searchDate={
            <DatePicker
              format="DD/MM/YYYY"
              placeholder="Ch???n ng??y quy???t ?????nh"
              onChange={onSearchInput("ngayCongBo")}
            />
          }
          title="Ng??y quy???t ?????nh"
        />
      ),
      width: "150px",
      dataIndex: "ngayCongBo",
      key: "ngayCongBo",
      render: (item) => {
        return item && new Date(item).format("dd/MM/YYYY");
      },
    },
    {
      title: (
        <HeaderSearch
          title="Ngu???n kh??c chi tr???"
          sort_key="dichVu.dsNguonKhacChiTra"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["dichVu.dsNguonKhacChiTra"] || 0}
          searchSelect={
            <Select
              data={state.listnguonKhacChiTra}
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
        if (props.listnguonKhacChiTra?.length) {
          let list =
            item?.dsNguonKhacChiTra
              ?.map((nguon, index) => {
                let x = props.listnguonKhacChiTra.find((dv) => dv.id === nguon);
                return x?.ten || "";
              })
              .filter((item) => item) ?? [];

          return list.join(", ");
        }
        return "";
      },
    },
    {
      display: [120].includes(loaiDichVu),
      title: (
        <HeaderSearch
          sort_key="phiVanChuyen"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["phiVanChuyen"] || 0}
          searchSelect={
            <Select
              data={CHI_PHI_VAN_CHUYEN}
              placeholder="Chi ph?? v???n chuy???n"
              onChange={onSearchInput("phiVanChuyen")}
            />
          }
          title="Chi Ph?? V???n Chuy???n"
        />
      ),
      width: 150,
      dataIndex: "phiVanChuyen",
      key: 17,
      align: "center",
      render: (item) => {
        return <Checkbox checked={!!item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="dichVu.khongTinhTien"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["dichVu.khongTinhTien"] || 0}
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
      display: [20, 30].includes(loaiDichVu),
      title: (
        <HeaderSearch
          sort_key="maKetNoi"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn["maKetNoi"] || 0}
          search={
            <Input
              placeholder="M?? g???i LIS/PACS"
              onChange={onSearchInput("maKetNoi")}
            />
          }
          title="M?? g???i LIS/PACS"
        />
      ),
      width: 150,
      dataIndex: "maKetNoi",
      key: 171,
      align: "center",
    },
    {
      display: [20].includes(loaiDichVu),
      title: (
        <HeaderSearch
          sort_key="yeuCauBenhPham"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.yeuCauBenhPham || 0}
          searchSelect={
            <Select
              data={DICH_VU_CO_KET_QUA_LAU}
              placeholder="Ch???n gi?? tr???"
              onChange={onSearchInput("yeuCauBenhPham")}
            />
          }
          title="Y??u c???u b???nh ph???m"
        />
      ),
      width: 120,
      dataIndex: "yeuCauBenhPham",
      key: 18,
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      display: [20, 30].includes(loaiDichVu),
      title: (
        <HeaderSearch
          sort_key="ketQuaLau"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.ketQuaLau || 0}
          searchSelect={
            <Select
              data={DICH_VU_CO_KET_QUA_LAU}
              placeholder="Ch???n gi?? tr???"
              onChange={onSearchInput("ketQuaLau")}
            />
          }
          title="DV c?? k???t qu??? l??u"
        />
      ),
      width: 120,
      dataIndex: "ketQuaLau",
      key: 18,
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="covid"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.covid || 0}
          searchSelect={
            <Select
              data={HIEU_LUC}
              placeholder="Ch???n hi???u l???c"
              onChange={onSearchInput("covid")}
              defaultValue=""
            />
          }
          title="Covid"
        />
      ),
      width: 120,
      dataIndex: "covid",
      key: 18,
      align: "center",
      render: (item) => {
        return <Checkbox checked={item} />;
      },
    },
    {
      title: (
        <HeaderSearch
          sort_key="active"
          onClickSort={onClickSort}
          dataSort={props.dataSortColumn.active || 0}
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

  const onChangePage = (page) => {
    props.onSearch({ page: page - 1, loaiDichVu });
  };

  const onSizeChange = (size) => {
    props.onSizeChange({ size: size, loaiDichVu });
  };

  const onShowAndHandleUpdate = (data = {}) => {
    props.setEditStatus(true);
    props.updateData({
      currentItem: { ...data },
    });
  };

  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        onShowAndHandleUpdate(record);
        setState({ currentItem: record });
      },
    };
  };
  const setRowClassName = (record) => {
    let idDiff = props.currentItem?.id;
    return record.id == idDiff
      ? "row-actived row-id-" + record.id
      : "row-id-" + record.id;
  };
  return (
    <Main>
      <TableWrapper
        title={props.title}
        scroll={{ x: 1000 }}
        buttonHeader={props.buttonHeader || []}
        classNameRow={props.classNameRow}
        columns={columns.filter((item) => {
          return item.display !== false;
        })}
        dataSource={props.listData}
        onRow={onRow}
        rowClassName={setRowClassName}
        styleContainerButtonHeader={{ ...styleContainerButtonHeader }}
      ></TableWrapper>
      {totalElements ? (
        <Pagination
          onChange={onChangePage}
          current={props.page + 1}
          pageSize={props.size}
          total={totalElements}
          listData={props.listData}
          onShowSizeChange={onSizeChange}
          style={{ flex: 1, justifyContent: "flex-end" }}
        />
      ) : null}
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    dichVuKyThuat: {
      listData,
      totalElements,
      page,
      size,
      dataSearch,
      dataSort,
      currentItem,
      dataSortColumn,
    },
    chuyenKhoa: { listAllChuyenKhoa = [] },
    donViTinh: { listAllDonViTinh = [] },
    utils: {
      listnhomChiPhiBh = [],
      listgioiTinh = [],
      listdoiTuongSuDung = [],
      listloaiMau = [],
      listnguonKhacChiTra = [],
      listloaiKetQuaXetNghiem = [],
    },
    nhomDichVuCap1: { listAllNhomDichVuCap1 = [] },
    nhomDichVuCap2: { listAllNhomDichVuCap2 = [] },
    nhomDichVuCap3: { listAllNhomDichVuCap3 = [] },
    baoCao: { listAllData: listAllBaoCao = [] },
  } = state;

  return {
    listData,
    listnhomChiPhiBh,
    listgioiTinh,
    listdoiTuongSuDung,
    listnguonKhacChiTra,
    totalElements,
    page,
    size,
    currentItem,
    dataSearch: dataSearch || {},
    dataSort,
    dataSortColumn: dataSortColumn || SORT_DEFAULT,
    listAllChuyenKhoa,
    listAllDonViTinh,
    listAllNhomDichVuCap1,
    listAllNhomDichVuCap2,
    listAllNhomDichVuCap3,
    listloaiMau,
    listloaiKetQuaXetNghiem,
    listAllBaoCao,
  };
};
const mapDispatchToProps = ({
  dichVuKyThuat: {
    onSearch,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    updateData,
  },
  utils: { getUtils },
  chuyenKhoa: { getListChuyenKhoa, getListTongHopChuyenKhoa },
  donViTinh: { getListDonViTinh, getListDonViTinhTongHop },
  nhomDichVuCap1: { getAllDichVuCap1, getAllTongHopDichVuCap1 },
  nhomDichVuCap2: { getAllDichVuCap2, getAllTongHopDichVuCap2 },
  nhomDichVuCap3: { getAllDichVuCap3, getAllTongHopDichVuCap3 },
  baoCao: { getAllTongHop: getAllBaoCao },
}) => ({
  onSearch,
  onSizeChange,
  onSortChange,
  onChangeInputSearch,
  getUtils,
  updateData,
  getListChuyenKhoa,
  getListDonViTinh,
  getListDonViTinhTongHop,
  getAllDichVuCap1,
  getAllDichVuCap2,
  getAllDichVuCap3,
  getAllBaoCao,
  getAllTongHopDichVuCap1,
  getAllTongHopDichVuCap2,
  getAllTongHopDichVuCap3,
  getListTongHopChuyenKhoa,
});

export default connect(mapStateToProps, mapDispatchToProps)(DichVuKham);
