import React from "react";
import { message, notification } from "antd";
import notificationProvider from "data-access/notification-provider";
export default {
  state: {},
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onSearch: async (page, state) => {
      if (
        state.notification.isLoading ||
        (page !== 0 && state.notification.finished)
      ) {
        return;
      }
      let newData = { isLoading: true, isRefreshing: false, isLoadMore: false };
      if (page === 0) newData.isRefreshing = true;
      else newData.isLoadMore = true;
      dispatch.notification.updateData(newData);
      notificationProvider
        .search({
          page: page + "",
          size: 20,
          sort: "thoiGian,desc",
        })
        .then((s) => {
          let data = state.notification.notifications || [];
          data = [...(page === 0 ? [] : data), ...(s?.data || [])];
          dispatch.notification.updateData({
            isLoading: false,
            isLoadMore: false,
            isRefreshing: false,
            notifications: data,
            page,
          });
        })
        .catch((e) => {
          dispatch.notification.updateData({
            isLoading: false,
            isLoadMore: false,
            isRefreshing: false,
            finished: true,
          });
          message.error(
            e?.message || "Tải danh sách thông báo không thành công"
          );
        });
    },
    onRefresh: (clear = false) => {
      let newData = { page: 0, finished: false };
      if (clear) newData.notifications = [];
      dispatch.notification.updateData(newData);
      dispatch.notification.onSearch(0);
    },

    setRead: (item = {}, state) => {
      let notifications = state.notification.notifications || [];
      notifications = notifications.map((x) => {
        if (x.id === item.id) {
          x.trangThai = 30;
        }
        return x;
      });
      let totalUnread =
        (state.notification.totalUnread || 0) - 1 < 0
          ? 0
          : (state.notification.totalUnread || 0) - 1;
      dispatch.notification.updateData({
        notifications: [...notifications],
        totalUnread,
      });
      notificationProvider.setRead(item.id);
      dispatch.notification.getTotalUnread();
    },

    getTotalUnread: (payload, state) => {
      if (!state.auth.auth) return;
      notificationProvider
        .getTotalUnread({
          trangThai: 10,
        })
        .then((s) => {
          dispatch.notification.updateData({
            totalUnread: s?.data || 0,
          });
        });
    },
    loadNotification: () => {
      dispatch.notification.onRefresh(true);
      dispatch.notification.getTotalUnread();
    },
    setReadAll: () => {
      notificationProvider
        .setRead()
        .then((s) => {
          dispatch.notification.updateData({
            totalUnread: 0,
            isLoading: false,
            isRefreshing: false,
            notifications: [],
          });
          dispatch.notification.onRefresh(true);
        })
        .catch((e) => {
          message.error(e?.message || "Xảy ra lỗi, vui lòng thử lại sau");
        });
    },
    showInAppNotification: async (payload, state) => {
      if (!state.auth.auth) return;
      dispatch.notification.getTotalUnread();
      let lastId = state.notification.lastId || 0;

      notificationProvider
        .search({
          page: "0",
          size: 20,
          sort: "thoiGian,desc",
        })
        .then((s) => {
          if (s.data) {
            let notifications = s?.data || [];
            dispatch.notification.updateData({
              lastId: notifications[0]?.id || lastId,
            });
            if (lastId) {
              notifications = notifications.filter((item) => item.id > lastId);
              const getContent = (item) => {
                let text = "";
                switch (item.loai) {
                  case 10:
                    text = "Y lệnh mới";
                    break;
                  case 20:
                    text = "Phiếu lĩnh chưa duyệt ";
                    break;
                  case 30:
                    text = "Thuốc chưa cấp";
                    break;
                  default:
                    text = "";
                }
                return text + ` - NB ${item.tenNb}`;
              };
              if (notifications && notifications.length) {
                notifications.forEach((item, index) => {
                  notification.open({
                    key: index,
                    description: (
                      <div>
                        <div>{getContent(item)}</div>
                        <div>{"Mã BA: " + (item.maBenhAn || item.maHoSo)}</div>
                      </div>
                    ),
                    message: (
                      <div className="date-area">
                        <div className="date">
                          {item.thoiGian?.toDateObject().format("dd/MM")}
                        </div>
                        <div className="date">
                          {item.thoiGian?.toDateObject().format("HH:mm")}
                        </div>
                      </div>
                    ),
                    className: "emr-notification",
                  });
                });
              }
            }
          }
        });
    },
  }),
};
