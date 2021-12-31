import React from "react";
import { connect } from "react-redux";
import { get } from "lodash";
import { checkRole } from "app/Sidebar/constant";

const UnAuth = React.lazy(() => import("pages/unAuth"));

const AuthWrapper = ({ auth, children, accessRoles, isCheckRoute = false }) => {
  const roles = get(auth, "auth.authorities", []);
  const isSuperAdmin = roles.includes("ROLE_AdminISofH");

  if (checkRole(accessRoles, roles) || isSuperAdmin) {
    return children;
  }
  if(isCheckRoute) return <UnAuth />;

  return null;
};

const mapState = (state) => ({
  auth: state.auth,
});

export default connect(mapState)(AuthWrapper);
