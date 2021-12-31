import React, { useEffect, useState } from "react";
import { Main } from "./styled";
import { connect } from "react-redux";
import { List, Spin, Col, Row } from "antd";
import InfiniteScroll from "react-infinite-scroller";
import { useParams } from "react-router-dom";
import IconUnPaid from "assets/images/thuNgan/icUnpaid.svg";
import IconPaid from "assets/images/thuNgan/icPaid.svg";
import classNames from "classnames";
import { LOAI_PHIEU_THU } from "constants/index";

function DanhSachPhieuThu(props) {
  const {
    onSearch,
    listData,
    totalElements,
    fetchListServices,
    history,
  } = props;
  const { nbDotDieuTriId, phieuThuId, maHoSo } = useParams();
  const [state, _setState] = useState({
    loading: false,
    hasMore: true,
    page: 0,
    size: 20,
  });
  const setState = (newState) => {
    _setState((state) => {
      return { ...state, ...newState };
    });
  };
  useEffect(() => {
    const { page, size } = state;
    onSearch({ page, size, nbDotDieuTriId });
  }, [nbDotDieuTriId]);
  const handleInfiniteOnLoad = () => {
    let { page, size, dataSearch } = state;
    setState({
      loading: true,
      page,
      size: size * 2,
    });
    if (listData.length < totalElements) {
      onSearch({ page, size: size * 2, dataSearch }).then((s) => {
        setState({
          loading: false,
        });
      });
    } else {
      setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
  };

  const onSelectItem = (item) => () => {
    history.push(
      `/thu-ngan/chi-tiet-phieu-thu/${maHoSo}/${item.id}/${item.nbDotDieuTriId}`
    );
    fetchListServices({
      size: 10,
      nbDotDieuTriId: item.nbDotDieuTriId,
      phieuThuId: item.id,
    });
  };


  return (
    <Main>
      <div className="title-header">DS phiếu thu của NB</div>
      <div className={`infinite-container`}>
        <InfiniteScroll
          // loadMore={handleInfiniteOnLoad}
        >
          <List
            dataSource={listData}
            renderItem={(item) => (
              <Row
                className={classNames("info", {
                  "paid-highlights": +phieuThuId === item.id,
                })}
                key={item.id}
                onClick={onSelectItem(item)}
              >
                {/* <Col xs={8} className="info-left">
                  Mã HS: {item.maHoSo}
                </Col> */}
                <Col
                  xs={16}
                  className={classNames("info-left", {
                    "info-left-paid": item.thanhToan,
                  })}
                >
                  {item.loaiPhieuThu === LOAI_PHIEU_THU.KHONG_BAO_HIEM ? (
                    <IconPaid className="info-left__ic" />
                  ) : (
                    <IconUnPaid className="info-left__ic" />
                  )}
                  {item.thanhToan ? "Đã thanh toán" : "Chưa thanh toán"}
                </Col>
                <Col xs={8} className="info-right">
                  {item.thanhTien?.formatPrice()}
                </Col>
              </Row>
            )}
          >
            {state.loading && state.hasMore && (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>
      </div>
    </Main>
  );
}

const mapStateToProps = (state) => {
  const {
    danhSachPhieuThu: { listData = [], totalElements },
  } = state;
  return {
    listData,
    totalElements,
  };
};

const mapDispatchToProps = ({
  danhSachPhieuThu: { onSearch },
  danhSachDichVu: { onSizeChange },
}) => ({
  onSearch,
  fetchListServices: onSizeChange,
});

export default connect(mapStateToProps, mapDispatchToProps)(DanhSachPhieuThu);
