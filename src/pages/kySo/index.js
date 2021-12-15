import React from "react";
import { Route } from "react-router-dom";
import { Main } from "./styled";
import { kySoPages } from "pages/constants";

const KySoPages = (props) => {
  return (
    <Main>
      <div className={"app-contain"}>
        {Object.keys(kySoPages).map((key) => (
          <Route
            key={key}
            path={kySoPages[key].path}
            component={kySoPages[key].component}
            exact={kySoPages[key].exact}
          />
        ))}
      </div>
    </Main>
  );
};

export default KySoPages;
