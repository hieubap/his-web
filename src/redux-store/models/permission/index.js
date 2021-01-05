import {
  client,
  medicinePath,
} from "client/request";
import {
  PERMISSIONLIST
} from "client/api";
import { combineUrlParams } from "utils";
import {applications} from "mokup";

export default  {
  state: {
    permissionList: [],
    applications: [],
    appValue: null
  },
  reducers: {
    initPermissionList(state, payload){
      return {...state, permissionList: payload}
    },
    initListApplications(state, payload){
      return {...state, applications: payload}
    },
    initAppValue(state, payload){
      return {...state, appValue: payload}
    }
  },
  effects: (dispatch) => ({
    async getListPermission(payload){
      const res = await client.get(
        combineUrlParams(`${medicinePath}${PERMISSIONLIST}`, {
          page: "0",
          ...payload,
        })
      );
      dispatch.permission.initPermissionList(res.data.data);
    },
    async getApplications(){
      const res = applications;
      dispatch.permission.initListApplications(res);
    },
    async getAppValue(payload){
      dispatch.permission.initAppValue(payload);
    }
  })
}