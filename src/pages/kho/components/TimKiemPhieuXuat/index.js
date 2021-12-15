import { Button, Checkbox, Col, Input, Popover, Row } from "antd";
import IcClose from "assets/images/kho/icClose.png";
import IcCreate from "assets/images/kho/IcCreate.png";
import IcDown from "assets/images/kho/ic-down-select.png";
import IcFilter from "assets/images/kho/icFilter.png";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import Select from "components/Select";
import { TK_TRANG_THAI_PHIEU_XUAT } from "constants/index";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import SelectSearch from "components/SelectSearch";
import InputTimeout from "components/InputTimeout";
import LocPhieu from "../LocPhieu";
import { InputSearch, InputSearch2, Main, SearchKho } from "./styled";
import "./styled.css";

const TimKiemPhieu = (props) => {
  const {
    listData,
    khoaId,
    onChangeInputSearch,
    nhanVienId,
    listNhanVienKho,
    onSearchNhanVienKho,
  } = props;
  useEffect(() => {
  }, []);
  useEffect(() => {
    if (nhanVienId) {
      onSearchNhanVienKho({
        page: 0, size: 9999,
        dataSearch: { nhanVienId },
      })
    }
  }, [nhanVienId]);
  useEffect(() => {
    if (listNhanVienKho) {
      let dsNhanVienKho = listNhanVienKho?.map((x) => ({ ...x?.kho }));
      setState({ dsNhanVienKho });
    }
  }, [listNhanVienKho]);
  const refShow = useRef(null);
  const [state, _setState] = useState({
    dsNhanVienKho: [],
  });
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };

  const onChange = (key) => (e) => {
    const newList = Object.assign([], state[key]) || [];
    const index = newList.findIndex((item) => item === e);

    if (index !== -1) {
      newList.splice(index, 1);
    } else if (e) {
      newList.push(e);
    }

    setState({ [key]: !e ? [] : newList });
    onChangeInputSearch({ [key]: e && newList.length > 0 ? newList : null });
  };
  const history = useHistory();

  const handleRefShow = () => {
    if (refShow.current) refShow.current.show();
  };

  const group = () => (
    <Checkbox.Group
      options={TK_TRANG_THAI_PHIEU_XUAT}
      value={state.dsTrangThai}
      onChange={onSearchInput("dsTrangThai")}
    />
  );

  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e.length > 0) {
      value = e;
    }

    if (key === "dsTrangThai") {
      onChangeInputSearch({
        dsTrangThai:
          value || TK_TRANG_THAI_PHIEU_XUAT.map((item) => item.value),
      });
      setState({ ...state, dsTrangThai: value });
    }
  };

  return (
    <Main>
      <Row align="middle">
        <Row>
          <div className="title">
            <label>Danh sách phiếu xuất</label>
            {/* <Button
              className="btn_new"
              onClick={() => {
                history.push("/kho/nhap-kho/phieu-nhap");
              }}
            >
              <span> Thêm mới</span>
              <img src={IcCreate} />
            </Button> */}
          </div>
        </Row>
        <Row style={{ paddingTop: "10px" }}>
          <Col flex="110px">
            <SearchKho>
              <LocPhieu ref={refShow}></LocPhieu>
              <Button className="filter" onClick={() => handleRefShow()}>
                <img src={IcFilter} />
                <span> Lọc phiếu </span>
              </Button>
            </SearchKho>
          </Col>
          <Col flex="132px">
            <SearchKho>
              <SelectSearch
                style={{ width: "100%" }}
                data={state.dsNhanVienKho}
                onChange={onChange("dsKhoId")}
                value="Kho nhập"
                listSelect={state.dsKhoId}
                suffixIcon={
                  <img src={IcDown} alt="IcDown" className="ic-down" />
                }
              ></SelectSearch>
            </SearchKho>
          </Col>
          <Col flex="170px">
            <Popover placement="bottom" content={group} trigger="click">
              <InputSearch2>
                <Input value="Trạng thái phiếu" disabled></Input>
                <img src={IcDown} alt="IcDown" className="ic-down" />
              </InputSearch2>
            </Popover>
          </Col>
          <Col flex="132px">
            <SearchKho>
              <SelectSearch
                style={{ width: "100%" }}
                data={state.dsNhanVienKho}
                listSelect={state.dsKhoDoiUngId}
                onChange={onChange("dsKhoDoiUngId")}
                value="Kho xuất"
                suffixIcon={
                  <img src={IcDown} alt="IcDown" className="ic-down" />
                }
              ></SelectSearch>
            </SearchKho>
          </Col>
          <Col xs={9}>
            <InputSearch>
              <InputTimeout
                placeholder="Nhập để tìm kiếm số phiếu"
                onChange={(value) => onChangeInputSearch({ soPhieu: value })}
              />
              <img src={IconSearch} alt="IconSearch" className="icon-search" />
            </InputSearch>
          </Col>
        </Row>
        <div className="array-store" style={{ flexFlow: "row wrap" }}>
          {(state.dsKhoId || []).map((item, index) => {
            return (
              <div className="item" style={{ marginTop: 5 }} key={index}>
                <span>{state.dsNhanVienKho.find((x) => x.id == item)?.ten}</span>
                <img
                  src={IcClose}
                  alt="..."
                  style={{ marginLeft: 5, cursor: "pointer" }}
                  onClick={() => {
                    onChange("dsKhoId")(item);
                    // const newDsKhoId = Object.assign([], state.dsKhoId);
                    // newDsKhoId.splice(index, 1);
                    // setState({
                    //   dsKhoId: newDsKhoId,
                    // });
                  }}
                ></img>
              </div>
            );
          })}
          {(state.dsTrangThai || []).map((item, index) => {
            return (
              <div className="item" style={{ marginTop: 5 }} key={index}>
                <span>
                  {TK_TRANG_THAI_PHIEU_XUAT.find((x) => x.value == item)?.label}
                </span>
                <img
                  src={IcClose}
                  alt="..."
                  style={{ marginLeft: 5, cursor: "pointer" }}
                  onClick={() => {
                    onChange("dsTrangThai")(item);
                  }}
                ></img>
              </div>
            );
          })}
          {(state.dsKhoDoiUngId || []).map((item, index) => {
            return (
              <div className="item" style={{ marginTop: 5 }} key={index}>
                <span>{state.dsNhanVienKho.find((x) => x.id == item)?.ten}</span>
                <img
                  src={IcClose}
                  alt="..."
                  style={{ marginLeft: 5, cursor: "pointer" }}
                  onClick={() => {
                    onChange("dsKhoDoiUngId")(item);
                  }}
                ></img>
              </div>
            );
          })}
        </div>
      </Row>
    </Main>
  );
};

const mapStateToProps = ({
  auth: {
    auth: { khoaId, nhanVienId },
  },
  nhanVienKho: { listData: listNhanVienKho },
  kho: { listKhoUser },
  nhaSanXuat: { listNhaSanXuat },
}) => {
  return {
    nhanVienId,
    khoaId,
    listData: listKhoUser,
    listNhaSanXuat,
    listNhanVienKho,
  };
};

const mapDispatchToProps = ({
  nhanVienKho: { onSearch: onSearchNhanVienKho },
  xuatKho: { onChangeInputSearch },
}) => ({
  onChangeInputSearch,
  onSearchNhanVienKho,
});
export default connect(mapStateToProps, mapDispatchToProps)(TimKiemPhieu);
