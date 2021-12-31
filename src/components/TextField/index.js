import React, { useRef, useEffect, useState } from "react";
import parse from "html-react-parser";
import PropTypes from "prop-types";
import { Main } from "./styled";
import cloneDeep from "lodash/cloneDeep";

function TextField(props) {
  const [state, _setState] = useState({
    html: "",
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const refContentEditable = useRef(null);
  const refInput = useRef(null);
  const refTimeout = useRef(null);
  const {
    label,
    maxLine,
    maxLength,
    displayColon = true,
    html,
    disabled = false,
    nextInputByTabKey = "",
    spanId = "",
    afterText = "",
    classNameLabel,
    delayTyping = 1000,
    type = "",
    tab = false,
    ...rest
  } = props;

  const handleOnKeyUp = (e) => {
    if (type === "number") {
      if (
        (e.keyCode >= 48 && e.keyCode <= 57) ||
        (e.keyCode >= 96 && e.keyCode <= 105) ||
        e.which === 8 ||
        e.keyCode === 37 ||
        e.keyCode === 39
      ) {
      } else {
        e.preventDefault();
      }
    }

    const value = e.target.innerHTML;
    if (e.key === "Enter" || e.keyCode === 13) {
      const countLine = e.currentTarget.querySelectorAll(`br`).length + 1;
      if (maxLine === 1 || countLine > maxLine) {
        e.preventDefault();
      }
    }
    if (
      value.length >= maxLength &&
      e.keyCode != 8 &&
      e.keyCode != 37 &&
      e.keyCode != 39
    ) {
      e.preventDefault();
    }
  };
  const handleOnKeyDown = (e) => {
    if (e.keyCode === 9 && nextInputByTabKey.length > 0) {
      // khi giới hạn độ dài và dùng preventDefault không thể tabKey , điều kiện này để fix vấn đề đó
      document.getElementById(nextInputByTabKey).focus();
      e.preventDefault();
    }
    if (type === "number") {
      if (
        (e.keyCode >= 48 && e.keyCode <= 57) ||
        (e.keyCode >= 96 && e.keyCode <= 105) ||
        e.which === 8 ||
        e.keyCode === 37 ||
        e.keyCode === 39
      ) {
      } else {
        e.preventDefault();
      }
    }

    const value = e.target.innerHTML;
    if (e.key === "Enter" || e.keyCode === 13) {
      const countLine = e.currentTarget.querySelectorAll(`br`).length + 1;
      if (maxLine === 1 || countLine > maxLine) {
        e.preventDefault();
      }
    }
    if (
      value.length >= maxLength &&
      e.keyCode != 8 &&
      e.keyCode != 37 &&
      e.keyCode != 39
    ) {
      e.preventDefault();
    }
  };
  // const handleOnKeyDown = (e) => { // hàm cũ được đặt cho cả onKeyUp và onKeyDown
  //   if (type === "number") {
  //     if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || e.which === 8 || e.keyCode === 37 || e.keyCode === 39) {
  //     } else {
  //       e.preventDefault();
  //     }
  //   }

  //   const value = e.target.innerHTML;
  //   if (e.key === "Enter" || e.keyCode === 13) {
  //     const countLine = e.currentTarget.querySelectorAll(`br`).length + 1;
  //     if (maxLine === 1 || countLine > maxLine) {
  //       e.preventDefault();
  //     }
  //   }
  //   if (value.length >= maxLength && e.keyCode != 8 && e.keyCode != 37 && e.keyCode != 39) {
  //     if (e.keyCode === 9 && nextInputByTabKey.length > 0) { // khi giới hạn độ dài và dùng preventDefault không thể tabKey , điều kiện này để fix vấn đề đó
  //       document.getElementById(nextInputByTabKey).focus()
  //     }
  //     e.preventDefault();
  //   }
  // };

  useEffect(() => {
    refContentEditable.current.addEventListener("paste", handleActionPaste);

    return () =>
      refContentEditable.current.removeEventListener(
        "paste",
        handleActionPaste
      );
  }, []);

  const handleActionPaste = (e) => {
    let paste = (e.clipboardData || window.clipboardData).getData("text");
    const selection = window.getSelection();
    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(document.createTextNode(paste));
    selection.getRangeAt(0).collapse();
    e.preventDefault();
  };

  const setEndOfContenteditable = (contentEditableElement) => {
    var range, selection;
    if (document.createRange) {
      //Firefox, Chrome, Opera, Safari, IE 9+
      range = document.createRange(); //Create a range (a range is a like the selection but invisible)
      range.selectNodeContents(contentEditableElement); //Select the entire contents of the element with the range
      range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
      selection = window.getSelection(); //get the selection object (allows you to change selection)
      selection.removeAllRanges(); //remove any selections already made
      selection.addRange(range); //make the range you have just created the visible selection
    } else if (document.selection) {
      //IE 8 and lower
      range = document.body.createTextRange(); //Create a range (a range is a like the selection but invisible)
      range.moveToElementText(contentEditableElement); //Select the entire contents of the element with the range
      range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
      range.select(); //Select the range (make it the visible selection
    }
  };

  const onInput = (e) => {
    if (/<\/?[a-z][\s\S]*>/i.test(state.html)) {
      // check html là thẻ element
    } else {
      setEndOfContenteditable(refContentEditable.current); // khi setState caret(dấu focus) sẽ bị nhảy về đầu, hàm để hạn chế tình trạng này
    }
    if (refTimeout.current) {
      clearTimeout(refTimeout.current);
    }
    refTimeout.current = setTimeout(
      (value = "") => {
        refInput.current = value.replaceAll("&nbsp;", " ");
        props.onChange && props.onChange(refInput.current);
      },
      delayTyping,
      e.target.innerHTML
    );
  };
  const onClick = () => {
    try {
      let s = window.getSelection();
      let r = document.createRange();
      const p = refContentEditable.current;
      r.setStart(p, refContentEditable.current.innerHTML.length ? 1 : 0);
      r.setEnd(p, refContentEditable.current.innerHTML.length ? 1 : 0);
      s.removeAllRanges();
      s.addRange(r);
    } catch (error) {}
  };
  const onClick2 = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const onPaste = (e) => {
    if (maxLength) {
      e.target.innerHTML = e.target.innerHTML.substring(0, maxLength);
    }
    if (refTimeout.current) {
      clearTimeout(refTimeout.current);
    }
    refTimeout.current = setTimeout(
      (value = "") => {
        refInput.current = value.replaceAll("&nbsp;", " ");
        props.onChange && props.onChange(refInput.current);
      },
      1000,
      e.target.innerHTML
    );
  };
  useEffect(() => {
    if (html != refInput.current) {
      refInput.current = html || "";
      if (/<\/?[a-z][\s\S]*>/i.test(html)) {
        // check html là thẻ element
        setState({ html: html });
      } else {
        setState({ html: ((html || "") + "").replaceAll(" ", "&nbsp;") });
      }
    } else {
      // prevent the cache data when "props.html" changed
      setState({ html: html });
    }
  }, [html]);
  useEffect(() => {
    if (refContentEditable.current) {
      refContentEditable.current.innerHTML = state.html || "";
    }
  }, [state.html]);
  return (
    <Main {...rest} onClick={onClick}>
      {!!label && (
        <span className={`label ${classNameLabel}`}>
          {label}
          {afterText}
          {displayColon && ":"}
        </span>
      )}
      <span
        onPaste={onPaste}
        id={spanId}
        onClick={onClick2}
        ref={refContentEditable}
        className="content-editable"
        contentEditable={!disabled}
        suppressContentEditableWarning={true}
        onKeyDown={handleOnKeyDown}
        onKeyUp={handleOnKeyUp}
        onInput={onInput}
      >
      </span>
    </Main>
  );
}

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  maxLine: PropTypes.number,
  maxLength: PropTypes.number,
};
TextField.defaultProps = {
  displayDot: true,
};

export default TextField;
