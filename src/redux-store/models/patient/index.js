import { message } from "antd";
import patientProvider from "data-access/patient-provider";
export default {
  state: {
    patient: {},
    patientDocument: null,
    patientHistory: {},
    patientType: "outPatient",
    medicalCodeList: [],
    patients: [],
    isLoadingSearchPatients: false,
    searchParams: {},
  }, // initial state
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },

    updatePatientDocument(state, payload) {
      return { ...state, patientDocument: payload };
    },
    incrementInPatients(state, payload) {
      return { ...state, patients: payload };
    },
  },
  effects: (dispatch) => ({
    searchPatient: ({ exact, ...payload }) => {
      return new Promise((resolve, reject) => {
        dispatch.patient.updateData({
          isLoadingSearchPatient: true,
        });
        patientProvider
          .searchPatient(payload)
          .then((s) => {
            if (s.data && (!exact || s.data.length === 1) && s.data[0]) {
              let newState = { isLoadingSearchPatient: false };
              newState.patient = s.data[0] || {};
              dispatch.patient.updatePatientDocument((s.data[0] || {}).maHoSo);
              dispatch.patient.updateData(newState);
              resolve(s.data[0]);
              return;
            } else {
              dispatch.patient.updateData({ isLoadingSearchPatient: false });
              // message.error(
              //   res?.data?.message || "Không tìm thấy thông tin bệnh nhân"
              // );
              reject();
            }
          })
          .catch((e) => {
            // message.error(e?.message || "Không tìm thấy thông tin bệnh nhân");
            dispatch.patient.updateData({
              isLoadingSearchPatient: false,
            });
            reject();
          });
      });
    },
    getMedicalCodeList: (patientValue) => {
      return new Promise((resolve, reject) => {
        patientProvider
          .searchEmrPatient({
            page: 0,
            size: 9999,
            patientValue,
          })
          .then((s) => {
            dispatch.patient.updateData({ medicalCodeList: s.data });
          });
      });
    },
    uploadAvatar: ({ fileUpload, id, ...payload }, state) => {
      return new Promise(async (resolve, reject) => {
        dispatch.patient.updateData({
          isUploadingAvatar: true,
        });
        patientProvider
          .uploadAvatar({
            fileUpload,
            id,
          })
          .then((s) => {
            let patient = state.patient.patient || {};
            patient.avatar = s.data;
            let patients = state.patient.patients || {};
            patients = patients.map((item) => {
              if (item.id === id) item.avatar = s.data;
              return item;
            });

            dispatch.patient.updateData({
              patient: { ...patient },
              isUploadingAvatar: false,
            });
            message.success("Upload ảnh thành công!");
            resolve(true);
          })
          .catch((e) => {
            message.error(e.message || "Upload ảnh không thành công!");
            dispatch.patient.updateData({
              isUploadingAvatar: false,
            });
            reject();
          });
      });
    },
    selectPatient: (payload) => {
      dispatch.patient.updateData({
        patient: payload,
        patientDocument: payload?.maHoSo,
      });
    },
    clearPatient: () => {
      dispatch.patient.updateData({
        patient: null,
      });
    },
    onSizeChange: ({ size = 10, ...payload }) => {
      dispatch.patient.updateData({
        size,
        page: 0,
        data: [],
      });
      dispatch.patient.onSearch({
        page: 0,
        reset: true,
        ...payload,
      });
    },
    onSearch: ({ reset, page, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        let newState = { isLoadingSearchPatients: true, data: [] };
        dispatch.patient.updateData(newState);
        let size = state.patient.size || 10;
        let timKiem = state.patient.timKiem;
        let khoaId = state.patient.khoaId;
        let phongId = state.patient.phongId;
        patientProvider
          .searchPatient({
            page: page + "",
            size: size,
            timKiem,
            khoaId,
            phongId,
            ...payload,
          })
          .then((s) => {
            dispatch.patient.updateData({
              isLoadingSearchPatients: false,
              patients: s?.data || [],
              page,
              total: s?.totalElements || 0,
              ...payload,
            });
            resolve(s?.data);
          })
          .catch((e) => {
            dispatch.patient.updateData({
              isLoadingSearchPatients: false,
            });
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            reject(e);
          });
      });
    },
  }),
};
