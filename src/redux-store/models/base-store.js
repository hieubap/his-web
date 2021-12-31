import hocHamHocViProvider from "data-access/categories/dm-hoc-ham-hoc-vi-provider";
import { message } from "antd";
import { PAGE_SIZE, PAGE_DEFAULT } from "constants/index";
import { reject } from "lodash";

export default ({
  initState = {},
  customEffect = () => ({}),

  // BẮT BUỘC
  fetchProvider, // phải là provider kết hợp từ base-provider
  storeName, // tên store
  title = "",
}) => ({
  state: {
    _listData: [],
    _listDataTongHop: [],
    _totalElements: null,
    _page: PAGE_DEFAULT,
    _size: PAGE_SIZE,
    _dataEdit: {},
    _dataSearch: {},
    ...initState,
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    _getList: async (payload = {}, state) => {
      console.log(payload,'payload');
      return new Promise((resolve, reject) => {
        fetchProvider
          ._search(payload)
          .then((res) => {
            const {
              data: _listData,
              totalElements: _totalElements,
              message: _message,
              pageNumber: _page,
              pageSize: _size,
              numberOfElements,
            } = res;

            if (res.code === 0) {
              dispatch[storeName].updateData({
                _listData,
                _totalElements,
                _page,
                _size,
                _dataSearch: payload,
              });
            } else {
              message.error(_message);
            }

            resolve(res);
          })
          .catch((err) => {
            message.error(err?.message?.toString());
            reject(err);
          });
      });
    },
    _getListTongHop: async (payload = {}, state) => {
      try {
        const response = await fetchProvider._searchTongHop(payload);
        let {
          data: _listDataTongHop,
          totalElements: _totalElements,
          pageNumber: _page,
          pageSize: _size,
          numberOfElements,
        } = response;

        if (_page > 0 && numberOfElements === 0) {
          return dispatch[storeName]._getList({
            ...payload,
            page: _page - 1,
            _size,
          });
        }

        return dispatch[storeName].updateData({
          _listDataTongHop,
          _totalElements,
          _page,
          _size,
        });
      } catch (err) {
        message.error(err.message.toString());
        return Promise.reject();
      }
    },
    _createOrEdit: (payload = {}, state) => {
      return new Promise((resolve, reject) => {
        if (state[storeName]?._dataEdit?.id) {
          fetchProvider
            ._put({
              ...payload,
              id: state[storeName]?._dataEdit?.id,
            })
            .then((res) => {
              if (res.code === 0) {
                dispatch[storeName].updateData({
                  dataEditDefault: res.data,
                });
                message.success(`Cập nhật thành công dữ liệu ${title}!`);
              } else {
                message.error(res.message);
              }
              resolve(res);
            })
            .catch((e) => {
              reject(e);
            });
        } else {
          fetchProvider
            ._post(payload)
            .then((res) => {
              if (res.code === 0) {
                message.success(`Thêm mới thành công dữ liệu ${title}!`);
              } else {
                message.error(res.message);
              }
              resolve(res);
            })
            .catch((e) => {
              reject(e);
            });
        }
      });
    },
    _onDelete: async (payload, state) => {
      const { page, size } = state[storeName];

      const response = await fetchProvider._delete(payload);
      const { code, message: messageInfo } = response;
      if (code === 0) {
        message.success("Xóa bản ghi thành công");
        dispatch[storeName]._getList({ page, size });
      } else {
        message.error(messageInfo.toString());
      }
    },
    ...customEffect({ dispatch }),
  }),
});
