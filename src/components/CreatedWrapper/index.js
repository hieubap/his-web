import React, { useState, useEffect, useRef } from "react";
import { Button, Row } from "antd";
import { Main } from "./styled";
import { checkRole } from "app/Sidebar/constant";
import { ROLES } from "constants/index";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
function Index({ layerId, onOk, ...props }) {
  const [change, setChange] = useState(false);
  const refClickBtnSave = useRef();
  const { onRegisterHotkey } = useDispatch().phimTat;

  // register layerId
  useEffect(() => {
    if (layerId)
      onRegisterHotkey({
        layerId,
        hotKeys: [
          {
            keyCode: 115, //F4
            onEvent: () => {
              refClickBtnSave.current && refClickBtnSave.current();
            },
          },
        ],
      });
  }, []);

  refClickBtnSave.current = onOk;

  const hanldeHiddenCancel = () => {
    if (props.roleEdit || props.roleSave) {
      if (props.editStatus) {
        return !checkRole(props.roleEdit);
      } else {
        if (props.roleSave) {
          return !checkRole(props.roleSave);
        } else return !checkRole(props.roleEdit);
      }
    } else {
      return props.hiddenOk ? props.hiddenOk : false;
    }
  };
  const hanldeHiddenSave = () => {
    if (props.roleEdit || props.roleSave) {
      if (props.editStatus) {
        return !checkRole(props.roleEdit);
      } else {
        if (props.roleSave) {
          return !checkRole(props.roleSave);
        } else return !checkRole(props.roleEdit);
      }
    } else {
      return props.hiddenOk ? props.hiddenOk : false;
    }
  };
  useEffect(() => {
    setChange(true);
  }, [props.children]);
  return (
    <Main border={change}>
      <div className="header-create">
        <div className="create-title">{props.title}</div>
        <div className="button-bottom-modal">
          <Button
            className="button-cancel"
            onClick={props.onCancel}
            hidden={hanldeHiddenCancel()}
          >
            {props.cancelText ? props.cancelText : "Hủy"}
            <CloseOutlined />
          </Button>
          <Button
            className="button-ok"
            onClick={onOk}
            loading={props.loading}
            hidden={hanldeHiddenSave()}
          >
            {props.okText ? props.okText : "Thêm mới"}
            <img
              style={{ marginLeft: 6 }}
              src={require("assets/images/kho/save.png")}
              alt=""
            ></img>
          </Button>
        </div>
      </div>
      <div className="create-body">
        <Row>{props.children}</Row>
      </div>
    </Main>
  );
}

export default Index;
