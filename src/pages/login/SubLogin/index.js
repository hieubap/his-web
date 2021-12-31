import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useQueryString } from "hook";
import { Main } from "./styled";
import { HOST } from "client/request";
const Login = (props) => {
  const [taiKhoan, settaiKhoan] = useState("");
  const [matKhau, setmatKhau] = useState("");
  const [redirect] = useQueryString("redirect", "");

  useEffect(() => {
    if (props.auth?.id) window.location.href = "/";
    props.getBenhVien();
  }, []);
  const login = () => {
    props
      .onLogin({ taiKhoan: taiKhoan.trim(), matKhau: matKhau?.toMd5() })
      .then(() => {
        if (props.history)
          props.history.replace(decodeURIComponent(redirect || "/"));
        else window.location.href = decodeURIComponent(redirect || "/");
      });
  };
  const onKeyDown = (e) => {
    if (
      e.nativeEvent.code == "Enter" &&
      taiKhoan &&
      taiKhoan.length &&
      matKhau &&
      matKhau.length
    ) {
      login();
    }
  };
  return (
    <Main>
      <div className="login-his">
        <div className="header">
          <a href="#" className="logo-main"></a>
        </div>
        <div className="head-login">
          <a href="#" className="logo-login">
            <img
              src={`${HOST}/api/his/v1/dm-thiet-lap/logo-benh-vien`}
              alt=""
              className="img-title"
            />
          </a>
          <h2 className="title-login">{props.benhVien?.ten}</h2>
        </div>
        <div className="login-inner">
          <div className="title-form-login">
            {/* <img src={require("assets/images/login/user-icon.png")} alt="" /> */}
            <h3>Hôm nay bạn thế nào?</h3>
            <h4>
              Vui lòng <b>Đăng nhập</b>
            </h4>
          </div>
          <div className="input-item">
            {/* <label className="label-input">Tên tài khoản</label> */}
            <div className="input-inner">
              <input
                onChange
                type="text"
                className="form-control"
                id="user"
                // autoComplete="off"
                placeholder="Tên tài khoản"
                onChange={(e) => settaiKhoan(e.target.value)}
                onKeyDown={onKeyDown}
              />
            </div>
            <img
              className="img-login-account"
              src={require("assets/images/login/icon_account.png")}
              alt="..."
            />
          </div>
          <div className="input-item">
            {/* <label className="label-input">Mật khẩu</label> */}
            <div className="input-inner">
              <input
                type="text"
                className="form-control"
                id="matKhau"
                autoComplete="off"
                placeholder="Mật khẩu"
                type="password"
                onChange={(e) => setmatKhau(e.target.value)}
                onKeyDown={onKeyDown}
              />
            </div>
            <img
              className="img-login-password"
              src={require("assets/images/login/icon_password.png")}
              alt="..."
            />
          </div>

          {/* <div className="input-item">
                            <label className="label-input">Nhớ tài khoản</label>
                            <div className="input-inner">
                                <div className="checkbox-login">
                                    <div className="checkbox-style">
                                        <input
                                            type="checkbox"
                                            id="checked-join1"
                                            className="checkbox"
                                        />
                                        <label for="checked-join1" className="after-checkbox"></label>
                                    </div>
                                </div>
                            </div>
                        </div> */}
          <div className="action">
            <button
              href="#"
              className="btn btn-login pull-right img-btn-login"
              onClick={login}
              className="btn-login"
            >
              {"Đăng nhập"}
              <img
                className="img-login"
                src={require("assets/images/login/icon-arrow-login.png")}
                alt="..."
              />
            </button>
          </div>
          <div>
            <img
              className="img-product"
              src={require("assets/images/login/img-product.png")}
              alt="..."
            />
          </div>
        </div>
      </div>
    </Main>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth.auth || {},
    benhVien: state.thietLap.benhVien || {},
  };
};

const mapDispatchToProps = ({
  auth: { onLogin },
  thietLap: { getBenhVien },
}) => ({
  onLogin,
  getBenhVien,
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
