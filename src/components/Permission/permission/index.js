import React from "react";
import { Main } from "./styled";
import PermissionList from "../components/PermissionList";

const Permission = () => {
 
  return (
    <Main>
      <div className="layout-body">
        <div className="layout-middle">
          <PermissionList />
        </div>
      </div>
    </Main>
  );
};


export default Permission;
