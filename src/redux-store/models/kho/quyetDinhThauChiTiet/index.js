import quyetDinhThauChiTietProvider from "data-access/kho/quyet-dinh-thau-chi-tiet-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { combineSort } from "utils";

export default {
  state: {
    listQuyetDinhThauChiTiet: [],
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
    onSortChangeGetAll: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.quyetDinhThauChiTiet.dataSortColumn,
        ...payload,
      };
      dispatch.quyetDinhThauChiTiet.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.quyetDinhThauChiTiet.getAllListDichVuKho({
        page: 0,
        dataSortColumn,
      });
    },

    getAllListDichVuKho: ({ page = 0, ...payload }, state) => {
      const dataSearch =
        payload.dataSearch || state.quyetDinhThauChiTiet.dataSearch || {};
      let newState = { dataSearch, isLoading: true, page };
      dispatch.quyetDinhThauChiTiet.updateData(newState);
      let size = payload.size || state.quyetDinhThauChiTiet.size || 10;
      const sort = combineSort(
        payload.dataSortColumn ||
          state.quyetDinhThauChiTiet.dataSortColumn ||
          {}
      );

      quyetDinhThauChiTietProvider
        .searchAll({
          page,
          size,
          sort,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.quyetDinhThauChiTiet.updateData({
            listAllDichVuKho: (s?.data || []).map((item, index) => {
              item.index = page * size + index + 1;
              item.stt = page * size + index + 1;
              return item;
            }),
            isLoading: false,
            totalElements: s?.totalElements || 0,
            page,
            size,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.quyetDinhThauChiTiet.updateData({
            listAllDichVuKho: [],
            isLoading: false,
          });
        });
    },

    getListQuyetDinhThauChiTiet: async (payload = {}, state) => {
      const response = await quyetDinhThauChiTietProvider.search({
        sort: "createdAt,desc",
        ...payload,
      });
      let {
        code,
        data: listQuyetDinhThauChiTiet,
        totalElements,
        message: messageInfo,
        pageNumber: page,
        pageSize: size,
        numberOfElements,
      } = response;
      if (code !== 0) throw new Error(messageInfo);

      if (page > 0 && numberOfElements === 0) {
        return dispatch.quyetDinhThauChiTiet.getListQuyetDinhThauChiTiet({
          ...payload,
          page: page - 1,
          size,
        });
      }

      return dispatch.quyetDinhThauChiTiet.updateData({
        listQuyetDinhThauChiTiet,
        totalElements,
        page,
        size,
      });
    },

    createOrEdit: async (payload = {}, state) => {
      try {
        let response = {};
        if (payload.id) {
          response = await quyetDinhThauChiTietProvider.put(payload);
          if (response.code === 0) {
            dispatch.quyetDinhThauChiTiet.updateData({
              dataEditDefault: response.data,
            });
            message.success("Cập nhật thành công dữ liệu quyết định thầu");
          }
        } else {
          response = await quyetDinhThauChiTietProvider.post(payload);
          if (response.code === 0) {
            message.success("Thêm mới thành công dữ liệu quyết định thầu");
          }
        }

        const { code, message: messageInfo } = response;
        if (code !== 0) {
          message.error(messageInfo.toString());
        }
      } catch (err) {
        message.error(err.message.toString());
      }
    },
    onDelete: async (payload, state) => {
      const {
        quyetDinhThauChiTiet: { page, size },
      } = state;
      const response = await quyetDinhThauChiTietProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch.quyetDinhThauChiTiet.getListQuyetDinhThauChiTiet({
          page,
          size,
        });
      } else {
        message.error(messageInfo.toString());
      }
    },

    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.quyetDinhThauChiTiet.updateData(newState);
      let size = payload.size || state.quyetDinhThauChiTiet.size || 10;
      const sort = combineSort(
        payload.dataSortColumn ||
          state.quyetDinhThauChiTiet.dataSortColumn ||
          {}
      );
      const dataSearch = payload.dataSearch || state.xaTongHop.dataSearch || {};
      quyetDinhThauChiTietProvider
        .search({
          page,
          size,
          sort,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.quyetDinhThauChiTiet.updateData({
            listQuyetDinhThauChiTiet: (s?.data || []).map((item, index) => {
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
          dispatch.quyetDinhThauChiTiet.updateData({
            listQuyetDinhThauChiTiet: [],
            isLoading: false,
          });
        });
    },

    onChangeSort: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.quyetDinhThauChiTiet.dataSortColumn,
        ...payload,
      };
      dispatch.quyetDinhThauChiTiet.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.quyetDinhThauChiTiet.onSearch({
        page: 0,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.quyetDinhThauChiTiet.dataSearch || {}),
        ...payload,
      };
      dispatch.quyetDinhThauChiTiet.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.quyetDinhThauChiTiet.onSearch({
        page: 0,
        dataSearch,
      });
    },
    onChangeSize: ({ size }, state) => {
      dispatch.quyetDinhThauChiTiet.updateData({
        size,
        page: 0,
      });
      dispatch.quyetDinhThauChiTiet.onSearch({
        page: 0,
        size,
      });
    },
    getDetail: (id, state) => {
      return new Promise((resolve, reject) => {
        quyetDinhThauChiTietProvider
          .detail(id)
          .then(({ code, data, message: messageInfo }) => {
            if (code == 0) {
              resolve(data);
            } else reject(data);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
  }),
};
