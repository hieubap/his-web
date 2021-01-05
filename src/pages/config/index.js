import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Spin, Card } from "antd";
import Properties from "components/Config/Properties";
import Config from "components/Config";
import Text from "components/EditorTool/Text";
import { Main } from "./styled";
import ToolBar from "./Toolbar";

const Layout = ({ getConfigById, config, updateConfigForm }) => {
  const [layoutType, setLayoutType] = useState("default");
  const [zoomValue, setZoomValue] = useState(100);

  const configRef = useRef(null);
  const propRef = useRef(null);
  const params = useParams();

  useEffect(() => {
    setZoomValue(layoutType === "default" ? 100 : 68);
  }, [layoutType]);

  useEffect(() => {
    if (params.formId) {
      getConfigById(params.formId);
    }
  }, [params.formId]);

  const handleSubmit = (formInfo = {}) => {
    if (params.formId) {
      const payload = {
        id: params.formId,
        ...configRef.current.collect(),
        properties: {
          ...propRef.current.collectProps(),
        },
        layoutType,
        formInfo: formInfo,
      };
      updateConfigForm(payload);
    }
  };

  return (
    <Main>
      <div className="layout-body">
        <div className="layout-middle">
          <ToolBar
            handleSubmit={handleSubmit}
            setLayoutType={setLayoutType}
            layoutType={layoutType}
            zoomValue={zoomValue}
            setZoomValue={setZoomValue}
          />

          <Spin spinning={config.loading}>
            <Config
              zoomValue={zoomValue / 100}
              ref={configRef}
              layoutType={layoutType}
              setLayoutType={setLayoutType}
            />
          </Spin>
        </div>
        <div className={"layout-right-side"}>
          <Text />

          <Card title={"Component props"} size={"small"} bordered={false}>
            <Properties ref={propRef} handleSubmit={handleSubmit} />
          </Card>
        </div>
      </div>
    </Main>
  );
};

const mapState = (state) => ({
  config: state.config,
});

const mapDispatch = ({ config: { getConfigById, updateConfigForm } }) => ({
  getConfigById,
  updateConfigForm,
});

export default connect(mapState, mapDispatch)(Layout);
