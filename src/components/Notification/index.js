import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Spin, Button } from "antd";
import { Main } from "./styled";
import T from "prop-types";

function Notification(props) {
  useEffect(() => {
    props.updateData({
      isLoading: false,
      isLoadMore: false,
      isRefreshing: false,
    });
    if (props.show) props.loadNotification();
  }, [props.show]);
  const setReadAll = () => {
    props.setReadAll();
  };
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
    }
    return text + ` - NB ${item.tenNb}`;
  };
  const handleLoadMore = () => {
    props.onSearch(props.page + 1);
  };
  const setRead = (item) => () => {
    props.setRead(item);
  };
  const onScroll = (e) => {
    let obj = e.target;
    if (obj.scrollTop === obj.scrollHeight - obj.offsetHeight) {
      handleLoadMore();
    }
  };
  return (
    <Main width={props.width}>
      <div className="menu-header-content text-dark">
        <h5 className="menu-header-title">Thông báo</h5>
        {props.totalUnread ? (
          <div className="menu-header-subtitle">
            Bạn có <b>{props.totalUnread}</b> thông báo chưa đọc
          </div>
        ) : !props.data?.length ? (
          <div className="menu-header-subtitle">Bạn không có thông báo nào</div>
        ) : null}
      </div>
      <Spin spinning={props.isRefreshing}>
        <div className="list-notification" onScroll={onScroll}>
          {(props.data || []).map((item, index) => (
            <div key={index} onClick={setRead(item)} style={{ flex: 1 }}>
              <hr className="break-line" />

              <div
                className="item"
                style={
                  item.trangThai !== 30 ? { backgroundColor: "#08AAA820" } : {}
                }
              >
                <div className="date-area">
                  <div className="date">
                    {item.thoiGian?.toDateObject().format("dd/MM")}
                  </div>
                  <div className="date">
                    {item.thoiGian?.toDateObject().format("HH:mm")}
                  </div>
                </div>
                <div className="item-content">
                  <div className="item-content-text">{getContent(item)}</div>
                  <div className="item-content-text">
                    Mã BA: {item.maBenhAn || item.maHoSo}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {props.totalUnread ? (
          <ul className="nav flex-column">
            <li className="nav-item-divider nav-item"></li>
            <li className="nav-item-btn text-center nav-item">
              <button
                className="btn-shadow btn-wide btn-pill btn btn-focus btn-sm"
                onClick={setReadAll}
              >
                Đánh dấu đã đọc
              </button>
            </li>
          </ul>
        ) : null}
      </Spin>
    </Main>
  );
}

Notification.propTypes = {
  show: T.bool,
};

export default connect(
  (state) => ({
    page: state.notification.page || 0,
    isRefreshing: state.notification.isRefreshing,
    isLoading: state.notification.isLoading,
    isLoadMore: state.notification.isLoadMore,
    data: state.notification.notifications || [],
    totalUnread: state.notification.totalUnread || 0,
  }),
  ({
    notification: {
      onRefresh,
      onSearch,
      updateData,
      setRead,
      loadNotification,
      setReadAll,
      getTotalUnread,
    },
  }) => ({
    onRefresh,
    onSearch,
    updateData,
    setRead,
    loadNotification,
    setReadAll,
    getTotalUnread,
  })
)(Notification);
