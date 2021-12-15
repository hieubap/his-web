import React from "react";
import { Route } from "react-router-dom";
import { Main } from "./styled";
import { therapyAdmin } from "pages/constants";

const Therapy = (props) => {
  return (
    <Main>
      <div className={"app-contain"}>
        {Object.keys(therapyAdmin).map((key) => (
          <Route
            key={key}
            path={therapyAdmin[key].path}
            component={therapyAdmin[key].component}
            exact={therapyAdmin[key].exact}
          />
        ))}
      </div>
    </Main>
  );
};

export default Therapy;