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
import { StickyWrapper } from "pages/chanDoanHinhAnh/tiepNhan/StepWrapper/styled";
import { Main, MainTextFiled, CollapseWrapper } from "./styled";
import Select from "components/Select";
import { connect, useSelector, useDispatch } from "react-redux";
import {  ALL_DON_THUOC } from "pages/chanDoanHinhAnh/configs";
import goiDichVuChiTietProvider from "data-access/categories/dm-goi-dich-vu-chi-tiet";
import imgSearch from "assets/images/template/icSearch.png";
import CustomPopover from "pages/chanDoanHinhAnh/tiepNhan/CustomPopover";
import TableDonThuoc from "../components/TableDonThuoc";
import ThongTinThuoc from "./components/ThongTinThuoc";
import { groupBy, values } from "lodash";

const { Panel } = Collapse;
const DonThuoc = ({
  searchDv,
  listDvKho,
  tamTinhTien,
  chiDinhDichVu,
  updateData,
  listGoiDv,
  dataNb,
  getListDichVuTonKho,
  listDvTonKho,
  fullName,
  getListDichVuThuoc,
  listDvThuoc,
  getData,
  listData,
  getUtils,
  listloaiDonThuoc,
  listAllLieuDung,
  getListThietLapChonKho,
  getListDonViTinhTongHop,
  getBoChiDinh,
  elementKey,
  dataNbChiDinh
}) => {

  const boChiDinh = useSelector((state) => state.boChiDinh.boChiDinh);

  const searchDuongDungTongHop = useDispatch().duongDung.searchDuongDungTongHop

  const ThongTinThuocRef = useRef(null);
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
    let dataKho = listData.map((item) => {
      return item.khoTrucThuoc;
    });
    dataKho = dataKho.filter(
      (item2, index) => index === dataKho.findIndex((e) => e.id === item2.id)
    );
    setState({ dataKho });
  }, [listData]);

  useEffect(() => {
    getListThietLapChonKho({ loaiDoiTuongId: 52 });
    getData({ size: 999 });
    getUtils({ name: "loaiDonThuoc" });
    getListDonViTinhTongHop({})
    searchDuongDungTongHop({ page: 0, size: 99999 })

  }, []);

  const listPanel = useMemo(() => {
    const grouped = groupBy(listDvThuoc, "loaiDonThuoc");
    return Object.keys(grouped).map((key) => {
      let groupByIdArr = grouped[key];
      return {
        header: (
          <Header
            title={listloaiDonThuoc.find((x) => x.id == key)?.ten}
            listDvThuoc={groupByIdArr}
            nbDotDieuTriId={dataNbChiDinh?.nbDotDieuTriId}
          />
        ),
        content: (
          <Table
            title="Thuốc điều trị"
            listDvThuoc={groupByIdArr}
            nbDotDieuTriId={dataNbChiDinh?.nbDotDieuTriId}
            listloaiDonThuoc={key}
          />
        ),
        key,
      };
    });
  }, [listDvThuoc]);

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
    getListDichVuThuoc({ nbDotDieuTriId : dataNbChiDinh?.nbDotDieuTriId });
  }, [dataNbChiDinh?.nbDotDieuTriId]);

  useEffect(() => {
    const { listSelectedDv } = state;
    const listSelectedUniqueKey = listSelectedDv.map((item) => item.uniqueKey);

    let arr = []
    let arrAll = []
    switch (state.loaiDonThuoc) {
      case 10: {
        arr = listDvKho
        break;
      }
      default: {
        arr = listDvTonKho
        break;
      }
    }

    let listDichVu = []

    const result = (
      arr
    ).map((item, index) => ({
      ...item,
      key: index,
      uniqueKey: `${item.id}-${item.dichVuId}`,
    }));
    listDichVu = result

    setState({
      listDichVu,
      listAllDichVu: arrAll,
      isCheckAll: listDichVu.every((item) =>
        listSelectedUniqueKey.includes(item.uniqueKey)
      ),
    });
  }, [listDvKho, listDvTonKho]);
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
      nbDotDieuTriId : dataNbChiDinh?.nbDotDieuTriId,
      nbDichVu: {
        dichVuId:  item?.dichVuId,
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
      indeterminate:
        data.length && data.length < state.listDichVu.length,
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
      notCallBoChiDinh: true
    };

    if (itemSelected.id !== state.boChiDinhSelected?.id) {
      //nếu item không giống thì sẽ thêm vào
      item = itemSelected;
    }
    if (!!item.id) {
      obj.boChiDinhId = item.id;
    }
  if ((loaiDonThuoc == 20 || loaiDonThuoc == 30)) {
      delete obj.loaiDichVu
      delete obj.notCallBoChiDinh
      getListDichVuTonKho({ ...obj, khoId: state.khoId })
    } else {
      searchDv(obj)
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
    loaiDonThuoc
  } = state;
  const renderContent = useCallback(() => {
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
    boChiDinh,
    listAllLieuDung,
    state?.khoId,
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
    if (value == 10) { // thuốc nhà thuốc 
      searchDv({ loaiDichVu: 90 });
    } else { // thuốc BHYT và thuốc tủ trực
      getListDichVuTonKho({});
      getBoChiDinh({ dsLoaiDichVu: 90 })
    }
  };

  const onSelectServiceStorage = (value) => {
    setState({
      khoId: value,
      indeterminate: false,
    });
    getListDichVuTonKho({ khoId: value });
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
      return ({
        nbDotDieuTriId : dataNbChiDinh?.nbDotDieuTriId,
        lieuDungId: item.lieuDungId,
        nbDichVu: {
          dichVuId:  item?.dichVuId,
          soLuong: item.soLuong,
          chiDinhTuDichVuId: dataNbChiDinh?.id,
          chiDinhTuLoaiDichVu: dataNbChiDinh?.chiDinhTuLoaiDichVu,
          khoaChiDinhId: dataNbChiDinh?.khoaChiDinhId,
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
        }
      }) 
    });
    chiDinhDichVu(dataTable)
        .then((s) => {
          setState({
            loadingChiDinh: false,
            listSelectedDv: [],
          });
          if (s?.code === 0) {
            getListDichVuThuoc({ nbDotDieuTriId : dataNbChiDinh?.nbDotDieuTriId })
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

  return (
    <Main>
      <div
        onClick={(e) => e.target.scrollIntoView()}
        ref={refScrollThisElement}
      ></div>
      <StickyWrapper>
        <MainTextFiled>
          <TextField label="Bác sĩ chỉ định" html={fullName} />
          

            <div className="select-box">
              <div>Thêm chỉ định &nbsp;</div>
              <div className="wrapper-select">
                <Select
                  value={30}
                  data={ALL_DON_THUOC}
                  onChange={onSelectServiceType}
                  disabled
                />
              </div>
              <div>&nbsp;&nbsp;&nbsp;</div>
              <div>
                <Select
                  data={state?.dataKho}
                  style={{ width: "200px" }}
                  onChange={onSelectServiceStorage}
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
      <ThongTinThuoc ref={ThongTinThuocRef} khoId={state.khoId}></ThongTinThuoc>
    </Main>
  );
};

const mapStateToProps = (state) => {
  return {
    listDvKho: state.chiDinhDichVuTuTruc.listDvKho || [],
    selectedLoaiDichVu: state.chiDinhDichVuTuTruc.loaiDichVu,
    listGoiDv: state.chiDinhDichVuTuTruc.listGoiDv,
    dataNb: state.chiDinhDichVuTuTruc.dataNb,
    listAllKho: state.kho.listAllKho,
    listDvTonKho: state.chiDinhDichVuTuTruc.listDvTonKho,
    fullName: state.auth.auth.full_name,
    listDvThuoc: state.chiDinhDichVuTuTruc.listDvThuoc || [],
    listData: state.quanTriKho.listData || [],
    listloaiDonThuoc: state.utils.listloaiDonThuoc || [],
    listAllLieuDung: state.lieuDung.listAllLieuDung || [],
    listThietLapChonKho: state.thietLapChonKho.listThietLapChonKho || [],
  };
};

const mapDispatchToProps = ({
  chiDinhDichVuTuTruc: {
    searchDv,
    tamTinhTien,
    chiDinhDichVu,
    updateData,
    getListDichVuTonKho,
    getListDichVuThuoc,
  },
  quanTriKho: { getData },
  utils: { getUtils },
  thietLapChonKho: { getListThietLapChonKho },
  donViTinh: { getListDonViTinhTongHop },
  boChiDinh: { getBoChiDinh }
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
  getListDonViTinhTongHop,
  getBoChiDinh,
});

export default connect(mapStateToProps, mapDispatchToProps)(DonThuoc);
