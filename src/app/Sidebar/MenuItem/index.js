import React, { useState } from "react";
import { Link } from "react-router-dom";
import { get } from "lodash";
import { useLocation } from "react-router-dom";

const AppMenu = ({ item, auth, checkRole, index, ...props }) => {
  const location = useLocation();
  const [state, _setState] = useState({
    active: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const isActiveMenu = (item, path) => {
    let isActive = false;
    if (!path || !item.link) isActive = false;
    if ((path === "/" || path === "") && path != item.link) {
      isActive = false;
      return isActive;
    }
    if (item.link && item.link.indexOf(path) != -1) {
      isActive = true;
    }
    if (item.menus && item.menus.length) {
      item.menus.forEach((item2) => {
        isActive = isActive || isActiveMenu(item2, path);
      });
    }
    return isActive;
  };

  React.useEffect(() => {
    let isActive = isActiveMenu(item, location.pathname);
    setState({
      active: isActive,
    });
  }, [location]);

  const roles = get(auth, "authorities", []);
  if (!item) return;
  if (checkRole(item.accessRoles, roles))
    return (
      <li
        key={item.link || index}
        className={`${state.active ? "mm-active" : ""}`}
      >
        <Link to={item.link || "#"} aria-expanded={state.active}>
          {/* {item.icon || item.iconType ? (
            item.icon ? (
              <Icon component={item.icon} className="metismenu-icon" />
            ) : (
              <Icon type={item.iconType} className="metismenu-icon" />
            )
          ) : null} */}
          <span>{item.name}</span>
          {/* {item.menus?.length && (
            <Icon
              type="down"
              style={{ fontSize: 10 }}
              className="metismenu-state-icon"
            />
          )} */}
        </Link>
        {item.menus?.length && (
          <ul className={state.active ? "mm-collapse mm-show" : "mm-collapse"}>
            {item.menus.map((item2, index2) => {
              return (
                <AppMenu
                  key={item2.link || index2}
                  item={item2}
                  index={index2}
                  checkRole={checkRole}
                  auth={auth}
                />
              );
            })}
          </ul>
        )}
      </li>
    );
  return null;
};

export default AppMenu;
