import React from "react";
import { Route } from "react-router-dom";
import { kiosPages } from "pages/constants";

const KiosPages = (props) => {
  return (
      <div className={"app-contain"}>
        {Object.keys(kiosPages).map((key) => (
          <Route
            key={key}
            path={kiosPages[key].path}
            component={kiosPages[key].component}
            exact={kiosPages[key].exact}
          />
        ))}
      </div>
  );
};

export default KiosPages;