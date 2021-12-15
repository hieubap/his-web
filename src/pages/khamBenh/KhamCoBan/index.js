import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Main } from "./styled";
import ThongTinHanhChinh from "./ThongTinHanhChinh";
import ChanDoan from "./ChanDoan";
import HoiBenh from "./HoiBenh";
import KhamCovid from "./KhamCovid";
const KhamCoBan = ({ handleSetData, layerId }) => {
  const getUtils = useDispatch().utils.getUtils;
  const trangThaiKham = useSelector(
    (state) => state.khamBenh.thongTinChiTiet?.nbDvKyThuat?.trangThai
  );
  const typeKhamCoBan = useSelector((state) => state.khamBenh.typeKhamCoBan);
  useEffect(() => {
    getUtils({ name: "doiTuong" });
  }, []);

  return (
    <Main trangThaiKham={trangThaiKham}>
      <ThongTinHanhChinh />
      {typeKhamCoBan?.type === "khamCovid" ? (
        <KhamCovid />
      ) : (
        <>
          <ChanDoan handleSetData={handleSetData} layerId={layerId} />
          <HoiBenh handleSetData={handleSetData} />
        </>
      )}
    </Main>
  );
};

export default KhamCoBan;
