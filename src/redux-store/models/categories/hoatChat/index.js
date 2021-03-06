import hoatChatProvider from "data-access/categories/dm-hoat-chat-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
export default {
  state: {
    listHoatChat: [],
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
    searchHoatChat: async (payload = {}, state) => {
      try {
        const response = await hoatChatProvider.search({
          sort: "active,desc&createdAt,desc&ma,asc",
          ...payload,
        });
        let {
          data: listHoatChat,
          totalElements,
          message: messageInfo,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.hoatChat.searchHoatChat({
            ...payload,
            page: page - 1,
            size,
          });
        }

        dispatch.hoatChat.updateData({
          listHoatChat,
          totalElements,
          page,
          size,
        });
        return response;
      } catch (err) {
        message.error(err.message.toString());
        return err;
      }
    },
    searchHoatChatTongHop: async (payload = {}, state) => {
      try {
        const response = await hoatChatProvider.searchTongHop({
          sort: "active,desc&createdAt,desc&ma,asc",
          ...payload,
        });
        let {
          data: listHoatChat,
          totalElements,
          message: messageInfo,
          pageNumber: page,
          pageSize: size,
          numberOfElements,
        } = response;

        if (page > 0 && numberOfElements === 0) {
          return dispatch.hoatChat.searchHoatChatTongHop({
            ...payload,
            page: page - 1,
            size,
          });
        }

        dispatch.hoatChat.updateData({
          listHoatChat,
          totalElements,
          page,
          size,
        });
        return response;
      } catch (err) {
        message.error(err.message.toString());
        return err;
      }
    },
    createOrEdit: async (payload = {}, state) => {
      let response = {};
      try {
        if (payload.id) {
          response = await hoatChatProvider.put(payload);
          dispatch.hoatChat.updateData({
            dataEditDefault: response.data,
          });
          message.success("C???p nh???t th??nh c??ng d??? li???u ho???t ch???t!");
        } else {
          response = await hoatChatProvider.post(payload);
          message.success("Th??m m???i th??nh c??ng d??? li???u ho???t ch???t!");
        }
        return response?.data;
      } catch (err) {
        if (payload.id) {
          message.success(
            err.message.toString() ||
              "C???p nh???t kh??ng th??nh c??ng d??? li???u ho???t ch???t!"
          );
        } else {
          message.success(
            err.message.toString() ||
              "Th??m m???i kh??ng th??nh c??ng d??? li???u ho???t ch???t!"
          );
        }
        return Promise.reject();
      }
    },
    onDelete: async (payload, state) => {
      const {
        hoatChat: { page, size },
      } = state;
      const response = await hoatChatProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("X??a b???n ghi th??nh c??ng");
        dispatch.hoatChat.searchHoatChat({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
  }),
};
