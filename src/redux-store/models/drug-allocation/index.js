import { message } from "antd";
import drugProvider from "data-access/drug-provider";
import patientProvider from "data-access/patient-provider";
import { client, medicinePath } from "client/request";
import { FILE } from "client/api";
export default {
  state: {
    departments: [],
  }, // initial state
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSelectDepartment: ({ departmentId }, state) => {
      dispatch.drugAllocation.updateData({
        departmentId,
        roomId: null,
        rooms: [],
        patients: [],
      });
      let payload = {
        departmentId: departmentId,
      };
      const feature = state.drugAllocation.feature;
      if (feature === "allocation") {
        payload.userId = state.auth.auth?.id;
      }
      dispatch.room.getAllRooms(payload);
      dispatch.drugAllocation.onRefresh();
    },

    onSelectRoom: (roomId) => {
      dispatch.drugAllocation.updateData({
        roomId,
      });
      dispatch.drugAllocation.onRefresh();
    },
    onChangeDate: (date) => {
      dispatch.drugAllocation.updateData({
        date: date,
      });
      dispatch.drugAllocation.onRefresh();
    },
    onRefresh: (payload, state) => {
      let newData = {
        page: 0,
        finished: false,
        patients: [],
        isLoadingPatient: true,
        patient: null,
      };
      dispatch.drugAllocation.updateData(newData);
      dispatch.drugAllocation.onSearch(0);
    },
    onSearch: async (page, state) => {
      const {
        textSearch = "",
        departmentId = "",
        roomId = "",
        date = new Date(),
        size = 1000,
      } = state.drugAllocation;
      if (!departmentId) {
        return;
      }
      let newData = {
        isLoading: true,
        isRefreshing: false,
        isLoadMore: false,
      };
      if (page === 0) newData.isRefreshing = true;
      else newData.isLoadMore = true;
      dispatch.drugAllocation.updateData(newData);
      let userId = state.auth.auth?.id;
      let payload = {
        page: page + "",
        size: size + "",
        timKiem: textSearch,
        ngayYLenh: date.format("yyyy-MM-dd"),
        khoaId: departmentId,
        active: true,
        sort: "maHoSo,desc",
        ...(roomId ? { phongId: roomId } : {}),
      };
      const feature = state.drugAllocation.feature;
      if (feature === "allocation") {
        payload.userId = userId;
        payload.trongVien = true;
      } 
      patientProvider
        .searchDrugPatient(payload)
        .then((s) => {
          let data = state.drugAllocation.patients || [];
          let drugType = state.drugAllocation.drugType || 10;
          let newValues = {
            isLoadingPatient: false,
            isLoadMore: false,
            isRefreshing: false,
            page,
            drugType,
            finished: false,
          };

          if ((s?.data || []).length !== 0) {
            data = [...(page === 0 ? [] : data), ...(s?.data || [])];
            newValues.patients = data;
            dispatch.drugAllocation.updateData(newValues);
            if (page === 0 && !state.drugAllocation.patient) {
              dispatch.drugAllocation.onSelectPatient(data[0]);
            }
          } else {
            newValues.finished = true;
            if (page === 0) {
              newValues.drug10 = [];
              newValues.drug20 = [];
              newValues.patient = null;
            }
            dispatch.drugAllocation.updateData(newValues);
          }
        })
        .catch((e) => {
          dispatch.drugAllocation.updateData({
            isLoadingPatient: false,
            isLoadMore: false,
            isRefreshing: false,
          });
          message.error(e?.message || "Tải dữ liệu không thành công");
        });
    },
    onSelectPatient: (patient, state) => {
      dispatch.drugAllocation.updateData({
        patient,
      });
      dispatch.drugAllocation.onSearchDrug({
        drugType: 20,
      });
    },
    onSearchDrug: async ({ drugType }, state) => {
      const {
        date = new Date(),
        patient = {},
        departmentId,
      } = state.drugAllocation;

      dispatch.drugAllocation.updateData({
        showLoadingDrug: true,
        drugType,
        drug: null,
      });
      drugProvider
        .searchDrug({
          page: "0",
          patientHistoryId: patient.id,
          loaiThuoc: drugType,
          khoaId: departmentId,
          active: true,
          sort: "tenThuongMai",
          ngayThucHien: date.format("yyyy-MM-dd"),
          daPhat: true,
        })
        .then((s) => {
          const feature = state.drugAllocation.feature;
          dispatch.drugAllocation.updateData({
            showLoadingDrug: false,
            ["drug" + drugType]: (s?.data || []).filter((item) => {
              return feature === "distribution" || !item.daCapChoNb;
            }),
          });
        })
        .catch((e) => {
          dispatch.drugAllocation.updateData({
            showLoadingDrug: false,
          });
          message.error(e?.message || "Tìm kiếm thuốc không thành công");
        });
    },
    onChangeDrugType: (drugType, state) => {
      dispatch.drugAllocation.updateData({
        drugType: drugType,
        showLoadingDrug: true,
      });
      dispatch.drugAllocation.onSearchDrug({ drugType });
    },
    onAllocation: async (payload, state) => {
      let { drugType = 10 } = state.drugAllocation;
      let drugIds = state.drugAllocation["drug" + drugType]
        .filter((item) => !item.daCapChoNb)
        .map((item) => item.id);
      if (!drugIds.length) {
        message.error("Đã phát hết thuốc");
        return;
      }
      dispatch.drugAllocation.updateData({
        showLoadingDrug: true,
      });
      drugProvider
        .allocationDrug({
          ids: drugIds,
        })
        .then((s) => {
          dispatch.drugAllocation.updateData({
            showLoadingDrug: false,
            ["drug" + drugType]: state.drugAllocation["drug" + drugType].map(
              (item) => {
                item.daCapChoNb = true;
                return item;
              }
            ),
          });
          // dispatch.drugAllocation.onSearchDrug({ drugType });
          message.success("Phát thuốc thành công");
        })
        .catch((e) => {
          dispatch.drugAllocation.updateData({
            showLoadingDrug: true,
          });
          message.error(e?.message || "Phát thuốc không thành công");
        });
    },
    onViewDetailDrug: (drugId) => {
      return new Promise((resolve, reject) => {
        dispatch.drugAllocation.updateData({
          showLoadingDrug: true,
        });
        drugProvider
          .getDetail(drugId)
          .then((s) => {
            dispatch.drugAllocation.updateData({
              showLoadingDrug: false,
            });
            dispatch.drugAllocation.updateData({
              drug: s.data,
            });
            resolve(s.data);
          })
          .catch((e) => {
            dispatch.drugAllocation.updateData({
              showLoadingDrug: false,
            });
            message.error(
              e?.message || "Không thể hiển thị thông tin phát thuốc"
            );
            reject(e);
          });
      });
    },
    onExportDetailReport: ({
      tuNgay = new Date(),
      denNgay = new Date(),
      khoaIds = [],
      phongIds = [],
      trangThai,
      type,
    }) => {
      return new Promise((resolve, reject) => {
        dispatch.drugAllocation.updateData({
          isLoadingDetailReport: true,
        });
        drugProvider
          .getDetailReport({
            tuNgay: tuNgay.format("yyyy-MM-dd"),
            denNgay: denNgay.format("yyyy-MM-dd"),
            khoaIds: khoaIds.join(","),
            phongIds: phongIds.join(","),
            trangThai,
          })
          .then((s) => {
            let file = "";
            if (type === "pdf") file = s.data.pdf;
            else file = s.data.doc;
            client
              .get(`${medicinePath}${FILE}/${file}`, {
                responseType: "arraybuffer",
              })
              .then((s) => {
                dispatch.drugAllocation.updateData({
                  isLoadingDetailReport: false,
                });
                resolve(s.data);
              })
              .catch((e) => {
                dispatch.drugAllocation.updateData({
                  isLoadingDetailReport: false,
                });
                reject(e);
              });
          })
          .catch((e) => {
            dispatch.drugAllocation.updateData({
              isLoadingDetailReport: false,
            });
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },

    onExportSummaryReport: ({
      tuNgay = new Date(),
      denNgay = new Date(),
      khoaIds = [],
      phongIds = [],
      trangThai,
      type,
    }) => {
      return new Promise((resolve, reject) => {
        dispatch.drugAllocation.updateData({
          isLoadingSummaryReport: true,
        });
        drugProvider
          .getSummaryReport({
            tuNgay: tuNgay.format("yyyy-MM-dd"),
            denNgay: denNgay.format("yyyy-MM-dd"),
            khoaIds: khoaIds.join(","),
            phongIds: phongIds.join(","),
            trangThai,
          })
          .then((s) => {
            let file = "";
            if (type === "pdf") file = s.data.pdf;
            else file = s.data.doc;
            client
              .get(`${medicinePath}${FILE}/${file}`, {
                responseType: "arraybuffer",
              })
              .then((s) => {
                dispatch.drugAllocation.updateData({
                  isLoadingSummaryReport: false,
                });
                resolve(s.data);
              })
              .catch((e) => {
                dispatch.drugAllocation.updateData({
                  isLoadingSummaryReport: false,
                });
                reject(e);
              });
          })
          .catch((e) => {
            dispatch.drugAllocation.updateData({
              isLoadingSummaryReport: false,
            });
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
  }),
};
