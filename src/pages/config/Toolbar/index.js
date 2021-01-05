import React from "react";
import { Main } from "./styled";
import FormInfo from 'components/Config/FormInfo';


const Toolbar = (props) => {
  const { handleSubmit, setLayoutType, layoutType, setZoomValue, zoomValue } = props;

  return (
    <Main>
      <div className="toolbar">
        <FormInfo
          handleSubmit={handleSubmit}
          setLayoutType={setLayoutType}
          layoutType={layoutType}
          setZoomValue={setZoomValue}
          zoomValue={zoomValue}
        />
      </div>
    </Main>
  );
};

export default Toolbar;
