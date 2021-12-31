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
import imgSearch from "assets/images/template/icSearch.png";
import CustomPopover from "pages/chanDoanHinhAnh/tiepNhan/CustomPopover";
import TableVatTu from "../components/TableVatTu";
import { groupBy } from "lodash";

const { Panel } = Collapse;
const DonThuoc = ({ elementKey, dataNbChiDinh, dataKho }) => {
  const boChiDinh = useSelector((state) => state.boChiDinh.boChiDinh);
  const {
    auth: { auth },
    chiDinhDichVuVatTu: {
      dataNb,
      listDvTonKho,
      listDvVatTu,
      listDvKho,
      listGoiDv,
    },
  } = useSelector((state) => state);
  const {
    chiDinhDichVuVatTu: {
      searchDv,
      tamTinhTien,
      chiDinhDichVu,
      updateData,
      getListDichVuTonKho,
      getListDichVuVatTu,
    },
    quanTriKho: { getData },
    donViTinh: { getListDonViTinhTongHop },
  } = useDispatch();

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
    getData({ size: 999 });
    getListDonViTinhTongHop({});
  }, []);

  useEffect(() => {
    if(elementKey === 2) {
      searchDv({ loaiDichVu: 100 });
    }
  }, [elementKey]);

  const listPanel = useMemo(() => {
    const grouped = groupBy(listDvVatTu, "loaiDonThuoc");
    return Object.keys(grouped).map((key) => {
      let groupByIdArr = grouped[key];
      return {
        header: (
          <Header
            title={"Đơn tủ trực"}
            listDvVatTu={groupByIdArr}
            nbDotDieuTriId={dataNbChiDinh?.nbDotDieuTriId}
          />
        ),
        content: (
          <Table
            title="Vật tư"
            listDvVatTu={groupByIdArr}
            nbDotDieuTriId={dataNbChiDinh?.nbDotDieuTriId}
            // listloaiDonThuoc={key}
          />
        ),
        key,
      };
    });
  }, [listDvVatTu]);

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
    getListDichVuVatTu({ nbDotDieuTriId: dataNbChiDinh?.nbDotDieuTriId });
  }, [dataNbChiDinh?.nbDotDieuTriId]);

  useEffect(() => {
    const { listSelectedDv } = state;
    const listSelectedUniqueKey = listSelectedDv.map((item) => item.uniqueKey);

    let arr = listDvTonKho;
    let arrAll = [];

    let listDichVu = [];

    const result = arr.map((item, index) => ({
      ...item,
      key: index,
      uniqueKey: `${item.id}-${item.dichVuId}`,
    }));
    listDichVu = result;

    setState({
      listDichVu,
      listAllDichVu: arrAll,
      isCheckAll: listDichVu.every((item) =>
        listSelectedUniqueKey.includes(item.uniqueKey)
      ),
    });
  }, [listDvKho, listDvTonKho]);
  // const handleCloseTag = (data) => {
  //   setState({
  //     listSelectedDv: data,
  //   });
  //   onTamTinhTien(data);
  // };

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
      nbDotDieuTriId: dataNbChiDinh?.nbDotDieuTriId,
      nbDichVu: {
        dichVuId: item?.dichVuId,
        soLuong: item.soLuong,
        dichVu: {
          id: item?.id,
          ma: item?.ma,
          ten: item?.ten,
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

  const onSelectedBoChiDinh = (itemSelected) => {
    let item = {};
    let obj = {
      // khoaChiDinhId: infoNb.khoaChiDinhId,
      loaiDichVu: 100,
    };

    if (itemSelected.id !== state.boChiDinhSelected?.id) {
      //nếu item không giống thì sẽ thêm vào
      item = itemSelected;
    }
    if (!!item.id) {
      obj.boChiDinhId = item.id;
    }
    console.log("object", obj);
    getListDichVuTonKho({ ...obj, khoId: state.khoId });
    // setState({ boChiDinhSelected: item });
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
    return (
      <TableVatTu
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
        khoId={state?.khoId}
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
    boChiDinh,
    state?.khoId,
  ]);
  const disableChiDinh = useMemo(() => {
    return !dataNb?.dsCdChinh?.length && !dataNb?.cdSoBo;
  }, [dataNb?.id, dataNb?.cdSoBo, dataNb?.dsCdChinh]);
  useEffect(() => {
    if (elementKey !== 1) return;
    if (!!dataNb?.cdSoBo || dataNb?.dsCdChinhId?.length > 0) {
      searchDv({});
    } else {
      updateData({
        listDvKho: [],
      });
    }
  }, [disableChiDinh, elementKey]);

  const onSelectServiceStorage = (value) => {
    setState({
      khoId: value,
      indeterminate: false,
    });
    getListDichVuTonKho({ khoId: value, loaiDichVu: 100 });
  };

  const handleVisible = (e) => {
    setState({
      visible: true,
    });
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
      return {
        nbDotDieuTriId: dataNbChiDinh?.nbDotDieuTriId,
        nbDichVu: {
          dichVuId: item?.dichVuId,
          soLuong: item.soLuong,
          chiDinhTuDichVuId: dataNbChiDinh?.id,
          chiDinhTuLoaiDichVu: dataNbChiDinh?.loaiDichVu,
          khoaChiDinhId: dataNbChiDinh?.khoaChiDinhId,
          loaiDichVu: item?.loaiDichVu,
          dichVu: {
            id: item?.id,
            ma: item?.ma,
            ten: item?.ten,
            tenHoatChat: item?.tenHoatChat,
          },
        },
        nbDvKho: {
          khoId: state.khoId,
        },
      };
    });
    chiDinhDichVu(dataTable)
      .then((s) => {
        setState({
          loadingChiDinh: false,
          listSelectedDv: [],
        });
        if (s?.code === 0) {
          getListDichVuVatTu({ nbDotDieuTriId: dataNbChiDinh?.nbDotDieuTriId });
          onClosePopup();
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
          <TextField label="Bác sĩ chỉ định" html={auth.full_name} />
          <div className="select-box">
            <div>Thêm chỉ định &nbsp;</div>
            <div>&nbsp;&nbsp;&nbsp;</div>
            <div>
              <Select
                data={dataKho}
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
                    <Input placeholder="Chọn vật tư" onChange={handleSearch} />
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
    </Main>
  );
};

const mapStateToProps = (state) => {
  return {
    dataNb: state.chiDinhDichVuVatTu?.dataNb || {},
    listAllKho: state.kho.listAllKho,
    listDvTonKho: state.chiDinhDichVuVatTu?.listDvTonKho,
    fullName: state.auth.auth.full_name,
    listDvVatTu: state.chiDinhDichVuVatTu.listDvVatTu || [],
    listData: state.quanTriKho.listData || [],
    listThietLapChonKho: state.thietLapChonKho.listThietLapChonKho || [],
  };
};

const mapDispatchToProps = ({
  chiDinhDichVuVatTu: {
    searchDv,
    tamTinhTien,
    chiDinhDichVu,
    updateData,
    getListDichVuTonKho,
    getListDichVuVatTu,
  },
  quanTriKho: { getData },
  utils: { getUtils },
  thietLapChonKho: { getListThietLapChonKho },
  donViTinh: { getListDonViTinhTongHop },
  boChiDinh: { getBoChiDinh },
}) => ({
  searchDv,
  tamTinhTien,
  chiDinhDichVu,
  updateData,
  getListDichVuTonKho,
  getListDichVuVatTu,
  getData,
  getUtils,
  getListThietLapChonKho,
  getListDonViTinhTongHop,
  getBoChiDinh,
});

export default connect(mapStateToProps, mapDispatchToProps)(DonThuoc);
