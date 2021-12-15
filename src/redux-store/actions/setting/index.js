import settingProvider from "@data-access/setting-provider";
import snackbar from "@utils/snackbar-utils";
import stringUtils from "mainam-react-native-string-utils";
import moment from "moment";
import { Modal } from "antd";
import translate from "../../../translations";
import cacheProvider from "@data-access/datacache-provider";
const { confirm } = Modal;

function updateData(data) {
  return (dispatch) => {
    dispatch({
      type: "SETTING-UPDATA-DATA",
      data: data,
    });
  };
}
function onSearch(donViId) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      if (donViId) {
        let data = cacheProvider.read(donViId, "SETTING", []);
        settingProvider.search(donViId).then((s) => {
          if (s && s.code === 0) {
            dispatch(updateData({ data: s.data }));
            cacheProvider.save(donViId, "SETTING", s.data);
            resolve(s.data);
          } 
        });
        if (data.length) {
          dispatch(updateData({ donViId: donViId, data }));
          resolve(data);
        }
      } else {
        reject();
      }
    });
  };
}
function createOrEdit(data) {
  return (dispatch, getState) => {
    let intl = getState().Intl.locale;
    let dataTranslate = translate[intl];
    return new Promise((resolve, reject) => {
      let donViId = getState().setting.donViId;
      settingProvider
        .createOrEdit(data)
        .then((s) => {
          if (s.code == 0) {
            dispatch(
              updateData({
                params: [],
              })
            );
            snackbar.show(
              (dataTranslate.messages || {}).capnhatthietlapthanhcong,
              "success"
            );
            dispatch(onSearch(donViId));
            resolve(s.data);
          } else if (s.code === 1500) {
            snackbar.show(
              (dataTranslate.messages || {}).thietlaptontai,
              "danger"
            );
          } else {
            snackbar.show(
              s.message ||
                (dataTranslate.messages || {}).capnhatthietlapthatbai,
              "danger"
            );
            reject();
          }
        })
        .catch((e) => {
          snackbar.show(
            (dataTranslate.messages || {}).capnhatthietlapthatbai,
            "danger"
          );
          reject();
        });
    });
  };
}
export default {
  updateData,
  onSearch,
  createOrEdit,
};
