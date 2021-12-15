import cacheUtils from "utils/cache-utils";
import quocGiaProvider from "data-access/categories/dm-quoc-gia-provider";
import tinhProvider from "data-access/categories/dm-tinh-provider";
import quanHuyenProvider from "data-access/categories/dm-quan-huyen-provider";
import xaPhuongProvider from "data-access/categories/dm-xa-phuong-provider";
import { message } from "antd";
import { SORT_DEFAULT } from "constants/page/therapyConstant";
import orderBy from "lodash/orderBy";

export default {
  state: {
    listQuocGia: [],
    totalElements: null,
    pageQuocGia: 0,
    sizeQuocGia: 10,
    datagetListQuocGia: {},
    dataSortQuocGia: { ...SORT_DEFAULT },
    //
    listTinh: [],
    totalElements: null,
    pageTinh: 0,
    sizeTinh: 10,
    dataSearchTinh: {},
    dataSortTinh: SORT_DEFAULT,
    //
    listQuanHuyen: [],
    totalElements: null,
    pageQuanHuyen: 0,
    sizeQuanHuyen: 10,
    dataSearchQuanHuyen: {},
    dataSortQuanHuyen: SORT_DEFAULT,
    //
    listXaPhuong: [],
    totalElements: null,
    pageXaPhuong: 0,
    sizeXaPhuong: 10,
    dataSearchXaPhuong: {},
    dataSortXaPhuong: SORT_DEFAULT,
    //
    listAllQuocGia: [],
    listAllTinh1: [],
    listAllTinh: [],
    listAllQuanHuyen: [],
    listAllXaPhuong: [],
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getListAllQuocGia: () => {
      return new Promise(async (resolve, reject) => {
        try {
          let listAllQuocGia = await cacheUtils.read(
            "",
            "DATA_ALL_QUOC_GIA",
            [],
            false
          );
          dispatch.ttHanhChinh.updateData({ listAllQuocGia });
          quocGiaProvider.searchAll().then((s) => {
            let { data } = s;
            data = orderBy(data, "ten", "asc");
            if (JSON.stringify(data) !== JSON.stringify(listAllQuocGia)) {
              cacheUtils.save("", "DATA_ALL_QUOC_GIA", data, false);
              dispatch.ttHanhChinh.updateData({
                listAllQuocGia: data,
              });
              resolve();
            }
          });
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      });
    },
    getListAllTinh: () => {
      return new Promise(async (resolve, reject) => {
        try {
          let listAllTinh = await cacheUtils.read(
            "",
            "DATA_ALL_TINH",
            [],
            false
          );
          dispatch.ttHanhChinh.updateData({ listAllTinh });
          tinhProvider.searchAll().then((s) => {
            let { data } = s;
            data = orderBy(data, "ten", "asc");
            if (JSON.stringify(data) !== JSON.stringify(listAllTinh)) {
              cacheUtils.save("", "DATA_ALL_TINH", data, false);
              dispatch.ttHanhChinh.updateData({
                listAllTinh: data,
              });
            }
            resolve();
          });
        } catch (err) {
          message.error(err.message.toString());
          reject(err);
        }
      });
    },
    getListQuocGia: async (payload = {}, state) => {
      try {
        const { pageQuocGia: page, sizeQuocGia: size, ...rest } = payload;
        payload = { page, size, ...rest };
        const response = await quocGiaProvider.search(payload);
        let {
          data,
          totalElements: totalQuocGia,
          pageNumber: pageQuocGia,
          pageSize: sizeQuocGia,
          numberOfElements,
        } = response;

        const listQuocGia = (data || []).map((item, index) => {
          item.index = pageQuocGia * sizeQuocGia + index + 1;
          return item;
        });

        if (pageQuocGia > 0 && numberOfElements === 0) {
          return dispatch.ttHanhChinh.getListQuocGia({
            ...payload,
            pageQuocGia: pageQuocGia - 1,
            sizeQuocGia,
          });
        }

        return dispatch.ttHanhChinh.updateData({
          listQuocGia,
          totalQuocGia,
          pageQuocGia,
          sizeQuocGia,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    getListQuocGiaTongHop: async (payload = {}, state) => {
      try {
        const { pageQuocGia: page, sizeQuocGia: size, ...rest } = payload;
        payload = { page, size, ...rest };
        const response = await quocGiaProvider.searchTongHop(payload);
        let {
          data,
          totalElements: totalQuocGia,
          pageNumber: pageQuocGia,
          pageSize: sizeQuocGia,
          numberOfElements,
        } = response;

        const listQuocGia = (data || []).map((item, index) => {
          item.index = pageQuocGia * sizeQuocGia + index + 1;
          return item;
        });

        if (pageQuocGia > 0 && numberOfElements === 0) {
          return dispatch.ttHanhChinh.getListQuocGiaTongHop({
            ...payload,
            pageQuocGia: pageQuocGia - 1,
            sizeQuocGia,
          });
        }

        return dispatch.ttHanhChinh.updateData({
          listQuocGia,
          totalQuocGia,
          pageQuocGia,
          sizeQuocGia,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    createOrEditQuocGia: async (payload = {}, state) => {
      let response = {};
      try {
        if (payload.id) {
          response = await quocGiaProvider.put(payload);
          dispatch.ttHanhChinh.updateData({
            dataEditQuocGiaDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu quốc gia!");
        } else {
          response = await quocGiaProvider.post(payload);
          dispatch.ttHanhChinh.updateData({
            dataSortQuocGia: {
              createdAt: 2,
            },
          });
          message.success("Thêm mới thành công dữ liệu quốc gia!");
        }
        return response?.data;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },
    getListTinh: async (payload = {}, state) => {
      try {
        const response = await tinhProvider.search({
          ...payload,
          active: true,
        });
        let { data: listAllTinh1 } = response;
        return dispatch.ttHanhChinh.updateData({
          listAllTinh1,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    searchTinh: async (payload = {}, state) => {
      try {
        const { pageTinh: page, sizeTinh: size, ...rest } = payload;
        payload = { page, size, ...rest };
        const response = await tinhProvider.search(payload);
        let {
          data: listTinh,
          totalElements: totalTinh,
          pageNumber: pageTinh,
          pageSize: sizeTinh,
          numberOfElements,
        } = response;

        if (pageTinh > 0 && numberOfElements === 0) {
          return dispatch.ttHanhChinh.searchTinh({
            ...payload,
            pageTinh: pageTinh - 1,
            sizeTinh,
          });
        }

        return dispatch.ttHanhChinh.updateData({
          listTinh,
          totalTinh,
          pageTinh,
          sizeTinh,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    createOrEditTinh: async (payload = {}, state) => {
      let response = {};
      try {
        if (payload.id) {
          response = await tinhProvider.put(payload);
          dispatch.ttHanhChinh.updateData({
            dataEditTinhDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu tỉnh!");
        } else {
          response = await tinhProvider.post(payload);
          dispatch.ttHanhChinh.updateData({
            dataSortTinh: {
              createdAt: 2,
            },
          });
          message.success("Thêm mới thành công dữ liệu tỉnh!");
        }
        return response?.data;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },
    getListHuyen: async (payload = {}, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          const quocGiaId = state.xaTongHop.dataSearch["quocGiaId"] || null;
          const response = await quanHuyenProvider.search({
            quocGiaId,
            ...payload,
            active: true,
          });
          let { data: listAllQuanHuyen } = response;
          dispatch.ttHanhChinh.updateData({
            listAllQuanHuyen,
          });
          resolve();
        } catch (err) {
          message.error(err.message.toString());
          reject(err);
        }
      });
    },
    getListHuyenTongHop: async (payload = {}, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          const quocGiaId = state.xaTongHop.dataSearch["quocGiaId"] || null;
          const response = await quanHuyenProvider.searchTongHop({
            quocGiaId,
            ...payload,
            active: true,
          });
          let { data: listAllQuanHuyen } = response;
          dispatch.ttHanhChinh.updateData({
            listAllQuanHuyen,
          });
          resolve();
        } catch (err) {
          message.error(err.message.toString());
          reject(err);
        }
      });
    },
    searchQuanHuyen: async (payload = {}, state) => {
      try {
        const { pageQuanHuyen: page, sizeQuanHuyen: size, ...rest } = payload;
        payload = { page, size, ...rest };
        const response = await quanHuyenProvider.search(payload);
        let {
          data: listQuanHuyen,
          totalElements: totalQuanHuyen,
          pageNumber: pageQuanHuyen,
          pageSize: sizeQuanHuyen,
          numberOfElements,
        } = response;

        if (pageQuanHuyen > 0 && numberOfElements === 0) {
          return dispatch.ttHanhChinh.searchQuanHuyen({
            ...payload,
            pageQuanHuyen: pageQuanHuyen - 1,
            sizeQuanHuyen,
          });
        }

        return dispatch.ttHanhChinh.updateData({
          listQuanHuyen,
          totalQuanHuyen,
          pageQuanHuyen,
          sizeQuanHuyen,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    createOrEditQuanHuyen: async (payload = {}, state) => {
      const { page, size, dataSortColumn, dataSearch } = state.huyenTongHop;
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            quanHuyenProvider
              .put(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu quận/huyện!");
                dispatch.ttHanhChinh.updateData({
                  dataEditQuanHuyenDefault: s?.data,
                });

                dispatch.huyenTongHop.onSearch({
                  page,
                  size,
                  dataSortColumn,
                  dataSearch,
                });
                resolve(s);
              })
              .catch((e) => {
                reject(e);
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              });
          } else {
            quanHuyenProvider
              .post(payload)
              .then((s) => {
                message.success("Thêm mới thành công dữ liệu quận/huyện!");
                dispatch.huyenTongHop.updateData({
                  currentItem: null,
                  dataSortQuanHuyen: {
                    createdAt: 2,
                  },
                });

                dispatch.huyenTongHop.onSearch({
                  page,
                  size,
                  dataSortColumn: {
                    createdAt: 2,
                  },
                  dataSearch,
                });
                resolve(s);
              })
              .catch((e) => {
                reject(e);
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              });
          }
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
    getListXaPhuong: async (payload = {}, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await xaPhuongProvider.search({
            ...payload,
            active: true,
          });
          let { data: listAllXaPhuong } = response;
          dispatch.ttHanhChinh.updateData({
            listAllXaPhuong,
          });
          resolve();
        } catch (err) {
          message.error(err.message.toString());
          reject(err);
        }
      });
    },
    getListXaPhuongTongHop: async (payload = {}, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await xaPhuongProvider.searchTongHop({
            ...payload,
            active: true,
          });
          let { data: listAllXaPhuong } = response;
          dispatch.ttHanhChinh.updateData({
            listAllXaPhuong,
          });
          resolve();
        } catch (err) {
          message.error(err.message.toString());
          reject(err);
        }
      });
    },
    searchXaPhuong: async (payload = {}, state) => {
      try {
        const { pageXaPhuong: page, sizeXaPhuong: size, ...rest } = payload;
        const response = await xaPhuongProvider.search({
          ...rest,
          page,
          size,
        });
        let {
          data: listXaPhuong,
          totalElements: totalXaPhuong,
          pageNumber: pageXaPhuong,
          pageSize: sizeXaPhuong,
          numberOfElements,
        } = response;

        if (pageXaPhuong > 0 && numberOfElements === 0) {
          return dispatch.ttHanhChinh.searchXaPhuong({
            ...payload,
            pageXaPhuong: pageXaPhuong - 1,
            sizeXaPhuong,
          });
        }

        return dispatch.ttHanhChinh.updateData({
          listXaPhuong,
          totalXaPhuong,
          pageXaPhuong,
          sizeXaPhuong,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    createOrEditXaPhuong: async (payload = {}, state) => {
      const {
        page,
        size,
        dataSortColumn = SORT_DEFAULT,
        dataSearch,
      } = state.xaTongHop;
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            xaPhuongProvider
              .put(payload)
              .then((s) => {
                message.success("Cập nhật thành công dữ liệu xã/Phường!");

                dispatch.ttHanhChinh.updateData({
                  dataEditXaPhuongDefault: s?.data,
                });
                dispatch.xaTongHop.onSearch({
                  page,
                  size,
                  dataSortColumn,
                  dataSearch,
                });
                resolve(s);
              })
              .catch((e) => {
                reject(e);
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              });
          } else {
            xaPhuongProvider
              .post(payload)
              .then((s) => {
                message.success("Thêm mới thành công dữ liệu xã/Phường!");
                dispatch.xaTongHop.updateData({
                  currentItem: null,
                  createdAt: 2,
                });
                dispatch.xaTongHop.onSearch({
                  page,
                  size,
                  dataSortColumn,
                  dataSearch,
                });
                resolve(s);
              })
              .catch((e) => {
                reject(e);
                message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
              });
          }
        } catch (err) {
          message.error(err?.message.toString());
          return Promise.reject(err);
        }
      });
    },
  }),
};
