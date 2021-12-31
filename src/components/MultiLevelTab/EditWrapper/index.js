import React, { useEffect, useRef } from "react";
import { Main } from "./styled";
import { Button } from "antd";
import { checkRole } from "app/Sidebar/constant";
import { CloseOutlined } from "@ant-design/icons";
import IcCreate from "assets/images/kho/IcCreate.png";
import { useDispatch } from "react-redux";
function EditWrapper(props) {
  const {
    title,
    onCancel,
    onSave,
    onAddNewRow,
    actionHeaderClass,
    isShowTitle,
    isShowButtonAdd,
    isShowSaveButton,
    isShowCancelButton,
    layerId,
    isEditAndPressRow,
  } = props;
  const refClickBtnSave = useRef();
  const refClickBtnAdd = useRef();
  const { onRegisterHotkey } = useDispatch().phimTat;

  // register layerId
  useEffect(() => {
    if (layerId)
      onRegisterHotkey({
        layerId,
        hotKeys: [
          {
            keyCode: 115, //F4
            onEvent: (e) => {
              refClickBtnSave.current && refClickBtnSave.current(e);
            },
          },
        ],
      });
  }, []);
  refClickBtnSave.current = onSave;
  refClickBtnAdd.current = onAddNewRow;

  const hanldeHiddenCancel = () => {
    if (props.forceShowButtonCancel) {
      return false;
    }
    if (props.roleEdit || props.roleSave) {
      if (props.editStatus) {
        return !checkRole(props.roleEdit);
      } else {
        return !checkRole(props.roleSave);
      }
    } else {
      return props.isShowCancelButton ? false : true;
    }
  };
  const hanldeHiddenSave = () => {
    if (props.forceShowButtonSave) {
      return false;
    }
    if (props.roleEdit || props.roleSave) {
      if (props.editStatus) {
        return !checkRole(props.roleEdit);
      } else {
        return !checkRole(props.roleSave);
      }
    } else {
      return props.isShowSaveButton ? false : true;
    }
  };

  const hanldeHiddenNeww = () => {
    if (props.isHiddenButtonAdd) {
      return true;
    }
    if (props.isEditAndPressRow) { // hiển thị thêm mới button khi chọn 1 row , (đã xác nhận với Vân chuyên viên)
      return false;
    } 
    if (props.roleSave) {
      return !checkRole(props.roleSave);
    } else {
      return props.showAdded ? false : true;
    }
  };

  return (
    <Main>
      <div
        className={
          actionHeaderClass
            ? `action-header ${actionHeaderClass}`
            : "action-header"
        }
      >
        <div className="align-center">
          {isShowTitle == false ? null : <span className="title">{title}</span>}
          {isShowButtonAdd == false ? null : (
            <Button
              type="default"
              className="btn btn-added"
              onClick={onAddNewRow}
              hidden={hanldeHiddenNeww()}
            >
              Thêm mới
              <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
            </Button>
          )}
        </div>
      </div>
      <div className="button-bottom-modal">
        <div>
          {isShowCancelButton == false ? (
            <></>
          ) : (
            <Button
              type="default"
              className="btn btn-cancel button-cancel"
              onClick={onCancel}
              hidden={hanldeHiddenCancel()}
            >
              {"Hủy"}
              <CloseOutlined />
            </Button>
          )}

          {isShowSaveButton == false ? (
            <></>
          ) : (
            <Button
              type="default"
              className="btn btn-save mrl-5 button-ok"
              onClick={onSave}
              hidden={hanldeHiddenSave()}
            >
              Lưu [F4]
              <img
                style={{ marginLeft: 6 }}
                src={require("assets/images/kho/save.png")}
                alt=""
              ></img>
            </Button>
          )}
        </div>
      </div>
      <div>{props.children}</div>
    </Main>
  );
}

export default EditWrapper;
