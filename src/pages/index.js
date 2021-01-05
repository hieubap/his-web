import React from "react";
import { Route } from "react-router-dom";
import { pages } from "./constants";

const Pages = () => {
  return (
    <div>
      {Object.keys(pages).map(key => (
        <Route
          key={key}
          path={pages[key].path}
          component={pages[key].component}
          exact={pages[key].exact}
        />
      ))}
    </div>
  );
};

export default Pages;
