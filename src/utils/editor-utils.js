import { isObject, get } from "lodash";
import { getState } from "redux-store/stores";
export const combineFields = (json, result = {}, parentKey) => {
  const keys = json ? Object.keys(json) : [];

  keys.forEach((key) => {
    result[parentKey ? `${parentKey}_${key}` : key] = json[key] || "";

    if (isObject(json[key]) && !json[key].length) {
      combineFields(json[key], result, parentKey ? `${parentKey}_${key}` : key);
    }
  });

  return result;
};
export const checkComponentDisable = (
  auth = {},
  patient = {},
  itemProps = {},
  mode = "",
  signStatus = {},
  props = {}
) => {
  let disabled = false;

  let patientState = patient?.patientState;
  const FINISHED = 50;
  const APPOINTMENT_IS_PAID = 10;
  const APPOINTMENT_NOT_PAID = 20;
  const OUT_HOSPITAL = 90;
  const PAID_OUT = 110;
  const TEMP_OUT = 120;
  const NULL = 0;
  const arr = [
    FINISHED,
    APPOINTMENT_IS_PAID,
    APPOINTMENT_NOT_PAID,
    OUT_HOSPITAL,
    PAID_OUT,
    TEMP_OUT,
    // NULL,
  ];
  const { authorities = [] } = auth;
  let state = getState();
  const roleAdmin = authorities.find((item) => item === "ROLE_IsofhAdmin");
  let khoaThucHienId = state.files?.fileDataHIS?.khoaThucHienId;
  if (
    !roleAdmin &&
    (arr.includes(patientState) ||
      !(
        (auth.departmentIds || []).includes(patient.khoaId) ||
        (auth.departmentIds || []).includes(khoaThucHienId)
      ))
  ) {
    disabled = true;
  }
  disabled =
    disabled ||
    itemProps.disabled ||
    mode === "config" ||
    (Object.keys(signStatus).find((item) => {
      return signStatus[item].block;
    })
      ? true
      : false) ||
    (props.soCapKy &&
      itemProps.blockSignLevel &&
      props.soCapKy >= itemProps.blockSignLevel);

  return disabled;
};

export default {
  combineFields,
  checkComponentDisable,
};
