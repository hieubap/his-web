import React, { useEffect, useState } from "react";
import { Row } from "antd";
import {Main } from "./styled";
import Select from "components/Select";
import { connect } from "react-redux";
const TopContent = (props) =>{

  const { getUtils, getListPhong, listRoom, listloaiQms, onSearch, listKiosk, onChangeInputSearch } = props;


  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    getUtils({ name: "loaiQms" });
    getListPhong({});
  }, []);

  const onChange = (key) => (e) => {
    if (key === "loaiQms") {
      getListPhong({ loaiPhong: e });
    }
    onChangeInputSearch({ [key]: e })
  }


  return (
    <Main>
      <Row >
        <div className="top">HỆ THỐNG XẾP HÀNG CHỜ</div>
        </Row>
      <Row>
      <div className="middle">Xin kính chào Quý khách</div>
        </Row>
      <Row>
      <div className="bottom">Thiết lập</div>
        </Row>
        <Row>
        <Select placeholder="Chọn loại QMS" data={listloaiQms} onChange={onChange("loaiQms")} />
      </Row>
      <Row><Select placeholder="Chọn phòng" data={listRoom} onChange={onChange("phongId")} /></Row>
    </Main>
  );
}

const mapStateToProps = (state) => {
  const {
    utils: { listloaiQms },
    phong: { listRoom = [] },
    kiosk: { listKiosk }
  } = state;
  return {
    listloaiQms,
    listRoom,
    listKiosk
  };
};
const mapDispatchToProps = ({
  utils: { getUtils },
  phong: { getListPhong },
  kiosk: { onSearch, onChangeInputSearch }
}) => ({
  getUtils,
  getListPhong,
  onSearch, onChangeInputSearch
});

export default connect(mapStateToProps, mapDispatchToProps)(TopContent);
