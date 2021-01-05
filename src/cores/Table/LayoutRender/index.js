import React, { useEffect } from "react";
import T from "prop-types";
import { Main } from "./styled";
import Block from "components/Config/Block";

const LayoutRender = (props) => {
  const {
    rows,
    cols,
    keysHadConfig,
    localComponents,
    handleColClick,
    colSelected,
    valuesHIS,
    refArray,
    verticalLine,
    handleUpdateColBox,
    formId,
    mode,
    component,
    form,
    formChange,
  } = props;

  useEffect(() => {}, [form]);

  return (
    <Main>
      <table>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {cols.map((col, idx) => {
                const boxKey = `${component.key}_${row.key}_${col.key}`;
                const com = localComponents.find((c) => c.parent === boxKey);
                const config = keysHadConfig ? keysHadConfig[boxKey] : null;

                if (config && config.hide) {
                  return null;
                }

                return (
                  <td
                    key={idx}
                    style={{ width: col.width + "px" }}
                    onClick={handleColClick(boxKey)}
                    className={
                      colSelected.includes(boxKey) && mode === "config"
                        ? "col-selected"
                        : ""
                    }
                    colSpan={config ? config.colSpan : ""}
                    rowSpan={config ? config.rowSpan : ""}
                  >
                    <div className={"in-side-col"}>
                      <Block
                        key={boxKey}
                        ref={(ref) => {
                          refArray.current[`block_${index}_${idx}`] = ref;
                        }}
                        verticalLine={verticalLine}
                        item={{ key: boxKey }}
                        mode={mode}
                        updateComponents={handleUpdateColBox}
                        component={com}
                        formId={formId}
                        values={form}
                        valuesHIS={valuesHIS}
                        formChange={formChange}
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

LayoutRender.defaultProps = {
  rows: [],
  cols: [],
};

LayoutRender.propTypes = {
  rows: T.array,
  cols: T.array,
};

export default LayoutRender;
