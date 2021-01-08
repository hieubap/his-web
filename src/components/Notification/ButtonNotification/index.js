import React, { useEffect, useState } from "react";
import { Icon, Popover } from "antd";
import { Main } from "./styled";
import Notification from "components/Notification";
import { connect } from "react-redux";
import useInterval from "hook/useInterval";

const ButtonNotification = (props) => {
  const [state, _setState] = useState({
    SidebarDataClass: "closed-sidebar",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    props.showInAppNotification();
  }, []);
  useInterval(() => {
    props.showInAppNotification();
  }, 60000);

  const onShowNotification = (show) => (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setState({ showNotification: true });
  };
  console.log(props.windowWidth);
  return (
    <Main
      width={props.windowWidth}
      content={
        <Notification width={props.windowWidth} show={state.showNotification} />
      }
      trigger="click"
      // placement="bottomLeft"
      // arrowPointAtCenter={true}
      placement={props.windowWidth < 660 ? "top" : "bottomLeft"}
      // onVisibleChange={onShowNotification}
      // modifiers={{ arrow: { enabled: false, element: null } }}
    >
      <button
        onClick={onShowNotification(true)}
        type="button"
        className="p-0 mr-2 btn btn-link"
      >
        <span className="icon-wrapper icon-wrapper-alt rounded-circle">
          <span className="icon-wrapper-bg bg-primary"></span>
          <Icon
            type="bell"
            className="icon-anim-pulse ion-android-notifications"
            style={{ fontSize: 18, color: "#fff" }}
          />
          {props.totalUnread ? (
            <span className="badge badge-dot badge-dot-sm badge-danger">
              Notifications
            </span>
          ) : null}
        </span>
      </button>
    </Main>
  );
};

export default connect(
  (state) => {
    return {
      totalUnread: state.notification.totalUnread,
      windowWidth: state.application.width,
    };
  },
  ({ notification: { showInAppNotification } }) => ({
    showInAppNotification,
  })
)(ButtonNotification);