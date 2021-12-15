import React, { useEffect } from "react";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "@redux-store/reducers";
import "@styles/bootstrap-override.scss";
import "@styles/app.scss";
import stringUtils from "mainam-react-native-string-utils";
import Main from "./Main";
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-redux-multilingual';
import translations from './translations';
import { BrowserRouter } from "react-router-dom";
import RouterWithPaths from "@components/RouterWithPaths";
import { BackTop } from 'antd';
import './utils/validate';
import { ConfigProvider } from 'antd';
import vn from 'antd/lib/locale/vi_VN';
export const store = createStore(reducers, {}, window.__REDUX_DEVTOOLS_EXTENSION__ ?compose(compose(applyMiddleware(thunk)),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()):compose(applyMiddleware(thunk)));
const Kernel = (props) => {
  useEffect(() => {
    window.googleReCaptchaProps = props.googleReCaptchaProps;
  }, [props.googleReCaptchaProps]);
  return (
    <div>
      <ConfigProvider locale={vn}>
        {props.googleReCaptchaProps && (
          <Provider store={store}>
            <IntlProvider translations={translations} >
              <div className="app">
                <div className="main-content">
                  <BrowserRouter>
                    <RouterWithPaths
                      exact
                      path={"/*"}
                      render={(props) => {
                        return <Main {...props} />;
                      }}
                    />
                  </BrowserRouter>
                </div>
              </div>
            </IntlProvider>
          </Provider>
        )}
        <BackTop><i style={{
          fontSize: 40,
          fontWeight: "bold",
          color: "#09AAA8"
        }} className="fal fa-arrow-alt-from-bottom"></i></BackTop>
      </ConfigProvider>
    </div>
  )
};
export default Kernel;
