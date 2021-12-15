import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";
import { connect } from "react-redux";
import { Input, Button, message } from "antd";
import { Element, scroller } from "react-scroll";
import Select from "components/Select";
import goiDichVuChiTietProvider from "data-access/categories/dm-goi-dich-vu-chi-tiet";
import imgSearch from "assets/images/template/icSearch.png";
import ArrowLeft from "assets/images/khamBenh/arrow-left.png";
import ArrowRight from "assets/images/khamBenh/arrow-right.png";
import CustomPopover from "../CustomPopover";
import { Main } from "./styled";
import TableLoaiDV from "./TableLoaiDV";
import TableDonThuoc from "./TableDonThuoc";
import { FRAME_TITLE, LOAI_DICH_VU } from "../../configs";
import IcPrint from "assets/images/kho/IcPrint.png";
const StepWrapper = ({
  customHeaderRight,
  children,
  elementKey,
  searchDv,
  listDvKham,
  nbDotDieuTriId,
  tamTinhTien,
  chiDinhDichVu,
  updateData,
  getTongHopDichVuXN,
  getDsDichVuChiDinhKham,
  getDsDichVuChiDinhCLS,
  listGoiDv,
  dataNb,
}) => {
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

  useEffect(() => {
    const { listSelectedDv } = state;
    const listSelectedUniqueKey = listSelectedDv.map((item) => item.uniqueKey);
    const listDichVu = (listDvKham || []).map((item, index) => ({
      ...item,
      key: index,
      uniqueKey: `${item.id}-${item.dichVuId}`,
    }));
    setState({
      listDichVu,
      listAllDichVu: listDichVu,
      isCheckAll: listDichVu.every((item) =>
        listSelectedUniqueKey.includes(item.uniqueKey)
      ),
    });
  }, [listDvKham]);

  const disableChiDinh = useMemo(() => {
    return !dataNb?.dsCdChinh?.length && !dataNb?.cdSoBo;
  }, [dataNb?.id, dataNb?.cdSoBo]);

  useEffect(() => {
    if (dataNb?.cdSoBo !== null && dataNb?.cdSoBo !== "") {
      searchDv({});
    } else {
      updateData({
        listDvKham: [],
      });
    }
  }, [disableChiDinh, elementKey]);

  const latestKey = useRef(null);
  useEffect(() => {
    document.addEventListener("keydown", handleNavigate);
    if (elementKey !== 1 && latestKey?.current === 1) {
      setState({
        isGoiDichVu: false,
      });
    }
    latestKey.current = elementKey;
    return () => window.removeEventListener("keydown", handleNavigate);
  }, [elementKey]);

  const handleVisible = (e) => {
    setState({
      visible: true,
    });
    if (state.loaiDichVu == 200) searchDv({ loaiDichVu: 200 });
  };

  const listGoiDvFilter = useMemo(() => {
    if (state.loaiDichVu !== 200 || !listGoiDv) return [];
    if (!state.filterText) return listGoiDv;
    return listGoiDv.filter(
      (item) =>
        item.ten.toLowerCase().unsignText().indexOf(state.filterText) >= 0
    );
  }, [state.filterText, listGoiDv, state.loaiDichVu]);

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

  const getDsDichVu = (listLoaiDv) => {
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

  const onSubmit = () => {
    const { loaiDichVu, listSelectedDv } = state;
    if (!listSelectedDv.length) {
      message.error("Yêu cầu nhập chỉ định dịch vụ!");
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
          listDichVu: loaiDichVu === 200 ? [] : loaiDichVu,
        });
        if (code === 0) {
          onClose();
          getDsDichVu(listLoaiDichVu);
        }
      })
      .catch(() => {
        setState({
          loadingChiDinh: false,
        });
      });
  };

  const onClose = () => {
    setState({
      visible: false,
      thanhTien: 0,
      listDichVu: state.loaiDichVu === 200 ? [] : state.listDichVu,
      isCheckAll: false,
      indeterminate: false,
      loadingChiDinh: false,
      listSelectedDv: [],
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

  const handleCloseTag = (data) => {
    setState({
      listSelectedDv: data,
    });
    onTamTinhTien(data);
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

  const onTamTinhTien = (listSelected, isCheckAll) => {
    const payload = listSelected.map((item) => ({
      nbDotDieuTriId,
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
      case 0:
        return (
          <TableLoaiDV
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
          />
        );
      case 1:
        return <TableDonThuoc />;
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
  ]);

  const handleNavigate = (e) => {
    const activeElement = document.activeElement;
    if (activeElement) {
      if (
        activeElement.classList.contains("content-editable") ||
        activeElement.tagName == "INPUT" ||
        activeElement.tagName == "TEXTAREA"
      ) {
        return;
      }
    }
    if ([37, 38].includes(e.keyCode)) {
      onNavigate("previous");
    } else if ([39, 40].includes(e.keyCode)) {
      onNavigate("next");
    }
  };

  const onNavigate = (type) => {
    if (
      (elementKey === 0 && type === "previous") ||
      (elementKey === 1 && type === "next")
    ) {
      return;
    }

    const updateState = type === "previous" ? elementKey - 1 : elementKey + 1;

    scroller.scrollTo(updateState, {
      duration: 500,
      smooth: "easeInOutQuint",
      containerId: "containerElement",
    });
  };

  const onRenderFrameTitle = () => {
    return FRAME_TITLE[elementKey];
  };

  const onSelectServiceType = (value) => {
    updateData({
      listLoaiDichVu: value ? [value] : [],
    });

    setState({
      loaiDichVu: value,
      indeterminate: false,
      isGoiDichVu: value === 200,
    });

    searchDv({ loaiDichVu: value });
  };

  return (
    <Main>
      <div className="section-header">
        <div className="create-title">{onRenderFrameTitle()}</div>
        <div className="btn-action">
          <div className="btn-action__right">{customHeaderRight}</div>
        </div>
      </div>
      <Element
        name="stepwrapper"
        className="element section-body"
        id="containerElement"
        style={{
          position: "relative",
          height: `calc(100vh - 630px)`,
          overflowY: "scroll",
        }}
      >
        {children}
      </Element>
      <div className="nav-bottom">
        <Button className="button-ok" onClick={() => onNavigate("previous")}>
          <img src={ArrowLeft} alt="" />
        </Button>
        <Button className="button-ok" onClick={() => onNavigate("next")}>
          <img src={ArrowRight} alt="" />
        </Button>
      </div>
    </Main>
  );
};
const mapStateToProps = (state) => {
  return {
    listDvKham: state.chiDinhDichVuCls.listDvKham || [],
    selectedLoaiDichVu: state.chiDinhDichVuCls.loaiDichVu,
    nbDotDieuTriId: state.choTiepDonDV?.nbDotDieuTriId,
    listGoiDv: state.chiDinhDichVuCls.listGoiDv,
    dataNb: state.chiDinhDichVuCls.dataNb,
  };
};
const mapDispatchToProps = ({
  chiDinhDichVuCls: {
    searchDv,
    tamTinhTien,
    chiDinhDichVu,
    getTongHopDichVuXN,
    getDsDichVuChiDinhKham,
    getDsDichVuChiDinhCLS,
    updateData,
  },
}) => ({
  searchDv,
  tamTinhTien,
  chiDinhDichVu,
  getTongHopDichVuXN,
  getDsDichVuChiDinhKham,
  getDsDichVuChiDinhCLS,
  updateData,
});

export default connect(mapStateToProps, mapDispatchToProps)(StepWrapper);
