import { Col, Row, Button, Input, Popover, DatePicker, Checkbox, Select as SL } from "antd";
import React, { useEffect, useState, useRef } from "react";
import { SearchKho, Main, InputSearch, InputSearch2 } from "./styled";
import Select from "components/Select";
import { connect } from "react-redux";
import IcCreate from "assets/images/kho/IcCreate.png";
import IcFilter from "assets/images/kho/icFilter.png";
import "./styled.css";
import { TRANG_THAI_PHIEU, THANG_DU_TRU } from "constants/index";
import IcDown from "assets/images/xetNghiem/icDown.png";
import IcClose from "assets/images/kho/icClose.png";
import CustomPopover from "../CustomPopover";
import { useHistory } from "react-router-dom";
import { ModalChonKho, ModalChonPhieuNhap } from "../ModalKho";
import Search from "assets/images/welcome/search.png";

const TimKiemPhieu = (props) => {
  const {
    auth,
    getAllKhoTongHop,
    listAllKho,
    onChangeInputSearch,
    updateDataNhapKho,
    updateDataPhieuNhapDuTru,
    listNhaSanXuat,
    getListNhaSanXuat,
    listNhanVienKho,
    clearPhieuNhap,
    onSearchNhanVienKho,
  } = props;
  useEffect(() => {
    getAllKhoTongHop({});
    getListNhaSanXuat({});
    onSearchNhanVienKho({
      page: 0, size: 9999,
      dataSearch: {
        nhanVienId: auth?.nhanVienId,
      }
    })
  }, []);
  useEffect(() => {
    if (listNhanVienKho) {
      let dsNhanVienKho = listNhanVienKho?.map((x) => ({ ...x?.kho }));
      setState({ dsNhanVienKho });
    }
  }, [listNhanVienKho]);
  const refShow = useRef(null);
  const [state, _setState] = useState({ dsNhanVienKho: [] });
  const setState = (data) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  const listKho = state.dsKho || [];
  const ChonKhoRef = useRef(null);
  const ChonPhieuNhapRef = useRef(null);

  const onChange = (key) => (e) => {
    if (key === "dsKhoId") {
      if (listKho.includes(e)) return null;
      listKho.push(e);
      setState({ dsKho: listKho });
      onChangeInputSearch({ dsKhoId: listKho });
    } else {
      onChangeInputSearch({ [key]: e });
    }
  };
  const history = useHistory();

  const handleRefShow = () => {
    if (refShow.current) refShow.current.show();
  };

  const group = () => (
    <Checkbox.Group
      options={TRANG_THAI_PHIEU}
      onChange={onSearchInput("dsTrangThai")}
    />
  );

  const onSearchInput = (key) => (e) => {
    let value = "";
    if (e.length > 0) {
      value = e;
    }

    if (key === "dsTrangThai") {
      onChangeInputSearch({ dsTrangThai: value });
    }
  };

  const onRemove = (e) => {
    let kho = state.dsKho.filter((item) => item != e);
    console.log(kho);
    setState({ dsKho: kho });
    onChangeInputSearch({ dsKhoId: kho.length > 0 ? kho : "" });
  };

  const onSelectPhieuNhap = (data) => {
    ChonPhieuNhapRef.current &&
      ChonPhieuNhapRef.current.show(
        {},
        () => {
          updateDataNhapKho({
            thongTinPhieuNhap: {
              khoId: data?.id,
            },
          });
          history.push("/kho/nhap-kho/phieu-nhap/them-moi");
        },
        () => {
          updateDataPhieuNhapDuTru({
            thongTinPhieuNhap: {
              khoId: data?.id,
            },
          });
          history.push("/kho/phieu-nhap-du-tru/them-moi");
        }
      );
  };

  const onSelectKho = (khoId) => {
    let data = state.dsNhanVienKho.find((x) => x.id == (state.dsKho || khoId));
    if (data?.nhapTuNcc && !data?.khoTrucThuoc) {
      updateDataNhapKho({
        thongTinPhieuNhap: {
          khoId: data?.id,
        },
      });
      history.push("/kho/nhap-kho/phieu-nhap/them-moi");
    } else if (!data?.nhapTuNcc && data?.khoTrucThuoc) {
      updateDataPhieuNhapDuTru({
        thongTinPhieuNhap: {
          khoId: data?.id,
        },
      });
      history.push("/kho/phieu-nhap-du-tru/them-moi");
    } else {
      onSelectPhieuNhap(data);
    }
  };

  const onPushPhieuNhap = () => {
    clearPhieuNhap();
    if (state?.dsKho?.length == 1) {
      onSelectKho();
    } else {
      ChonKhoRef.current &&
        ChonKhoRef.current.show({ listKhoUser: state.dsNhanVienKho }, (khoId) => {
          updateDataNhapKho({
            thongTinPhieuNhap: { khoId },
          });
          onSelectKho(khoId);
        });
    }
  };

  return (
    <Main>
      <Row align="middle">
        <Row>
          <div className="title">
            <label>Danh sách phiếu nhập</label>
            <Button className="btn_new" onClick={onPushPhieuNhap}>
              <span> Thêm mới</span>
              <img src={IcCreate} />
            </Button>
          </div>
        </Row>
        <Row style={{ paddingTop: "10px" }}>
          <Col flex="110px">
            <SearchKho>
              <CustomPopover ref={refShow}></CustomPopover>
              <Button className="filter" onClick={() => handleRefShow()}>
                <img src={IcFilter} />
                <span> Lọc phiếu </span>
              </Button>
            </SearchKho>
          </Col>
          <Col flex="132px">
            <SearchKho>
              <Select
                style={{ width: "100%" }}
                data={state.dsNhanVienKho}
                onChange={onChange("dsKhoId")}
                value="Tên kho"
              ></Select>
            </SearchKho>
          </Col>
          <Col flex="160px">
            <Popover placement="bottom" content={group} trigger="click">
              <InputSearch2>
                <Input
                  value="Trạng thái phiếu"
                  disabled
                  style={{ fontWeight: 650 }}
                ></Input>
                <img src={IcDown} alt="IcDown" className="ic-down" />
              </InputSearch2>
            </Popover>
          </Col>
          <Col flex="132px">
            <SearchKho>
              <Select
                style={{ width: "100%" }}
                data={THANG_DU_TRU}
                onChange={onChange("thangDuTru")}
                placeholder="Tháng dự trù"
              ></Select>
            </SearchKho>
          </Col>
          <Col xs={9}>
            <SearchKho className="other">
              <Select
                className="custom-search"
                suffixIcon={(
                  <img src={Search} />
                )}
                style={{ width: "100%" }}
                data={listNhaSanXuat}
                showSearch
                onChange={onChange("nhaCungCapId")}
                placeholder="Tìm tên nhà cung cấp"
              ></Select>
            </SearchKho>
          </Col>
        </Row>
        <div className="array-store">
          {(state.dsKho || []).map((item) => {
            return (
              <div className="item">
                <span>{listAllKho.find((x) => x.id == item)?.ten}</span>
                <img
                  src={IcClose}
                  alt="..."
                  onClick={() => onRemove(item)}
                ></img>
              </div>
            );
          })}
        </div>
      </Row>
      <ModalChonKho ref={ChonKhoRef} />
      <ModalChonPhieuNhap ref={ChonPhieuNhapRef} />
    </Main>
  );
};

const mapStateToProps = (state) => {
  const {
    kho: { listAllKho, listKhoUser },
    nhanVienKho: { listData: listNhanVienKho },
    nhaSanXuat: { listNhaSanXuat },
    auth: { auth },
  } = state;

  return {
    listAllKho,
    listNhaSanXuat,
    // listKhoUser,
    listNhanVienKho,
    auth,
  };
};

const mapDispatchToProps = ({
  kho: { getAllTongHop: getAllKhoTongHop },
  nhanVienKho: { onSearch: onSearchNhanVienKho },
  nhapKho: { onChangeInputSearch, updateData: updateDataNhapKho, clearPhieuNhap },
  nhaSanXuat: { getListNhaSanXuat },
  phieuNhapDuTru: { updateData: updateDataPhieuNhapDuTru },
}) => ({
  getAllKhoTongHop,
  onChangeInputSearch,
  getListNhaSanXuat,
  updateDataNhapKho,
  updateDataPhieuNhapDuTru,
  clearPhieuNhap,
  onSearchNhanVienKho,
});
export default connect(mapStateToProps, mapDispatchToProps)(TimKiemPhieu);
