import dsBenhNhanProvider from "data-access/nb-dv-cdha-tdcn-pt-tt-provider";
import { message } from "antd";
import { combineSort } from "utils";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";

export default {
  state: {
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    listData: [],
    // dataSortColumn: { active: 2, ma: 1, updatedOn: 2 },
    dataSortColumn: { active: 2 },
    thongTinBenhNhan: [],
    listNbTiepTheo: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ dataSearch, ...rest }, state) => {
      dispatch.dsBenhNhan.updateData({
        page: 0,
        ...rest,
      });
      dispatch.dsBenhNhan.onSearch({ rest });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let paramCheck = ["/chan-doan-hinh-anh/cho-tiep-don"].includes(
        window.location.pathname
      );

      let newState = { isLoading: true, page };
      dispatch.dsBenhNhan.updateData(newState);
      let size = payload.size || state.dsBenhNhan.size || 10;
      const sort = combineSort(
        payload.dataSortColumn || state.dsBenhNhan.dataSortColumn || {}
      );
      const dataSearch =
        payload.dataSearch || state.dsBenhNhan.dataSearch || {};

      let dsNhomDichVuCap2Id = "";
      let dsKhoaThucHienId = "";
      let dsPhongThucHienId = "";
      if (paramCheck) {
        dsNhomDichVuCap2Id =
          payload.dsNhomDichVuCap2Id || state.dsBenhNhan?.dsNhomDichVuCap2Id;
        dsKhoaThucHienId =
          payload.dsKhoaThucHienId || state.dsBenhNhan?.dsKhoaThucHienId;
      } else {
        dsPhongThucHienId =
          payload.dsPhongThucHienId || state.dsBenhNhan?.dsPhongThucHienId;
      }
      dsBenhNhanProvider
        .getDanhSachBNCLS({
          page,
          size,
          sort,
          dsNhomDichVuCap2Id,
          dsKhoaThucHienId,
          dsPhongThucHienId,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.dsBenhNhan.updateData({
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
          dispatch.dsBenhNhan.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },
    onSortChange: ({ ...payload }, state) => {
      const dataSortColumn = {
        ...state.dsBenhNhan.dataSortColumn,
        ...payload,
      };
      dispatch.dsBenhNhan.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.dsBenhNhan.onSearch({
        page: 0,
        dataSortColumn,
      });
    },
    onChangeInputSearch: ({ ...payload }, state) => {
      const dataSearch = {
        ...(state.dsBenhNhan.dataSearch || {}),
        ...payload,
      };
      debugger
      dispatch.dsBenhNhan.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.dsBenhNhan.onSearch({
        page: 0,
        dataSearch,
      });
    },
    getTongHopDichVuCLS: (benhNhanID) => {
      if (!benhNhanID) {
        dispatch.dsBenhNhan.updateData({
          thongTinBenhNhan: {},
        });
        return;
      }
      dsBenhNhanProvider
        .getTongHopDichVuCLS(benhNhanID)
        .then((s) => {
          dispatch.dsBenhNhan.updateData({
            thongTinBenhNhan: s?.data,
          });
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          dispatch.dsBenhNhan.updateData({
            thongTinBenhNhan: [],
          });
        });
    },
    getNbTiepTheo: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        dsBenhNhanProvider
          .getNbTiepTheo(payload)
          .then((s) => {
            let data = s?.data || [];
            dispatch.chanDoanHinhAnh.updateData({
              listNbTiepTheo: data,
            });
          })
          .catch((e) => {
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
  }),
};
