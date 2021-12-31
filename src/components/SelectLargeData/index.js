import React, { memo, useCallback, useEffect, useState, useRef } from "react";
import { Input, Select } from "antd";
import { areEqual, FixedSizeList as CustomVirtualizeList } from "react-window";
import { Main } from "./styled";
import stringUtils from "mainam-react-native-string-utils";
import IconCancel from "assets/images/his-core/iconCancel.svg";
const SelectLargeData = (props) => {
  const refList = useRef();
  const refId = useRef(stringUtils.guid());
  const refInput = useRef(null);
  const refMain = useRef(null);
  const refListData = useRef(null);
  var active = -1;

  const [state, _setState] = useState({
    inputValue: "",
    focus: false,
    filteredData: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  useEffect(() => {
    document.addEventListener("keyup", onKeyDown);
    document.addEventListener("click", onHandleClick);

    return () => {
      document.removeEventListener("keyup", onKeyDown);
      document.removeEventListener("click", onHandleClick);
    };
  }, []);
  const { disabled, data, onChange, className, value } = props;

  useEffect(() => {
    if (state.focus && refInput.current?.focus) {
      refInput.current.focus();
    }
  }, [state.focus]);

  useEffect(() => {
    refListData.current = (data || []).filter((item) => {
      const ten = renderText(item) || "" + "";
      const ma = (getValue(item) || "") + "";
      const text = state.inputValue?.toLowerCase().createUniqueText();
      if (!text) return true;
      if (
        ten?.toLowerCase().createUniqueText().indexOf(text) !== -1 ||
        ma?.toLowerCase().createUniqueText().indexOf(text) !== -1
      ) {
        return true;
      }
      return false;
    });
    setState({
      filteredData: refListData.current,
    });
  }, [data, state.inputValue, value]);

  useEffect(() => {
    let selectedItem = data?.find((item) => {
      return getValue(item) == value;
    });
    setState({
      selectedItem: selectedItem,
    });
  }, [data, value]);

  // useEffect(() => {
  //   let scroll = document.getElementById("large-list-select");
  //   if (scroll) {
  //     scroll.remove();
  //   }
  //   // scroll = document.querySelectorAll(".large-list-select.base");
  //   // if (scroll.length) {
  //   //   const rect = scroll[0].getBoundingClientRect();
  //   //   scroll = scroll[0].cloneNode(true);
  //   //   scroll.style.left = rect.left + "px";
  //   //   scroll.style.top = rect.top + "px";
  //   //   scroll.setAttribute("id", "large-list-select");
  //   //   debugger;
  //   //   scroll.style.width = (refMain.current?.clientWidth || "0") + "px";
  //   //   scroll.classList.add(".absolute");
  //   //   document.body.appendChild(scroll);
  //   // }
  // }, [state.focus]);
  const onKeyDown = (e) => {
    // e.preventDefault();
    let propsIndex = refList.current?.props || {};
    let stateIndex = refList.current?.state || {};
    let index, x, indexscroll, itemSize, location, backgroundColor;
    let y = document.querySelectorAll(".mn-item.focus-item");
    if (e.keyCode === 13) {
      if (y.length) {
        let dataIndex = y[0].getAttribute("data-index");
        // let dataValue = y[0].getAttribute("data-index");
        // let item = refListData.current ? refListData.current[dataIndex] : null;
        onClickItem(dataIndex)();
      }
      // for (let i = 0; i < y.length; i++) {
      //   if () {
      //   }
      // }
    }

    for (let i = 0; i < y.length; i++) {
      // if (y[i].classList.contains("focus-item")) {
      y[i].classList.remove("focus-item");
      // }
    }
    if (e.keyCode === 40) {
      index = active >= propsIndex?.itemCount ? active : active + 1;
      x = document.getElementById(`${refId.current}${index}`);
      if (x) {
        // if (!x.classList.contains("focus-item")) {
        x.classList.add("focus-item");
        // }
        refList && refList.current && refList.current.scrollToItem(index);
        active = active + 1;
      } else {
        indexscroll = stateIndex?.scrollOffset;
        itemSize = propsIndex?.itemSize;
        location = Math.ceil(indexscroll / itemSize);
        backgroundColor = document.getElementById(
          `${refId.current}${location}`
        );

        if (backgroundColor) backgroundColor.classList.add("focus-item");
        active = location >= propsIndex?.itemCount ? location : location + 1;
        refList.current && refList.current.scrollToItem(active);
      }
    }
    if (e.keyCode === 38) {
      index = active <= 0 ? 0 : active - 1;
      x = document.getElementById(`${refId.current}${index}`);
      if (x) {
        x.classList.add("focus-item");
        refList.current && refList.current.scrollToItem(index);
        active = index;
      } else {
        indexscroll = stateIndex?.scrollOffset;
        itemSize = propsIndex?.itemSize;
        location = Math.ceil(indexscroll / itemSize);
        backgroundColor = document.getElementById(
          `${refId.current}${location}`
        );
        if (backgroundColor)
          if (backgroundColor) backgroundColor.classList.add("focus-item");
        active = location <= 0 ? 0 : location - 1;
        refList.current && refList.current.scrollToItem(active);
      }
    }
  };
  const onHandleClick = (e) => {
    let classs = e.target && e.target.className && e.target.className;
    if (
      typeof classs == "string" &&
      classs.indexOf(`select-more ${className ? className : ""}`) >= 0
    ) {
      active = -1;
      let x = document.getElementById(`${refId.current}0`);
      if (x) x.style.backgroundColor = "#ede7e7";
    } else {
      active = -1;
    }
    if (refMain.current) {
    }

    if (
      e.target.id.indexOf(refId.current) != -1 ||
      !e.path?.find((item) => item == refMain.current)
    ) {
      setState({
        focus: false,
      });
    } else
      setState({
        focus: true,
      });
  };

  const onClickItem = (index) => (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const currentRow = refListData.current ? refListData.current[index] : null;

    setState({
      selectedItem: currentRow,
      inputValue: "",
      focus: false,
    });
    if (props.onChange) {
      props.onChange(props.getValue ? props.getValue(currentRow) : currentRow);
    }
    return false;
  };
  const getValue = (item) => {
    if (props.getValue) {
      let value = props.getValue(item || {});
      return value;
    }
    return "";
  };
  const RowItems = memo(({ index, style }) => {
    const currentRow = state.filteredData[index];

    return (
      <span
        style={style}
        className={`mn-item ${
          getValue(currentRow) == getValue(state.selectedItem)
            ? "active-item"
            : ""
        }`}
        key={index}
        id={`${refId.current}${index}`}
        onClick={onClickItem(index)}
        data-value={getValue(currentRow)}
        data-index={index}
      >
        {renderText(currentRow)}
      </span>
    );
  }, areEqual);
  const renderText = (item) => {
    if (props.renderText) return props.renderText(item);
    return "";
  };
  const onRemoveValue = () => {
    setState({
      inputValue: "",
      selectedItem: null,
      focus: false,
    });
    if (props.onChange) {
      props.onChange(null);
    }
    return false;
  };
  const onFocus = () => {
    setState({
      focus: true,
    });
  };
  const onBlur = () => {
    // setTimeout(() => {
    //   setState({
    //     focus: false,
    //   });
    // }, 500);
    // if (props.onBlur) props.onBlur();
  };
  return (
    <Main
      className={`select-content ant-select ant-select-single ant-select-allow-clear ant-select-show-arrow ant-select-show-search ${props.className}`}
      style={props.style || {}}
      onBlur={onBlur}
      ref={refMain}
    >
      <div className="ant-select-selector">
        {state.focus ? (
          <span className="ant-select-selection-search">
            <Input
              className={`ant-select-selection-search-input ${
                className ? className : ""
              }`}
              onChange={(e) => {
                let value = e.target.value;
                if (value?.length === 0) onChange("");
                setState({
                  inputValue: e.target.value,
                });
              }}
              disabled={disabled}
              onBlur={onBlur}
              onClick={() => {
                setState({
                  inputValue: "",
                });
              }}
              autoComplete="off"
              type="search"
              className="ant-select-selection-search-input"
              aria-haspopup="listbox"
              placeholder={props.placeholder}
              ref={refInput}
            />
          </span>
        ) : (
          <>
            <Input
              className={`ant-select-selection-search-input ${
                className ? className : ""
              }`}
              onFocus={onFocus}
              style={{ width: 0 }}
              allowClear
            />
            {!state.selectedItem ? (
              <span className="ant-select-selection-placeholder">
                {props.placeholder}
              </span>
            ) : (
              <span
                className="ant-select-selection-item"
                title={renderText(state.selectedItem)}
                style={{ position: "relative" }}
              >
                {renderText(state.selectedItem)}
                <IconCancel
                  onClick={onRemoveValue}
                  style={{
                    opacity: 0.6,
                    fontSize: 9,
                    position: "absolute",
                    top: 10,
                    right: 0,
                    cursor: "pointer",
                  }}
                />
              </span>
            )}
          </>
        )}
      </div>
      <span
        className="ant-select-arrow"
        unselectable="on"
        aria-hidden="true"
        style={{ userSelect: "none" }}
      >
        <span
          role="img"
          aria-label="down"
          className="anticon anticon-down ant-select-suffix"
        >
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            data-icon="down"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
          </svg>
        </span>
      </span>

      {state.focus && !disabled ? (
        <div className="select-drop-list">
          <CustomVirtualizeList
            height={
              state.filteredData.length > 6
                ? 175
                : state.filteredData.length * 35
            }
            itemCount={state.filteredData.length}
            itemSize={35}
            id={stringUtils.guid()}
            ref={refList}
          >
            {RowItems}
          </CustomVirtualizeList>
        </div>
      ) : null}
    </Main>
  );
};

export default memo(SelectLargeData);
