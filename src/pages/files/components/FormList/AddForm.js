import React, { useState, useRef } from "react";
import { Button } from "antd";
import SelectCom from "./SelectCom";
import { get } from "lodash";

const AddForm = ({ template, onAddFile, files }) => {
  const [state, _setState] = useState({
    onAddNew: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const selectRef = useRef(null);

  const openAddNew = () => {
    const inputRef = get(selectRef, "current.rcSelect.inputRef", {});

    if (inputRef.focus) {
      inputRef.click();
    }
    setState({
      onAddNew: true,
    });
  };

  const onBlur = () => {
    setState({
      onAddNew: false,
    });
  };

  return (
    <div className={"file-list-add"}>
      {state.onAddNew && (
        <SelectCom
          onBlur={onBlur}
          template={template}
          handleSelect={onAddFile}
          files={files}
          setOnAddNew={onBlur}
        />
      )}

      {!state.onAddNew && (
        <Button
          className={`file-list-add-btn`}
          block
          type={"dashed"}
          size={"small"}
          icon={"plus"}
          onClick={openAddNew}
        >
          {"Thêm phiếu"}
        </Button>
      )}
    </div>
  );
};

export default AddForm;
