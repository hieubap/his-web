import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactJson from "react-json-view";
import { Modal } from "antd";
const ReduxViewer = ({}, ref) => {
  const [state, _setState] = useState({
    show: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const model = useSelector((state) => state || {});

  useImperativeHandle(ref, () => ({
    show: () => {
      setState({ show: true });
    },
  }));
  return (
    <Modal
      visible={state.show}
      onCancel={() => {
        setState({ show: false });
      }}
      onOk={() => {
        setState({ show: false });
      }}
    >
      {state.show && (
        <ReactJson
          src={model}
          collapsed={true}
          style={{ maxHeight: "calc(100vh - 300px)", overflow: "auto" }}
        />
      )}
    </Modal>
  );
};

export default forwardRef(ReduxViewer);
