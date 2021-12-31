import { Button, Form, Input, message } from "antd";
import React, { useEffect } from "react";
import { ChiTietTTPhieuNhap } from "../../styled";
import SubmitIcon from "assets/images/kho/submit.png";
import EditIcon from "assets/images/kho/edit.png";
import CancelIcon from "assets/images/kho/cancel.png";
import phieuNhapProvider from "data-access/kho/phieu-nhap-xuat-provieder";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { openInNewTab } from "utils";

const ChiTietTTPhieu = ({ data = {}, setData = () => { } }) => {
  const { push } = useHistory();
  const handleApproved = () => {
    phieuNhapProvider
      .approved(data.id)
      .then((res) => {
        if (res && res.code === 0) {
          message.success("Duyệt thành công");
          setData(res.data);
        } else message.error("Duyệt không thành công: " + res.message);
      })
      .catch((e) => {
        message.error("Duyệt không thành công: " + e.message);
      });
  };

  const notApproved = () => {
    phieuNhapProvider
      .unApproved(data.id)
      .then((res) => {
        if (res && res.code === 0) {
          message.success("Hủy duyệt thành công");
          setData(res.data);
        } else message.error("Hủy duyệt không thành công: " + res.message);
      })
      .catch((e) => {
        message.error("Hủy duyệt không thành công: " + e.message);
      });
  };

  const send = () => {
    phieuNhapProvider
      .sendApproved(data.id)
      .then((res) => {
        if (res && res.code === 0) {
          message.success("Gửi duyệt thành công");
          setData(res.data);
        } else message.error("Gửi không thành công: " + res.message);
      })
      .catch((e) => {
        message.error("Gửi không thành công: " + e.message);
      });
  };

  const unSend = () => {
    phieuNhapProvider
      .unSendApproved(data.id)
      .then((res) => {
        if (res && res.code === 0) {
          message.success("Từ chối thành công");
          setData(res.data);
        } else message.error("Từ chối không thành công: " + res.message);
      })
      .catch((e) => {
        message.error("Từ chối không thành công: " + e.message);
      });
  };

  const editPhieu = (data) => (e) => {
    push(`/kho/nhap-kho/phieu-nhap/chinh-sua/${data?.id}`);
  };

  return (
    <ChiTietTTPhieuNhap>
      <h2>
        <b>Thông tin phiếu nhập</b>
      </h2>
      <div>
        <label
          className="pointer"
          onClick={() => openInNewTab("/kho/quan-tri-kho")}
        >Kho nhập: {data.kho?.ten}</label>
        <label>Số phiếu: {data.soPhieu}</label>
        <label>Số hóa đơn: {data.soHoaDon}</label>
        <label>Ký hiệu hóa đơn: {data.kyHieuHoaDon}</label>
        <label>
          Ngày hóa đơn:{" "}
          {data.ngayHoaDon && moment(data.ngayHoaDon).format("DD/MM/YYYY")}
        </label>
        <label>Số hợp đồng: {data.soHopDong}</label>
        <label
          className="pointer"
          onClick={() => openInNewTab("/kho/quyet-dinh-thau")}
        >Quyết định thầu: {data.quyetDinhThau?.quyetDinhThau}</label>
        <label
          className="pointer"
          onClick={() => openInNewTab("/danh-muc/nguon-nhap-kho")}
        >Nguồn nhập kho: {data.nguonNhapKho?.ten}</label>
        <label
          className="pointer"
          onClick={() => openInNewTab("/danh-muc/hinh-thuc-nhap-xuat")}
        >Hình thức nhập: {data.hinhThucNhapXuat?.ten}</label>
        <label>Ghi chú: {data.ghiChu}</label>
        <label>Người lập phiếu: {data.nguoiTaoPhieu?.ten}</label>
      </div>
      <div className="footer-btn">
        {data.trangThai === 10 ? (
          <>
            <Button onClick={editPhieu(data)} className="left-btn">
              Sửa phiếu <img src={EditIcon} />
            </Button>
            <Button className="right-btn" onClick={send}>
              Gửi duyệt
              <img src={SubmitIcon} />
            </Button>
          </>
        ) : data.trangThai == 20 ? (
          <>
            <Button className="left-btn" onClick={unSend}>
              Từ chối
              <img src={CancelIcon} />
            </Button>
            <Button className="right-btn" onClick={handleApproved}>
              Duyệt
              <img src={SubmitIcon} />
            </Button>
          </>
        ) : (
          <Button className="right-btn" onClick={notApproved}>
            Hủy duyệt
          </Button>
        )}
      </div>
    </ChiTietTTPhieuNhap>
  );
};

export default ChiTietTTPhieu;
