export const checkRole = (accessRoles, roles) => {
  if (!accessRoles || accessRoles.length < 1) {
    return true;
  }

  return (
    accessRoles.map((rA) => roles.includes(rA)).filter((b) => !b).length < 1
  );
};