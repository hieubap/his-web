import { combineReducers } from "redux";
import auth from "./auth";
import ttHanhChinh from "./ttHanhChinh";
import address from "./address";
import report from "./report";
import users from "./users";
import dataIntl from "./intl";
import post from "./post";
import setting from "./setting";
import unit from "./unit";
import area from "./area";
import target from "./target";
import phone from "./phone";

import { IntlReducer as Intl } from "react-redux-multilingual";
export default combineReducers({
  auth,
  ttHanhChinh,
  address,
  report,
  users,
  Intl,
  dataIntl,
  post,
  setting,
  unit,
  area,
  target,
  phone,
});
