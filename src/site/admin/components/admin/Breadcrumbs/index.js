import React, {useCallback, useRef} from "react";
import { Link } from "react-router-dom";
import { withTranslate } from "react-redux-multilingual";
import { connect } from "react-redux";
import { Ol } from "./style"
import { useLocation } from 'react-router-dom'; 
const Breadcrumbs =(props)=> {
  const { translate, auth } = props;
  let donViId = auth && auth.donViId || null;
  let khuVucId = auth && auth.khuVucId || null;
  const location = useLocation();

  const getBreadcrumbs = useCallback
    (() => {
    let url = (location.pathname || "").toLowerCase();
    let obj = [];
    switch (url) {
      case "/":
      case "/personal-information":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/",
            name: "Home",
          },
          {
            name: translate("thongtinhanhchinh"),
          },
        ];
        break;
      case "/thong-tin-hanh-chinh":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/",
            name: "Home",
          },
          {
            name: translate("thongtinhanhchinh"),
          },
        ];
        break;
      case "/report":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/",
            name: "Home",
          },
          {
            name: translate("baocao"),
          },
        ];
        break;
      case "/bao-cao":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/",
            name: "Home",
          },
          {
            name: translate("baocao"),
          },
        ];
        break;
      case "/user-info":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/",
            name: "Home",
          },
          {
            name: translate("thongtincanhan"),
          },
        ];
        break;
      case "/user":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/",
            name: "Home",
          },
          {
            name: translate("quanlytaikhoan"),
          },
        ];
        break;
      case "/user/create":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/",
            name: "Home",
          },
          {
            name: translate("quanlytaikhoan"),
            url: "/user",
          },
          {
            name: translate("themmoitaikhoan"),
          },
        ];
        break;
      case "/post":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/",
            name: "Home",
          },
          {
            name: translate("bocauhoi"),
          },
        ];
        break;
      case "/post/create":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/",
            name: "Home",
          },
          {
            name: translate("bocauhoi"),
            url: "/post",
          },
          {
            name: translate("themmoi"),
          },
        ];
        break;
      case "/setting":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/",
            name: "Home",
          },
          {
            name: translate("thietlapchung"),
          },
        ];
        break;
      case "/unit":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/",
            name: "Home",
          },
          {
            name: translate("danhsachdonvi"),
          },
        ];
        break;
      case "/area":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/",
            name: "Home",
          },
          {
            name: translate("danhsachkhuvuc"),
          },
        ];
        break;
      case "/target":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/",
            name: "Home",
          },
          {
            name: translate("danhsachdoituong"),
          },
        ];
        break;
      case "/tim-kiem":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/",
            name: "Home",
          },
          {
            name: translate("timkiembenhnhan"),
          },
        ];
        break;
      case "dang-ky":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/",
            name: "Home",
          },
          {
            name: translate("register_info"),
          },
        ];
        break;
      case "/chup-hinh":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/",
            name: "Home"
          },
          {
            name: translate("chuphinh"),
          },
        ];
        break;
      case "/bo-cau-hoi":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/",
            name: "Home"
          },
          {
            name: translate("khaibaoyte"),
          },
        ];
        break;
      case "/khai-bao-y-te":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/",
            name: "Home"
          },
          {
            name: translate("khaibaoyte"),
          },
        ];
        break;
      case "/check-in":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/",
            name: "Home"
          },
          {
            name: translate("khaibaoyte"),
          },
        ];
        break;
        case "/lich-su-check-in":
        obj = [
          {
            icon: "fal fa-home mr-1",
            url: "/",
            name: "Home"
          },
          {
            name: translate("lichsukhaibao"),
          },
        ];
        break;
      default:
        if (url.indexOf("/user/edit") === 0) {
          obj = [
            {
              icon: "fal fa-home mr-1",
              url: "/",
              name: "Home",
            },
            {
              url: "/user",
              name: translate("quanlytaikhoan"),
            },
            {
              name: translate("capnhattaikhoan"),
            },
          ];
        } else if (url.indexOf("/post/edit") === 0) {
          obj = [
            {
              icon: "fal fa-home mr-1",
              url: "/",
              name: "Home",
            },
            {
              url: "/post",
              name: translate("bocauhoi"),
            },
            {
              name: translate("capnhat"),
            },
          ];
        } else if (url.indexOf("/detail") === 0) {
          obj = [
            {
              icon: "fal fa-home mr-1",
              url: "/",
              name: "Home",
            },
            {
              url: "/post",
              name: translate("bocauhoi"),
            },
            {
              name: translate("chitiet"),
            },
          ];
        } else if (url.indexOf("/report/detail") === 0) {
          obj = [
            {
              icon: "fal fa-home mr-1",
              url: "/",
              name: "Home",
            },
            {
              url: "/report",
              name: translate("baocao"),
            },
            {
              name: translate("chitiet"),
            },
          ];
        } else if (url.indexOf("/bao-cao/chi-tiet") === 0) {
          obj = [
            {
              icon: "fal fa-home mr-1",
              url: "/",
              name: "Home",
            },
            {
              url: "/bao-cao",
              name: translate("baocao"),
            },
            {
              name: translate("chitiet"),
            },
          ];
        } else if (url.indexOf("/tim-kiem-qrcode") === 0) {
          obj = [
            {
              icon: "fal fa-home mr-1",
              url: "/",
              name: "Home",
            },
            {
              url: `/tim-kiem-qrcode?${donViId ? "donViId=" + donViId : ""}&${khuVucId ? "khuVucId=" + khuVucId : null
                }`,
              name: translate("timkiemQR"),
            },
          ];
        } else if (url.indexOf("/create-link-check-in") === 0) {
          obj = [
            {
              icon: "fal fa-home mr-1",
              url: "/",
              name: "Home",
            },
            {
              url: `/create-link-check-in`,
              name: translate("linkbocauhoi"),
            },
          ];
        }
        break;
    }
    return obj;
  },[location]);

  const breadCrumb = getBreadcrumbs();
  return (
    <Ol className="breadcrumb ">
      {breadCrumb.map((item, index) => {
        if (index < breadCrumb.length - 1)
          return (
            <li className="breadcrumb-item" key={index}>
              <Link to={item.url || "#"}
              // className="text-white"
              >
                {item.icon && <i className="fal fa-home mr-1"></i>}
                {item.name}
              </Link>
            </li>
          );
        return (
          <li className="breadcrumb-item active" key={index}>
            {item.name}
          </li>
        );
      })}
    </Ol>
  );
}
function mapStateToProps(state) {
  return {
    auth: state.auth && state.auth.auth,
  };
}

export default connect(mapStateToProps)(withTranslate(Breadcrumbs));
