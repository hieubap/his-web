import React from "react";
import { Route } from "react-router-dom";
import { xetNghiemPages } from "pages/constants";

const XetNghiemPages = (props) => {
  return (
    <div className={"app-contain"}>
      {Object.keys(xetNghiemPages).map((key) => (
        <Route
          key={key}
          path={xetNghiemPages[key].path}
          component={xetNghiemPages[key].component}
          exact={xetNghiemPages[key].exact}
        />
      ))}
    </div>
  );
};

export default XetNghiemPages;
