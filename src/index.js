import React, { Component } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {
  GoogleReCaptchaProvider,
  withGoogleReCaptcha,
} from "react-google-recaptcha-v3";

class ReCaptchaComponent extends Component {
  render() {
    return <App googleReCaptchaProps={this.props.googleReCaptchaProps} />;
  }
}
const YourReCaptchaComponent = withGoogleReCaptcha(ReCaptchaComponent);

ReactDOM.render(
  <GoogleReCaptchaProvider reCaptchaKey="6LcoWKUZAAAAAKIGNNqr4OULdTbmtclyUUx4fgU6">
    <YourReCaptchaComponent />
  </GoogleReCaptchaProvider>,
  document.getElementById("root")
);
// console.warn = () => {};
// console.error = () => {};


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
