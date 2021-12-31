import donViTinhProvider from "data-access/categories/dm-don-vi-tinh-provider";
import nhomDonViTinhProvider from "data-access/categories/dm-nhom-don-vi-tinh-provider";
import { message } from "antd";
import cacheUtils from "utils/cache-utils";

export default {
  state: {
    listGroupUnit: [],
    totalUnit: null,
    pageUnit: 0,
    sizeUnit: 10,
    totalGroupUnit: null,
    pageGroupUnit: 0,
    sizeGroupUnit: 10,
    dataEditGroupUnitDefault: {},
    dataEditUnitDefault: {},
    dataSearchGroupUnit: {},
    dataSortGroupUnit: null,
    dataSearchUnit: {},
    dataSortUnit: null,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getListDonViTinh: async (payload = {}, state) => {
      let listAllDonViTinh = await cacheUtils.read(
        "DATA_DON_VI_TINH",
        "",
        [],
        false
      );
      dispatch.donViTinh.updateData({ listAllDonViTinh });
      donViTinhProvider
        .search({ page: "0", active: true, size: 9999 })
        .then((s) => {
          let data = (s?.data || []).map((item, index) => {
            const { ma, ten, id } = item;
            return {
              ma,
              ten,
              id,
            };
          });
          if (JSON.stringify(data) !== JSON.stringify(listAllDonViTinh)) {
            dispatch.donViTinh.updateData({ listAllDonViTinh: data });
            cacheUtils.save("DATA_DON_VI_TINH", "", data, false);
          }
        });
    },
    getListDonViTinhTongHop: async (payload = {}, state) => {
      let listAllDonViTinh = await cacheUtils.read(
        "DATA_DON_VI_TINH",
        "",
        [],
        false
      );
      dispatch.donViTinh.updateData({ listAllDonViTinh });
      donViTinhProvider
        .searchTongHop({ page: "0", active: true, size: 9999 })
        .then((s) => {
          let data = (s?.data || []).map((item, index) => {
            const { ma, ten, id } = item;
            return {
              ma,
              ten,
              id,
            };
          });
          if (JSON.stringify(data) !== JSON.stringify(listAllDonViTinh)) {
            dispatch.donViTinh.updateData({ listAllDonViTinh: data });
            cacheUtils.save("DATA_DON_VI_TINH", "", data, false);
          }
        });
    },

    searchNhomDonViTinh: async (payload = {}, state) => {
      const { pageGroupUnit: page, sizeGroupUnit: size, ...rest } = payload;
      const response = await nhomDonViTinhProvider.search({
        ...rest,
        page,
        size,
      });
      let {
        code,
        data: listGroupUnit,
        totalElements: totalGroupUnit,
        message: messageInfo,
        pageNumber: pageGroupUnit,
        pageSize: sizeGroupUnit,
        numberOfElements,
      } = response;
      if (code !== 0) throw new Error(messageInfo);

      if (pageGroupUnit > 0 && numberOfElements === 0) {
        return dispatch.donViTinh.searchDonViTinh({
          ...payload,
          pageGroupUnit: pageGroupUnit - 1,
          sizeGroupUnit,
        });
      }

      listGroupUnit = listGroupUnit.map((item, index) => ({
        ...item,
        action: item,
        stt: pageGroupUnit * sizeGroupUnit + index + 1,
      }));
      return dispatch.donViTinh.updateData({
        listGroupUnit,
        totalGroupUnit,
        pageGroupUnit,
        sizeGroupUnit,
      });
    },

    searchTongHopDonViTinh: async (payload = {}, state) => {
      const { pageUnit: page, sizeUnit: size, ...rest } = payload;
      const response = await donViTinhProvider.searchTongHop({
        ...rest,
        page,
        size,
      });
      let {
        code,
        data: listUnit,
        totalElements: totalUnit,
        message: messageInfo,
        pageNumber: pageUnit,
        pageSize: sizeUnit,
        numberOfElements,
      } = response;
      if (code !== 0) throw new Error(messageInfo);

      if (page > 0 && numberOfElements === 0) {
        return dispatch.donViTinh.searchTongHopDonViTinh({
          ...payload,
          pageUnit: pageUnit - 1,
          sizeUnit,
        });
      }
      listUnit = listUnit.map((item, index) => ({
        ...item,
        action: item,
        stt: pageUnit * sizeUnit + index + 1,
      }));
      return dispatch.donViTinh.updateData({
        listUnit,
        totalUnit,
        pageUnit,
        sizeUnit,
      });
    },
    getAllUnit: async (payload = {}, state) => {
      const { pageUnit: page, sizeUnit: size, ...rest } = payload;
      const response = await donViTinhProvider.searchTongHop({
        page,
        size,
        ...rest,
      });
      let {
        code,
        data: listUnit,
        totalElements: totalUnit,
        message: messageInfo,
        pageNumber: pageUnit,
        pageSize: sizeUnit,
        numberOfElements,
      } = response;
      if (code !== 0) throw new Error(messageInfo);
      listUnit = listUnit.map((item, index) => ({
        ...item,
        action: item,
        stt: pageUnit * sizeUnit + index + 1,
      }));
      return dispatch.donViTinh.updateData({
        AllUnit: listUnit,
      });
    },
    searchDonViTinh: async (payload = {}, state) => {
      const { pageUnit: page, sizeUnit: size, ...rest } = payload;
      const response = await donViTinhProvider.search({
        ...rest,
        page,
        size,
      });
      let {
        code,
        data: listUnit,
        totalElements: totalUnit,
        message: messageInfo,
        pageNumber: pageUnit,
        pageSize: sizeUnit,
        numberOfElements,
      } = response;

      if (code !== 0) throw new Error(messageInfo);
      if (page > 0 && numberOfElements === 0) {
        return dispatch.donViTinh.searchDonViTinh({
          ...payload,
          pageUnit: pageUnit - 1,
          sizeUnit,
        });
      }
      listUnit = listUnit.map((item, index) => ({
        ...item,
        action: item,
        stt: pageUnit * sizeUnit + index + 1,
      }));
      return dispatch.donViTinh.updateData({
        listUnit,
        totalUnit,
        pageUnit,
        sizeUnit,
      });
    },

    createOrEditNhomDonViTinh: async (payload = {}, state) => {
      try {
        let response = {};
        if (payload.id) {
          response = await nhomDonViTinhProvider.put(payload);
          dispatch.donViTinh.updateData({
            dataEditGroupUnitDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu nhóm đơn vị tính!");
        } else {
          response = await nhomDonViTinhProvider.post(payload);
          if (response.code === 0) {
            message.success("Thêm mới thành công dữ liệu nhóm đơn vị tính!");
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
    createOrEditDonViTinh: async (info = {}, state) => {
      try {
        const { callback, ...payload } = info;
        let response = {};
        if (payload.id) {
          response = await donViTinhProvider.put(payload);
          dispatch.donViTinh.updateData({
            dataEditUnitDefault: response.data,
          });
          message.success("Cập nhật thành công dữ liệu đơn vị tính!");
        } else {
          response = await donViTinhProvider.post({
            ...payload,
          });
          if (response.code === 0) {
            message.success("Thêm mới thành công dữ liệu đơn vị tính!");
          }
        }

        const { code, message: messageInfo } = response;
        if (code !== 0) {
          message.error(messageInfo.toString());
        }
        callback();
      } catch (err) {
        message.error(err.message.toString());
      }
    },
  }),
};
