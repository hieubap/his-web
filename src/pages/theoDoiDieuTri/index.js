import React from "react";
import { Route } from "react-router-dom";
import { Main } from "./styled";
import { theoDoiDieuTriPages } from "pages/constants";

const TheoDoiDieuTriPages = (props) => {
  return (
    <Main>
      <div className={"app-contain"}>
        {Object.keys(theoDoiDieuTriPages).map((key) => (
          <Route
            key={key}
            path={theoDoiDieuTriPages[key].path}
            component={theoDoiDieuTriPages[key].component}
            exact={theoDoiDieuTriPages[key].exact}
          />
        ))}
      </div>
    </Main>
  );
};

export default TheoDoiDieuTriPages;
