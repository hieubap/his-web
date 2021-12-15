import React from "react";
import { Route } from "react-router-dom";
import { Main } from "./styled";
import { khoPages } from "pages/constants";

const KhoPages = (props) => {
  return (
    <Main>
      <div className={"app-contain"}>
        {Object.keys(khoPages).map((key) => (
          <Route
            key={key}
            path={khoPages[key].path}
            component={khoPages[key].component}
            exact={khoPages[key].exact}
          />
        ))}
      </div>
    </Main>
  );
};

export default KhoPages;
