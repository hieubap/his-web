import { CloseOutlined } from "@ant-design/icons";
import { Input, message, Select, Tooltip } from "antd";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ChainStatus from "./ChainStatus";
import DeleteRedIcon from "assets/svg/kho/delete.svg";
import { useRef } from "react";
import { ModalNotification2 } from "components/ModalConfirm";
import phieuNhapProvider from "data-access/kho/phieu-nhap-xuat-provieder";
import { useHistory } from "react-router-dom";
import { openInNewTab } from "utils";
import { useDispatch } from "react-redux";

const TieuDePhieu = ({ supplier = {}, ticket = {} }) => {
  const refConfirmRemoveItem = useRef();
  const [state, setState] = useState({});
  const { push } = useHistory();
  const updateData = useDispatch().phieuNhap.updateData
  useEffect(() => {
    return () => {
      updateData({
        thongTinPhieuNhap : {},
        dsAllNhapXuatChiTiet: []
      })
    }
  }, [])
  const getStatus = () => {
    return [
      {
        name: "Tạo phiếu nhập",
        active: !!ticket.thoiGianTaoPhieu,
        time:
          ticket.thoiGianTaoPhieu &&
          moment(ticket.thoiGianTaoPhieu).format("HH:mm:ss - DD/MM/YYYY"),
      },
      {
        name: "Chờ duyệt",
        inActive: !ticket.thoiGianTaoPhieu,
        active: !!ticket.thoiGianGuiDuyet,
        time:
          ticket.thoiGianGuiDuyet &&
          moment(ticket.thoiGianGuiDuyet).format("HH:mm:ss - DD/MM/YYYY"),
      },
      {
        name: "Hoàn thành",
        inActive: !ticket.thoiGianGuiDuyet,
        active: !!ticket.thoiGianDuyet,
        time:
          ticket.thoiGianDuyet &&
          moment(ticket.thoiGianDuyet).format("HH:mm:ss - DD/MM/YYYY"),
      },
    ];
  };

  const showModalConfirm = () => {
    if (refConfirmRemoveItem.current) {
      console.log(ticket);
      refConfirmRemoveItem.current.show({
        title: "",
        content: `Xác nhận xóa phiếu ${ticket?.soPhieu}?`,
        cancelText: "Huỷ",
        okText: "Đồng ý",
        showBtnOk: true,
      },
        () => {
          phieuNhapProvider
            .delete(ticket?.id)
            .then(s => {
              message.success("Xóa phiếu thành công!")
              setTimeout(() => push("/kho/nhap-kho"), 3000)
            })
            .catch(e => {
              message.error("Xóa phiếu không thành công!");
            })
        },
        () => { }
      );
    }
  }

  return (
    <div className="title">
      <div className="row-title" style={{ marginBottom: 0 }}>
        <div style={{
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "flex-end"
        }}>
          <h2 style={{ marginBottom: "0", marginRight: 5 }}>
            <b>Chi tiết phiếu nhập</b>
          </h2>
          {ticket?.trangThai == 10 && (
            <div>
              <Tooltip title="Xóa">
                <DeleteRedIcon
                  className="pointer"
                  onClick={showModalConfirm}
                />
              </Tooltip>
            </div>
          )}
        </div>
        <div>
          <ChainStatus status={getStatus()} />
        </div>
      </div>
      <div className="row-title" style={{ marginTop: 20 }}>
        <div>
          <b
            className="pointer"
            onClick={() => openInNewTab("/danh-muc/nha-san-xuat")}
          >
            Nhà cung cấp: </b>
          <span>{supplier.ten}</span>
          {/* <CloseOutlined className="close-icon" /> */}
        </div>
        <div>
          <b>Địa chỉ: </b>
          <span>{supplier.diaChi}</span>
          <b> - MST: </b>
          <span>{supplier.maSoThue}</span>
          <b> - STK: </b>
          <span>{supplier.soTaiKhoan}</span>
        </div>
      </div>
      <ModalNotification2 ref={refConfirmRemoveItem} />
    </div>
  );
};

export default TieuDePhieu;
