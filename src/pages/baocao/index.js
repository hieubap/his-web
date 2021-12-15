import React from "react";
import { Route } from "react-router-dom";
import { Main } from "./styled";
import { baoCaoPages } from "pages/constants";

const BaoCaoPages = (props) => {
  return (
    <Main>
      <div className={"app-contain"}>
        {Object.keys(baoCaoPages).map((key) => (
          <Route
            key={key}
            path={baoCaoPages[key].path}
            component={baoCaoPages[key].component}
            exact={baoCaoPages[key].exact}
          />
        ))}
      </div>
    </Main>
  );
};

export default BaoCaoPages;
