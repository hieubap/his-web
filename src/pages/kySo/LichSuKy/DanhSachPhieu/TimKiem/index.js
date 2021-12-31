import {
  Col,
  Row,
  Button,
  Input,
  Popover,
  DatePicker,
  Checkbox,
  message,
} from "antd";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { SearchKho, Main, InputSearch, InputSearch2, PopupWrapper, GroupStyle } from "./styled";
import Select from "components/Select";
import { connect, useDispatch, useSelector } from "react-redux";
import IcCreate from "assets/images/kho/IcCreate.png";
import IcFilter from "assets/images/kho/icFilter.png";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import "./styled.css";
import { TRANG_THAI_DON_THUOC } from "constants/index";
import IcDown from "assets/images/xetNghiem/icDown.png";
import IcClose from "assets/images/kho/icClose.png";
import { useHistory } from "react-router-dom";
import { debounce, random, cloneDeep } from "lodash";
import TTCoBan from "../TTCoBan";
import { TRANG_THAI_KY } from "../../../../../constants";
const TimKiem = (props) => {

  const { searchByParams } = useDispatch().lichSuKyDanhSachPhieu
  const { getUtils } = useDispatch().utils

  //
  const { tongHop: baoCaotongHop } = useDispatch().baoCao
  const { listPhieu } = useSelector(state => state.baoCao)
  const { listtrangThaiKy } = useSelector(state => state.utils)

  useEffect(() => {
    baoCaotongHop()
    getUtils({ name: 'trangThaiKy' })
  }, []);
  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const onChange = (key) => (e) => {
    searchByParams({ [key]: e.target.value })
  };
  const onSearchInput = (key) => (e) => {
    if (key === "tenBaoCao" || key === "trangThai") {
      if (e === "all") {
        return searchByParams({trangThai : null})
      }
      searchByParams({ [key]: e })
    } else {
      searchByParams({ [key]: e.target.value })
    }
  };
  return (
    <Main>
      <Row align="middle">
        <Row>
          <div className="title">
            <label>Danh sách phiếu</label>
          </div>
        </Row>
        <TTCoBan />
        <Row style={{ paddingTop: "10px" }}>
          <Col span={5}>
            <SearchKho>
              <Select
                style={{ width: "100%", background: "white" }}
                // mode="multiple"
                showArrow
                showSearch
                placeholder="Tên phiếu"
                data={listPhieu && cloneDeep(listPhieu)?.map(item => {
                  item.id = item.ten
                  return item
                })}
                ten="tenBaoCao"
                onChange={onSearchInput("tenBaoCao")}
              ></Select>
            </SearchKho>
          </Col>
          <Col span={5}>
            <SearchKho>
              <Select
                style={{ width: "100%", background: "white" }}
                // mode="multiple"
                showArrow
                showSearch
                placeholder="Trạng thái phiếu"
                data={TRANG_THAI_KY}
                ten="trangThai"
                onChange={onSearchInput("trangThai")}
              ></Select>
            </SearchKho>
          </Col>

          <Col span={5}>
            <InputSearch>
              <Input placeholder="Nhập để tìm theo số phiếu ký" onChange={onChange("soPhieu")} />
              <img src={IconSearch} alt="IconSearch" className="icon-search" />
            </InputSearch>
          </Col>
        </Row>
      </Row>
    </Main>
  );
};

export default TimKiem;
