import React, { useEffect, useRef, useState } from "react";
import { Main } from "./styled";
import render from "./render";
import renderHtml from "react-render-html";
import { Icon, Popover } from "antd";

const ignoreClick = ["layout", "label"];

const EditingRender = ({
  item,
  verticalLine,
  updateContent,
  itemProps,
  template,
  focusComponent,
  formId,
  formChange,
  mode,
  component,
  values,
  valuesHIS,
  soCapKy,
}) => {
  const [visible, setVisible] = useState(false);
  const wrapRef = useRef();

  useEffect(() => {
    if (mode === "editing") {
      document.addEventListener("mousedown", hideDescription);
    }

    return () => {
      document.removeEventListener("mousedown", hideDescription);
    };
  }, []);

  const showDescription = (evt) => {
    if (
      !ignoreClick.includes(component.type) &&
      mode === "editing" &&
      evt.altKey
    ) {
      if (component.type === "table") {
        if (itemProps["gridData"]) {
          setVisible(true);
        }
      } else {
        setVisible(true);
      }
    }
  };

  const hideDescription = (event) => {
    if (
      mode === "editing" &&
      wrapRef &&
      !wrapRef.current.contains(event.target)
    ) {
      setVisible(false);
    }
  };
  return (
    <div ref={wrapRef}>
      <Popover
        content={renderHtml(itemProps.description || "Chưa có mô tả")}
        title={
          <div>
            {"Mô tả và hướng dẫn sử dụng "}
            <a href={"###"} onClick={hideDescription}>
              <Icon type={"close"} />
            </a>
          </div>
        }
        visible={visible}
      >
        <Main
          style={{ width: item.width || "unset" }}
          onClick={showDescription}
        >
          {component.type &&
            render(component.type)({
              component,
              mode,
              blockWidth: item.width,
              block: item,
              form: values,
              formChange,
              formId,
              valuesHIS,
              template,
              soCapKy,
            })}
        </Main>
      </Popover>
    </div>
  );
};

export default EditingRender;
