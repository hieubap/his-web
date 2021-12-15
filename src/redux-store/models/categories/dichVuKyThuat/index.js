import dichVuKyThuatProvider from "data-access/categories/dm-dv-ky-thuat-provider";
import dichVuKhoProvider from "data-access/categories/dm-dich-vu-kho-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT, SORT_DEFAULT_DICH_VU } from "constants/index";
import { combineSort } from "utils";
import cacheUtils from "utils/cache-utils";

export default {
  state: {
    listDichVuKyThuat: [],
    totalElements: null,
    page: PAGE_DEFAULT,
    size: PAGE_SIZE,
    dataEditDefault: {},
    dataSearch: {},
    dataSortColumn: SORT_DEFAULT_DICH_VU,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSizeChange: ({ size, loaiDichVu }, state) => {
      dispatch.dichVuKyThuat.updateData({
        size,
        page: 0,
      });
      dispatch.dichVuKyThuat.onSearch({ page: 0, size, loaiDichVu });
    },
    onSearch: ({ page = 0, ...payload }, state) => {
      let newState = { isLoading: true, page };
      dispatch.dichVuKyThuat.updateData(newState);
      let size = payload.size || state.dichVuKyThuat.size || 10;
      // let page = state.dichVuKyThuat.page || 0;
      const sort = combineSort(
        payload.dataSortColumn || state.dichVuKyThuat.dataSortColumn || {}
      );
      const loaiDichVu =
        payload.loaiDichVu || state.dichVuKyThuat.loaiDichVu || null;
      const dataSearch =
        payload.dataSearch || state.dichVuKyThuat.dataSearch || {};
      let provider = dichVuKyThuatProvider;
      switch (loaiDichVu) {
        case 10:
        case 20:
        case 30:
        case 40:
          provider = dichVuKyThuatProvider;
          break;
        case 120:
        case 110:
          provider = dichVuKhoProvider;
          break;
        default:
          provider = dichVuKyThuatProvider;
          break;
      }
      provider
        .search({
          page,
          size,
          sort,
          "dichVu.loaiDichVu": loaiDichVu,
          ...dataSearch,
        })
        .then((s) => {
          dispatch.dichVuKyThuat.updateData({
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
          dispatch.dichVuKyThuat.updateData({
            listData: [],
            isLoading: false,
          });
        });
    },

    onSortChange: ({ ...payload }, state, loaiDichVu) => {
      const dataSortColumn = {
        ...state.dichVuKyThuat.dataSortColumn,
        ...payload,
      };
      delete dataSortColumn.createdAt;
      dispatch.dichVuKyThuat.updateData({
        page: 0,
        dataSortColumn,
      });
      dispatch.dichVuKyThuat.onSearch({
        page: 0,
        loaiDichVu,
        dataSortColumn,
      });
    },

    onChangeInputSearch: ({ ...payload }, state, loaiDichVu) => {
      const dataSearch = {
        ...(state.dichVuKyThuat.dataSearch || {}),
        ...payload,
        "dichVu.dsNguonKhacChiTra":
          (payload["dichVu.dsNguonKhacChiTra"]?.length &&
            payload["dichVu.dsNguonKhacChiTra"]) ||
          null,
        dsDoiTuongSuDung:
          (payload["dsDoiTuongSuDung"]?.length &&
            payload["dsDoiTuongSuDung"]) ||
          null,
      };
      dispatch.dichVuKyThuat.updateData({
        page: 0,
        dataSearch,
      });
      dispatch.dichVuKyThuat.onSearch({
        page: 0,
        loaiDichVu,
        dataSearch,
      });
    },

    createOrEdit: (payload = {}, state, loaiDichVu) => {
      return new Promise((resolve, reject) => {
        let serviceName = "";
        switch (loaiDichVu) {
          case 10:
            serviceName = "dịch vụ khám bệnh";
            break;
          case 20:
            serviceName = "dịch vụ xét nghiệm";
            break;
          case 30:
            serviceName = "dịch vụ cận lâm sàng";
            break;
          case 40:
            serviceName = "phẫu thuật thủ thuật";
            break;
          case 110:
            serviceName = "hóa chất";
            break;
          case 120:
            serviceName = "chế phẩm máu";
            break;
          default:
            serviceName = "dịch vụ";
            break;
        }
        try {
          let provider = dichVuKyThuatProvider;
          switch (+loaiDichVu) {
            case 10:
            case 20:
            case 30:
            case 40:
              provider = dichVuKyThuatProvider;
              break;
            case 120:
            case 110:
              provider = dichVuKhoProvider;
              break;
            default:
              provider = dichVuKyThuatProvider;
              break;
          }
          if (payload.id) {
            provider
              .update(payload)
              .then((s) => {
                message.success(`Cập nhật thành công dữ liệu ${serviceName} !`);
                let data = (state.dichVuKyThuat.listData || []).map((item) => {
                  if (item.id === s.data?.id) {
                    s.data.index = item.index;
                    return s.data;
                  }
                  return item;
                });
                dispatch.dichVuKyThuat.updateData({
                  dataSortColumn: SORT_DEFAULT_DICH_VU,
                  listData: data.sort((a, b) => b.active - a.active),
                });
                resolve(s);
              })
              .catch((e) => {
                if (e.code === 1004) {
                  message.error(
                    (serviceName &&
                      `Đã tồn tại mã = ${payload.dichVu?.ma}, trong DM ${serviceName}`) ||
                      e.message
                  );
                } else {
                  message.error(
                    e?.message || "Xảy ra lỗi, vui lòng thử lại sau"
                  );
                }
              });
          } else {
            provider
              .create(payload)
              .then((s) => {
                message.success(`Thêm mới thành công dữ liệu ${serviceName}!`);
                dispatch.dichVuKyThuat.updateData({
                  currentItem: null,
                  dataSortColumn: {
                    createdAt: 2,
                  },
                });
                dispatch.dichVuKyThuat.onSearch({
                  page: 0,
                  loaiDichVu,
                });
                resolve(s);
              })
              .catch((e) => {
                if (e.code === 1004) {
                  message.error(
                    (serviceName &&
                      `Đã tồn tại mã = ${payload.dichVu?.ma}, trong DM ${serviceName}`) ||
                      e.message
                  );
                } else {
                  message.error(
                    e?.message || "Xảy ra lỗi, vui lòng thử lại sau"
                  );
                }
              });
          }
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },

    getAll: async ({ page = 0, size, active = true, ...payload }, state) => {
      let serviceName = "";
      let dataName = "";
      if (payload["dichVu.loaiDichVu"] === 20) {
        serviceName = "DATA_DICH_VU_XET_NGHIEM";
        dataName = "DVXetNghiem";
      }
      let userId = state.auth.auth?.id;
      let list = [];
      if (!size && page === 0) {
        list = await cacheUtils.read(userId, serviceName, [], false);
        dispatch.dichVuKyThuat.updateData({ [`listAll${dataName}`]: list });
      }
      return new Promise((resolve, reject) => {
        let provider = dichVuKyThuatProvider;
        switch (+payload["dichVu.loaiDichVu"]) {
          case 10:
          case 20:
          case 30:
          case 40:
            provider = dichVuKyThuatProvider;
            break;
          case 120:
          case 110:
            provider = dichVuKhoProvider;
            break;
          default:
            provider = dichVuKyThuatProvider;
            break;
        }
        provider
          .search({
            page,
            size: size || 99999,
            sort: "dichVu.ten,asc",
            active,
            ...payload,
          })
          .then((s) => {
            if (s?.code === 0) {
              let data = (s?.data || []).map((item, index) => {
                return {
                  ...item,
                  ten: item?.dichVu?.ten,
                  ma: item?.dichVu?.ma,
                  id: item?.dichVu?.id,
                  stt: page * size + index + 1,
                  thaotac: item,
                  key: index,
                };
              });
              if (JSON.stringify(data) !== JSON.stringify(list)) {
                console.log(dataName);
                dispatch.dichVuKyThuat.updateData({
                  [`listAll${dataName}`]: data,
                });
                if (!size && page === 0)
                  cacheUtils.save(userId, serviceName, data, false);
              }
              resolve(s);
            } else {
              reject(s);
              message.error(s?.message);
            }
          })
          .catch((e) => {
            reject(e);
            message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
          });
      });
    },
  }),
};
