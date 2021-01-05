import React, { Suspense } from "react";

import PageWrapper from "components/PageWrapper";

// const VitalSignsCategory = React.lazy(() => import("./categories/vital-signs"));

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
  // vitalSignsCategory: {
  //   component: Page(VitalSignsCategory, []),
  //   accessRoles: [],
  //   path: "/servival-index",
  //   exact: false,
  // },
};

export { pages };
