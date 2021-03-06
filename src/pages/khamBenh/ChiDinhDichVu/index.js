import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { Collapse, message, Input } from "antd";
import { connect, useDispatch, useSelector } from "react-redux";
import { groupBy } from "lodash";
import orderBy from "lodash/orderBy";
import { ModalNotification2 } from "components/ModalConfirm";
import Header from "./Header";
import DanhSachDichVu from "./DanhSachDichVu";
import { CollapseWrapper, StickyWrapper } from "./styled";
import { LOAI_DICH_VU, LOAI_DICH_VU_CHI_DINH } from "../configs";
import { TRANG_THAI_DICH_VU } from "constants/index";
import { canEditOrUpdate } from "./utils";
import Select from "components/Select";
import imgSearch from "assets/images/template/icSearch.png";
import CustomPopover from "../components/CustomPopover";
import TableLoaiDV from "../components/TableLoaiDV";
import goiDichVuChiTietProvider from "data-access/categories/dm-goi-dich-vu-chi-tiet";
import { openInNewTab } from "utils";

const { Panel } = Collapse;

const ChiDinhDichVu = (props) => {
  const elementKey = Number(useSelector((state) => state.khamBenh.elementKey));
  const boChiDinh = useSelector((state) => state.boChiDinh.boChiDinh);
  const infoNb = useSelector((state) => state.khamBenh.infoNb);
  const dataNb = useSelector((state) => state.chiDinhKhamBenh.dataNb);
  const listGoiDv = useSelector((state) => state.chiDinhKhamBenh.listGoiDv);
  const listDvKham = useSelector(
    (state) => state.chiDinhKhamBenh.listDvKham || []
  );
  const { dsDichVuChiDinhXN, dsDichVuChiDinhKham, dsDichVuChiDinhCls } =
    useSelector((state) => state.chiDinhKhamBenh);
  const trangThaiKham = useSelector(
    (state) => state.khamBenh.thongTinChiTiet?.nbDvKyThuat?.trangThai
  );
  const nhanVienId = useSelector(state => state.auth.auth.nhanVienId)

  const {
    getTongHopDichVuXN,
    getDsDichVuChiDinhKham,
    getDsDichVuChiDinhCLS,
    onDeleteDichVu,
    updateData,
    searchDv,
    chiDinhDichVu,
    tamTinhTien,
  } = useDispatch().chiDinhKhamBenh;
  const searchBenhPham = useDispatch().benhPham.searchBenhPham;
  const searchBenhPhamTongHop = useDispatch().benhPham.searchBenhPhamTongHop;

  const refNotification = useRef(null);
  const refScrollThisElement = useRef(null);
  const inputRef = useRef(null);

  const [state, _setState] = useState({
    deletingRecordName: "",
    deletingRecordLoaiDichVu: "",
    listDeletingId: [],
    activeKey: [],
    indeterminate: false,
    isGoiDichVu: false,
    visible: false,
    loadingChiDinh: false,
    listSelectedDv: [],
    listDichVu: [],
    isCheckAll: false,
    thanhTien: 0,
    boChiDinhSelected: {},
  });

  const setState = (data) => {
    _setState((state) => {
      return {
        ...state,
        ...data,
      };
    });
  };

  useEffect(() => {
    if (infoNb?.id) {
      getTongHopDichVuXN();
      getDsDichVuChiDinhKham();
      getDsDichVuChiDinhCLS();
      searchBenhPhamTongHop({});
      // searchBenhPham({});
    }
  }, [infoNb]);

  const onCollapsed = (value) => {
    setState({
      activeKey: value,
    });
  };
  const onDeletePhieu = (data) => () => {
    const listDichVuId = data
      .filter((item) => canEditOrUpdate(item.trangThai, item.loaiDichVu))
      .map((dichVu) => dichVu.id);

    refNotification.current &&
      refNotification.current.show(
        {
          title: "Xo?? d??? li???u",
          content: `B???n ch???c ch???n mu???n x??a phi???u ${data[0].tenPhieuChiDinh
            ? data[0].tenPhieuChiDinh
            : data[0].tenNhomDichVuCap1
            }?`,
          cancelText: "Quay l???i",
          okText: "?????ng ??",
          classNameOkText: "button-error",
          showImg: true,
          showBtnOk: true,
        },
        () => {
          onDeleteDichVu({
            listDeletingId: listDichVuId,
            loaiDichVu: data[0].loaiDichVu,
          }).then((s) => {
            if (s.code === 0) {
              getDsDichVu(data[0].loaiDichVu);
            }
          });
        }
      );
  };

  const getDsDichVu = (type) => {
    switch (type) {
      case LOAI_DICH_VU[0].id:
        getDsDichVuChiDinhKham();
        break;
      case LOAI_DICH_VU[1].id:
        getTongHopDichVuXN();
        break;
      case LOAI_DICH_VU[2].id:
        getDsDichVuChiDinhCLS();
        break;
      default:
        break;
    }
  };

  const groupAndOrderItem = (items, groupkey, orderKey) => {
    const groupData = groupBy(items, "trangChiDinh");
    const data = {};
    Object.keys(groupData).forEach((trangChiDinh) => {
      data[`${trangChiDinh}-${groupkey}`] = orderBy(
        groupData[trangChiDinh],
        orderKey,
        "asc"
      );
    });
    return data;
  };

  const dataChiDinhXN = useMemo(() => {
    return groupAndOrderItem(dsDichVuChiDinhXN, "xn", [
      "tenPhieuChiDinh",
      "benhPham",
      "phongThucHien",
    ]);
  }, [dsDichVuChiDinhXN]);

  const dataChiDinhCLS = useMemo(() => {
    return groupAndOrderItem(dsDichVuChiDinhCls, "cls", [
      "tenPhieuChiDinh",
      "benhPham",
      "phongThucHien",
    ]);
  }, [dsDichVuChiDinhCls]);

  const dataChiDinhKham = useMemo(() => {
    return groupAndOrderItem(dsDichVuChiDinhKham, "kham", [
      "tenNhomDichVuCap1",
      "benhPham",
      "phongThucHien",
    ]);
  }, [dsDichVuChiDinhKham]);

  const dataSource = useMemo(
    () => ({
      ...dataChiDinhKham,
      ...dataChiDinhXN,
      ...dataChiDinhCLS,
    }),
    [dataChiDinhKham, dataChiDinhXN, dataChiDinhCLS]
  );

  useEffect(() => {
    const keys = Object.keys(dataSource || {});
    setState({
      activeKey: keys,
    });
  }, [dataChiDinhKham, dataChiDinhXN, dataChiDinhCLS]);

  const listPanel = useMemo(() => {
    const list = [];
    Object.keys(dataSource).forEach((key) => {
      const { soPhieu, tenPhieuChiDinh, diaDiemPhongThucHien } =
        dataSource[key][0];
      dataSource[key].forEach((item) => {
        list.push({
          ...item,
          keyDefine: `${soPhieu}-${tenPhieuChiDinh}-${diaDiemPhongThucHien}`,
        });
      });
    });
    const grouped = groupBy(list, "keyDefine");
    return Object.keys(grouped).map((key) => {
      const { tenPhieuChiDinh, tenNhomDichVuCap1, loaiDichVu } =
        (grouped && grouped[key][0]) || {};
      const listTrangThai = grouped[key].map((item) => item.trangThai);
      return {
        header: (
          <Header
            title={tenPhieuChiDinh || tenNhomDichVuCap1}
            listTrangThai={listTrangThai}
            loaiDichVu={loaiDichVu}
            nbDotDieuTriId={infoNb?.nbDotDieuTriId}
            isCollapsed={state.activeKey.includes(key)}
            dataSource={grouped}
            soPhieuId={grouped[key]?.[0]?.soPhieuId}
            phieuChiDinhId={grouped[key]?.[0]?.phieuChiDinhId}
            key={key}
            onDelete={onDeletePhieu(grouped[key], key)}
          />
        ),
        content: (
          <DanhSachDichVu
            dataGroup={grouped[key]}
            getDsDichVu={getDsDichVu}
            searchBenhPham={searchBenhPham}
            onDeleteDichVu={onDeleteDichVu}
          />
        ),
        key,
      };
    });
  }, [dataChiDinhKham, dataChiDinhXN, dataChiDinhCLS, state.activeKey]);

  const chanDoan = useMemo(() => {
    const { dsCdChinh = [], cdSoBo } = dataNb || {};
    if (dsCdChinh.length) {
      return dsCdChinh.map((item) => item.ten).join();
    }
    return cdSoBo;
  }, [dataNb]);

  //Select Component ChiDinh  ------------------------------------------------------------------------------------
  const listGoiDvFilter = useMemo(() => {
    if (state.loaiDichVu !== 150 || !listGoiDv) return [];
    if (!state.filterText) return listGoiDv;
    return listGoiDv.filter(
      (item) =>
        item.ten.toLowerCase().unsignText().indexOf(state.filterText) >= 0
    );
  }, [state.filterText, listGoiDv, state.loaiDichVu]);
  const getDsDichVuChiDinh = (listLoaiDv) => {
    if (listLoaiDv.includes(LOAI_DICH_VU[0].id)) {
      getDsDichVuChiDinhKham();
    }
    if (listLoaiDv.includes(LOAI_DICH_VU[1].id)) {
      getTongHopDichVuXN();
    }
    if (listLoaiDv.includes(LOAI_DICH_VU[2].id)) {
      getDsDichVuChiDinhCLS();
    }
  };

  useEffect(() => {
    const { listSelectedDv } = state;
    const listSelectedUniqueKey = listSelectedDv.map((item) => item.uniqueKey);
    const listDichVu = listDvKham
      .map((item, index) => ({
        ...item,
        key: index,
        uniqueKey: `${item.id}-${item.dichVuId}`,
      }))
      .filter((itemFilter) => !itemFilter.hanCheKhoaChiDinh);
    setState({
      listDichVu,
      listAllDichVu: listDichVu,
      isCheckAll: listDichVu.every((item) =>
        listSelectedUniqueKey.includes(item.uniqueKey)
      ),
    });
  }, [listDvKham]);

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
      nbDotDieuTriId: infoNb?.nbDotDieuTriId,
      nbDichVu: {
        dichVu: {
          ten: item.ten,
          ma: item.ma,
        },
        dichVuId: item?.dichVuId,
        soLuong: 1,
        loaiDichVu: item?.loaiDichVu,
      },
      nbDvKyThuat: {
        phongId: item.phongId,
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
  const onSelected = (idx, checked) => {
    const { listSelectedDv, listDichVu } = state;
    let updatedListDv = [];
    if (checked) {
      updatedListDv = [listDichVu[idx], ...listSelectedDv];
    } else {
      updatedListDv = listSelectedDv.filter(
        (item) => item.uniqueKey !== listDichVu[idx].uniqueKey
      );
    }

    onTamTinhTien(updatedListDv);
  };

  const onSelectedBoChiDinh = (itemSelected) => {
    let item = {};
    let obj = {
      khoaChiDinhId: infoNb?.khoaChiDinhId,
      loaiDichVu: state.loaiDichVu,
      bacSiChiDinhId : nhanVienId
    };

    if (itemSelected.id !== state.boChiDinhSelected.id) {
      //n???u item kh??ng gi???ng th?? s??? th??m v??o
      item = itemSelected;
    }
    if (!!item.id) {
      obj.boChiDinhId = item.id;
    }
    searchDv(obj);
    setState({ boChiDinhSelected: item });
  };
  // useEffect(() => {
  //   if(!!state.boChiDinhSelected.id){
  //     searchDv({boChiDinhId : state.boChiDinhSelected.id})
  //   }
  // },[state.boChiDinhSelected])

  const {
    listDichVu,
    listSelectedDv,
    thanhTien,
    isCheckAll,
    indeterminate,
    isGoiDichVu,
  } = state;
  const renderContent = useCallback(() => {
    switch (elementKey) {
      case 1: {
        return (
          <TableLoaiDV
            dataNb={dataNb}
            data={listDichVu}
            listGoiDv={listGoiDvFilter}
            listSelected={listSelectedDv}
            thanhTien={thanhTien}
            onSelected={onSelected}
            checkAll={isCheckAll}
            indeterminate={indeterminate}
            onSelectedAll={onSelectedAll}
            hasChildren={isGoiDichVu}
            getDvChiTiet={getDvChiTiet}
            disableChiDinh={disableChiDinh}
            handleCloseTag={handleCloseTag}
            boChiDinh={boChiDinh}
            boChiDinhSelected={state.boChiDinhSelected}
            onSelectedBoChiDinh={onSelectedBoChiDinh}
          />
        );
      }
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
    state.boChiDinhSelected,
  ]);
  const disableChiDinh = useMemo(() => {
    return !dataNb?.dsCdChinh?.length && !dataNb?.cdSoBo;
  }, [dataNb?.id, dataNb?.cdSoBo, dataNb?.dsCdChinh]);
  useEffect(() => {
    if (elementKey !== 1) return;
    if (!!dataNb?.cdSoBo || dataNb?.dsCdChinhId.length > 0) {
      searchDv({ khoaChiDinhId: infoNb?.khoaChiDinhId , bacSiChiDinhId : nhanVienId});
      // getBoChiDinh({})
    } else {
      updateData({
        listDvKham: [],
      });
    }
  }, [disableChiDinh, elementKey]);

  const onSelectServiceType = (value) => {
    if (disableChiDinh) return;
    inputRef.current.state.value = "";
    updateData({
      listLoaiDichVu: value ? [value] : [],
    });
    inputRef.current.input.value = "";

    setState({
      loaiDichVu: value,
      indeterminate: false,
      isGoiDichVu: value === 150,
    });

    searchDv({ loaiDichVu: value, khoaChiDinhId: infoNb?.khoaChiDinhId , bacSiChiDinhId : nhanVienId});
    // getBoChiDinh({ dsLoaiDichVu: value })
  };
  useEffect(() => {
    if (state.visible) refScrollThisElement.current.click();
  }, [state.visible]);
  const handleVisible = (e) => {
    setState({
      visible: true,
    });
    if (state.loaiDichVu == 150) {
      searchDv({ loaiDichVu: 150, khoaChiDinhId: infoNb?.khoaChiDinhId , bacSiChiDinhId : nhanVienId});
      // getBoChiDinh({ dsLoaiDichVu: 150 })
    }
  };

  const onSubmit = () => {
    const { loaiDichVu, listSelectedDv } = state;
    if (!listSelectedDv.length) {
      message.error("Y??u c???u nh???p ch??? ?????nh d???ch v???!");
      return;
    }
    setState({
      loadingChiDinh: true,
    });
    chiDinhDichVu()
      .then(({ code, listLoaiDichVu }) => {
        setState({
          loadingChiDinh: false,
          listSelectedDv: [],
          listDichVu: loaiDichVu === 150 ? [] : loaiDichVu,
        });
        if (code === 0) {
          onClosePopup();
          getDsDichVuChiDinh(listLoaiDichVu);
        }
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
      listDichVu: state.loaiDichVu === 150 ? [] : state.listDichVu,
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
    if (loaiDichVu === 150) return;

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
  const renderSticky = useMemo(() => {
    return (
      <StickyWrapper>
        <div className="info">
          <div className="info__left">
            <p>
              Ch???n ??o??n: <span>{chanDoan}</span>
            </p>
            <p>
              B??c s?? ch??? ?????nh: <span>Ng?????i b???nh y??u c???u</span>
            </p>
          </div>
          <div className="info__right">
            Ch???n ??o??n ??i k??m:
            <span>
              {(dataNb?.dsCdKemTheo || []).map((item) => item.ten).join()}
            </span>
          </div>
        </div>
        {elementKey === 1 &&
          trangThaiKham !=
          TRANG_THAI_DICH_VU.DA_KET_LUAN && (
            <div className="select-box">
              <div
                className="pointer"
                onClick={() => {
                  let path = "/danh-muc/dich-vu-kham-benh";
                  if (state.loaiDichVu == 10) path = "/danh-muc/dich-vu-kham-benh";
                  else if (state.loaiDichVu = 20) path = "/danh-muc/dich-vu-xet-nghiem";
                  else if (state.loaiDichVu = 30) path = "/danh-muc/dich-vu-cdha-tdcn";
                  else if (state.loaiDichVu = 150) path = "/danh-muc/goi-dich-vu";
                  openInNewTab(path);
                  return;
                }}
              >Th??m ch??? ?????nh &nbsp;</div>
              <div>
                <Select
                  defaultValue=""
                  className="select-box_select"
                  data={LOAI_DICH_VU_CHI_DINH}
                  placeholder={"Ch???n lo???i d???ch v???"}
                  onChange={onSelectServiceType}
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
                    text={
                      <Input
                        placeholder="Ch???n d???ch v???"
                        onChange={handleSearch}
                        ref={inputRef}
                      />
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
      </StickyWrapper>
    );
  }, [
    chanDoan,
    dataNb,
    elementKey,
    state.visible,
    state.loadingChiDinh,
    listDichVu,
    listSelectedDv,
    thanhTien,
    isCheckAll,
    indeterminate,
    isGoiDichVu,
    listGoiDvFilter,
    state.boChiDinhSelected,
    trangThaiKham,
  ]);
  return (
    <>
      <div
        onClick={(e) => e.target.scrollIntoView()}
        ref={refScrollThisElement}
      ></div>
      {renderSticky}
      <div className="collapse-content">
        <CollapseWrapper
          bordered={false}
          activeKey={state.activeKey}
          // accordion
          onChange={onCollapsed}
        >
          {listPanel.map((panel, idx) => (
            <Panel showArrow={false} key={panel.key} header={panel.header}>
              {panel.content}
            </Panel>
          ))}
        </CollapseWrapper>
      </div>

      <ModalNotification2 ref={refNotification} />
    </>
  );
};

export default ChiDinhDichVu;
