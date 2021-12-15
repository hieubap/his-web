import React from "react";
import { Route } from "react-router-dom";
import { thuNganPages } from "pages/constants";

const ThuNganPages = (props) => {
  return (
    <div className={"app-contain"}>
      {Object.keys(thuNganPages).map((key) => (
        <Route
          key={key}
          path={thuNganPages[key].path}
          component={thuNganPages[key].component}
          exact={thuNganPages[key].exact}
        />
      ))}
    </div>
  );
};

export default ThuNganPages;
