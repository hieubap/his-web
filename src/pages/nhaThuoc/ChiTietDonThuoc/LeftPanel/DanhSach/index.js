import React, { memo, useState, useEffect, useMemo, useRef } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { compose } from "redux";
import {
  Input,
  Checkbox,
  Row,
  Popover,
  DatePicker,
  Select as SelectAntd,
  message,
} from "antd";
import get from "lodash/get";
import { ROLES } from "constants";
// import Header from "components/Header";
import Table from "components/Table";
import {
  Main,
  InputSearch,
  Header,
  InputText,
  PopoverCash,
  ButtonNext,
  ButtonBack,
  PopoverCustom,
  RangePickerCustom,
  InputNumberStyled,
} from "./styled";
import Select from "components/Select";
import { checkRole } from "app/Sidebar/constant";
import useWindowSize from "hook/useWindowSize";
import { ModalNotification2 } from "components/ModalConfirm";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import ModalListDichVuTimKiem from "../ModalListDichVuTimKiem";
import moment from "moment";
import { debounce, cloneDeep, orderBy } from "lodash";
import NumberFormat from "react-number-format";
import mienGiamProvider from "data-access/nb-phieu-thu-provider";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { combineSort } from "utils";
const { RangePicker } = DatePicker;

const DanhSach = ({ isThemMoi, layerId }) => {
  const infoPatientInit = useRef(null);
  //get redux
  const thuocChiTiet = useSelector((state) => state.thuocChiTiet);
  const { isAdvised, infoPatient, nguoiBenhId, dsThuocEdit, khoId } =
    thuocChiTiet;
  //dispatch redux
  const { updateData, changesDonThuoc, onSearchListDichVuTonKho } =
    useDispatch().thuocChiTiet;
  const { listAllLieuDung } = useSelector((state) => state.lieuDung);

  const refModalNotificationDeleted = useRef(null);
  const refListDichVuTimKiem = useRef(null);
  const refTimeout = useRef(null);

  const { onRegisterHotkey } = useDispatch().phimTat;
  const refSearch = useRef();
  
  const [state, _setState] = useState({
    dsThuoc: [],
    discount: 1,
    listTypeDiscountInPopup: [],
    listVisiblePopupOnLine: [],
    dsDichVu: [],
    dataSortColumn: {},
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const isVangLai = useMemo(() => {
    return infoPatient.nbDotDieuTri?.ngoaiVien;
  }, [infoPatient.nbDotDieuTri]);

  const size = useWindowSize();
  const onRow = (record, index) => {
    return {
      onClick: (event) => {
        updateData({ selectedDonThuoc: record });
        // onShowAndHandleUpdate(record);
      },
    };
  };
  useEffect(() => {
    // ????ng k?? ph??m t???t
    onRegisterHotkey({
      layerId,
      hotKeys: [
        {
          keyCode: 117, //F6
          onEvent: () => {
            refSearch.current && refSearch.current.focus();
          },
        },
      ],
    });
  }, []);
  useEffect(() => {
    if (infoPatient.dsThuoc) {
      //m???c ?????nh cho redux dsThuocEdit
      let dsThuocCustom = infoPatient.dsThuoc.reduce((init, item) => {
        let obj = {
          id: item.id,
          dotDung: item.dotDung,
          ngayThucHienTu: item.ngayThucHienTu,
          ngayThucHienDen: item.ngayThucHienDen,
          lieuDungId: item.lieuDungId,
          nbDichVu: {
            soLuong: item?.nbDichVu?.soLuong,
            ghiChu: item?.nbDichVu?.ghiChu,
            dichVuId: item.nbDichVu.dichVu.id || item.nbDichVu.dichVuId,
          },
        };
        return [...init, obj];
      }, []);
      updateData({ dsThuocEdit: dsThuocCustom });
    }
  }, [infoPatient]);
  const onChangeAdvise = (key, itemTable) => (e) => {
    const objFilter = dsThuocEdit.find((item) => item.id === itemTable.id);
    const objFilterIndex = dsThuocEdit.findIndex(
      (item) => item.id === itemTable.id
    );
    let obj = {
      ...objFilter,
      id: itemTable.id,
      nbDichVu: {
        ...objFilter?.nbDichVu,
        [key]: e.target.value,
        dichVuId: itemTable.nbDichVu.dichVu.id || itemTable.nbDichVu.dichVuId,
      },
    };
    if (!objFilter) {
      let arrObj = [...dsThuocEdit, obj];
      updateData({ dsThuocEdit: arrObj });
    } else {
      dsThuocEdit[objFilterIndex] = obj;
      updateData({ dsThuocEdit: dsThuocEdit });
    }
  };
  const onChangeDate = (item) => (e) => {
    let value = "";
    let value1 = "";
    if (e) {
      value = e[0].format("YYYY-MM-DD");
      value1 = e[1].format("YYYY-MM-DD");
    }
    dsThuocEdit.forEach((itemDs) => {
      if (item.id === itemDs.id) {
        itemDs.ngayThucHienTu = value;
        itemDs.ngayThucHienDen = value1;
      }
    });
    // setState({ [`tuThoiGian${key}`]: value, [`denThoiGian${key}`]: value1 });
  };

  const onChangePopupInHoverName = (item, key) => (e) => {
    if (key === "dotDung") {
      dsThuocEdit.forEach((itemDs) => {
        if (item.id === itemDs.id) {
          itemDs.dotDung = e.target.value;
        }
      });
      updateData({ dsThuocEdit });
    }
    if (key === "lieuDungId") {
      dsThuocEdit.forEach((itemDs) => {
        if (item.id === itemDs.id) {
          itemDs.lieuDungId = e;
        }
      });
      updateData({ dsThuocEdit });
    }
  };
  const contentNamePopover = (item) => {
    return (
      <div
        style={{
          pointerEvents:
            (isAdvised && !isVangLai) || isVangLai || isThemMoi
              ? "unset"
              : "none",
        }}
      >
        <div>
          <b>{`${item?.nbDichVu?.dichVu?.ma} - ${item?.nbDichVu?.dichVu?.ten} - ${item?.nbDichVu?.dichVu?.hamLuong}`}</b>
        </div>
        {/* <div>C??ch d??ng : <span>2</span></div> */}
        <div>
          Li???u d??ng - C??ch d??ng:
          {/* <span>{listAllLieuDung.find(itemLieuDung => itemLieuDung.id === item?.lieuDung)?.ten}</span> */}
          <SelectAntd
            bordered={false}
            style={{
              marginLeft: 10,
              borderBottom: "1px solid black",
              width: 250,
            }}
            placeholder="Nh???p li???u d??ng - c??ch d??ng"
            onChange={onChangePopupInHoverName(item, "lieuDungId")}
            defaultValue={item?.lieuDungId}
            // onChange={onSearchInput("tenNb")}
          >
            {(listAllLieuDung || []).map((o) => {
              return (
                <SelectAntd.Option key={o?.id} value={o?.id}>
                  {o.ten}
                </SelectAntd.Option>
              );
            })}
          </SelectAntd>
        </div>

        <Row>
          <div>?????t d??ng:</div>
          <PopoverCash>
            <Input
              disabled={
                (isAdvised && !isVangLai) || isVangLai || isThemMoi
                  ? false
                  : true
              }
              value={
                state.dsDichVu.find((itemFind) => itemFind.id === item.id)
                  ?.phanTramMienGiamDichVu
              }
              className="input-discount"
              placeholder="Nh???p ?????t d??ng"
              defaultValue={
                dsThuocEdit.find((itemDs) => itemDs.id === item.id)?.dotDung
              }
              type="number"
              min={1}
              maxLength={3}
              onChange={onChangePopupInHoverName(item, "dotDung")}
              onKeyUp={(e) => {
                if (Number(e.target.value) === 0) {
                  message.error("Vui l??ng nh???p ?????t d??ng > 0");
                  return e.preventDefault();
                }
              }}
              onKeyPress={(e) => {
                if (e.key === "-" || e.key === "+" || e.key === "e") {
                  return e.preventDefault();
                }
              }}
              // onKeyUp={onKeyUpInputInPopup(item, "percent")}
            />
          </PopoverCash>
        </Row>
        <Row style={{ alignItems: "center" }}>
          <div>Th???i gian d??ng:</div>
          <PopoverCash>
            <RangePicker
              format="DD/MM/YYYY"
              className="range-picker"
              placeholder={["T??? ng??y", "?????n ng??y"]}
              defaultValue={() => {
                const findItem = dsThuocEdit.find(
                  (itemDs) => itemDs.id === item.id
                );
                const ngayThucHienTu =
                  findItem?.ngayThucHienTu && moment(findItem.ngayThucHienTu);
                const ngayThucHienDen =
                  findItem?.ngayThucHienDen && moment(findItem.ngayThucHienDen);
                return [ngayThucHienTu, ngayThucHienDen];
              }}
              // bordered={false}
              onChange={onChangeDate(item)}
              separator={<div>-</div>}
            ></RangePicker>
          </PopoverCash>
        </Row>
        <div>
          ???????ng d??ng : <span>{item?.nbDichVu?.dichVu?.tenDuongDung}</span>
        </div>
        <div>
          L?? nh???p : <span>{item?.nbDvKho?.loNhap?.soLo}</span>
        </div>
        <br />
        <div>
          Tr???ng th??i thanh to??n :{" "}
          {`${
            !infoPatient?.phieuThu?.thanhToan
              ? "Ch??a thanh to??n"
              : "???? thanh to??n"
          }`}
        </div>
        <div>
          Khoa ch??? ?????nh : <span>{item?.nbDichVu?.khoaChiDinh?.ten}</span>
        </div>
        <div>
          Ng??y k?? :{" "}
          <span>
            {item?.nbDichVu?.thoiGianChiDinh &&
              moment(item?.nbDichVu?.thoiGianChiDinh).format("DD/MM/YYYY")}
          </span>
        </div>
      </div>
    );
  };

  const chooseTypeDiscountInPopup = (item) => (e) => {
    let findIndex = state.listTypeDiscountInPopup.findIndex(
      (itemFindIndex) => itemFindIndex === item.id
    );
    //reset gi?? tr??? input khi chuy???n ?????i lo???i chi???t kh???u
    let cloneDsDichVu = [...state.dsDichVu];
    cloneDsDichVu.forEach((itemDs, index) => {
      if (itemDs.id === item.id) {
        cloneDsDichVu.splice(index, 1);
      }
    });

    // x??? l?? ch???n lo???i chi???t kh???u
    let listCustom = [];
    if (findIndex !== -1) {
      // n???u c?? d??? li???u, th?? ch???n chi???t kh???u ti???n cho d???ch v??? ???? ??ang ???????c ch???n
      state.listTypeDiscountInPopup.splice(findIndex, 1);
      listCustom = state.listTypeDiscountInPopup;
    } else {
      listCustom = [...state.listTypeDiscountInPopup, item.id];
    }
    setState({ listTypeDiscountInPopup: listCustom, dsDichVu: cloneDsDichVu });
  };

  const onChangeDiscountLine = (item, key) => (e) => {
    let findIndex = state.dsDichVu.findIndex(
      (itemFindIndex) => itemFindIndex.id === item.id
    );
    if (key === "cash") {
      if (findIndex !== -1) {
        // mi???n gi???m b???ng ti???n
        state.dsDichVu[findIndex].tienMienGiamDichVu =
          e?.target?.value || e?.floatValue;
        setState({ dsDichVu: state.dsDichVu });
      } else {
        let obj = [
          ...state.dsDichVu,
          {
            id: item.id,
            tienMienGiamDichVu: e?.target?.value || e?.floatValue,
          },
        ];
        setState({ dsDichVu: obj });
      }
    } else {
      if (findIndex !== -1) {
        // mi???n gi???m b???ng ph???n tr??m
        state.dsDichVu[findIndex].phanTramMienGiamDichVu =
          e?.target?.value || e?.floatValue;
        setState({ dsDichVu: state.dsDichVu });
      } else {
        let obj = [
          ...state.dsDichVu,
          {
            id: item.id,
            phanTramMienGiamDichVu: e?.target?.value || e?.floatValue,
          },
        ];
        setState({ dsDichVu: obj });
      }
    }
  };
  const onKeyUpInputInPopup = (item, key) => (e) => {
    if (key === "percent") {
      // if (state.discount === 1) {
      if (Number(e.target.value) > 100) {
        e.target.value = 100;
        // setState({ value: e.target.value })
        let findIndex = state.dsDichVu.findIndex(
          (itemFindIndex) => itemFindIndex.id === item.id
        );
        if (findIndex !== -1) {
          state.dsDichVu[findIndex].phanTramMienGiamDichVu =
            e?.target?.value || e?.floatValue;
          setState({ dsDichVu: state.dsDichVu });
        } else {
          let obj = [
            ...state.dsDichVu,
            {
              id: item.id,
              phanTramMienGiamDichVu: e?.target?.value || e?.floatValue,
            },
          ];
          setState({ dsDichVu: obj });
        }
      }
      // }
      //  else {
      //     e.target.value = e.target.value.formatPrice()
      // }
    }
  };
  const renderThanhTienPopup = (item) => {
    let findItem = state.dsDichVu.find((itemFind) => itemFind.id === item.id);
    if (findItem?.phanTramMienGiamDichVu) {
      const res =
        (item?.nbDichVu?.tienNbTuTra * findItem?.phanTramMienGiamDichVu) / 100;
      return (res && (item?.nbDichVu?.tienNbTuTra - res).formatPrice()) || 0;
    } else if (findItem?.tienMienGiamDichVu) {
      return (
        item?.nbDichVu?.tienNbTuTra - findItem?.tienMienGiamDichVu
      ).formatPrice();
    }
  };
  const contentTotalPopover = (item) => {
    return (
      <PopoverCash style={{ textAlign: "right" }}>
        <div>T???ng ti???n</div>
        <div>
          {item?.nbDichVu?.tienNbTuTra &&
            item?.nbDichVu?.tienNbTuTra.formatPrice()}
        </div>
        {/* <div>C??ch d??ng : <span>2</span></div> */}
        <div>Chi???t kh???u</div>
        <Row>
          <div>
            {state.listTypeDiscountInPopup.includes(item.id) ? ( // n???u c?? id th?? ch???n thanh to??n ti???n s??? ???????c ch???n
              <NumberFormat
                customInput={Input}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                className="input-discount"
                onValueChange={onChangeDiscountLine(item, "cash")}
                // value={state.dsDichVu.find(itemFind => itemFind.id === item.id)?.phanTramMienGiamDichVu}
                placeholder="Nh???p s??? ti???n"
                disabled={
                  (infoPatient?.phieuXuat?.trangThai == 15 ||
                    infoPatient?.phieuXuat?.trangThai == 10) &&
                  !isAdvised
                }
              />
            ) : (
              <Input
                value={
                  state.dsDichVu.find((itemFind) => itemFind.id === item.id)
                    ?.phanTramMienGiamDichVu
                }
                className="input-discount"
                placeholder="Nh???p s??? %"
                type="number"
                onChange={onChangeDiscountLine(item, "percent")}
                onKeyUp={onKeyUpInputInPopup(item, "percent")}
                disabled={
                  (infoPatient?.phieuXuat?.trangThai == 15 ||
                    infoPatient?.phieuXuat?.trangThai == 10) &&
                  !isAdvised
                }
              />
            )}
          </div>
          <Row className="button-choose">
            <div
              className={`percent ${
                state.listTypeDiscountInPopup.includes(item.id) ? "" : "action"
              }`}
              onClick={chooseTypeDiscountInPopup(item)}
            >
              %
            </div>
            <div
              className={`cash ${
                state.listTypeDiscountInPopup.includes(item.id) ? "action" : ""
              }`}
              onClick={chooseTypeDiscountInPopup(item)}
            >
              VND
            </div>
          </Row>
        </Row>
        <div>Th??nh ti???n</div>
        <div>{renderThanhTienPopup(item)}</div>
        <Row align="space-between">
          <ButtonBack
            style={{ border: "1px solid gray" }}
            onClick={openPopupEachLine(item)}
          >
            Quay l???i
          </ButtonBack>
          <ButtonNext onClick={openPopupEachLine(item, "submit")}>
            L??u{" "}
            <img
              style={{ marginLeft: 6 }}
              src={require("assets/images/kho/save.png")}
              alt=""
            ></img>
          </ButtonNext>
        </Row>
      </PopoverCash>
    );
  };
  useEffect(() => {
    if (state.paramsSearchDichVu) {
      onSearchListDichVuTonKho({
        dataSearchDv: state.paramsSearchDichVu,
        timKiem: state.paramsSearchDichVu,
        khoId: isThemMoi ? khoId : infoPatient.khoId,
        // ma: "CPM0001"
      }).then((res) => {
        if (
          state.paramsSearchDichVu &&
          (res.length > 1 || (res.length === 1 && res[0].nhapDotDung))
        ) {
          refListDichVuTimKiem.current.show();
        } else if (
          state.paramsSearchDichVu &&
          res.length === 1 &&
          !res.nhapDotDung
        ) {
          // ch???c n??ng n??y n???u search ra 1 th?? s??? th??m v??o lu??n
          let obj = {
            id: null,
            nbDichVu: {
              dichVuId: res[0].dichVuId,
              soLuong: res[0].soLuongKhaDung,
            },
          };
          let clone = cloneDeep(dsThuocEdit);
          clone.push(obj);
          changesDonThuoc({ id: nguoiBenhId, dsThuoc: clone });
        }
      });
    }
  }, [state.paramsSearchDichVu]);
  const onSearch = (e) => {
    if (refTimeout.current) {
      clearTimeout(refTimeout.current);
      refTimeout.current = null;
    }
    refTimeout.current = setTimeout(
      (value = "") => {
        // value = gi?? tr??? th??? 3 ???????c truy???n v??o (vd : e.target.innerHTML)
        setState({
          paramsSearchDichVu: value,
        });
      },
      1000,
      e.target.value // gi?? tr??? mu???n argument c???a settimeout l???y ra
    );
  };
  const openPopupEachLine = (item, key) => (e) => {
    if (key === "submit") {
      mienGiamProvider
        .addOrUpdateDiscount(
          {
            hinhThucMienGiam: state.listTypeDiscountInPopup.includes(item.id)
              ? 10
              : 20, // phi???u thu (t???ng ????n) = 10
            dsDichVu: state.dsDichVu,
            // [keyPost]: state.value
          },
          infoPatient.phieuThu.id
        )
        .then((res) => {
          let obj = { ...infoPatient };
          obj.phieuThu.tienMienGiam = res.data.tienMienGiam;
          obj.phieuThu.tongTien = res.data.tongTien;
          obj.phieuThu.thanhTien = res.data.thanhTien;
          updateData({
            infoPatient: obj,
          });
        });
    }

    let findIndex = state.listVisiblePopupOnLine.findIndex(
      (itemFindIndex) => itemFindIndex === item.id
    );
    if (findIndex !== -1) {
      state.listVisiblePopupOnLine.splice(findIndex, 1);
      setState({ listVisiblePopupOnLine: state.listVisiblePopupOnLine });
    } else {
      setState({
        listVisiblePopupOnLine: [...state.listVisiblePopupOnLine, item.id],
      });
    }
  };

  // return (
  //   <RangePickerCustom>
  //     <Row>
  //       <div className="title-1">T???</div>
  //       <RangePicker
  //         format="DD/MM/YYYY"
  //         suffixIcon={<div></div>}
  //         className="range-picker"
  //         placeholder={["Ng??y", "Ng??y"]}
  //         customInput={<div>dsdsds</div>}
  //         // bordered={false}
  //         separator={<div>?????n</div>}
  //       >
  //       </RangePicker>
  //     </Row>
  //   </RangePickerCustom>
  // )
  const conditionHiddenSearch = () => {
    if (isVangLai || (isAdvised && !isVangLai) || isVangLai || isThemMoi) {
      // n???u nh???n t?? v???n ????n (nb ???? c?? h??? s?? m???i hi???n th??? t?? v???n ????n) ho???c l?? ng?????i b???nh v??ng lai s??? hi???n th??? ?? search dich v???
      return (
        <InputSearch>
          <img src={IconSearch} alt="IconSearch" className="icon-search" />
          <Input
            ref={refSearch}
            placeholder="Nh???p ho???c qu??t m?? d???ch v???, t??n d???ch v???"
            autoFocus
            onChange={onSearch}
            // onClick={() => {
            //   if (refListDichVuTimKiem.current) {
            //     refListDichVuTimKiem.current.show();
            //   }
            // }}
            // onChange={onChange("qrBN", true)}
            // onKeyDown={onKeyDown}
          />
        </InputSearch>
      );
    }
    // if (isVangLai || isThemMoi) {
    //   return (//  ho???c trang th??m m???i s??? hi???n input search
    //     <InputSearch>
    //       <img src={IconSearch} alt="IconSearch" className="icon-search" />
    //       <Input
    //         placeholder="Nh???p ho???c qu??t m?? d???ch v???, t??n d???ch v???"
    //         autoFocus
    //         onChange={onSearch}
    //       />
    //     </InputSearch>
    //   )
    // }
    return <></>;
  };
  const onClickSort = (key, value) => {
    setState({
      dataSortColumn: {
        ...state.dataSortColumn,
        [key]: value,
      },
    });
  };
  const combineSortCustom = (params = {}) => {
    const keys = Object.keys(params);
    const paramSort = keys.reduce(
      (result, key) =>
        params[key] &&
        params[key] !== undefined &&
        params[key] !== null &&
        params[key] !== ""
          ? [...result, `${key},${params[key] === 1 ? "asc" : "desc"}`]
          : [...result],
      []
    );
    return paramSort;
  };
  useEffect(() => {
    // set gi?? tr??? render l???n ?????u cho bi???n infoPatientInit, ????? x??? l?? sort
    if (
      infoPatientInit.current === null ||
      (infoPatientInit.current &&
        Object.keys(infoPatientInit.current).length == 0)
    ) {
      infoPatientInit.current = cloneDeep(infoPatient);
    }
  }, [infoPatient]);
  useEffect(() => {
    // useEffect n??y d??ng ????? sort danh s??ch
    const dsThuocClone = cloneDeep(infoPatientInit?.current?.dsThuoc);
    const sortList = combineSortCustom(state.dataSortColumn);
    let keyListSort = [];
    let valueListSort = [];
    sortList.forEach((item) => {
      const splitItem = item.split(",");
      keyListSort = [...keyListSort, splitItem[0]];
      valueListSort = [...valueListSort, splitItem[1]];
    });
    infoPatient.dsThuoc = orderBy(dsThuocClone, keyListSort, valueListSort);
    updateData({ infoPatient });
  }, [state.dataSortColumn]);
  return (
    <Main className="main" isThemMoi={isThemMoi}>
      <Header>
        <div className="header">
          <Row className="header-row">
            <Row>
              <div className="content">Danh s??ch d???ch v???</div>
              <div className="content-note">{conditionHiddenSearch()}</div>
            </Row>
            {isThemMoi ||
              (isVangLai && (
                <div>
                  <Checkbox
                  // checked={state.detachLine}
                  // onChange={(e) => {
                  //   setState({ ...state, detachLine: e.target.checked });
                  // }}
                  >
                    T??ch d??ng
                  </Checkbox>
                  <img
                    style={{ marginLeft: 6 }}
                    src={require("assets/images/kho/info.png")}
                    alt=""
                  ></img>
                </div>
              ))}
          </Row>
        </div>
      </Header>
      <Table
        className="table"
        scroll={{ y: 453 }}
        rowKey={"id"}
        onRow={onRow}
        rowClassName={(record) => (record?.checked ? "background-checked" : "")}
        columns={[
          {
            title: <HeaderSearch title="STT" />,
            width: size.width <= 1400 ? 64 : 64,
            dataIndex: "index",
            key: "index",
            hideSearch: true,
            align: "center",
          },
          {
            title: (
              <HeaderSearch
                title="T??n d???ch v???"
                sort_key="nbDichVu.dichVu.ten"
                onClickSort={onClickSort}
                dataSort={state?.dataSortColumn["nbDichVu.dichVu.ten"] || ""}
              />
            ),
            width: 250,
            // dataIndex: "dsThuoc.nbDichVu",
            key: "ten",
            type: true,
            hideSearch: true,

            render: (item) => {
              return (
                <>
                  <PopoverCustom
                    className="popup-custom"
                    placement="right"
                    content={contentNamePopover(item)}
                    trigger={["hover", "click"]}
                  >
                    <div style={{ color: "#0762F7", fontWeight: "bold" }}>
                      {item?.nbDichVu?.dichVu?.ten}
                    </div>
                  </PopoverCustom>
                  <InputText
                    defaultValue={item.nbDichVu.ghiChu}
                    placeholder="Ghi ch??"
                    isAdvised={isAdvised || isThemMoi || isVangLai}
                    onChange={onChangeAdvise("ghiChu", item)}
                  />
                </>
              );
            },
          },
          {
            title: (
              <HeaderSearch
                title="SL k??"
                sort_key="nbDvKho.soLuongYeuCau"
                onClickSort={onClickSort}
                dataSort={state?.dataSortColumn["nbDvKho.soLuongYeuCau"] || ""}
              />
            ),
            // key: "id",
            width: size.width <= 1400 ? 83 : 83,
            // dataIndex: "dsThuoc.ten",
            hideSearch: true,
            align: "right",
            render: (item) => {
              return (
                <>
                  <div>{item?.nbDvKho?.soLuongYeuCau}</div>
                </>
              );
            },
          },
          {
            title: (
              <HeaderSearch
                title="SL b??n"
                sort_key="nbDichVu.soLuong"
                onClickSort={onClickSort}
                dataSort={state?.dataSortColumn["nbDichVu.soLuong"] || ""}
              />
            ),
            width: size.width <= 1400 ? 83 : 83,
            // dataIndex: "soLuongBan",
            // key: "soLuongBan",
            hideSearch: true,
            align: "right",
            render: (item) => {
              return (
                <>
                  <InputText
                    type="number"
                    defaultValue={item.nbDichVu.soLuong}
                    isAdvised={isAdvised || isThemMoi || isVangLai}
                    onChange={onChangeAdvise("soLuong", item)}
                    min={1}
                    onKeyPress={(e) => {
                      if (e.key === "-" || e.key === "+" || e.key === "e") {
                        return e.preventDefault();
                      }
                      if (item?.nbDvKho?.soLuongKhaDung === 0) {
                        message.error(
                          "Kh??ng th??? k?? th??m s??? l?????ng do c?? t???n kh??? d???ng b???ng 0"
                        );
                        // return null;
                      }
                    }}
                  />
                  {/* <div contentEditable={isAdvised ? true : false} onKeyDown={onChangeAdvise}>{item.nbDichVu.soLuong}</div> */}
                </>
              );
            },
          },
          {
            title: (
              <HeaderSearch
                title="SL kh??? d???ng"
                sort_key="nbDvKho.soLuongKhaDung"
                onClickSort={onClickSort}
                dataSort={state?.dataSortColumn["nbDvKho.soLuongKhaDung"] || ""}
              />
            ),
            width: 106,
            // dataIndex: "soLuongKhaDung",
            hideSearch: true,
            align: "right",
            // key: "soLuongKhaDung",
            render: (item) => {
              return (
                <>
                  <div>{item?.nbDvKho?.soLuongKhaDung}</div>
                  {/* <div>{item.formatPrice()}</div> */}
                </>
              );
            },
          },
          {
            title: (
              <HeaderSearch
                title="??VT"
                sort_key="nbDichVu.dichVu.tenDonViTinh"
                onClickSort={onClickSort}
                dataSort={
                  state?.dataSortColumn["nbDichVu.dichVu.tenDonViTinh"] || ""
                }
              />
            ),
            width: size.width <= 1400 ? 83 : 83,
            // dataIndex: "dvt",
            // key: "dvt",
            hideSearch: true,
            align: "right",
            render: (item) => {
              return (
                <>
                  <div>{item?.nbDichVu?.dichVu?.tenDonViTinh}</div>
                </>
              );
            },
          },
          {
            title: (
              <HeaderSearch
                title="????n gi??"
                sort_key="nbDichVu.giaKhongBaoHiem"
                onClickSort={onClickSort}
                dataSort={
                  state?.dataSortColumn["nbDichVu.giaKhongBaoHiem"] || ""
                }
              />
            ),
            width: 138,
            // dataIndex: "donGia",
            // key: "donGia",
            hideSearch: true,
            align: "right",
            render: (item) => {
              return (
                <>
                  <div>{item?.nbDichVu?.giaKhongBaoHiem.formatPrice()}</div>
                </>
              );
            },
          },
          {
            title: (
              <HeaderSearch
                title="Th??nh ti???n"
                sort_key="nbDichVu.tienNbTuTra"
                onClickSort={onClickSort}
                dataSort={state?.dataSortColumn["nbDichVu.tienNbTuTra"] || ""}
              />
            ),
            width: 174,
            // dataIndex: "thanhTien",
            // key: "thanhTien",
            hideSearch: true,
            align: "right",
            render: (item) => {
              return (
                <>
                  <Popover
                    placement="right"
                    visible={state.listVisiblePopupOnLine.includes(item.id)}
                    content={contentTotalPopover(item)}
                    onClick={openPopupEachLine(item)}
                  >
                    <div style={{ color: "#0762F7", fontWeight: "bold" }}>
                      {item?.nbDichVu?.tienNbTuTra?.formatPrice()}
                    </div>
                  </Popover>
                </>
              );
            },
          },
          {
            title: (
              <HeaderSearch
                title={<div style={{ visibility: "hidden" }}>e</div>}
              />
            ),
            width: 25,
            hideSearch: true,
            align: "center",
            render: (item) => {
              if (isAdvised && !isVangLai) {
                return (
                  <div
                    onClick={() => {
                      refModalNotificationDeleted.current &&
                        refModalNotificationDeleted.current.show(
                          {
                            title: "Xo?? d??? li???u",
                            content: `B???n ch???c ch???n mu???n x??a ${item.nbDichVu.dichVu.ten}?`,
                            cancelText: "Quay l???i",
                            okText: "?????ng ??",
                            classNameOkText: "button-error",
                            showImg: true,
                            showBtnOk: true,
                          },
                          () => {
                            const itemDeleteIndex = dsThuocEdit.findIndex(
                              (itemThuocCurrent) =>
                                itemThuocCurrent.id === item.id
                            );
                            dsThuocEdit.splice(itemDeleteIndex, 1);
                            changesDonThuoc({
                              id: nguoiBenhId,
                              dsThuoc: dsThuocEdit,
                              statusDelete: true,
                            });
                          },
                          () => {}
                        );
                    }}
                  >
                    <img
                      src={require("assets/images/kho/delete.png")}
                      alt=""
                    ></img>
                  </div>
                );
              }
              return <> </>;
            },
          },
        ]}
        dataSource={infoPatient?.dsThuoc}
      ></Table>
      <ModalNotification2 ref={refModalNotificationDeleted} />
      <ModalListDichVuTimKiem
        ref={refListDichVuTimKiem}
        isThemMoi={isThemMoi}
      />
    </Main>
  );
};
const mapStateToProps = (state) => {};

const mapDispatchToProps = () => ({});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(DanhSach);
