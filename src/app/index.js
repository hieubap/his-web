import React, { useEffect } from "react";
import { connect } from "react-redux";

import { ThemeProvider } from "styled-components";
import { pink } from "themes";
import Layout from "app/Layout";
import LayoutLogin from "app/LayoutLogin";
import { Main, GlobalStyle } from "./styled";
import { ConfigProvider } from "antd";
import printUtils from "utils/print-utils";
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useQueryString } from "hook";

const App = (props) => {
  const [redirect] = useQueryString("redirect", "/");

  useEffect(() => {
    let data = localStorage.getItem("checkLogin");
    let checkLogin = data && JSON.parse(data);
    if (checkLogin) printUtils.settingPrint();

    if (
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/logout" &&
      (!props.auth || !props.auth?.access_token)
    ) {
      window.location.href =
        "/login?redirect=" + encodeURIComponent(window.location.href);
    }
  }, []);

  const logout = connect(null, ({ auth: { updateData } }) => ({ updateData }))(
    (props) => {
      props.updateData({ auth: null });
      localStorage.removeItem("auth");
      setTimeout(() => {
        window.location.href = "/login?redirect=" + redirect;
      }, 2000);
      return null;
    }
  );
  return (
    <ThemeProvider theme={pink}>
      <GlobalStyle />
      <ConfigProvider>
        <Switch>
          <Route path={"/logout"} component={logout} />
          <Main>
            {window.location.pathname.indexOf("login") >= 0 ? (
              <Route path={"/login"} component={LayoutLogin} />
            ) : (
              <Route path={"/"} component={Layout} />
            )}
          </Main>
        </Switch>
      </ConfigProvider>
    </ThemeProvider>
  );
};

const mapState = (state) => ({
  auth: state.auth.auth,
});

export default connect(mapState, null)(App);
