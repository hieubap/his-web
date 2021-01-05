import React, { useRef, forwardRef, useImperativeHandle } from "react";
import T from "prop-types";
import DOMPurify from 'dompurify';
import { Main } from "./styled";

const TextEdit = forwardRef((props, ref) => {
  const {
    onChange,
    defaultValue,
    className,
    mode,
    textTransform,
    id,
    width,
    note,
    maxWidth,
  } = props;
  const mainRef = useRef(null);
  const textNode = useRef(null);

  useImperativeHandle(ref, () => ({
    node: mainRef.current,
    textNode: textNode.current,
  }));

  const emitChange = () => {
    onChange(textNode.current.innerHTML);
  };

  let style = { textTransform };
  if (width) style.width = width + "px";
  if (maxWidth) {
    style.maxWidth = maxWidth + "px";
  }
  return (
    <Main ref={mainRef} className={className}>
      <div
        id={id}
        className={"edit-contain"}
        contentEditable={mode === "config"}
        suppressContentEditableWarning={true}
        ref={textNode}
        onInput={emitChange}
        onBlur={emitChange}
        style={style}
        disabled
        title={note}
        dangerouslySetInnerHTML={{ __html : DOMPurify.sanitize(defaultValue) }}
      />
    </Main>
  );
});

TextEdit.defaultProps = {
  className: "",
  defaultValue: "",
  mode: "",
  disabled: false,
  onChange: () => {},
};

TextEdit.propTypes = {
  onChange: T.func,
  disabled: T.bool,
  defaultValue: T.string,
  className: T.string,
  mode: T.string,
};

export default TextEdit;
