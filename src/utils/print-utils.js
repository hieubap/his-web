import { PRINT_HOST, HOST, dataPath } from "client/request";
import { SETTING_PRINT } from "client/api";
import axios from "axios";

export default {
  settingPrint() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ "url": HOST });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    localStorage.setItem("checkLogin", false);
    fetch(`${PRINT_HOST}${dataPath}${SETTING_PRINT}/thiet-lap`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
};
