import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  InputSearch,
  Main,
  PopupWrapper,
  SearchKho,
  GlobalStyle,
} from "./styled";
import {
  Button,
  Checkbox,
  Col,
  Input,
  Popover,
  Row,
  Select,
  DatePicker,
  InputNumber,
} from "antd";
import IcCreate from "assets/images/kho/IcCreate.png";
import IcFilter from "assets/images/kho/icFilter.png";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import IcDown from "assets/images/xetNghiem/icDown.png";
import Icon from "@ant-design/icons";
import IcClose from "assets/images/kho/icClose.png";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { values } from "pdf-lib";
import moment from "moment";
const { RangePicker } = DatePicker;
const { Option } = Select;

const HeaderSearchHoaDon = (props) => {
  const [state, _setState] = useState({
    dsTrangThai: [],
    statusAll: false,
    visible: false,
  });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const dispatch = useDispatch();
  const { onChangeInputSearch, updateData, onSearch } = dispatch.dsHoaDonDienTu;
  const { getListAllNhanVien } = dispatch.nhanVien;
  const { listAllNhanVien } = useSelector((state) => state.nhanVien);
  const { dataSearch } = useSelector((state) => state.dsHoaDonDienTu);

  const { listtrangThaiHoaDon } = useSelector((state) => state.utils);
  let timer = null;
  const onSearchInput = (key) => (e) => {
    let value = "";
    if (key == "searchTongHop") {
      if (Number.isInteger(+e.target.value)) {
        key = "maNb";
        value = e.target.value;
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
        dsTrangThaiHoaDon: listtrangThaiHoaDon.map((item) => item.value),
      });
    } else {
      onChangeInputSearch({
        dsTrangThaiHoaDon: [],
      });
    }
  };

  useEffect(() => {
    getListAllNhanVien();
  }, []);
  const handleSearch = () => {
    onSearch({ page: 0 }).then((s) => {
      setState({
        visible: false,
      });
    });
  };
  const onChangeInputPopover = (key) => (e) => {
    let value = "";

    if (e?.target?.value) {
      value = e?.target?.value;
    } else {
      value = e;
    }
    let newDataSearch = {};
    if (key !== "thoiGianXuat") {
      newDataSearch = { ...dataSearch, [key]: value };
    } else {
      newDataSearch = {
        ...dataSearch,
        thoiGianXuatTu: moment(e[0]).format("YYYY/MM/DD"),
        thoiGianXuatDen: moment(e[1]).format("YYYY/MM/DD"),
      };
    }
    updateData({
      dataSearch: newDataSearch,
    });
  };
  useEffect(() => {
    if (listtrangThaiHoaDon) {
      const trangThai = listtrangThaiHoaDon.map((item) => {
        item.label = item.ten;
        item.value = item.id;
        return item;
      });

      setState({
        TRANG_THAI_HOA_DON: trangThai,
      });
    }
  }, [listtrangThaiHoaDon]);

  const group = () => (
    <>
      <Checkbox onChange={onChangeStatus} value={state.statusAll}>
        T???t c???
      </Checkbox>
      <Checkbox.Group
        options={state.TRANG_THAI_HOA_DON || []}
        onChange={onSearchInput("dsTrangThaiHoaDon")}
        value={dataSearch?.dsTrangThaiHoaDon}
        checked={dataSearch?.dsTrangThaiHoaDon}
        style={{ display: "flex", flexDirection: "column" }}
      />
    </>
  );
  const filterOption = (input = "", option) => {
    input = input?.toLowerCase().createUniqueText() || "";
    return (
      option?.children?.toLowerCase().createUniqueText().indexOf(input) >= 0
    );
  };
  const popoverFilter = () => {
    return (
      <div className="popover-filter" style={{ width: "300px" }}>
        <Select
          showSearch
          onChange={onChangeInputPopover("nguoiXuatHoaDonId")}
          filterOption={filterOption}
          allowClear={true}
        >
          {listAllNhanVien &&
            listAllNhanVien.map((item, index) => {
              return (
                <Option key={index} value={item.id}>
                  {item.ten}
                </Option>
              );
            })}
        </Select>
        <div className="pdingbt">
          <div className="label">Th???i gian xu???t h??a ????n</div>
          <RangePicker onChange={onChangeInputPopover("thoiGianXuat")} />
        </div>
        <div className="pdingbt">
          <Input
            onChange={onChangeInputPopover("kyHieuHoaDon")}
            placeholder="K?? hi???u h??a ????n"
          ></Input>
        </div>
        <div className="pdingbt">
          <Input
            placeholder="S??? h??a ????n g???c"
            onChange={onChangeInputPopover("soHoaDonGoc")}
          ></Input>
        </div>
        <div className="pdingbt total-money">
          <div className="label">T???ng ti???n h??a ????n</div>
          <div style={{ display: "flex" }}>
            <InputNumber
              onChange={onChangeInputPopover("thanhTienTu")}
              placeholder="Nh???p s??? ti???n nh??? nh???t"
              type="number"
            ></InputNumber>
            -
            <InputNumber
              onChange={onChangeInputPopover("thanhTienDen")}
              placeholder="Nh???p s??? ti???n l???n nh???t"
              type="number"
            ></InputNumber>
          </div>
        </div>
        <div className="pdingbt btn-search ">
          <Button onClick={handleSearch}>
            T??m <SearchOutlined />
          </Button>
        </div>
      </div>
    );
  };
  return (
    <Main>
      <GlobalStyle />
      <Row style={{ paddingTop: "10px" }}>
        <Col flex="132px">
          <PopupWrapper>
            <Popover
              placement="bottomLeft"
              content={popoverFilter}
              trigger="click"
              overlayClassName="popover-filter"
              visible={state.visible}
            >
              <SearchKho>
                <Button
                  className="filter"
                  onClick={() => {
                    setState({
                      visible: !state.visible,
                    });
                  }}
                >
                  <img src={IcFilter} />
                  <span> B??? l???c </span>
                </Button>
              </SearchKho>
            </Popover>
          </PopupWrapper>
        </Col>
        <Col md={4} xl={6}>
          <InputSearch>
            <Input
              onChange={onSearchInput("searchTongHop")}
              onKeyDown={onSearchInput}
              placeholder="Nh???p ????? t??m theo t??n ng?????i b???nh, m?? ng?????i b???nh, QR ng?????i b???nh"
            />
            <img src={IconSearch} alt="IconSearch" className="icon-search" />
          </InputSearch>
        </Col>
        <Col md={4} xs={6}>
          <InputSearch>
            <Input
              onChange={onSearchInput("soPhieu")}
              placeholder="Nh???p ????? t??m theo s??? h??a ????n"
            />
            <img src={IconSearch} alt="IconSearch" className="icon-search" />
          </InputSearch>
        </Col>
        <Col md={4} xl={6}>
          <InputSearch>
            <Input
              onChange={onSearchInput("tenCongTy")}
              placeholder="Nh???p ????? t??m t??n c??ng ty"
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
              <SearchKho bgWhite={true}>
                <Button className="status">
                  <span> Tr???ng th??i h??a ????n </span>
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

export default HeaderSearchHoaDon;
