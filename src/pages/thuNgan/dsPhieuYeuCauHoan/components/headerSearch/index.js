import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { InputSearch, Main, PopupWrapper, SearchKho } from "./styled";
import { Button, Checkbox, Col, Input, Popover, Row } from "antd";
import IcCreate from "assets/images/kho/IcCreate.png";
import IcFilter from "assets/images/kho/icFilter.png";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import IcDown from "assets/images/xetNghiem/icDown.png";
import IcClose from "assets/images/kho/icClose.png";
import { useDispatch, useSelector } from "react-redux";
const HeaderSearch = (props) => {
  const [state, _setState] = useState({
    dsTrangThai: [],
    statusAll: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const dispatch = useDispatch();
  const { onChangeInputSearch, updateData, onSearch } =
    dispatch.danhSachPhieuYeuCauHoan;
  const { listtrangThaiPhieuDoiTra } = useSelector((state) => state.utils);
  const { dsTrangThai, ...dataSearch } = useSelector(
    (state) => state.danhSachPhieuYeuCauHoan.dataSearch
  );

  const isJson = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  let timer = null;
  const onSearchInput = (key) => (e) => {
    let value = "";
    if (key == "searchTongHop") {
      updateData({
        dataSearch: {
          ...dataSearch,
          tenNb: "",
          maNb: ""
        }
      })
      if (Number.isInteger(+e.target.value)) {
        key = "maNb";
        value = e.target.value;
      } else if (isJson(e.target.value)) {
        console.log("d")
        const qrCode = JSON.parse(e.target.value);
        key = "maNb";
        value = qrCode?.maNb;
      } else {
        key = "tenNb";
        value = e.target.value;
      }
    } else {
      if (e?.target) {
        if (e.target.hasOwnProperty("checked")) value = e.target.checked;
        else value = e.target.value;
      } else value = e;
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      onChangeInputSearch({
        [key]: value,
      });
    }, 500);
  };

  const onChangeStatus = (e) => {
    setState({
      statusAll: e.target.checked,
    });
    if (e.target.checked) {
      onChangeInputSearch({
        dsTrangThai: [20, 40],
      });
    } else {
      onChangeInputSearch({
        dsTrangThai: [],
      });
    }
  };

  useEffect(() => {
    if (listtrangThaiPhieuDoiTra) {
      const trangThai = listtrangThaiPhieuDoiTra
        .map((item) => {
          item.label = item.ten;
          item.value = item.id;
          return item;
        })
        .filter(
          (item) => item.label == "Chờ hoàn" || item.label == "Hoàn thành"
        );
      setState({
        TRANG_THAI_PHIEU_HOAN: trangThai,
      });
    }
  }, [listtrangThaiPhieuDoiTra]);
  const group = () => (
    <>
      <Checkbox onChange={onChangeStatus} value={state.statusAll}>
        Tất cả
      </Checkbox>
      <Checkbox.Group
        options={state?.TRANG_THAI_PHIEU_HOAN}
        onChange={onSearchInput("dsTrangThai")}
        value={dsTrangThai}
        style={{ display: "flex", flexDirection: "column" }}
      />
    </>
  );
  return (
    <Main>
      <Row style={{ paddingTop: "10px" }}>
        <Col flex="132px">
          <SearchKho>
            <Button className="filter">
              <span> Tìm kiếm </span>
            </Button>
          </SearchKho>
        </Col>
        <Col xs={8}>
          <InputSearch>
            <Input
              onChange={onSearchInput("searchTongHop")}
              onKeyDown={onSearchInput}
              placeholder="Nhập để tìm theo tên người bệnh, mã người bệnh, QR người bệnh"
            />
            <img src={IconSearch} alt="IconSearch" className="icon-search" />
          </InputSearch>
        </Col>
        <Col xs={8}>
          <InputSearch>
            <Input
              onChange={onSearchInput("soPhieu")}
              placeholder="Nhập để tìm theo số phiếu yêu cầu hoàn"
            />
            <img src={IconSearch} alt="IconSearch" className="icon-search" />
          </InputSearch>
        </Col>
        <Col flex="200px">
          <PopupWrapper>
            <Popover
              placement="bottom"
              content={group}
              trigger="click"
              overlayClassName="popup-kho"
            >
              <SearchKho>
                <Button className="status">
                  <span> Trạng thái phiếu </span>
                  <img src={IcDown} />
                </Button>
              </SearchKho>
            </Popover>
          </PopupWrapper>
        </Col>
      </Row>
    </Main>
  );
};

export default HeaderSearch;
