import React from "react";
import { Tabs } from "antd";
import { WrapperTab1, WrapperTab2 } from "./styled";

const { TabPane } = Tabs;

function MultiLevelTab({
  listPanel,
  defaultActiveKey,
  onChange,
  isBoxTabs = false,
  layerIds = [],
  ...rest
}) {
  const WrapperTabStyle = isBoxTabs ? WrapperTab2 : WrapperTab1;

  return (
    <WrapperTabStyle>
      <Tabs
        defaultActiveKey={defaultActiveKey || 0}
        onChange={onChange}
        {...rest}
      >
        {listPanel.map(({ render: PanelComponent, ...panel }, index) => {
          return (
            <TabPane tab={panel.title || ""} key={panel.key || index}>
              <PanelComponent layerId={layerIds[index]} />
            </TabPane>
          );
        })}
      </Tabs>
    </WrapperTabStyle>
  );
}

export default MultiLevelTab;
