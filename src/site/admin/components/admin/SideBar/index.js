import React, { useState, useEffect, useRef } from "react";
import "./style.scss";
import { connect } from "react-redux";
import ItemMenu from "../ItemMenu";
import $ from "jquery";
import { withTranslate } from "react-redux-multilingual";
function index(props) {
  const { translate, auth } = props;
  const menus = useRef(null);
  const [state, _setState] = useState({
    show: false,
  });
  const getMenu = () => {
    let allMenus = [
      {
        userType: [],
        href: translate("thongtinhanhchinhherf"),
        i18n: "nav.thong-tin-hanh-chinh",
        name: translate("thongtinhanhchinh"),
        icon: "fal fa-info-circle",
      },
      {
        userType: [],
        href: translate("baocaohref"),
        i18n: "nav.report",
        name: translate("baocao"),
        icon: "fal fa-file-signature",
      },
      {
        userType: ["ROLE_admin_don_vi", "ROLE_admin_ivisitor"],
        href: "/user",
        i18n: "nav.user",
        name: translate("quanlytaikhoan"),
        icon: "fal fa-users",
      },
      {
        userType: ["ROLE_admin_don_vi", "ROLE_admin_ivisitor"],
        href: "/post",
        i18n: "nav.post",
        name: translate("bocauhoi"),
        icon: "fal fa-map-marker-question",
      },
      {
        userType: ["ROLE_admin_ivisitor"],
        href: "/unit",
        i18n: "nav.unit",
        name: translate("danhsachdonvi"),
        icon: "fal fa-list-alt",
      },
      {
        userType: ["ROLE_admin_don_vi", "ROLE_admin_ivisitor"],
        href: "/area",
        i18n: "nav.area",
        name: translate("danhsachkhuvuc"),
        icon: "fal fa-mountains",
      },
      {
        userType: ["ROLE_admin_ivisitor"],
        href: "/target",
        i18n: "nav.target",
        name: translate("danhsachdoituong"),
        icon: "fal fa-user-circle",
      },
      // {
      //   userType: ["ROLE_admin_ivisitor"],
      //   href: "/target",
      //   i18n: "nav.target",
      //   name: translate("danhsachdoituong"),
      //   icon: "fal fa-users-cog",
      // },
      {
        userType: [],
        href: "/setting",
        i18n: "nav.setting",
        name: translate("thietlapchung"),
        icon: "fal fa-cog",
      },
      {
        userType: ["ROLE_admin_don_vi", "ROLE_admin_ivisitor"],
        href: `/create-link-check-in`,
        i18n: "nav.createlink",
        name: translate("taolinkbocauhoi"),
        icon: "fal fa-file-plus",
      },
      {
        userType: [],
        href: `/bo-cau-hoi`,
        i18n: "nav.bocauhoi",
        name: translate("khaibaoytetunguyen"),
        icon: "fal fa-pen",
      },
      {
        userType: [],
        href: `/check-in`,
        i18n: "nav.checkin",
        name: "Check in",
        icon: "fal fa-qrcode",
      },
    ];
    let allMenus2 = [
      {
        href: translate("thongtinhanhchinhherf"),
        i18n: "nav.thong-tin-hanh-chinh",
        name: translate("thongtinhanhchinh"),
        icon: "fal fa-qrcode",
      },
    ];
    if (props.auth && props.auth.id) {
      return allMenus.filter((item) => {
        if (!(item.userType || []).length) return true;
        for (let i = 0; i < item.userType.length; i++) {
          if (
            item.userType[i] ==
            (props.auth.authorities || []).find(
              (option) => option == item.userType[i]
            )
          ) {
            return true;
          }
        }
      });
    } else {
      return allMenus2;
    }
  };
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };
  useEffect(() => {
    try {
      window.initApp.listFilter(
        $("#js-nav-menu"),
        $("#nav_filter_input"),
        $("#js-primary-nav")
      );
    } catch (error) { }
  });
  useEffect(() => {
    setState({ menus: getMenu() });
    if (menus.current) {
      setState({ menus: menus.current });
    }
  }, []);
  const toggle = (item) => {
    item.open = !item.open;
    menus.current = [...state.menus];
    setState({ menus: menus.current });
  };
  return (
    <aside className="page-sidebar list-filter-active">
      <div
        className="page-logo"
      >
        <a
          href="#"
          className={`page-logo-link 
          press-scale-down 
          d-flex align-items-center position-relative`}
          style={{ padding: "10px" }}
        >
          <img
            src={require("@images/logoIvisitor.png")}
            alt="iSofH"
            style={{ height: 38 , width :187}}
            aria-roledescription="logo"
          />
          
          {/* <span className="page-logo-text mr-1">
            <img
              src={require("@images/isofh.png")}
              alt="iSofH"
              style={{ height: 30 }}
              aria-roledescription="logo"
            />
          </span> */}
        </a>
      </div>
      <div className="divider"></div>
      <nav
        id="js-primary-nav"
        className="primary-nav js-list-filter"
        role="navigation"
      >
        {/* <div className="nav-filter">
          <div className="position-relative">
            <input
              type="text"
              id="nav_filter_input"
              placeholder={translate("timkiemtinhnang")}
              className="form-control"
              tabIndex="0"
            />
            <a
              href="#"
              onClick={() => {
                return false;
              }}
              className="btn-primary btn-search-close js-waves-off"
              data-action="toggle"
              data-class="list-filter-active"
              data-target=".page-sidebar"
            >
              <i className="fal fa-chevron-up"></i>
            </a>
          </div>
        </div> */}
        <div className="info-card">
          <img
            src={
              props.auth && props.auth.donViLogo
                ? props.auth.donViLogo.absoluteFileUrl()
                : "/img/demo/avatars/avatar-admin.png"
            }
            className="profile-image rounded-circle"
            alt={(props.auth || {}).full_name}
          />
          <div className="info-card-text">
            <a href="#" className="d-flex align-items-center text-white">
              <span className="text-truncate text-truncate-sm d-inline-block">
                {(props.auth || {}).full_name}
              </span>
            </a>
          </div>
          <img
            src="/img/card-backgrounds/cover-2-lg.png"
            className="cover"
            alt="cover"
          />
          <a
            href="#"
            onClick={() => {
              return false;
            }}
            className="pull-trigger-btn"
            data-action="toggle"
            data-class="list-filter-active"
            data-target=".page-sidebar"
            data-focus="nav_filter_input"
          >
            <i className="fal fa-angle-down"></i>
          </a>
        </div>
        <ul id="js-nav-menu" className="nav-menu">
          {state.menus &&
            state.menus.length &&
            state.menus.map((item, index) => {
              return <ItemMenu key={index} item={item} toggle={toggle} />;
            })}
        </ul>
        <div className="filter-message js-filter-message bg-success-600"></div>
      </nav>
      <div className="nav-footer shadow-top">
        <a
          href="#"
          onClick={() => {
            return false;
          }}
          data-action="toggle"
          data-class="nav-function-minify"
          className="hidden-md-down"
        >
          <i className="ni ni-chevron-right"></i>
          <i className="ni ni-chevron-right"></i>
        </a>
        <ul className="list-table m-auto nav-footer-buttons"></ul>
      </div>
    </aside>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth && state.auth.auth,
  };
}

export default connect(mapStateToProps)(withTranslate(index));
