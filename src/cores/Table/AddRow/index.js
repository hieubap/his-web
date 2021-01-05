import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import { Main } from "./styled";
import Block from "components/Config/Block";
import { Button } from "antd";
import { convert } from "components/File/constants";
import { combineFields } from "utils/editor-utils";

const AddRow = (props) => {
  const {
    rows,
    cols,
    keysHadConfig,
    localComponents,
    colSelected,
    fieldName,
    handleUpdateColBox,
    formId,
    mode,
    component,
    form,
    formChange,
    valuesHIS,
  } = props;
  const [resources, setResources] = useState([]);
  const [localValue, setLocalValue] = useState([]);
  const [currentKey, setCurrentKey] = useState("");
  const [funcObj, setFuncObj] = useState({});
  const prevValuesRef = useRef();
  const currentKeyRef = useRef();

  useEffect(() => {
    prevValuesRef.current = localValue;
    currentKeyRef.current = currentKey;
  });

  useEffect(() => {
    const formChangeKeys = Object.keys(formChange).filter(
      (key) => key.split("_")[0] === fieldName
    );
    const obj = formChangeKeys.reduce(
      (res, key) => ({
        ...res,
        [key]: setFormKey(key),
      }),
      {}
    );

    setFuncObj(obj);
  }, [formChange]);

  useEffect(() => {
    const tableValue = form[fieldName] ? form[fieldName] : [];

    if (tableValue.length < 1 && resources.length < 1) {
      handleAddRow();
    } else {
      if (tableValue.length > 0) {
        const vCombine = tableValue.map((item, index) => ({
          ...combineFields(item, {}, fieldName),
          index,
          key: index,
          takeMe: true,
        }));

        const rowCopy = rows.find((r) => r.rowKey);
        const arr = tableValue.map((item, index) => ({
          mainKey: rowCopy.key,
          key: index,
        }));

        setLocalValue(vCombine);
        setResources(arr);
      }
    }
  }, [form]);

  const handleAddRow = (key) => {
    const rowCopy = rows.find((r) => r.rowKey);
    if (rowCopy) {
      const obj = { mainKey: rowCopy.key, key: key || moment().valueOf() };
      const arr = [...resources];

      arr.push(obj);
      setResources(arr);
    }
  };

  const setFormKey = (key) => (value) => {
    const prevValues = prevValuesRef.current;
    const focusKey = currentKeyRef.current;
    let obj = prevValues.find((item) => item.key === focusKey);
    let newForm = prevValues;

    if (!obj) {
      const newValue = { key: focusKey, [key]: value };
      newForm.push(newValue);
    } else {
      const newValue = { ...obj, [key]: value };
      newForm = prevValues.map((item) =>
        item.key === focusKey ? newValue : item
      );
    }

    setLocalValue(newForm);
    formChange[fieldName](newForm.map((item) => convert(item)[fieldName]));
  };

  const focusRow = (row) => () => {
    setCurrentKey(row.key);
  };

  return (
    <Main>
      <div className={"table-container"}>
        <table>
          <tbody>
            {rows
              .filter((row) => !row.rowKey)
              .map((row) => (
                <tr key={row.key}>
                  {cols.map((col) => {
                    const boxKey = `${component.key}_${row.key}_${col.key}`;
                    const com = localComponents.find(
                      (c) => c.parent === boxKey
                    );
                    const config = keysHadConfig ? keysHadConfig[boxKey] : null;

                    if (config && config.hide) {
                      return null;
                    }

                    return (
                      <td
                        key={col.key}
                        className={
                          colSelected.includes(boxKey) && mode === "config"
                            ? "col-selected"
                            : ""
                        }
                        style={{ width: col.width + "px" }}
                        colSpan={config ? config.colSpan : ""}
                        rowSpan={config ? config.rowSpan : ""}
                      >
                        <div className={"in-side-col"}>
                          <Block
                            item={{ key: boxKey }}
                            mode={mode}
                            updateComponents={handleUpdateColBox}
                            component={com}
                            formId={formId}
                            values={form}
                            formChange={formChange}
                            key={boxKey}
                          />
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}

            {resources.map((row) => (
              <tr key={row.key} onMouseEnter={focusRow(row)}>
                {cols.map((col) => {
                  const boxKey = `${component.key}_${row.mainKey}_${col.key}`;
                  const com = localComponents.find((c) => c.parent === boxKey);
                  const config = keysHadConfig ? keysHadConfig[boxKey] : null;

                  const rowValue = localValue.find(
                    (item) => item.key === row.key
                  );

                  if (config && config.hide) {
                    return null;
                  }

                  return (
                    <td
                      key={col.key}
                      className={
                        colSelected.includes(boxKey) && mode === "config"
                          ? "col-selected"
                          : ""
                      }
                      style={{ width: col.width + "px" }}
                      colSpan={config ? config.colSpan : ""}
                      rowSpan={config ? config.rowSpan : ""}
                    >
                      <div className={"in-side-col"}>
                        <Block
                          item={{ key: boxKey }}
                          mode={mode}
                          updateComponents={handleUpdateColBox}
                          component={com}
                          formId={formId}
                          values={rowValue}
                          valuesHIS={valuesHIS}
                          formChange={funcObj}
                          key={boxKey}
                        />
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mode === "editing" && (
        <Button
          className={"plus-btn"}
          icon={"plus"}
          size={"small"}
          onClick={handleAddRow}
        />
      )}
    </Main>
  );
};

export default AddRow;
