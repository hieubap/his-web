import React, { useState, useEffect } from "react";
import { Button, Form, Input, Modal } from "antd";
// import "../userinfo/style.scss";
import { connect } from "react-redux";
import authAction from "@actions/auth";
import actionUsers from "@actions/users";
import { withTranslate } from 'react-redux-multilingual';

function index(props) {
  const { translate } = props;
  const [state, _setState] = useState({
    size: 10,
    page: 1,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
  }, []);
  const closeModal = () => {
    props.onClose();
  }
  const { getFieldDecorator } = props.form;

  const handleChangePass = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        props.updatePassword().then(s => {
          window.localStorage.clear();
          props.updateDataAuth({
            auth: {}
          });
          window.location.href = "/login";
        }).catch(e => {

        });
      }
    })
  }
  const checkNewPassword = (rule, value, callback) => {
    if (!value || !props.newPassword) {
      callback([new Error(translate("vuilongnhapmatkhaumoi"))]);
    } else {
      if (!value.isPassword()) {
        callback([new Error(translate("checkmatkhau"))]);
      } else {
        callback();
      }
    }
  };
  const checkConfirmPassword = (rule, value, callback) => {
    if (!value || !state.confirmPassword) {
      callback([new Error(translate("nhaplaimatkhaumoi"))]);
    } else {
      if (value !== props.newPassword) {
        callback([new Error(translate("xacnhanmatkhaukhongtrung"))]);
      } else {
        callback();
      }
    }
  };
  return (
    <Modal
      className="change-status"
      width={650}
      title={translate("thaydoimatkhau")}
      visible={true}
      cancelText={"Đóng"}
      onCancel={closeModal}
      footer={[
        <>
          <Button type="danger" key="back" onClick={() => closeModal()}>{translate("huy")}</Button>
          <Button key="submit" type="primary" onClick={(e) => handleChangePass(e)}>{translate("luu")} </Button>
        </>
      ]} >
      <div>
        <Form layout="vertical" hideRequiredMark onSubmit={handleChangePass}>
          <Form.Item
            name="owner"
            label={translate("matkhaucu")}
          >
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: translate("vuilongnhapmatkhaucu"),
                },
              ],
              initialValue: props.changePassword,
            })(
              <Input placeholder={translate("nhapmatkhaucu")}
                type="password"
                onChange={(e) => {
                  props.updateData({
                    changePassword: e.target.value,
                  });
                }}
              />
            )}
          </Form.Item>
          <Form.Item
            name="owner"
            label={translate("matkhaumoi")}
          >
            {getFieldDecorator("newPassword", {
              rules: [{ validator: checkNewPassword }],
              initialValue: props.newPassword,
            })(
              <Input placeholder={translate("vuilongnhapmatkhaumoi")}
                type="password"
                onChange={(e) => {
                  props.updateData({
                    newPassword: e.target.value,
                  });
                }}
              />
            )}
          </Form.Item>
          <Form.Item
            name="owner"
            label={translate("xacnhanmatkhau")}
          >
            {getFieldDecorator("confirmPassword", {
              rules: [{ validator: checkConfirmPassword }],
              initialValue: state.confirmPassword,
            })(
              <Input placeholder={translate("nhaplaimatkhaumoi")}
                type="password"
                onChange={(e) => {
                  setState({
                    confirmPassword: e.target.value,
                  });
                }}
              />
            )}
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}
function mapStateToProps(state) {
  return {
    auth: state.auth && state.auth.auth || {},
    newPassword: state.users.newPassword,
    changePassword: state.users.changePassword,
  };
}

export default connect(mapStateToProps, {
  onLogout: authAction.onLogout,
  updateDataAuth: authAction.updateData,
  updateData: actionUsers.updateData,
  updatePassword: actionUsers.changePassword,
})(Form.create()(withTranslate(index)));