import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ListDanhMucXN } from "../../layout/configData";
import Template from "../Template";

const SubPage = (props) => {
  const {
    xnHuyetHocSinhHoa: { resetData: resetDataHHXN },
    layMauXN: { resetData: resetDataLayMauXN },
    nbDotDieuTri: { resetData: resetDatanbDotDieuTri },
  } = useDispatch();

  useEffect(() => {
    resetDataHHXN();
    resetDataLayMauXN();
    resetDatanbDotDieuTri();
  }, []);
  return (
    <Template
      title={"Xét nghiệm"}
      bgPageFunc={require("assets/images/pagehome/bgXetNghiem.png")}
      icon={require("assets/images/pagehome/icXetNghiem.png")}
      listFunctions={ListDanhMucXN}
    />
  );
};
export default SubPage;
