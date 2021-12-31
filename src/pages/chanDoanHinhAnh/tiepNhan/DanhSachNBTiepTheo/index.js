import React, { useEffect, useMemo, useRef, useState } from "react";
import { Main, ContentTable } from "./styled";
import TableWrapper from "components/TableWrapper";
import HeaderSearch from "components/TableWrapper/headerSearch";
import { Button, Input, Row } from "antd";
import { connect } from "react-redux";
import IconCall from "assets/images/xetNghiem/icCall.png";
import { HOST } from "client/request";
import SockJsClient from "react-stomp";

const  DanhSachNBTiepTheo = (props) => {
  const {
    listNbCls,
     tiepNhanDv,
     updateDataChoTiepDon,
     auth,
     dsPhongThucHienId,
     getDsNguoiBenhCLSQms
  } = props;  
  const clientRef = useRef();
  const [state, _setState] = useState({
    data: [],
  });
  const setState = (data) => {
    _setState({
      ...state,
      ...data,
    });
  };
  const  onCallNb = (data) => {
    tiepNhanDv(data?.dsId).then((s) => {
      getDsNguoiBenhCLSQms(dsPhongThucHienId)
    });
    updateDataChoTiepDon({nbDotDieuTriId : data?.nbDotDieuTriId});
  }

  const sendMessage = (msg) => {
    clientRef.current && clientRef.current.sendMessage("/topics/qms", msg);
  };

  useEffect(() => {
    setState({data : listNbCls?.dsTiepTheo})
  },[listNbCls?.dsTiepTheo])

  const webSocket = useMemo(() => {
    return (
      <SockJsClient
        url={`${HOST}/api/his/v1/ws/?access_token=${auth?.access_token}`}
        topics={[`/topic/qms.${dsPhongThucHienId}`]}
        onConnect={() => {
          console.log("connected");
        }}
        onDisconnect={() => {
          console.log("Disconnected");
        }}
        onMessage={(msg) => {
          setState({data : msg?.dsTiepTheo})
        }}
        ref={(client) => {
          sendMessage(client);
        }}
      />
    );
  });
  console.log("dsPhongThucHienId", dsPhongThucHienId)

  const columns = [
    {
      title: <HeaderSearch title="STT" />,
      width: "25px",
      dataIndex: "index",
      key: "index",
      align: "center",
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
        <div className="header-table__left">Danh sách người bệnh tiếp theo</div>
      </Row>
      <ContentTable>
       <TableWrapper
        columns={columns}
        dataSource={state.data}
        // onRow={onRow}
        rowKey={(record) => `${record.id}-${record.tenNb}`}
      />
      </ContentTable>
      {webSocket}
    </Main>
  );
}

const mapStateToProps = (state) => {
  const {
    dsBenhNhan: {
      listData,
      totalElements,
      page,
      size,
      dataSearch,
      dataSort,
      dataSortColumn,
      dsPhongThucHienId
    },
    choTiepDonDV: { nbDotDieuTriId, listServices },
  } = state;

  return {
    listServices,
    listData,
    totalElements,
    page,
    size,
    dataSearch,
    dataSort,
    dataSortColumn,
    nbDotDieuTriId,
    listNbCls : state.qms.listNbCls,
    auth: state.auth.auth,
    dsPhongThucHienId
  };
};
const mapDispatchToProps = ({
  dsBenhNhan: { onSizeChange, onChangeInputSearch, onSortChange, onSearch },
  choTiepDonDV: {
    updateData: updateDataChoTiepDon,
    onChangeInputSearch: onChangeInputSearchDv,
    tiepNhanDv
  },
  qms: { getDsNguoiBenhCLSQms }
}) => ({
  onSizeChange,
  onChangeInputSearch,
  onSortChange,
  onSearch,
  updateDataChoTiepDon,
  onChangeInputSearchDv,tiepNhanDv,
  getDsNguoiBenhCLSQms

});

export default connect(mapStateToProps, mapDispatchToProps) (DanhSachNBTiepTheo);
