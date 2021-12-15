import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { pages } from "./constants";
import NotificationRealtime from "components/NotificationRealtime";
import RouterWithPaths from "components/RouterWithPaths";
const Pages = (props) => {
  const isHiddenNoti = () =>
    !["/login", "/kiosk","/qms"].every((path) =>
      window.location.pathname.indexOf(path)
    );

  return (
    <div>
      {isHiddenNoti() ? null : <NotificationRealtime />}
      {/* <BrowserRouter> */}
        {Object.keys(pages).map((key) => (
          <RouterWithPaths
            key={key}
            path={pages[key].path}
            component={pages[key].component}
            exact={pages[key].exact}
            {...props}
          />
        ))}
      {/* </BrowserRouter> */}
    </div>
  );
};

export default Pages;
