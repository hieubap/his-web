import React, { useEffect, memo, useState } from "react";
import T from "prop-types";
import renderHTML from "react-render-html";

const Render = (props) => {
  const [defaultValue, setDefaultValue] = useState("");
  const {
    editWidth,
    type,
    emitChange,
    disabled,
    handleKeyDown,
    htmlValue,
    extentLine,
    updateLineNumber,
    textNode,
    font,
    contentAlign,
  } = props;

  useEffect(() => {
    setDefaultValue(htmlValue);
    setTimeout(() => {
      if (textNode.current) {
        const lineNumber = Math.round(
          textNode.current.offsetHeight / font.offsetHeight
        );
        const lineDefault = extentLine || 0;
        const current = lineNumber > lineDefault ? lineNumber : lineDefault;
        updateLineNumber(current - 1);
        textNode.current.focus();
      }
    }, 500);
  }, []);

  return (
    <span
      className="edit-available editing-content"
      style={{
        width: editWidth || "unset",
        display: type === "single" ? "inline-block" : "",
        whiteSpace: type === "single" ? "nowrap" : "",
        marginLeft: type === "single" ? "" : 1,
        textAlign: contentAlign || "left",
      }}
      ref={textNode}
      onInput={emitChange}
      contentEditable={!disabled}
      suppressContentEditableWarning
      onKeyDown={handleKeyDown}
    >
      {renderHTML(`${defaultValue || ""}` || "")}
    </span>
  );
};

Render.propTypes = {
  editWidth: T.number,
  type: T.string,
  emitChange: T.func,
  disabled: T.bool,
  handleKeyDown: T.func,
  htmlValue: T.oneOfType([T.string, T.number]),
};

export default memo(Render);
