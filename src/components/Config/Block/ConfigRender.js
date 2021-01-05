import React, { forwardRef } from "react";
import Components from "components/Config/Components";
import { Main } from "./styled";
import render from "./render";

const ConfigRender = (
  {
    comRef,
    item,
    verticalLine,
    updateContent,
    values,
    config,
    focusComponent,
    formId,
    formChange,
    mode,
    component,
    children,
  },
  ref
) => {
  return (
    <Main style={{ width: item.width || "unset" }}>
      {component.type ? (
        render(component.type)({
          component,
          ref: comRef,
          verticalLine,
          focusing: component.key === config.component.key,
          mode,
          blockWidth: item.width,
          updateContent,
          block: item,
          formId,
        })
      ) : (
        <Components block={item} />
      )}
      {children}
    </Main>
  );
};

export default forwardRef(ConfigRender); 
