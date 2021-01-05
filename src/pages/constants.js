import React, { Suspense } from "react";

import PageWrapper from "components/PageWrapper";

const Reception = React.lazy(() => import("./reception"));

const Page = (Component, roles = []) => (props) => {
  return (
    <Suspense fallback={<div>{"loading..."}</div>}>
      <PageWrapper accessRoles={roles}>
        <Component {...props} />
      </PageWrapper>
    </Suspense>
  );
};


const pages = {
  reception: {
    component: Page(Reception, []),
    accessRoles: [],
    path: "/",
    exact: false,
  },
};

export { pages };
