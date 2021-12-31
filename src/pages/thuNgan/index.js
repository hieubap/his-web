import React from "react";
import { Route } from "react-router-dom";
import { pageThuNgan } from "pages/constants";

const ThuNganPages = (props) => {
  return (
    <div className={"app-contain"}>
      {Object.keys(pageThuNgan).map((key) => (
        <Route
          key={key}
          path={pageThuNgan[key].path}
          component={pageThuNgan[key].component}
          exact={pageThuNgan[key].exact}
        />
      ))}
    </div>
  );
};

export default ThuNganPages;
