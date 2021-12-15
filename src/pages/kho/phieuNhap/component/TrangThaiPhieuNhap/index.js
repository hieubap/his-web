import React from "react";
import { connect } from "react-redux";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Chain, Nodes } from "./styled";

const TrangThaiPhieuNhap = ({
  status,
  widthNode = "150px",
  ...props
}) => {

  return (
    <div style={{ position: "relative" }}>
      <Chain />
      <Nodes>
        {status?.map((item, index) => (
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

export default connect(
  (state) => ({
    thongTinPhieuNhap: state.phieuNhap.thongTinPhieuNhap,
  }),
  ({ }) => ({})
)(TrangThaiPhieuNhap);
