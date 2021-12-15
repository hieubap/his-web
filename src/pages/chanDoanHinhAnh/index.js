import React from "react";
import { Route } from "react-router-dom";
import { chanDoanHinhAnhPages } from "pages/constants";

const ChanDoanHinhAnhPages = (props) => {
  return (
    <div className={"app-contain"}>
      {Object.keys(chanDoanHinhAnhPages).map((key) => (
        <Route
          key={key}
          path={chanDoanHinhAnhPages[key].path}
          component={chanDoanHinhAnhPages[key].component}
          exact={chanDoanHinhAnhPages[key].exact}
        />
      ))}
    </div>
  );
};

export default ChanDoanHinhAnhPages;
