import React, { useCallback, useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { message, Radio } from "antd";
import ModalCheckout from "components/ModalCheckout";
import IconSave from "assets/images/thuNgan/icSave.png";
import { firstLetterWordUpperCase } from "utils";
import mienGiamProvider from "data-access/nb-phieu-thu-provider";
import DiscountOnReceipt from "./DiscountOnReceipt";
import DiscountOnService from "./DiscountOnService";
import DiscountByVoucher from "./DiscountByVoucher";
import { Main, ButtonWrapper } from "./styled";
import moment from "moment";

const MienGiam = ({
  thongTinBenhNhan,
  listgioiTinh,
  listhinhThucMienGiam,
  listAllService,
  listTongHop,
  getTongHop,
  thongTinPhieuThu,
  getAllListServices,
  modalCheckoutRef,
  getUtils,
  getListServices,
  getThongTinPhieuThu,
  getDSPhieuThu,
  thongTinTongTienNB,
}) => {
  const { nbDotDieuTriId, phieuThuId } = useParams();
  const [state, _setState] = useState({
    dsDichVu: [],
    hinhThucMienGiam: 10,
    phanTramMienGiam: 0,
    tienMienGiamPhieuThu: 0,
    dsDichVuId: [],
    maGiamGiaId: 0,
    disabledBtnNext: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    getUtils({ name: "hinhThucMienGiam" });
    getTongHop({
      active: true,
      size: 999999,
      ngayHieuLuc: moment().format("DD-MM-YYYY"),
    });
  }, []);

  useEffect(() => {
    const { phanTramMienGiam, tienMienGiamPhieuThu } = thongTinPhieuThu;
    setState({
      phanTramMienGiam: phanTramMienGiam || 0,
      tienMienGiamPhieuThu: tienMienGiamPhieuThu || 0,
    });
  }, [thongTinPhieuThu]);

  const gioiTinh =
    listgioiTinh.find((item) => item.id === thongTinBenhNhan?.gioiTinh) || {};

  const onChange = (e) => {
    setState({
      hinhThucMienGiam: e.target.value,
      phanTramMienGiam: 0,
      // tienMienGiamPhieuThu: 0,
      dsDichVu: [],
      dsDichVuId: [],
      maGiamGiaId: 0,
      disabledBtnNext: false,
    });
  };

  const onUpdateListServices = (data) => {
    const dsDichVu = data
      .filter((d) => d.phanTramMienGiamDichVu >= 0)
      .map((item) => ({
        id: item.id,
        phanTramMienGiamDichVu: item.phanTramMienGiamDichVu,
      }));
    setState({
      dsDichVu,
    });
  };

  const onUpdateVoucherServices = (maGiamGiaId, dsDichVuId) => {
    setState({
      dsDichVuId: dsDichVuId,
      maGiamGiaId: maGiamGiaId,
    });
  };

  const onUpdateReceipt = (type, value) => {
    setState({ [type]: value });
  };

  const setDisabledButton = (value) => {
    setState({ disabledBtnNext: value });
  };

  const validateNumber = (value) => {
    return /^[1-9][0-9]?$|^100$/.test(`${value}`);
  }

  const renderTypeDiscount = useCallback(() => {
    switch (state.hinhThucMienGiam) {
      case 10:
        return (
          <DiscountOnReceipt
            phanTramMienGiam={state.phanTramMienGiam}
            onUpdateReceipt={onUpdateReceipt}
            thongTinPhieuThu={thongTinPhieuThu}
            validateNumber={validateNumber}
          />
        );
      case 20:
        return (
          <DiscountOnService
            listAllServices={listAllService}
            updateListServices={onUpdateListServices}
            thongTinPhieuThu={thongTinPhieuThu}
          />
        );
      case 30:
        return (
          <DiscountByVoucher
            onUpdateReceipt={onUpdateReceipt}
            listAllServices={listAllService}
            listVouchers={listTongHop}
            onUpdateVoucherServices={onUpdateVoucherServices}
            thongTinPhieuThu={thongTinPhieuThu}
            setDisabledButton={setDisabledButton}
          />
        );
      default:
        return null;
    }
  }, [state.hinhThucMienGiam, thongTinPhieuThu]);

  const handleClickBack = () => {
    if (modalCheckoutRef.current) {
      modalCheckoutRef.current.close();
      setState({
        hinhThucMienGiam: 10,
      });
    }
  };

  const handleSubmit = () => {
    if (state.hinhThucMienGiam === 30) {
      if (state.maGiamGiaId) {
        let payload = {
          maGiamGiaId: state.maGiamGiaId,
          dsDichVuId: state.dsDichVuId,
        };
        mienGiamProvider.addOrUpdateVoucher(payload, phieuThuId).then((res) => {
          handleAfterSubmit();
        });
      } else {
        handleAfterSubmit();
      }
    } else {
      let payload = {
        dsDichVu: state.dsDichVu,
        hinhThucMienGiam: state.hinhThucMienGiam,
        phanTramMienGiam: state.phanTramMienGiam,
        tienMienGiamPhieuThu: state.tienMienGiamPhieuThu,
      };
      if (state.hinhThucMienGiam == 20 && payload.dsDichVu.length == 0) {
        message.error("Cần chọn ít nhất một DV áp dụng miễn giảm dịch vụ");
        return;
      }
      mienGiamProvider.addOrUpdateDiscount(payload, phieuThuId).then((res) => {
        handleAfterSubmit();
      });
    }
  };

  const handleAfterSubmit = () => {
    handleClickBack();
    getListServices({ size: 10, nbDotDieuTriId, phieuThuId });
    getThongTinPhieuThu(phieuThuId);
    getAllListServices({ nbDotDieuTriId, phieuThuId });
    getDSPhieuThu({
      dataSearch: { nbDotDieuTriId },
      nbDotDieuTriId
    });
    thongTinTongTienNB({ id: nbDotDieuTriId });
  };

  return (
    <ModalCheckout
      titleHeader="Miễn giảm"
      subTitleHeader={
        <>
          <span>{firstLetterWordUpperCase(thongTinBenhNhan?.tenNb)} </span>
          {gioiTinh.ten && (
            <span className="normal-weight"> - {gioiTinh.ten}</span>
          )}
          {thongTinBenhNhan.tuoi && (
            <>
              {" "}
              -{" "}
              <span className="normal-weight">
                {thongTinBenhNhan?.tuoi} tuổi
              </span>
            </>
          )}
        </>
      }
      ref={modalCheckoutRef}
      disabledBtnNext={thongTinPhieuThu.thanhToan || state.disabledBtnNext}
      titleBtnNext={
        <ButtonWrapper>
          Lưu <img src={IconSave} alt="saveicon" />
        </ButtonWrapper>
      }
      width={800}
      destroyOnClose
      onClickBack={handleClickBack}
      onClickNext={handleSubmit}
    >
      <Main>
        <div className="header">
          <p className="text-bold">Chọn hình thức miễn giảm</p>
          <Radio.Group onChange={onChange} value={state.hinhThucMienGiam}>
            {listhinhThucMienGiam.map((item) => (
              <Radio value={item.id}>{item.ten}</Radio>
            ))}
          </Radio.Group>
        </div>
        <div className="type-discount">{renderTypeDiscount()}</div>
      </Main>
    </ModalCheckout>
  );
};

const mapStateToProps = (state) => {
  const {
    danhSachDichVu: { listAllService },
    maGiamGia: { listTongHop },
    nbDotDieuTri: { thongTinBenhNhan },
    utils: { listgioiTinh = [], listhinhThucMienGiam = [] },
    thuNgan: { thongTinPhieuThu },
  } = state;
  return {
    thongTinBenhNhan,
    listAllService,
    listTongHop,
    listgioiTinh,
    listhinhThucMienGiam,
    thongTinPhieuThu,
  };
};

const mapDispatchToProps = ({
  danhSachDichVu: { searchAll, onSizeChange },
  utils: { getUtils },
  thuNgan: { getThongTinPhieuThu },
  danhSachPhieuThu: { onSearch },
  nbDotDieuTri: { thongTinTongTienNB },
  maGiamGia: { getTongHop },
}) => ({
  getAllListServices: searchAll,
  getListServices: onSizeChange,
  getUtils,
  getThongTinPhieuThu,
  getDSPhieuThu: onSearch,
  thongTinTongTienNB,
  getTongHop,
});

export default connect(mapStateToProps, mapDispatchToProps)(MienGiam);
