import React, { useState, useCallback } from "react";
import { Radio } from "antd";
import { connect } from "react-redux";
import { Main, MainTitle, ButtonWrapper } from "./styled";
import DanhSachPhieuThuChuyen from "./danhSachPhieu";
import IconSave from "assets/images/thuNgan/icSave.png";
import ModalCheckout from "components/ModalCheckout";
import ListService from "./danhSachDichVu";
import { useParams } from "react-router-dom";
import { firstLetterWordUpperCase } from "utils";
function ModalContent(props) {
  const {
    tachPhieuThu,
    modalCheckoutRef,
    thongTinBenhNhan,
    listgioiTinh,
    thongTinPhieuThu,
    getThongTinPhieuThu,
    listAllService,
    getDSPhieuThu,
    getDSDichVu,
    thongTinTongTienNB,
  } = props;
  const { maHoSo, nbDotDieuTriId, phieuThuId } = useParams();
  const [state, _setState] = useState({
    selectedRowKeys: [],
    value: 1,
    listServices: [],
  });
  const setState = (newState) => {
    _setState((state) => {
      return { ...state, ...newState };
    });
  };

  const handleClickBack = () => {
    if (modalCheckoutRef.current) {
      modalCheckoutRef.current.close();
      setState({
        value: 1,
      });
    }
  };
  const handleSubmit = () => {
    const { phieuThuMoiId } = state;
    const listDV = state.listServices.map((item) => {
      return {
        id: item.id,
      };
    });
    let params = {
      dsDichVu: listDV,
      id: phieuThuId,
      nbDotDieuTriId,
    };
    if (state.value === 2 && !!phieuThuMoiId) {
      params = { ...params, phieuThuMoiId };
    }
    tachPhieuThu(params).then((res) => {
      if (res.code === 0) {
        handleClickBack();
        setState({
          value: 1,
        });
        if (state.listServices?.length !== listAllService.length) {
          getThongTinPhieuThu(phieuThuId);
          thongTinTongTienNB({ id: nbDotDieuTriId });
        } else {
          getDSPhieuThu({
            dataSearch: { nbDotDieuTriId },
          }).then((s) => {
            const { data = [] } = s;
            if (s?.code === 0) {
              getThongTinPhieuThu(data[0].id);
              thongTinTongTienNB({ id: nbDotDieuTriId });
              getDSDichVu({ nbDotDieuTriId, phieuThuId: data[0].id });
              props.history.push(
                `/thu-ngan/chi-tiet-phieu-thu/${maHoSo}/${data[0].id}/${nbDotDieuTriId}`
              );
            }
          });
        }
      }
    });
  };
  let gioiTinh =
    listgioiTinh.find((item) => item.id === thongTinBenhNhan?.gioiTinh) || {};

  const onChange = (e) => {
    setState({
      value: e.target.value,
    });
  };
  const renderTypeTranfer = useCallback(() => {
    switch (state.value) {
      case 1:
        return null;
      default:
        return <DanhSachPhieuThuChuyen getPhieuThu={getPhieuThu} />;
    }
  }, [state.value]);

  const getPhieuThu = (phieuThuMoiId) => {
    setState({
      phieuThuMoiId,
    });
  };

  const updateListServices = (data) => {
    setState({
      listServices: data,
    });
  };
  return (
    <ModalCheckout
      titleHeader="Chuyển phiếu thu"
      titleBtnNext={
        <ButtonWrapper>
          Lưu [F4] <img src={IconSave} alt="iconSave" />
        </ButtonWrapper>
      }
      titleBtnBack="Quay lại [ESC]"
      subTitleHeader={
        <>
          <span>{firstLetterWordUpperCase(thongTinBenhNhan?.tenNb)} </span> -{" "}
          <span className="normal-weight">{gioiTinh?.ten}</span>
          {thongTinBenhNhan?.tuoi && (
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
      disabledBtnNext={thongTinPhieuThu.thanhToan}
      width={800}
      destroyOnClose
      onClickBack={handleClickBack}
      onClickNext={handleSubmit}
    >
      <Main>
        <MainTitle>Chọn phiếu thu đến</MainTitle>
        <div className="group-tranfer">
          <Radio.Group onChange={onChange} value={state.value}>
            <Radio value={1}>Phiếu thu mới</Radio>
            <Radio value={2}>Phiếu thu đã tồn tại</Radio>
          </Radio.Group>
          {renderTypeTranfer()}
        </div>
        <MainTitle>Chọn dịch vụ muốn chuyển phiếu thu</MainTitle>
        <ListService
          updateListServices={updateListServices}
          nbDotDieuTriId={nbDotDieuTriId}
          phieuThuId={phieuThuId}
        />
      </Main>
    </ModalCheckout>
  );
}

const mapStateToProps = (state) => {
  const {
    nbDotDieuTri: { thongTinBenhNhan },
    utils: { listgioiTinh = [] },
    thuNgan: { thongTinPhieuThu },
    danhSachDichVu: { listAllService },
  } = state;
  return {
    thongTinBenhNhan,
    listgioiTinh,
    thongTinPhieuThu,
    listAllService,
  };
};

const mapDispatchToProps = ({
  thuNgan: { tachPhieuThu, getThongTinPhieuThu },
  danhSachPhieuThu: { onSearch },
  danhSachDichVu: { onSizeChange },
  nbDotDieuTri: { thongTinTongTienNB },
}) => ({
  tachPhieuThu,
  getThongTinPhieuThu,
  getDSPhieuThu: onSearch,
  getDSDichVu: onSizeChange,
  thongTinTongTienNB,
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalContent);
