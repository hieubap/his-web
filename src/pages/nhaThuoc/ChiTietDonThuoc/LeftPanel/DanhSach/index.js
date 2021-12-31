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
    // đăng ký phím tắt
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
      //mặc định cho redux dsThuocEdit
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
        {/* <div>Cách dùng : <span>2</span></div> */}
        <div>
          Liều dùng - Cách dùng:
          {/* <span>{listAllLieuDung.find(itemLieuDung => itemLieuDung.id === item?.lieuDung)?.ten}</span> */}
          <SelectAntd
            bordered={false}
            style={{
              marginLeft: 10,
              borderBottom: "1px solid black",
              width: 250,
            }}
            placeholder="Nhập liều dùng - cách dùng"
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
          <div>Đợt dùng:</div>
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
              placeholder="Nhập đợt dùng"
              defaultValue={
                dsThuocEdit.find((itemDs) => itemDs.id === item.id)?.dotDung
              }
              type="number"
              min={1}
              maxLength={3}
              onChange={onChangePopupInHoverName(item, "dotDung")}
              onKeyUp={(e) => {
                if (Number(e.target.value) === 0) {
                  message.error("Vui lòng nhập đợt dùng > 0");
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
          <div>Thời gian dùng:</div>
          <PopoverCash>
            <RangePicker
              format="DD/MM/YYYY"
              className="range-picker"
              placeholder={["Từ ngày", "đến ngày"]}
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
          Đường dùng : <span>{item?.nbDichVu?.dichVu?.tenDuongDung}</span>
        </div>
        <div>
          Lô nhập : <span>{item?.nbDvKho?.loNhap?.soLo}</span>
        </div>
        <br />
        <div>
          Trạng thái thanh toán :{" "}
          {`${
            !infoPatient?.phieuThu?.thanhToan
              ? "Chưa thanh toán"
              : "Đã thanh toán"
          }`}
        </div>
        <div>
          Khoa chỉ định : <span>{item?.nbDichVu?.khoaChiDinh?.ten}</span>
        </div>
        <div>
          Ngày kê :{" "}
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
    //reset giá trị input khi chuyển đổi loại chiết khấu
    let cloneDsDichVu = [...state.dsDichVu];
    cloneDsDichVu.forEach((itemDs, index) => {
      if (itemDs.id === item.id) {
        cloneDsDichVu.splice(index, 1);
      }
    });

    // xử lý chọn loại chiết khấu
    let listCustom = [];
    if (findIndex !== -1) {
      // nếu có dữ liệu, thì chọn chiết khấu tiền cho dịch vụ đó đang được chọn
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
        // miễn giảm bằng tiền
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
        // miễn giảm bằng phần trăm
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
        <div>Tổng tiền</div>
        <div>
          {item?.nbDichVu?.tienNbTuTra &&
            item?.nbDichVu?.tienNbTuTra.formatPrice()}
        </div>
        {/* <div>Cách dùng : <span>2</span></div> */}
        <div>Chiết khấu</div>
        <Row>
          <div>
            {state.listTypeDiscountInPopup.includes(item.id) ? ( // nếu có id thì chọn thanh toán tiền sẽ được chọn
              <NumberFormat
                customInput={Input}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                className="input-discount"
                onValueChange={onChangeDiscountLine(item, "cash")}
                // value={state.dsDichVu.find(itemFind => itemFind.id === item.id)?.phanTramMienGiamDichVu}
                placeholder="Nhập số tiền"
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
                placeholder="Nhập số %"
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
        <div>Thành tiền</div>
        <div>{renderThanhTienPopup(item)}</div>
        <Row align="space-between">
          <ButtonBack
            style={{ border: "1px solid gray" }}
            onClick={openPopupEachLine(item)}
          >
            Quay lại
          </ButtonBack>
          <ButtonNext onClick={openPopupEachLine(item, "submit")}>
            Lưu{" "}
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
          // chức năng này nếu search ra 1 thì sẽ thêm vào luôn
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
        // value = giá trị thứ 3 được truyền vào (vd : e.target.innerHTML)
        setState({
          paramsSearchDichVu: value,
        });
      },
      1000,
      e.target.value // giá trị muốn argument của settimeout lấy ra
    );
  };
  const openPopupEachLine = (item, key) => (e) => {
    if (key === "submit") {
      mienGiamProvider
        .addOrUpdateDiscount(
          {
            hinhThucMienGiam: state.listTypeDiscountInPopup.includes(item.id)
              ? 10
              : 20, // phiếu thu (tổng đơn) = 10
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
  //       <div className="title-1">Từ</div>
  //       <RangePicker
  //         format="DD/MM/YYYY"
  //         suffixIcon={<div></div>}
  //         className="range-picker"
  //         placeholder={["Ngày", "Ngày"]}
  //         customInput={<div>dsdsds</div>}
  //         // bordered={false}
  //         separator={<div>Đến</div>}
  //       >
  //       </RangePicker>
  //     </Row>
  //   </RangePickerCustom>
  // )
  const conditionHiddenSearch = () => {
    if (isVangLai || (isAdvised && !isVangLai) || isVangLai || isThemMoi) {
      // nếu nhấn tư vấn đơn (nb đã có hồ sơ mới hiển thị tư vấn đơn) hoặc là người bệnh vãng lai sẽ hiển thị ô search dich vụ
      return (
        <InputSearch>
          <img src={IconSearch} alt="IconSearch" className="icon-search" />
          <Input
            ref={refSearch}
            placeholder="Nhập hoặc quét mã dịch vụ, tên dịch vụ"
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
    //   return (//  hoặc trang thêm mới sẽ hiện input search
    //     <InputSearch>
    //       <img src={IconSearch} alt="IconSearch" className="icon-search" />
    //       <Input
    //         placeholder="Nhập hoặc quét mã dịch vụ, tên dịch vụ"
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
    // set giá trị render lần đầu cho biến infoPatientInit, để xử lý sort
    if (
      infoPatientInit.current === null ||
      (infoPatientInit.current &&
        Object.keys(infoPatientInit.current).length == 0)
    ) {
      infoPatientInit.current = cloneDeep(infoPatient);
    }
  }, [infoPatient]);
  useEffect(() => {
    // useEffect này dùng để sort danh sách
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
              <div className="content">Danh sách dịch vụ</div>
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
                    Tách dòng
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
                title="Tên dịch vụ"
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
                    placeholder="Ghi chú"
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
                title="SL kê"
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
                title="SL bán"
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
                          "Không thể kê thêm số lượng do có tồn khả dụng bằng 0"
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
                title="SL khả dụng"
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
                title="ĐVT"
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
                title="Đơn giá"
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
                title="Thành tiền"
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
                            title: "Xoá dữ liệu",
                            content: `Bạn chắc chắn muốn xóa ${item.nbDichVu.dichVu.ten}?`,
                            cancelText: "Quay lại",
                            okText: "Đồng ý",
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
