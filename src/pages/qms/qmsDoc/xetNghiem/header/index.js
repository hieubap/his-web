import React, { memo, useRef } from "react";
import { StyledHeader } from "./headerStyles";
import Logo from "assets/images/welcome/avatar.png";
import Modal from "pages/qms/qmsDoc/thietLap/Modal";
import { HOST } from "client/request";
import fileUtils from "utils/file-utils";

const Header = (props) => {
  const { onClick, tenPhong, tenKhoa, currentKiosk, iconChuyenKhoa } = props;
  const refInfo = useRef(null);
  const onOpenPopup = () => {
    if (currentKiosk) refInfo.current && refInfo.current.show(currentKiosk);
  };

  const openFullScreen = () => {
    var elem = document.documentElement;
    elem.requestFullscreen();
  }
  return (
    <StyledHeader>
      <div className="logo" onClick={onOpenPopup}>
        <img src={`${HOST}/api/his/v1/dm-thiet-lap/logo-benh-vien`} alt="..." />
      </div>
      <div className="title-header">
        <span className="title-header__first">{tenPhong}</span>
        <br />
        <span className="title-header__second">{tenKhoa}</span>
      </div>
      <div className="sub-logo" onClick={onClick} onClick={openFullScreen}>
        <img
          className="sub-logo__icon"
          alt=""
          src={`${fileUtils.absoluteFileUrl(iconChuyenKhoa)}`}
        />
      </div>
      <Modal ref={refInfo}></Modal>
    </StyledHeader>
  );
};

export default memo(Header);
