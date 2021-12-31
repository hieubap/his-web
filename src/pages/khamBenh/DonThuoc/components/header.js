import React from "react";
import { HeaderWrapper } from "../styled";
import IconPrinter from "assets/images/khamBenh/printer.png";
import IconDelete from "assets/images/khamBenh/delete.png";
import { connect, useDispatch } from "react-redux";
import { message } from "antd";
function Header(props) {
  const inPhieu = useDispatch().chiDinhDichVuKho.inPhieu;
  const { listDvThuoc, onDeleteAll, getListDichVuThuoc, nbDotDieuTriId, soPhieuId, loaiDonThuoc, phieuChiDinhId ,phieuNhapXuatId} = props;

  const onDelete = (e) => {
    const payload = listDvThuoc.map((item) => {
      return item.id;
    });
    onDeleteAll(payload).then((s) => {
      let data = (s?.data || []).map((item) => {
        return item.code !== 0 && item?.message
      })
      if (data) {
        message.error(`Không thể xóa dịch vụ :  ${data}`);
      } else {
        message.success("Xóa đơn thuốc thành công");
        getListDichVuThuoc({ nbDotDieuTriId });
      }
    })
  };
  return (
    <HeaderWrapper>
      {props.title && `${props.title} - ${props?.listDvThuoc ? props?.listDvThuoc[0]?.soPhieu : ""}`}
      <img
        src={IconPrinter}
        alt="IconEdit"
        onClick={(e) => {
          inPhieu({
            nbDotDieuTriId,
            soPhieuId,
            loaiDonThuoc,
            phieuNhapXuatId,
          });
          e.stopPropagation();
        }}
      />
      <img src={IconDelete} alt="IconDelete" onClick={onDelete} />
    </HeaderWrapper>
  );
}
const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = ({
  chiDinhDichVuKho: { onDeleteAll, getListDichVuThuoc },
}) => ({
  onDeleteAll,
  getListDichVuThuoc,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
