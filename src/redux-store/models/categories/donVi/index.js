import donViProvider from "data-access/categories/dm-don-vi-provider";
import { message } from "antd";
import cacheUtils from "utils/cache-utils";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import orderBy from "lodash/orderBy";

export default {
  state: {
    listDonVi: [],
    listAllDonVi: [],
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
    getListAllDonVi: (payload, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          let listAllDonVi = await cacheUtils.read(
            "",
            "DATA_ALL_DON_VI",
            [],
            false
          );
          dispatch.donVi.updateData({ listAllDonVi });
          donViProvider.searchAll().then((s) => {
            let { data } = s;
            data = orderBy(data, "ten", "asc");
            if (JSON.stringify(data) !== JSON.stringify(listAllDonVi)) {
              cacheUtils.save("", "DATA_ALL_DON_VI", data, false);
              dispatch.donVi.updateData({
                listAllDonVi: data,
              });
            }
          });
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      });
    },
    getListDonVi: async (payload = {}, state) => {
      try {
        const response = await donViProvider.search(payload);
        let {
          data: listDonVi,
          totalElements,
          message: messageInfo,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.donVi.search({
            page: page - 1,
            size,
          });
        }

        return dispatch.donVi.updateData({
          listDonVi,
          totalElements,
          page,
          size,
        });
      } catch (err) {
        message.error(err?.message.toString());
        return Promise.reject(err);
      }
    },
    createOrEdit: async (payload = {}, state) => {
      try {
        let response = {};
        if (payload.id) {
          response = await donViProvider.put(payload);
          dispatch.donVi.updateData({ dataEditDefault: response.data });
          message.success("C???p nh???t th??nh c??ng d??? li???u c?? quan ????n v???!");
        } else {
          response = await donViProvider.post(payload);

          message.success("Th??m m???i th??nh c??ng d??? li???u c?? quan ????n v???!");
        }
      } catch (err) {
        message.error(err?.message.toString());
        return Promise.reject(err);
      }
    },
    onDelete: async (payload, state) => {
      const {
        donVi: { page, size },
      } = state;
      const response = await donViProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("X??a b???n ghi th??nh c??ng");
        dispatch.donVi.search({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
