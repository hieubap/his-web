import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { MarqueeD } from "./styled";
const Marquee = (props) => {
  const { listThongBaoThoiGianThuc, searchThongBao } = props;
  useEffect(() => {
    searchThongBao({
      page: 0,
      size: 10,
      active: true,
      loaiThongBao: 30,
      sort: "createdAt,desc"
    });
  }, []);

  const onMouseEnter = (e) => {
    document.getElementById("myMarquee").stop();
  };
  const onMouseLeave = (e) => {
    document.getElementById("myMarquee").start();
  }

  return (
    <MarqueeD
      scrolldelay={10}
      scrollamount={4}
      id="myMarquee"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {listThongBaoThoiGianThuc?.map((item, index) => {
        return <span key={index}>{item.noiDung}</span>;
      })}
    </MarqueeD>
  );
}


const mapStateToProps = (state) => {
  const {
    thongBao: {
      listThongBaoThoiGianThuc
    }
  } = state;
  return { listThongBaoThoiGianThuc };
}

const mapDispatchToProps = ({
  thongBao: { searchThongBao }
}) => ({
  searchThongBao,
})

export default connect(mapStateToProps, mapDispatchToProps)(Marquee);
