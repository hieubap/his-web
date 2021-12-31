import { CloseOutlined } from "@ant-design/icons";
import { Button, Form, message } from "antd";
import { checkRole } from "app/Sidebar/constant";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { WrapperStyled, WrapperStyledForm } from "./styled";

// ---- form cơ bản nhất của các form trong danh mục ---------

const FormElement = ({
  renderForm = () => <></>,
  // set mặc định lúc resetField form
  initValueForm,
  // custom value set vào form lúc setFieldValue
  getFieldValue,
  layerId,
  loading,
  roleEdit,
  roleSave,
  dataEdit, // lấy trong redux
  createOrEdit, // là một promise
  // sau khi submit: () => () => {}
  afterSubmit: afterSubmitSuccess,
  disabledFieldSet,

  // updateData _editData vào redux
  updateData,
  // load lại dữ liệu sau khi submit
  dataSearch,
  getData,

  classHeader = "",
  isShowTitle = true,
  title,
}) => {
  const [form] = Form.useForm();
  const [_state, _setState] = useState({});
  const setState = (data = {}) => {
    _setState((state) => ({ ...state, ...data }));
  };
  // ----
  const resetField = () => {
    form.resetFields();
    if (initValueForm) initValueForm({ form });
  };
  const _getFieldValue = getFieldValue ? getFieldValue : (data) => data;
  // ---- end

  //----- phím tắt ------
  const refAutoFocus = useRef(null);
  const refClickBtnSave = useRef();
  const refClickBtnAdd = useRef();
  const { onRegisterHotkey } = useDispatch().phimTat;
  useEffect(() => {
    if (layerId) {
      onRegisterHotkey({
        layerId,
        hotKeys: [
          {
            keyCode: 112, //F1
            onEvent: (e) => {
              refClickBtnAdd.current && refClickBtnAdd.current(e);
            },
          },
          {
            keyCode: 115, //F4
            onEvent: (e) => {
              refClickBtnSave.current && refClickBtnSave.current(e);
            },
          },
        ],
      });
    }
  }, []);
  refClickBtnAdd.current = () => {
    resetField();
    if (refAutoFocus.current) {
      refAutoFocus.current.focus();
    }
    updateData({ _dataEdit: {} });
  };
  // --------

  useEffect(() => {
    if (dataEdit) {
      form.setFieldsValue(_getFieldValue(dataEdit));
    } else {
      resetField();
    }
  }, [dataEdit]);

  const _afterSubmitSucess = afterSubmitSuccess
    ? afterSubmitSuccess({})
    : () => {
        resetField();
      };
  const handleSubmit = (e) => {
    if (e?.preventDefault) e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        createOrEdit(values, { resetField })
          .then((res) => {
            if (res && res.code === 0) {
              if (getData) getData(dataSearch);
              _afterSubmitSucess();
            }
          })
          .catch((e) => {
            if (e?.message) message.error(e?.message);
          });
      })
      .catch((error) => {});
  };
  refClickBtnSave.current = handleSubmit;

  // ấn nút hủy
  const handleCancel = () => {
    if (dataEdit?.id) {
      form.setFieldsValue(_getFieldValue(dataEdit));
    } else {
      resetField();
    }
  };
  // --- check quyền để ẩn button
  const handleHiddenBtn = () => {
    if (roleEdit || roleSave) {
      return !checkRole(dataEdit?.id ? roleEdit : roleSave);
    } else {
      return false;
    }
  };
  return (
    <WrapperStyled>
      <div
        className={
          classHeader ? `action-header ${classHeader}` : "action-header"
        }
      >
        <div className="align-center">
          {isShowTitle ? <span className="title">{title}</span> : null}
          {/* {isShowButtonAdd == false ? null : (
            <Button
              type="default"
              className="btn btn-added"
              onClick={onAddNewRow}
              hidden={hanldeHiddenNeww()}
            >
              Thêm mới
              <img style={{ marginLeft: 5 }} src={IcCreate} alt="" />
            </Button>
          )} */}
        </div>
      </div>
      <WrapperStyledForm>
        <fieldset disabled={disabledFieldSet}>
          <Form
            disabled={
              dataEdit?.id ? !checkRole(roleEdit) : !checkRole(roleSave)
            }
            form={form}
            layout="vertical"
            style={{ width: "100%" }}
            className="form-custom"
          >
            {renderForm({ form, refAutoFocus, autoFocus: true })}
          </Form>
        </fieldset>
      </WrapperStyledForm>
      <div className="button-bottom-modal">
        <Button
          className="button-cancel"
          onClick={handleCancel}
          hidden={handleHiddenBtn()}
        >
          Hủy
          <CloseOutlined />
        </Button>
        <Button
          className="button-ok"
          onClick={handleSubmit}
          loading={loading}
          hidden={handleHiddenBtn()}
        >
          {layerId ? "Lưu [F4]" : "Lưu"}
          <img
            style={{ marginLeft: 6 }}
            src={require("assets/images/kho/save.png")}
            alt=""
          ></img>
        </Button>
      </div>
    </WrapperStyled>
  );
};

export default FormElement;
