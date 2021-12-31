import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { get } from "lodash";
import { menu, checkRole } from "./constant";
import Logo from "assets/svg/logo-white.svg";
import MenuItem from "./MenuItem";
const AppMenu = ({ auth }) => {

  const roles = get(auth, "authorities", []);
  useEffect(() => {
    if (window.mnJquery) {
      try {
        window.mnJquery()(".vertical-nav-menu").metisMenu();
      } catch (error) {}
    }
  }, []);

  return (
    <Main className="app-sidebar sidebar-shadow">
      <div className="app-header__logo">
        <div className="logo-src">
          <Logo width={110} height={40} />
        </div>
        <div className="header__pane ml-auto">
          <div>
            <button
              type="button"
              className="hamburger close-sidebar-btn hamburger--elastic"
              data-class="closed-sidebar"
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
            className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
          >
            <span className="btn-icon-wrapper">
              <i className="fa fa-ellipsis-v fa-w-6"></i>
            </span>
          </button>
        </span>
      </div>
      <div className="scrollbar-sidebar">
        <div className="app-sidebar__inner">
          <ul className="vertical-nav-menu">
            {menu.map((item, index) => {
              return (
                <MenuItem
                  item={item}
                  key={item.link || index}
                  index={index}
                  checkRole={checkRole}
                  roles={roles}
                  auth={auth}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </Main>
  );
};

const mapState = (state) => ({
  auth: state.auth.auth,
});

export default connect(mapState)(AppMenu);
