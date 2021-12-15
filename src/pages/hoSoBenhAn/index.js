import React from "react";
import { Route } from "react-router-dom";
import { Main } from "./styled";
import { hoSoBenhAnPages } from "pages/constants";

const HoSoBenhAnPages = (props) => {
  return (
    <Main>
      <div className={"app-contain"}>
        {Object.keys(hoSoBenhAnPages).map((key) => (
          <Route
            key={key}
            path={hoSoBenhAnPages[key].path}
            component={hoSoBenhAnPages[key].component}
            exact={hoSoBenhAnPages[key].exact}
          />
        ))}
      </div>
    </Main>
  );
};

export default HoSoBenhAnPages;
