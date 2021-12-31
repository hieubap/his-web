import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { CheckCircleOutlined } from "@ant-design/icons";
import moment from "moment";
const Nodes = styled.div`
  display: flex;
  position: relative;

  .card {
    border: 1px solid #c5cad3;
    border-radius: 50px;
    font-size: 13px;
    color: #172b4d;
    padding: 0px 20px;
    margin-left: 20px;
    text-align: center;
    background-color: white;
    z-index: 1;
    &.active {
      border-color: #049254;
      color: #7a869a;
    }
    &.in-active {
      background-color: #e8eaed;
      color: #7a869a;
    }
    .time-bottom {
      margin-left: -15px;
      position: absolute;
      top: 25px;
    }
  }
  span {
    margin-left: 5px;
  }
  div:first-child {
    margin-left: 0;
  }
`;
const Chain = styled.div`
  position: absolute;
  height: 1px;
  top: 12px;
  background-color: #7a869a;
  width: 100%;
  z-index: 0;
`;
const TrangThaiPhieuXuat = ({ ticket, widthNode = "150px" }) => {
  const status = [
    {
      name: "Tạo phiếu nhập",
      active: !!ticket.thoiGianTaoPhieu,
      time:
        ticket.thoiGianTaoPhieu &&
        moment(ticket.thoiGianTaoPhieu).format("HH:mm:ss - DD/MM/YYYY"),
    },
    {
      name: "Chờ duyệt",
      inActive: !ticket.thoiGianTaoPhieu,
      active: !!ticket.thoiGianGuiDuyet,
      time:
        ticket.thoiGianGuiDuyet &&
        moment(ticket.thoiGianGuiDuyet).format("HH:mm:ss - DD/MM/YYYY"),
    },
    {
      name: "Hoàn thành",
      inActive: !ticket.thoiGianGuiDuyet,
      active: !!ticket.thoiGianDuyet,
      time:
        ticket.thoiGianDuyet &&
        moment(ticket.thoiGianDuyet).format("HH:mm:ss - DD/MM/YYYY"),
    },
  ];

  return (
    <div style={{ position: "absolute", top: "20px", right: "40px" }}>
      <Chain />
      <Nodes>
        {status.map((item, index) => (
          <div
            className={
              item.active
                ? "card active"
                : item.inActive
                ? "card in-active"
                : "card"
            }
            key={index}
            style={{ width: widthNode }}
          >
            {item.name}
            {item.active && (
              <CheckCircleOutlined style={{ color: "#049254" }} />
            )}
            {item.time && (
              <div className="time-bottom">{"(" + item.time + ")"}</div>
            )}
          </div>
        ))}
      </Nodes>
    </div>
  );
};

export default TrangThaiPhieuXuat;
