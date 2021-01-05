import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs } from 'antd';
import FormProperties from 'components/Config/FormProperties';
import Documents from 'pages/documents';
import { Main } from './styled';

const Switch = () => {
  const [tab, setTab] = useState('1');
  const params = useParams();
  
  useEffect(() => {
    if (params.formId) {
      handleSetTab('2');
    }
  }, []);
  
  const handleSetTab = (key) => {
    setTab(key);
  };
  
  return (
    <Main>
      <Tabs defaultActiveKey={tab} activeKey={tab} onChange={handleSetTab}>
        <Tabs.TabPane tab={'Documents'} key={'1'}>
          <Documents />
        </Tabs.TabPane>
  
        <Tabs.TabPane tab={'Detail'} key={'2'}>
          <FormProperties />
        </Tabs.TabPane>
      </Tabs>
    </Main>
  )
};

export default Switch;
