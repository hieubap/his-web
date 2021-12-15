import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'antd';
import './style.scss';
import 'antd/dist/antd.css';

function AlertDialogSlide({ cbFn, title, content, btnOk, btnCancel, cbCancal, buttonCancel }) {
  const [open, setOpen] = useState(true)
  const handleClose = (type) => {
    setOpen(false)
    cbFn(type)
  }
  return (
    <Modal
      className="confirm-modal"
      width={550}
      title={title}
      visible={open}
      onCancel={() => handleClose(2)}
      footer={[
        <>
          <Button onClick={() => handleClose(1)} key="submit" type="primary">{btnOk}</Button>
          {buttonCancel ?
            <Button onClick={cbCancal} type="danger" key="back">{btnCancel}</Button> :
            <Button onClick={() => handleClose(2)} type="danger" key="back">{btnCancel}</Button>
          }
        </>
      ]} >
      {content}

    </Modal>
  )
}

export default AlertDialogSlide
