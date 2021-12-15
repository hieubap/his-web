import React, { useEffect } from "react";
import Loadable from "react-loadable";
import { Switch } from "react-router-dom";
import RouterWithPaths from "@components/RouterWithPaths";
import {
  SideBar,
  Header,
  Breadcrumbs,
  Footer,
  SettingLayout,
} from "@admin/components/admin";
import { connect } from "react-redux";
import dateUtils from "mainam-react-native-date-utils";
import "antd/dist/antd.css";
import { Loading } from "@admin/components/admin";
import crosstab from "crosstab";
function index(props) {
  useEffect(() => {
    window.registerEvent();
    onChangeLink();
  });
  const onChangeLink = () => {
    if (window.location.pathname === "/") {
      let donViMa = null;
      switch (window.location.origin) {
        case "https://isofh.ivisitor.vn":
          donViMa = "01";
          break;
        case "https://bvptw.ivisitor.vn":
          donViMa = "02";
          break;
        case "https://benhviendaihocyhanoi.ivisitor.vn":
          donViMa = "03";
          break;
        case "https://benhvienvietduc.ivisitor.vn":
          donViMa = "04";
          break;
        case "https://bachmai.ivisitor.vn":
          donViMa = "05";
          break;
        case "https://vnio.ivisitor.vn":
          donViMa = "06";
          break;
        case "https://vinmec.ivisitor.vn":
          donViMa = "07";
          break;
        case "https://qy110.ivisitor.vn":
          donViMa = "09";
          break;
        case "https://benhviene.ivisitor.vn":
          donViMa = "10";
          break;
        case "https://bvdktinhthanhhoa.ivisitor.vn":
          donViMa = "11";
          break;
        case "https://mediplus.ivisitor.vn":
          donViMa = "MEDIPLUS";
          break;
        case "https://set.ivisitor.vn":
          donViMa = "DTVTBK";
          break;
        case "https://nhatminhmedical.ivisitor.vn":
          donViMa = "13";
          break;
        case "https://huph.ivisitor.vn":
          donViMa = "14";
          break;
        default:
          return;
      }
      if (donViMa) {
        props.history.push("/bo-cau-hoi?donViMa=" + donViMa);
      }
    }
  };
  crosstab &&
    crosstab.util.events.on("message", function (message) {
      if (message && message.data && message.data.event === "ivisitor_logout") {
        localStorage.clear();
        setTimeout(() => {
          window.location.href = "/login";
        }, 500);
      }
    });
  const routers = [
    {
      path: ["/thong-tin-hanh-chinh"],
      component: Loadable({
        loader: () => import("@admin/containers/ttHanhChinh"),
        loading: Loading,
      }),
    },
    {
      path: ["/personal-information"],
      component: Loadable({
        loader: () => import("@admin/containers/ttHanhChinh"),
        loading: Loading,
      }),
    },
    {
      path: ["/report"],
      component: Loadable({
        loader: () => import("@admin/containers/report"),
        loading: Loading,
      }),
    },
    {
      path: ["/bao-cao"],
      component: Loadable({
        loader: () => import("@admin/containers/report"),
        loading: Loading,
      }),
    },
    {
      path: ["/bao-cao/chi-tiet/:id"],
      component: Loadable({
        loader: () => import("@admin/containers/report/detail"),
        loading: Loading,
      }),
    },
    {
      path: ["/report/detail/:id"],
      component: Loadable({
        loader: () => import("@admin/containers/report/detail"),
        loading: Loading,
      }),
    },
    {
      path: ["/user-info"],
      component: Loadable({
        loader: () => import("@admin/containers/userinfo"),
        loading: Loading,
      }),
    },
    {
      path: ["/user"],
      component: Loadable({
        loader: () => import("@admin/containers/user"),
        loading: Loading,
      }),
    },
    {
      path: ["/user/create", "/user/edit/:id"],
      component: Loadable({
        loader: () => import("@admin/containers/user/create"),
        loading: Loading,
      }),
    },
    {
      path: ["/post"],
      component: Loadable({
        loader: () => import("@admin/containers/post"),
        loading: Loading,
      }),
    },
    {
      path: ["/post/create", "/post/edit/:id"],
      component: Loadable({
        loader: () => import("@admin/containers/post/create"),
        loading: Loading,
      }),
    },
    {
      path: ["/detail/:id"],
      component: Loadable({
        loader: () => import("@admin/containers/post/detail"),
        loading: Loading,
      }),
    },
    {
      path: ["/setting"],
      component: Loadable({
        loader: () => import("@admin/containers/setting"),
        loading: Loading,
      }),
    },
    {
      path: ["/unit"],
      component: Loadable({
        loader: () => import("@admin/containers/unit"),
        loading: Loading,
      }),
    },
    {
      path: ["/target"],
      component: Loadable({
        loader: () => import("@admin/containers/target"),
        loading: Loading,
      }),
    },
    {
      path: ["/target/create", "/target/edit/:id"],
      component: Loadable({
        loader: () => import("@admin/containers/target/create"),
        loading: Loading,
      }),
    },
    {
      path: ["/area"],
      component: Loadable({
        loader: () => import("@admin/containers/area"),
        loading: Loading,
      }),
    },
    {
      path: ["/create-link-check-in"],
      component: Loadable({
        loader: () => import("@admin/containers/CheckinLink"),
        loading: Loading,
      }),
    },
    {
      path: ["/"],
      path: ["/thong-tin-hanh-chinh"],
      component: Loadable({
        loader: () => import("@admin/containers/ttHanhChinh"),
        loading: Loading,
      }),
    },
    {
      path: ["/bo-cau-hoi"],
      component: Loadable({
        loader: () => import("@admin/containers/medicalDeclaration"),
        loading: Loading,
      }),
    },
    {
      path: ["/khai-bao-y-te"],
      component: Loadable({
        loader: () => import("@admin/containers/medicalDeclaration"),
        loading: Loading,
      }),
    },
    {
      path: ["/chup-hinh"],
      component: Loadable({
        loader: () => import("@admin/containers/medicalDeclaration/ChupHinh"),
        loading: Loading,
      }),
    },
    {
      path: ["/so-dien-thoai"],
      component: Loadable({
        loader: () =>
          import("@admin/containers/medicalDeclaration/SoDienThoai"),
        loading: Loading,
      }),
    },
    {
      path: ["/otp"],
      component: Loadable({
        loader: () => import("@admin/containers/medicalDeclaration/OTP"),
        loading: Loading,
      }),
    },
    {
      path: ["/check-in"],
      component: Loadable({
        loader: () =>
          import("@admin/containers/medicalDeclaration/NhapThongTin"),
        loading: Loading,
      }),
    },
    {
      path: ["/"],
      component: Loadable({
        loader: () => import("@admin/containers/ttHanhChinh"),
        loading: Loading,
      }),
    },
  ];
  // if (!props.auth || !props.auth.id) {
  //   props.history.push("/login");
  //   return null;
  // }
  return (
    <div>
      <div className="page-wrapper">
        <div className="page-inner">
          <SideBar />
          <div className="page-content-wrapper">
            <Header />
            <main id="js-page-content" role="main" className="page-content">
              <Breadcrumbs />
              <Switch>
                {routers.map((route, key) => {
                  if (route.component)
                    return (
                      <RouterWithPaths
                        exact
                        key={key}
                        path={route.path}
                        render={(props) => {
                          return <route.component {...props} />;
                        }}
                      />
                    );
                  return null;
                })}
              </Switch>
            </main>
            <div
              className="page-content-overlay"
              data-action="toggle"
              data-class="mobile-nav-on"
            ></div>
            <Footer />
            <div
              className="modal fade modal-backdrop-transparent"
              id="modal-shortcut"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="modal-shortcut"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-top modal-transparent"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-body">
                    <ul className="app-list w-auto h-auto p-0 text-left">
                      <li>
                        <a
                          href="intel_introduction.html"
                          className="app-list-item text-white border-0 m-0"
                        >
                          <div className="icon-stack">
                            <i className="base base-7 icon-stack-3x opacity-100 color-primary-500 "></i>
                            <i className="base base-7 icon-stack-2x opacity-100 color-primary-300 "></i>
                            <i className="fal fa-home icon-stack-1x opacity-100 color-white"></i>
                          </div>
                          <span className="app-list-name">Home</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="page_inbox_general.html"
                          className="app-list-item text-white border-0 m-0"
                        >
                          <div className="icon-stack">
                            <i className="base base-7 icon-stack-3x opacity-100 color-success-500 "></i>
                            <i className="base base-7 icon-stack-2x opacity-100 color-success-300 "></i>
                            <i className="ni ni-envelope icon-stack-1x text-white"></i>
                          </div>
                          <span className="app-list-name">Inbox</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="intel_introduction.html"
                          className="app-list-item text-white border-0 m-0"
                        >
                          <div className="icon-stack">
                            <i className="base base-7 icon-stack-2x opacity-100 color-primary-300 "></i>
                            <i className="fal fa-plus icon-stack-1x opacity-100 color-white"></i>
                          </div>
                          <span className="app-list-name">Add More</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <p id="js-color-profile" className="d-none">
              <span className="color-primary-50"></span>
              <span className="color-primary-100"></span>
              <span className="color-primary-200"></span>
              <span className="color-primary-300"></span>
              <span className="color-primary-400"></span>
              <span className="color-primary-500"></span>
              <span className="color-primary-600"></span>
              <span className="color-primary-700"></span>
              <span className="color-primary-800"></span>
              <span className="color-primary-900"></span>
              <span className="color-info-50"></span>
              <span className="color-info-100"></span>
              <span className="color-info-200"></span>
              <span className="color-info-300"></span>
              <span className="color-info-400"></span>
              <span className="color-info-500"></span>
              <span className="color-info-600"></span>
              <span className="color-info-700"></span>
              <span className="color-info-800"></span>
              <span className="color-info-900"></span>
              <span className="color-danger-50"></span>
              <span className="color-danger-100"></span>
              <span className="color-danger-200"></span>
              <span className="color-danger-300"></span>
              <span className="color-danger-400"></span>
              <span className="color-danger-500"></span>
              <span className="color-danger-600"></span>
              <span className="color-danger-700"></span>
              <span className="color-danger-800"></span>
              <span className="color-danger-900"></span>
              <span className="color-warning-50"></span>
              <span className="color-warning-100"></span>
              <span className="color-warning-200"></span>
              <span className="color-warning-300"></span>
              <span className="color-warning-400"></span>
              <span className="color-warning-500"></span>
              <span className="color-warning-600"></span>
              <span className="color-warning-700"></span>
              <span className="color-warning-800"></span>
              <span className="color-warning-900"></span>
              <span className="color-success-50"></span>
              <span className="color-success-100"></span>
              <span className="color-success-200"></span>
              <span className="color-success-300"></span>
              <span className="color-success-400"></span>
              <span className="color-success-500"></span>
              <span className="color-success-600"></span>
              <span className="color-success-700"></span>
              <span className="color-success-800"></span>
              <span className="color-success-900"></span>
              <span className="color-fusion-50"></span>
              <span className="color-fusion-100"></span>
              <span className="color-fusion-200"></span>
              <span className="color-fusion-300"></span>
              <span className="color-fusion-400"></span>
              <span className="color-fusion-500"></span>
              <span className="color-fusion-600"></span>
              <span className="color-fusion-700"></span>
              <span className="color-fusion-800"></span>
              <span className="color-fusion-900"></span>
            </p>
          </div>
        </div>
      </div>
      <SettingLayout />
    </div>
  );
}
function mapStateToProps(state) {
  return {
    auth: state.auth && state.auth.auth,
  };
}

export default connect(mapStateToProps)(index);
