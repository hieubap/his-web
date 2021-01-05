import React from "react";
import { Main } from "./styled";
import MedicalRecord from "components/medical-record";

const ServivalIndex = () => {
  return (
    <Main>
      <div className="layout-body">
        <div className="layout-middle">
          <MedicalRecord />
        </div>
      </div>
    </Main>
  );
};

export default ServivalIndex;
