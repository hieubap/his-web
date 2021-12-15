import React from "react";
import { Route } from "react-router-dom";
import { qmsPages } from "pages/constants";

const QmsPages = (props) => {
  console.log("qms",qmsPages)
  return (
      <div className={"app-contain"}>
        {Object.keys(qmsPages).map((key) => (
          <Route
            key={key}
            path={qmsPages[key].path}
            component={qmsPages[key].component}
            exact={qmsPages[key].exact}
          />
        ))}
      </div>
  );
};

export default QmsPages;