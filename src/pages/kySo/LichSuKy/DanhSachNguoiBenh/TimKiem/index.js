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
const TimKiem = (props) => {
  const {  searchByParams,  } = useDispatch().lichSuKyDanhSachNguoiBenh

  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const onChange = (key) => (e) => {
    if (/([\}\{])/g.test(e.target.value)) {
      return null
    } else {
      searchByParams({ [key]: e.target.value })
    }
  };
  const onSearchInput = (key) => (e) => {
    searchByParams({ [key]: e })
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      let obj = JSON.parse(e.target.value).maNb
      if (obj) {
        // Search info nb
        searchByParams({ maNb: obj })
      }
    }
  };
  return (
    <Main>
      <Row align="middle">
        <Row>
          <div className="title">
            <label>Danh sách người bệnh</label>
          </div>
        </Row>
        <Row style={{ paddingTop: "10px" }}>
          <Col span={5}>
            <InputSearch>
              <Input placeholder="Nhập để tìm theo họ tên người bệnh" onChange={onChange("tenNb")} />
              <img src={IconSearch} alt="IconSearch" className="icon-search" />
            </InputSearch>
          </Col>
          <Col span={5}>
            <InputSearch>
              <Input placeholder="Nhập để tìm mã hồ sơ" onChange={onChange("maHoSo")} />
              <img src={IconSearch} alt="IconSearch" className="icon-search" />
            </InputSearch>
          </Col>
          <Col span={5}>
            <InputSearch>
              <Input placeholder="Nhập hoặc quét QR để tìm mã người bệnh" onChange={onChange("maNb", true)}
                onKeyDown={onKeyDown} />
              <img src={IconSearch} alt="IconSearch" className="icon-search" />
            </InputSearch>
          </Col>
          <Col span={5}>
            <SearchKho>
              <Select
                style={{ width: 300 }}
                // mode="multiple"
                showArrow
                showSearch
                placeholder="Giới tính"
                data={[{
                  id: 1,
                  ten: "Nam"
                },
                {
                  id: 2,
                  ten: "Nữ"
                }
                ]}
                ten="gioiTinh"
                onChange={onSearchInput("gioiTinh")}
              ></Select>
            </SearchKho>
          </Col>
        </Row>
      </Row>
    </Main>
  );
};

export default TimKiem;
