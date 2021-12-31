import React, { useRef } from "react";
import { Col, Row, Popover } from "antd";
import { Main, GlobalStyle } from "./styled";
import { HOST } from "client/request";
import { connect } from "react-redux";
import {
  ListContentLeftHome,
  ListContentLeftFunc,
  ListDanhMucXN,
  ListQuanTriHeThong,
  ListThietLap,
  ListKho,
  ListChanDoanHinhAnh,
  ListHoSoBenhAn,
  ListKySo,
  ListPhieuTheoDoiDieuTri,
  ListBaoCao,
} from "pages/home/layout/configData";
import { Select } from "antd";
import ModalReduxViewer from "components/ModalReduxViewer";

import iconLogouut from "assets/svg/iconLogout.svg";
import iconChangePass from "assets/svg/iconChangePass.svg";
import Icon from "@ant-design/icons";
import ModalHome from "./ModalHome";
import ModalChangePass from "components/ModalChangePass";
const { Option } = Select;
const Header = (props) => {
  const refModalReduxViewer = useRef(null);
  const refModalChangePass = useRef(null);

  const { auth, onLogout, history } = props;
  const refHome = useRef();
  const showModalChangePass = () => {
    refModalChangePass.current && refModalChangePass.current.show();
  };
  const content = (
    <div>
      <div
        className="item-action"
        style={{ cursor: "pointer" }}
        onClick={() => onLogout()}
      >
        <Icon className="icon-logout" component={iconLogouut} />
        <span> Đăng xuất</span>
      </div>
      <div
        className="item-action"
        style={{ cursor: "pointer" }}
        onClick={() => showModalChangePass()}
      >
        <Icon className="icon-change-pass" component={iconChangePass} />
        <span> Đổi mật khẩu</span>
      </div>
    </div>
  );
  const data = [
    ...ListContentLeftHome,
    ...ListContentLeftFunc,
    ...ListChanDoanHinhAnh,
    ...ListDanhMucXN,
    ...ListHoSoBenhAn,
    ...ListKho,
    ...ListKySo,
    ...ListQuanTriHeThong,
    ...ListThietLap,
    ...ListPhieuTheoDoiDieuTri,
    ...ListBaoCao,
  ];
  // const goPage = () => {
  //   return setTimeout(() => {
  //     history.go();
  //   }, 300);
  // };

  const gotoPage = (value) => {
    history.push(value);
    // goPage();
  };
  const showModalHome = () => {
    refHome.current.show(
      {
        show: true,
      },
      (data = {}) => {}
    );
  };

  const filterOption = (input = "", option) => {
    input = input?.toLowerCase().createUniqueText() || "";
    return (
      option?.props.children?.toLowerCase().createUniqueText().indexOf(input) >=
      0
    );
  };
  const childrenSearch = data.map((item, index) => {
    return (
      <Option key={index} value={item.link + ""}>{`${item?.title}`}</Option>
    );
  });
  const onDoubleClick = () => {
    refModalReduxViewer.current && refModalReduxViewer.current.show();
  };
  return (
    <Main>
      <GlobalStyle />
      <div className="container">
        <Row className="header">
          <div className="header__left">
            {auth?.benhVien?.ten ? (
              <img
                onClick={() => gotoPage("/")}
                className="isofh"
                src={`${HOST}/api/his/v1/dm-thiet-lap/logo-benh-vien`}
                alt=""
              />
            ) : (
              <span
                onClick={() => gotoPage("/")}
                className="isofh-white"
              ></span>
            )}
            <div className="name-hospital">{auth?.benhVien?.ten}</div>
            <img
              className="menu"
              onClick={() => showModalHome()}
              src={require("assets/images/his-core/menuheader.png")}
              alt=""
            />
            <div className="search">
              <img src={require("assets/images/his-core/iconSearch.png")}></img>
              <Select
                id="nh-select-tim-kiem-ten-man-hinh"
                onChange={(e) => gotoPage(e)}
                showSearch
                className="select"
                placeholder="Tìm kiếm tên màn hình"
                // id={"link"}
                ten={"title"}
                filterOption={filterOption}
              >
                {childrenSearch}
              </Select>
            </div>
          </div>
          <div className="header__right">
            <div className="notifi">
              <img
                src={require("assets/images/his-core/icNotifi.png")}
                alt=""
              />
            </div>
            <div className="help">
              <img src={require("assets/images/his-core/icHelp.png")} />
            </div>
            <Popover
              style={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px !important",
              }}
              placement="bottomRight"
              overlayClassName={"popover-header"}
              content={content}
              trigger="click"
            >
              <img
                style={{ cursor: "pointer" }}
                src={require("assets/images/his-core/avatar.jpg")}
                alt=""
              />
            </Popover>
            <div className="username">{auth?.full_name}</div>
            <div className="logo-isofh" onDoubleClick={onDoubleClick}>
              <img
                src={require("assets/images/his-core/logoIsofh.png")}
                alt=""
              />
            </div>
          </div>
        </Row>
      </div>
      <ModalHome ref={refHome} />
      <ModalReduxViewer ref={refModalReduxViewer} />
      <ModalChangePass ref={refModalChangePass} />
    </Main>
  );
};

const mapState = (state) => ({
  auth: state.auth.auth,
});
const mapDispatch = ({ auth: { onLogout } }) => ({
  onLogout,
});

export default connect(mapState, mapDispatch)(Header);
