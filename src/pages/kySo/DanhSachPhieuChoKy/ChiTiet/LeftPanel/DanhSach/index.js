import React, { memo, useState, useEffect, useMemo, useRef } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { compose } from "redux";
import { Input, Checkbox, Row, Popover, DatePicker } from "antd";
import get from "lodash/get";
import orderBy from "lodash/orderBy";
import { ROLES } from "constants";
// import Header from "components/Header";
import Table from "components/Table";
import { Main, InputSearch, Header, InputText, PopoverCash, ButtonNext, ButtonBack, PopoverCustom, RangePickerCustom } from "./styled";
import Select from "components/Select";
import { checkRole } from "app/Sidebar/constant";
import useWindowSize from "hook/useWindowSize";
import { ModalNotification2 } from "components/ModalConfirm";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import ModalListDichVuTimKiem from "../ModalListDichVuTimKiem";
import moment from "moment";
import { debounce, cloneDeep } from "lodash";
import NumberFormat from 'react-number-format';
import mienGiamProvider from "data-access/nb-phieu-thu-provider";
const { RangePicker } = DatePicker;

const DanhSach = ({
  isThemMoi
}) => {
  //get redux
  const thuocChiTiet = useSelector(state => state.thuocChiTiet)
  const { isAdvised, infoPatient, nguoiBenhId, dsThuocEdit, khoId } = thuocChiTiet
  //dispatch redux
  const { updateData, changesDonThuoc, onSearchListDichVuTonKho } = useDispatch().thuocChiTiet
  const { listAllLieuDung } = useSelector(state => state.lieuDung)

  const refModalNotificationDeleted = useRef(null)
  const refListDichVuTimKiem = useRef(null)
  const refTimeout = useRef(null)
  const [state, _setState] = useState({
    dsThuoc: [],
    discount: 1,
    listTypeDiscountInPopup: [],
    listVisiblePopupOnLine: [],
    dsDichVu: []
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const isVangLai = useMemo(() => {
    return infoPatient.nbDotDieuTri?.ngoaiVien
  }, [infoPatient.nbDotDieuTri])

  // useEffect(() => {
  //   let rangePickerInput = document.querySelectorAll(".range-picker .ant-picker-input") // t???o div suffix trong rangepicker 
  //   rangePickerInput.forEach((item,index) => {
  //     let div = document.createElement("div")
  //     div.className = 'icon-suffix'
  //     item.append(div)
  //   })
  // }, [])
  const size = useWindowSize();
  const onRow = (record, index) => {
    return {
     onClick: (event) => {
        updateData({ selectedDonThuoc: record })
        // onShowAndHandleUpdate(record);
      },
    };
  };
  useEffect(() => {
    if (infoPatient.dsThuoc) { //m???c ?????nh cho redux dsThuocEdit
      let dsThuocCustom = infoPatient.dsThuoc.reduce((init, item) => {
        let obj = {
          id: item.id,
          dotDung: item.dotDung,
          ngayThucHienTu: item.ngayThucHienTu,
          ngayThucHienDen: item.ngayThucHienDen,
          nbDichVu: {
            soLuong: item?.nbDichVu?.soLuong,
            ghiChu: item?.nbDichVu?.ghiChu,
            dichVuId: item.nbDichVu.dichVu.id || item.nbDichVu.dichVuId
          }
        }
        return [...init, obj]
      }, [])
      updateData({ dsThuocEdit: dsThuocCustom })
    }
  }, [infoPatient])
  const onChangeAdvise = (key, itemTable) => (e) => {
    const objFilter = dsThuocEdit.find(item => item.id === itemTable.id)
    const objFilterIndex = dsThuocEdit.findIndex(item => item.id === itemTable.id)
    let obj = {
      id: itemTable.id,
      nbDichVu: {
        ...objFilter?.nbDichVu,
        [key]: e.target.value,
        dichVuId: itemTable.nbDichVu.dichVu.id || itemTable.nbDichVu.dichVuId
      }
    }
    if (!objFilter) {
      let arrObj = [...dsThuocEdit, obj]
      updateData({ dsThuocEdit: arrObj })
    } else {
      dsThuocEdit[objFilterIndex] = obj
      updateData({ dsThuocEdit: dsThuocEdit })
    }
  }
  const onChangeDate = (item) => (e) => {
    let value = "";
    let value1 = "";
    if (e) {
      value = e[0].format("YYYY-MM-DD");
      value1 = e[1].format("YYYY-MM-DD");
    }
    dsThuocEdit.forEach(itemDs => {
      if (item.id === itemDs.id) {
        itemDs.ngayThucHienTu = value;
        itemDs.ngayThucHienDen = value1;
      }
    })
    // setState({ [`tuThoiGian${key}`]: value, [`denThoiGian${key}`]: value1 });
  };

  const onChangePopupInHoverName = (item, key) => (e) => {
    if (key === "dotDung") {
      dsThuocEdit.forEach(itemDs => {
        if (item.id === itemDs.id) {
          itemDs.dotDung = e.target.value;
        }
      })
      updateData({ dsThuocEdit })
    }
  }
  const contentNamePopover = (item) => {
    return (
      <div>
        <div><b>{item?.nbDichVu?.dichVu?.ten}</b></div>
        {/* <div>C??ch d??ng : <span>2</span></div> */}
        <div>Li???u d??ng - C??ch d??ng: <span>{listAllLieuDung.find(itemLieuDung => itemLieuDung.id === item?.lieuDung)?.ten}</span></div>
        <Row>
          <div>?????t d??ng:</div>
          <PopoverCash>
            <Input
              value={state.dsDichVu.find(itemFind => itemFind.id === item.id)?.phanTramMienGiamDichVu}
              className="input-discount"
              placeholder="Nh???p ?????t d??ng"
              defaultValue={dsThuocEdit.find(itemDs => itemDs.id === item.id)?.dotDung}
              // type="number"
              maxLength={3}
              onChange={onChangePopupInHoverName(item, "dotDung")}
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
              defaultValue={
                () => {
                  const findItem = dsThuocEdit.find(itemDs => itemDs.id === item.id)
                  const ngayThucHienTu = findItem?.ngayThucHienTu && moment(findItem.ngayThucHienTu)
                  const ngayThucHienDen = findItem?.ngayThucHienDen && moment(findItem.ngayThucHienDen)
                  return [ngayThucHienTu, ngayThucHienDen]
                }
              }
              // bordered={false}
              onChange={onChangeDate(item)}
              separator={<div>-</div>}
            ></RangePicker>
          </PopoverCash>
        </Row>
        <div>???????ng d??ng : <span>{item?.nbDichVu?.dichVu?.tenDuongDung}</span></div>
        <div>L?? nh???p : <span>{item?.nbDvKho?.loNhap}</span></div>
        <br />
        <div>Tr???ng th??i ho??n th??nh :{`${!infoPatient?.phieuThu?.thanhToan ? "Ch??a thanh to??n" : "???? thanh to??n"}`}</div>
        <div>Khoa ch??? ?????nh : <span>{item?.nbDichVu?.khoaChiDinh?.ten}</span></div>
        <div>Ng??y k?? : <span>{item?.nbDichVu?.thoiGianChiDinh && moment(item?.nbDichVu?.thoiGianChiDinh).format("DD/MM/YYYY")}</span></div>
      </div >
    )
  }

  const chooseTypeDiscountInPopup = (item) => (e) => {

    let findIndex = state.listTypeDiscountInPopup.findIndex(itemFindIndex => itemFindIndex === item.id)
    //reset gi?? tr??? input khi chuy???n ?????i lo???i chi???t kh???u
    let cloneDsDichVu = [...state.dsDichVu]
    cloneDsDichVu.forEach((itemDs, index) => {
      if (itemDs.id === item.id) {
        cloneDsDichVu.splice(index, 1)
      }
    })

    // x??? l?? ch???n lo???i chi???t kh???u
    let listCustom = []
    if (findIndex !== -1) { // n???u c?? d??? li???u, th?? ch???n chi???t kh???u ti???n cho d???ch v??? ???? ??ang ???????c ch???n
      state.listTypeDiscountInPopup.splice(findIndex, 1)
      listCustom = state.listTypeDiscountInPopup
    } else {
      listCustom = [...state.listTypeDiscountInPopup, item.id]
    }
    setState({ listTypeDiscountInPopup: listCustom, dsDichVu: cloneDsDichVu });
  }

  const onChangeDiscountLine = (item, key) => e => {
    let findIndex = state.dsDichVu.findIndex(itemFindIndex => itemFindIndex.id === item.id)
    if (key === "cash") {
      if (findIndex !== -1) { // mi???n gi???m b???ng ti???n
        state.dsDichVu[findIndex].tienMienGiamDichVu = e?.target?.value || e?.floatValue
        setState({ dsDichVu: state.dsDichVu })
      } else {
        let obj = [...state.dsDichVu, {
          id: item.id,
          tienMienGiamDichVu: e?.target?.value || e?.floatValue
        }]
        setState({ dsDichVu: obj })
      }
    } else {
      if (findIndex !== -1) { // mi???n gi???m b???ng ph???n tr??m
        state.dsDichVu[findIndex].phanTramMienGiamDichVu = e?.target?.value || e?.floatValue
        setState({ dsDichVu: state.dsDichVu })
      } else {
        let obj = [...state.dsDichVu, {
          id: item.id,
          phanTramMienGiamDichVu: e?.target?.value || e?.floatValue
        }]
        setState({ dsDichVu: obj })
      }
    }

  }
  const onKeyUpInputInPopup = (item, key) => e => {
    if (key === "percent") {
      // if (state.discount === 1) {
      if (Number(e.target.value) > 100) {
        e.target.value = 100
        // setState({ value: e.target.value })
        let findIndex = state.dsDichVu.findIndex(itemFindIndex => itemFindIndex.id === item.id)
        if (findIndex !== -1) {
          state.dsDichVu[findIndex].phanTramMienGiamDichVu = e?.target?.value || e?.floatValue
          setState({ dsDichVu: state.dsDichVu })
        } else {
          let obj = [...state.dsDichVu, {
            id: item.id,
            phanTramMienGiamDichVu: e?.target?.value || e?.floatValue
          }]
          setState({ dsDichVu: obj })
        }
      }
      // }
      //  else {
      //     e.target.value = e.target.value.formatPrice()
      // }
    }
  }
  const renderThanhTienPopup = (item) => {
    let findItem = state.dsDichVu.find(itemFind => itemFind.id === item.id)
    const res = (infoPatient?.phieuThu?.tongTien * findItem?.phanTramMienGiamDichVu) / 100
    return res && ((infoPatient?.phieuThu?.tongTien - res).formatPrice()) || 0
  }
  const contentTotalPopover = (item) => {
    return (
      <PopoverCash style={{ textAlign: "right" }}>
        <div>T???ng ti???n</div>
        <div>{infoPatient?.phieuThu?.tongTien && infoPatient?.phieuThu?.tongTien.formatPrice()}</div>
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
              />
            ) : (
                <Input
                  value={state.dsDichVu.find(itemFind => itemFind.id === item.id)?.phanTramMienGiamDichVu}
                  className="input-discount"
                  placeholder="Nh???p s??? ti???n"
                  type="number"
                  onChange={onChangeDiscountLine(item, "percent")}
                  onKeyUp={onKeyUpInputInPopup(item, "percent")}
                />
              )}
          </div>
          <Row className="button-choose">
            <div className={`percent ${state.listTypeDiscountInPopup.includes(item.id) ? "" : "action"}`} onClick={chooseTypeDiscountInPopup(item)}>%</div>
            <div className={`cash ${state.listTypeDiscountInPopup.includes(item.id) ? "action" : ""}`} onClick={chooseTypeDiscountInPopup(item)}>VND</div>
          </Row>
        </Row>
        <div>Th??nh ti???n</div>
        <div>{renderThanhTienPopup(item)}</div>
        <Row align="space-between">
          <ButtonBack style={{ border: "1px solid gray" }} onClick={openPopupEachLine(item)}>Quay l???i</ButtonBack>
          <ButtonNext onClick={openPopupEachLine(item, "submit")}>L??u <img style={{ marginLeft: 6 }} src={require("assets/images/kho/save.png")} alt=""></img></ButtonNext>
        </Row>
      </PopoverCash>
    )
  }
  useEffect(() => {
    if (state.paramsSearchDichVu) {
      onSearchListDichVuTonKho({
        dataSearchDv: state.paramsSearchDichVu,
        timKiem: state.paramsSearchDichVu,
        khoId: isThemMoi ? khoId : infoPatient.khoId
        // ma: "CPM0001"
      }).then((res) => {
        if (state.paramsSearchDichVu && (res.length > 1 || res.length === 1 && res[0].nhapDotDung)) {
          refListDichVuTimKiem.current.show();
        } else if (state.paramsSearchDichVu && res.length === 1 && !res.nhapDotDung) { // ch???c n??ng n??y n???u search ra 1 th?? s??? th??m v??o lu??n
          let obj = {
            id: null,
            nbDichVu: {
              dichVuId: res[0].dichVuId,
              soLuong: res[0].soLuongKhaDung,
            }
          }
          let clone = cloneDeep(dsThuocEdit)
          clone.push(obj)
          changesDonThuoc({ id: nguoiBenhId, dsThuoc: clone })
        }
      })
    }
  }, [state.paramsSearchDichVu])
  const onSearch = (e) => {
    if (refTimeout.current) {
      clearTimeout(refTimeout.current);
      refTimeout.current = null
    }
    refTimeout.current = setTimeout(
      (value = "") => { // value = gi?? tr??? th??? 3 ???????c truy???n v??o (vd : e.target.innerHTML)
        setState({
          paramsSearchDichVu: value
        })
      },
      1000,
      e.target.value // gi?? tr??? mu???n argument c???a settimeout l???y ra
    );
  }
  const openPopupEachLine = (item, key) => (e) => {
    if (key === 'submit') {
      mienGiamProvider.addOrUpdateDiscount({
        hinhThucMienGiam: 20, // phi???u thu (t???ng ????n) = 10
        dsDichVu: state.dsDichVu
        // [keyPost]: state.value
      }, infoPatient.phieuThu.id).then((res) => {
        let obj = { ...infoPatient }
        obj.phieuThu.tienMienGiam = res.data.tienMienGiam
        obj.phieuThu.tongTien = res.data.tongTien
        obj.phieuThu.thanhTien = res.data.thanhTien
        updateData({
          infoPatient: obj
        })
      });
    }


    let findIndex = state.listVisiblePopupOnLine.findIndex(itemFindIndex => itemFindIndex === item.id)
    if (findIndex !== -1) {
      state.listVisiblePopupOnLine.splice(findIndex, 1)
      setState({ listVisiblePopupOnLine: state.listVisiblePopupOnLine });
    } else {
      setState({ listVisiblePopupOnLine: [...state.listVisiblePopupOnLine, item.id] });
    }
  }

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
  return (
    <Main className="main" isThemMoi={isThemMoi}>
      <Header >
        <div className="header">
          <Row className="header-row">
            <Row>
              <div className="content">Danh s??ch d???ch v???</div>
              <div className="content-note">
                {(isVangLai || (isAdvised && !isVangLai)) ? ( // n???u nh???n t?? v???n ????n (nb ???? c?? h??? s?? m???i hi???n th??? t?? v???n ????n) ho???c l?? ng?????i b???nh v??ng lai s??? hi???n th??? ?? search dich v???
                  <InputSearch>
                    <img src={IconSearch} alt="IconSearch" className="icon-search" />
                    <Input
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
                  </InputSearch>)
                  : (//  ho???c trang th??m m???i s??? hi???n input search
                    <InputSearch>
                      <img src={IconSearch} alt="IconSearch" className="icon-search" />
                      <Input
                        placeholder="Nh???p ho???c qu??t m?? d???ch v???, t??n d???ch v???"
                        autoFocus
                        onChange={onSearch}
                      />
                    </InputSearch>
                  )}
              </div>
            </Row>
            {isThemMoi || isVangLai && <div>
              <Checkbox
              // checked={state.detachLine}
              // onChange={(e) => {
              //   setState({ ...state, detachLine: e.target.checked });
              // }}
              >
                T??ch d??ng
              </Checkbox>
              <img style={{ marginLeft: 6 }} src={require("assets/images/kho/info.png")} alt=""></img>
            </div>}
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
            title: "STT",
            width: size.width <= 1400 ? 64 : 64,
            dataIndex: "index",
            key: "index",
            hideSearch: true,
            align: "center",
          },
          {
            title: "T??n d???ch v???",
            width: 250,
            // dataIndex: "dsThuoc.nbDichVu",
            key: "ten",
            type: true,
            hideSearch: true,
            render: (item) => {
              return (
                <>
                  <PopoverCustom className="popup-custom" placement="right" content={contentNamePopover(item)} trigger="hover">
                    <div style={{ color: "#0762F7", fontWeight: "bold" }}>{item?.nbDichVu?.dichVu?.ten}</div>
                  </PopoverCustom>
                  <InputText
                    defaultValue={item.nbDichVu.ghiChu}
                    placeholder="Ghi ch??" isAdvised={isAdvised || isThemMoi} onChange={onChangeAdvise("ghiChu", item)} />
                </>
              );
            },
          },
          {
            title: "SL k??",
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
            title: "SL b??n",
            width: size.width <= 1400 ? 83 : 83,
            // dataIndex: "soLuongBan",
            // key: "soLuongBan",
            hideSearch: true,
            align: "right",
            render: (item) => {
              return (
                <>
                  <InputText
                    defaultValue={item.nbDichVu.soLuong}
                    isAdvised={isAdvised || isThemMoi} onChange={onChangeAdvise("soLuong", item)} />
                  {/* <div contentEditable={isAdvised ? true : false} onKeyDown={onChangeAdvise}>{item.nbDichVu.soLuong}</div> */}
                </>
              );
            },
          },
          {
            title: "SL kh??? d???ng",
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
            title: "??VT",
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
            title: "????n gi??",
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
            title: "Th??nh ti???n",
            width: 174,
            // dataIndex: "thanhTien",
            // key: "thanhTien",
            hideSearch: true,
            align: "right",
            render: (item) => {
              return (
                <>
                  <Popover placement="right" visible={state.listVisiblePopupOnLine.includes(item.id)} content={contentTotalPopover(item)}
                    onClick={openPopupEachLine(item)}>
                    <div style={{ color: "#0762F7", fontWeight: "bold" }}>{item?.nbDichVu?.tienNbTuTra?.formatPrice()}</div>
                  </Popover>
                </>
              );
            },
          },
          {
            title: <div style={{ visibility: "hidden" }}>e</div>,
            width: 25,
            hideSearch: true,
            align: "center",
            render: (item) => {
              return (
                <>
                  <div onClick={() => {
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
                          const itemDeleteIndex = dsThuocEdit.findIndex(itemThuocCurrent => itemThuocCurrent.id === item.id)
                          dsThuocEdit.splice(itemDeleteIndex, 1)
                          changesDonThuoc({ id: nguoiBenhId, dsThuoc: dsThuocEdit, statusDelete: true })
                        },
                        () => { }
                      );
                  }}>
                    <img src={require("assets/images/kho/delete.png")} alt=""></img>
                  </div>
                </>
              );
            },
          },
        ]}
        dataSource={infoPatient?.dsThuoc}
      ></Table>
      <ModalNotification2 ref={refModalNotificationDeleted} />
      <ModalListDichVuTimKiem ref={refListDichVuTimKiem} isThemMoi={isThemMoi}/>
    </Main>
  );
};
const mapStateToProps = (state) => { };

const mapDispatchToProps = () => ({
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(DanhSach);
