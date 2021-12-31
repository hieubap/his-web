import dmDoiTacProvider from "data-access/categories/dm-doi-tac-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";

export default {
  state: {
    listServicesPack: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ size }, state) => {
      dispatch.doiTac.updateData({
        size,
        page: 0,
      });
      dispatch.doiTac.onSearch({ page: 0, size });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.doiTac.updateData(newState);
      let size = payload.size || state.doiTac.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.doiTac.dataSortColumn || {}
      );
      const dataSearch = payload.dataSearch || state.doiTac.dataSearch || {};

      dmDoiTacProvider
        .search({ page, size, sort, ...dataSearch })
        .then((s) => {
          dispatch.doiTac.updateData({
            listData: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              return item;
            }),
            isLoading: false,
            totalElements: s?.totalElements || 0,
            page,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.doiTac.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.doiTac.dataSortColumn,
        ...payload,
      };
      delete dataSortColumn.createdAt;
      dispatch.doiTac.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.doiTac.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.doiTac.dataSearch || {}),
        ...payload,
      };
      dispatch.doiTac.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.doiTac.onSearch({
        page: 0,
        dataSearch,
      });
    },

    createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            dmDoiTacProvider
              .update(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu đối tác!");

                let data = (state.doiTac.listData || []).map((item) => {
                  if (item.id == s.data?.id) {
                    s.data.index = item.index;
                    return s.data;
                  }
                  return item;
                });
                dispatch.doiTac.updateData({
                  currentItem: s?.data || [],
                  listData: data,
                });
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              });
          } else {
            dmDoiTacProvider
              .create(payload)
              .then((s) => {
                message.success("Thêm mới thành công dữ liệu đối tác!");
                dispatch.doiTac.updateData({
                  currentItem: null,
                  dataSortColumn: {
                    createdAt: 2,
                  },
                });
                dispatch.doiTac.onSearch({
                  page: 0,
                });
              })
              .catch((e) => {
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              });
          }
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
    onDelete: async (payload, state) => {
      const {
        doiTac: { page, size },
      } = state;
      const response = await dmDoiTacProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.doiTac.getListServicesPack({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
