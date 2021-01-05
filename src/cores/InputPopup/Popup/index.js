import React from 'react';
import T from 'prop-types';
import { Input, Modal, Button } from 'antd';
import { Main } from './styled';

const Popup = (props) => {
  const { visible, onClose } = props;

  return (
    <Modal
      title={'{vật tư} - {ngày}'}
      visible={visible}
      onCancel={onClose}
    >
      <Main>
        <div style={{ display: 'flex', width: 240 }}>
          <Button shape={'circle'} icon={'minus'} />
          <Input style={{ margin: '0 12px'}} />
          <Button shape={'circle'} icon={'plus'} />
        </div>
      </Main>
    </Modal>
  );
};

Popup.defaultProps = {
  visible: false,
  onClose: () => {},
};

Popup.propTypes = {
  visible: T.bool,
  onClose: T.func,
};

export default Popup;
