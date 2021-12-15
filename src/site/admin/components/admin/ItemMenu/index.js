import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Collapse from "@kunukn/react-collapse";
import { connect } from "react-redux";
import actionTtHanhChinh from "@actions/ttHanhChinh";
function index(props) {
  const history = useHistory();
  useEffect(() => {
  }, []);
  const onClick = (item) => (e) => {
    if (props.toggle) {
      props.toggle(item);
    }
    if (!item.href || item.href == "#") {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  const checkPathActive = (arr) => {
    const {
      location: { pathname },
    } = history;

    return arr.includes(pathname);
  };

  return (
    <li>
      {props.item.href && (!props.item.menus || !props.item.menus.length) ? (
        <Link
          onClick={() => {
            props.updateData({
              MenuHighlight: props.item.href,
              clickMenu: true
            });
            setTimeout(() => {
              props.updateData({ clickMenu: false });
            }, 1000);
            onClick(props.item);
          }}
          to={props.item.href}
          title={props.item.name}
          data-filter-tags={props.item.name + " " + props.item.filter}
          className={`waves-effect waves-themed waves-colors ${checkPathActive([props.item.href]) && "menu-active"
            }`}
        >
          <i className={props.item.icon}></i>
          <span className="nav-link-text" data-i18n={props.item.i18n}>
            {props.item.name}
          </span>
        </Link>
      ) : (
        <a
          onClick={onClick(props.item)}
          href="#"
          title={props.item.name}
          data-filter-tags={props.item.name + " " + props.item.filter}
          className={`waves-effect waves-themed ${checkPathActive([window.location.pathname]) && "menu-active"
            }`}
        >
          <i className={props.item.icon}></i>
          <span className="nav-link-text" data-i18n={props.item.i18n}>
            {props.item.name}
          </span>
          <b className="collapse-sign">
            {props.item.open ? (
              <em className="fal fa-angle-down"></em>
            ) : (
              <em className="fal fa-angle-up"></em>
            )}
          </b>
        </a>
      )}
      {props.item.menus && props.item.menus.length ? (
        <Collapse
          elementType="ul"
          isOpen={props.item.open}
          collapseHeight="0px"
          transition={`height 290ms cubic-bezier(.4, 0, .2, 1)`}
        >
          {props.item.menus.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  onClick={onClick(item)}
                  to={item.href}
                  title={item.name}
                  data-filter-tags={item.name + " " + item.filter}
                  className={`waves-effect waves-themed ${checkPathActive([window.location.pathname]) && "menu-active"
                    }`}
                >
                  <span className="nav-link-text" data-i18n={item.i18n}>
                    {item.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </Collapse>
      ) : null}
    </li>
  );
}

export default connect(
  (state) => {
    return {
      MenuHighlight: state.ttHanhChinh && state.ttHanhChinh.MenuHighlight,
    };
  },
  {
    updateData: actionTtHanhChinh.updateData,
  }
)(index);
