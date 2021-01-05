import React, { useEffect, useRef, useState } from "react";
import T from "prop-types";
import { Main } from "./styled";
import Block from "components/Config/Block";
import Cell from "./Cell";

const BlockRender = (props) => {
  const {
    rows,
    cols,
    components,
    keysHadConfig,
    mode,
    component,
    dataSource,
    onChange,
    defaultRows,
    disabled,
  } = props;
  const [values, setValues] = useState({});
  const [defaultValues, setDefaultValues] = useState({});
  const [formChange, setFormChange] = useState({});
  const [sources, setSources] = useState([]);

  const prevValuesRef = useRef();
  const prevSourcesRef = useRef();

  useEffect(() => {
    prevValuesRef.current = values;
    prevSourcesRef.current = sources;
  });

  useEffect(() => {
    const data = {};

    if (dataSource.length > 0) {
      setSources(dataSource);
      dataSource.forEach((item, index) => {
        cols.forEach((col) => {
          data[`${index}_${col.colKey}`] = item[col.colKey];
          setDefaultValues(data);
        });
      });
    } else {
      const defaultList = [];
      for (let i = 0; i < defaultRows; i++) {
        const obj = cols.reduce(
          (res, col) => ({
            ...res,
            [col.colKey]: "",
          }),
          {}
        );
        defaultList.push(obj);
      }
      setSources(defaultList);

      defaultList.forEach((item, index) => {
        cols.forEach((col) => {
          data[`${index}_${col.colKey}`] = item[col.colKey];
          setDefaultValues(data);
        });
      });
    }
  }, [dataSource]);

  const setFormKey = (key) => (value) => {
    const prevValues = prevValuesRef.current;
    const prevSources = prevSourcesRef.current;

    const newForm = { ...prevValues, [key]: value };
    setValues(newForm);

    const keySplit = key.split("_");

    const output = prevSources.map((item, index) =>
      index === parseInt(keySplit[0])
        ? {
            ...item,
            [keySplit[1]]: value,
          }
        : item
    );

    setSources(output);
    onChange(output);
  };

  useEffect(() => {
    const data = {};
    sources.forEach((item, index) => {
      cols.forEach((col) => {
        data[`${index}_${col.colKey}`] = item[col.colKey];
        setValues(data);
      });
    });
  }, [sources]);

  useEffect(() => {
    const obj = Object.keys(values).reduce(
      (result, key) => ({
        ...result,
        [key]: setFormKey(key),
      }),
      {}
    );

    setFormChange(obj);
  }, [values]);

  return (
    <Main>
      <table>
        <tbody>
          {rows.map((row, rowIndex) => {
            if (rowIndex === 0) {
              return (
                <tr key={rowIndex}>
                  {cols.map((col) => {
                    const boxKey = `${component.key}_${row.key}_${col.key}`;
                    const com = components.find((c) => c.parent === boxKey);
                    const config = keysHadConfig ? keysHadConfig[boxKey] : null;

                    if (config && config.hide) {
                      return null;
                    }

                    return (
                      <td key={col.key} style={{ width: col.width + "px" }}>
                        <div className={"in-side-col"}>
                          <Block
                            item={{ key: boxKey }}
                            mode={mode}
                            component={com}
                          />
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            }

            return null;
          })}

          {sources.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {cols.map((col) => (
                <Cell
                  key={`${rowIndex}_${col.key}`}
                  col={col}
                  mode={mode}
                  formChange={formChange}
                  defaultValues={defaultValues}
                  rowIndex={rowIndex}
                  disabled={!!disabled}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Main>
  );
};

BlockRender.defaultProps = {
  dataSource: [],
  onChange: () => {},
  defaultRows: 1,
};

BlockRender.propTypes = {
  dataSource: T.arrayOf(T.shape({})),
  onChange: T.func,
  defaultRows: T.number,
};

export default BlockRender;
