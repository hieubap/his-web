import loaiBenhAnProvider from "data-access/categories/dm-loai-benh-an-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import cacheUtils from "utils/cache-utils";
import orderBy from "lodash/orderBy";

export default {
  state: {
    listAllLoaiBenhAn: [],
    listLoaiBenhAn: [],
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
    getListAllLoaiBenhAn: () => {
      return new Promise(async (resolve, reject) => {
        try {
          let listAllLoaiBenhAn = await cacheUtils.read(
            "",
            "DATA_ALL_LOAI_BENH_AN",
            [],
            false
          );
          dispatch.loaiBenhAn.updateData({ listAllLoaiBenhAn });
          loaiBenhAnProvider.searchAll().then((s) => {
            let { data } = s;
            data = orderBy(data, "ten", "asc");
            if (JSON.stringify(data) !== JSON.stringify(listAllLoaiBenhAn)) {
              cacheUtils.save("", "DATA_ALL_LOAI_BENH_AN", data, false);
              dispatch.loaiBenhAn.updateData({
                listAllLoaiBenhAn: data,
              });
            }
          });
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      });
    },
    getListLoaiBenhAn: async (payload = {}, state) => {
      try {
        const response = await loaiBenhAnProvider.search(payload);
        let {
          code,
          data: listLoaiBenhAn,
          totalElements,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.loaiBenhAn.getListLoaiBenhAn({
            ...payload,
            page: page - 1,
            size,
          });
        }

        return dispatch.loaiBenhAn.updateData({
          listLoaiBenhAn,
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
          response = await loaiBenhAnProvider.put(payload);
          if (response.code === 0) {
            dispatch.loaiBenhAn.updateData({ dataEditDefault: response.data });
            message.success("C???p nh???t th??nh c??ng d??? li???u lo???i b???nh ??n!");
          }
        } else {
          response = await loaiBenhAnProvider.post(payload);
          if (response.code === 0) {
            message.success("Th??m m???i th??nh c??ng d??? li???u lo???i b???nh ??n!");
          }
        }

        const { code, message: messageInfo } = response;
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject(err);
      }
    },
    onDelete: async (payload, state) => {
      const {
        loaiBenhAn: { page, size },
      } = state;
      const response = await loaiBenhAnProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("X??a b???n ghi th??nh c??ng");
        dispatch.loaiBenhAn.getPatient({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
