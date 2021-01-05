import { client, dataPath, formPath } from "client/request";
import {
  ETHNICITIES,
  COUNTRIES,
  HOSPITALS,
  UPLOAD_IMAGE,
} from "client/api";

export default {
  state: {
    ethnicities: [],
    hospitals: [],
    countries: [],
    patients: [],
    userInfoFull: {},
    departmentsUser: [],
    image: "",
    gender: [
      { id: 1, name: "Nam" },
      { id: 2, name: "Nữ" },
    ],
  }, // initial state
  reducers: {
    // handle state changes with pure functions
    incrementEthnicities(state, payload) {
      return { ...state, ethnicities: payload };
    },
    incrementHospitals(state, payload) {
      return { ...state, hospitals: payload };
    },
    incrementCountries(state, payload) {
      return { ...state, countries: payload };
    },

    incrementUserInfo(state, payload) {
      return { ...state, userInfo: payload };
    },
    incrementDepartmentsUser(state, payload) {
      return { ...state, departmentsUser: payload };
    },
    incrementImage(state, payload) {
      return { ...state, image: payload.data };
    },
  },
  effects: (dispatch) => ({
    async fetchEthnicities() {
      const res = await client.get(`${dataPath}${ETHNICITIES}`);
      dispatch.common.incrementEthnicities(res.data.data || []);
    },
    async fetchHospitals() {
      const res = await client.get(`${dataPath}${HOSPITALS}`);
      dispatch.common.incrementHospitals(res.data.data || []);
    },
    async fetchCountries() {
      const res = await client.get(`${dataPath}${COUNTRIES}`);
      dispatch.common.incrementCountries(res.data.data || []);
    },

    async uploadImage(file) {
      const dataForm = new FormData();
      dataForm.append("file", file);

      for (const name in file) {
        dataForm.append(name, file[name]);
      }
      dataForm.append("user", "hubot");
      const res = await client.post(`${formPath}${UPLOAD_IMAGE}`, dataForm, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      dispatch.common.incrementImage(res.data || []);
    },
  }),
};
