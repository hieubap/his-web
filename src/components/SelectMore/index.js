import React, { memo, useCallback, useEffect, useState, useRef } from "react";
import { Input } from "antd";
import { areEqual, FixedSizeList as CustomVirtualizeList } from "react-window";
import { Main } from "./styled";

const SelectMore2 = (props) => {
  const listRef = useRef();
  var active = 0;

  const [state, _setState] = useState({
    inputValue: "",
    focus: false,
    dataIndex: [],
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const [focus, setFocus] = useState(false);
  const [dataIndex, setDataIndex] = useState([]);

  useEffect(() => {
    document.addEventListener("keyup", keyDownSelectItem);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("keyup", keyDownSelectItem);
      document.removeEventListener("click", handleClick);
    };
  }, []);
  const {
    disabled,
    placeholder,
    data,
    onChange,
    className,
    onBlur,
    valueText,
    valueTen,
  } = props;

  useEffect(() => {
    setDataIndex(data);
  }, [data]);
  const keyDownSelectItem = (e) => {
    // e.preventDefault();
    let propsIndex = listRef?.current?.props || {};
    let stateIndex = listRef?.current?.state || {};
    let index, x, indexscroll, itemSize, location, backgroundColor;
    let y = document.querySelectorAll(".room-item");
    for (let i = 0; i < y.length; i++) {
      y[i].style.backgroundColor = "#fff";
    }
    if (e.keyCode === 40) {
      index = active >= propsIndex?.itemCount ? active : active + 1;
      x = document.getElementById(`scrollSelect${index}`);
      if (x) {
        x.style.backgroundColor = "#ede7e7";
        listRef && listRef.current && listRef.current.scrollToItem(index);
        active = active + 1;
      } else {
        indexscroll = stateIndex?.scrollOffset;
        itemSize = propsIndex?.itemSize;
        location = Math.ceil(indexscroll / itemSize);
        backgroundColor = document.getElementById(`scrollSelect${location}`);
        if (backgroundColor) backgroundColor.style.backgroundColor = "#ede7e7";
        active = location >= propsIndex?.itemCount ? location : location + 1;
        listRef && listRef.current && listRef.current.scrollToItem(active);
      }
    }
    if (e.keyCode === 38) {
      index = active <= 0 ? 0 : active - 1;
      x = document.getElementById(`scrollSelect${index}`);
      if (x) {
        x.style.backgroundColor = "#ede7e7";
        listRef && listRef.current && listRef.current.scrollToItem(index);
        active = active - 1;
      } else {
        indexscroll = stateIndex?.scrollOffset;
        itemSize = propsIndex?.itemSize;
        location = Math.ceil(indexscroll / itemSize);
        backgroundColor = document.getElementById(`scrollSelect${location}`);
        if (backgroundColor) backgroundColor.style.backgroundColor = "#ede7e7";
        active = location <= 0 ? 0 : location - 1;
        listRef && listRef.current && listRef.current.scrollToItem(active);
      }
    }
    if (e.keyCode === 13) {
      for (let i = 0; i < y.length; i++) {
        let id = y[i]?.id;
        if (id === `scrollSelect${active}`) {
          if (props.onChange) {
            let className =
              y[i]?.className && y[i]?.className.replace("room-item ", "");
            let id = className.getQueryStringHref("id", className);
            let ten = className.getQueryStringHref("ten", className);
            setFocus(false);
            active = 0;
            setState({
              inputValue: ten,
            });
            props.onChange(id);
          }
        }
      }
    }
  };
  const handleClick = (e) => {
    let classs = e.target && e.target.className && e.target.className;
    if (
      typeof classs == "string" &&
      classs.indexOf(`select-more ${className ? className : ""}`) >= 0
    ) {
      setFocus(true);
      active = 0;
      let x = document.getElementById(`scrollSelect0`);
      if (x) x.style.backgroundColor = "#ede7e7";
    } else {
      setFocus(false);
      active = 0;
    }
  };
  const filteredData = useCallback(
    (dataIndex || []).filter((item) => {
      const ten = item?.ten || "";
      const ma = item?.ma || "";
      const text = state.inputValue?.toLowerCase().createUniqueText();
      if (!text) return true;
      if (
        ten.toLowerCase().createUniqueText().indexOf(text) !== -1 ||
        ma.toLowerCase().createUniqueText().indexOf(text) !== -1
      ) {
        return true;
      }
      return false;
    }),
    [dataIndex, state.inputValue]
  );

  const RowItems = memo(({ index, style }) => {
    const currentRow = filteredData[index];
    return (
      <span
        style={style}
        className={`room-item ?id=${currentRow?.id}&ten=${currentRow?.ten}`}
        key={index}
        id={`scrollSelect${index}`}
        onClick={() => {
          onChange(currentRow?.id);
          setState({
            inputValue: currentRow?.ten,
          });
        }}
      >
        {valueTen && currentRow[`${valueTen}`]
          ? `${currentRow[`${valueTen}`]} - `
          : ""}
        {currentRow?.ten}
      </span>
    );
  }, areEqual);
  const onClick = () => {
    setState({
      focus: true,
    });
  };
  return (
    <Main className="select-content" onClick={onClick}>
      <Input
        className={`select-more ${className ? className : ""}`}
        onChange={(e) => {
          let value = e.target.value;
          if (value?.length === 0) onChange("");
          setState({
            inputValue: e.target.value,
          });
        }}
        value={state.inputValue || valueText}
        disabled={disabled}
        placeholder={placeholder ? placeholder : "Nhập thông tin"}
        onBlur={onBlur}
      />

      {focus && !disabled ? (
        <div className="select-drop-list">
          <CustomVirtualizeList
            height={filteredData.length > 6 ? 175 : filteredData.length * 35}
            itemCount={filteredData.length}
            itemSize={35}
            ref={listRef}
          >
            {RowItems}
          </CustomVirtualizeList>
        </div>
      ) : null}
    </Main>
  );
};

export default memo(SelectMore2);
