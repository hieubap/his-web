import React, { PureComponent } from "react";
import htmlToText from "react-html-parser";
import T from "prop-types";
import { message } from "antd";
import { controlKeys, fontHeight } from "./constants";
import View from "./View";

class ContentEditable extends PureComponent {
  constructor(props) {
    super(props);
    this.editNode = React.createRef();
    this.state = {
      disabledEnter: false,
      text: "",
      font: {},
    };
  }

  componentDidMount() {
    const { size } = this.props;

    const fontSizePx = Math.round(
      parseFloat(window.getComputedStyle(this.editNode.current).fontSize)
    );
    const font =
      Object.keys(fontHeight).find(
        (key) => fontHeight[key].fontSize === fontSizePx
      ) || fontHeight[12];

    this.setState({ font: fontHeight[font] });

    this.editNode.current.addEventListener("paste", (event) => {
      const clipboardData = event.clipboardData || window.clipboardData;
      const data = clipboardData.getData("text");
      const convert1 = data.replace(/(\r\n|\n|\r)/gm, "");

      const selection = window.getSelection();
      if (!selection.rangeCount) return false;
      selection.deleteFromDocument();
      if (convert1.length > size) {
        message.error(`Không đươc nhập quá ${size} ký tự`);
      } else {
        selection.getRangeAt(0).insertNode(document.createTextNode(convert1));
        selection.collapseToEnd();
        this.emitChange();
      }

      event.preventDefault();
    });
  }

  focus = (jumpToEnd) => {
    this.editNode.current.focus();
    if (jumpToEnd) {
      // select all the content in the element
      document.execCommand("selectAll", false, null);
      // collapse selection to the end
      document.getSelection().collapseToEnd();
    }
  };

  handleKeyDown = (e) => {
    const { text } = this.state;
    const { size } = this.props;
    const keys = Object.keys(controlKeys).map((key) => controlKeys[key]);

    if (size && text.length >= size && !keys.includes(e.keyCode)) {
      message.error(`Không đươc nhập quá ${size} ký tự`);
      e.preventDefault();
    }

    return false;
  };

  emitChange = () => {
    const { onChange, extentLine, updateLineNumber } = this.props;
    const { font } = this.state;
    const htmlValue = this.editNode.current.innerHTML;
    const line = htmlValue.split("<br>");
    let current = extentLine || 1;
    const values = htmlToText(htmlValue).filter(
      (item) => typeof item === "string"
    );
    const text = values.join(" ");

    if (this.editNode.current) {
      const lineDefault = extentLine || 0;
      const lineNumber = Math.round(
        this.editNode.current.offsetHeight / font.offsetHeight
      );

      current = lineNumber > lineDefault ? lineNumber : lineDefault;
      updateLineNumber(current - 1);
    }

    this.setState({
      disabledEnter: line.length > extentLine + 1,
      text,
      value: htmlValue,
    });
    onChange({ text, htmlValue });
  };

  render() {
    const {
      labelWidth,
      extentLine,
      type,
      width,
      htmlValue,
      updateLineNumber,
      ...other
    } = this.props;
    const { font } = this.state;
    const editWidth = type === "multiple" ? width - labelWidth : width;
    const lines = [];
    const lineDefault = extentLine || 0;
    const elm = this.editNode.current;

    if (elm) {
      for (let i = 0; i < lineDefault; i++) {
        lines.push(i + 1);
      }
    }

    return (
      <View
        {...other}
        width={width}
        type={type}
        htmlValue={htmlValue}
        labelWidth={labelWidth}
        editWidth={editWidth}
        lines={lines}
        focus={this.focus}
        emitChange={this.emitChange}
        handleKeyDown={this.handleKeyDown}
        textNode={this.editNode}
        updateLineNumber={updateLineNumber}
        extentLine={extentLine}
        font={font}
        contentAlign={this.props.contentAlign}
      />
    );
  }
}

ContentEditable.defaultProps = {
  type: "single",
  size: 0,
  extentLine: 0,
  onChange: () => {},
  plusLine: () => {},
  minusLine: () => {},
  updateLineNumber: () => {},
};

ContentEditable.propTypes = {
  type: T.oneOf(["single", "multiple"]),
  size: T.number,
  onChange: T.func,
  plusLine: T.func,
  updateLineNumber: T.func,
  minusLine: T.func,
  extentLine: T.number,
};

export default ContentEditable;
