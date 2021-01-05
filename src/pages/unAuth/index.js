import React from 'react';
import { Icon } from 'antd';
import { Main } from './styled';

const UnAuth = () => {
  return (
    <Main>
      <Icon type="warning" style={{ fontSize: 240, color: '#faad14' }} />
      <span className={'un-auth-mess'}>{'Bạn không được phép truy cập màn hình này!'}</span>
    </Main>
  )
};

export default UnAuth;
