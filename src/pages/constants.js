import React, { Suspense } from "react";

import PageWrapper from "components/PageWrapper";

const Reception = React.lazy(() => import("./reception"));
const RegisterService = React.lazy(() => import("./register-service"));

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
  registerService: {
    component: Page(RegisterService, []),
    accessRoles: [],
    path: "/register-service",
    exact: true
  },
  reception: {
    component: Page(Reception, []),
    accessRoles: [],
    path: "/",
    exact: true,
  }
};

export { pages };
