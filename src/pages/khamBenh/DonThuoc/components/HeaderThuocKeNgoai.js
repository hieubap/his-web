import React from "react";
import { HeaderWrapper } from "../styled";
import IconPrinter from "assets/images/khamBenh/printer.png";
import IconDelete from "assets/images/khamBenh/delete.png";
import { connect } from "react-redux";
function Header(props) {
  const { listDvThuoc, onDeleteAllThuocKeNgoai, getListDichVuThuocKeNgoai, nbDotDieuTriId } = props;

  const onDelete = (e) => {
    const payload = listDvThuoc.map((item) => {
      return item.id;
    });
    onDeleteAllThuocKeNgoai(payload).then((s) => getListDichVuThuocKeNgoai({nbDotDieuTriId}))
  };
  return (
    <HeaderWrapper>
      {props.title}
      <img
        src={IconPrinter}
        alt="IconEdit"
        onClick={(e) => {
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
  chiDinhDichVuKho: { onDeleteAllThuocKeNgoai, getListDichVuThuocKeNgoai },
}) => ({
  onDeleteAllThuocKeNgoai,
  getListDichVuThuocKeNgoai,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
