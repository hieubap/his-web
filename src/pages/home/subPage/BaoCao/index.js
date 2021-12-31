import React, { useEffect } from "react";
import { ListBaoCao } from "../../layout/configData";
import Template from "../Template";

const SubPage = (props) => {
  return (
    <Template
      title={"Báo cáo"}
      listFunctions={ListBaoCao}
      bgPageFunc={require("assets/images/pagehome/bgBaoCao.png")}
      icon={require("assets/images/pagehome/icBaoCao.png")}
    />
  );
};
export default SubPage;
