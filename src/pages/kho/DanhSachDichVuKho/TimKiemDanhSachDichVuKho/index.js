import { Button, Checkbox, Col, Input, Popover, Row, DatePicker } from "antd";
import IcClose from "assets/images/kho/icClose.png";
import IcDown from "assets/images/xetNghiem/icDown.png";
import IcFilter from "assets/images/kho/icFilter.png";
import IconSearch from "assets/images/xetNghiem/icSearch.png";
import Select from "components/Select";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import LocPhieu from "./LocPhieu";
import { InputSearch, InputSearch2, Main, SearchKho, PopupWrapper } from "./styled";
import { debounce } from "lodash"

const { RangePicker } = DatePicker;
const { Option } = Select;

const TimKiemDanhSachDichVuKho = (props) => {
  const { getAllKhoTongHop, listAllKho } = props;
  const updateData = useDispatch().danhSachDichVuKho.updateData;
  const searchByParams = useDispatch().danhSachDichVuKho.searchByParams;
  const cachXem = useSelector((state) => state.danhSachDichVuKho.cachXem);
  const dataSearch = useSelector((state) => state.danhSachDichVuKho.dataSearch);
  const timKiem = useSelector((state) => state.danhSachDichVuKho.timKiem);
  const getListDanhSachDichVuKho = useDispatch().danhSachDichVuKho.getListDanhSachDichVuKho;

  useEffect(() => {
    getAllKhoTongHop({});
    return () => {
      // updateData({ dataSearch: {} , dataSortColumn : {} })
    }
  }, []);
  const refShow = useRef(null);
  const [state, _setState] = useState({});
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const onChange = (key) => async (e) => {
    if (key === "cachXem") {
      await updateData({ [key]: e, dataSearch: {}, dsKhoId: null, listDanhSachDichVuKho: [], dataSortColumn: {}, ngayHanSuDungTu: null, ngayHanSuDungDen: null, timKiem: null })
      if (e === "2") { // 2 = Xem theo lô , giá trị tự custom
        getListDanhSachDichVuKho({ theoLo: true });
      }
      else {
        getListDanhSachDichVuKho({ page: 0 });
      }
    } else {
    }
  };
  const history = useHistory();

  const handleRefShow = () => {
    if (refShow.current) refShow.current.show();
  };
  const group = () => (
    <Checkbox.Group
      options={listAllKho && [...listAllKho].map(item => {
        item.value = item.id;
        item.label = item.ten;
        return item
      })}
      onChange={onSearchInput("dsKhoId")}
      value={dataSearch?.dsKhoId}
    />
  );

  const debounceSearchByParams = useCallback(
    debounce((key, value, theoLo) => {
      return searchByParams({ [key]: value, theoLo })
    }, 300),
    [],
  )

  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e.length > 0) {
      value = e;
    } else {
      value = e?.target?.value;
    }
    // searchByParams({ [key]: value })
    // if (key === "dsKhoId") {
      if (cachXem === "2") { // 2 = Xem theo lô , giá trị tự custom
        searchByParams({ [key]: value, theoLo: true })
      } else {
        searchByParams({ [key]: value })
      }
    // } else {
    //   if (cachXem === "2") { // 2 = Xem theo lô , giá trị tự custom
    //     // searchByParams({ [key]: value, theoLo: true })
    //     debounceSearchByParams(key, value, true)
    //   } else {
    //     // searchByParams({ [key]: value })
    //     debounceSearchByParams(key, value, false)
    //   }
    // }
  };
  const onChangeDate = (key) => (e) => {
    let value = "";
    let value1 = "";
    value = e && e[0]?.format("YYYY-MM-DD");
    value1 = e && e[1]?.format("YYYY-MM-DD");
    searchByParams({ [`ngayHanSuDungTu`]: value, [`ngayHanSuDungDen`]: value1, theoLo: true });
  };

  return (
    <Main>
      <Row align="middle">
        <Row>
          <div className="title">
            <label>Danh sách dịch vụ kho</label>
            <Button
              className="btn_new"
              onClick={() => {
                history.push("/kho/nhap-kho/phieu-nhap");
              }}
            >
              {/* <span> Thêm mới</span>
              <img src={IcCreate} /> */}
            </Button>
          </div>
        </Row>
        <Row style={{ paddingTop: "10px" }}>
          <Col flex="110px">
            <SearchKho>
              <LocPhieu ref={refShow}></LocPhieu>
              <Button className="filter" onClick={() => handleRefShow()}>
                <img src={IcFilter} />
                <span> Bộ lọc </span>
              </Button>
            </SearchKho>
          </Col>
          <Col flex="150px">
            <SearchKho>
              <Select
                style={{ width: "100%" }}
                // data={listAllKho}

                onChange={onChange("cachXem")}
                value={cachXem}
                data={[
                  {
                    id: "1",
                    ten: "Xem tổng hợp"
                  },
                  {
                    id: "2",
                    ten: "Xem theo lô"
                  },
                ]}
              >
              </Select>
            </SearchKho>
          </Col>
          <Col flex="132px">
            {/* <Popover placement="bottom" content={group} trigger="click">
              <InputSearch2>
                <Input value="Tất cả kho"></Input>
              </InputSearch2>
            </Popover> */}
            <PopupWrapper>
              <Popover
                getPopupContainer={node => node.parentNode}
                placement="bottom" content={group} trigger="click" overlayClassName="popup-kho">
                <SearchKho>
                  <Button className="status">
                    <span> Tất cả kho </span>
                    <img src={IcDown} />
                  </Button>
                </SearchKho>
              </Popover>
            </PopupWrapper>
            {/* <SearchKho>
              <Select
                style={{ width: "100%" }}
                data={listAllKho}
                onChange={onChange("dsKhoId")}
                value="Tất cả kho"
              ></Select>
            </SearchKho> */}
          </Col>
          {cachXem === "2" && (
            <Col flex="230px">
              <InputSearch2>
                <div className="date">
                  <label className="label">Hạn sử dụng</label>
                  <RangePicker
                    format="DD/MM/YYYY"
                    className="range-picker"
                    placeholder={["Từ ngày", "đến ngày"]}
                    bordered={false}
                    onChange={onChangeDate("ngayDuyetPhieu")}
                    separator={<div>-</div>}
                  ></RangePicker>
                </div>
              </InputSearch2>
            </Col>
          )}
          <Col xs={9}>
            <InputSearch>
              <Input value={timKiem} placeholder="Nhập để tìm theo mã hoặc tên dịch vụ" onChange={onSearchInput("timKiem")} />
              <img src={IconSearch} alt="IconSearch" className="icon-search" />
            </InputSearch>
          </Col>
        </Row>
        <div className="array-store">
          {(dataSearch?.dsKhoId || []).map((item, index) => {
            return (
              <div className="item">
                <span>{listAllKho.find((x) => x.id == item)?.ten}</span>
                <img
                  src={IcClose}
                  alt="..."
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    const newDsKho = Object.assign([], dataSearch?.dsKhoId);
                    newDsKho.splice(index, 1);
                    if (newDsKho.length > 0) {
                      searchByParams({ dsKhoId: newDsKho })
                    } else {
                      delete dataSearch.dsKhoId
                      updateData({
                        dataSearch: dataSearch
                      })
                      searchByParams({})
                    }
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

const mapStateToProps = (state) => {
  const {
    kho: { listAllKho },
    nhaSanXuat: { listNhaSanXuat },
  } = state;

  return { listAllKho, listNhaSanXuat };
};

const mapDispatchToProps = ({
  kho: { getAllTongHop: getAllKhoTongHop },
  nhapKho: { onChangeInputSearch },
}) => ({
  getAllKhoTongHop,
  onChangeInputSearch,
});
export default connect(mapStateToProps, mapDispatchToProps)(TimKiemDanhSachDichVuKho);
