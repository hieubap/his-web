import quyetDinhThauProvider from "data-access/kho/quyet-dinh-thau-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";

export default {
  state: {
    listQuyetDinhThau: [],
    listAllQuyetDinhThau: [],
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
    getListAllQuyetDinhThau: (payload, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          quyetDinhThauProvider.searchAll().then((s) => {
            let { data } = s;
            dispatch.quyetDinhThau.updateData({ listAllQuyetDinhThau: data });
          });
        } catch (err) {
          message.error(err.message.toString());
          return Promise.reject(err);
        }
      });
    },

    searchById: async ({ id, ...payload }, state) => {
      return new Promise(async (resolve, reject) => {
        try {
          quyetDinhThauProvider.searchId({ id }).then((s) => {
            let { data } = s;
            resolve(data);
          });
        } catch (err) {
          message.error(err.message.toString());
          reject(err);
        }
      });
    },

    searchQuyetDinhThau: async (payload = {}, state) => {
      const response = await quyetDinhThauProvider.search({
        sort: "createdAt,desc",
        ...payload,
      });
      let {
        code,
        data: listQuyetDinhThau,
        totalElements,
        message: messageInfo,
        pageNumber: page,
        pageSize: size,
        numberOfElements,
      } = response;
      if (code !== 0) throw new Error(messageInfo);

      if (page > 0 && numberOfElements === 0) {
        return dispatch.quyetDinhThau.searchQuyetDinhThau({
          ...payload,
          page: page - 1,
          size,
        });
      }

      return dispatch.quyetDinhThau.updateData({
        listQuyetDinhThau,
        totalElements,
        page,
        size,
      });
    },

    createOrEdit: async (payload = {}, state) => {
      let response = {};
      return new Promise((resolve, reject) => {
        try {
          if (payload.id) {
            quyetDinhThauProvider
              .put(payload)
              .then((s) => {
                if (s?.code === 0) {
                  dispatch.quyetDinhThau.updateData({
                    dataEditDefault: response.data,
                  });
                  resolve(s?.data);
                }
                message.success("C???p nh???t th??nh c??ng d??? li???u quy???t ?????nh th???u");
              })
              .catch((e) => {
                message.error(e?.message || "X???y ra l???i vui l??ng th??? l???i sau");
              });
          } else {
            quyetDinhThauProvider
              .post(payload)
              .then((s) => {
                if (s?.code === 0) {
                  message.success(
                    "Th??m m???i th??nh c??ng d??? li???u quy???t ?????nh th???u"
                  );
                  resolve(s?.data);
                }
              })
              .catch((e) => {
                message.error(e?.message || "X???y ra l???i vui l??ng th??? l???i sau");
              });
          }
        } catch (error) {
          message.error(error?.message.toString());
          return Promise.reject(error);
        }
      });
    },
    onDelete: async (payload, state) => {
      const {
        quyetDinhThau: { page, size },
      } = state;
      const response = await quyetDinhThauProvider.delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("X??a b???n ghi th??nh c??ng");
        dispatch.quyetDinhThau.getListQuyetDinhThau({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },

    onComplete: async (payload, state) => {
      return new Promise((resolve, reject) => {
        quyetDinhThauProvider
          .complete(payload)
          .then((response) => {
            dispatch.quyetDinhThau.updateData({
              dataEditDefault: response.data,
            });
            message.success("Ho??n th??nh quy???t ?????nh th???u th??nh c??ng!");
            resolve(response.data);
          })
          .catch((e) => {
            message.error(e.message || "X???y ra l???i vui l??ng th??? l???i sau");
            reject(e);
          });
      });
    },

    onUndoComplete: async (payload, state) => {
      return new Promise((resolve, reject) => {
        quyetDinhThauProvider
          .undoComplete(payload)
          .then((response) => {
            dispatch.quyetDinhThau.updateData({
              dataEditDefault: response.data,
            });
            message.success("H???y ho??n th??nh quy???t ?????nh th???u th??nh c??ng!");
            resolve(response.data);
          })
          .catch((e) => {
            message.error(e.message || "X???y ra l???i vui l??ng th??? l???i sau");
            reject(e);
          });
      });
    },

    onVerify: async (payload, state) => {
      return new Promise((resolve, reject) => {
        quyetDinhThauProvider
          .verify(payload)
          .then((response) => {
            dispatch.quyetDinhThau.updateData({
              dataEditDefault: response.data,
            });
            message.success("Duy???t quy???t ?????nh th???u th??nh c??ng!");
            resolve(response.data);
          })
          .catch((e) => {
            message.error(e.message || "X???y ra l???i vui l??ng th??? l???i sau");
            reject(e);
          });
      });
    },

    onUndoVerify: async (payload, state) => {
      return new Promise((resolve, reject) => {
        quyetDinhThauProvider
          .undoVerify(payload)
          .then((response) => {
            dispatch.quyetDinhThau.updateData({
              dataEditDefault: response.data,
            });
            message.success("H???y duy???t quy???t ?????nh th???u th??nh c??ng!");
            resolve(response.data);
          })
          .catch((e) => {
            message.error(e.message || "X???y ra l???i vui l??ng th??? l???i sau");
            reject(e);
          });
      });
    },
  }),
};
