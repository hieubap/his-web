import React from "react";
import { Tabs } from "antd";
import { Main , Main1} from "./styled";

const { TabPane } = Tabs;

function MultiLevelTab(props) {
  const { listPanel, defaultActiveKey, onChange, isBoxTabs = false ,...rest } = props;

  if(isBoxTabs){
    return (
      <Main1>
        <Tabs
          defaultActiveKey={defaultActiveKey || 0}
          onChange={onChange}
          {...rest}
        >
          {listPanel.map((panel, index) => {
            return (
              <TabPane tab={panel.title || ""} key={panel.key || index}>
                {panel.render()}
              </TabPane>
            );
          })}
        </Tabs>
      </Main1>
    );
  
  }
  return (
    <Main>
      <Tabs
        defaultActiveKey={defaultActiveKey || 0}
        onChange={onChange}
        {...rest}
      >
        {listPanel.map((panel, index) => {
          return (
            <TabPane tab={panel.title || ""} key={panel.key || index}>
              {panel.render()}
            </TabPane>
          );
        })}
      </Tabs>
    </Main>
  );
}

export default MultiLevelTab;
