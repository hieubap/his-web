import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Breadcrumb from "components/Breadcrumb";
import { Main, InputSearch } from "./styled";
import ThongTinBenhNhan from "./thongTinBenhNhan";
import ThongTinPhieu from "./thongTinPhieu";
import BangThongTin from "./bangThongTin";
import { Button, Col, Input, Row } from "antd";
import Icon from "@ant-design/icons";
import IconSeacrh from "assets/svg/iconSearch.svg";
import IconList from "assets/svg/iconList.svg";
import ThongTinSoTien from "./thongTinSoTien";
import { useDispatch, useSelector } from "react-redux";
import { CheckOutlined, SearchOutlined } from "@ant-design/icons";
import IconQrCode from "assets/images/thuNgan/qrCode.png";
import { useHistory } from "react-router";
const ChiTietPhieuYeuCauHoan = (props) => {
  const [state, _setState] = useState({
    showSearch: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const history = useHistory();
  let timer = null;
  const dispatch = useDispatch();
  const { getChiTietPhieuDoiTra, confirmPhieuYeuCauHoan } =
    dispatch.danhSachPhieuYeuCauHoan;
  const { chiTietPhieuDoiTra } = useSelector(
    (state) => state.danhSachPhieuYeuCauHoan
  );
  const {
    match: {
      params: { phieuHoanTraId },
    },
  } = props;
  useEffect(() => {
    getChiTietPhieuDoiTra({ id: phieuHoanTraId });
  }, [phieuHoanTraId]);
  const handleSubmit = () => {
    setState({ isLoading: true });
    confirmPhieuYeuCauHoan({ id: phieuHoanTraId }).then((s) => {
      setState({ isLoading: false });
    });
  };
  const handleSearch = (e) => {
    clearTimeout(timer);
    timer = setTimeout(
      (s) => {
        if (s.value) {
          getChiTietPhieuDoiTra({ id: s.value });
        }
      },
      500,
      e.target
    );
  };
  const handleClick = () => {
    history.push("/thu-ngan/ds-phieu-yeu-cau-hoan");
  };
  return (
    <Main>
      <Breadcrumb
        chains={[
          { title: "Thu ngân", link: "/thu-ngan" },
          {
            title: "Danh sách phiếu yêu cầu hoàn",
            link: "/thu-ngan/ds-phieu-yeu-cau-hoan",
          },
        ]}
      >
        <Col span={24}>
          <div className="header">
            <p className="title">Chi tiết yêu cầu phiếu hoàn</p>
            {!state.showSearch && (
              <Icon
                className="icon-search"
                component={IconSeacrh}
                onClick={() => {
                  setState({
                    showSearch: true,
                  });
                }}
              />
            )}
            {state.showSearch && (
              <InputSearch focus={state.focus}>
                <SearchOutlined />
                <Input
                  onBlur={() => {
                    setState({
                      focus: false,
                    });
                  }}
                  onFocus={() => {
                    setState({
                      focus: true,
                    });
                  }}
                  onChange={handleSearch}
                  onPressEnter={handleSearch}
                  style={{ width: "250px" }}
                />
                <img src={IconQrCode} />
              </InputSearch>
            )}
            <Icon
              className="icon-list"
              onClick={handleClick}
              component={IconList}
            />
          </div>
        </Col>
        <Row gutter="40" style={{ width: "100%", marginTop: "15px" }}>
          <Col span={17}>
            <ThongTinBenhNhan />
          </Col>
          <Col span={7} className="thong-tin-so-tien">
            <ThongTinSoTien />
          </Col>
          <Col span={17}>
            <BangThongTin soPhieu={phieuHoanTraId} />
          </Col>
          <Col span={7} className="thong-tin-phieu">
            <ThongTinPhieu />
          </Col>
        </Row>
        {chiTietPhieuDoiTra?.trangThai != 40 && (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <Button
              loading={state.isLoading}
              className="btn-ok"
              onClick={handleSubmit}
            >
              <span> Xác nhận hoàn</span> <CheckOutlined />
            </Button>
          </div>
        )}
      </Breadcrumb>
    </Main>
  );
};

export default ChiTietPhieuYeuCauHoan;
