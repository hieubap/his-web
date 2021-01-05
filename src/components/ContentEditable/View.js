import React from "react";
import T from "prop-types";
import renderHTML from "react-render-html";
import { Main } from "./styled";
import Render from "./render";

const EditableView = ({
  labelWidth,
  focus,
  type,
  htmlValue,
  handleKeyDown,
  width,
  disabled,
  extendChild,
  lines,
  editWidth,
  emitChange,
  textNode,
  updateLineNumber,
  extentLine,
  border,
  font,
  contentAlign,
}) => {
  return (
    <Main
      disabled={disabled}
      border={border}
      offsetMark={font.offsetMark || 21}
    >
      {extendChild && <div className="extent-child">{extendChild}</div>}
      <span
        className="mark-span"
        style={{ width: editWidth || "unset" }}
        onClick={() => {
          if (focus) {
            focus(true);
          }
        }}
      />
      {type === "multiple" &&
        lines.map((item, index) => (
          <span
            key={item}
            className="mark-span"
            style={{
              width: width || 24,
              left: -labelWidth,
              top: item * (font.offsetMark || 21) + index * 3,
            }}
            onClick={() => {
              if (focus) {
                focus(true);
              }
            }}
          />
        ))}

      {htmlValue ? (
        <Render
          htmlValue={htmlValue}
          updateLineNumber={updateLineNumber}
          emitChange={emitChange}
          disabled={disabled}
          handleKeyDown={handleKeyDown}
          type={type}
          textNode={textNode}
          extentLine={extentLine}
          font={font}
          contentAlign={contentAlign}
        />
      ) : (
        <span
          className="edit-available editing-content"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
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
          {renderHTML(`${htmlValue || ""}` || "")}
        </span>
      )}
    </Main>
  );
};

EditableView.defaultProps = {
  font: {},
};

EditableView.propTypes = {
  font: T.shape({}),
};

export default EditableView;
