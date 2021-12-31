import React, { useMemo } from "react";
import { Table } from "antd";
import "./styled.css";
const TableWraper = (props) => {
  const columns = useMemo(() => {
    return (props.columns || [])
      .filter((item) => !item.hidden)
      .map((item, index) => {
        return {
          title: (
            <>
              <div className="custome-header">
                {item.type ? (
                  <>
                    {!item.hideSearch && (
                      <div className="addition-box" style={item.style}>
                        {item.search}
                      </div>
                    )}
                    <div className="title-box">{item.title}</div>
                  </>
                ) : (
                  <>
                    <div className="title-box">{item.title}</div>
                    {!item.hideSearch && (
                      <div className="addition-box" style={item.style}>
                        {item.search}
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          ),
          width: item.width,
          dataIndex: item.dataIndex,
          key: "col_" + index,
          fixed: item.fixed,
          align: item.align,
          render: item.render,
        };
      }); 
  }, [props.columns]);
  const rowKey = useMemo(() => {
    let item = (props.dataSource || [])[0];
    return props.rowKey || (item?.id ? "id" : "");
  }, [props.dataSource, props.rowKey]);
  return (
    <Table
      pagination={false}
      {...props}
      className={props.className}
      columns={columns}
      rowKey={rowKey}
    />
  );
};

export default TableWraper;
