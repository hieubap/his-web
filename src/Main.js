import React from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import RouterWithPaths from "@components/RouterWithPaths";
import Admin from "@admin";
import User from "@user";
import Auth from "@user/containers/auth/LoginScreen";
import { connect } from "react-redux";
import authAction from "@actions/auth";
import actionIntl from "@actions/intl";
import { IntlReducer as Intl, IntlProvider, IntlActions } from 'react-redux-multilingual';
import { useDispatch } from "react-redux";
import dataCacheProvider from '@data-access/datacache-provider';
import "./style.scss";

function Status({ code, children }) {
  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext) staticContext.status = code;
        return children;
      }}
    />
  );
}

function NotFound() {
  return (
    <>
      <Status code={404} />
      <h2>Not found</h2>;
    </>
  );
}
function App(props) {
  // localStorage.clear();
  const dispatch = useDispatch();
  let intl = props.dataIntl;
  if (!intl) {
    dispatch(IntlActions.setLocale("vi"));
    dataCacheProvider.save('', "INTL-UPDATE-DATA", "vi");
    actionIntl.updateData({
      locale: "vi"
    });
  } else if (intl !== props.intl) {
    dispatch(IntlActions.setLocale(intl));
  }
  const routers = [
    {
      path: ["/login"],
      component: Auth
    },
    {
      path: ["/print-the-khach", "/print/:id","/lich-su-check-in" ],
      component: User
    },
    {
      path: ["/", "/:function1", "/:function1/:id", "/:function1/:function2/:id"],
      component: Admin
    },
  ];

  return (
    <Switch>
      {routers.map((route, key) => {
        if (route.component)
          return (
            <RouterWithPaths
              exact
              key={key}
              path={route.path}
              render={(props) => {
                return <route.component {...props} />;
              }}
            />
          );
        return null;
      })}
      <Route component={NotFound} />
    </Switch>
  );
}

export default connect(
  state => ({
    auth: state.auth && state.auth.auth,
    intl: (state.Intl || {}).locale,
    dataIntl: state.dataIntl && state.dataIntl.locale
  }),
  {
    onLogin: authAction.onLogin,
    updateDataIntl: actionIntl.updateData,
  }
)(App);
