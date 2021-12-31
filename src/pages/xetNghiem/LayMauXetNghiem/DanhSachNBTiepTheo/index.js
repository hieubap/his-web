import React from "react";
import { Main, ContentTable } from "./styled";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { Button, Input, Row } from "antd";
import { connect } from "react-redux";
import IconCall from "assets/images/xetNghiem/icCall.png";

const  DanhSachNBTiepTheo = (props) => {
  const {
    listNbTiepTheo,
    postNbTiepTheo,
    phongLayMauId,
    updateDataTiepNhanXN,
    getDsNguoiBenhQms
  } = props;

  const onCallNb = (data) => {
    postNbTiepTheo({nbTiepTheoId: data.nbDotDieuTriId, phongLayMauId }).then((s) => {
      getDsNguoiBenhQms(phongLayMauId)
    });
    updateDataTiepNhanXN({nbDotDieuTriId: data.nbDotDieuTriId});
  }
  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "25px",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (item, data, index) => {
        return index + 1
      }
    },
    {
      title: (
        <HeaderSearch
          title="Mã HS"
          sort_key="maHoSo"
          // dataSort={dataSortColumn["maHoSo"] || 0}
          // onClickSort={onClickSort}
        />
      ),
      width: "50px",
      dataIndex: "maHoSo",
      key: "maHoSo",
    },
    {
      title: (
        <HeaderSearch
          title="Tên người bệnh"
          sort_key="tenNb"
          // dataSort={dataSortColumn["tenNb"] || 0}
          // onClickSort={onClickSort}
        />
      ),
      width: "80px",
      dataIndex: "tenNb",
      key: "tenNb",
      render: (item, data) => {
        return (
          <div className="item-info">
            <span>{item}</span>
            <Button className="btn-call" onClick={() => onCallNb(data)}>
              <span>GỌI</span>
              <img src={IconCall} alt="..." />
            </Button>
          </div>
        )
      }
    },
  ];

  return (
    <Main
    >
      <Row className="header-table">
        <div className="header-table__left">Danh sách NB chuẩn bị lấy mẫu</div>
      </Row>
      <ContentTable>
       <TableWrapper
        columns={columns}
        dataSource={listNbTiepTheo?.dsTiepTheo}
        // onRow={onRow}
        rowKey={(record) => `${record.id}-${record.tenNb}`}
        // rowClassName={setRowClassName}
      />
      </ContentTable>
    </Main>
  );
}

const mapStateToProps = (state) => {
  const {
    nbXetNghiem: {
      listData,
      totalElements,
      page,
      size,
      dataSearch,
      dataSortColumn,
      phongLayMauId
    },
  } = state;
  return {
    listData,
    totalElements,
    page,
    size,
    dataSearch,
    dataSortColumn,
    phongLayMauId,
    listNbTiepTheo : state.xetNghiem.listNbTiepTheo,
  };
};
const mapDispatchToProps = ({
  nbXetNghiem: {
    getBNXetNghiem,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
  },
  layMauXN: { postNbTiepTheo, onChangeInputSearchDSDV, updateData: updateDataTiepNhanXN },
  xetNghiem: {  getDsNguoiBenhQms },
}) => ({
  getBNXetNghiem,
    onSizeChange,
    onSortChange,
    onChangeInputSearch,
    postNbTiepTheo,
    onChangeInputSearchDSDV,
    updateDataTiepNhanXN,
    getDsNguoiBenhQms
    
});

export default connect(mapStateToProps, mapDispatchToProps) (DanhSachNBTiepTheo);
