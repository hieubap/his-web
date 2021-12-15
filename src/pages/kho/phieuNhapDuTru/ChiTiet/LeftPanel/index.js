import React, { memo, useEffect, useMemo, useState } from "react";
import ThongTinPhieuNhap from "./ThongTinPhieuNhap";
import DanhSach from "./DanhSach";
import { Main } from "./styledMain";
import { compose } from "redux";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ThemMoi from "./ThemMoi";
import { Button, message } from "antd";
import SubmitIcon from "assets/images/kho/submit.png";
import SaveIcon from "assets/images/kho/save.png";
import EditIcon from "assets/images/kho/edit.png";
import SendApproveIcon from "assets/images/kho/send-approve.png";

const LeftPanel = ({
  // state
  thongTinPhieuNhap,
  dsNhapXuatChiTiet,
  //dispatch
  updateData,
  createOrUpdate,
  sendApprove,
  ...props
}) => {
  const history = useHistory();
  const { id } = useParams();
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };

  const checkSoLuongDuTru = () => {
    let isValid = true;
    let data = (dsNhapXuatChiTiet || []).reduce((acc, item, index) => {
      acc[item?.dichVuId] = {
        ...acc[item?.dichVuId],
        soLuongKhaDung: item?.soLuongKhaDung || 0,
        soLuongYeuCau:
          parseFloat(item?.soLuongYeuCau || 0) +
          parseFloat(acc[item?.dichVuId]?.soLuongYeuCau || 0),
      };
      return acc;
    }, {});
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const element = data[key];
        if (element?.soLuongYeuCau > element?.soLuongKhaDung) isValid = false;
      }
    }
    return { isValid };
  };

  const onSave = (sendApprove) => (e) => {
    const {
      khoDoiUngId,
      thangDuTru,
      khoId,
      hinhThucNhapXuatId,
      ghiChu,
      ...restThongTinPhieuNhap
    } = thongTinPhieuNhap;
    const check = isValidData({
      khoDoiUngId,
      thangDuTru,
      khoId,
      hinhThucNhapXuatId,
      khoDoiUngId,
    });
    if (check) {
      checkSoLuongDuTru();
      updateData({ checkValidate: false });
      let payload = {
        loaiNhapXuat: 20,
        khoDoiUngId,
        thangDuTru,
        hinhThucNhapXuatId,
        khoDoiUngId,
        khoId,
        ghiChu,
        sendApprove,
        dsNhapXuatChiTiet,
      };
      if (props.mode == "them-moi") {
        payload.dsNhapXuatChiTiet = dsNhapXuatChiTiet?.map((item) => ({
          dichVuId: item?.dichVuId,
          soLuong: item?.soLuongYeuCau,
          soLuongYeuCau: item?.soLuongYeuCau,
          ghiChu: item?.ghiChu,
        }));
      }
      if (props.mode == "chinh-sua" && restThongTinPhieuNhap.id) {
        payload = {
          ...payload,
          ...restThongTinPhieuNhap,
          dsNhapXuatChiTiet: dsNhapXuatChiTiet?.map((item) => ({
            active: item?.active,
            createdAt: item?.createdAt,
            createdBy: item?.createdBy,
            dichVu: item?.dichVu,
            dichVuId: item?.dichVuId,
            id: item?.id,
            loNhap: item?.loNhap,
            loNhapId: item?.loNhapId,
            phieuNhapXuatId: item?.phieuNhapXuatId,
            soLuong: item?.soLuong,
            soLuongYeuCau: item?.soLuongYeuCau,
            thanhTien: item?.thanhTien,
            thanhTienSuaDoi: item?.thanhTienSuaDoi,
            updatedAt: item?.updatedAt,
            updatedBy: item?.updatedBy,
            ghiChu: item?.ghiChu,
          })),
        };
      }
      createOrUpdate(payload).then(({ id }) => {
        setTimeout(
          () => history.push(`/kho/phieu-nhap-du-tru/chi-tiet/${id}`),
          200
        );
      });
    } else {
      updateData({ checkValidate: true });
      return;
    }
  };
  const onSendApprove = (payload) => (e) => {
    sendApprove(payload).then((s) => {
      setTimeout(() => window.location.reload(), 200);
    });
  };
  const isValidData = (data) => {
    let check = true;
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const element = data[key];
        if (!element) {
          check = false;
          break;
        }
      }
    }
    return check;
  };
  return (
    <Main className="container-fluid">
      {props.mode == "them-moi" || props.mode == "chinh-sua" ? (
        <ThemMoi {...props} />
      ) : (
        <ThongTinPhieuNhap {...props} />
      )}
      <DanhSach {...props} />
      <div className="footer-btn">
        {props.mode == "them-moi" ? (
          <>
            <Button onClick={onSave(true)} className="left-btn">
              Lưu và gửi duyệt phiếu&nbsp;
              <img src={SendApproveIcon} alt="" />
            </Button>
            <Button className="right-btn" onClick={onSave(false)}>
              Lưu phiếu&nbsp;
              <img src={SaveIcon} />
            </Button>
          </>
        ) : props.mode == "chinh-sua" ? (
          <Button className="right-btn" onClick={onSave(false)}>
            Lưu&nbsp;
            <img src={SaveIcon} />
          </Button>
        ) : props.mode == "chi-tiet" &&
          (thongTinPhieuNhap?.trangThai == 10 ||
            thongTinPhieuNhap?.trangThai == 15) ? (
          <>
            <Button
              onClick={() => {
                history.push(`/kho/phieu-nhap-du-tru/chinh-sua/${id}`);
              }}
              className="left-btn"
            >
              Sửa phiếu&nbsp;
              <img src={EditIcon} />
            </Button>
            <Button
              className="right-btn"
              onClick={onSendApprove({ id: thongTinPhieuNhap?.id })}
            >
              Gửi duyệt&nbsp;
              <img src={SubmitIcon} />
            </Button>
          </>
        ) : (
          ""
        )}
      </div>
    </Main>
  );
};

const mapStateToProps = (state) => ({
  thongTinPhieuNhap: state.phieuNhapDuTru.thongTinPhieuNhap,
  dsNhapXuatChiTiet: state.phieuNhapDuTru.dsNhapXuatChiTiet || [],
});
const mapDispatchToProps = ({
  phieuNhapDuTru: { createOrUpdate, sendApprove, updateData },
}) => ({
  sendApprove,
  createOrUpdate,
  updateData,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(LeftPanel);
