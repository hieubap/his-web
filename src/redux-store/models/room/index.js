import cacheUtils from "utils/cache-utils";
import roomProvider from "data-access/room-provider";
export default {
  state: {
    rooms: [],
  }, // initial state
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getAllRoomsManager: async ({ departmentId, userId }, state) => {
      let rooms = await cacheUtils.read(
        departmentId + "_" + userId,
        "DATA_ROOMS",
        [],
        false
      );
      dispatch.room.updateData({
        rooms,
      });
      roomProvider
        .search({
          page: "0",
          active: true,
          khoaId: departmentId,
          userId: userId,
          sort: "name",
        })
        .then((s) => {
          rooms = (s?.data || []).map((item) => ({
            id: item.id,
            name: item.name,
          }));
          dispatch.room.updateData({
            rooms,
          });
          cacheUtils.save(
            departmentId + "_" + userId,
            "DATA_ROOMS",
            rooms,
            false
          );
        })
        .catch((e) => {
          dispatch.room.updateData({
            rooms: [],
          });
        });
    },
    getAllRoomsAdmin: async ({ departmentId, ...payload }, state) => {
      let rooms = await cacheUtils.read("", "DATA_ROOMS", [], false);
      dispatch.room.updateData({
        rooms,
      });
      const param = {
        page: "0",
        sort: "name",
        active: true,
        ...payload,
      };
      if (departmentId instanceof Array) {
        param.departmentIds = departmentId.join(",");
      } else {
        param.departmentId = departmentId;
      }

      roomProvider
        .searchAdminRoom(param)
        .then((s) => {
          let rooms = (s?.data || []).map((item) => ({
            id: item.id,
            name: item.name,
          }));
          dispatch.room.updateData({
            rooms,
          });
          cacheUtils.save("", "DATA_ROOMS", rooms, false);
        })
        .catch((e) => {
          dispatch.room.updateData({
            rooms: [],
          });
        });
    },
    getAllRooms: async ({ departmentId, userId }, state) => {
      const { authorities = [] } = state.auth.auth || {};
      const roleAdmin = authorities.find((item) => item === "ROLE_IsofhAdmin");
      if (roleAdmin) dispatch.room.getAllRoomsAdmin({ departmentId });
      else {
        dispatch.room.getAllRoomsManager({
          departmentId,
          userId,
        });
      }
    },
  }),
};
