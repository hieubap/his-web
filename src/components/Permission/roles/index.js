import React, { useEffect } from "react";
import { Main } from "./styled";
import RoleList from "../components/RoleList";

const Role = () => {
  useEffect(() => {}, []);

  return (
    <Main>
      <div className="layout-body">
        <div className="layout-middle">
          <h2 className="title-list">{}</h2>
          <RoleList />
        </div>
      </div>
    </Main>
  );
};



export default Role
