import React from "react";
import { InputNumber } from "antd";
import { InputNumberFormat } from "components/common";


const DiscountOnReceipt = ({
  onUpdateReceipt,
  thongTinPhieuThu,
  phanTramMienGiam,
  validateNumber,
  ...props
}) => (
  <>
    <div className="item-row text-bold">Số tiền miễn giảm</div>
    <div className="item-row">
      <div className="title text-bold">Điền % miễn giảm áp dụng</div>{" "}
      <div className="num">
        <InputNumber
          type="number"
          placeholder="Nhập số %"
          onChange={value => onUpdateReceipt("phanTramMienGiam", value)}
          defaultValue={thongTinPhieuThu?.phanTramMienGiam}
          disabled={thongTinPhieuThu.thanhToan}
        />{" "}
        <span>%</span>
        {phanTramMienGiam && !validateNumber(phanTramMienGiam) && (
          <div className="error">Dữ liệu không hợp lệ</div>
        )}
      </div>
    </div>
    Hoặc
    <div className="item-row">
      <div className="title text-bold">Điền số tiền miễn giảm:</div>{" "}
      <div className="num">
        <InputNumberFormat
          width="240px"
          placeholder="Nhập số tiền"
          onValueChange={value => { onUpdateReceipt("tienMienGiamPhieuThu", value?.floatValue || 0) }}
          defaultValue={thongTinPhieuThu?.tienMienGiamPhieuThu || ""}
          disabled={thongTinPhieuThu.thanhToan}
        />
      </div>
    </div>
  </>
);

export default DiscountOnReceipt;
