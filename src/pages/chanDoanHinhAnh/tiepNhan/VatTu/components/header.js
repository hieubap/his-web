import React from "react";
import { HeaderWrapper } from "../styled";
import IconPrinter from "assets/images/khamBenh/printer.png";
import IconDelete from "assets/images/khamBenh/delete.png";
import { connect } from "react-redux";
import { message } from "antd";
function Header(props) {
  const { listDvVatTu, onDeleteAll, getListDichVuVatTu, nbDotDieuTriId } = props;

  const onDelete = (e) => {
    const payload = listDvVatTu.map((item) => {
      return item.id;
    });
    onDeleteAll(payload).then((s) => {
      let data = (s?.data || []).filter((item) => {
        return item.code !== 0 
      })
      if (data.length) {
        message.error(`Không thể xóa dịch vụ :  ${data}`);
      } else {
        message.success("Xóa đơn vật tư thành công");
        getListDichVuVatTu({ nbDotDieuTriId });
      }
    })
  };
  console.log("props",listDvVatTu[0]?.soPhieu)
  return (
    <HeaderWrapper>
      {`${props.title || ""}  ${listDvVatTu.length ? listDvVatTu[0]?.soPhieu : ""}`}
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
  chiDinhDichVuVatTu: { onDeleteAll, getListDichVuVatTu },
}) => ({
  onDeleteAll,
  getListDichVuVatTu,
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
