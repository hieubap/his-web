import React, { useEffect } from "react";
import { Main } from "./styled";
import DrugDistributionPermission from "components/Permission/permission";

const DrugDistributions = () => {
  useEffect(() => {}, []);

  return (
    <Main>
      <DrugDistributionPermission/>
    </Main>
  );
};

export default DrugDistributions;
