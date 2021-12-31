import React, { forwardRef, useImperativeHandle, useState } from "react";
import { ContentTable, Main, Modal } from "./styled";
const DanhSachHangHoa = ({ children, title, ...props }, ref) => {
  const [state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((_state) => ({
      ..._state,
      ...data,
    }));
  };

  useImperativeHandle(ref, () => ({
    show: () => {
      setState({
        show: true,
      });
    },
    hide: () => {
      setState({
        show: false,
      });
    },
  }));

  return (
    <Modal
      visible={state.show}
      onCancel={() => setState({ show: false })}
      footer={null}
      title={
        <div className="title">
          <h2>
            <b>{title}</b>
          </h2>
        </div>
      }
    >
      <Main>
        <ContentTable>{children}</ContentTable>
      </Main>
    </Modal>
  );
};

export default forwardRef(DanhSachHangHoa);
