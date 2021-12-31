import React from "react";
import { Route } from "react-router-dom";
import { pageKiosk } from "pages/constants";

const KiosPages = (props) => {
  return (
      <div className={"app-contain"}>
        {Object.keys(pageKiosk).map((key) => (
          <Route
            key={key}
            path={pageKiosk[key].path}
            component={pageKiosk[key].component}
            exact={pageKiosk[key].exact}
          />
        ))}
      </div>
  );
};

export default KiosPages;