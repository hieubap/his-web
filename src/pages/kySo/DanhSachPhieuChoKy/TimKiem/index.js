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
import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
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

  const { updateData, searchByParams, postTaoMoi } = useDispatch().danhSachPhieuChoKy

  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  //
  const { tongHop: baoCaotongHop } = useDispatch().baoCao
  const { listPhieu } = useSelector(state => state.baoCao)
  useEffect(() => {
    baoCaotongHop()
  }, []);
  const debounceOnChange = useCallback(
    debounce((key, value) => searchByParams({ [key]: value })
      , 500),
    []
  );
  const onChange = (key) => (e) => {
    setState({
      [key]: e.target.value
    })
    debounceOnChange(key, e.target.value)
  };
  const onSearchInput = (key) => (e) => {
    if (key === "tenBaoCao") {
      setState({
        tenBaoCao: e
      })
      searchByParams({ tenBaoCao: e })
    }
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      searchByParams({ ...state })
    }
  };
  return (
    <Main>
      <Row align="middle">
        <Row>
          <div className="title">
            <label>Danh sách phiếu chờ ký</label>
            {/* <Button
              className="btn_new"
              onClick={() => {
                history.push("/kho/nha-thuoc/them-moi");
              }}
            >
              <span>Thêm mới</span>
              <img src={IcCreate} />
            </Button> */}
          </div>
        </Row>
        <Row style={{ paddingTop: "10px" }}>
          <Col span={5}>
            <InputSearch>
              <Input placeholder="Nhập để tìm theo họ tên người bệnh" onChange={onChange("tenNb")} onKeyDown={onKeyDown} />
              <img src={IconSearch} alt="IconSearch" className="icon-search" />
            </InputSearch>
          </Col>
          <Col span={5}>
            <InputSearch>
              <Input placeholder="Nhập để tìm mã hồ sơ" onChange={onChange("maHoSo")} onKeyDown={onKeyDown} />
              <img src={IconSearch} alt="IconSearch" className="icon-search" />
            </InputSearch>
          </Col>
          <Col span={5}>
            <InputSearch>
              <Input placeholder="Nhập để tìm theo tên người trình ký" onChange={onChange("tenNguoiTrinhKy")} onKeyDown={onKeyDown} />
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
        </Row>
      </Row>
    </Main>
  );
};

export default TimKiem;
