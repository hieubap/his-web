import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { Input, Button, message, Collapse } from "antd";
import TextField from "components/TextField";
import IcArrow from "assets/images/khamBenh/icArrow.svg";
import Header from "./components/header";
import Table from "./components/table";
import { StickyWrapper } from "../components/StepWrapper/styled";
import { Main, MainTextFiled, CollapseWrapper } from "./styled";
import Select from "components/Select";
import { connect, useSelector, useDispatch } from "react-redux";
import { ALL_DON_THUOC, LOAI_DON_THUOC } from "../configs";
import goiDichVuChiTietProvider from "data-access/categories/dm-goi-dich-vu-chi-tiet";
import imgSearch from "assets/images/template/icSearch.png";
import CustomPopover from "../components/CustomPopover";
import TableDonThuoc from "../components/TableDonThuoc";
import TableThuocKeNgoai from "../components/TableThuocKeNgoai";
import ThongTinThuoc from "./components/ThongTinThuoc";
import { groupBy, values } from "lodash";
import HeaderThuocKeNgoai from "./components/HeaderThuocKeNgoai";
import TableThuocKeNgoaiPanel from "./components/TableThuocKeNgoai";

const { Panel } = Collapse;
const DonThuoc = ({
  searchDv,
  listDvKho,
  nbDotDieuTriId,
  tamTinhTien,
  chiDinhDichVu,
  updateData,
  listGoiDv,
  dataNb,
  listThietLapChonKho,
  getListDichVuTonKho,
  listDvTonKho,
  fullName,
  getListDichVuThuoc,
  listDvThuoc,
  getData,
  listData,
  getUtils,
  listloaiDonThuoc,
  khoaThucHienId,
  chiDinhTuDichVuId,
  listAllLieuDung,
  getListThietLapChonKho,
  onSizeChangeThuocKeNgoai,
  listDataThuocKeNgoai,
  getListDonViTinhTongHop,
  getBoChiDinh,
  chiDinhDichVuThuocKeNgoai,
  getListDichVuThuocKeNgoai,
  listDvThuocKeNgoai,
  loiDan,
  listAllDataThuocKeNgoai,
  nhanVienId,
}) => {
  console.log("nhanVienId: ", nhanVienId);
  const elementKey = Number(useSelector((state) => state.khamBenh.elementKey));
  const { nbKetLuan, nbChanDoan } = useSelector(
    (state) => state.khamBenh.thongTinChiTiet || {}
  );
  const { doiTuong } = useSelector((state) => state.khamBenh.infoNb || {});
  const boChiDinh = useSelector((state) => state.boChiDinh.boChiDinh);
  const infoNb = useSelector((state) => state.khamBenh.infoNb);

  const searchDuongDungTongHop = useDispatch().duongDung.searchDuongDungTongHop;

  const ThongTinThuocRef = useRef(null);
  const refDataAllThuocKeNgoai = useRef(null);
  const [state, _setState] = useState({
    visible: false,
    listDichVu: [],
    listSelectedDv: [],
    listGoiDv: [],
    isCheckAll: false,
    indeterminate: false,
    loadingChiDinh: false,
    isGoiDichVu: false,
    thanhTien: 0,
    listAllDichVu: [],
  });

  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const refScrollThisElement = useRef(null);
  useEffect(() => {
    if (state.visible) refScrollThisElement.current.click();
  }, [state.visible]);
  useEffect(() => {
    let dataKho = [];
    if (state.loaiDonThuoc == 30) {
      dataKho = listData.map((item) => {
        return item.khoTrucThuoc;
      });
      dataKho = dataKho.filter(
        (item2, index) => index === dataKho.findIndex((e) => e.id === item2.id)
      );
    } else {
      dataKho = listThietLapChonKho.map((item) => {
        return item.kho;
      });
    }
    setState({ dataKho });
  }, [state.loaiDonThuoc]);

  useEffect(() => {
    getData({ size: 999 });
    getUtils({ name: "loaiDonThuoc" });
    getListDonViTinhTongHop({});
    searchDuongDungTongHop({ page: 0, size: 99999 });
    onSizeChangeThuocKeNgoai({ size: 99999, isListAll: true, active: true });
  }, []);
  useEffect(() => {
    getListThietLapChonKho({ loaiDoiTuongId: infoNb?.loaiDoiTuongId });
  }, [infoNb]);

  const listPanel = useMemo(() => {
    const grouped = groupBy(listDvThuoc, "loaiDonThuoc");
    return Object.keys(grouped).map((key) => {
      let groupByIdArr = grouped[key];
      return {
        header: (
          <Header
            title={listloaiDonThuoc.find((x) => x.id == key)?.ten}
            listDvThuoc={groupByIdArr}
            nbDotDieuTriId={nbDotDieuTriId}
          />
        ),
        content: (
          <Table
            title="Thuốc điều trị"
            listDvThuoc={groupByIdArr}
            nbDotDieuTriId={nbDotDieuTriId}
            listloaiDonThuoc={key}
          />
        ),
        key,
      };
    });
  }, [listDvThuoc]);
  const listPanelThuocKeNgoai = useMemo(() => {
    // const grouped = groupBy(listDvThuocKeNgoai, "id");
    // return Object.keys(grouped).map((key) => {
    //   let groupByIdArr = grouped[key];

    return {
      header: (
        <HeaderThuocKeNgoai
          title={"Đơn thuốc kê ngoài"}
          listDvThuoc={listDvThuocKeNgoai}
          nbDotDieuTriId={nbDotDieuTriId}
        />
      ),
      content: (
        <TableThuocKeNgoaiPanel
          title="Thuốc điều trị"
          listDvThuoc={listDvThuocKeNgoai}
          nbDotDieuTriId={nbDotDieuTriId}
        />
      ),
      key: 150,
    };
    // });
  }, [listDvThuocKeNgoai]);
  // useEffect(() => { // set giá trị default popup , cho bảng trái và phải
  //   if (listDvThuocKeNgoai && listAllDataThuocKeNgoai) {
  //     let result = listAllDataThuocKeNgoai.filter((itemA) => {
  //       return listDvThuocKeNgoai.some((itemB) => itemA.id === itemB.thuocChiDinhNgoaiId)
  //     });

  //
  //     setState({
  //       listSelectedDv: result
  //     })
  //   }
  // }, [ listDvThuocKeNgoai , listAllDataThuocKeNgoai])

  //Select Component ChiDinh  ------------------------------------------------------------------------------------
  const listGoiDvFilter = useMemo(() => {
    if (!listGoiDv) return [];
    if (!state.filterText) return listGoiDv;
    return listGoiDv.filter(
      (item) =>
        item.ten.toLowerCase().unsignText().indexOf(state.filterText) >= 0
    );
  }, [state.filterText, listGoiDv, state.loaiDichVu]);

  useEffect(() => {
    getListDichVuThuoc({ nbDotDieuTriId });
    getListDichVuThuocKeNgoai({ nbDotDieuTriId, page: 0 });
  }, [nbDotDieuTriId]);

  useEffect(() => {
    const { listSelectedDv } = state;
    const listSelectedUniqueKey = listSelectedDv.map((item) => item.uniqueKey);

    let arr = [];
    let arrAll = [];
    switch (state.loaiDonThuoc) {
      case 10: {
        arr = listDvKho;
        break;
      }
      case 150: {
        arr = listDataThuocKeNgoai;
        arrAll = listAllDataThuocKeNgoai;
        break;
      }
      default: {
        arr = listDvTonKho;
        break;
      }
    }

    let listDichVu = [];

    if (state.loaiDonThuoc === 150) {
      let result = arrAll.filter((itemA) => {
        return arr.some((itemB) => itemA.id === itemB.id);
      });
      listDichVu = result;
    } else {
      const result = arr.map((item, index) => ({
        ...item,
        key: index,
        uniqueKey: `${item.id}-${item.dichVuId}`,
      }));
      listDichVu = result;
    }

    // const listDichVu = (
    //   arr
    // ).map((item, index) => ({
    //   ...item,
    //   key: index,
    //   uniqueKey: `${item.id}-${item.dichVuId}`,
    // }));

    setState({
      listDichVu,
      listAllDichVu: arrAll,
      isCheckAll: listDichVu.every((item) =>
        listSelectedUniqueKey.includes(item.uniqueKey)
      ),
    });
  }, [listDvKho, listDvTonKho, listDataThuocKeNgoai]);
  const handleCloseTag = (data) => {
    setState({
      listSelectedDv: data,
    });
    onTamTinhTien(data);
  };
  const getDvChiTiet = (goiDvId) => {
    goiDichVuChiTietProvider
      .search({
        page: 0,
        goiDvId,
      })
      .then((res) => {
        const { listSelectedDv } = state;
        const listSelectedUniqueKey = listSelectedDv.map(
          (item) => item.uniqueKey
        );
        const listDichVu = res.data.map((item) => {
          const {
            dichVu: {
              ma,
              ten,
              loaiDichVu,
              giaKhongBaoHiem,
              giaBaoHiem,
              giaPhuThu,
            } = {},
          } = item;
          return {
            ma,
            ten,
            loaiDichVu,
            giaKhongBaoHiem,
            giaBaoHiem,
            giaPhuThu,
            ...item,
            uniqueKey: `${item.id}-${item.dichVuId}`,
          };
        });

        setState({
          listDichVu,
          isCheckAll: listDichVu.every((item) =>
            listSelectedUniqueKey.includes(item.uniqueKey)
          ),
        });
      });
  };
  const onSelectedAll = (e, currentListDataKey) => {
    const { listDichVu, listSelectedDv } = state;
    if (!listDichVu.length) return;
    const { checked } = e.target;
    let updatedListDv = [];
    if (checked) {
      updatedListDv = [...listSelectedDv, ...listDichVu];
    } else {
      updatedListDv = listSelectedDv.filter(
        (item) => !currentListDataKey.includes(item.uniqueKey)
      );
    }
    updatedListDv = updatedListDv.filter((item, index, self) => {
      return (
        self.findIndex((item2) => item2.dichVuId == item.dichVuId) == index
      );
    });
    onTamTinhTien(updatedListDv, checked);
  };

  const onTamTinhTien = (listSelected, isCheckAll) => {
    const payload = listSelected.map((item) => ({
      nbDotDieuTriId,
      nbDichVu: {
        dichVuId:
          state.loaiDonThuoc == 10 || state.loaiDonThuoc == 150
            ? item?.id
            : item?.dichVuId,
        soLuong: item.soLuong,
        dichVu: {
          id: item?.id,
          ma: item?.ma,
          ten: item?.ten,
          hamLuong: item?.hamLuong,
          tenHoatChat: item?.tenHoatChat,
        },
      },
    }));
    tamTinhTien(payload).then((s) => {
      const thanhTien = (s || []).reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.nbDichVu.thanhTien,
        0
      );

      const listSelectedUniqueKey = listSelected.map((item) => item.uniqueKey);
      setState({
        visible: true,
        thanhTien: thanhTien,
        listSelectedDv: listSelected,
        indeterminate:
          listSelected.length && listSelected.length < state.listDichVu.length,
        isCheckAll:
          isCheckAll ||
          state.listDichVu.every((item) =>
            listSelectedUniqueKey.includes(item.uniqueKey)
          ),
      });
    });
  };
  const onSelected = (data) => {
    onTamTinhTien(data);
  };
  const onSelectedNoPayment = (data) => {
    const listSelectedUniqueKey = data.map((item) => item.uniqueKey);
    setState({
      visible: true,
      thanhTien: thanhTien,
      listSelectedDv: data,
      indeterminate: data.length && data.length < state.listDichVu.length,
      isCheckAll:
        isCheckAll ||
        state.listDichVu.every((item) =>
          listSelectedUniqueKey.includes(item.uniqueKey)
        ),
    });
  };

  const onSelectedBoChiDinh = (itemSelected) => {
    let item = {};
    let obj = {
      // khoaChiDinhId: infoNb.khoaChiDinhId,
      loaiDichVu: 90,
      notCallBoChiDinh: true,
    };

    if (itemSelected.id !== state.boChiDinhSelected?.id) {
      //nếu item không giống thì sẽ thêm vào
      item = itemSelected;
    }
    if (!!item.id) {
      obj.boChiDinhId = item.id;
    }
    if (state.loaiDonThuoc == 150) {
      // kê thuốc ngoài
      delete obj.loaiDichVu;
      onSizeChangeThuocKeNgoai({ size: 9999, active: true, ...obj });
    } else if (loaiDonThuoc == 20 || loaiDonThuoc == 30) {
      delete obj.loaiDichVu;
      delete obj.notCallBoChiDinh;
      getListDichVuTonKho({ ...obj, khoId: state.khoId });
    } else {
      searchDv(obj);
    }
    // setState({ boChiDinhSelected: item });
  };

  const {
    listDichVu,
    listSelectedDv,
    thanhTien,
    isCheckAll,
    indeterminate,
    isGoiDichVu,
    loaiDonThuoc,
  } = state;
  const renderContent = useCallback(() => {
    if (elementKey === 4 && state.loaiDonThuoc === 150) {
      return (
        <TableThuocKeNgoai
          dataNb={dataNb}
          data={listDichVu}
          dataAll={listAllDataThuocKeNgoai}
          listSelected={listSelectedDv}
          onSelectedNoPayment={onSelectedNoPayment}
          thanhTien={thanhTien}
          onSelected={onSelected}
          checkAll={isCheckAll}
          onSelectedAll={onSelectedAll}
          boChiDinh={boChiDinh}
          boChiDinhSelected={state.boChiDinhSelected}
          onSelectedBoChiDinh={onSelectedBoChiDinh}
          listAllLieuDung={listAllLieuDung}
          loaiDonThuoc={state?.loaiDonThuoc}
          loaiDichVu={90}
        />
      );
    }
    switch (elementKey) {
      case 4:
        return (
          <TableDonThuoc
            dataNb={dataNb}
            data={listDichVu}
            listSelected={listSelectedDv}
            thanhTien={thanhTien}
            onSelected={onSelected}
            checkAll={isCheckAll}
            onSelectedAll={onSelectedAll}
            boChiDinh={boChiDinh}
            boChiDinhSelected={state.boChiDinhSelected}
            onSelectedBoChiDinh={onSelectedBoChiDinh}
            listAllLieuDung={listAllLieuDung}
            khoId={state?.khoId}
            loaiDonThuoc={state?.loaiDonThuoc}
            loaiDichVu={90}
          />
        );
      default:
        return null;
    }
  }, [
    elementKey,
    listDichVu,
    listSelectedDv,
    thanhTien,
    isCheckAll,
    indeterminate,
    isGoiDichVu,
    listGoiDvFilter,
    loaiDonThuoc,
    listDataThuocKeNgoai,
    boChiDinh,
    listAllLieuDung,
    state?.khoId,
    listAllDataThuocKeNgoai,
  ]);
  const disableChiDinh = useMemo(() => {
    return !dataNb?.dsCdChinh?.length && !dataNb?.cdSoBo;
  }, [dataNb?.id, dataNb?.cdSoBo, dataNb?.dsCdChinh]);
  useEffect(() => {
    if (elementKey !== 1) return;
    if (!!dataNb?.cdSoBo || dataNb?.dsCdChinhId.length > 0) {
      searchDv({});
    } else {
      updateData({
        listDvKho: [],
      });
    }
  }, [disableChiDinh, elementKey]);

  const onSelectServiceType = (value) => {
    setState({
      loaiDonThuoc: value,
      indeterminate: false,
      isGoiDichVu: value === 200,
    });
    if (value == 10) {
      // thuốc nhà thuốc
      searchDv({ loaiDichVu: 90, bacSiChiDinhId: nhanVienId });
    } else if (value === 150) {
      // thuốc kê ngoài
      getBoChiDinh({ thuocChiDinhNgoai: true, bacSiChiDinhId: nhanVienId });
      onSizeChangeThuocKeNgoai({ size: 9999, active: true });
    } else {
      // thuốc BHYT và thuốc tủ trực
      getListDichVuTonKho({});
      getBoChiDinh({ dsLoaiDichVu: 90, bacSiChiDinhId: nhanVienId });
    }
  };

  const onSelectServiceStorage = (value) => {
    setState({
      khoId: value,
      indeterminate: false,
    });
    if (state.loaiDonThuoc == 10) {
    } else {
      getListDichVuTonKho({ khoId: value });
    }
  };

  const handleVisible = (e) => {
    setState({
      visible: true,
    });
    // if (state.loaiDonThuoc == 10) {
    //   searchDv({ loaiDichVu: 90, nhapDotDung: true });
    // } else {
    //   getListDichVuTonKho({ khoId: state.khoId });
    // }
  };

  const onSubmit = () => {
    const { listSelectedDv } = state;
    if (!listSelectedDv.length) {
      message.error("Yêu cầu nhập chỉ định dịch vụ!");
      return;
    }
    setState({
      loadingChiDinh: true,
    });

    const dataTable = listSelectedDv.map((item) => {
      switch (state.loaiDonThuoc) {
        case 150:
          return {
            nbDotDieuTriId,
            thuocChiDinhNgoaiId: item?.id,
            soLuong: item.soLuong,
            lieuDungId: item.lieuDungId,
          };
        default:
          return {
            nbDotDieuTriId,
            lieuDungId: item.lieuDungId,
            nbDichVu: {
              dichVuId:
                state.loaiDonThuoc == 10 || state.loaiDonThuoc == 150
                  ? item?.id
                  : item?.dichVuId,
              soLuong: item.soLuong,
              chiDinhTuDichVuId: chiDinhTuDichVuId,
              chiDinhTuLoaiDichVu: 10,
              khoaChiDinhId: khoaThucHienId,
              loaiDichVu: item?.loaiDichVu,
              dichVu: {
                id: item?.id,
                ma: item?.ma,
                ten: item?.ten,
                hamLuong: item?.hamLuong,
                tenHoatChat: item?.tenHoatChat,
              },
            },
            nbDvKho: {
              khoId: state.khoId,
            },
          };
      }
    });
    if (state.loaiDonThuoc === 150) {
      // thuốc kê ngoài
      chiDinhDichVuThuocKeNgoai(dataTable)
        .then((s) => {
          setState({
            loadingChiDinh: false,
            listSelectedDv: [],
          });
          if (s?.code === 0) {
            getListDichVuThuocKeNgoai({ nbDotDieuTriId, page: 0 });
            onClosePopup();
          }
          let newTable = s?.neededUpdateRecord.filter((x) => {
            return x.code === 8501;
          });
          if (newTable.length > 0)
            ThongTinThuocRef.current &&
              ThongTinThuocRef.current.show({ newTable });
        })
        .catch(() => {
          setState({
            loadingChiDinh: false,
          });
        });
    } else {
      chiDinhDichVu(dataTable)
        .then((s) => {
          setState({
            loadingChiDinh: false,
            listSelectedDv: [],
          });
          if (s?.code === 0) {
            getListDichVuThuoc({ nbDotDieuTriId });
            onClosePopup();
          }
          let newTable = s?.neededUpdateRecord.filter((x) => {
            return x.code === 8501;
          });
          if (newTable.length > 0)
            ThongTinThuocRef.current &&
              ThongTinThuocRef.current.show({ newTable });
        })
        .catch(() => {
          setState({
            loadingChiDinh: false,
          });
        });
    }
  };

  const onClosePopup = () => {
    setState({
      visible: false,
      thanhTien: 0,
      listDichVu: state.listDichVu,
      isCheckAll: false,
      indeterminate: false,
      loadingChiDinh: false,
      listSelectedDv: [],
    });
  };
  const handleSearch = (e) => {
    const { loaiDichVu } = state;
    const valueText = e.target.value?.trim().toLowerCase().unsignText();
    setState({
      filterText: valueText,
    });
    if (loaiDichVu === 200) return;

    const listDichVu = state.listAllDichVu
      .filter(
        (option) =>
          option?.ten?.toLowerCase().unsignText().indexOf(valueText) >= 0
      )
      .map((item, idx) => ({
        ...item,
        key: idx,
      }));
    setState({
      listDichVu,
    });
  };
  //End Select Component ChiDinh

  const labeGhiChu = (
    <>Ghi chú {!nbKetLuan.ghiChu && <span style={{ color: "red" }}> *</span>}</>
  );
  const labeLoiDan = (
    <>Lời dặn {!nbKetLuan.loiDan && <span style={{ color: "red" }}> *</span>}</>
  );
  const disabled =
    state.loaiDonThuoc === undefined ||
    state.loaiDonThuoc == 10 ||
    state.loaiDonThuoc == 150 ||
    state.loaiDonThuoc === "";
  const handleLoiDan = (key) => (value) => {
    let obj = {
      id: infoNb?.id,
      body: {
        ghiChu: nbKetLuan?.ghiChu,
        loiDan: nbKetLuan?.loiDan,
        [key]: value,
      },
    };
    loiDan(obj);
  };
  return (
    <Main>
      <div
        onClick={(e) => e.target.scrollIntoView()}
        ref={refScrollThisElement}
      ></div>
      <StickyWrapper>
        <MainTextFiled>
          <TextField label="Bác sĩ chỉ định" html={fullName} />
          <div className="mr-5">
            <span
              className={(nbChanDoan.dsCdChinh || []).length === 0 ? "red" : ""}
            >
              Chẩn đoán <span className="red"> *</span>:
            </span>
            {(nbChanDoan.dsCdChinh || []).map((cd, index) => {
              if (nbChanDoan.dsCdChinh.length === index + 1) {
                return <span key={cd.id}>{cd.ten}</span>;
              }

              return <span key={cd.id}>{cd.ten}, </span>;
            })}
          </div>
          <TextField
            label={labeGhiChu}
            html={nbKetLuan?.ghiChu}
            delayTyping={300}
            onChange={handleLoiDan("ghiChu")}
          />
          <TextField
            label={labeLoiDan}
            html={nbKetLuan?.loiDan}
            delayTyping={300}
            onChange={handleLoiDan("loiDan")}
          />

          {elementKey === 4 && (
            <div className="select-box">
              <div>Thêm chỉ định &nbsp;</div>
              <div className="wrapper-select">
                <Select
                  defaultValue=""
                  data={doiTuong == 1 ? LOAI_DON_THUOC : ALL_DON_THUOC}
                  onChange={onSelectServiceType}
                />
              </div>
              <div>&nbsp;&nbsp;&nbsp;</div>
              <div>
                <Select
                  data={state?.dataKho}
                  style={{ width: "200px" }}
                  onChange={onSelectServiceStorage}
                  disabled={disabled}
                />
              </div>
              <div className="addition-box">
                <div className="input-box">
                  <img src={imgSearch} alt="imgSearch" />
                  <CustomPopover
                    width={1500}
                    icon={null}
                    onSubmit={onSubmit}
                    onCancel={onClosePopup}
                    isDisabledSubmitButton={listSelectedDv.length <= 0}
                    text={
                      <Input placeholder="Chọn thuốc" onChange={handleSearch} />
                    }
                    contentPopover={renderContent()}
                    visible={state.visible}
                    handleVisible={handleVisible}
                    placement="bottom"
                    loadingBtn={state.loadingChiDinh}
                  />
                </div>
              </div>
            </div>
          )}
        </MainTextFiled>
      </StickyWrapper>
      <div className="collapse-content">
        <CollapseWrapper
          bordered={false}
          defaultActiveKey={["1", "2"]}
          expandIcon={({ isActive }) => (
            <IcArrow
              style={
                isActive
                  ? { transform: "rotate(90deg)" }
                  : { transform: "unset" }
              }
            />
          )}
          className="site-collapse-custom-collapse"
        >
          {listPanel.map((panel) => (
            <Panel key={panel.key} header={panel.header}>
              {panel.content}
            </Panel>
          ))}
        </CollapseWrapper>
      </div>
      {listDvThuocKeNgoai.length > 0 && (
        <div className="collapse-content">
          <CollapseWrapper
            bordered={false}
            defaultActiveKey={[150]}
            expandIcon={({ isActive }) => (
              <IcArrow
                style={
                  isActive
                    ? { transform: "rotate(90deg)" }
                    : { transform: "unset" }
                }
              />
            )}
            className="site-collapse-custom-collapse"
          >
            {/* {listPanelThuocKeNgoai.map((panel) => ( */}
            <Panel
              key={listPanelThuocKeNgoai.key}
              header={listPanelThuocKeNgoai.header}
            >
              {listPanelThuocKeNgoai.content}
            </Panel>
            {/* ))} */}
          </CollapseWrapper>
        </div>
      )}
      <ThongTinThuoc ref={ThongTinThuocRef} khoId={state.khoId}></ThongTinThuoc>
    </Main>
  );
};

