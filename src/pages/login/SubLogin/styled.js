import styled from "styled-components";

const Main = styled.div`
  .login-his {
    background-image: url(/assets/images/login/bg_login_sakura.png);
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    /* height: 100vh; */
    height: 890px;
  }

  .login-his .login-inner {
    /* background-color: #fff;
  box-shadow: 0 0 50px #ddd;  */
    border-radius: 20px;
    padding: 30px 80px;
    width: 70%;
    margin: auto;
    padding-left: 0px;
    padding-right: 0px;
  }

  .img-title {
    cursor: pointer;
    width: 148.76px;
    object-fit: contain;
    height: 99px;
  }

  .live-search-btn {
    border-radius: 0;
    height: 40px;
    border: none;
    border-bottom: 1px solid #ddd;
  }
  .login-his .live-search-btn {
    background-color: #fff;
    border-color: #ccc;
    color: #333;
    width: 100%;
    text-align: left;
    height: 35px;
  }
  .login-his .live-search-btn .caret {
    color: #1985d9;
  }
  .login-his .head-login {
    text-align: center;
  }
  .login-his .input-inner .checkbox-login {
    display: inline-block;
    width: 48%;
    margin-top: 11px;
  }
  .login-his .checkbox-login .checkbox-style {
    display: inline-block;
    width: 19px;
    height: 19px;
    background-color: #3c6eb7;
    position: relative;
    border-radius: 4px;
  }
  .login-his .checkbox-login .label-check {
    display: inline-block;
    vertical-align: middle;
    margin-top: -5px;
  }
  .login-his .title-login {
    color: #172B4D;
    font-size: 36px;
    text-transform: uppercase;
    font-weight: 900;
    margin-bottom: 40px;
    line-height: 49px;
    font-family: Nunito Sans;
    font-style: normal;
  }
  .login-his .checkbox-login .checkbox {
    position: absolute;
    width: 100%;
    height: 100%;
    margin-top: 0;
    opacity: 0;
  }
  .login-his .checkbox-style .after-checkbox:before {
    content: "\f00c";
    font-family: FontAwesome;
    position: absolute;
    left: 3px;
    font-size: 13px;
    top: 1px;
    color: #fff;
    opacity: 0;
  }
  .login-his .checkbox-login .checkbox:checked + .after-checkbox:before {
    opacity: 1;
  }

  .login-his .btn-login {
    background-image: url(/assets/images/login/icon-arrow-login.png);
    background-color: #0762f7;
    color: #fff;
    display: inline-block;
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 8px;
    margin-top: 50px;
    height: 36px;
    mix-blend-mode: normal;
    box-shadow: 1px 2px #191313;
  }

  .img-login {
    font-size: 10px;
    width: 20px;
    margin: 5px;
  }

  .img-product {
    position: absolute;
    width: 169px;
    height: 19px;
    left: 338px;
    top: 650px;
  }

  .img-login-account {
    font-size: 10px;
    width: 20px;
    margin: 6px;
    position: absolute;
    left: 80.67%;
    right: 16.67%;
    top: 345px;
    bottom: 8.33%;
  }
  .img-login-password {
    font-size: 10px;
    width: 20px;
    margin: 6px;
    position: absolute;
    left: 80.67%;
    right: 16.67%;
    top: 404px;
    bottom: 8.33%;
    height: 20px;
  }
  .login-his .btn-login:focus {
    outline: 0;
  }
  .login-his .action {
    text-align: right;
  }
  .login-his .action::after {
    content: "";
    display: table;
    clear: both;
  }
  .login-his .live-search-btn .caret {
    margin-left: 0;
    float: right;
    margin-top: 8px;
  }
  .login-his .live-search {
    width: 100%;
    padding: 15px;
    max-height: 375px;
    overflow-y: auto;
  }
  .login-his .live-search .live-search-box {
    margin-bottom: 20px;
  }
  .login-his .live-search li {
    padding: 10px 0;
    border-top: 1px dashed #dedede;
  }
  .login-his .title-form-login {
    text-align: center;
  }

  .login-his .title-form-login h3 {
    text-transform: uppercase;
    display: inline-block;
    margin-left: 20px;
    vertical-align: middle;
    margin-top: 10px;
    text-transform: unset;
    margin-bottom: 0px;
    font-family: Nunito Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 33px;
    text-align: center;
    letter-spacing: 0.01em;
    position: static;
    width: 249px;
    height: 33px;
    left: 77.5px;
    top: 0px;
  }

  .login-his .title-form-login h4 {
    font-size: 27px;
    font-weight: 700;
    text-transform: uppercase;
    display: inline-block;
    margin-left: 20px;
    vertical-align: middle;
    text-transform: inherit;
    font-size: 44px;
    font-family: Nunito Sans;
    font-style: normal;
    font-weight: normal;
    line-height: 60px;
    /* identical to box height */
    letter-spacing: 0.01em;

    /* /#172B4D (Màu chữ chính) */
    color: #172b4d;

    /* Inside Auto Layout */
    flex: none;
    order: 1;
    flex-grow: 0;
    margin: 0px 0px;
  }
  .login-his .input-item:after {
    content: "";
    display: table;
    clear: both;
  }
  .login-his .input-item {
    margin-top: 20px;
  }
  .login-his .input-item .form-control {
    height: 40px;
    box-shadow: none;
    border: none;
    border-bottom: 1px solid #ddd;
    border-radius: 3px;
    display: block;
    width: 100%;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
  }
  .login-his .input-item .form-control:focus {
    border-color: #1985d9;
    background-color: #f7f7f7;
    outline: 0;
  }
  .input-item .label-input {
    float: left;
    width: 20%;
    height: 40px;
    line-height: 40px;
  }
  .input-item .input-inner {
    float: left;
    width: 100%;
  }
  .btn-login {
    width: 100%;
    padding-left: 0px;
    padding-right: 0px;
    border-right-width: 0px;
    border-left-width: 0px;
  }
  .img-btn-login {
    width: 100%;
    height: 36px;
  }
  @media (max-width: 1600px) {
    .login-his .title-login {
      font-size: 30px;
      margin-top: 0;
    }
    .login-his .login-inner {
      padding: 20px;
    }
    .img-login-account {
      font-size: 10px;
      width: 20px;
      margin: 6px;
      position: absolute;
      left: 75.67%;
      right: 16.67%;
      bottom: 8.33%;
      top: 305px;
    }
    .img-login-password {
      font-size: 10px;
      width: 20px;
      margin: 6px;
      position: absolute;
      left: 75.67%;
      right: 16.67%;
      top: 41.04%;
      bottom: 8.33%;
      height: 20px;
    }
    .img-product {
      position: absolute;
      width: 169px;
      height: 19px;
      left: 208px;
      top: 650px;
    }
  }
  @media (max-width: 1433px) {
    .login-his .title-login {
      font-size: 30px;
      margin-top: 0;
    }
    .login-his .login-inner {
      padding: 20px;
    }
    .img-login-account {
      font-size: 10px;
      width: 20px;
      margin: 6px;
      position: absolute;
      left: 75.67%;
      right: 16.67%;
      bottom: 8.33%;
      top: 396px;
    }
    .img-login-password {
      font-size: 10px;
      width: 20px;
      margin: 6px;
      position: absolute;
      left: 75.67%;
      right: 16.67%;
      top: 454px;
      bottom: 8.33%;
      height: 20px;
    }
  }
`;

export { Main };
