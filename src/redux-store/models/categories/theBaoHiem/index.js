import theBaoHiemProvider from "data-access/categories/dm-the-bao-hiem-provider";
import { message } from "antd";
import cacheUtils from "utils/cache-utils";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import orderBy from "lodash/orderBy";

export default {
  state: {
    listTheBaoHiem: [],
    listAllTheBaoHiem: [],
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
    getListAllTheBaoHiem: (payload, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          let listAllTheBaoHiem = await cacheUtils.read(
            "",
            "DATA_ALL_THE_BAO_HIEM",
            [],
            false
          );
          dispatch.theBaoHiem.updateData({ listAllTheBaoHiem });
          theBaoHiemProvider.searchAll().then((s) => {
            let { data } = s;
            data = orderBy(data, "ten", "asc");
            if (JSON.stringify(data) !== JSON.stringify(listAllTheBaoHiem)) {
              cacheUtils.save("", "DATA_ALL_THE_BAO_HIEM", data, false);
              dispatch.theBaoHiem.updateData({
                listAllTheBaoHiem: data,
              });
            }
          });
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      });
    },
    getListTheBaoHiem: async (payload = {}, state) => {
      try {
        const response = await theBaoHiemProvider.search(payload);
        let {
          data: listTheBaoHiem,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.listAllTheBaoHiem.getListTheBaoHiem({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.theBaoHiem.updateData({
          listTheBaoHiem,
          totalElements,
          page,
          size,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    createOrEdit: async (payload = {}, state) => {
      try {
        let response = {};
        if (payload.id) {
          response = await theBaoHiemProvider.put(payload);
          dispatch.theBaoHiem.updateData({
            dataEditDefault: response.data,
          });
          message.success("C???p nh???t th??nh c??ng d??? li???u th??? b???o hi???m!");
        } else {
          response = await theBaoHiemProvider.post(payload);
          message.success("Th??m m???i th??nh c??ng d??? li???u th??? b???o hi???m!");
        }
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    onDelete: async (payload, state) => {
      const {
        theBaoHiem: { page, size },
      } = state;
      const response = await theBaoHiemProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("X??a b???n ghi th??nh c??ng");
        dispatch.theBaoHiem.getListTheBaoHiem({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
