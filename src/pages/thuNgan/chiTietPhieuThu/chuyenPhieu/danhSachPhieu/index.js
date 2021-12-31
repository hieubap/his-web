import React, { useEffect } from "react";
import { Main } from "./styled";
import Select from "components/Select";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
const DanhSachPhieuThuChuyen = (props) => {
  const { getAll, listAllData, getPhieuThu, thongTinPhieuThu } = props;
  const { nbDotDieuTriId, phieuThuId } = useParams();
  useEffect(() => {
    getAll({ page: 0, size: 9999, nbDotDieuTriId });
  }, [phieuThuId]);

  return (
    <Main>
      <Select
        disabled={thongTinPhieuThu?.thanhToan}
        data={listAllData
          .filter((item) => !item.thanhToan && item.id !== +phieuThuId)
          .map((item) => {
            return {
              id: item.id,
              ten: `Phiếu thu ${item.thanhTien?.formatPrice()}`,
            };
          })}
        placeholder="Chọn phiếu thu"
        onChange={getPhieuThu}
      />
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    danhSachPhieuThu: { listAllData = [] },
    thuNgan: { thongTinPhieuThu },
  } = state;
  return {
    listAllData,
    thongTinPhieuThu,
  };
};

const mapDispatchToProps = ({ danhSachPhieuThu: { getAll } }) => ({
  getAll,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DanhSachPhieuThuChuyen);
