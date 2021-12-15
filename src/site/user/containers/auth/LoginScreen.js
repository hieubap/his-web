import React, { useState, useEffect } from "react";
import "./css/main.scss";
import "./css/util.css";
import { connect } from "react-redux";
import authAction from "@actions/auth";
import actionIntl from "@actions/intl";
import dataCacheProvider from "@data-access/datacache-provider";
import { useDispatch } from "react-redux";
import { IntlActions } from "react-redux-multilingual";

function LoginScreen(props) {
  const dispatch = useDispatch();
  dispatch(IntlActions.setLocale("vi"));
  dataCacheProvider.save("", "INTL-UPDATE-DATA", "vi");
  props.updateDataIntl({
    locale: "vi",
  });
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const onLogin = () => {
    props.onLogin(username.trim(), password).then((s) => {
      window.location.href = "/check-in";
    });
  };
  useEffect(() => {
    if (props.auth && props.auth.id) {
      window.location.href = "/check-in";
    }
  }, []);

  const onKeyDown = (e) => {
    if (e.nativeEvent.code == "Enter") {
      onLogin();
    }
  };
  return (
    <div className="login-page">
      <div
        className="container-login100"
        style={{ backgroundImage: `url(${require("@images/bg_login.jpg")})` }}
      >
        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
          <span className="login100-form-title p-b-49">
            ĐĂNG NHẬP
          </span>
          <div
            className="wrap-input100 validate-input m-b-23"
            data-validate="Username is reauired"
          >
            <span className="label-input100"> Tài khoản</span>
            <input
              className="input100"
              type="text"
              name="username"
              // value={username}
              placeholder="Nhập tài khoản"
              onKeyDown={onKeyDown}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>

          <div
            className="wrap-input100 validate-input m-b-23"
            data-validate="Password is required"
          >
            <span className="label-input100">Mật khẩu</span>
            <input
              className="input100"
              type="password"
              name="pass"
              // value={password}
              placeholder="Nhập mật khẩu"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onKeyDown={onKeyDown}
            />
          </div>
          <div className="text-right p-t-8 p-b-31"></div>
          <div className="container-login100-form-btn">
            <div className="wrap-login100-form-btn">
              <div className="login100-form-bgbtn"></div>
              <button className="login100-form-btn" onClick={onLogin}>
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(
  (state) => ({
    auth: state.auth && state.auth.auth,
  }),
  {
    onLogin: authAction.onLogin,
    updateDataIntl: actionIntl.updateData,
  }
)(LoginScreen);
