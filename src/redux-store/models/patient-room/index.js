import { client, medicinePath } from "client/request";
import { SELECTNURSE } from "client/api";
import { combineUrlParams } from "utils";
import { message } from "antd";
import cacheUtils from "utils/cache-utils";
import authProvider from "data-access/auth-provider";
export default {
  state: {
    nurses: [],
    isLoadingNursingSelected: false,
    isLoadingNursing: false,
    isLoadingSelectAllNurse: false,
    isLoadingDeSelectAllNurse: false,
  }, // initial state
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getAllNursing: (payload, state) => {
      return new Promise(async (resolve, reject) => {
        let nursesAll = await cacheUtils.read("", "DATA_NURSING", [], false);
        dispatch.patientRoom.updateData({
          nursesAll: nursesAll || [],
          isLoadingNursing: true,
        });
        authProvider
          .search({
            page: "0",
            size: 9999,
            active: true,
            nurse: true,
            ...payload,
          })
          .then((s) => {
            nursesAll = (s?.data || []).map((item) => ({
              id: item.id,
              fullName: item.fullName,
              value: item.value,
              department: {
                id: item.department?.id,
                name: item.department?.name,
              },
              departmentId: item.departmentId,
            }));
            cacheUtils.save("", "DATA_NURSING", nursesAll, false);

            dispatch.patientRoom.updateData({
              isLoadingNursing: false,
              nursesAll,
            });
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
            dispatch.patientRoom.updateData({
              isLoadingNursing: false,
              nursesAll: nursesAll || [],
            });
          });
        let departmentId = state.patientRoom.departmentId;
        dispatch.patientRoom.getListNurseByDepartment({ departmentId });
      });
    },
    onSelectDepartment: ({ departmentId }, state) => {
      dispatch.patientRoom.updateData({
        departmentId,
        nursingSelected: [],
        roomId: null,
      });
      dispatch.room.getAllRoomsAdmin({ departmentId });
      dispatch.patientRoom.getListNurseByDepartment({ departmentId });
    },
    onSelectRoom: ({ roomId }, state) => {
      if (state.patientRoom.roomId !== roomId) {
        dispatch.patientRoom.updateData({
          roomId,
          nursingSelected: [],
        });
        dispatch.patientRoom.getNursingSelected({ phongId: roomId });
      }
    },
    onSelectNusing: async ({ nurseId }, state) => {
      dispatch.patientRoom.updateData({
        nurseId,
      });
      const res = await client.post(`${medicinePath}${SELECTNURSE}`, {
        userId: nurseId,
        phongId: state.patientRoom.roomId,
      });
      if (res?.data?.code === 0) {
        let roomId = state.patientRoom.roomId;
        const searchKey = state.patientRoom.searchKey;
        await dispatch.patientRoom.getNursingSelected({ phongId: roomId });
        dispatch.patientRoom.searchNurse({ timKiem: searchKey });
        message.success(`${res?.data?.message || "Lưu thành công"}`);
      } else {
        message.error(`${res?.data?.message}`);
      }
    },
    getNursingSelected: async (payload, rootState) => {
      dispatch.patientRoom.updateData({ isLoadingNursingSelected: true });
      const res = await client.get(
        combineUrlParams(`${medicinePath}${SELECTNURSE}`, {
          page: "0",
          size: 9999,
          ...payload,
          sort: "createdAt,desc",
        })
      );
      if (res?.data?.code === 0) {
        dispatch.patientRoom.updateData({
          isLoadingNursingSelected: false,
          nursingSelected: res?.data?.data || [],
        });
      } else {
        dispatch.patientRoom.updateData({
          isLoadingNursingSelected: false,
          nursingSelected: res?.data?.data || [],
        });
      }
    },

    getListNurseByDepartment: ({ departmentId }, state) => {
      return new Promise((resolve, reject) => {
        let nursesAll = state.patientRoom.nursesAll || [];
        //sort danh sách điều dưỡng sắp xếp tăng có khoa đang chọn lên đầu sort alphabet fullName
        let listAll = nursesAll.sort((a, b) => {
          if (a.departmentId === departmentId) {
            if (b.departmentId !== departmentId) return -1;
            else {
              return (a.fullName || "").createUniqueText() >
                (b.fullName || "").createUniqueText()
                ? 1
                : -1;
            }
          } else {
            if (b.departmentId === departmentId) {
              return 1;
            } else {
              return (a.fullName || "").createUniqueText() >
                (b.fullName || "").createUniqueText()
                ? 1
                : -1;
            }
          }
        });
        dispatch.patientRoom.updateData({
          nurses: [...listAll],
        });
      });
    },
    searchNurse: ({ timKiem = "" }, state) => {
      let nursingSelected = (state.patientRoom.nursingSelected || [])
        .map((item) => item?.user?.value)
        .filter((item) => item);
      let text = timKiem.toLowerCase().createUniqueText();
      let nurseSearch = (state.patientRoom.nurses || []).filter((item) => {
        let fullName = item?.fullName || "";
        let userName = item?.value || "";
        item.selected = false;
        if (nursingSelected.find((y) => y === userName)) {
          item.selected = true;
        }
        if (!text) return true;
        if (
          fullName.toLowerCase().createUniqueText().indexOf(text) !== -1 ||
          userName.toLowerCase().createUniqueText().indexOf(text) !== -1
        ) {
          return true;
        }
      });
      console.log(state.patientRoom.nurses, nurseSearch);
      dispatch.patientRoom.updateData({
        searchKey: timKiem,
        nurseSearch: [...nurseSearch],
      });
    },
    async selectAllNurse(payload, state) {
      dispatch.patientRoom.updateData({
        isLoadingSelectAllNurse: true,
      });
      const roomId = state.patientRoom.roomId;
      const nurseSearch = state.patientRoom.nurseSearch;
      const body = nurseSearch
        .filter((item) => !item.selected)
        .map((item) => ({
          userId: item.id,
          phongId: state.patientRoom.roomId,
        }));
      const res = await client.post(
        `${medicinePath}${SELECTNURSE}/batch`,
        body
      );
      if (res?.data?.code === 0) {
        message.success(`${res?.data?.message || "Lưu thành công"}`);
        await dispatch.patientRoom.getNursingSelected({ phongId: roomId });
        dispatch.patientRoom.searchNurse({ timKiem: "" });
      } else {
        message.error(`${res?.data?.message}`);
      }
      dispatch.patientRoom.updateData({
        isLoadingSelectAllNurse: false,
      });
    },
    async onDeleteNursing(payload, state) {
      const roomId = state.patientRoom.roomId;
      const searchKey = state.patientRoom.searchKey;
      await client.delete(`${medicinePath}${SELECTNURSE}/${payload}`);
      await dispatch.patientRoom.getNursingSelected({ phongId: roomId });
      dispatch.patientRoom.searchNurse({ timKiem: searchKey });
    },
    async onDeleteNurseAll(payload, state) {
      dispatch.patientRoom.updateData({
        isLoadingDeSelectAllNurse: true,
      });
      const roomId = state.patientRoom.roomId;
      const res = await client.delete(`${medicinePath}${SELECTNURSE}/batch`, {
        data: payload,
      });
      if (res?.data?.code === 0) {
        await dispatch.patientRoom.getNursingSelected({ phongId: roomId });
        dispatch.patientRoom.searchNurse({ timKiem: "" });
      } else {
        message.error(`${res?.data?.message}`);
      }
      dispatch.patientRoom.updateData({
        isLoadingDeSelectAllNurse: false,
      });
    },
  }),
};
