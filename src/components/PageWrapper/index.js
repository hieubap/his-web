import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { checkRole } from 'app/Sidebar/constant';

const UnAuth = React.lazy(() => import("pages/unAuth"));

const PageWrapper = ({ auth, children, accessRoles }) => {

  const roles = get(auth, 'auth.authorities', []);

  if (checkRole(accessRoles, roles)) {
    return children;
  }

  return <UnAuth />;
};

const mapState = (state) => ({
  auth: state.auth
});

export default connect(mapState)(PageWrapper);
