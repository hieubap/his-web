import React, { useRef, useEffect } from "react";
import { Main } from "./styled";
import { Table, Button, Row } from "antd";
import { useDispatch } from "react-redux";
import "./styled.css";

const TableWrapper = ({
  title,
  buttonHeader,
  buttonLeft,
  scroll = {},
  styleMain,
  classNameRow = "",
  styleContainerButtonHeader,
  rowClassName,
  dataSource = [],
  onRow = () => {},

  layerId,
  dataEditDefault,
  ...rest
}) => {
  const refClickBtnAdd = useRef();
  const refSelectRow = useRef();
  const { onRegisterHotkey } = useDispatch().phimTat;
  const classNameCustom =
    rowClassName ||
    ((record, index) => {
      return record.id === dataEditDefault?.id
        ? `row-actived row-id-${layerId}_${record.id}`
        : `row-id-${layerId}_${record.id}`;
    });

  // register layerId
  useEffect(() => {
    if (layerId)
      onRegisterHotkey({
        layerId,
        hotKeys: [
          {
            keyCode: 112, //F1
            onEvent: () => {
              refClickBtnAdd.current && refClickBtnAdd.current();
            },
          },
          {
            keyCode: 38, //up
            onEvent: (e) => {
              if (e.target.nodeName !== "INPUT")
                refSelectRow.current && refSelectRow.current(-1);
            },
          },
          {
            keyCode: 40, //down
            onEvent: (e) => {
              if (e.target.nodeName !== "INPUT")
                refSelectRow.current && refSelectRow.current(1);
            },
          },
        ],
      });
  }, []);

  refSelectRow.current = (index) => {
    const indexNextItem =
      (dataSource?.findIndex((item) => item.id === dataEditDefault?.id) || 0) +
      index;
    if (-1 < indexNextItem && indexNextItem < dataSource.length) {
      if (onRow(dataSource[indexNextItem])?.onClick)
        onRow(dataSource[indexNextItem]).onClick();
      document
        .getElementsByClassName(
          `row-id-${layerId}_${dataSource[indexNextItem]?.id}`
        )[0]
        .scrollIntoView({ block: "end", behavior: "smooth" });
    }
  };

  refClickBtnAdd.current =
    (buttonHeader || []).find((item) => item.type === "create")?.onClick ||
    (() => {});

  return (
    <Main>
      <Row className={`home-table-warrper ${classNameRow}`}>
        {!!title && <div className="home-title">{title}</div>}
        <div
          className={
            ((buttonHeader || []).some((item) => !!item.content) &&
              "buttonHeader") ||
            ""
          }
          style={{
            ...styleContainerButtonHeader,
          }}
        >
          {buttonHeader &&
            !!buttonHeader.length &&
            buttonHeader.map((item, index) => {
              if (item.content) {
                return item.content;
              } else {
                return (
                  <Button
                    className={item.className || "button-header"}
                    onClick={item.onClick}
                    key={index}
                  >
                    {item.title}
                    {item?.buttonHeaderIcon}
                  </Button>
                );
              }
            })}
        </div>
        <div className="button-left">
          {buttonLeft &&
            buttonLeft.length &&
            buttonLeft.map((item, index) => {
              return (
                <Button
                  className={`item button-header `}
                  onClick={item.onClick}
                  key={index}
                >
                  {item.title}
                  <img
                    src={require("assets/images/template/icImport.png")}
                    alt=""
                  />
                </Button>
              );
            })}
        </div>
      </Row>
      <div
        className="main__container"
        style={styleMain ? styleMain : undefined}
      >
        <Table
          {...rest}
          dataSource={dataSource}
          onRow={onRow}
          rowClassName={classNameCustom}
          pagination={false}
          bordered
          scroll={{ y: scroll.y || 370, x: scroll.x || 500 }}
          rowKey={(record) => record.id}
        />
      </div>
    </Main>
  );
};

export default TableWrapper;
