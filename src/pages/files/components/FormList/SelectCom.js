import React, { useEffect, useRef } from "react";
import { Select } from "antd";
import { get } from "lodash";
import { checkAvailableToAdd } from "./constants";

const SelectCom = ({ handleSelect, onBlur, template, files, setOnAddNew }) => {
  const selectRef = useRef(null);

  useEffect(() => {
    const inputRef = get(selectRef, "current.rcSelect.inputRef", {});

    if (inputRef.focus) {
      inputRef.click();
    }
  }, []);

  const onSelectItem = (value, obj) => {
    handleSelect(value, obj);
    setOnAddNew(false);
  };

  return (
    <Select
      autoFocus
      ref={selectRef}
      showSearch
      allowClear
      showArrow={false}
      size={"small"}
      style={{ width: "100%" }}
      onSelect={onSelectItem}
      placeholder={"Chọn phiếu thêm"}
      onBlur={onBlur}
      className={`file-list-add-select`}
    >
      {template.map((item) => {
        if (!item.active) return null;
        return (
          <Select.Option
            disabled={!checkAvailableToAdd(item, files)}
            key={item.bieuMau.ma}
            value={item.bieuMau.ten}
            data={item}
          >
            {item.bieuMau.ten}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default SelectCom;
