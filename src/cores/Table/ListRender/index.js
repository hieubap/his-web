import React, { useEffect, useRef, useState } from "react";
import T from "prop-types";
import { Main } from "./styled";
import Block from "components/Config/Block";
import Cell from "./Cell";
import { ylenh } from "mokup";

const ListRender = (props) => {
  const {
    form,
    rows,
    cols,
    keysHadConfig,
    localComponents,
    valuesHIS,
    onChange,
    mode,
    formId,
    component,
  } = props;
  const headers = rows.filter((item) => item.isHeader);
  const bottom = rows.filter((item) => item.fixed);

  const [values, setValues] = useState([]);
  const [sources, setSources] = useState([]);

  const prevValuesRef = useRef();
  const prevSourcesRef = useRef();

  useEffect(() => {
    prevValuesRef.current = values;
    prevSourcesRef.current = sources;
  });

  useEffect(() => {
    setValues(ylenh);
    setSources(ylenh);
  }, [ylenh]);

  const handleChange = (rowIndex) => (key) => (res) => {
    const prevValues = prevValuesRef.current;
    const data = prevValues.map((item, index) =>
      index === rowIndex ? { ...item, [key]: res } : item
    );

    onChange(data);
    setValues(data);
  };

  return (
    <Main>
      <table>
        <tbody>
          {headers.map((row, index) => (
            <tr key={index}>
              {cols.map((col) => {
                const boxKey = `${component.key}_${row.key}_${col.key}`;
                const com = localComponents.find((c) => c.parent === boxKey);
                const config = keysHadConfig ? keysHadConfig[boxKey] : null;

                if (config && config.hide) {
                  return null;
                }

                return (
                  <td
                    key={boxKey}
                    style={{ width: col.width + "px" }}
                    colSpan={config ? config.colSpan : ""}
                    rowSpan={config ? config.rowSpan : ""}
                  >
                    <div className={"in-side-col"}>
                      <Block
                        key={boxKey}
                        item={{ key: boxKey }}
                        mode={mode}
                        component={com}
                        formId={formId}
                      />
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}

          {sources.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {cols.map((col, colIndex) => {
                if (colIndex === 0) {
                  return (
                    <td key={`${rowIndex}_${colIndex}`}>
                      <div>{rowIndex + 1}</div>
                    </td>
                  );
                }

                if (col.fixed) {
                  const row = rows[headers.length];
                  const boxKey = `${component.key}_${row.key}_${col.key}`;
                  const config = keysHadConfig ? keysHadConfig[boxKey] : null;
                  const width =
                    config && config.colSpan
                      ? config.totalWidth - 4
                      : col.width - 4;
                  const com = localComponents.find((c) => c.parent === boxKey);

                  return (
                    <td key={boxKey} width={col.width - 4}>
                      <div className={"in-side-col"}>
                        <Block
                          key={boxKey}
                          item={{ key: boxKey, width }}
                          mode={mode}
                          component={com}
                          formId={formId}
                          values={item}
                          valuesHIS={item}
                        />
                      </div>
                    </td>
                  );
                }

                return (
                  <Cell
                    key={`${rowIndex}_${col.key}`}
                    col={col}
                    mode={mode}
                    rowIndex={rowIndex}
                    formId={formId}
                    defaultValues={item}
                    onChange={handleChange(rowIndex)}
                  />
                );
              })}
            </tr>
          ))}

          {bottom.map((row, index) => (
            <tr key={index}>
              {cols.map((col) => {
                const boxKey = `${component.key}_${row.key}_${col.key}`;
                const com = localComponents.find((c) => c.parent === boxKey);
                const config = keysHadConfig ? keysHadConfig[boxKey] : null;
                const width =
                  config && config.colSpan
                    ? config.totalWidth - 4
                    : col.width - 4;

                if (config && config.hide) {
                  return null;
                }

                return (
                  <td
                    key={boxKey}
                    width={col.width - 4}
                    colSpan={config ? config.colSpan : ""}
                    rowSpan={config ? config.rowSpan : ""}
                  >
                    <div className={"in-side-col"}>
                      <Block
                        key={boxKey}
                        item={{ key: boxKey, width }}
                        mode={mode}
                        component={com}
                        formId={formId}
                        values={form}
                        valuesHIS={valuesHIS}
                      />
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </Main>
  );
};

ListRender.defaultProps = {
  rows: [],
  cols: [],
};

ListRender.propTypes = {
  rows: T.array,
  cols: T.array,
};

export default ListRender;
