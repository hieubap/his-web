import React, { useEffect } from "react";
import { Avatar, Icon, Button, Tooltip, Popover } from "antd";
import { Main } from "./styled";
import PatientInfo from "components/PatientInfo";
import { Link } from "react-router-dom";
import ListFunction from "../ListFunction";

const CollapsedLayout = (props) => {
  return (
    <Main>
      <div className={"layout-item"}>
        <Tooltip placement="topLeft" title={"Danh sách NB"}>
          <Link to={"/app/patient-list"}>
            <Button
              style={{ width: "100%" }}
              className="btn-list item-action"
              icon={"unordered-list"}
            />
          </Link>
        </Tooltip>
        <Popover
          content={
            <div style={{ width: 300 }}>
              <PatientInfo />
            </div>
          }
          trigger="hover"
          placement={"left"}
          className="item-action"
        >
          <Avatar shape={"square"} icon={"user"} />
        </Popover>
      </div>

      <div className={"layout-item"}>
        <ListFunction colSpan={24} />
      </div>
    </Main>
  );
};

export default CollapsedLayout;
