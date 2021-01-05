import React, { useState } from 'react';
import T from 'prop-types';
import { connect } from "react-redux";
import { Dropdown, Icon, Menu, Button } from 'antd';
import GenerateTable from 'cores/Table/Generate';
import { Main } from './styled';
import list from 'cores';
import moment from 'moment';

const menu = (addItem, component) => (
  <Menu>
    {component.key && (
      <Menu.Item onClick={addItem(component.type, component)}>
        <Icon type={'snippets'} />
        <span>
          {'Paste component'}
        </span>
      </Menu.Item>
    )}
    
    {Object.keys(list).map(key => (
      <Menu.Item key={key} onClick={addItem(key)}>
        <Icon type={list[key].icon} />
        <span>
          {list[key].name}
        </span>
      </Menu.Item>
    ))}
  </Menu>
);

const Components = ({ addComponent, block, addTypeComponent, control }) => {
  const [showTableConfig, setShowTableConfig] = useState(false);

  const addItem = (key, info) => () => {
    if (key === 'table') {
      setShowTableConfig(true);
    } else if (block.key) {
      addCom(key, info);
    }
  };

  const addCom = (key, info) => {
    const obj = {
      key: moment().valueOf(),
      lineKey: block.parent,
      parent: block.key,
      width: block.width,
      name: list[key].name,
      type: key,
      content: '',
      value: info ? info.value : '',
      props: info ? info.props : list[key].defaultProps,
    };
    addComponent(obj);
  };

  const addTable = (props) => {
    const KEY = 'table';

    const obj = {
      key: moment().valueOf(),
      lineKey: block.parent,
      parent: block.key,
      width: block.width,
      name: list[KEY].name,
      type: KEY,
      content: '',
      value: '',
      props
    };
    addComponent(obj);
  };

  const cancelGenerateTable = () => {
    setShowTableConfig(false);
  };
  
  return (
    <Main>
      <Dropdown overlay={menu(addItem, control.component)} trigger={['click']}>
        <Button size={'small'} icon={'import'} />
      </Dropdown>

      <GenerateTable
        visible={showTableConfig}
        close={cancelGenerateTable}
        onOke={addTable}
      />
    </Main>
  )
};

Components.defaultProps = {
  block: {},
};

Components.propTypes = {
  block: T.shape({}),
};

const mapState = state => ({
  config: state.config,
  control: state.control,
});

const mapDispatch = ({ config: { addComponent, addTypeComponent } }) => ({ addComponent, addTypeComponent });

export default connect(mapState, mapDispatch)(Components);
