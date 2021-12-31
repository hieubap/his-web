import React from "react";
import { Main } from "./styled";

const ChiTietPhieuNhapDuTru = ({
  title,
  children,
  noPadding,
  top,
  ...props
}) => {
  return (
    <Main noPadding={noPadding} top={top}>
      {children}
    </Main>
  );
};

export default ChiTietPhieuNhapDuTru;
