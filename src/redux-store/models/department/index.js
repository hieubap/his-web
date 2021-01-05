import cacheUtils from "utils/cache-utils";
import departmentProvider from "data-access/department-provider";
import authProvider from "data-access/auth-provider";
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
    getAllDepartments: async (payload, state) => {
      let userId = state.auth.auth?.id;
      let departments = await cacheUtils.read(
        userId,
        "DATA_DEPARTMENTS",
        [],
        false
      );
      dispatch.department.updateData({
        departments,
      });
      const getDepartment = () => {
        departmentProvider
          .search({ page: "0", active: true, sort: "name" })
          .then((s) => {
            let departments = (s?.data || []).map((item) => ({
              id: item.id,
              name: item.name,
            }));
            dispatch.department.updateData({
              departments,
            });
            cacheUtils.save(userId, "DATA_DEPARTMENTS", departments, false);
          });
      };
      let auth = state.auth.auth;
      if (auth && auth.id) {
        authProvider.getInfo(auth.id).then((s) => {
          let data = s.data;
          let roles = data.roles || [];
          let role = roles.find((item) => item.id === 1000000);
          if (role) getDepartment();
          else {
            let departments = data.departments || [];
            departments.sort((a, b) => {
              return a.name.localeCompare(b.name);
            });
            if (data.department) {
              departments = [data.department, ...departments];
              departments = departments.filter((item, index, self) => {
                return (
                  self.findIndex((item2) => item2.id === item.id) === index
                );
              });
            }
            departments = departments.map((item) => ({
              id: item.id,
              name: item.name,
            }));
            dispatch.department.updateData({
              departments,
            });
            cacheUtils.save(userId, "DATA_DEPARTMENTS", departments, false);
          }
        });
      }
    },
  }),
};
