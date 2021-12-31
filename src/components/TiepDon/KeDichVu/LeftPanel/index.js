import React, { memo, useEffect } from "react";
import ThongTinBN from "./ThongTinBN";
import TimKiemDichVu from "./TimKiemDichVu";
import { Main } from "./styled";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const LeftPanel = (props) => {
  const {
    utils: { getUtils },
  } = useDispatch();
  useEffect(() => {
    getUtils({ name: "gioiTinh" });
  }, []);
  return (
    <Main className="container-fluid">
      <ThongTinBN />
      <TimKiemDichVu />
    </Main>
  );
};

export default memo(LeftPanel);
