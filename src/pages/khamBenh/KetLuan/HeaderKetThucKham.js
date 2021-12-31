import React, { useState } from "react";
import { CaretRightOutlined } from "@ant-design/icons";
import IconPrinter from "assets/images/khamBenh/printer.png";
import IconDelete from "assets/images/khamBenh/delete.png";
import { HeaderWrapper } from "./styled";
import { useDispatch } from "react-redux";

const HeaderKetThucKham = ({
  title,
  isCollapsed,
  showIconDelete,
  showIconPrint,
  nbDotDieuTriId,
  id
}) => {
  const inPhieuKetLuanKham = useDispatch().ketQuaKham.inPhieuKetLuanKham;
  return (
    <HeaderWrapper isCollapsed={isCollapsed}>
      <div className="info">
        <CaretRightOutlined className="collapse-arrow" />
        <span className="info__name">{title}</span>
        {showIconPrint !== false && (
          <img
          src={IconPrinter}
          alt="{In}"
          onClick={(e) => {
            e.stopPropagation();
            console.log('nbDotDieuTriId: ', nbDotDieuTriId);
              inPhieuKetLuanKham({
                // nbDotDieuTriId,
                id
                // soPhieuId,
                // loaiDonThuoc,
                // phieuNhapXuatId,
              });
            }}
          />
        )}
        {showIconDelete !== false && (
          <img
            src={IconDelete}
            alt="Huỷ kết luận"
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        )}
      </div>
    </HeaderWrapper>
  );
};

export default HeaderKetThucKham;
