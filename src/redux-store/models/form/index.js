import { message } from "antd";
import cacheUtils from "utils/cache-utils";
import formProvider from "data-access/form-provider";
export default {
  state: {},
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getAllForm: async (payload = {}, state) => {
      let auth = state.auth.auth;
      if (auth && auth.id) {
        let listForms = await cacheUtils.read(auth.id, "DATA_FORM", [], false);
        dispatch.form.updateData({
          forms: listForms,
        });
        formProvider
          .getAllForm({
            page: "0",
            ...payload,
          })
          .then((s) => {
            listForms = (s.data || []).map((item) => ({
              id: item.id,
              name: item.name,
            }));
            dispatch.form.updateData({
              forms: listForms,
            });
            cacheUtils.save(auth.id, "DATA_FORM", listForms, false);
          });
      }
    },
    onCreate: (
      {
        ten = "",
        ma = "",
        active = false,
        hsdd = false,
        editor = false,
        formId = "",
      },
      state
    ) => {
      return new Promise((resolve, reject) => {
        dispatch.form.updateData({
          isLoadingCreate: true,
        });
        formProvider
          .createForm({ ten, ma, active, editor, hsdd, formId })
          .then((s) => {
            let total = state.form.total || 0;
            total += 1;
            let data = [s.data, ...(state.form.data || [])];
            dispatch.form.updateData({
              isLoadingCreate: false,
              total,
              data,
            });
            message.success("Thêm mới thành công");
            resolve(s?.data);
          })
          .catch((e) => {
            message.error(e?.message || "Tạo mới không thành công");
            dispatch.form.updateData({
              isLoadingCreate: false,
            });
            reject(e);
          });
      });
    },
    onUpdate: ({ id, ...payload }, state) => {
      return new Promise((resolve, reject) => {
        dispatch.form.updateData({
          isLoadingCreate: true,
        });
        formProvider
          .updateForm({ id, ...payload })
          .then((s) => {
            let data = (state.form.data || []).map((item) => {
              if (item.id === id) return s?.data || {};
              return item;
            });

            dispatch.form.updateData({
              isLoadingCreate: false,
              data,
            });
            message.success("Cập nhật thành công");
            resolve(s);
          })
          .catch((e) => {
            message.error(e?.message || "Cập nhật không thành công");
            dispatch.form.updateData({
              isLoadingCreate: false,
            });
            reject(e);
          });
      });
    },
    onDelete: (id) => {
      dispatch.form.updateData({
        isLoadingCreate: true,
      });
      formProvider
        .deleteForm(id)
        .then((s) => {
          dispatch.form.updateData({
            isLoadingCreate: false,
          });
          message.success("Xoá thành công");
        })
        .catch((e) => {
          message.error(e?.message || "Xoá không thành công");
          dispatch.form.updateData({
            isLoadingCreate: false,
          });
        });
    },
    onSizeChange: ({ size = 10, ma = "", ten = "", active, loaiHoSoBaId }) => {
      dispatch.form.updateData({
        size,
        page: 0,
        data: [],
      });
      dispatch.form.onSearch({
        page: 0,
        reset: true,
        ma,
        ten,
        active,
        loaiHoSoBaId,
      });
    },
    onSearch: async (
      {
        page,
        ma = "",
        ten = "",
        reset = false,
        timKiem = "",
        active,
        loaiHoSoBaId,
      },
      state
    ) => {
      let newState = { isLoading: true };
      if (reset) newState.data = [];
      dispatch.form.updateData(newState);
      let size = state.form.size || 10;
      formProvider
        .search({
          ma,
          ten,
          timKiem,
          page: page + "",
          size: size,
          sort: "ten",
          active,
          loaiHoSoBaId,
        })
        .then((s) => {
          dispatch.form.updateData({
            isLoading: false,
            data: s?.data || [],
            page,
            total: s?.totalElements || 0,
          });
        })
        .catch((e) => {
          dispatch.form.updateData({
            isLoading: false,
          });
          message.error(
            e?.message || "Tải danh sách biểu mẫu không thành công"
          );
        });
    },
  }),
};
