import React, { useEffect, useState } from "react";

import Logo from "assets/svg/logo-white.svg";
import VN from "assets/svg/flag/vn.svg";
import UK from "assets/svg/flag/uk.svg";
import { Link } from "react-router-dom";
import { Icon, Dropdown, Menu, Popover } from "antd";
import { useTranslation } from "react-i18next";
import { Main } from "./styled";
import UserInfo from "components/UserInfo";
import Notification from "components/Notification";
import { connect } from "react-redux";
import useInterval from "hook/useInterval";
import ButtonNotification from "components/Notification/ButtonNotification";
const Header = (props) => {
  const { t, i18n } = useTranslation();
  const [state, _setState] = useState({
    SidebarDataClass: "closed-sidebar",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    i18n.changeLanguage("vi");
    props.showInAppNotification();

    if (window.mnJquery) {
      const r = window.mnJquery();

      r(".mobile-toggle-nav").click(function () {
        r(this).toggleClass("is-active");
        r(".app-container").toggleClass("sidebar-mobile-open");
      });
      r(".mobile-toggle-header-nav").click(function () {
        r(this).toggleClass("active");
        r(".app-header__content").toggleClass("header-mobile-open");
      });
      r(".mobile-app-menu-btn").click(function () {
        r(".hamburger", this).toggleClass("is-active");
        r(".app-inner-layout").toggleClass("open-mobile-menu");
      });
    }
  }, []);
  useInterval(() => {
    props.showInAppNotification();
  }, 60000);
  const changeLanguage = (lng) => () => {
    i18n.changeLanguage(lng);
  };

  const onShowNotification = (show) => (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setState({ showNotification: true });
  };

  const showSearch = (show) => () => {
    setState({
      isShowSearch: show,
    });
  };

  const onCloseSideBar = (e) => {
    setState({
      isActive: !state.isActive,
    });
    const r = window.mnJquery();
    r(".app-container").toggleClass(state.SidebarDataClass);
  };
  return (
    <Main>
      <div className="app-header header-shadow">
        <div className="app-header__logo">
          <div className="logo-src">
            <Logo width={110} height={40} />
          </div>
          <div className="header__pane ml-auto">
            <div>
              <button
                type="button"
                className={`hamburger close-sidebar-btn hamburger--elastic ${
                  state.isActive ? "is-active" : ""
                }`}
                data-class={state.SidebarDataClass}
                onClick={onCloseSideBar}
              >
                <span className="hamburger-box">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="app-header__mobile-menu">
          <div>
            <button
              type="button"
              className="hamburger hamburger--elastic mobile-toggle-nav"
            >
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
          </div>
        </div>
        <div className="app-header__menu">
          <span>
            <button
              type="button"
              className="btn-icon btn-icon-only btn btn-sm mobile-toggle-header-nav"
            >
              <span className="btn-icon-wrapper">
                <Icon type="more" style={{ color: "#FFF", fontSize: 25 }} />
              </span>
            </button>
          </span>
        </div>
        <div className="app-header__content">
          <div className="app-header-left">
            {/* <div
              className={`search-wrapper ${state.isShowSearch ? "active" : ""}`}
            >
              <div className="input-holder">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Type to search"
                />
                <button className="search-icon" onClick={showSearch(true)}>
                  <span></span>
                </button>
              </div>
              <button className="close" onClick={showSearch(false)}></button>
            </div> */}
          </div>
          <div className="app-header-right">
            <div className="header-dots">
              <div className="dropdown">
                <a
                  href={`${window.location.origin}${process.env.REACT_APP_DOCUMENT_LINK}`}
                  type="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                  className="p-0 mr-2 btn btn-link"
                >
                  <span className="icon-wrapper icon-wrapper-alt rounded-circle">
                    <span className="icon-wrapper-bg bg-danger"></span>
                    <Icon
                      type="question-circle"
                      style={{ color: "#fff", fontSize: 16 }}
                    />
                  </span>
                </a>
              </div>
              <ButtonNotification />

              {/* <div className="dropdown">
                <button
                  type="button"
                  data-toggle="dropdown"
                  className="p-0 mr-2 btn btn-link"
                >
                  <span className="icon-wrapper icon-wrapper-alt rounded-circle">
                    <span className="icon-wrapper-bg bg-focus"></span>
                    <VN className="language-icon opacity-8 flag large" />
                  </span>
                </button>
                <div
                  tabIndex="-1"
                  role="menu"
                  aria-hidden="true"
                  className="rm-pointers dropdown-menu dropdown-menu-right"
                >
                  <div className="dropdown-menu-header">
                    <div className="dropdown-menu-header-inner pt-4 pb-4 bg-focus">
                      <div className="menu-header-image opacity-05"></div>
                      <div className="menu-header-content text-center text-white">
                        <h6 className="menu-header-subtitle mt-0">
                          {t("language")}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    tabIndex="0"
                    className="dropdown-item"
                    onClick={changeLanguage("vi")}
                  >
                    <VN className="mr-3 opacity-8 flag large CH" />
                    Tiếng Việt
                  </button>
                  <button
                    type="button"
                    tabIndex="0"
                    className="dropdown-item"
                    onClick={changeLanguage("en")}
                  >
                    <UK className="mr-3 opacity-8 flag large CH" />
                    English
                  </button>
                </div>
              </div> */}
            </div>
            <UserInfo />
          </div>
        </div>
      </div>
    </Main>
  );
};

export default connect(
  (state) => {
    return {
      totalUnread: state.notification.totalUnread,
    };
  },
  ({ notification: { showInAppNotification } }) => ({
    showInAppNotification,
  })
)(Header);

// <div className={"left-side-header"}>
// <Link to={"/"} className={"logo-link"}>
//   <Logo width={110} height={40} />
// </Link>

// <span className={"left-side-header-title"}>
//   {process.env.REACT_APP_TITLE}
// </span>
// </div>

// <div className="header-icon">
// <div className={"document"}>
//   <a
//     target={"_blank"}
//     href={`${window.location.origin}${process.env.REACT_APP_DOCUMENT_LINK}`}
//   >
//     <span title={"Tài liệu, hướng dẫn sử dụng"}>
//       <Icon
//         type="question-circle"
//         style={{ color: "#fff", fontSize: 16 }}
//       />
//     </span>
//   </a>
// </div>

// <div className={"app-notification"}>
//   <Popover
//     content={<Notification show={state.showNotification} />}
//     trigger="click"
//     onVisibleChange={onShowNotification}
//   >
//     <div className="notification-contain">
//       <Icon type="bell" style={{ fontSize: 18, color: "#fff" }} />
//       {props.totalUnread > 0 && (
//         <span className="badge">
//           {props.totalUnread > 99 ? "99+" : props.totalUnread}
//         </span>
//       )}
//     </div>
//   </Popover>
// </div>
// <div className={"app-language"}>
//   <Dropdown
//     overlay={menu(changeLanguage)}
//     overlayStyle={{ minWidth: 120 }}
//     placement={"bottomRight"}
//   >
//     <div id={"app-language"} className={"language-contain"}>
//       <Icon type="global" style={{ fontSize: 18, color: "#fff" }} />
//       <span className={"language-title"}>{t("language")}</span>
//     </div>
//   </Dropdown>
// </div>
// <div className={"use-info-header"}>
//   <UserInfo />
// </div>
// </div>