const mapStateToProps = (state) => {
  return {
    listDvKho: state.chiDinhDichVuKho.listDvKho || [],
    selectedLoaiDichVu: state.chiDinhDichVuKho.loaiDichVu,
    nbDotDieuTriId: state.khamBenh?.infoNb?.nbDotDieuTriId,
    listGoiDv: state.chiDinhDichVuKho.listGoiDv,
    dataNb: state.chiDinhDichVuKho.dataNb,
    listAllKho: state.kho.listAllKho,
    listDvTonKho: state.chiDinhDichVuKho.listDvTonKho,
    fullName: state.auth.auth.full_name,
    listDvThuoc: state.chiDinhDichVuKho.listDvThuoc || [],
    listData: state.quanTriKho.listData || [],
    listloaiDonThuoc: state.utils.listloaiDonThuoc || [],
    khoaThucHienId: state.khamBenh.infoNb.khoaThucHienId,
    chiDinhTuDichVuId: state.khamBenh?.infoNb?.id,
    listAllLieuDung: state.lieuDung.listAllLieuDung || [],
    listThietLapChonKho: state.thietLapChonKho.listThietLapChonKho || [],
    listDataThuocKeNgoai: state.thuocKeNgoai.listData,
    listDvThuocKeNgoai: state.chiDinhDichVuKho.listDvThuocKeNgoai || [],
    listAllDataThuocKeNgoai: state.thuocKeNgoai.listAllData,
    nhanVienId: state.auth.auth.nhanVienId,
  };
};

const mapDispatchToProps = ({
  chiDinhDichVuKho: {
    searchDv,
    tamTinhTien,
    chiDinhDichVu,
    updateData,
    getListDichVuTonKho,
    getListDichVuThuoc,
    chiDinhDichVuThuocKeNgoai,
    getListDichVuThuocKeNgoai,
  },
  chiDinhKhamBenh: { loiDan },
  quanTriKho: { getData },
  utils: { getUtils },
  thietLapChonKho: { getListThietLapChonKho },
  thuocKeNgoai: { onSizeChange: onSizeChangeThuocKeNgoai },
  donViTinh: { getListDonViTinhTongHop },
  boChiDinh: { getBoChiDinh },
}) => ({
  searchDv,
  tamTinhTien,
  chiDinhDichVu,
  updateData,
  getListDichVuTonKho,
  getListDichVuThuoc,
  getData,
  getUtils,
  getListThietLapChonKho,
  onSizeChangeThuocKeNgoai,
  getListDonViTinhTongHop,
  getBoChiDinh,
  chiDinhDichVuThuocKeNgoai,
  getListDichVuThuocKeNgoai,
  loiDan,
});

export default connect(mapStateToProps, mapDispatchToProps)(DonThuoc);
