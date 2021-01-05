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