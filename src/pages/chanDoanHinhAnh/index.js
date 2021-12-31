import React from "react";
import { Route } from "react-router-dom";
import { pageCDHA } from "pages/constants";

const ChanDoanHinhAnhPages = (props) => {
  return (
    <div className={"app-contain"}>
      {Object.keys(pageCDHA).map((key) => (
        <Route
          key={key}
          path={pageCDHA[key].path}
          component={pageCDHA[key].component}
          exact={pageCDHA[key].exact}
        />
      ))}
    </div>
  );
};

export default ChanDoanHinhAnhPages;
