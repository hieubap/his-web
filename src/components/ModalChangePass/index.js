import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, Input, message } from "antd";
import { Main, GlobalStyle, InputSearch } from "./styled";
import IconPass from "assets/svg/iconPass.svg";
import Icon from "@ant-design/icons";
import IconArrowLeft from "assets/svg/arrow-left.svg";
import IconSucces from "assets/svg/icon-success.svg";
import { useDispatch, useSelector } from "react-redux";
import MD5 from "crypto-js/md5";
const ModalChangePass = ({}, ref) => {
  const dispatch = useDispatch();
  const { changePassword, onLogout } = dispatch.auth;
  const { auth } = useSelector((state) => state.auth);
  const [state, _setState] = useState({
    show: false,
    successConfirmPass: false,
    isLoading: false,
  });
  const [form] = Form.useForm();
  const refPassword = useRef(null);
  const refConfirmPassword = useRef(null);
  const refOldPassword = useRef(null);
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useImperativeHandle(ref, () => ({
    show: () => {
      setState({
        show: true,
        successConfirmPass: false,
        confirmPassworderror: false,
        matKhauMoierror: false,
        successPassword: false,
      });
      form.resetFields();
    },
  }));
  const onBlurConfirm = () => {
    setState({
      focusConfirm: false,
    });
  };
  const onBlurPass = () => {
    setState({
      focusPass: false,
    });
  };
  const onFocusPass = () => {
    setState({
      focusPass: true,
    });
  };
  const onFocusConfirm = () => {
    setState({
      focusConfirm: true,
    });
  };
  const handleChangeNewPass = (e) => {
    if (e?.target?.value?.length >= 6) {
      setState({
        successPassword: true,
        newPass: e.target.value,
        matKhauMoierror: false,
      });
    } else {
      setState({
        matKhauMoierror: true,
        successPassword: false,
        newPass: e.target.value,
      });
    }
  };
  const handleChangeOldPass = (e) => {
    if (!e.target.value?.length) {
      setState({ oldPassErrors: true });
    } else {
      setState({ oldPassErrors: false });
    }
  };
  const hanldeChangeConfirmPass = (e) => {
    if (state?.newPass?.length > 5 && state.newPass === e.target.value) {
      setState({
        successConfirmPass: true,
        passConfirm: e.target.value,
        confirmPassworderror: false,
      });
    } else {
      setState({
        confirmPassworderror: true,
        successConfirmPass: false,
        passConfirm: e.target.value,
      });
    }
  };
  const onSave = (e) => {
    setState({ isLoading: true });
    form.validateFields().then((values) => {
      const convertData = {
        matKhauCu: MD5(values.matKhauCu).toString(),
        matKhauMoi: MD5(values.matKhauMoi).toString(),
        taiKhoan: auth?.username,
      };
      changePassword(convertData).then((s) => {
        if (s.code == 0) {
          message.success("Thay ?????i m???t kh???u th??nh c??ng!");
          setState({
            isLoading: false,
            successConfirmPass: false,
            show: false,
          });
          setTimeout(() => {
            onLogout();
          }, 1000);
        } else {
          setState({
            isLoading: false,
          });
        }
      });
    });
  };
  const hanleCancel = () => {
    setState({
      show: false,
    });
    form.resetFields();
  };
  const onfocusOldPassword = () => {
    setState({ focusOldPassword: true });
  };
  const onBlurOldPassWord = () => {
    setState({ focusOldPassword: false });
  };
  const onValuesChange = (values) => {
    // Object.keys(values).forEach((field) => {
    //   const error = form.getFieldError(field);
    //   if (!error.length) {
    //     setState({
    //       [field + "error"]: false,
    //     });
    //     return;
    //   }
    //   setState({
    //     [field + "error"]: true,
    //   });
    // });
  };
  return (
    <Main>
      <Modal
        visible={state.show}
        onCancel={() => {
          setState({ show: false });
        }}
        style={{ width: "480xp", height: 440 }}
        onOk={() => {
          setState({ show: false });
        }}
        footer={null}
        closeIcon={true}
        closable={true}
      >
        <GlobalStyle />
        <Form
          onValuesChange={onValuesChange}
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          layout="vertical"
          onFinish={onSave}
          //   onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="title">?????i m???t kh???u</div>
          <Form.Item
            label="M???t kh???u c??"
            name="matKhauCu"
            rules={[{ required: true, message: "Vui l??ng nh???p m???t kh???u c??!" }]}
          >
            <InputSearch
              focus={state.focusOldPassword}
              error={state.oldPassErrors}
            >
              <Icon component={IconPass} className="icon-pass"></Icon>
              <Input.Password
                autoFocus={true}
                ref={refOldPassword}
                onChange={handleChangeOldPass}
                onFocus={onfocusOldPassword}
                onBlur={onBlurOldPassWord}
              />
            </InputSearch>
          </Form.Item>
          <Form.Item
            label="M???t kh???u m???i"
            name="matKhauMoi"
            rules={[
              { required: true, message: "Vui l??ng nh???p m???t kh???u m???i!" },
              {
                min: 6,
                message: "M???t kh???u ph???i c?? ??t nh???t 6 k?? t???!",
              },
            ]}
          >
            <InputSearch focus={state.focusPass} error={state.matKhauMoierror}>
              <Icon component={IconPass} className="icon-pass"></Icon>
              <Input.Password
                ref={refPassword}
                onBlur={onBlurPass}
                onFocus={onFocusPass}
                onChange={handleChangeNewPass}
              />
              {(state.successPassword || state.successConfirmPass) && (
                <Icon className="icon-success" component={IconSucces} />
              )}
            </InputSearch>
          </Form.Item>

          <Form.Item
            label="Nh???p l???i m???t kh???u m???i"
            name="confirmPassword"
            rules={[
              { required: true, message: "Vui l??ng nh???p l???i m???t kh???u!" },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("matKhauMoi") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("M???t kh???u m???i kh??ng tr??ng kh???p!");
                },
              }),
            ]}
          >
            <InputSearch
              focus={state.focusConfirm}
              error={state.confirmPassworderror}
            >
              <Icon component={IconPass} className="icon-pass"></Icon>
              <Input.Password
                ref={refConfirmPassword}
                onBlur={onBlurConfirm}
                onFocus={onFocusConfirm}
                onChange={hanldeChangeConfirmPass}
              />
              {state.successConfirmPass && (
                <Icon className="icon-success" component={IconSucces} />
              )}
            </InputSearch>
          </Form.Item>
          <Form.Item>
            <div className="footer">
              <Button type="text" className="btn-cancel" onClick={hanleCancel}>
                <Icon component={IconArrowLeft} />
                <span>Quay l???i</span>
              </Button>
              <Button
                loading={state.isLoading}
                type="primary"
                htmlType="submit"
                className="btn-ok"
              >
                <span> L??u thay ?????i </span>
                <img
                  style={{ marginLeft: 6 }}
                  src={require("assets/images/kho/save.png")}
                  alt=""
                ></img>
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </Main>
  );
};

export default forwardRef(ModalChangePass);
